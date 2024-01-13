import React from "react";
import { render, screen } from "@testing-library/react";
import Mytimetable from "../components/learningtab/timetable";

test("renders timetable items", () => {
  // Define sample props with timetable data
  const todayTT = [
    { id: 1, title: "Meeting", label: "10:00 AM - 11:00 AM", timeline: "Zoom" },
    { id: 2, title: "Lunch Break", label: "12:00 PM - 1:00 PM", timeline: "Offline" },
  ];
  jest.spyOn(console, "warn").mockImplementation(() => {});
  render(<Mytimetable todayTT={todayTT} />);

  // Assert that the timetable items are rendered
  const timetableItems = screen.getAllByRole("heading", { level: 5 });
  expect(timetableItems).toHaveLength(todayTT.length);

  // Assert the text content of the timetable items
  expect(screen.getByText("Meeting")).toBeInTheDocument();
  expect(screen.getByText("Lunch Break")).toBeInTheDocument();
  console.warn.mockRestore();
});
