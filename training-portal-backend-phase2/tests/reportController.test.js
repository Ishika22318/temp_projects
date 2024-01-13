const { projectReports, weeklyReports } = require("./static/dummyData");

const assert = require("chai").assert;
const reportController = require("../controllers/reportController");
const chai = require("chai");
const expect = chai.expect;
const TIMEOUT_VALUE = 5000;
const sinon = require("sinon");
const ProjectReport = require("../models/projectReport");
const WeeklyReport = require("../models/weeklyReport");

describe("reportController", function () {
  // Testing the getScoreDesription()
  describe("getScoreDescription()", function () {
    it('should return "Below Threshold" when given a score between 0 and 2.5', function () {
      let result = reportController.getScoreDescription(2.0);
      assert.equal(result, "Below Threshold");
    });

    it('should return "Threshold" when given a score between 2.5 and 3.0', function () {
      let result = reportController.getScoreDescription(2.7);
      assert.equal(result, "Threshold");
    });

    it('should return "Mostly Target" when given a score between 3.0 and 3.25', function () {
      let result = reportController.getScoreDescription(3.1);
      assert.equal(result, "Mostly Target");
    });

    it('should return "Always Target" when given a score between 3.25 and 3.5', function () {
      let result = reportController.getScoreDescription(3.4);
      assert.equal(result, "Always Target");
    });

    it('should return "Mostly Outstanding" when given a score between 3.5 and 3.8', function () {
      let result = reportController.getScoreDescription(3.7);
      assert.equal(result, "Mostly Outstanding");
    });

    it('should return "Always Outstanding" when given a score between 3.8 and 4.0', function () {
      let result = reportController.getScoreDescription(3.9);
      assert.equal(result, "Always Outstanding");
    });

    it('should return "Invalid score" when given a score outside the valid range', function () {
      let result = reportController.getScoreDescription(4.5);
      assert.equal(result, "Invalid score");
    });

    // Testing the function calculateMockProject()
    describe("calculateMockProject()", function () {
      it("should calculate the average score for a set of project reports", function () {
        const projectReports = [
          {
            useCaseUnderstandingInterpretation: 4,
            logicApplied: 3,
            techLearnedVsImplemented: 2,
            solutionExplanationClarity: 3,
          },
          {
            useCaseUnderstandingInterpretation: 4,
            logicApplied: 4,
            techLearnedVsImplemented: 3,
            solutionExplanationClarity: 4,
          },
          {
            useCaseUnderstandingInterpretation: 3,
            logicApplied: 2,
            techLearnedVsImplemented: 1,
            solutionExplanationClarity: 2,
          },
        ];

        const expectedAverageScore =
          (4 + 3 + 2 + 3 + 4 + 4 + 3 + 4 + 3 + 2 + 1 + 2) / (3 * 4);
        const result2 = Number(expectedAverageScore.toFixed(2));

        const result = reportController.calculateMockProject(projectReports);
        assert.equal(result, result2);
      });
    });

    //Tesing calculateWeeklyReports
    describe("calculateWeeklyReports", () => {
      const weeklyReports = [
        {
          weekNumber: 1,
          remarks: "Good job!",
          timeManagement: 4,
          overallAssessment: 90,
          performanceInAssignment: 9,
          communicationSkills: 3,
          attendanceParticipation: 4,
          weekStartDate: "2023-01-01",
          weekEndDate: "2023-01-07",
        },
      ];

      it("returns an object with correct properties and values", () => {
        const result = reportController.calculateWeeklyReports(weeklyReports);

        assert.deepStrictEqual(result[0], {
          weekId: 1,
          mentorFeedbacks: ["Good job!"],
          timeManagement: 4,
          overallAssessment: 90,
          communicationSkill: 3,
          attendanceParticipation: 4,
          assignment: 9,
          startingDate: "2023-01-01",
          endingDate: "2023-01-07",
        });
      });
    });

    //Tesing the function  calculateFinalReports()
    describe("calculateFinalReports()", function () {
      // Case 1
      it("should return an object with success: false and an error message when both projectReports and weeklyReports are empty", function () {
        const projectReports = [];
        const weeklyReports = [];
        const expectedResult = null;

        const result = reportController.calculateFinalReports(
          projectReports,
          weeklyReports
        );
        assert.deepStrictEqual(result, expectedResult);
      });

      // Case 2
      it("should calculate the final reports correctly when projectReports and weeklyReports are not empty", function () {
        const expectedResult = {
          name: "Madhwan",
          grade: "Mostly Outstanding",
          emailId: "madhwan@quantiphi.com",
          attendanceParticipation: 3.89,
          communicationSkill: 3.67,
          timeManagement: 3.67,
          mockProject: 3.5,
          averageScore: 3.58,
          assessment: 3.07,
          weeks: [
            {
              weekId: 1,
              mentorFeedbacks: [
                "Excellent work!",
                "Good job!",
                "Great progress!",
              ],
              timeManagement: 4,
              overallAssessment: 80,
              communicationSkill: 4,
              attendanceParticipation: 4,
              assignment: 8,
              startingDate: "03/19/2023",
              endingDate: "03/25/2023",
            },
            {
              weekId: 2,
              mentorFeedbacks: [
                "Good job!",
                "Keep working on it!",
                "Great progress!",
              ],
              timeManagement: 3,
              overallAssessment: 70,
              communicationSkill: 3,
              attendanceParticipation: 3.67,
              assignment: 7,
              startingDate: "03/26/2023",
              endingDate: "04/01/2023",
            },
            {
              weekId: 3,
              mentorFeedbacks: [
                "Excellent work!",
                "Great progress!",
                "Good job!",
              ],
              timeManagement: 4,
              overallAssessment: 80,
              communicationSkill: 4,
              attendanceParticipation: 4,
              assignment: 8,
              startingDate: "04/02/2023",
              endingDate: "04/08/2023",
            },
          ],
        };

        const result = reportController.calculateFinalReports(
          projectReports,
          weeklyReports
        );
        assert.deepStrictEqual(result, expectedResult);
      });
    });

    describe("fetchReports", function () {
      let findProjectStub;
      let findWeeklyStub;

      beforeEach(function () {
        findProjectStub = sinon.stub(ProjectReport, "find");
        findWeeklyStub = sinon.stub(WeeklyReport, "find");
      });

      afterEach(function () {
        findProjectStub.restore();
        findWeeklyStub.restore();
      });
      it("should fetch project reports and weekly reports for the given email ID", async function () {
        const emailId = "madhwan@quantiphi.com";
        const sampleProjectData = projectReports;
        const sampleWeeklyData = weeklyReports;

        findProjectStub.returns(sampleProjectData);
        findWeeklyStub.returns(sampleWeeklyData);

        const result = await reportController.fetchReports(emailId);

        expect(result).to.be.an("object");
        expect(result).to.have.property("projectReports").that.is.an("array");
        expect(result).to.have.property("weeklyReports").that.is.an("array");
      });

    });
  });
});
