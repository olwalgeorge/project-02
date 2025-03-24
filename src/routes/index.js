const routes = require("express").Router();
const userRoutes = require("./users.routes");

routes.get("/", (req, res) => {
  // #swagger.tags = ['Home']
  // #swagger.description = 'Home page with a link to the API documentation'
  // #swagger.responses[200] = { description: 'Welcome message' }
  res.send(
    "<h1>Welcome to the Rest API Home Page</h1><p><a href='/api-docs'>Documentation</a></p>"
  );
});

routes.use("/users", userRoutes);

module.exports = routes;

