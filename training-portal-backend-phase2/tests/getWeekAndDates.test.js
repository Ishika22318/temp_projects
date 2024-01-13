const { getWeekAndDates } = require("../utils/getWeekAndDates");
const { expect } = require("chai");

describe("Get Week and Dates", () => {
  it("should return week and date", () => {
    expect(getWeekAndDates("2023-06-27", 2)).to.deep.equal({
      date: "2023-06-28",
      week: 1,
    });
  });
  it("should return week and date", () => {
    expect(getWeekAndDates("2023-06-27", 5)).to.deep.equal({
      date: "2023-07-03",
      week: 2,
    });
  });
});
