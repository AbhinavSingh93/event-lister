Sydney Events Scraper

Overview

This project is a web application that scrapes event data from Ticketmaster for Sydney, Australia, and displays it beautifully on a webpage. Users can:

View upcoming events.

Subscribe via email to get ticket links.

Be redirected to the original event page.

The script runs every 24 hours to fetch updated event details.

Features

✅ Automated Event Scraping: Fetches event details from the Ticketmaster API for Sydney, Australia.
✅ MongoDB Atlas Storage: Stores events in a MongoDB database to prevent duplicates.
✅ Beautiful Web UI: Displays event details with a ticket purchase option.
✅ Email Subscription: Users enter their email to get ticket links.✅ Scheduled Scraping: Runs every 24 hours using node-cron.

Technologies Used

Frontend

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Database

MongoDB Atlas

Mongoose

Scraping & Scheduling

Axios

node-cron

Environment Management

dotenv

API Source

Ticketmaster API

Installation

Prerequisites

Ensure you have the following installed:
✔️ Node.js
✔️ MongoDB (or a MongoDB Atlas account)

Steps to Set Up

1. Clone the repository:

git clone https://github.com/AbhinavSingh93/event-lister.git
cd event-lister

2. Install dependencies:

npm install express mongoose cors dotenv axios node-cron

✅ Optional: If you want automatic server restarts during development, install nodemon:

npm install --save-dev nodemon

Then, update your package.json scripts section:

"scripts": {
  "start": "nodemon index.js"
}

3. Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string
TICKETMASTER_API_KEY=your_ticketmaster_api_key
PORT=5000

4. Start the server:

npm start

5. Open your browser and visit:

http://localhost:5000

Folder Structure

event-lister/
│── models/
│   ├── event.js         # Mongoose event schema
│
│── public/
│   ├── index.html       # Frontend UI
│
│── routes/
│   ├── events.js        # API routes for fetching & subscribing to events
│   ├── fetchEvents.js   # Scraping script for Ticketmaster events
│
│── index.js             # Main server file
│── .env                 # Environment variables
│── package.json         # Project dependencies
│── README.md            # Project documentation

API Endpoints

Method

Endpoint

Description

GET

/api/events

Fetches all events from the database.

Automating Event Fetching

The script inside fetchEvents.js runs automatically every 24 hours via node-cron. It updates the database with new events while avoiding duplicates.