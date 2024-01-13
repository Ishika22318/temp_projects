import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CourseContentHeading from "../components/courseContent/CourseContentHeading";
import CourseContent from "../components/courseContent/CourseContent";
import { BrowserRouter, useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("CourseContentHeading", () => {
  test("goBack navigates back when clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <CourseContentHeading />
      </BrowserRouter>
    );

    const backButton = screen.getByTestId("id");

    fireEvent.click(backButton);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
