import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Table, Dialog, TableBody, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Checkbox, IconButton, Divider, TableSortLabel } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import DeletePopUp from "./DeletePopUp";
import * as styles from "./TabularDataStyles";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as DeleteIcon } from "./delete.svg";
import { ReactComponent as DownloadIcon } from "./download.svg";
import { ReactComponent as Edit } from "./edit.svg";
//import "./tabularData.module.css";
import GenericTable from "../genericTable/genricTable";
import { BATCH_HEADERS } from "../../utils/constants";
import { handleError } from "../../utils/handleError";
import { batchAPI, deleteBatch, downloadBatch, exportBatches } from "../../services/batchapi";
import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, marginBottom: "18px" }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TabularData = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [batchName, setBatchName] = useState(undefined);
  const [batchData, setBatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeletePopUpClose = () => {
    setDeletePopUp(false);
    setBatchName(undefined);
    setSelectedRows([]);
  };

  const handleDeletePopUpOpen = () => {
    setDeletePopUp(true);
  };

  const apiCall = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }
      const { data } = await batchAPI();
      // console.log("All Batch Data: ", data.data);
      setBatchData(data.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error, navigate);
    }
  };
  useEffect(() => {
    apiCall();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const showDetails = (id) => {
    // console.log("show id", id._id);
    navigate("/batchDetails", { state: { id: id._id } });
  };

  const sortedData = batchData.sort((a, b) => {
    const aValue = a[orderBy]; // Adjusted line
    const bValue = b[orderBy]; // Adjusted line

    if (order === "asc") {
      return aValue && bValue ? aValue.localeCompare(bValue) : 0;
    } else {
      return bValue && aValue ? bValue.localeCompare(aValue) : 0;
    }
  });

  const displayedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return "#00000071";
      case "In Progress":
        return "#E4B304";
      case "Completed":
        return "#23AF81";
      case "Blocked":
        return "#F66868";
      default:
        return "inherit";
    }
  };
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Created":
        return "#00000012";
      case "In Progress":
        return "#FFF5C8";
      case "Completed":
        return "#23af811a";
      case "Blocked":
        return "#FFF4F6";
      default:
        return "inherit";
    }
  };

  const handleMultipleDelete = () => {
    if (selectedRows.length === 1) {
      handleSingleDelete(selectedRows[0]);
      return;
    }
    handleDeletePopUpOpen(true);
  };

  const handleSingleDelete = (id) => {
    batchData.map((batch) => {
      if (batch._id === id) {
        setBatchName(batch.batch_name);
      }
    });
    setSelectedRows([id]);
    handleDeletePopUpOpen(true);
  };
  const downloadSelectedRows = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }
      const { csvData } = await downloadBatch(selectedRows);
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "batch.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const handleEdit = (id) => {
    // console.log(id);
    navigate("/editBatch", { state: { id: id._id } });
  };

  const handleDeleteClick = (b) => {
    // console.log("Delete Called: ", typeof b, b._id);
    // console.log("SelectedRows", selectedRows);
    if (b._id !== undefined) {
      // console.log("Delete Single", b._id);
      handleSingleDelete(b._id);
    } else if (selectedRows.length === 1) {
      // console.log("Delete Selected row with length 1", selectedRows);
      handleSingleDelete(selectedRows[0]);
    } else {
      // console.log("SelectedRows multiple", selectedRows);
      handleMultipleDelete();
    }
  };

  const handleRowSelect = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }
      const { data } = await deleteBatch(selectedRows);
      // console.log("deleted", data);
      handleDeletePopUpClose();
      const leftBatches = batchData.filter((batch) => !selectedRows.includes(batch._id));
      setBatchData(leftBatches);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="loader-class-learning col-12 ">
          <Stack sx={{ color: "grey.600" }} spacing={3} className="col-1 mx-auto" style={{ marginTop: "30vh" }}>
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}

      {!isLoading && (
        <div>
          {/* {console.log(BATCH_HEADERS, displayedData)} */}
          <GenericTable
            headers={BATCH_HEADERS}
            data={batchData}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onEditClick={handleEdit}
            onDeleteClick={handleDeleteClick}
            onViewClick={showDetails}
            downloadSelectedRows={downloadSelectedRows}
          />

          <Dialog maxWidth="lg" open={deletePopUp} data-testid="delete-popup">
            <DeletePopUp handleDeletePopUpClose={handleDeletePopUpClose} batchesToDelete={selectedRows} batchNameToDelete={batchName} handleDelete={handleDelete} />
          </Dialog>
        </div>
      )}
    </div>
  );
};
export default TabularData;
