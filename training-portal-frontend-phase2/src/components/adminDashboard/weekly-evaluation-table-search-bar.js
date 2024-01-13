import React, { useEffect, useState } from "react";
import DataGrid from "./data-grid";

import { IconButton, InputAdornment, TableContainer, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const WeeklyEvaluationTableSearchBar = ({ data, selectedMentor }) => {
  console.log("data2", data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allRowsSelected, setAllRowsSelected] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const columns = [
    { key: "id", label: "Action", type: "checkbox" },
    { key: "mentor", label: "Mentor", type: "object" },
    { key: "intern", label: "Intern", type: "object" },
    { key: "status", label: "Status", type: "string" },
    { key: "startDate", label: "Start Date", type: "string" },
    { key: "endDate", label: "End Date", type: "string" },
    { key: "action", label: "Action", type: "icon" },
  ];
  const startIndex = page * rowsPerPage;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data.slice(startIndex, startIndex + rowsPerPage));
  console.log("filteredData", filteredData);
  useEffect(() => {
    filterAndPaginateData(searchTerm, page, rowsPerPage);
  }, [selectedMentor]);

  const filterAndPaginateData = (searchTerm, page, rowsPerPage) => {
    const filtered = data.filter((row) => {
      const mentorName = row.mentor.name.toLowerCase();
      const internName = row.intern.name.toLowerCase();
      const status = row.status.toLowerCase();

      return (
        selectedMentor !== null &&
        mentorName.includes(selectedMentor.name.toLowerCase()) &&
        (mentorName.includes(searchTerm.toLowerCase()) || internName.includes(searchTerm.toLowerCase()) || status.includes(searchTerm.toLowerCase()))
      );
    });
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);

    setFilteredData(paginatedData);
  };

  const handleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [...selectedRows];

    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setSelectedRows(newSelected);
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(0);
    filterAndPaginateData(searchTerm, page, rowsPerPage);
  };
  const handleAllRowsSelect = () => {
    if (allRowsSelected) {
      setSelectedRows([]);
    } else {
      const allIds = data.map((row) => row.id);
      setSelectedRows(allIds);
    }
    setAllRowsSelected(!allRowsSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    filterAndPaginateData(searchTerm, 0, parseInt(event.target.value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    filterAndPaginateData(searchTerm, newPage, rowsPerPage);
  };

  useEffect(() => {
    filterAndPaginateData(searchTerm, page, rowsPerPage);
  }, []);

  return (
    <>
      <TableContainer className="data-table-container">
        <div className="data-search-textfield">
          <TextField
            id="input-with-sx"
            sx={{ margin: 1 }}
            placeholder="Search"
            variant="standard"
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>{console.log("shivam", filteredData)}</div>

        <DataGrid
          //   data={filteredData}
          data={data}
          columns={columns}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleAllRowsSelect={handleAllRowsSelect}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          totalCount={filteredData.length}
          page={page}
        />
      </TableContainer>
    </>
  );
};

export default WeeklyEvaluationTableSearchBar;
