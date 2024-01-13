import { fetchData } from "../utils/reportAPI";

describe("fetchData", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI"
    ); // Replace 'your-token' with an actual token
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem("token");
  });

  it("returns the data when the API call is successful", async () => {
    const mockData = {
      success: true,
      message: "Success. Returns the Performance Report Management data.",
      data: {
        name: "Madhwan",
        grade: "Mostly Outstanding",
        emailId: "madhwan@quantiphi.com",
        attendanceParticipation: 3.89,
        communicationSkill: 3.67,
        timeManagement: 3.67,
        mockProject: 3.5,
        averageScore: 3.58,
        assessment: 3.07,
        weeks: [
          {
            weekId: 1,
            mentorFeedbacks: ["Excellent work!", "Good job!", "Great progress!"],
            timeManagement: 4,
            overallAssessment: 80,
            communicationSkill: 4,
            attendanceParticipation: 4,
            assignment: 80,
            startingDate: "2023-03-19T18:30:00.000Z",
            endingDate: "2023-03-25T18:30:00.000Z",
          },
        ],
      },
    };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    };
    global.fetch.mockResolvedValueOnce(mockResponse);

    const data = await fetchData();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("madhwan@quantiphi.com"), {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh3YW5AcXVhbnRpcGhpLmNvbSIsInJvbGUiOiJTRCIsImlhdCI6MTY4Nzk1NzY2N30.XwQ_8zXnk5xGCkEH5blcDxzkX0bu50NauUEn3d5F8vI",
      },
    });
    expect(data.data).toEqual(mockData.data);
  });

  // it("throws an error when the API call fails", async () => {
  //   const mockErrorResponse = {
  //     ok: false,
  //     status: 500,
  //     statusText: "Internal Server Error",
  //   };
  //   global.fetch.mockResolvedValueOnce(mockErrorResponse);

  //   await expect(fetchData()).rejects.toThrow("An error occurred => TypeError: res.json is not a function");
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  // });

  // it("throws an error when an error occurs during the fetch", async () => {
  //   const mockError = new Error("Network Error");
  //   global.fetch.mockRejectedValueOnce(mockError);

  //   await expect(fetchData()).rejects.toThrow("An error occurred => Error: Network Error");
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  // });
  it("navigates to the error page when the API call fails", async () => {
    const navigate = jest.fn(); // Mock the navigate function

    const mockErrorResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };
    global.fetch.mockResolvedValueOnce(mockErrorResponse);

    await expect(fetchData(navigate)).rejects.toThrow("An error occurred => TypeError: res.json is not a function");
    expect(navigate).toHaveBeenCalledWith("/500"); // Ensure navigate function was called with the correct path
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("navigates to the error page when an error occurs during the fetch", async () => {
    const navigate = jest.fn(); // Mock the navigate function

    const mockError = new Error("Network Error");
    global.fetch.mockRejectedValueOnce(mockError);

    await expect(fetchData(navigate)).rejects.toThrow("An error occurred => Error: Network Error");
    expect(navigate).toHaveBeenCalledWith("/500"); // Ensure navigate function was called with the correct path
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
