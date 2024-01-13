import * as React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: '3%',
    paddingRight: '3%',
    marginBottom: '10px',
  },
  item: {
    backgroundColor: '#F6F6F6',
    borderRadius: 2,
    padding: theme.spacing(4),
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px',
  },
  backIcon: {
    cursor: 'pointer',
  },
  headingText: {
    color: '#0D4896',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  subheadingText: {
    marginLeft: 28,
  },
}));

export default function CourseContentHeading(props) {
  const classes=useStyles();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Grid container className={classes.container} data-testid="heading">
      <Grid item xs={12} className={classes.item}>
        <div className={classes.headingContainer}>
          <KeyboardBackspaceIcon
            className={classes.backIcon}
            onClick={goBack}
            data-testid="id"
          />
          <Typography variant="h5" component="div" className={classes.headingText}>
            {props.heading} Course Content
          </Typography>
        </div>
        <div className={classes.subheadingText}>
          {props.topic} topics | {props.subtopic} Sub topics
        </div>
      </Grid>
    </Grid>
  );
}
