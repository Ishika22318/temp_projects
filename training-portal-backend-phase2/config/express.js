const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routes/v1");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDefination = yaml.load("./swagger.yaml");

/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefination));

// enable CORS - Cross Origin Resource Sharing
app.use(
  cors({
    origin: "*",
    exposedHeaders: ["x-auth"],
  })
);

// mount api v1 routes
app.use("/api/v1", routes);

app.use(express.json());

module.exports = app;
