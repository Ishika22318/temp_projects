import { Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Grid, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { JOB_ROLES, USER_ROLES, RELEASED_OPTIONS } from "../../../utils/constants";
import { internMentorChange } from "../../../services/internMentorChange";
import SearchIcon from "@mui/icons-material/Search";
import "./editScreenComponents.css";
import { JobRolesApi } from "../../../utils/usersAPI";

const InternFields = ({ userData, handleChange, mentorList }) => {
  console.log("userData", userData);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const [selectedJobRole, setselectedJobRole] = useState(userData.jobRole);
  useEffect(() => {
    getJobRoles();
  }, []);
  console.log(userData.jobRole);

  useEffect(() => {
    const assignedMentorEmails = userData.assignedMentors.map((mentor) => mentor.email);
    const selectedMentorsFiltered = mentorList.filter((mentor) => assignedMentorEmails.includes(mentor.email)).map((mentor) => `${mentor.name}|${mentor.email}`);
    setSelectedMentors(selectedMentorsFiltered);
  }, [userData.assignedMentors, mentorList]);

  const handleMentorsChange = (selected) => {
    internMentorChange(selected, userData, handleChange, "assignedMentors");
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
      <FormControl component="fieldset" className="released-section">
        <Typography className="section-title">Released for project</Typography>
        <RadioGroup name="released" value={userData.released} onChange={handleChange}>
          <div>
            {Object.entries(RELEASED_OPTIONS).map(([key, label]) => (
              <FormControlLabel key={key} value={key} control={<Radio />} label={label === RELEASED_OPTIONS.true ? RELEASED_OPTIONS.true : RELEASED_OPTIONS.false} />
            ))}
          </div>
        </RadioGroup>
      </FormControl>
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
      <Typography className="section-title">Assigned Mentors</Typography>

      <Select
        name="assignedMentors"
        multiple
        className="assigned-box"
        value={selectedMentors}
        onChange={(e) => handleMentorsChange(e.target.value)}
        fullWidth
        renderValue={() => (
          <div>
            <SearchIcon /> Search
          </div>
        )}
      >
        {mentorList.map((mentor) => (
          <MenuItem key={mentor.id} value={`${mentor.name}|${mentor.email}`} className="MuiMenu-paper">
            <Checkbox checked={selectedMentors.includes(`${mentor.name}|${mentor.email}`)} />
            <ListItemText primary={`${mentor.name} (${mentor.email})`} />
          </MenuItem>
        ))}
      </Select>

      <div className="mentor-chips">
        {userData.assignedMentors.map((mentor) => (
          <Chip key={mentor.name} label={`${mentor.name}`} onDelete={() => handleMentorsChange(selectedMentors.filter((m) => m !== `${mentor.name}|${mentor.email}`))} className="margin4" />
        ))}
      </div>
    </>
  );
};

export default InternFields;
