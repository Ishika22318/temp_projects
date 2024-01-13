import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextField, Button, Checkbox, Select, MenuItem, FormControl, Paper, Typography, Container, Divider, Box, IconButton, Chip, Stack, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SvgIcon from "@mui/material/SvgIcon";
import { useDropzone } from "react-dropzone";
import jwtDecode from "jwt-decode";
import { createBatchApi, getCoursesAndJobRolesApi, uploadBatchFileApi } from "../../services/batchapi";
import { handleError } from "../../utils/handleError";
import { ReactComponent as excelapp } from "./excel-app.svg";
import * as styles from "./FormWithDragDropStyles";
import { useNavigate } from "react-router-dom";

const programs = ["Generic Training", "Soft Skills Training", "Technical Skills Training", "Certification Training"];

const SingleLineFormComponent = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [file, setFile] = useState([]);
  const inputRef = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  // const handleSelectAllRoles = () => {

  //   if (roles.length === selectedRoles.length) {
  //     setSelectedRoles([]);
  //   }
  //   else {
  //     setSelectedRoles(roles);
  //   }
  // }
  const updateFormValidity = () => {
    const isValid = (name.trim() !== "" && selectedPrograms.length > 0 && selectedRoles.length > 0 && selectedCourses.length > 0 && startDate !== null && startDate !== "") || file.length > 0;
    setIsFormValid(isValid);
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    updateFormValidity();
  }, [selectedCourses]);

  useEffect(() => {
    updateFormValidity();
    filter();
  }, [name, selectedPrograms, selectedRoles, startDate, file]);

  const startDateRef = useRef();
  const [minEndDate, setMinEndDate] = useState(null);

  useEffect(() => {
    const startDateValue = startDateRef.current.value;
    setMinEndDate(startDateValue);
  }, [startDate]);

  const getCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }

      const { courses, jobRoles } = await getCoursesAndJobRolesApi();
      console.log("Creatas", courses, jobRoles);
      setAllCourses(courses);
      setRoles([{ _id: 1, roleName: "All Roles" }, ...jobRoles]);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const sendData = async (batches) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }

      const data = await createBatchApi(batches);

      console.log(data);
      if (data.message === "batch name must be unique") {
        alert("batch name must be unique");
      } else {
        window.location.reload();
      }
    } catch (error) {
      handleError(error, navigate);
    }
  };

  const sendFileData = async () => {
    const formData = new FormData();
    for (const f of file) {
      formData.append("files", f);
    }

    try {
      const res = await uploadBatchFileApi(formData);
      console.log("API call successful", res);
      window.location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const createdBy = jwtDecode(token).name;
    if (file.length !== 0) {
      sendFileData();
      return;
    }

    let selectedCoursesID = selectedCourses.map((course) => {
      if (course.data.every((c) => c.courseType === "Technical Skills Training")) {
        return course.data.filter((d) => selectedRoles.includes(d.jobRole) || selectedRoles.includes(1)).map((c) => c._id);
      } else {
        return course.data.filter((d) => selectedPrograms.includes(d.courseType)).map((c) => c._id);
      }
    });
    selectedCoursesID = [].concat(...selectedCoursesID);
    console.log("Selected courses Ids to save , ", selectedCoursesID);
    const batches = [
      {
        batch_name: name,
        description: about,
        created_by: createdBy,
        status: "Created",
        start_date: new Date(startDate),
        end_date: endDate,
        updated_on: new Date(),
        program: selectedPrograms,
        role: selectedRoles.includes(1) ? roles.filter((r) => r._id !== 1) : selectedRoles,
        coursesID: selectedCoursesID,
      },
    ];
    sendData(batches);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const selectedFile = Array.from(e.target.files);
    setFile(selectedFile);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xls, .xlsx, .csv",
    multiple: true,
  });

  const handleDelete = (fileToDelete) => () => {
    const selectedFile = file.filter((fil) => fil !== fileToDelete);
    setFile(selectedFile);
  };

  const filter = () => {
    console.log("Removing", selectedPrograms);
    console.log("selectedRoles", selectedRoles);

    let selectedCoursesToShow = selectedCourses.filter((singleCourse) => {
      let present =
        (!singleCourse.data.some((c) => c.courseType === "Technical Skills Training") && singleCourse.data.some((c) => selectedPrograms.includes(c.courseType))) ||
        (singleCourse.data.every((c) => c.courseType === "Technical Skills Training") &&
          selectedPrograms.includes("Technical Skills Training") &&
          singleCourse.data.some((c) => selectedRoles.includes(c.jobRole)));
      console.log(present);
      return present;
    });
    setSelectedCourses(selectedCoursesToShow);

    let filteredCourses = allCourses.filter((singleCourse) => {
      let present =
        (!singleCourse.data.some((c) => c.courseType === "Technical Skills Training") && singleCourse.data.some((c) => selectedPrograms.includes(c.courseType))) ||
        (singleCourse.data.every((c) => c.courseType === "Technical Skills Training") &&
          selectedPrograms.includes("Technical Skills Training") &&
          singleCourse.data.some((c) => selectedRoles.includes(c.jobRole) || selectedRoles.includes(1)));
      console.log(present);
      return present;
    });
    console.log("filteredcourses", filteredCourses);
    setCourses(filteredCourses);
  };

  return (
    <Box style={styles.boxStyle} sx={{ paddingTop: "480px" }}>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom sx={styles.typographyStyle}>
            Create new batch
          </Typography>
          <form onSubmit={handleSubmit}>
            <label>*Batch name</label>
            <TextField data-testid="nameField" placeholder="Type here..." fullWidth value={name} onChange={(e) => setName(e.target.value)} margin="normal" style={{ padding: "0px 0px 10px 0px" }} />
            <label>About this batch</label>
            <TextField
              placeholder="Type here..."
              data-testid="aboutField"
              fullWidth
              multiline
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              margin="normal"
              style={{ padding: "0px 0px 10px 0px" }}
            />
            <label>*Choose program</label>
            <FormControl fullWidth display="flex" alignItems="center" justifyContent="space-between" style={{ padding: "15px 20px 30px 0" }}>
              <Select
                multiple
                data-testid="programField"
                value={selectedPrograms}
                onChange={(e) => setSelectedPrograms(e.target.value)}
                renderValue={(selected) =>
                  selected.map((value) => (
                    <Chip
                      label={value}
                      variant="outlined"
                      onDelete={() => setSelectedPrograms(selectedPrograms.filter((item) => item !== value))}
                      deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                      sx={{ mr: 1 }}
                    />
                  ))
                }
              >
                {programs.map((program) => (
                  <MenuItem key={program} value={program}>
                    <Checkbox checked={selectedPrograms.includes(program)} />
                    {program}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container display="flex" alignItems="center" gap={2} justifyContent={"space-between"}>
              <Grid item md={6} xs={12}>
                <label>*Choose roles</label>
                <FormControl fullWidth style={{ padding: "15px 20px 25px 0" }}>
                  <Select
                    value={selectedRoles}
                    data-testid="rolesField"
                    multiple
                    onChange={(e) => {
                      setSelectedRoles(e.target.value);
                    }}
                    renderValue={(selected) => {
                      if (selected.length === 1) {
                        return (
                          <Chip
                            label={roles.find((role) => role._id === selected[0]).roleName}
                            variant="outlined"
                            onDelete={() => setSelectedRoles(selectedRoles.filter((item) => item !== selected[0]))}
                            deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                            sx={{ mr: 1 }}
                          />
                        );
                      }
                      if (selected.length > 1) {
                        return (
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={roles.find((role) => role._id === selected[0]).roleName}
                              variant="outlined"
                              onDelete={() => setSelectedRoles(selectedRoles.filter((item) => item !== selected[0]))}
                              deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={"+" + (selected.length - 1)}
                              variant="outlined"
                              onDelete={() => setSelectedRoles(selectedRoles.filter((item) => item !== selected))}
                              deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                              sx={{ mr: 1 }}
                            />
                          </Stack>
                        );
                      }
                    }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        <Checkbox checked={selectedRoles.includes(role._id) || selectedRoles.includes(1)} />
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={2.7} xs={5.5}>
                <label>*Starts from</label>
                <TextField
                  type="date"
                  value={startDate}
                  data-testid="startDateField"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ padding: "15px 20px 25px 0" }}
                  fullWidth
                  inputRef={startDateRef}
                />
              </Grid>
              <Grid item md={2.7} xs={5.5}>
                <label>Ends on</label>
                <TextField
                  type="date"
                  value={endDate}
                  data-testid="endDateField"
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  style={{ padding: "15px 20px 25px 0" }}
                  inputProps={{ min: minEndDate }}
                />
              </Grid>
            </Grid>
            <label>*Choose courses</label>
            <FormControl fullWidth display="flex" alignItems="center" justifyContent="space-between" style={{ padding: "15px 20px 15px 0" }}>
              <Select
                multiple
                data-testid="courseField"
                value={selectedCourses}
                onChange={(e) => setSelectedCourses(e.target.value)}
                renderValue={(selected) =>
                  selected.map((value) => (
                    <Chip
                      key={value}
                      label={courses.find((course) => course.courseName === value.courseName).courseName}
                      variant="outlined"
                      onDelete={() => setSelectedCourses(selectedCourses.filter((item) => item !== value))}
                      deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                      sx={{ mr: 1 }}
                    />
                  ))
                }
              >
                {console.log(selectedCourses)}
                {courses.map((course) => (
                  <MenuItem key={course.data} value={course}>
                    <Checkbox checked={selectedCourses.includes(course)} />
                    {course.courseName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider>or</Divider>
            <div>
              {file.length > 0 ? (
                <div>
                  {file.map((fi, index) => (
                    <li data-testid="uploadedFile" key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                      <a style={styles.uploadedFileStyle}>
                        <SvgIcon component={excelapp} />
                        {fi.name}
                      </a>

                      <IconButton onClick={handleDelete(fi)}>
                        <ClearRoundedIcon />
                      </IconButton>
                    </li>
                  ))}
                </div>
              ) : (
                <div>
                  <label style={{ display: "flex" }}>
                    <span style={{ marginRight: "5px" }}>{"Use the attached template for bulk creation:"} </span>
                    <a href={require("./Batch.xlsx")} download="Batch" style={styles.downloadFileStyle}>
                      <SvgIcon component={excelapp} />
                      {"Batch.xlsx"}
                    </a>
                    <a href={require("./Sample-Batch.xlsx")} download="Sample-Batch" style={styles.sampleBatchStyle}>
                      <SvgIcon component={excelapp} />
                      {"Sample-Batch.xlsx"}
                    </a>
                    <a href={require("./jobroles-ids.xlsx")} download="jobroles-ids" style={styles.sampleBatchStyle}>
                      <SvgIcon component={excelapp} />
                      {"jobroles-ids.xlsx"}
                    </a>
                  </label>
                  <Box mt={2} sx={{ p: 5, border: "1px dashed grey" }}>
                    <div style={styles.fileUploadStyle}>
                      <div {...getRootProps()}>
                        <IconButton>
                          <CloudUploadIcon color="primary" />
                        </IconButton>
                        <Typography variant="body2" color="textSecondary" style={{ padding: "0 0 20px 0" }}>
                          <input {...getInputProps()} />
                          <label style={{ color: "#0A0A0A" }}>Drag & Upload here</label>
                        </Typography>
                      </div>
                      <div htmlFor="file-upload" style={{ cursor: "pointer" }}>
                        <input
                          data-testid="file-upload"
                          type="file"
                          id="file-upload"
                          accept=".xls, .xlsx, .csv"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          multiple
                          hidden
                          ref={inputRef}
                        />
                        <Button variant="outlined" onClick={() => inputRef.current.click()} style={styles.browseButtonStyle}>
                          Browse files
                        </Button>
                      </div>
                    </div>
                  </Box>
                </div>
              )}
            </div>
            <Box mt={2} style={styles.buttonStyle}>
              <Button type="submit" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={!isFormValid}>
                Create
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SingleLineFormComponent;
