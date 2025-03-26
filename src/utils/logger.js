const winston = require("winston");
const config = require("../config/config");

// Custom format for errors
const errorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return {
      ...info,
      message: info.message,
      stack: config.env === "development" ? info.stack : undefined
    };
  }
  
  // Handle case where error is passed in metadata
  if (info.error && info.error instanceof Error) {
    return {
      ...info,
      message: `${info.message} - ${info.error.message}`,
      stack: config.env === "development" ? info.error.stack : undefined
    };
  }
  
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    errorFormat(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      let log = `${timestamp} [${level.toUpperCase()}] ${message}`;
      if (stack) {
        log += `\n${stack}`;
      }
      return log;
    })
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
      format: winston.format.combine(
        config.env === "development" 
          ? winston.format.colorize() 
          : winston.format.uncolorize()
      )
    }),
  ],
});

module.exports = logger;