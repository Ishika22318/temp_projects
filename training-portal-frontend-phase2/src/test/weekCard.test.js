import React from "react";
import WeekCard from "../screen/reportTab/weekCard";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe("WeekCard", () => {
  const weekData = {
    weekId: 1,
    startingDate: "2023-06-01",
    endingDate: "2023-06-07",
    assignment: 4.5,
    mentorFeedbacks: ["Good job!","Keep it up!"],
    timeManagement: 3.2,
    overallAssessment: 18,
    communicationSkill: 2.8,
    attendanceParticipation: 3.5,
  };
  test('renders week name and dates correctly', () => {
    const weekData = {
      weekId: 1,
      startingDate: "2023-06-01",
      endingDate: "2023-06-07",
      assignment: 4.5,
      mentorFeedbacks: ["Good job!","Keep it up!"],
      timeManagement: 3.2,
      overallAssessment: 18,
      communicationSkill: 2.8,
      attendanceParticipation: 3.5,
    };
  
    render(<WeekCard weekData={weekData} />);
  
    const weekName = screen.getByText("Week 1");
    const startingDate = screen.getByText(/1st June 2023/, { exact: false });
    const endingDate= screen.getByText(/7th June 2023/, { exact: false });
  
    expect(weekName).toBeInTheDocument();
    expect(startingDate).toBeInTheDocument();
    expect(endingDate).toBeInTheDocument();
  });




  test("renders score boxes with correct labels and scores", () => {
    const { getByText } = render(<WeekCard weekData={weekData} />);
    const overallAssessmentLabel = getByText("Overall Assessment");
    const assignmentLabel = getByText("Assignment");
    const overallAssessmentScore = getByText("18");
    const assignmentScore = getByText("4.5");

    expect(overallAssessmentLabel).toBeInTheDocument();
    expect(assignmentLabel).toBeInTheDocument();
    expect(overallAssessmentScore).toBeInTheDocument();
    expect(assignmentScore).toBeInTheDocument();
  });


test('renders mentor feedback correctly', () => {

  render(<WeekCard weekData={weekData} />);

  const mentorFeedbackTitle = screen.getByText("Mentor's Feedback");
  const mentorFeedback1 = screen.getByText(/Good job!/, { exact: false });
  const mentorFeedback2 = screen.getByText(/Keep it up!/, { exact: false });

  expect(mentorFeedbackTitle).toBeInTheDocument();
  expect(mentorFeedback1).toBeInTheDocument();
  expect(mentorFeedback2).toBeInTheDocument();
});
  });

 
