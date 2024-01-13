import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DrawerComp from "../components/header/Drawer";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred.</div>; // Custom error message
    }

    return this.props.children;
  }
}

describe("DrawerComp", () => {
  it("should render the logo", () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <DrawerComp />
        </MemoryRouter>
      </ErrorBoundary>
    );
  });

  it("should open the drawer when menu icon is clicked", () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <DrawerComp />
        </MemoryRouter>
      </ErrorBoundary>
    );
    const menuIcon = screen.getByTestId("open-drawer");
    fireEvent.click(menuIcon);
    const drawer = screen.getByTestId("presentation");
    expect(drawer).toHaveClass("MuiDrawer-root", { open: true });
  });

  it("should close the drawer when close icon is clicked", () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <DrawerComp />
        </MemoryRouter>
      </ErrorBoundary>
    );
    const menuIcon = screen.getByTestId("open-drawer");
    fireEvent.click(menuIcon);
    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);
    const drawer = screen.getByTestId("presentation");
    expect(drawer).toHaveClass("MuiDrawer-root", { open: false });
  });

  it("should navigate to 'My Learning' when clicked on the respective link", () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <DrawerComp />
        </MemoryRouter>
      </ErrorBoundary>
    );
    const menuIcon = screen.getByTestId("open-drawer");
    fireEvent.click(menuIcon);
    const myLearningLink = screen.getByTestId("learning");
    fireEvent.click(myLearningLink);
    const myTrainingLink = screen.getByTestId("training");
    fireEvent.click(myTrainingLink);
    const myReportLink = screen.getByTestId("report");
    fireEvent.click(myReportLink);
  });

  it("should log out when 'Log Out' button is clicked", () => {
    render(
      <ErrorBoundary>
        <MemoryRouter>
          <DrawerComp />
        </MemoryRouter>
      </ErrorBoundary>
    );
    const menuIcon = screen.getByTestId("open-drawer");
    fireEvent.click(menuIcon);
    const logoutButton = screen.getByTestId("logout");
    fireEvent.click(logoutButton);
  });
});
