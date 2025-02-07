require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("../front-end/public"));

// Import Routes
const eventRoutes = require("./routes/events");
const fetchEvents = require("./routes/fetchEvents"); // Ensure this is the correct path

app.use("/api/events", eventRoutes);

// Function to connect to MongoDB and start the server
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Connect to the database
connectToDatabase();
