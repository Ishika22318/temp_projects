import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CourseContentHeading1 from "./CourseContentHeading1";
import CourseConentAccordion1 from "./CourseContentAccordion1";
import { courseManagementAPI } from "../../utils/url";
import { fetchDataFromAPI } from "../../services/apicall";
import { countTopicsAndSubtopics, refactorCourseContentData } from "../../utils/helpers";
import { Button } from "@mui/material";
import CourseContentTests1 from "./CourseContentTests1";
import { handleError } from "../../utils/handleError";




export default function CourseContent() {
  const [topicCount,setTopicCount]=useState(0);
  const [subtopicCount,setSubtopicCount]=useState(0);
  const [courseContentData, setCourseContentData] = useState(null);
  const [expanded, setExpanded] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line
  }, []);


  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }
      const course = searchParams.get("course");
 
      const result = await fetchDataFromAPI(token, courseManagementAPI, course);
      console.log("result");
      console.log(result);
      console.log("result");
      setCourseContentData(refactorCourseContentData(result));
      let countObject = countTopicsAndSubtopics(refactorCourseContentData(result));
      setSubtopicCount(countObject.subtopicCount)
      setTopicCount(countObject.topicCount)


    } catch (error) {
    //  to handle error
      handleError(error,navigate)

    }
  }

  const handleChange = (e) => {
    if (expanded === e.currentTarget.id) {
      setExpanded("");
    } else {
      setExpanded(e.currentTarget.id);
    }
  };
       return(
        <div data-testid="courseContentDiv">
     {courseContentData ? <div data-testid="courseContentPage" className="className={classes.courseContentPage} col-12 mt-5 pt-2">
        {" "}
        {/* Updated data-testid */}
        <CourseContentHeading1 heading={courseContentData.course} topic={topicCount} subtopic={subtopicCount} />
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
              {courseContentData["courseContent"].map((data, index) => (
                <CourseConentAccordion1 handleChange={handleChange} expanded={expanded} courseData={data} key={index} />
              ))}
            </Grid>




            <Grid item xs={12} sm={10} md={4} lg={4} xl={4} sx={{ borderRadius: 2, marginTop: 5 }}>
              <Button variant="outlined" target="_blank" fullWidth href={courseContentData.courseUrl}>View Course</Button>
              {courseContentData.assessmentObject.link?<CourseContentTests1 label={courseContentData.assessmentObject.label} description={courseContentData.assessmentObject.description} link={courseContentData.assessmentObject.link} />:" "}
              {courseContentData.assignmentObject.link?<CourseContentTests1 label={courseContentData.assignmentObject.label} description={courseContentData.assignmentObject.description} link={courseContentData.assignmentObject.link}/>:" "}
            </Grid>




          </Grid>
        </Box>
      </div>
 :            <div className="loader-class-learning col-12 ">
 <Stack sx={{ color: 'grey.600' }} spacing={3}  className="col-1 mx-auto" style={{marginTop:'30vh'}}>
  <CircularProgress color="inherit" />
</Stack>
</div>

    }
        </div>
       );
 
  }


























// import * as React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import CourseContentHeading from "./CourseContentHeading";
// import CourseConentAccordion from "./CourseContentAccordion";
// import { courseManagementAPI } from "../../utils/url";
// import { fetchDataFromAPI } from "../../services/apicall";
// import { countTopicsAndSubtopics, refactorCourseContentData } from "../../utils/helpers";
// import { Button } from "@mui/material";
// import CourseContentTests from "./CourseContentTests";
// import { makeStyles } from "@material-ui/core/styles";
// import { handleError } from "../../utils/handleError";

// const useStyles = makeStyles((theme) => ({
//   courseContentPage: {
//     marginTop: theme.spacing(5),
//     paddingTop: theme.spacing(2),
//   }
// }));

// export default function CourseContent() {
//   const classes=makeStyles();
//   const [courseContentData, setCourseContentData] = useState(null);
//   const [expanded, setExpanded] = useState("");
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   async function fetchData() {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/401");
//       }
//       const course = searchParams.get("course");
//       const result = await fetchDataFromAPI(token, courseManagementAPI, course);

//       setCourseContentData(refactorCourseContentData(result));

//     } catch (error) {
//     //  to handle error
//       handleError(error,navigate)

//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     if (expanded === e.currentTarget.id) {
//       setExpanded("");
//     } else {
//       setExpanded(e.currentTarget.id);
//     }
//   };

//   if (courseContentData !== null) {
//     let { topicCount, subtopicCount } = countTopicsAndSubtopics(courseContentData);
//     return (
//       <div data-testid="courseContentPage" className="className={classes.courseContentPage} col-12 mt-5 pt-2">
//         {" "}
//         {/* Updated data-testid */}
//         <CourseContentHeading heading={courseContentData.course} topic={topicCount} subtopic={subtopicCount} />
//         <Box sx={{ flexGrow: 1 }}>
//           <Grid
//             container
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               padding: "0% 1%",
//               gap: 4,
//             }}
//           >
//             <Grid
//             data-testid="accordion-div"
//               item
//               xs={12}
//               sm={10}
//               md={7}
//               lg={7}
//               xl={7}
//               sx={{
//                 borderRadius: 2,
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//               }}
//             >
//               {courseContentData["courseContent"].map((data, index) => (
//                 <CourseConentAccordion handleChange={handleChange} expanded={expanded} courseData={data} key={index} />
//               ))}
//             </Grid>




//             <Grid item xs={12} sm={10} md={4} lg={4} xl={4} sx={{ borderRadius: 2, marginTop: 5 }}>
//               <Button variant="outlined" target="_blank" fullWidth href={courseContentData.courseUrl}>View Course</Button>
//               {courseContentData.assessmentObject.link?<CourseContentTests label={courseContentData.assessmentObject.label} description={courseContentData.assessmentObject.description} link={courseContentData.assessmentObject.link} />:" "}
//               {courseContentData.assignmentObject.link?<CourseContentTests label={courseContentData.assignmentObject.label} description={courseContentData.assignmentObject.description} link={courseContentData.assignmentObject.link}/>:" "}
//             </Grid>




//           </Grid>
//         </Box>
//       </div>
//     );
//   } else {
//     return (
//       <div data-testid="courseContentPage" className="col-12 pt-5">
//         {" "}
//         {/* Updated data-testid */}
//         <div className="loader-class-learning col-12">
//           <div className="spinner-learning mx-auto"></div>
//         </div>
//       </div>
//     );
//   }
// }
