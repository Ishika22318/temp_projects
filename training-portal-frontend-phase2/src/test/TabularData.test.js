import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TabularData from "../components/batch/TabularData";
import { batchAPI } from "../services/batchapi";


jest.mock("../services/batchapi"); // Mock the API function

const mockData = {

    "success": true,
    "data": [
        {
            "_id": "650e7d936ec48a1b8d3ead57",
            "batch_name": "Jul23",
            "description": "",
            "created_by": "Abhishek",
            "status": "Completed",
            "start_date": "2023-09-15T00:00:00.000Z",
            "end_date": null,
            "updated_on": "2023-09-23T05:54:27.800Z",
            "program": [
                "Generic Training",
                "Soft Skills Traning",
                "Technical Skills Training"
            ],
            "role": [
                "Business Analyst",
                "Data Engineer"
            ],
            "coursesID": [
                "6508648fc2fee771d3c6d5b1",
                "65086488c2fee771d3c6d5a2",
                "6508646bc2fee771d3c6d593"
            ],
            "__v": 0
        },
        {
            "_id": "651116feb23a43282d4f0596",
            "batch_name": "jan23",
            "description": "This Batch is created on 25/12/2023.",
            "created_by": "Abhishek",
            "status": "In Progress",
            "start_date": "2023-09-20T00:00:00.000Z",
            "end_date": "2023-09-26T00:00:00.000Z",
            "updated_on": "2023-09-25T05:13:34.173Z",
            "program": [
                "Generic Training",
                "Soft Skills Traning",
                "Technical Skills Training"
            ],
            "role": [
                "Business Analyst",
                "Data Engineer",
                "Framework Engineer",
                "Machine Learning Engineer",
                "Platform Engineer"
            ],
            "coursesID": [
                "65086412c2fee771d3c6d566",
                "650863ebc2fee771d3c6d557",
                "65086447c2fee771d3c6d575",
                "6508644fc2fee771d3c6d584",
                "6508646bc2fee771d3c6d593",
                "65086488c2fee771d3c6d5a2",
                "6508648fc2fee771d3c6d5b1",
                "65086493c2fee771d3c6d5c0",
                "65086498c2fee771d3c6d5cf",
                "6508649fc2fee771d3c6d5de",
                "650864acc2fee771d3c6d5ed",
                "650864b5c2fee771d3c6d5fc",
                "650864bdc2fee771d3c6d60b",
                "650864d8c2fee771d3c6d61a",
                "65086fef608081e3803ac3b6"
            ],
            "__v": 0
        },
        {
            "_id": "6516a26d7c22fce383bcdc58",
            "batch_name": "Batch1 ",
            "description": "Description",
            "created_by": "Shivam Rai",
            "status": "Completed",
            "start_date": "2023-09-13T00:00:00.000Z",
            "end_date": null,
            "updated_on": "2023-09-29T10:09:49.759Z",
            "program": [
                "Generic Training",
                "Soft Skills Traning",
                "Technical Skills Training"
            ],
            "role": [
                "Business Analyst",
                "Data Engineer",
                "Framework Engineer"
            ],
            "coursesID": [
                "650863ebc2fee771d3c6d557",
                "65086447c2fee771d3c6d575",
                "65086412c2fee771d3c6d566"
            ],
            "__v": 0
        },

    ]

};

// Mock the batchAPI function to return the mock data
batchAPI.mockResolvedValue({ data: mockData });

describe("TabularData Component", () => {
    it("renders TabularData without errors", async () => {
        render(
            <MemoryRouter>
                <TabularData />
            </MemoryRouter>
        )
        await waitFor(() => {
            expect(screen.getByText("Batch Name")).toBeInTheDocument();

        });
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Created By")).toBeInTheDocument();
        expect(screen.getByText("Start Date")).toBeInTheDocument();
        expect(screen.getByText("End Date")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(screen.getByText("Updated On")).toBeInTheDocument();
    });

    it("render and text check", async () => {
        render(
            <MemoryRouter>
                <TabularData />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId("table-body")).toBeInTheDocument();

        });
        const iconButtons = screen.getAllByRole('button');
        const firstIconButton = iconButtons[0];
        fireEvent.click(firstIconButton);
        const firstIconButton1 = iconButtons[1];
        fireEvent.click(firstIconButton1);
        const firstIconButton2 = iconButtons[2];
        fireEvent.click(firstIconButton2);
        const firstIconButton3 = iconButtons[3];
        fireEvent.click(firstIconButton3);
        const firstIconButton4 = iconButtons[4];
        fireEvent.click(firstIconButton4);
        const firstIconButton5 = iconButtons[5];
        fireEvent.click(firstIconButton5);
        const firstIconButton6 = iconButtons[6];
        fireEvent.click(firstIconButton6);
        const firstIconButton7 = iconButtons[7];
        fireEvent.click(firstIconButton7);
        const firstIconButton8 = iconButtons[8];
        fireEvent.click(firstIconButton8);
        const firstIconButton9 = iconButtons[9];
        fireEvent.click(firstIconButton9);
        const firstIconButton10 = iconButtons[10];
        fireEvent.click(firstIconButton10);
        const firstIconButton11 = iconButtons[11];
        fireEvent.click(firstIconButton11);
        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);

    });

});

