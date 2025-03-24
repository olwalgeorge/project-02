// src/config/database.js
const mongoose = require("mongoose");
const config = require("./config");

async function connectDB() {
  try {
    const con = await mongoose.connect(config.database.url);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
