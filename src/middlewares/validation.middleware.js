// src/middlewares/validation.middleware.js

const { validateUserData } = require("../validators/user.validator");
const mongoose = require("mongoose");

const validateUser = async (req, res, next) => {
  const data = req.body;
  let errors = await validateUserData(data);

  // Validate _id if it exists in the URL parameters
  if (req.params._id) {
    if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
      if (!errors) {
        errors = {};
      }
      errors._id = "Invalid MongoDB _id";
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

