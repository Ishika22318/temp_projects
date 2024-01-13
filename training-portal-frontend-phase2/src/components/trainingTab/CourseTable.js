import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import TablePagination from '@mui/material/TablePagination';
import DownloadIcon from "@mui/icons-material/Download";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import ConfirmationBox from "../trainingTab/ConfirmationBox";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90%",
    width: "100%",
    marginTop: "60px",
  },
  header: {
    width: "100%",
    marginLeft: "10px",
    marginBottom: "2px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableContainer: {
    marginBottom: "20px",
  },
  pagination: {
    marginBottom: "0px",
    marginTop: "5px",
  },
  tablebody: {
    textTransform: "capitalize"
  },
  disabledStatus: {
    color: "red",
    fontWeight: "bold",
  },
  buttonCss: {
    display: "flex",
    justifyContent: "space-evenly",
    marginLeft: "-40px"
  },
  head: {
    backgroundColor: "#ededf1de",
    textTransform: "capitalize"
  }
}));
const DynamicTable = ({ tableData, edit, info }, props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    setSelectedRows([]);
  }, [tableData]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile screen size
  if (!tableData || tableData.length === 0) {
    return <div>No data available.</div>;
  }
  const columns = Object.keys(tableData[0]);
  const handleEditClick = (id) => {
    console.log(id);
  };

  const handleInfoClick = (id) => {
    console.log(id);
  };

  const handleDeleteClick = () => {
    // Implement your delete logic here
  };

  const handleSaveClick = () => {
    // Implement your save logic here
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (id) => {

    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  return (<div>
    <div className={classes.header}>
      {selectedRows.length > 1 ? (
        <div>
          <Typography variant="h8" style={{}}>
            Row Selected: {selectedRows.length}
          </Typography>

          <IconButton
            color="primary"
            aria-label="Edit"
            style={{ color: "#000" }}
          >
            <CreateOutlinedIcon />
          </IconButton>


          <Typography variant="h8" >
            Row Selected: {selectedRows.length}
          </Typography>


          <IconButton
            color="primary"
            aria-label="Delete"
            sx={{ color: "#000" }}
            onClick={handleDeleteClick}
          >
            <ConfirmationBox courseID={selectedRows} isBulk={true}></ConfirmationBox>
            {/* <DeleteOutlineOutlinedIcon /> */}
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Save"
            sx={{ color: "#000" }}
            onClick={handleSaveClick}
          >
            <DownloadIcon />
          </IconButton>
        </div>
      ) : <div></div>}
      <div>
        <TablePagination
          className={classes.pagination}
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
    <TableContainer>
      <Table>
        <TableHead className={classes.head} >
          <TableRow>
            <TableCell>
              <Checkbox disabled />
            </TableCell>

            {columns
              .filter((column) => column !== "_id") // Exclude the "id" column
              .map((column) => (

                <TableCell
                  key={column}
                >
                  {column}
                </TableCell>
              ))}
            <TableCell >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tablebody}>
          {tableData.map((row) => (

            <TableRow key={row._id}>
              <TableCell>
                <Checkbox checked={selectedRows.includes(row._id)} onChange={() => handleCheckboxChange(row._id)} />
              </TableCell>
              {columns
                .filter((column) => column !== "_id") // Exclude the "id" column
                .map((column) => (
                  <TableCell key={column}>
                    {column === "status" ? (
                      <Button
                        variant="outlined"
                        //Status is checked in the helper.js and according to that active and disabled are shown
                        sx={{
                          color: row.status ? "green" : "red",
                          borderColor: row.status ? "green" : "red",
                          backgroundColor: row.status ? "#06895526" : "#f38d8d40",
                          outline: "None",
                          width: "120px",
                        }}
                      >
                        {row.status ? "Active" : "Disabled"}
                      </Button>
                    ) : (
                      row[column]
                    )}
                  </TableCell>
                ))}
              <TableCell>
                <div className={classes.buttonCss}>
                  <Link to={"/course-content?course=" + row.courseName}  >
                  </Link>
                    <Button
                      color="primary"
                      aria-label="Info"
                      style={{ color: '#000' }}
                      onClick={() => {handleInfoClick(row._id)
                      info(row._id)}}
                    >
                      <InfoOutlinedIcon/>
                    </Button>
                    <Button
                      color="primary"
                      aria-label="Edit"
                      style={{ color: '#000' }}
                      onClick={() => {handleEditClick(row._id)
                      edit(row._id)}}
                    >
                      <CreateOutlinedIcon />
                    </Button>


                  <ConfirmationBox courseName={row.courseName} courseID={row._id}></ConfirmationBox>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
};

export default DynamicTable;
