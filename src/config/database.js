// src/config/database.js
const mongoose = require("mongoose");
const config = require("./config");
const logger = require("../utils/logger");

async function connectDB() {
  try {
    const con = await mongoose.connect(config.database.url);
    logger.info(`MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    logger.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
