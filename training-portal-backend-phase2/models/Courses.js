const mongoose = require("mongoose");

// Course schema
const CourseSchema = new mongoose.Schema({
  jobRole: {
    type: String,
  },
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  courseType: {
    type: String,
  },
  courseDuration: {
    type: Number, // Duration must be in days
  },
  courseStarting: {
    type: Number, // Duration must be in days
  },
  courseURL: {
    type: String,
  },
  assessmentURL: {
    type: String,
  },
  assignmentURL: {
    type: String,
  },
  isActive: {
    //Status
    type: Boolean,
  },
  createdBy: {
    type: String,
  },
  createdOn: {
    type: Date,
  },
  updatedOn: {
    type: Date,
  },
  details: [
    {
      topic: {
        type: String,
      },
      subTopic: {
        type: Array,
      },
    },
  ],
});

module.exports = mongoose.model("trainingcourses", CourseSchema);
