import SingleLineFormComponent from '../components/batch/FormWithDragDrop';
import React from 'react';
import { render, screen , fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import {BrowserRouter} from "react-router-dom";

describe('SingleLineFormComponent', () => {
  it('renders the component without errors', () => {
    render(<BrowserRouter>
      <SingleLineFormComponent />
      </BrowserRouter>);
  });

  it('handles form submission with valid data', async () => {

    // Render the component
    const { getByText, getByTestId, getByRole } = render(
      <BrowserRouter>
      <SingleLineFormComponent />
      </BrowserRouter>
    );

    // Simulate user input and form submission
    //expect(getByRole('button')).toHaveTextContent('Create'||'Cancel');
    const nameField = getByTestId('nameField');
    fireEvent.change(nameField, { target: { name: 'Test Batch' } });
    //expect(nameField.name).toBe('Test Batch');
    const aboutField = getByTestId('aboutField');
    fireEvent.change(aboutField, { target: { about: 'Test Batch' } });
    //expect(aboutField.about).toBe('Test Batch');
    const programField = getByTestId('programField');
    fireEvent.change(programField, { target: { selectedPrograms: ['Generic Training']} });
    //expect(programField.selectedPrograms).toBe('Generic Training');
    const rolesField = getByTestId('rolesField');
    fireEvent.change(rolesField, { target: { selectedRoles: ['Business Analyst']} });
    //expect(rolesField.selectedRoles).toBe('Business Analyst');
    const startDateField = getByTestId('startDateField');
    fireEvent.change(startDateField, { target: { startDate: '2023-10-08T00:00:00.000Z' } });
    //expect(startDateField.startDate).toBe('2023-10-08');
    const endDateField = getByTestId('endDateField');
    fireEvent.change(endDateField, { target: { endDate: '2023-10-15T00:00:00.000Z' } });
    //expect(endDateField.endDate).toBe('2023-10-15');
    const courseField = getByTestId('courseField');
    fireEvent.change(courseField, { target: { selectedCourses: ['6508644fc2fee771d3c6d584'] } });
    //expect(courseField.selectedCourses).toBe('Git');

    const createButton = getByText('Create');
    fireEvent.click(createButton, { target: { isFormValid: true } });
    //expect(createButton).not.toBeDisabled();

    // Assert that the form submission function is called
    
  });

  it('handles file upload', () => {
    // Create a file object to simulate file selection
    const file = new File(['file content'], 'example.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const { getByTestId , getByText } = render(<BrowserRouter>
      <SingleLineFormComponent />
      </BrowserRouter>);
    
    const fileInput = getByTestId('file-upload');
    fireEvent.click(getByText('Browse files'));
    // Simulate a file input change
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Assert that the file state is updated
    expect(getByTestId('uploadedFile')).toHaveTextContent('example.xlsx');
    const createButton = getByText('Create');
    //fireEvent.click(createButton);
    expect(createButton).not.toBeDisabled();
  });

  // Add more test cases as needed
});
