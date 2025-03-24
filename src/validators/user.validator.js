// validators/user.validator.js
const mongoose = require("mongoose"); // Import Mongoose to interact with the database

const validateUserData = async (data) => {
  const errors = {};

  // user_id Validation
  if (!data.user_id) {
    errors.user_id = "User ID is required.";
  } else if (typeof data.user_id !== "number") {
    errors.user_id = "User ID must be a number.";
  } else {
    // Check for uniqueness
    const existingUserId = await mongoose
      .model("User")
      .findOne({ user_id: data.user_id });
    if (existingUserId) {
      errors.user_id = "User ID must be unique.";
    }
  }

  // username Validation
  if (!data.username) {
    errors.username = "Username is required.";
  } else if (typeof data.username !== "string") {
    errors.username = "Username must be a string.";
  } else {
    // Check for uniqueness
    const existingUsername = await mongoose
      .model("User")
      .findOne({ username: data.username });
    if (existingUsername) {
      errors.username = "Username must be unique.";
    }
  }

  // email Validation
  if (!data.email) {
    errors.email = "Email is required.";
  } else if (typeof data.email !== "string") {
    errors.email = "Email must be a string.";
  } else {
    // Check for uniqueness
    const existingEmail = await mongoose
      .model("User")
      .findOne({ email: data.email });
    if (existingEmail) {
      errors.email = "Email must be unique.";
    }
  }

  // Validate other fields
  if (data.avatar_url && typeof data.avatar_url !== "string") {
    errors.avatar_url = "Avatar URL must be a string.";
  }

  if (data.first_name && typeof data.first_name !== "string") {
    errors.first_name = "First name must be a string.";
  }

  if (data.last_name && typeof data.last_name !== "string") {
    errors.last_name = "Last name must be a string.";
  }

  if (data.joined_date) {
    const joinedDate = new Date(data.joined_date);
    if (isNaN(joinedDate.getTime())) {
      errors.joined_date = "Joined date must be a valid date.";
    }
  }

  if (data.last_login_ip && typeof data.last_login_ip !== "string") {
    errors.last_login_ip = "Last login IP must be a string.";
  }

  return errors;
};

module.exports = {
  validateUserData,
};

