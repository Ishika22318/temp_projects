const ProjectReport = require("../models/projectReport");
const WeeklyReports = require("../models/weeklyReport");

function fetchProjectReports(emailId) {
  return Promise.all([
    ProjectReport.find({ menteeEmailId: emailId }), // Retrieve project reports using the provided emailId
  ])
    .then(([projectReports]) => {
      return projectReports; // Return the fetched weekly reports
    })
    .catch((error) => {
      console.error("Error fetching reports:", error); // Log the error message
      throw error; // Throw the error to handle it in the calling code
    });
}

function fetchWeeklyReports(emailId) {
  return Promise.all([
    WeeklyReports.find({ menteeEmailId: emailId }), // Retrieve project reports using the provided emailId
  ])
    .then(([weeklyReport]) => {
      return weeklyReport; // Return the fetched project reports
    })
    .catch((error) => {
      console.error("Error fetching reports:", error); // Log the error message
      throw error; // Throw the error to handle it in the calling code
    });
}
function fetchSingleUserData(emailId) {
  return Promise.all([
    WeeklyReports.find({ menteeEmailId: emailId }), // Retrieve project reports using the provided emailId
  ])
    .then(([weeklyReport]) => {
      return weeklyReport; // Return the fetched project reports
    })
    .catch((error) => {
      console.error("Error fetching reports:", error); // Log the error message
      throw error; // Throw the error to handle it in the calling code
    });
}

module.exports = {
  fetchWeeklyReports,
  fetchProjectReports,
  fetchSingleUserData,
};
