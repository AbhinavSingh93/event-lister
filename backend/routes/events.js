const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// Utility function to validate email
const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

// Get all events in Sydney
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ city: "Sydney" });
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Subscribe to an event
router.post("/subscribe", async (req, res) => {
  const { email, eventId } = req.body;

  // Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add email only if it doesn't already exist
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { subscribers: email } }, // Ensures no duplicates
      { new: true }
    );

    res.status(200).json({ message: "Email successfully subscribed" });
  } catch (error) {
    console.error("Error subscribing to event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router; 
