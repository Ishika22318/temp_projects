import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Table, TableBody, InputAdornment, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, Checkbox, IconButton, Divider, TextField } from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import "./genericTable.css";

import { exportBatches } from "../../services/batchapi";
import { useNavigate } from "react-router-dom";
import { ACTION_FUNCTIONS, STATUS_FUNCTIONS, RELEASED_ICONS } from "../../utils/constants";

const GenericTable = ({ headers, data, selectedRows, onRowSelect, onEditClick, onViewClick, handleEmailAction, handleInfoAction, onDeleteClick, downloadSelectedRows }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const renderStatus = (item, property) => {
    const statusFunction = STATUS_FUNCTIONS[item[property]];
    const { className, style } = statusFunction ? statusFunction.style : {};
    return (
      <span className={`status ${className}`} style={style}>
        <b>{statusFunction ? statusFunction.label : item[property]}</b>
      </span>
    );
  };

  const renderName = (item, onClickCallback, imageProperty, nameProperty, className) => (
    <Typography variant="text" onClick={onClickCallback ? () => onClickCallback(item) : null} className={className}>
      {item[imageProperty] && <img src={item[imageProperty]} alt="Profile" />}
      {item[nameProperty]}
    </Typography>
  );

  const cellRenderers = {
    action: (item) => {
      const customActions = headers.find((header) => header.id === "action")?.customAction;
      return (
        <div>
          {customActions.includes("Edit") && <IconButton onClick={() => onEditClick(item)}>{ACTION_FUNCTIONS.Edit.icon}</IconButton>}
          {customActions.includes("Delete") && <IconButton onClick={() => onDeleteClick(item)}>{ACTION_FUNCTIONS.Delete.icon}</IconButton>}
          {customActions.includes("Mail") && <IconButton onClick={() => handleEmailAction(item)}>{ACTION_FUNCTIONS.Mail.icon}</IconButton>}
          {customActions.includes("Info") && <IconButton onClick={() => handleInfoAction(item)}>{ACTION_FUNCTIONS.Info.icon}</IconButton>}
        </div>
      );
    },

    grade: (item) => renderStatus(item, "grade"),
    status: (item) => renderStatus(item, "status"),
    score: (item) => renderStatus(item, "score"),
    isActive: (item) => renderStatus(item, "status"),
    released: (item) => <div className="releasedStyle">{RELEASED_ICONS[item.released] || "Release Icon Not Found"}</div>,
    name: (item) => renderName(item, onViewClick, "profilePicture", "name", "nameStyle"),
    internName: (item) => renderName(item, onViewClick, "internImage", "internName", "nameStyle"),
    mentorName: (item) => renderName(item, onViewClick, "mentorImage", "mentorName", "nameStyle"),
    // batch_name: (item) => renderName(item, onViewClick, "batch_name" ),
    batch_name: (item) => (
      <Typography variant="text" onClick={() => onViewClick(item)} className="nameStyle">
        {item.batch_name}
      </Typography>
    ),
  };

  const renderCellContent = (header, item) => {
    const cellRenderer = cellRenderers[header.id];
    if (cellRenderer) {
      return cellRenderer(item);
    } else {
      // rest, display simply
      return item[header.id];
    }
  };

  // Handle search input change
  const handleSearch = (event) => setSearchValue(event.target.value);

  // Filter data based on search input using memoization
  const filteredData = useMemo(() => {
    const searchQuery = searchValue.toLowerCase();

    return data.filter((item) => {
      for (const value of Object.values(item)) {
        if (value && value.toString().toLowerCase().includes(searchQuery)) {
          return true;
        }
      }
      return false;
    });
  }, [data, searchValue]);

  // Calculate the data to display on the current page
  const displayedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Handle page change
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowSelect = (rowId) => {
    const isSelected = selectedRows.includes(rowId);
    if (isSelected) {
      // If the row is already selected, deselect it
      onRowSelect(selectedRows.filter((id) => id !== rowId));

      // console.log(rowId, selectedRows, "ehfghjf");
    } else {
      // If the row is not selected, select it
      onRowSelect([...selectedRows, rowId]);
    }
  };

  // console.log("generic", data);

  return (
    <Box>
      {/* Table controls */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box className="flex-container">
          {/* Conditionally render the row selected count and download icon */}
          {selectedRows.length > 0 && (
            <>
              <Typography variant="subtitle1" className="selected-rows">{`Row${selectedRows.length !== 1 ? "s" : ""} selected : ${selectedRows.length}  `}</Typography>
              <Divider orientation="vertical" className="vertical-divider" />

              {typeof downloadSelectedRows === "function" && (
                <IconButton onClick={downloadSelectedRows}>
                  <Download />
                </IconButton>
              )}

              {typeof onDeleteClick === "function" && (
                <IconButton onClick={onDeleteClick}>
                  <Delete />
                </IconButton>
              )}
            </>
          )}

          {/* Search input */}
          <Box className="search-box">
            <TextField
              value={searchValue}
              placeholder="Search"
              onChange={handleSearch}
              className="search-input"
              InputProps={{
                style: { height: "50px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Pagination component */}
        <TablePagination
          showFirstButton
          showLastButton
          rowsPerPageOptions={[10, 25, 50]}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
          SelectProps={{
            className: "customSelect",
            native: true,
          }}
          className="table-pagination"
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="tableHeaderCustomBackground">
            <TableRow>
              {/* Checkbox for selecting all rows */}
              <TableCell className="checkboxPadding">
                <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < displayedData.length}
                  checked={displayedData.length > 0 && selectedRows.length === displayedData.length}
                  onChange={() => {
                    if (selectedRows.length > 0) {
                      onRowSelect([]);
                    } else {
                      onRowSelect(displayedData.map((item) => item.id));
                    }
                  }}
                />
              </TableCell>

              {/* Render table headers */}
              {headers.map((header) => (
                <TableCell key={header.id} className="tableHeaderStyle">
                  {header.label} {/* Display the header label */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table body */}
          <TableBody>
            {displayedData.map((item) => (
              <TableRow key={item.id} className="customTableRow">
                {/* Checkbox for selecting individual rows */}
                <TableCell className="checkboxPadding">
                  <Checkbox checked={selectedRows.includes(item.id)} onChange={() => handleRowSelect(item.id)} />
                </TableCell>

                {headers.map((header) => (
                  <TableCell key={header.id} padding={header.padding} className="tableCellStyle">
                    {/* Render the cell content based on the header.id */}
                    {renderCellContent(header, item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

GenericTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      padding: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRowSelect: PropTypes.func.isRequired,
};

export default GenericTable;
