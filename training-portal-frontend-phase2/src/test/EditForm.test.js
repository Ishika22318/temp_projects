import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditForm from "../components/batch/EditForm";
import { fetchUsersData } from '../utils/usersAPI';
import { batchDetailsAPI, getCoursesAndJobRolesApi } from "../services/batchapi";


const mockData =
{
    data: {
        "success": true,
        "data": {
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
            "role": [{ roleName: "Software Developer", id: "651c5853d36ec6c5ae70b283" }],
            "coursesID": [

            ]
        }
    },

};

const mockData1 = {
    courses: [
        {
            "data": [
                {
                    "jobRole": "652e71a002faa8e4ffa2cd98",
                    "_id": "6508648fc2fee771d3c6d5b1"
                }
            ],
            "courseName": "Effective Communication in workplace"
        }
    ],
    jobRoles: [
        { _id: '651c5853d36ec6c5ae70b283', roleName: "Software Developer" },
    ]
};

const mockData2 = {

    data: [{
        "name": "Sandeep",
        "email": "sandeep@gmail.com",
        "id": "123456789",
    }]
}


jest.mock('../services/batchapi', () => ({
    batchDetailsAPI: jest.fn(),
    getCoursesAndJobRolesApi: jest.fn(),
}));

jest.mock('../utils/usersAPI', () => ({
    fetchUsersData: jest.fn(),
}));


describe('EditForm', () => {
    it('renders form elements', async () => {
        batchDetailsAPI.mockResolvedValue(mockData);
        getCoursesAndJobRolesApi.mockResolvedValue(mockData1);
        fetchUsersData.mockResolvedValue(mockData2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <EditForm />
                </MemoryRouter>
            );
        });
        await screen.findByText('Batch name');

        expect(screen.getByText('Batch name')).toBeInTheDocument();
        expect(screen.getByText('About this batch')).toBeInTheDocument();
        expect(screen.getByText('Batch status')).toBeInTheDocument();
        expect(screen.getByText('Batch starts from')).toBeInTheDocument();
        expect(screen.getByText('Batch ends on')).toBeInTheDocument();
        expect(screen.getByText('Choose roles')).toBeInTheDocument();
        expect(screen.getByText('*Choose courses')).toBeInTheDocument();
        expect(screen.getByText('Choose interns')).toBeInTheDocument();
    });

    it('submits the form', async () => {
        batchDetailsAPI.mockResolvedValue(mockData);
        getCoursesAndJobRolesApi.mockResolvedValue(mockData1);
        fetchUsersData.mockResolvedValue(mockData2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <EditForm />
                </MemoryRouter>
            );
        });
        await screen.findByText('Batch name');

        fireEvent.change(screen.getByLabelText('Batch name'), { target: { value: 'New Batch' } });
        expect(screen.getByLabelText('Batch name')).toHaveValue('New Batch');
        fireEvent.click(screen.getByTestId('update-button'));
        fireEvent.click(screen.getByTestId('cancel-button'));
        fireEvent.change(screen.getByLabelText('About this batch'), { target: { value: 'This is a new batch.' } });
        expect(screen.getByLabelText('About this batch')).toHaveValue('This is a new batch.');
    });

    it('handles role and course selection', async () => {
        batchDetailsAPI.mockResolvedValue(mockData);
        getCoursesAndJobRolesApi.mockResolvedValue(mockData1);
        fetchUsersData.mockResolvedValue(mockData2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <EditForm />
                </MemoryRouter>
            );
        });
        await screen.findByText('Batch name');

        // Select a role
        fireEvent.click(screen.getByText('Software Developer'));
        fireEvent.click(screen.getByText('Batch status'));
        fireEvent.click(screen.getByText('Choose roles'));
        fireEvent.change(screen.getByLabelText('Batch starts from'), {
            target: { value: '2023-10-28' },
        });
        expect(screen.getByLabelText('Batch starts from')).toHaveValue('2023-10-28');
        fireEvent.change(screen.getByLabelText('Batch ends on'), {
            target: { value: '2023-11-10' },
        });
        expect(screen.getByLabelText('Batch ends on')).toHaveValue('2023-11-10');
    });

    it('handles batch status selection', async () => {
        batchDetailsAPI.mockResolvedValue(mockData);
        getCoursesAndJobRolesApi.mockResolvedValue(mockData1);
        fetchUsersData.mockResolvedValue(mockData2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <EditForm />
                </MemoryRouter>
            );
        });
        await screen.findByText('Batch name');
        expect(screen.getByLabelText('In Progress')).toBeChecked();
        expect(screen.getByLabelText('Completed')).not.toBeChecked();
        fireEvent.click(screen.getByLabelText('In Progress'));
        expect(screen.getByLabelText('In Progress')).toBeChecked();
        expect(screen.getByLabelText('Completed')).not.toBeChecked();
        fireEvent.click(screen.getByLabelText('Completed'));
        expect(screen.getByLabelText('In Progress')).not.toBeChecked();
        expect(screen.getByLabelText('Completed')).toBeChecked();
    });

    it('renders EditForm with Batch end date checkbox and input', async () => {
        batchDetailsAPI.mockResolvedValue(mockData);
        getCoursesAndJobRolesApi.mockResolvedValue(mockData1);
        fetchUsersData.mockResolvedValue(mockData2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <EditForm />
                </MemoryRouter>
            );
        });
        await screen.findByText('Batch name');
        const batchEndDateCheckbox = screen.getByText("Batch end date isn't available");
        const batchEndDateInput = screen.getByLabelText('Batch ends on');
        expect(batchEndDateInput).not.toBeDisabled();
        fireEvent.click(batchEndDateCheckbox);
        expect(batchEndDateInput).toBeDisabled();
        fireEvent.click(batchEndDateCheckbox);
        expect(batchEndDateInput).not.toBeDisabled();
    });

    it('Choose roles', async () => {
        // Render the component
        batchDetailsAPI.mockResolvedValue(mockData);
        getCoursesAndJobRolesApi.mockResolvedValue(mockData1);
        fetchUsersData.mockResolvedValue(mockData2);
        await act(async () => {
            render(
                <MemoryRouter>
                    <EditForm />
                </MemoryRouter>
            );
        });
        await screen.findByText('Batch name');
    });

});