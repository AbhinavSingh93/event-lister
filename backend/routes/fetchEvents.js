const axios = require("axios");
const mongoose = require("mongoose");
const cron = require("node-cron");
const Event = require("../models/Event");
require("dotenv").config();

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Fetch events only after successful DB connection
    fetchEvents();
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Function to fetch events
const fetchEvents = async () => {
  try {
    console.log("Fetching events from Ticketmaster...");
    
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?city=Sydney&countryCode=AU&apikey=${process.env.TICKETMASTER_API_KEY}`
    );

    const events = response.data._embedded?.events || [];
    console.log(`Fetched ${events.length} events`);

    let newEventsCount = 0;

    for (let event of events) {
      const existingEvent = await Event.findOne({ url: event.url });

      if (!existingEvent) {
        const newEvent = new Event({
          title: event.name,
          date: event.dates.start.localDate,
          location: event._embedded.venues[0].name,
          url: event.url,
          city: "Sydney",
          subscribers: [], // Ensure subscribers array is always set
        });
        await newEvent.save();
        newEventsCount++;
      }
    }

    
    console.log(`Added ${newEventsCount} new events`);
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
};

// Schedule the job to run daily at midnight
cron.schedule("0 0 * * *", fetchEvents);

// Connect to database and then fetch events
connectToDatabase();

module.exports = fetchEvents;
