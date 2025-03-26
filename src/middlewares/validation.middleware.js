const { validateUserData } = require("../validators/user.validator");
const mongoose = require("mongoose");
const User = require("../models/user.model"); // Import User model

const validateUser = async (req, res, next) => {
  const data = req.body;
  let errors = await validateUserData(data, req.params._id);

  // Validate _id if it exists in the URL parameters
  if (req.params._id) {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      if (!errors) {
        errors = {};
      }
      errors._id = "Invalid MongoDB _id";
      return next({
        // Early return here
        statusCode: 400,
        message: "Validation failed",
        errors: errors,
      });
    }
  }

  // Check for duplicate keys (application-level)
  if (data.user_id) {
    const existingUserById = await User.findOne({
      user_id: data.user_id,
      _id: { $ne: req.params._id },
    });
    if (existingUserById) {
      if (!errors) errors = {};
      errors.user_id = `User ID '${data.user_id}' already exists.`;
    }
  }

  if (data.username) {
    const existingUserByUsername = await User.findOne({
      username: data.username,
      _id: { $ne: req.params._id },
    });
    if (existingUserByUsername) {
      if (!errors) errors = {};
      errors.username = `Username '${data.username}' already exists.`;
    }
  }

  if (data.email) {
    const existingUserByEmail = await User.findOne({
      email: data.email,
      _id: { $ne: req.params._id },
    });
    if (existingUserByEmail) {
      if (!errors) errors = {};
      errors.email = `Email '${data.email}' already exists.`;
    }
  }

  if (errors && Object.keys(errors).length > 0) {
    return next({
      statusCode: 400,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

module.exports = {
  validateUser,
};
