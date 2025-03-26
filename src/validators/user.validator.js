// src/validators/user.validator.js

// eslint-disable-next-line no-unused-vars
const validateUserData = async (data, userIdToExclude = null) => {
  const errors = {};

  if (!data.user_id || typeof data.user_id !== "number") {
    errors.user_id = "User ID is required and must be a number";
  }

  if (!data.username || typeof data.username !== "string") {
    errors.username = "Username is required and must be a string";
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Email is required and must be a valid email address";
  }

  if (data.avatar_url && typeof data.avatar_url !== "string") {
    errors.avatar_url = "Avatar URL must be a string";
  }

  if (
    data.first_name &&
    (typeof data.first_name !== "string" || data.first_name.length > 20)
  ) {
    errors.first_name =
      "First name must be a string and not exceed 20 characters";
  }

  if (
    data.last_name &&
    (typeof data.last_name !== "string" || data.last_name.length > 20)
  ) {
    errors.last_name =
      "Last name must be a string and not exceed 20 characters";
  }

  if (data.joined_date && isNaN(Date.parse(data.joined_date))) {
    errors.joined_date = "Joined date must be a valid date";
  }

  if (data.last_login_ip && typeof data.last_login_ip !== "string") {
    errors.last_login_ip = "Last login IP must be a string";
  }

  return errors;
};

module.exports = {
  validateUserData,
};
