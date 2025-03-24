const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users API",
    description: "API documentation for the Users service",
  },
  host: `project-02-94tx.onrender.com || "localhost"}:${process.env.PORT || 3000}`,
  schemes: ["http"],
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
    console.error("Error generating Swagger documentation:", error);
  });

