import React from "react";
import CourseContent from "../components/courseContent/CourseContent";
import CourseContentPage from "../screen/courseContent/CourseContentPage";
import CourseContentHeading from "../components/courseContent/CourseContentHeading";
import CourseContentTests from "../components/courseContent/CourseContentTests";
import { render, screen, act, waitFor } from "@testing-library/react";
import { fetchDataFromAPI } from "../services/apicall";
import {BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";


jest.mock("../services/apicall", () => ({
  fetchDataFromAPI: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockData = {
  success: true,
  data: {
    courseDuration: 3,
    label: "technical",
    description: "asdfghjkl",
    course: "CSS",
    courseUrl: "https://google.com",
    days: [
      {
        DAY: 3,
        startTime: "09:00",
        endTime: "13:00",
        label: "COURSE",
      },
      {
        DAY: 4,
        startTime: "11:00",
        endTime: "12:00",
        label: "COURSE",
      },
      {
        DAY: 5,
        startTime: "09:00",
        endTime: "12:00",
        label: "COURSE",
      },
      {
        DAY: 5,
        label: "ASSESSMENT",
        url: "https://google.com",
        description: "description",
        startTime: "14:00",
        endTime: "15:00",
      },
      {
        DAY: 5,
        label: "ASSIGNMENT",
        url: "https://google.com",
        description: "description",
        startTime: "15:00",
        endTime: "16:00",
      },
    ],
    courseContent: [
      {
        topic: "Introduction to CSS",
        subtopics: ["CSS syntax", "Inline vs. embedded vs. external stylesheets", "CSS selectors and properties"],
      },
      {
        topic: "CSS Box Model",
        subtopics: ["Margin, padding, and border", "Width and height", "Box model properties"],
      },
      {
        topic: "CSS Layouts",
        subtopics: ["Positioning elements", "Floating and clearing", "Flexbox", "Grid"],
      },
      {
        topic: "CSS Styling",
        subtopics: ["Fonts and text styling", "Backgrounds and gradients", "Transformations and transitions", "Responsive design"],
      },
    ],
  },
};

describe("CourseContent", () => {
  beforeEach(() => {
    jest.spyOn(React, "useState").mockImplementation((initialValue) => [initialValue, jest.fn()]);
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
  
    // Mock useNavigate
    useNavigate.mockImplementation(() => jest.fn());
  
    fetchDataFromAPI.mockResolvedValue(mockData);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test("renders CourseContent component", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <CourseContent />
        </MemoryRouter>
      );
    });
  });

  test("renders the CourseContentTests component with correct link and assessment label", () => {
    const mockAssessmentLink = "/";

    const { getByTestId }=render(
      <BrowserRouter>
        <CourseContentTests label="Assessment" link="http://www.google.com" description="description" />
      </BrowserRouter>
    );

    const linkElement = screen.getByTestId("testLink");
    expect(linkElement).toHaveAttribute("href", "http://www.google.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
    const iconElement = screen.getByTestId('Icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.firstChild.nodeName).toBe('svg');
  });


  test("renders the CourseContentTests component with correct link and assignment label", () => {
    const mockAssessmentLink = "/";

    const { getByTestId }=render(
      <BrowserRouter>
        <CourseContentTests label="Assignment" link="http://www.google.com" description="description" />
      </BrowserRouter>
    );

    const linkElement = screen.getByTestId("testLink");
    expect(linkElement).toHaveAttribute("href", "http://www.google.com");
    expect(linkElement).toHaveAttribute("target", "_blank");
    const iconElement = screen.getByTestId('ElseIcon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.firstChild.nodeName).toBe('svg');
  });

  test("renders the CourseContentHeading component with correct link", () => {
    const mockAssignmentLink = "/";

    render(
      <BrowserRouter>
        <CourseContentHeading heading={mockAssignmentLink} />
      </BrowserRouter>
    );

    const linkElement = screen.getByTestId("heading");
    expect(linkElement).toBeInTheDocument();
  });
  test("renders components", () => {
    render(
      <BrowserRouter>
        <CourseContentPage />
      </BrowserRouter>
    );
  });
});