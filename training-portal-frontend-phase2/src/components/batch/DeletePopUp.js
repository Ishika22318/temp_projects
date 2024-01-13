import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import * as styles from './DeletePopUpStyles';

function DeleteBatchDialog({ handleDeletePopUpClose, batchesToDelete, batchNameToDelete, handleDelete }) {
  const [confirmBatchName, setConfirmBatchName] = useState('');


  const [isFormValid, setIsFormValid] = useState(false);

  const updateFormValidity = (bname) => {
    const isValid = (bname === batchNameToDelete);
    setIsFormValid(isValid);
  };


  const [batchName, setBatchName] = useState('');
  const batchToDelete = batchNameToDelete;
  const numberOfBatch = batchesToDelete.length;
  // const handleConfirm = () => {
  //   if (batchName === batchToDelete) {
  //     // Perform deletion logic here
  //     console.log(`Deleting batch: ${batchToDelete}`);
  //     //   setOpen(false);
  //   } else {
  //     alert('Batch name does not match. Deletion canceled.');
  //   }
  // };

  return (
    (numberOfBatch > 1)
      ?
      (<div>
        <DialogTitle style={styles.titleStyle}>Bulk delete?</DialogTitle>
        <DialogContent>
          <DialogContentText style={styles.textStyle}>
            Are you certain you want to proceed with permanently deleting the <b> {numberOfBatch} Batch </b>?
            <br />This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePopUpClose} color="primary" style={styles.buttonstyle}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant='contained' color="primary" style={styles.buttonstyle}>
            Delete
          </Button>
        </DialogActions>
      </div>)
      : numberOfBatch !== 0 &&
      (<div>
        <DialogTitle style={styles.titleStyle}>Delete ?</DialogTitle>
        <DialogContent>
          <DialogContentText style={styles.textStyle}>
            Are you certain you want to proceed with permanently deleting the chosen batch <b> "{batchToDelete}" </b>?
            <br />This action cannot be undone.
          </DialogContentText>
          <label style={styles.typeStyle}>Type the batch name to confirm</label>
          <TextField
            autoFocus
            margin="dense"
            id="batch-name"
            data-testid="batch-name"
            color={(batchName !== batchToDelete && batchName.length >= 1) ? 'error' : 'primary'}
            fullWidth
            variant="outlined"
            value={batchName}
            onChange={(e) => {
              setBatchName(e.target.value)
              updateFormValidity(e.target.value)
            }}
          />
          {(batchName !== batchToDelete && batchName !== '') ? <label style={styles.matchStyle}>Batch name doesn’t matches</label> : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeletePopUpClose} color="primary" style={styles.buttonstyle}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant='contained' style={styles.buttonstyle} color="primary" disabled={!isFormValid}>
            Delete
          </Button>
        </DialogActions>
      </div>)
  );
}

export default DeleteBatchDialog;
