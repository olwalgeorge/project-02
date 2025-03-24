const usersService = require("../services/users.service");
const response = require("../utils/response");

const createUser = async (req, res, next) => {
  try {
    await usersService.createUser(req.body);
    response.success(res, 201, "User created successfully");
  } catch (error) {
    if (error.code === 11000) {
      return next({
        name: "MongoServerError",
        code: 11000,
        keyPattern: error.keyPattern,
        keyValue: error.keyValue,
      });
    }
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    response.success(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    response.success(res, 200, "User retrieved successfully", user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await usersService.updateUser(
      req.params._id,
      req.body
    );
    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    response.success(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    return next(error);
  }
};

const replaceUser = async (req, res, next) => {
  try {
    const replacedUser = await usersService.replaceUser(
      req.params._id,
      req.body
    );
    if (!replacedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    response.success(
      res,
      200,
      "User replaced successfully",
      replacedUser
    );
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params._id);
    response.success(res, 200, "User deleted successfully");
  } catch (error) {
    return next(error);
  }
};

const deleteAllUsers = async (req, res, next) => {
  try {
    await usersService.deleteAllUsers();
    response.success(res, 200, "All users deleted successfully");
  } catch (error) {
    return next(error);
  }
};

const getDevelopers = async (req, res, next) => {
  try {
    const developers = await usersService.getDevelopers();
    if (!developers || developers.length === 0) {
      const error = new Error("Developers not found");
      error.statusCode = 404;
      return next(error);
    }
    response.success(
      res,
      200,
      "All developers listed successfully",
      developers
    );
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getDevelopers,
  getUserById,
  updateUser,
  replaceUser,
  deleteUser,
  deleteAllUsers,
};

