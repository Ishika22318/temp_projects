import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Learningtab from '../screen/learningtab/learningtab';
import { checkgetCall } from '../services/apicall';

jest.mock('jwt-decode', () => jest.fn());
jest.mock('../services/apicall', () => ({
  checkgetCall: jest.fn(),
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Learningtab', () => {
  beforeEach(() => {
    jwtDecode.mockReturnValue({ name: 'John Doe', email: 'john@example.com' });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('fetches data and updates state correctly', async () => {
    const mockToken = 'mockToken';
    const mockData = {
      statuscode: 200,
      data: [
        {
          data: [
            {
              course: 'Course 1',
              completed_course: 2,
              progressed_course: 3,
              total_course: 5,
              days: [
                {
                  date: '2023-07-12',
                  startTime: '10:00',
                  endTime: '12:00',
                },
              ],
            },
          ],
        },
      ],
    };
    const mockData2 = {
      data: {
        averageScore: 4.5,
      },
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);
    checkgetCall.mockResolvedValueOnce(mockData2);

    render(
      <Router>
        <Learningtab />
      </Router>
    );

    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledTimes(2);
    });
    expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/training/');
    expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/reports/john@example.com');

    await waitFor(() => {
      expect(screen.getByText('Welcome Back, John Doe!')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Your Training Plan')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Timetable')).toBeInTheDocument();
    });

  });
  
  it(' navigates to login when status code is 401', async () => {
    const mockToken = 'mockToken';
    const mockData = {
      statuscode: 401,
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);
    

    render(
      <Router>
        <Learningtab />
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
  it(' navigates to page not found when status code is 404', async () => {
    const mockToken = 'mockToken';
    const mockData = {
      message: 'Not Found',
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);
    

    render(
      <Router>
        <Learningtab />
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
  it(' navigates to internal server error status code is 500', async () => {
    const mockToken = 'mockToken';
    const mockData = {
      message: 'Internal Server Error',
    };

    localStorage.setItem('token', mockToken);

    checkgetCall.mockResolvedValueOnce(mockData);
    

    render(
      <Router>
        <Learningtab />
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

  it('handles error when checkgetCall throws an error', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('API call failed');

    localStorage.setItem('token', mockToken);

    checkgetCall.mockRejectedValueOnce(mockError);

    render(
      <Router>
        <Learningtab />
      </Router>
    );

   
      expect(checkgetCall).toHaveBeenCalledTimes(1);
      expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/training/');
      await waitFor(() => {
        expect(screen.getByText('Welcome Back, John Doe!')).toBeInTheDocument();
      });    

  });

  it('handles error when server not live', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error('Failed to fetch');

    localStorage.setItem('token', mockToken);

    checkgetCall.mockRejectedValueOnce(mockError);

    render(
      <Router>
        <Learningtab />
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

  it('handles error when Invalid Token', async () => {
    const mockToken = 'mockToken';
    const mockError = new Error(`Invalid token specified: Cannot read properties of undefined (reading 'replace')`);

    localStorage.setItem('token', mockToken);

    checkgetCall.mockRejectedValueOnce(mockError);

    render(
      <Router>
        <Learningtab />
      </Router>
    );

   
    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(checkgetCall).toHaveBeenCalledWith(mockToken, 'http://localhost:3000/api/v1/training/');

    });
    await waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledWith('/');
    });
   


  });

  test("renders the Training Tab Component", () => {
    render(
      <Router>
        <Learningtab />
      </Router>
    );
    const linkElement = screen.getByTestId("learningTab");
    expect(linkElement).toBeInTheDocument();
  });
  
});





