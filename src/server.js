// src/server.js
const app = require("./app");
const config = require("./config/config");

// Validate critical environment variables to simulate server check
const requiredEnvVars = [
  "MONGODB_URI",
  "PORT",
  "JWT_SECRET",
  "NODE_ENV",
  "APIKEY",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(
      `Critical error: Missing required environment variable ${varName}`
    );
    process.exit(1);
  } else {
    console.log(`Environment variable ${varName} is set`);
  }
});

app.listen(config.port, () => {
  console.log(`Server listening at http://localhost:${config.port}`);
});
