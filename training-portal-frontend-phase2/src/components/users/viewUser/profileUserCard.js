import React from "react";
import {Grid, Box} from "@mui/material";
import DetailsProfileUserCard from "./detailsProfileUserCard";

// Desinged to display the sub-card lists of respective mentors/interns
const ProfileUserCard = ({profile}) => {
  let assigned = profile.role === "Intern" ? profile.assignedMentors : profile.assignedInterns;
  assigned = assigned === undefined ? [] : assigned;

  return (
    <Box className="card-container">
      <Grid>
        <Grid container className="card-grid">
          {assigned.map((details) => {
            return <DetailsProfileUserCard details={details} type={profile.role} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileUserCard;
