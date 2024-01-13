const { Reports_Constant } = require("../utils/constants");
const csv = require("csv-parser");
const { Parser } = require("json2csv");
const { fetchProjectReports, fetchWeeklyReports } = require("../services/reportsService");
const user = require("../models/UserModel");
// To fetch all the reports
function fetchReports(emailId) {
  return Promise.all([
    fetchProjectReports(emailId),
    fetchWeeklyReports(emailId),
  ])
    .then(([projectReports, weeklyReports]) => {
      return { projectReports, weeklyReports };
    })
    .catch((error) => {
      console.error('Error fetching reports:', error);
      throw error;
    });
}

// Calculate aggregated weekly reports
function calculateWeeklyReports(weeklyReports) {
  // Initialize an object to store aggregated reports
  const weekWiseReports = weeklyReports.reduce((acc, report) => {
    const { weekNumber, remarks, timeManagement, overallAssessment, communicationSkills, attendanceParticipation, performanceInAssignment } = report;
    // If the week number doesn't exist in the accumulator, create a new entry for it
    acc[weekNumber] = acc[weekNumber] || {
      weekId: weekNumber,
      mentorFeedbacks: [],
      timeManagement: 0,
      overallAssessment: 0,
      communicationSkill: 0,
      attendanceParticipation: 0,
      assignment: 0,
      startingDate: report.weekStartDate,
      endingDate: report.weekEndDate,
    };
    // Get the week report from the accumulator
    const weekReport = acc[weekNumber];
    // Add mentor feedbacks to the week report
    weekReport.mentorFeedbacks.push(remarks);
    // Sum up the scores for various aspects of the week report
    weekReport.timeManagement += timeManagement;
    weekReport.overallAssessment += overallAssessment;
    weekReport.communicationSkill += communicationSkills;
    weekReport.attendanceParticipation += attendanceParticipation;
    weekReport.assignment += performanceInAssignment;
    return acc;
  }, {});

  // Calculate the average scores for each aspect of the weekly reports
  const weekAverageReports = Object.values(weekWiseReports).map(
    (weekReport) => {
      const len = weekReport.mentorFeedbacks.length;
      for (const prop of [
        'timeManagement',
        'overallAssessment',
        'communicationSkill',
        'attendanceParticipation',
        'assignment',
      ]) {
        weekReport[prop] = Math.round((weekReport[prop] / len) * 100) / 100;
      }
      return weekReport;
    }
  );

  // Return the calculated weekly reports
  return weekAverageReports;
}

// Calculate the average score for the project reports
function calculateMockProject(projectReports) {
  // Calculate the total score by summing up the scores for different aspects of the project reports
  const totalScore = projectReports.reduce(
    (sum, report) => sum + report.useCaseUnderstandingInterpretation + report.logicApplied + report.techLearnedVsImplemented + report.solutionExplanationClarity,
    0
  );
  // Calculate the average score
  const averageScore = totalScore / (projectReports.length * 4);
  // Round the average score to two decimal places
  return Math.round(averageScore * 100) / 100;
}

// Get the score description based on the provided score
function getScoreDescription(score) {
  // Return the corresponding description based on the score range
  switch (true) {
    case score >= 0 && score <= 2.5:
      return 'Below Threshold';
    case score > 2.5 && score <= 3.0:
      return 'Threshold';
    case score > 3.0 && score <= 3.25:
      return 'Mostly Target';
    case score > 3.25 && score <= 3.5:
      return 'Always Target';
    case score > 3.5 && score <= 3.8:
      return 'Mostly Outstanding';
    case score > 3.8 && score <= 4.0:
      return 'Always Outstanding';
    default:
      return 'Invalid score';
  }
}

// Calculate the final reports by combining project and weekly reports
function calculateFinalReports(projectReports, weeklyReports) {
  // If there are no project and weekly reports, return null
  if (projectReports.length === 0 && weeklyReports.length === 0) return null;

  // Initialize the data object with default values
  const data = {
    name: weeklyReports[0].menteeName,
    grade: '',
    emailId: weeklyReports[0].menteeEmailId,
    attendanceParticipation: 0,
    communicationSkill: 0,
    timeManagement: 0,
    mockProject: calculateMockProject(projectReports),
    averageScore: 0,
    assessment: 0,
    weeks: calculateWeeklyReports(weeklyReports),
  };
  // Calculate the average scores and assessment based on the weekly reports
  const numWeeks = data.weeks.length;
  const intermediateData = data.weeks.reduce(
    (acc, report) => {
      for (const prop of [
        'communicationSkill',
        'attendanceParticipation',
        'timeManagement',
        'assignment',
      ]) {
        acc[prop] += report[prop];
      }
      return acc;
    },
    {
      communicationSkill: 0,
      attendanceParticipation: 0,
      timeManagement: 0,
      assignment: 0,
    }
  );

  // Calculate the average scores and assessment
  for (const prop of [
    'communicationSkill',
    'attendanceParticipation',
    'timeManagement',
  ]) {
    data[prop] = Math.round((intermediateData[prop] / numWeeks) * 100) / 100;
  }
  data.assessment = Math.round((intermediateData.assignment / (numWeeks * 2.5)) * 100) / 100;
  data.averageScore = Math.round(((data.communicationSkill + data.attendanceParticipation + data.timeManagement + data.assessment) / 4) * 100) / 100;

  // Get the score description based on the average score
  data.grade = getScoreDescription(data.averageScore);

  // Return the final reports data
  return data;
}

const getReports = async (req, res) => {
  const userId = req.params.id;
  const email = req.data.email;
  if (userId == email || req.data.role === "Admin") {
    try {
      const { projectReports, weeklyReports } = await fetchReports(userId);
      const data = calculateFinalReports(projectReports, weeklyReports);

      if (data === null) {
        res.status(200).json({
          success: true,
          message: Reports_Constant.NOT_FOUND,
          data,
        });
      } else {
        res.status(200).json({
          success: true,
          message: Reports_Constant.SUCCESS,
          data,
        });
      }
    } catch (error) {
      res.status(500).json({ error: Reports_Constant.ERROR });
    }
  } else {
    res.status(401).json({ error: Reports_Constant.UNAUTHORIZED });
  }
};

const getUserReportByEmail = async (email) => {
  const { projectReports, weeklyReports } = await fetchReports(email);
  const data = calculateFinalReports(projectReports, weeklyReports);
  return data;
};
const getAllUsersReports = async (req, res) => {
  if (req.data.role === "Admin") {
    const users = await user.find({ role: "Intern" }).lean();

    let data = [];
    for (let user of users) {
      let email = user.email;
      // console.log(email);

      const report = await getUserReportByEmail(email);

      // console.log(report);
    
      data.push({
        name: user.name,
        email: email,
        jobRole: user.jobRole,
        grade: report == null ? 'Always Target' : report.grade,
        id: user._id,
        batch_id : user.batchId,
        report_check : report == null ? false : true,
        score : report == null ? '3' : report.averageScore
      });
    }
    res.status(200).json(data);
  } else {
    res.status(401).json({ error: "Unauthorized user!" });
  }
};

const getTopandPoorPerformer = async (req, res) => {
  const users = await user.find({ role: "Intern" }).lean();

  let data = [];
  for (let user of users) {
    let email = user.email;

    const report = await getUserReportByEmail(email);
    if (report == "undefined" || report == null) continue;
    data.push({
      name: user.name,
      score: report.averageScore,
    });
  }
  const sortedData = data.sort((a, b) => b.score - a.score);
  const topThree = sortedData.slice(0, 3);
  let bottomThree = sortedData.slice(-3);
  bottomThree = bottomThree.sort((a, b) => a.score - b.score);

  res.status(200).json({ topThree, bottomThree });
};

const exportInternData = async (req, res, next) => {
  try {
    const intern = req.body;
    console.log(intern);
    let users = [];

    if (intern.length === 0) {
      users = await user.find({ role: "Intern" }).lean();
    } else {
      users = await user.find({ _id: { $in: req.body }, role: "Intern" }).lean();
    }

    let data = [];
    for (let user of users) {
      let email = user.email;
      console.log(email);

      const report = await getUserReportByEmail(email);
      console.log(report);
      // if (report == "undefined" || report == null) continue;
      data.push({
        name: user.name,
        email: email,
        jobRole: user.jobRole,
        grade: report == null ? 'Always Target' : report.grade,
        id: user._id,
        score : report == null ? '3' : report.averageScore
      });
    }
    let InternData = [];
    data.forEach((item) => {
      let { name, email, jobRole, grade, score } = item;

      InternData.push({ name, email, jobRole, grade, score });
    });

    const csvFields = ["Name", "Email", "JobRole", "Grade", "Score"];
    const parser = new Parser({ csvFields });
    const csvData = parser.parse(InternData);
    res.setHeader("Content-Type", "csv");
    res.setHeader("Content-Disposition", "attachment; filename=usersData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
};

// Export the necessary functions
module.exports = {
  fetchReports,
  calculateFinalReports,
  getScoreDescription,
  calculateMockProject,
  calculateWeeklyReports,
  getAllUsersReports,
  getReports,
  exportInternData,
  getTopandPoorPerformer,
};
