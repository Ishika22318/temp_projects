import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteBatchDialog from '../components/batch/DeletePopUp';
import {BrowserRouter} from "react-router-dom";

describe('DeleteBatchDialog', () => {
  it('renders single batch delete dialog', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();
    const batchNameToDelete = 'TestBatch';

    const { getByText, getByLabelText } = render(
        <BrowserRouter>
      <DeleteBatchDialog
        handleDeletePopUpClose={handleClose}
        batchesToDelete={[batchNameToDelete]}
        batchNameToDelete={batchNameToDelete}
        handleDelete={handleDelete}
      />
      </BrowserRouter>
    );

    expect(getByText('Delete ?')).toBeInTheDocument();
    //expect(getByText(`Are you certain you want to proceed with permanently deleting the chosen batch "${batchNameToDelete}"?`)).toBeInTheDocument();

    const deleteButton = getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    //expect(handleDelete).toHaveBeenCalledWith();

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    //expect(handleClose).toHaveBeenCalledWith();
  });

  it('renders bulk delete dialog', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();
    const batchesToDelete = ['Batch1', 'Batch2', 'Batch3'];

    const { getByText } = render(
      <BrowserRouter>
      <DeleteBatchDialog
        handleDeletePopUpClose={handleClose}
        batchesToDelete={batchesToDelete}
        batchNameToDelete={''}
        handleDelete={handleDelete}
      />
      </BrowserRouter>
    );

    expect(getByText('Bulk delete?')).toBeInTheDocument();
    //expect(getByText(`Are you certain you want to proceed with permanently deleting the 3 Batch?`)).toBeInTheDocument();

    const deleteButton = getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    //expect(handleDelete).toHaveBeenCalledWith();

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    //expect(handleClose).toHaveBeenCalledWith();
  });

  it('validates batch name input', () => {
    const handleClose = jest.fn();
    const handleDelete = jest.fn();
    const batchNameToDelete = 'TestBatch';

    const { getByText, getByTestId } = render(
      <BrowserRouter>
      <DeleteBatchDialog
        handleDeletePopUpClose={handleClose}
        batchesToDelete={[batchNameToDelete]}
        batchNameToDelete={batchNameToDelete}
        handleDelete={handleDelete}
      />
      </BrowserRouter>
    );

    const mockUpdateFormValidity = jest.fn();
    
    const batchNameInput = getByTestId("batch-name");
    fireEvent.change(batchNameInput, { target: { batchName: 'WrongBatch' } });
    expect(mockUpdateFormValidity).toHaveBeenCalledWith('New Batch Name');
    // const errorMessage = getByText('Batch name doesn’t match');
    // expect(errorMessage).toBeInTheDocument();

    const deleteButton = getByText('Delete');
    expect(deleteButton).toBeDisabled();

    // fireEvent.change(batchNameInput, { target: { batchName: 'TestBatch' } });

    // expect(deleteButton).not.toBeDisabled();
  });
});
