// import React from 'react';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import PageHeader from "../components/batch/PageHeader";

// const mockCreateObjectURL = jest.fn(() => 'fake-url');
// const mockRevokeObjectURL = jest.fn();

// window.URL.createObjectURL = mockCreateObjectURL;
// window.URL.revokeObjectURL = mockRevokeObjectURL;

// const mockHandleClickOpen = jest.fn();

// beforeEach(() => {
//     mockHandleClickOpen.mockClear();
//     mockCreateObjectURL.mockClear();
//     mockRevokeObjectURL.mockClear();
// });

// test('PageHeader component renders without errors', () => {
//     render(<PageHeader handleClickOpen={mockHandleClickOpen} />);
// });

// test('Clicking the "Download CSV" button triggers the download', async () => {

//     global.fetch = jest.fn(() =>
//         Promise.resolve({
//             text: () => Promise.resolve('fake-csv-data'),
//         })
//     );

//     render(<PageHeader handleClickOpen={mockHandleClickOpen} />)

//     const downloadButton = screen.getByTestId('download-icon-button');
//     fireEvent.click(downloadButton);

//     await waitFor(() => {
//         expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/v1/exportBatch', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify([]),
//         });
//     });

//     global.fetch.mockClear();
// });

// test('Clicking the "Create" button calls handleClickOpen', () => {
//     render(<PageHeader handleClickOpen={mockHandleClickOpen} />)

//     const createButton = screen.getByTestId('create-icon-button');
//     fireEvent.click(createButton);

//     expect(mockHandleClickOpen).toHaveBeenCalledTimes(1);
// });

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PageHeader from "../components/batch/PageHeader";
import { MemoryRouter } from "react-router-dom";

describe("PageHeader Component", () => {
    afterEach(() => {
        localStorage.clear();
    });

    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <PageHeader />
            </MemoryRouter>
        );
    });

    // it("calls downloadAllRows function when the download button is clicked", async () => {
    //     const mockDownloadAllBatch = jest.fn(() => Promise.resolve({ csvData: "csv data" }));
    //     global.downloadAllBatch = mockDownloadAllBatch;

    //     render(
    //         <MemoryRouter>
    //             <PageHeader />
    //         </MemoryRouter>
    //     );

    //     const downloadButton = screen.getByTestId("download-icon-button");

    //     fireEvent.click(downloadButton);

    //     await waitFor(() => {
    //         expect(mockDownloadAllBatch).toHaveBeenCalledTimes(1);
    //         // You don't need to redefine localStorage here
    //         // Check for other assertions based on your implementation
    //     });
    // });

    // it("clears local storage and navigates to '/401' when token is not available", async () => {
    //     const navigateMock = jest.fn();
    //     global.downloadAllBatch = jest.fn(() => Promise.reject("Token not available"));
    //     global.URL.createObjectURL = jest.fn();

    //     const localStorageMock = {
    //         getItem: jest.fn(() => null), // Simulate missing token
    //         clear: jest.fn(),
    //     };

    //     const realLocalStorage = global.localStorage;
    //     global.localStorage = localStorageMock;

    //     render(
    //         <MemoryRouter initialEntries={["/"]}>
    //             <PageHeader />
    //         </MemoryRouter>
    //     );

    //     const downloadButton = screen.getByTestId("download-icon-button");

    //     fireEvent.click(downloadButton);

    //     await waitFor(() => {
    //         expect(localStorageMock.clear).toHaveBeenCalled();
    //         expect(navigateMock).toHaveBeenCalledWith("/401");
    //         // You can add more assertions as needed
    //     });

    //     global.localStorage = realLocalStorage;
    // });

    it("calls handleClickOpen function when the create button is clicked", () => {
        const handleClickOpenMock = jest.fn();
        render(
            <MemoryRouter>
                <PageHeader handleClickOpen={handleClickOpenMock} />
            </MemoryRouter>
        );
        const createButton = screen.getByTestId("create-icon-button");

        fireEvent.click(createButton);

        expect(handleClickOpenMock).toHaveBeenCalledTimes(1);
    });
});











