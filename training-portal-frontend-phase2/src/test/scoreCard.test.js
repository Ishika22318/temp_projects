import React from "react";
import { render, screen } from "@testing-library/react";
import ScoreCard from "../screen/reportTab/scoreCard";
import { SCORECARD } from "../utils/constants";
import "@testing-library/jest-dom/extend-expect";


describe("ScoreCard Component", () => {
const scoreData = {
    success: true,
    message: 'Success. Returns the Performance Report Management data.',
    data: {
      name: 'Madhwan',
      grade: 'Mostly Outstanding',
      emailId: 'madhwan@quantiphi.com',
      attendanceParticipation: 3.89,
      communicationSkill: 3.67,
      timeManagement: 3.67,
      mockProject: 3.5,
      averageScore: 3.58,
      assessment: 3.07,
    
      weeks: [
        {
          weekId: 1,
          mentorFeedbacks: ['Excellent work!', 'Good job!', 'Great progress!'],
          timeManagement: 4,
          overallAssessment: 80,
          communicationSkill: 4,
          attendanceParticipation: 4,
          assignment: 80,
          startingDate: '2023-03-19T18:30:00.000Z',
          endingDate: '2023-03-25T18:30:00.000Z',
        },
        
      ],
    },
  };

  it("should render the component without errors", () => {
    render(<ScoreCard scoreData={scoreData} />);
    expect(screen.getByTestId("score-card")).toBeInTheDocument();
  });

  it("should display the average score correctly", () => {
    render(<ScoreCard scoreData={scoreData} />);
    expect(screen.getByText("3.5")).toBeInTheDocument();
  });

  it("should display the total score grade correctly", () => {
    render(<ScoreCard scoreData={scoreData} />);
    expect(screen.getByText("Mostly Outstanding")).toBeInTheDocument();
  });

  it("should have the correct length", () => {
    expect(SCORECARD.length).toBe(5); // Replace 5 with the expected length
 });
  
});