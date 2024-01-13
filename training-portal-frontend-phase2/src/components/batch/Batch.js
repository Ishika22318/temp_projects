import React from "react";
import TabularData from "./TabularData";
import PageHeader from "./PageHeader";
import Modal from '@mui/material/Modal';
import SingleLineFormComponent from './FormWithDragDrop';
const Batch = () => {
    const [open, setOpen] = React.useState(false);
   
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div style={{marginTop:"70px"}}>
            <PageHeader handleClickOpen={handleClickOpen} />
            <TabularData />
            <Modal  open={open} onClose={handleClose} style={{overflow:"scroll"}}>
                <SingleLineFormComponent handleClose={handleClose}/>
            </Modal>
        </div>
    );
};

export default Batch;
