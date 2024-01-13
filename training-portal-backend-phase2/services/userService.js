const user = require("../models/UserModel");

async function userDetails() {
  try {
    const users = await user.find().exec();
    return users;
  } catch (error) {
    throw new Error("Error fetching user details: " + error.message);
  }
}

module.exports = userDetails;
