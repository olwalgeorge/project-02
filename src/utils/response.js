// src/utils/response.js
function success(res, statusCode, message, data) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

module.exports = { success };
