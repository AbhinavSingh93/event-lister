const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  url: { type: String, required: true, unique: true }, // Ensuring event uniqueness
  city: { type: String, required: true },
  subscribers: { type: [String], default: [] } // Fix: Ensure it's always an array
});

module.exports = mongoose.model("Event", EventSchema);
