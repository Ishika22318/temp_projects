import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CourseContentAccordionListItem from "./CourseContentAccordionListItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  accordion: {
    boxShadow: theme.shadows[1],
    borderRadius: 2,
    gap: 10,
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  summaryContainer: {
    color: '#0D4896',
    alignItems: 'center',
    background: '#0D4896',
    color: 'white',
  },
  arrowIcon: {
    marginRight: theme.spacing(1),
  },
  subtopicContainer: {
    fontWeight: 500,
  },
}));

export default function CourseContentAccordion(props) {
  const classes = useStyles();

  // Check if props.courseData and props.courseData.subTopic are defined and are arrays
  const isDataValid = props.courseData && Array.isArray(props.courseData.subTopic);

  return (
    <Accordion
      expanded={props.expanded === props.courseData.topic}
      className={classes.accordion}
      id="1"
    >
      <div
        className={classes.summaryContainer}
        id={props.courseData.topic}
        onClick={props.handleChange}
        data-testid="accordin-div"
      >
        <AccordionSummary>
          <KeyboardArrowDownIcon className={classes.arrowIcon} />
          <Typography style={{ marginLeft: 10 }}>{props.courseData.topic}</Typography>
        </AccordionSummary>
      </div>
      <AccordionDetails>
        <Typography component="span">
          <div className={classes.subtopicContainer}>
            {isDataValid ? (
              props.courseData.subTopic.map((subtopic, index) => (
                <CourseContentAccordionListItem courseItem={subtopic} key={index} />
              ))
            ) : null}
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
