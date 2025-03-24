// middlewares/error.middleware.js

// This middleware handles errors that occur during the request-response cycle.
/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging)
  console.error(err);

  // Default error status is 500 (Internal Server Error)
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific error types
  if (err.message === "Validation failed") {
    statusCode = 400; // Bad Request
    message = "Validation failed";
    // errors are attached to the error object
    // format the errors as you want to return them
    const validationErrors = Object.entries(err.errors).map(
      ([field, errorMessage]) => ({
        field,
        message: errorMessage,
      })
    );
    return res.status(statusCode).json({
      error: {
        code: statusCode,
        message: message,
        validationErrors: validationErrors,
      },
    });
  }

  // Format the error response
  const errorResponse = {
    error: {
      code: statusCode,
      message: message,
      // You can add more error details here if needed (e.g., stack trace, details)
    },
  };

  // Send the error response to the client
  res.status(statusCode).json(errorResponse);
};

module.exports = {
  errorHandler,
};

