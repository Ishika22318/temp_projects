import React from "react";
import { Select, MenuItem, Typography, Grid } from "@mui/material";
import { USER_ROLES } from "../../../utils/constants";
import "./editScreenComponents.css";

const AdminFields = ({ userData, handleChange }) => {
  return (
    <>
      <Grid>
        <Grid item xs={6} className="adminRoleMargin">
          <Typography className="typographyStyle">Role</Typography>
          <Select name="role" value={userData.role} onChange={handleChange} fullWidth className="adminRoleDropDown">
            {Object.values(USER_ROLES).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminFields;
