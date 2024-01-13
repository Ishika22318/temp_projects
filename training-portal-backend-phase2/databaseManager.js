const mongoose = require("mongoose");
const { url } = require("./config/env");

require("dotenv").config();

const mongoURI = url;

/**
 * Establishes the connection to the MongoDB database
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Export the connection function
module.exports = {
  connectToDatabase,
};
