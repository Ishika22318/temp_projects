import React from "react";
import { Box, Typography } from "@mui/material";
import "./userHomeScreenComponents.css";
import { NavLink } from "react-router-dom";

const UsersHeading = ({ title }) => {
  return (
    <Box className="users-heading">
      <Typography className="users-header-title" variant="h3" component={NavLink} to="/users">
        {title}
      </Typography>
    </Box>
  );
};

export default UsersHeading;
