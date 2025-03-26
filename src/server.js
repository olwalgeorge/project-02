// src/server.js
const app = require("./app");
const config = require("./config/config");
const logger = require("./utils/logger");

// Validate critical environment variables to simulate server check
const requiredEnvVars = [
  "MONGODB_URI",
  "PORT",
  "JWT_SECRET",
  "NODE_ENV",
  "APIKEY",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    logger.error(
      `Critical error: Missing required environment variable ${varName}`
    );
    process.exit(1);
  } else {
    logger.info(`Environment variable ${varName} is set`);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1); // Exit with failure
});

app.listen(config.port, () => {
  logger.info(`Server listening at http://localhost:${config.port}`);
});
