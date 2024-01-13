const mongoose = require("mongoose");

const jobRolesSchema = new mongoose.Schema({
  roleName: String,
  roleID: String,
  roleAcronym: String,
  createdBy: String,
  createdOn: Date,
  updatedOn: Date,
});

module.exports = mongoose.model("jobroles", jobRolesSchema);
