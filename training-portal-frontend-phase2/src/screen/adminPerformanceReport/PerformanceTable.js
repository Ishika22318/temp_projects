import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom/dist";
import Header from "../../components/adminPerformanceReport/Header";
import GenericTable from "../../components/genericTable/genricTable";
import { getAllUsersReports } from "../../services/adminPerformanceReportApi";
import { downloadCSV } from "../../utils/csvDownload";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

// MUI IMPORTS
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { REPORT_HEADERS } from "../../utils/constants";
import { handleError } from "../../utils/handleError";
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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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

let data = [];

const PerformanceTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [allUserReport, setAllUserReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState("All");

  const fetchAllUserReport = async () => {
    try {
      setIsLoading(true);
      data = await getAllUsersReports();
      // console.log(data);
      setAllUserReport(data);
      setIsLoading(false);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  useEffect(() => {
    fetchAllUserReport();
  }, []);

  const handleRowSelect = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };

  const downloadSelectedRowCSV = () => {
    downloadCSV(selectedRows);
  };

  const sortedData = allUserReport.sort((a, b) => {
    const aValue = a[orderBy]; // Adjusted line
    const bValue = b[orderBy]; // Adjusted line

    if (order === "asc") {
      return aValue && bValue ? aValue.localeCompare(bValue) : 0;
    } else {
      return bValue && aValue ? bValue.localeCompare(aValue) : 0;
    }
  });

  const displayedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleInfoAction = (item) => {
    // console.log(item);
    const reportStatus = item.report_check;

    navigate("/intern-report/" + item.email, {
      state: {
        internId: item.id,
        reportStatus,
      },
    });
  };

  useEffect(() => {
    if (selectedBatch === "All") {
      setAllUserReport(data);
      return;
    }
    const filteredData = data.filter((user) => {
      return user.batch_id.includes(selectedBatch);
    });

    setAllUserReport(filteredData);
  }, [selectedBatch]);
  return (
    <div>
      <Header title="Performance" downloadHandler={downloadSelectedRowCSV} setSelectedBatch={setSelectedBatch} selectedBatch={selectedBatch} />

      {isLoading ? (
        <div className="loader-class-learning col-12 ">
          <Stack sx={{ color: "grey.600" }} spacing={3} className="col-1 mx-auto" style={{ marginTop: "30vh" }}>
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      ) : (
        <GenericTable
          headers={REPORT_HEADERS}
          data={allUserReport}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          handleInfoAction={handleInfoAction}
          downloadSelectedRows={downloadSelectedRowCSV}
        />
      )}
    </div>
  );
};

export default PerformanceTable;
