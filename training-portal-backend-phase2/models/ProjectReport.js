const mongoose = require("mongoose");

const projectReportSchema = new mongoose.Schema({
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
  useCaseUnderstandingInterpretation: {
    type: Number,
    required: true,
  },
  logicApplied: {
    type: Number,
    required: true,
  },
  techLearnedVsImplemented: {
    type: Number,
    required: true,
  },
  solutionExplanationClarity: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const ProjectReport = mongoose.model("ProjectReport", projectReportSchema);

module.exports = ProjectReport;
