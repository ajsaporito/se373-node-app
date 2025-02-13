require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

db.once('open', () => {
  console.log("Connected to MongoDB.");
});

db.on('error', (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = db;
