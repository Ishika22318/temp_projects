import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import AccessDeniedPage from "../screen/errorPages/AccessDeniedPage";
import PageNotFoundPage from "../screen/errorPages/PageNotFoundPage";
import InternalServerErrorPage from "../screen/errorPages/InternalServerErrorPage";
import { BrowserRouter } from "react-router-dom";

test("renders components", () => {
  render(
    <BrowserRouter>
      <AccessDeniedPage />
    </BrowserRouter>
  );
});

test("renders components", () => {
  render(
    <BrowserRouter>
      <PageNotFoundPage />
    </BrowserRouter>
  );
});

test("renders components", () => {
  render(
    <BrowserRouter>
      <InternalServerErrorPage />
    </BrowserRouter>
  );
});
