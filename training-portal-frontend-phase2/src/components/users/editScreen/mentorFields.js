import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { Typography, Select, MenuItem, Grid, Divider } from "@mui/material";
import { JOB_ROLES, USER_ROLES } from "../../../utils/constants";
import { internMentorChange } from "../../../services/internMentorChange";
import SearchIcon from "@mui/icons-material/Search";
import "./editScreenComponents.css";
import { JobRolesApi } from "../../../utils/usersAPI";

const MentorFields = ({ userData, handleChange, internList }) => {
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const [selectedJobRole, setselectedJobRole] = useState(userData.jobRole);
  useEffect(() => {
    getJobRoles();
  }, []);
  console.log(userData.jobRole);

  useEffect(() => {
    const assignedInternEmails = userData.assignedInterns.map((intern) => intern.email);
    const selectedInternsFiltered = internList.filter((intern) => assignedInternEmails.includes(intern.email)).map((intern) => `${intern.name}|${intern.email}`);
    setSelectedInterns(selectedInternsFiltered);
  }, [userData.assignedInterns, internList]);

  const handleInternsChange = (selected) => {
    internMentorChange(selected, userData, handleChange, "assignedInterns");
  };
  const getJobRoles = async () => {
    try {
      const response = await JobRolesApi();
      const fetchedJobRoles = response.jobRoles;
      console.log(fetchedJobRoles);
      setJobRole(fetchedJobRoles);
      console.log(fetchedJobRoles);
    } catch (error) {
      console.error("Error fetching batch dates:", error);
    }
  };
  const handleJobRoleChange = (e) => {
    userData.jobRole = e.target.value;
    setselectedJobRole(e.target.value);
  };

  return (
    <>
      <Grid container spacing={3} className="job-role-section">
        <Grid item xs={6}>
          <Typography className="section-title">Job Role</Typography>
          <Select name="jobRole" value={selectedJobRole} onChange={handleJobRoleChange} fullWidth className="select-box">
            {jobRole.map((jr) => (
              <MenuItem key={jr.roleName} value={jr.roleName}>
                {jr.roleName}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          <Typography className="section-title">Role</Typography>
          <Select name="role" value={userData.role} onChange={handleChange} fullWidth className="select-box">
            {Object.values(USER_ROLES).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Divider className="divider" />
      <Typography className="section-title">Assigned Interns</Typography>

      <Select
        name="assignedInterns"
        multiple
        className="select-box"
        value={selectedInterns}
        onChange={(e) => handleInternsChange(e.target.value)}
        fullWidth
        renderValue={() => (
          <div>
            <SearchIcon /> Search
          </div>
        )}
      >
        {internList.map((intern) => (
          <MenuItem key={intern.id} value={`${intern.name}|${intern.email}`} className="MuiMenu-paper">
            <Checkbox checked={selectedInterns.includes(`${intern.name}|${intern.email}`)} />
            <ListItemText primary={`${intern.name} (${intern.email})`} />
          </MenuItem>
        ))}
      </Select>

      <div className="mentor-chips">
        {userData.assignedInterns.map((intern) => (
          <Chip key={intern.name} label={`${intern.name}`} onDelete={() => handleInternsChange(selectedInterns.filter((m) => m !== `${intern.name}|${intern.email}`))} className="margin4" />
        ))}
      </div>
    </>
  );
};

export default MentorFields;
