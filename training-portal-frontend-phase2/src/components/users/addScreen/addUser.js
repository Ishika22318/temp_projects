import React, { useState, useRef, useEffect } from "react";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";
import { NavLink, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Container, Paper, Typography, TextField, Box, Button, Select, MenuItem, FormControl, Divider, IconButton } from "@mui/material";
import Excel from "../../../assets/icon/Excel";
import { addUserToDB, importUsers } from "../../../utils/usersAPI";
import "./addUsersStyles.css";
import { JOB_ROLES, USER_ROLES, ErrorMessages } from "../../../utils/constants";
import { fetchBatchData, JobRolesApi } from "../../../utils/usersAPI";
const initialFormData = {
  email: "",
  name: "",
  contact: "",
  // batchId: "",
  role: "",
  jobRole: "",
  jobRoleId: "",
};

const AddUser = ({ handleClose, handleReloadData }) => {
  const [batchNames, setBatchNames] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const inputRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [batchesData, setBatchesData] = useState([]);

  const [emailError, setEmailError] = useState("");

  const [file, setFile] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    updateFormValidity();
  }, [formData]);
  useEffect(() => {
    fetchAllBatches();
    getJobRoles();
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return value.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      default:
        return true;
    }
  };

  // const updateFormValidity = () => {
  //   const isEmailValid = validateField("email", formData.email);

  //   const isValid = isEmailValid && Object.values(formData).every((value) => value.trim() !== "");
  //   setIsFormValid(isValid);

  //   setEmailError(isEmailValid ? "" : "Invalid email format");
  // };
  // ...

  const updateFormValidity = () => {
    const isEmailValid = validateField("email", formData.email);

    // Remove "formData.contact" from the validation process
    const isValid =
      isEmailValid &&
      Object.entries(formData)
        .filter(([key, value]) => key !== "contact")
        .every(([key, value]) => value.trim() !== "");

    setIsFormValid(isValid);

    setEmailError(isEmailValid ? "" : "Invalid email format");
  };

  // ...

  const addUser = async (requestData) => {
    try {
      const userData = requestData;

      await addUserToDB(userData);
      handleClose();
    } catch (error) {
      console.error("Error adding user :", error);
    }
  };

  const handleJobRoleChange = (e) => {
    const selectedJobRole = jobRole.find((jr) => jr._id === e.target.value);
    setFormData({
      ...formData,
      jobRole: selectedJobRole.roleName,
      jobRoleId: selectedJobRole._id,
    });
    setIsFormValid(true);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFieldChange2 = (newPhoneValue) => {
    setFormData({
      ...formData,
      contact: newPhoneValue,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFile(selectedFile);
    setIsFormValid(true);
  };

  const handleDelete = (fileToDelete) => () => {
    const selectedFile = file.filter((fil) => fil !== fileToDelete);
    setFile(selectedFile);
  };

  const sendFileData = async () => {
    try {
      await importUsers(file);
      window.location.reload();
    } catch (error) {
      throw new Error(ErrorMessages.ERROR_SENDING_FILE_DATA);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file.length !== 0) {
      sendFileData();
      return;
    }

    const requestBody = {
      email: formData.email,
      name: formData.name,
      contact: formData.contact,
      role: formData.role,
      // batchId: formData.batchId,
      jobRole: formData.jobRole,
      jobRoleId: formData.jobRoleId,
    };
    handleAddUser(requestBody);
  };
  const handleAddUser = async (requestBody) => {
    try {
      addUser(requestBody);

      handleReloadData();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const fetchAllBatches = async () => {
    try {
      const response = await fetchBatchData(navigate);
      const batchesData = response.data.data;

      setBatchesData(batchesData);
    } catch (error) {
      console.error("Error fetching batch dates:", error);
    }
  };
  const getJobRoles = async () => {
    try {
      const response = await JobRolesApi(navigate);
      const fetchedJobRoles = response.jobRoles;
      console.log(fetchedJobRoles);
      setJobRole(fetchedJobRoles);
    } catch (error) {
      console.error("Error fetching batch dates:", error);
    }
  };

  return (
    <Box className="container">
      <Container>
        <Paper elevation={3} className="paper">
          <Typography variant="h5" gutterBottom className="title">
            Add user
          </Typography>

          <form onSubmit={handleSubmit} className="addUserForm">
            <Typography variant="body2" className="label ">
              *User Email
            </Typography>

            <TextField placeholder="user email" fullWidth name="email" value={formData.email} onChange={handleFieldChange} className="textfield mr-3" error={emailError !== ""} helperText={emailError} />

            <div className="form-row">
              <div className="form-column ">
                <Typography variant="body2" className="label">
                  User Name
                </Typography>
                <TextField placeholder="user name" fullWidth name="name" value={formData.name} onChange={handleFieldChange} />
              </div>

              <div className="form-column ml-2">
                <Typography variant="body2" className="label">
                  User Contact
                </Typography>

                <ReactPhoneInput placeholder="Enter contact" fullWidth name="contact" country="in" value={formData.contact} onChange={handleFieldChange2} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <FormControl fullWidth>
                  <Typography>*JobRole</Typography>

                  <Select name="jobRole" fullWidth value={formData.jobRoleId} onChange={handleJobRoleChange} className="textfieldhalf">
                    {jobRole.map((jr) => (
                      <MenuItem key={jr._id} value={jr._id}>
                        {jr.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-column ml-2">
                <FormControl fullWidth>
                  <Typography>*Role</Typography>
                  <Select name="role" value={formData.role} onChange={handleFieldChange} className="textfieldhalf">
                    {Object.values(USER_ROLES).map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <Divider className="divider"> or </Divider>

            <Typography variant="body2" color="textSecondary" className="label">
              Use the attached template for bulk creation :
              <a href={require("./Users.csv")} download="Users">
                <Excel />
                {"Users.csv"}
              </a>
            </Typography>

            <div className="file-list">
              {file.length > 0 ? (
                <div>
                  {file.map((fi, index) => (
                    <li key={index}>
                      <a className="link">
                        <Excel />
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none"></svg>
                        {fi.name}
                      </a>
                      <IconButton onClick={handleDelete(fi)}>
                        <ClearRoundedIcon />
                      </IconButton>
                    </li>
                  ))}
                </div>
              ) : (
                <Box mt={2}>
                  <div>
                    <input type="file" id="file-upload" accept=".xls, .xlsx, .csv" onChange={handleFileChange} multiple hidden ref={inputRef} />
                    <IconButton>
                      <CloudUploadIcon color="primary" />
                    </IconButton>
                    <Typography variant="body2" color="textSecondary">
                      <label>Drag & Upload here</label>
                    </Typography>
                    <Button variant="outlined" onClick={() => inputRef.current.click()} className="upload-button">
                      Browse files
                    </Button>
                  </div>
                </Box>
              )}
            </div>

            <div className="button-container">
              <Button component={NavLink} to="/users" variant="contained" color="primary" onClick={handleClose} className="cancel-button">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" disabled={!isFormValid} className="save-button">
                Save
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddUser;
