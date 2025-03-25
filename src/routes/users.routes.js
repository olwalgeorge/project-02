// src/routes/users.routes.js
const express = require("express");
const routes = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  replaceUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/users.controller");
const { validateUser } = require("../middlewares/validation.middleware");

/* #swagger.tags = ['Users'] */
/* #swagger.description = 'Routes for managing users' */

routes.post(
  "/",
  validateUser,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to create a new user' */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'User data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'number', required: true },
        username: { type: 'string', required: true },
        email: { type: 'string', required: true },
        avatar_url: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        joined_date: { type: 'string', format: 'date' },
        last_login_ip: { type: 'string' }
      }
    }
  } */
  /* #swagger.responses[201] = { description: 'User created successfully' } */
  /* #swagger.responses[400] = { description: 'Validation failed', schema: { type: 'object', properties: { message: { type: 'string' }, errors: { type: 'object' } } } } */
  /* #swagger.responses[500] = { description: 'Failed to create user' } */
  createUser
);

routes.get(
  "/",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve all users' */
  /* #swagger.responses[200] = { description: 'Users retrieved successfully' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve users' } */
  getAllUsers
);

routes.get(
  "/:userId",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to retrieve a user by user_id' */
  /* #swagger.parameters['userId'] = {
    in: 'path',
    description: 'user_id of the user',
    required: true,
    type: 'string'
  } */
  /* #swagger.responses[200] = { description: 'User retrieved successfully' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to retrieve user' } */
  getUserById
);

routes.patch(
  "/:_id",
  validateUser,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to update a user' */
  /* #swagger.parameters['_id'] = {
    in: 'path',
    description: 'internal MongoDB ID of the user',
    required: true,
    type: 'string'
  } */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated user data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'number' },
        username: { type: 'string' },
        email: { type: 'string' },
        avatar_url: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        joined_date: { type: 'string', format: 'date' },
        last_login_ip: { type: 'string' }
      }
    }
  } */
  /* #swagger.responses[200] = { description: 'User patched successfully' } */
  /* #swagger.responses[400] = { description: 'Validation failed', schema: { type: 'object', properties: { message: { type: 'string' }, errors: { type: 'object' } } } } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to update user' } */
  updateUser
);

routes.put(
  "/:_id",
  validateUser,
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to replace a user' */
  /* #swagger.parameters['_id'] = {
    in: 'path',
    description: 'internal MongoDB ID of the user',
    required: true,
    type: 'string'
  } */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'New user data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'number' },
        username: { type: 'string' },
        email: { type: 'string' },
        avatar_url: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        joined_date: { type: 'string', format: 'date' },
        last_login_ip: { type: 'string' }
      }
    }
  } */
  /* #swagger.responses[200] = { description: 'User replaced successfully' } */
  /* #swagger.responses[400] = { description: 'Validation failed', schema: { type: 'object', properties: { message: { type: 'string' }, errors: { type: 'object' } } } } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to replace user' } */
  replaceUser
);

routes.delete(
  "/:_id",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to delete a user' */
  /* #swagger.parameters['_id'] = {
    in: 'path',
    description: 'internal MongoDB ID of the user',
    required: true,
    type: 'string'
  } */
  /* #swagger.responses[200] = { description: 'User deleted successfully' } */
  /* #swagger.responses[404] = { description: 'User not found' } */
  /* #swagger.responses[500] = { description: 'Failed to delete user' } */
  deleteUser
);

routes.delete(
  "/",
  /* #swagger.tags = ['Users'] */
  /* #swagger.description = 'Endpoint to delete all users' */
  /* #swagger.responses[200] = { description: 'All users deleted successfully' } */
  /* #swagger.responses[500] = { description: 'Failed to delete all users' } */
  deleteAllUsers
);

module.exports = routes;