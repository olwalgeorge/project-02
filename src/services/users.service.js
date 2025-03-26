const User = require("../models/user.model");
const logger = require("../utils/logger");

async function createUser(userData) {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    logger.error("Error creating user:", error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    return await User.find();
  } catch (error) {
    logger.error("Error getting all users:", error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return user;
  } catch (error) {
    logger.error("Error getting user by ID:", error);
    throw error;
  }
}

async function updateUser(_id, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: _id }, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return updatedUser;
  } catch (error) {
    logger.error("Error updating user:", error);
    if (error.name === "ValidationError") {
      // Extract validation errors
      const validationErrors = {};
      for (const key in error.errors) {
        validationErrors[key] = error.errors[key].message;
      }
      const validationError = new Error("Validation failed");
      validationError.statusCode = 400; // Or appropriate status code
      validationError.errors = validationErrors;
      throw validationError;
    }
    throw error;
  }
}

async function replaceUser(_id, replaceData) {
  try {
    const replacedUser = await User.findOneAndReplace(
      { _id: _id },
      replaceData,
      { new: true, runValidators: true } // Ensure validators run on replace
    );
    if (!replacedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return replacedUser;
  } catch (error) {
    logger.error("Error replacing user:", error);
    throw error;
  }
}

async function deleteUser(_id) {
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return deletedUser;
  } catch (error) {
    logger.error("Error deleting user:", error);
    throw error;
  }
}

async function deleteAllUsers() {
  try {
    await User.deleteMany();
  } catch (error) {
    logger.error("Error deleting all users:", error);
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  replaceUser,
  deleteUser,
  deleteAllUsers,
};
