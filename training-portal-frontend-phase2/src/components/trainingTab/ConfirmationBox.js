import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { courseUrl } from "../../utils/url";
import { deleteCall, deleteBulkCall } from "../../services/apicall";

const ConfirmationBox = ({ selectedData, openDialog, onClose, isBulk }) => {
  const courseName = !isBulk ? selectedData.courseName.replace(/\b\w/g, (match) => match.toUpperCase()) : ""
  const courseID = !isBulk ? selectedData._id : selectedData;
  const [confirmationText, setConfirmationText] = useState('');
  const [open, setOpen] = useState(openDialog);
  const [warning, setWarning] = useState("");

  const handleOpenDialog = () => {
    setWarning("");
    setOpen(true);
  };

  const handleCloseDialog = () => {
    isBulk = false
    setWarning("");
    setConfirmationText("")
    setOpen(false);
    onClose("Success")
  };


  const handleDelete = async () => {


    try {
      const token = localStorage.getItem("token");
      let response = []
      if (isBulk) {
        response = await deleteBulkCall(token, courseUrl, courseID)
      } else {
        if (confirmationText === courseName) {
          response = await deleteCall(token, courseUrl, courseID)
        } else {
          setWarning("Course name doesn’t matches");
          setConfirmationText("")
        }
      }
      if (response.ok) {
        setOpen(false);
        onClose("Success")
      } else {
        setOpen(false);
        onClose("Failed")
        console.error('Failed to delete course');
      }
    } catch (error) {
      onClose("Failed")
      setConfirmationText("")
      setOpen(false);
      console.error('An error occurred while deleting the course', error);
    }

  };

  return (
    <div>
      <DeleteIcon onClick={handleOpenDialog} style={{ cursor: 'pointer' }} />

      <Dialog open={open} onClose={handleCloseDialog}
        maxWidth="sm"
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        <Paper
          elevation={3}
          style={{
            padding: '10px',
            background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #D9DAE4, #D9DAE4)',
            borderRadius: '4px',
            border: '1px solid #D9DAE4',
            boxShadow: '3px 2px 14px 0px #0000004D',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h4" style={{ width: '857px', textAlign: 'left', color: '#0D4896', background: 'white', padding: '10px' }}>
            Delete?
          </Typography>

          <Typography variant="body1" style={{ width: '100%', height: 'fit-content', fontSize: '16px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0em', textAlign: 'left', padding: '10px' }}>
            Are you certain you want to proceed with permanently deleting the {isBulk ? <strong>{courseID.length} Batch</strong> : <>chosen course <strong> {courseName} </strong></>}?
            <br />
            This action cannot be undone.
          </Typography>
          {!isBulk ? <>
            <Typography variant="body1" style={{ width: '100%', height: 'fit-content', fontSize: '16px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0em', textAlign: 'left', background: 'white', color: 'black', padding: '10px' }}>
              Type the course name to confirm
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              placeholder="Enter course name"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            {warning && <p style={{ color: "red" }}>{warning}</p>}
          </> : ""}
          <Box
            display="flex"
            justifyContent="flex-end"
            marginTop="20px"
          >
            <Button onClick={handleCloseDialog} variant="contained" color="primary" style={{ marginRight: '8px', borderRadius: '5px', padding: '12px 25px', width: 'fit-content', height: 'fit-content', background: 'white', color: '#0D4896' }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleDelete} sx={{ borderRadius: '5px', padding: '12px 25px', width: 'fit-content', height: 'fit-content', background: '#0D4896', color: 'white', '&:hover': { background: '#858585', }, }}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Dialog>
    </div>
  );
};

export default ConfirmationBox;