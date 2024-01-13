import React from "react";
import { Grid, Box, Typography, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {},
  box: {},
  media: {},
  content: {},
  status: {},
  alignrow: {},
  rightborder: {},
  alignMentors: {},
  name: {},
  mentorcard: {},
  gridContainer: {},
  gridItem: {},
  editbutton: {},
  smalltext: {},
  buttonstyle: {},
});

function DetailsProfileUserCard({ details, type }) {
  const classes = useStyles();
  return (
    <Grid item className="card-primary" xs={12} sm={5.8} md={type === "Intern" ? 3.4 : 3.4} lg={type === "Intern" ? 5.8 : 2.75}>
      {details.profilePicture ? (
        <CardMedia className={`custom-media ${classes.media}`} image={details.profilePicture} title="Profile Photo" />
      ) : (
        <Box className="sub-boxes">
          <Box className="profile-initials">
            {details.name && details.name[0].toUpperCase()}
            {details.name && details.name.indexOf(" ") !== -1 && details.name.split(" ").length > 1 ? details.name.split(" ")[1][0].toUpperCase() : ""}
          </Box>
        </Box>
      )}
      <Box className="name-container">
        <Box>
          <Typography variant="div" className="name-text">
            {details.name}
          </Typography>
          <br></br>
          <Typography variant="div" className="email-text">
            {details.email}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default DetailsProfileUserCard;
