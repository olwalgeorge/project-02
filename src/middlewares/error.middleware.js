// src/middlewares/error.middleware.js
const logger = require("../utils/logger");

 // eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, _next) => {
 
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || {};

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = err.errors; 
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = 400;
    message = "Duplicate key error";
    errors = {
      [Object.keys(err.keyPattern).join(", ")]: `Value '${
        err.keyValue[Object.keys(err.keyPattern)[0]]
      }' already exists.`,
    };
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  logger.error(
    `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${
      req.ip
    } - ${JSON.stringify(errors)}`
  );

  res.status(statusCode).json({
    message,
    errors,
  });
};

module.exports = errorMiddleware;