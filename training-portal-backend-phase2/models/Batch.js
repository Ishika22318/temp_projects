const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  batch_name: { type: String, unique: true, required: true },
  description: { type: String, default: "" }, // Set default values for other fields
  created_by: { type: String, default: "" },
  status: { type: String, default: "" },
  start_date: { type: Date, default: Date.now },
  end_date: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now },
  program: { type: [String], default: [] }, // Set default values for array fields
  role: { type: [String], default: [] },
  coursesID: { type: [String], default: [] },
});

module.exports = mongoose.model("batches", batchSchema);
