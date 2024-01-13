import React from "react";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ConcentricCirclesExample from "./ConcentricCircles";
import {  find } from "lodash";
import red from "../../assets/static/Red.svg";
import blue from "../../assets/static/Blue.svg";
import yellow from "../../assets/static/Yellow.svg";
import { CardHeader } from "@mui/material";
import { courseUrl } from "../../utils/url";
import { fetchDataFromAPI } from "../../services/apicall";

const RowCard = (props) => {
  const navigate = useNavigate();
  const handleViewCourse =async()=>{
    console.log(props.coursesCardData[props.item],props.item)
    if(props.coursesCardData[props.item]['courseId']){
      try{
        const url=props.coursesCardData[props.item]['courseId']
        const token = localStorage.getItem("token");
        const infoCourse = await fetchDataFromAPI(token,courseUrl,url);
        console.log(infoCourse)
        navigate(`/course-details/${url}`, { state: infoCourse.data });
      }catch (error) {
        console.log(error.message, "hii");
        if (error.message === "Unauthorized") {
          localStorage.clear();
          // props.setIsLoggedIn(false)
          return navigate("/401");
        } else if (error.message === "Not Found") {
          navigate("/404");
        } else if (error.message === "Internal Server Error") {
          navigate("/500");
        }
      }
    }
  }
  
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:'10px',paddingBottom:'10px'}} >
      <CardHeader title={props.item} sx={{ paddingBottom: '0px', textAlign: 'center', color: '#0D4896', fontWeight: '1000' }}></CardHeader>
      <div style={{marginTop:'20px'}}>
        <ConcentricCirclesExample 
            total={props.coursesCardData[props.item]["Total"]} 
            completed={props.coursesCardData[props.item]["Completed"]}
            progress={props.coursesCardData[props.item]["In Progress"]}
            notStarted={props.coursesCardData[props.item]["Not Started"]}
            />
      </div>

      <CardContent >
        <div className="flex-container">
          <div className="image-text-container">
            <img src={blue} alt="Completed" className="status-image" />
            <span className="status-number">
             {props.coursesCardData[props.item]["Completed"]}/{props.coursesCardData[props.item]["Total"]} <br />
              <span className="status-label">Completed</span>
            </span>
          </div>

          <div className="image-text-container">
            <img src={yellow} alt="In Progress" className="status-image" />
            <span className="status-number">
            {props.coursesCardData[props.item]["In Progress"]}/{props.coursesCardData[props.item]["Total"]} <br />
              <span className="status-label">In Progress</span>
            </span>
          </div>

          <div className="image-text-container">
            <img src={red} alt="Not Completed" className="status-image" />
            <span className="status-number">
              {props.coursesCardData[props.item]["Not Started"]}/{props.coursesCardData[props.item]["Total"]}<br />
              <span className="status-label">Not Started</span>
            </span>
          </div>
        </div>
      </CardContent>
      <CardActions className="card-actions" sx={{ padding: '8px' }}>
        <Button className="view-course-button" onClick={handleViewCourse}>View Course</Button>
      </CardActions>
    </div>
  );
};

export default RowCard;
