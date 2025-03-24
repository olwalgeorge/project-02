# My W01-Project API

This is a simple REST API for managing users, built with Node.js, Express, and MongoDB for course work in BYU CSE341 Web Services.

## Prerequisites

- Node.js (>= 14)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository: `git clone <repository_url>`
2. Change into the project directory: `cd <project_directory>`
3. Install dependencies: `npm install` (or `yarn install`)
4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variable: `MONGODB_URI=mongodb://localhost:27017/myproject`
   - Replace `mongodb://localhost:27017/myproject1` with your MongoDB connection string.
5. Start the server: `node server.js`

The server will run on http://localhost:3000.

## API Endpoints

### POST /users

Create a new user.

### GET /users

Get all users.

### GET /users/:userId

Get user by ID.

### PATCH /users/:_id

Update user by ID.

### PUT /users/:_id

Update user by ID using PUT.

### DELETE /users/:_id

Delete user by ID.

### DELETE /users

Delete all users.

### GET /users/developer

Get all users with role "Developer".

## Swagger Documentation

The API documentation is available at http://localhost:3000/api-docs.

## Using the API with .rest files

A `routes.rest` file is provided for quick testing with VS Code's REST Client extension. Open `users.rest` in VS Code and send requests by clicking "Send Request" above each request block.

Example content of `users.rest`:

```
//w03-project-2/users.rest
//Test project vocabulary and endpoints with sample rest operations

### Create a new user
POST http://localhost:3000/users
Content-Type: application/json

{
    "user_id": 12,
    "username": "tech_savvy2",
    "email": "tech.savvy2@example.com",
    "first_name": "Toby",
    "last_name": "Lewis",
    "joined_date": "2023-11-01T19:00:00.000Z",
    "last_login_ip": "192.168.1.22"
}

### Get all users
GET http://localhost:3000/users

### Get user by ID (user-id)
GET http://localhost:3000/users/11

### Update user by ID
PATCH http://localhost:3000/users/67daa208b432578cae3dd197
Content-Type: application/json

{
    "user_id": 11,
    "username": "tech_savvy",
    "email": "tech.savvy@example.com",
    "first_name": "Toby2",
    "last_name": "Lewis"
}

### Update user by ID using PUT
PUT http://localhost:3000/users/67daa208b432578cae3dd197
Content-Type: application/json

{
    "user_id": "11",
    "email": "tech.savvy@example.com",
    "first_name": "Toby4",
    "last_name": "Lewis"
}

### Delete user by ID
DELETE http://localhost:3000/users/67daa208b432578cae3dd197

### Delete all users
DELETE http://localhost:3000/users

### Get all users with role "Developer"
GET http://localhost:3000/users/developer
```

