const express = require("express");
const userRoutes = require("./routes/users.routes");
const connectDB = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

// Enable CORS for DEVELOPMENT (allow all origins)
app.use(cors());

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Define routes
app.use("/users", userRoutes);

// Connect to the database
connectDB();

// Error handling middleware
app.use(errorHandler);

module.exports = app;

