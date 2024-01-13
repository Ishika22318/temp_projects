const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { port, env } = require("./config/env");
const User = require("./models/UserModel");
const { requireAuth } = require("./middlewares/authMiddleware");
const app = require("./config/express");
const { connectToDatabase } = require("./databaseManager");

// open mongoose connection
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.info(`server started on port ${port} (${env})`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

/**
 * Exports express
 * @public
 */
module.exports = app;
