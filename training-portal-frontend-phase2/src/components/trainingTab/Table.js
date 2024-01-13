import { Link } from "react-router-dom";
import classes from "./Table.module.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EyeIcon } from "../../assets/icon/eyeIcon";

// alternate row color logic=>MUI
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-last-of-type(odd)": {
    backgroundColor: "#ECF4FD",
  },
}));

// table last column styles=>MUI
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&:nth-last-of-type(1)": {
    textAlign: "center !important",
    padding: "12px",
    gap: "10px",
    width: "150px",
    height: "50px",
    border: "1px solid #D9DAE4 !important",
  },
}));

export default function CustomizedTables({ tableData }) {
  // headers of the courses table
  const tableHeaders = ["Course Name", "Sessions covered in", "More Details"];
  return (
    <TableContainer component={Paper} className={classes.font}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((tableHeader, index) => {
              return (
                <StyledTableCell className={classes.tableHead} key={index}>
                  {tableHeader}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((data, index) => (
            <StyledTableRow key={index}>
              <TableCell className={classes.tablecolumn1}>
                {data.course}
              </TableCell>
              <TableCell className={classes.tablecolumn1}>
                {data.week}
              </TableCell>
              <TableCell
                className={classes.tablecolumn2}
                style={{ color: "#0D4896" }}
              >
                {/* link to individual courses */}
                <Link to={"/course-content?course=" + data.course}>
                  {EyeIcon}
                </Link>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
