const { getCompletedCourseCount } = require("../utils/getCompletedCourseCount");
const { expect } = require("chai");

describe("testing for getting the total number of courses, completed & inprogress from the array of object that contains the startDate as well as the endDate", () => {
  it("should return number of courses, inprogress, completed", () => {
    expect(
      getCompletedCourseCount([
        { startDate: "2023-05-04", endDate: "2023-05-05" },
        { startDate: "2023-05-08", endDate: "2023-05-10" },
        { startDate: "2023-05-11", endDate: "2023-05-12" },
        { startDate: "2023-05-15", endDate: "2023-05-16" },
        { startDate: "2023-05-17", endDate: "2023-05-19" },
        { startDate: "2023-05-22", endDate: "2023-05-24" },
        { startDate: "2023-05-25", endDate: "2023-05-26" },
        { startDate: "2023-05-29", endDate: "2023-05-31" },
        { startDate: "2023-06-01", endDate: "2023-06-02" },
        { startDate: "2023-06-05", endDate: "2023-06-06" },
        { startDate: "2023-06-07", endDate: "2023-06-09" },
        { startDate: "2023-06-12", endDate: "2023-06-16" },
        { startDate: "2023-06-19", endDate: "2023-06-20" },
        { startDate: "2023-06-21", endDate: "2023-06-22" },
        { startDate: "2023-06-23", endDate: "2023-06-23" },
        { startDate: "2023-06-26", endDate: "2023-06-27" },
        { startDate: "2023-06-28", endDate: "2023-06-29" },
      ])
    ).to.deep.equal({
      completed_course: 17,
      progressed_course: 0,
      total_course: 17,
    });
  });

  it("should return number of courses, inprogress, completed", () => {
    expect(
      getCompletedCourseCount([
        { startDate: "2023-05-04", endDate: "2023-05-05" },
        { startDate: "2023-05-08", endDate: "2023-05-10" },
        { startDate: "2023-05-11", endDate: "2023-05-12" },
        { startDate: "2023-05-15", endDate: "2023-05-16" },
        { startDate: "2023-05-17", endDate: "2023-05-19" },
        { startDate: "2023-05-22", endDate: "2023-05-24" },
        { startDate: "2023-05-25", endDate: "2023-05-26" },
        { startDate: "2023-05-29", endDate: "2023-05-31" },
        { startDate: "2023-06-01", endDate: "2023-06-02" },
        { startDate: "2023-06-05", endDate: "2023-06-06" },
        { startDate: "2023-06-07", endDate: "2023-06-09" },
        { startDate: "2023-06-12", endDate: "2023-06-16" },
        { startDate: "2023-06-19", endDate: "2023-06-20" },
        { startDate: "2023-06-21", endDate: "2023-06-22" },
        { startDate: "2023-06-23", endDate: "2023-06-23" },
      ])
    ).to.deep.equal({
      completed_course: 15,
      progressed_course: 0,
      total_course: 15,
    });
  });
});
