import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Report from "../screen/reportTab/report";
import { fetchData } from "../utils/reportAPI";
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock("../utils/reportAPI", () => ({
  fetchData: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockData = {
  success: true,
  message: "Success. Returns the Performance Report Management data.",
  data: {
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
        mentorFeedbacks: ["Excellent work!", "Good job!", "Great progress!"],
        timeManagement: 4,
        overallAssessment: 80,
        communicationSkill: 4,
        attendanceParticipation: 4,
        assignment: 80,
        startingDate: "2023-03-19T18:30:00.000Z",
        endingDate: "2023-03-25T18:30:00.000Z",
      },
    ],
  },
};

beforeEach(() => {
  jest.spyOn(React, "useState").mockImplementation((initialValue) => [initialValue, jest.fn()]);
  jest.spyOn(React, "useEffect").mockImplementation((f) => f());

  // Mock useNavigate
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

  fetchData.mockResolvedValue(mockData);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders PageTitle component", () => {
  render(
    <MemoryRouter>
      <Report />
    </MemoryRouter>
  );
  const pageTitleElement = screen.getByText("Performance Report");
  expect(pageTitleElement).toBeInTheDocument();
});

test("renders ScoreCard component with correct props", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Report />
      </MemoryRouter>
    );
  });
  const scoreCardComponent = screen.getByTestId("ScoreCard");
  expect(scoreCardComponent).toBeInTheDocument();
});

test("renders WeekCard components with correct props", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Report />
      </MemoryRouter>
    );
  });
  const weekCardComponents = screen.getAllByTestId("WeekCard");
  expect(weekCardComponents.length).toBe(mockData.data.weeks.length);
});

// test("handles error and navigates to /500", async () => {
//   fetchData.mockRejectedValueOnce(new Error("An error occurred"));

//   const navigate = jest.fn();
//   jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error warnings

//   render(<Report />, { wrapper: MemoryRouter, navigate });

//   await waitFor(() => {
//     expect(navigate).toHaveBeenCalledWith("/500");
//   });

//   expect(navigate).toHaveBeenCalledTimes(1);
// });

test("renders the component with fetched data", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Report />
      </MemoryRouter>
    );
  });
});
