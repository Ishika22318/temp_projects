import React, { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, TablePagination, tableCellClasses, Typography, Alert, Snackbar } from "@mui/material";

import { AiOutlineMail, AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { sendEmailNotificationAction } from "../../utils/url";
import { postEmailNotification } from "../../services/apicall";

const DataGrid = ({ data, columns, page, handleChangePage, handleChangeRowsPerPage, handleRowSelect, selectedRows, handleAllRowsSelect, totalCount, rowsPerPage }) => {
  console.log("kjhbdskbkj", data);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEmailAction = async (e, emailData) => {
    // console.log();
    try {
      const emailPostData = {
        email: emailData.action,
        name: emailData.mentor.name,
        internName: emailData.intern.name,
      };
      const token = localStorage.getItem("token");

      const res = await postEmailNotification(sendEmailNotificationAction, token, emailPostData);
      setSnackbarMessage(res.data);
      setSnackbarOpen(true);
      console.log(res);
    } catch (err) {
      setSnackbarMessage(err.data);
      setSnackbarOpen(true);
      console.log(err);
    }
  };

  return (
    <div>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={snackbarMessage.success === true ? "success" : "error"} onClose={handleSnackbarClose}>
          {snackbarMessage.success === true ? snackbarMessage.message : snackbarMessage.error}
        </Alert>
      </Snackbar>
      <TablePagination
        className="table-pagination"
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={true}
        showLastButton={true}
      />
      <Table>
        <TableHead>
          <TableRow className="table-header">
            {columns.map((column) => (
              <>
                {column.type == "checkbox" && (
                  <TableCell key={column.key} size="small">
                    <Checkbox onChange={() => handleAllRowsSelect()} />
                  </TableCell>
                )}
                {column.type != "checkbox" && (
                  <TableCell key={column.key} size="small">
                    <>
                      {column.type === "object" ? (
                        <div className="data-object-column-container">
                          <p style={{ fontSize: "18px", fontWeight: "400" }}> {column.label}</p>
                        </div>
                      ) : column.key === "status" ? (
                        <div className="data-status-column-container">
                          <p style={{ fontSize: "18px", fontWeight: "400" }}> {column.label}</p>
                        </div>
                      ) : (
                        <p style={{ fontSize: "18px", fontWeight: "400" }}> {column.label}</p>
                      )}
                    </>
                  </TableCell>
                )}
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <>
                    {column.type === "object" ? (
                      <div className="data-object-tablecell-container">
                        <img src={row[column.key].image} style={{ marginLeft: "20px" }} />
                        <Typography variant="body1" display="block" gutterBottom style={{ paddingLeft: "10px" }}>
                          {row[column.key].name}
                        </Typography>
                      </div>
                    ) : column.type === "checkbox" ? (
                      <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleRowSelect(row.id)} />
                    ) : column.key === "status" ? (
                      <>
                        {row[column.key] === "Completed" && (
                          <div className="data-done-status-tabelcell-container">
                            <AiOutlineCheckCircle className="dasboard-table-image" />
                            <Typography className="dasboard-table-status">{row.status}</Typography>
                          </div>
                        )}
                        {row[column.key] !== "Completed" && (
                          <div className="data-status-tabelcell-container">
                            <AiOutlineClockCircle className="dasboard-table-image" />
                            <Typography className="dasboard-table-status">{row.status}</Typography>
                          </div>
                        )}
                      </>
                    ) : // row[column.key]
                    column.key === "action" ? (
                      <div style={{ justifyContent: "center" }}>
                        <AiOutlineMail onClick={(e) => handleEmailAction(e, row)} style={{ width: "30px", height: "30px", paddingLeft: "10px" }} />
                      </div>
                    ) : (
                      row[column.key]
                    )}
                  </>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataGrid;
