import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CourseContentHeading from "./CourseContentHeading";
import CourseContentAccordion from "./CourseContentAccordion";
import CourseContentTests from "./CourseContentTests";
import { handleError } from "../../utils/handleError";

export default function CourseContent() {
  const [topicCount, setTopicCount] = useState(0);
  const [subtopicCount, setSubtopicCount] = useState(0);
  const [expanded, setExpanded] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const courseContentData = location.state;
  console.log(courseContentData, "dcdcdvcdvd");

  useEffect(() => {
    // if (!courseContentData) {
    //   handleError("Course data not found", navigate);
    // } else {
    const details = courseContentData.details;

    if (details && Array.isArray(details)) {
      setSubtopicCount(details.reduce((count, detail) => count + detail.subTopic.length, 0));
      setTopicCount(details.length);
    }
    // }
    // eslint-disable-next-line
  }, [courseContentData]);

  const handleChange = (e) => {
    if (expanded === e.currentTarget.id) {
      setExpanded("");
    } else {
      setExpanded(e.currentTarget.id);
    }
  };

  return (
    <div data-testid="courseContentDiv">
      <div data-testid="courseContentPage" className="col-12 mt-5 pt-2">
        {courseContentData ? (
          <>
            <CourseContentHeading heading={courseContentData.courseName} topic={topicCount} subtopic={subtopicCount} courseId={courseContentData._id} />
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0% 1%",
                  gap: 4,
                }}
              >
                <Grid
                  data-testid="accordion-div"
                  item
                  xs={12}
                  sm={10}
                  md={7}
                  lg={7}
                  xl={7}
                  sx={{
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {courseContentData.details && Array.isArray(courseContentData.details) ? (
                    courseContentData.details.map((data, index) => (
                      <CourseContentAccordion
                        handleChange={handleChange}
                        expanded={expanded}
                        courseData={data}
                        key={index}
                      />
                    ))
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={10} md={4} lg={4} xl={4} sx={{ borderRadius: 2, marginTop: 5 }}>
                  <Button variant="outlined" target="_blank" fullWidth href={courseContentData.courseURL}>
                    View Course
                  </Button>
                  <CourseContentTests
                    label="Assessment"
                    description={courseContentData.courseDescription}
                    link={courseContentData.assessmentURL}
                  />
                  <CourseContentTests
                    label="Assignment"
                    description={courseContentData.courseDescription}
                    link={courseContentData.assignmentURL}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <div className="loader-class-learning col-12">
            <Stack sx={{ color: 'grey.600' }} spacing={3} className="col-1 mx-auto" style={{ marginTop: '30vh' }}>
              <CircularProgress color="inherit" />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
}
