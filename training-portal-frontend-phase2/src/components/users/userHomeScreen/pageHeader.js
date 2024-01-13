import React, { useState, useEffect } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Modal } from "@mui/material";
import UsersHeader from "./usersHeading";
import AddUser from "../addScreen/addUser";
import { exportUsers, fetchBatchData, fetchUsersData } from "../../../utils/usersAPI";
import { useNavigate } from "react-router-dom";
import { HEADERS } from "../../../utils/constants";

const PageHeader = ({ handleReloadData, handleFilterData }) => {
  const [batchData, setBatchData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [reload, setReload] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleBatchChange = (event) => {

    const selectedBatchId = event.target.value;
console.log("Selected " , selectedBatchId);
    setSelectedBatch(selectedBatchId);

    if (selectedBatchId === "All") {
      setSelectedBatch("");
      handleFilterData(data);
    } else {
      const selectedBatchData = batchData.find((b) => b.batch_name === selectedBatchId);
      const selectedBat = selectedBatchData ? selectedBatchData.id : null;
      if (selectedBat !== null) {
        const filteredData = data.filter((item) => item.batchId.includes(selectedBat));
        handleFilterData(filteredData);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
    setTimeout(() => {
      handleReloadData();
    }, 1000);
  };

  const fetchBatches = async () => {
    try {
      const response = await fetchBatchData(navigate);
      const batchesData = response.data.data;
      setBatchData(batchesData);
    } catch (error) {
      console.error("Error fetching batch data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetchUsersData();
      const apiData = response.data;
      setData(apiData);
      setIsLoading(false);
      handleFilterData(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchData();
  }, []);

  const downloadAllRows = async () => {
    try {
      await exportUsers(null, navigate);
    } catch (error) {
      console.error("Error in Downloading: ", error);
    }
  };

  return (
    <Box className="page-header">
      <Box className="page-header-main">
        <Box className="page-header-content">
          <UsersHeader title={HEADERS.USERS} />
          <Box className="page-header-title">
            <Box className="date-box">
              <FormControl variant="outlined" className="date-range-select">
                <InputLabel className="input-label-date">Batch</InputLabel>
                <Select value={selectedBatch} onChange={handleBatchChange} className="date-drop-down">
                  <MenuItem value="All" className="date-menu">
                    All
                  </MenuItem>
                  {batchData.map((batch) => (
                    <MenuItem key={batch.batch_name} value={batch.batch_name} className="date-menu">
                      {batch.batch_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="download-box">
              <Button variant="outlined" className="download-csv-button" onClick={downloadAllRows}>
                Download CSV
              </Button>
            </Box>
            <Box className="add-box">
              <Button variant="outlined" className="add-button" onClick={handleClickOpen}>
                + Add
              </Button>
            </Box>
          </Box>
        </Box>
        <Modal open={open} onClose={handleClose} className="modal-style">
          <AddUser handleClose={handleClose} setReload={setReload} fetchBatchData={fetchBatches} fetchData={fetchData} handleReloadData={handleReloadData} />
        </Modal>
      </Box>
    </Box>
  );
};

export default PageHeader;
