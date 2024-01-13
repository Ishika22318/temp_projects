import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/header/Header";

describe("Header component", () => {
  test("renders the logo", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });

  test("navigates to the correct tab on tab click", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const trainingTab = screen.getByText("Training");
    fireEvent.click(trainingTab);

    expect(trainingTab).toHaveAttribute("aria-selected", "false");

    const myLearningTab = screen.getByText("My Learning");
    fireEvent.click(myLearningTab);

    expect(myLearningTab).toHaveAttribute("aria-selected", "false");
  });

  test("Logout button functionality check", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);
  });
});
