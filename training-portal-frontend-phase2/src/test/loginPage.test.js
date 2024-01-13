import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import LoginPage from "../components/loginPageUI/loginPage";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Test the Login Component", () => {
  test("render the login form with 1 button", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();
  });

  test("email input field should accept email", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText("john.doe@gmail.com");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    expect(emailInput.value).toBe("test@gmail.com");
  });

  test("password input field should have type password", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText("*********");
    expect(passwordInput.type).toBe("password");
  });

  test("button should trigger login function when clicked", async () => {
    const mockResponse = { user: "mockUser", role: "mockRole" };
    jest.spyOn(window, "alert").mockImplementation(jest.fn());
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText("john.doe@gmail.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const button = screen.getByTestId("submit");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/learning");
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "mockUser");
      expect(localStorage.setItem).toHaveBeenCalledWith("role", "mockRole");
      expect(window.alert).not.toHaveBeenCalled();
    });
  });

  test("button should show alert when user does not exist", async () => {
    const mockResponse = { user: null };
    const alertMock = jest.spyOn(window, "alert").mockImplementation(jest.fn());
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText("john.doe@gmail.com");
    const passwordInput = screen.getByPlaceholderText("*********");
    const button = screen.getByTestId("submit");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Please check Username and Password");
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
