const mongoose = require("mongoose");

// Course schema
const weeklyStatusesSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
      },
      jobRole: {
        type: String,
        required:true
      },
      batchId: [String],
    weeklyStatus: Object,
});

const weeklyStatuses = mongoose.model("weeklyStatuses", weeklyStatusesSchema);

module.exports = weeklyStatuses