const swaggerAutogen = require("swagger-autogen")();
const logger = require("../utils/logger");

const doc = {
  info: {
    title: "Users API",
    description: "API documentation for the Users service",
  },
  host: "cse341-project-02-if3i.onrender.com",
  schemes: ["https"],
  tags: [
    {
      name: "Home",
      description: "Welcome page with a link to the API documentation",
    },
    {
      name: "Users",
      description: "Endpoints related to user operations",
    },
  ],
};

const outputFile = "../../swagger_output.json"; // Generated Swagger file
const endpointsFiles = ["../routes/index.js"]; // Paths to routes

// Generate Swagger file on startup then run server
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => require("../server"))
  .catch((error) => {
    logger.error("Error generating Swagger documentation:", error);
  });
