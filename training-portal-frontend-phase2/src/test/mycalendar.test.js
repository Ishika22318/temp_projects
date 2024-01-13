import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Mytrainingcalendar from "../components/learningtab/mycalendar";

test("renders events correctly", () => {
  const events = [
    { title: "Event 1", start: new Date("2023-06-27T10:00:00"), end: new Date("2023-06-27T12:00:00") },
    { title: "Event 2", start: new Date("2023-06-28T14:00:00"), end: new Date("2023-06-28T16:00:00") },
  ];

  render(<Mytrainingcalendar event={events} setTTViewDate={() => {}} />);

  // Find the event titles
  const event1Title = screen.getByText("Event 1");
  const event2Title = screen.getByText("Event 2");

  // Assert that the event titles are rendered correctly
  expect(event1Title).toBeInTheDocument();
  expect(event2Title).toBeInTheDocument();
});
