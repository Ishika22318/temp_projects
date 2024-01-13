import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AccessDenied from "../components/errorPages/AccessDenied";
import InternalServerError from "../components/errorPages/InternalServerError";
import PageNotFound from "../components/errorPages/PageNotFound";
import { BrowserRouter } from "react-router-dom";

test("renders access denied page correctly", () => {
  const { getByText } = render(
    <BrowserRouter>
      <AccessDenied />
    </BrowserRouter>
  );

  // Assert the presence of specific elements and their content
  expect(getByText("Unauthorised")).toBeInTheDocument();
  expect(getByText("401. Access denied.")).toBeInTheDocument();
  expect(getByText("You are not currently authorised to use the portal please login to access it.")).toBeInTheDocument();
  expect(getByText("Go to login →")).toBeInTheDocument();

  // Add more assertions if necessary
});

test("renders internal server error page correctly", () => {
  const { getByText } = render(
    <BrowserRouter>
      <InternalServerError />
    </BrowserRouter>
  );

  // Assert the presence of specific elements and their content
  expect(getByText("Internal Server Error")).toBeInTheDocument();
  expect(getByText("500. That's an error.")).toBeInTheDocument();
  expect(getByText("The server has encountered a situation.Please try after some time.")).toBeInTheDocument();

  // Add more assertions if necessary
});

test("renders page not found correctly", () => {
  const { getByText } = render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  );

  // Assert the presence of specific elements and their content
  expect(getByText("Page Not Found")).toBeInTheDocument();
  expect(getByText("404. That's an error.")).toBeInTheDocument();
  expect(getByText(`The request URL / < ${window.location.href} > was not found on this server.`)).toBeInTheDocument();

  fireEvent.click(getByText("← Return back"));
  // Add more assertions if necessary
});
