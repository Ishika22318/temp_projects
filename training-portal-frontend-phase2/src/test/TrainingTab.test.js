import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TrainingTab from "../components/trainingTab/TrainingTab";
import { BrowserRouter as Router } from "react-router-dom";
import TrainingTabPage from "../screen/trainingTab/TrainingTabPage";
import Tabs from "../components/trainingTab/Tabs";
import CustomizedTables from "../components/trainingTab/Table";
import { checkgetCall } from '../services/apicall';

jest.mock('../services/apicall', () => ({
  checkgetCall: jest.fn(),
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe("Training Tab Component", () => {
  test("renders the TrainingTab component", () => {
    render(
      <Router>
        <TrainingTab />
      </Router>
    );
    const linkElement = screen.getByTestId("trainingTab");
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the TrainingTabPage component", () => {
    render(
      <Router>
        <TrainingTabPage />
      </Router>
    );
  });

  const data = [{ course: "HTML", week: 1 }];
  test("renders the CustomizedTables component", () => {
    render(
      <Router>
        <CustomizedTables tableData={data} />
      </Router>
    );
  });

  const tabHeadingsData = [
    {
      label: "technical",
      value: "1",
    },
    {
      label: "soft courses",
      value: "2",
    },
  ];

  test("navigates to login when status code is 401", async () => {
    const mockToken = 'mockToken';
    const mockData = {
      statuscode: 401,
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);

    render(
      <Router>
        <Tabs tabHeadingsData={tabHeadingsData} />
      </Router>
    );

    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/training/');
    });

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/401');
    });
    localStorage.clear();
  });

  test("navigates to page not found when status code is 404", async () => {
    const mockToken = 'mockToken';
    const mockData = {
      message: 'Not Found',
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);

    render(
      <Router>
        <Tabs tabHeadingsData={tabHeadingsData} />
      </Router>
    );

    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/training/');
    });

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/404');
    });
  });

  test("navigates to internal server error when status code is 500", async () => {
    const mockToken = 'mockToken';
    const mockData = {
      message: 'Internal Server Error',
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);

    render(
      <Router>
        <Tabs tabHeadingsData={tabHeadingsData} />
      </Router>
    );

    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/training/');
    });

    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/500');
    });
  });
});
