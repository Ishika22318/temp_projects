import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CourseContentAccordionListItem1 from "./CourseContentAccordionListItem1";
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

export default function CourseConentAccordion(props) {
  const classes=useStyles()
  return (
    <Accordion
      expanded={props.expanded === props.courseData.topic}
      className={classes.accordion}
      id="1"
    >
      <div className={classes.summaryContainer}
                id={props.courseData.topic} 
                onClick={props.handleChange}
                data-testid="accordin-div"
      >
        <AccordionSummary
          aria-controls="panel1"
          // id={props.courseData.topic} 
          // onClick={props.handleChange}
        >
          <KeyboardArrowDownIcon className={classes.arrowIcon} />
          <Typography style={{ marginLeft: 10 }}>{props.courseData.topic}</Typography>
        </AccordionSummary>
      </div>
      <AccordionDetails>
        <Typography component="span">
          <div className={classes.subtopicContainer}>
            {props.courseData.subtopics.map((subtopic, index) => (
              <CourseContentAccordionListItem1 courseItem={subtopic} key={index} />
            ))}
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
