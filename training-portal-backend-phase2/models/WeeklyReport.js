const mongoose = require("mongoose");

const weeklyReportSchema = new mongoose.Schema({
  menteeName: {
    type: String,
    required: true,
  },
  menteeEmailId: {
    type: String,
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },
  mentorEmailId: {
    type: String,
    required: true,
  },
  overallAssessment: {
    type: Number,
    required: true,
  },
  attendanceParticipation: {
    type: Number,
    required: true,
  },
  timeManagement: {
    type: Number,
    required: true,
  },
  communicationSkills: {
    type: Number,
    required: true,
  },
  performanceInAssignment: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  weekNumber: {
    type: Number,
    required: true,
  },
  weekStartDate: {
    type: Date,
    required: true,
  },
  weekEndDate: {
    type: Date,
    required: true,
  },
});

const WeeklyReport = mongoose.model("WeeklyReport", weeklyReportSchema);

module.exports = WeeklyReport;
