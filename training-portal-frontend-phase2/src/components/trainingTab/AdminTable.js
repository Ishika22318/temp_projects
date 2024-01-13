import React, { useState, useEffect } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { makeStyles } from "@mui/styles";
import { refactorAllTrainingCoursesData, refactorjobRoleData, refactorBatchData } from "../../utils/helpers";
// import DynamicTable from './CourseTable';
import { find, has, isNull } from "lodash";
import { Select, MenuItem, Button, FormControl } from "@mui/material";
import { BatchUrl, courseUrl, jobRoleUrl } from "../../utils/url";
import { checkgetCall, exportUsers } from "../../services/apicall";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../utils/handleError";
import { coursesHeader } from "../../utils/constants";
import GenericTable from "../genericTable/genricTable";
import ConfirmationBox from "../trainingTab/ConfirmationBox";
import PageTitle from "../reportTab/pageTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eeeeee",
    borderBottom: "2px solid #D9DAE4",
  },
  h1: {
    color: "#0D4896",
    fontWeight: "600",
    fontSize: "38px",
  },
  header: {
    width: "100%",
    marginLeft: "0px",
    marginBottom: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ededf1de",
    height: "72px",
    padding: "16px",
    gap: "12px",
    boxShadow: " 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19)",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginRight: "24px",
  },
  tableContainer: {
    marginBottom: "20px",
  },
  activeStatus: {
    backgroundColor: "green",
    color: "beige",
    "&.MuiButtonBase-root": {
      // Change the properties of the MuiButtonBase-root class
      backgroundColor: "red",
      color: "white",
      // Add any other CSS properties as needed
    },
  },
  disabledStatus: {
    color: "red",
    fontWeight: "bold",
  },
  height: {
    marginLeft: "24px",
    marginTop: "10px",
    height: "40px",
    marginBottom: "5px",
    fontWeight: "700",
    outline: "NONE",
  },
  autocomplete: {
    width: "250px",
    height: "40px",
    outline: "None",
    marginRight: "10px",
    marginLeft: "24px",
    textTransform: "capitalize",
    marginTop: "4px",
    backgroundColor: "#FFF",
    textTransform: "capitalize",
  },
}));

export default function Tabs() {
  const classes = useStyles();
  const [tableData, setFetchedData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [batch, setBatch] = useState(null);
  const [jobRole, setjobRole] = useState(null);
  const [jobRoleoptions, setjobRoleoptions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [open, setOpen] = useState(false);
  const [bulk, setIsBulk] = useState(false);

  const selectAll = null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(batch, jobRole);
  }, [batch, jobRole]);

  useEffect(() => {
    if (batchOptions.length > 0 && isNull(batch)) {
      setBatch(batchOptions[0]._id);
    }
    if (jobRoleoptions.length > 0 && isNull(jobRole)) {
      setjobRole(jobRoleoptions[0]._id);
    }
  }, [jobRole, jobRoleoptions, batchOptions, batch]);

  const fetchBatch = async (token) => {
    const batchdata = await checkgetCall(token, BatchUrl);
    const _batchOptions = refactorBatchData(batchdata);

    setBatchOptions(_batchOptions);
    return _batchOptions[0]._id;
  };
  const fetchJobRole = async (token) => {
    const jobRoledata = await checkgetCall(token, jobRoleUrl);
    const _jobOptions = refactorjobRoleData(jobRoledata);
    console.log("job options", _jobOptions);
    _jobOptions.unshift({ _id: 1, name: "Generic", value: "Generic", val: null });
    setjobRoleoptions(_jobOptions);
    console.log("job options 2", _jobOptions);
    return _jobOptions[0]._id;
  };
  const token = localStorage.getItem("token");
  const fetchData = async (_batch, _jobRole) => {
    try {
      // get token from local storage

      if (!token) {
        navigate("/401");
      }
      // refactoring code
      const batchId = isNull(batch) ? await fetchBatch(token) : _batch;
      const jobRoleId = isNull(jobRole) ? await fetchJobRole(token) : _jobRole;
      let jobRoleVal;
      let newCourseUrl;
      if (jobRoleVal === undefined && jobRoleId !== 1) {
        newCourseUrl = `${courseUrl}?batch=${batchId}&jobrole=${jobRoleId}`;
      } else {
        newCourseUrl = `${courseUrl}?batch=${batchId}&jobrole=null`;
      }

      const data = await checkgetCall(token, newCourseUrl);

      setFetchedData(refactorAllTrainingCoursesData(data));

      const responseData = data["data"];
      setCourseData(responseData);

      try {
        if (data.statuscode === 401) {
          localStorage.clear();
          return navigate("/401");
        } else if (data.message === "Not Found") {
          navigate("/404");
        } else if (data.message === "Internal Server Error") {
          navigate("/500");
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      // to handle errors
      handleError(error, navigate);
    }
  };

  const handleChange = (event, newValue) => {
    setBatch(newValue); // Update the batch state with the selected value
  };
  const handleDownloadClick = async () => {
    try {
      await exportUsers(selectedRows, navigate);
    } catch (error) {
      console.error("Error in Downloading: ", error);
    }
  };

  const handleRoleChange = (event, newValue) => {
    if (newValue) {
      // Update the jobRole state with the ID of the selected job role
      setjobRole(newValue);
    } else {
      // Handle the case when no job role is selected
      setjobRole(null);
    }
  };

  const checkData = (row) => {
    return row.Role === tableData.Role;
  };

  const handleCreateClick = () => {
    // Set the batch and role values here
    navigate("/create-course", {
      state: {
        jobRole: jobRole,
      },
    });
  };

  const onEditCourse = (value) => {
    const editCourse = find(courseData, { _id: value._id });
    console.log(value);
    navigate(`/edit-course/${value._id}`, { state: editCourse });
  };

  const handleRowSelect = (selectedRowIds) => {
    setSelectedRows(selectedRowIds);
  };

  const onDeleteCourse = (value) => {
    setOpen(true);
    if (has(value, "courseName")) {
      const deleteRecord = find(courseData, { _id: value._id });
      setSelectedData(deleteRecord);
      setIsBulk(false);
    } else {
      setSelectedData(selectedRows);
      setIsBulk(true);
    }
  };

  const onInfoCourse = (value) => {
    console.log(value._id);
    const infoCourse = find(courseData, { _id: value._id });
    navigate(`/course-details/${value._id}`, { state: infoCourse });
  };

  return (
    <div className="col-12 px-0 mt-5 pt-3">
      <div className={classes.root}>
        <PageTitle key="title" title="Courses" />
        <div className={classes.actions}>
          <FormControl>
            <Select
              className={classes.autocomplete}
              value={batch}
              onChange={(event) => handleChange(event, event.target.value)}
              sx={{
                height: "40px",
              }}
            >
              {batchOptions.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              className={classes.autocomplete}
              value={jobRole}
              onChange={(event) => handleRoleChange(event, event.target.value)}
              sx={{
                height: "40px",
              }}
            >
              {jobRoleoptions.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            className={classes.height}
            sx={{
              color: "#0D4896",
              marginLeft: "24px",
              marginTop: "10px",
              height: "40px",
              marginBottom: "5px",
              fontWeight: "700",
              outline: "NONE",
            }}
            variant="outlined"
            onClick={handleDownloadClick}
          >
            Download CSV
          </Button>
          <Button
            className={classes.height}
            sx={{
              color: "#FFF",
              width: "136px",
              backgroundColor: "#0D4896",
              marginTop: "10px",
              marginLeft: "24px",
              height: "40px",
              marginBottom: "5px",
            }}
            onClick={handleCreateClick}
            variant="contained"
          >
            <NoteAddIcon />
            Create
          </Button>
        </div>
      </div>

      <GenericTable
        headers={coursesHeader}
        data={tableData}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onEditClick={onEditCourse}
        onDeleteClick={onDeleteCourse}
        handleInfoAction={onInfoCourse}
        downloadSelectedRows={handleDownloadClick}
      />
      {open ? (
        <ConfirmationBox
          selectedData={selectedData}
          isBulk={bulk}
          openDialog={open}
          onClose={(value) => {
            console.log(value);
            setOpen(false);
            setIsBulk(false);
            setSelectedRows([]);
            if (value === "Success") {
              fetchData(batch, jobRole);
            }
          }}
        ></ConfirmationBox>
      ) : null}
    </div>
  );
}
