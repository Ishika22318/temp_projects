import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header_box: {
    padding: "1.5rem",
    borderBottom: "2px solid #D9DAE4",
    backgroundColor: theme.palette.grey[200],
    color: "#0e4d94",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
      fontSize: "1rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
      fontSize: "1rem",
    },
  },
  bold_text: {
    font: "Poppins",
    fontWeight: "600",
  },
}));
export default function PageTitle(data) {
  const classes = useStyles();
  return (
    <>
      <div>
        <Box className={classes.header_box}>
          <Typography variant="h4" className={classes.bold_text}>
            {data.title}
          </Typography>
        </Box>
      </div>
    </>
  );
}
