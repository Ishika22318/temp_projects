import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import Mytrainingcalendar from "../../components/learningtab/mycalendar";
import Overviewsection from "../../components/learningtab/overview";
import Mytimetable from "../../components/learningtab/timetable";
import { courseManagementAPI, ReportUrl } from "../../utils/url";
import { checkgetCall } from "../../services/apicall";

import "./learningtab.css";

const Learningtab = () => {
  // hooks
  const navigate = useNavigate();
  const todayDate = new Date();

  const [loader, setLoader] = useState(null);
  const [event, setEvent] = useState([]);
  const [cardData, setCardData] = useState({
    course_completed: 0,
    course_progress: 0,
    total_course: 0,
    average_score: 0,
  });
  const [temp, setTemp] = useState([]);
  const [ttViewDate, setTTViewDate] = useState();
  const [todayTT, setTodayTT] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});

  // func to api calling
  const getData = async () => {
    setLoader("loading");
    try {
      // get token from local storage
      const token = localStorage.getItem("token");
      const tokenData = jwtDecode(token);
      setCurrentUserData(tokenData);

      const data = await checkgetCall(token, courseManagementAPI);

      // check if fetch function returns error then handled respectively else data displayed
      try {
        if (data.statuscode === 401) {
          localStorage.clear();
          return navigate("/401");
        }
        else if(data.message==="Not Found"){
          navigate("/404")
        }
        else if(data.message==="Internal Server Error"){
          navigate("/500")
        }
        
      } catch(error) {
        console.log(error)
      }

      const API = `${ReportUrl + tokenData.email}`;

      const data2 = await checkgetCall(token, API);

      //fine tuning data recevied from backend 
      setTemp(data.data[0].data);
      setCardData({
        course_completed: data.data[0].completed_course,
        course_progress: data.data[0].progressed_course,
        total_course: data.data[0].total_course,
        average_score: data2.data.averageScore,
      });
      setEvent([]);

      data.data[0].data.forEach((item) => {
        item.days.forEach((day) => {
          console.log(item,'item')
          setEvent((old) => [
            ...old,
            {
              title: item.course,
              start: day.date + "T" + day.startTime,
              end: day.date + "T" + day.endTime,
            },
          ]);
          setTTViewDate(
            todayDate.toLocaleString("default", { year: "numeric" }) +
              "-" +
              todayDate.toLocaleString("default", { month: "2-digit" }) +
              "-" +
              todayDate.toLocaleString("default", { day: "2-digit" })
          );
        });
      });
    } catch (err) {
      // if there's and error while calling fetch function 
      if (err.message ===`Invalid token specified: Cannot read properties of undefined (reading 'replace')`) {
        return navigate("/");
      }
      else if(err.message==="Failed to fetch"){
        navigate("/500")
      }
    }
    setLoader(null);
  };
  // for setting timetable according to calendar
  const timeTableData = () => {
    try {
      temp.forEach((item) => {
        item.days.forEach((day) => {
          if (ttViewDate === day.date) {
            setTodayTT((oldTT) => [
              ...oldTT,
              {
                title: item.course,
                label: day.label,
                timeline: day.startTime + " - " + day.endTime,
              },
            ]);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoader("loading")
    getData();
    setLoader(null)
  }, []);

  useEffect(() => {
    setTodayTT([]);
    timeTableData();
  }, [ttViewDate]);

  return (
    <div
      data-testid="learningTab"
      className="learning-tab-background col-12 p-0"
    >
      <div className="row col-12 mt-4 p-0 mx-0 pr-0  my-learningtab-row">
        <div
          className="col-12 col-lg-9  px-1 px-lg-3  my-learing-tab mt-5 pt-1 pb-3"
          id="my-time-table"
        >
          <h2>Welcome Back, {currentUserData.name}!</h2>
          <p>Get ready and continue your studies with Q's Training Portal</p>

          {loader === "loading" ? (
            <div className="loader-class-learning col-12 ">
               <Stack sx={{ color: 'grey.600' }} spacing={3}  className="col-1 mx-auto" style={{marginTop:'30vh'}}>
                <CircularProgress color="inherit" />
              </Stack>
            </div>
          ) : (
            <>
                <div className="col-12 pl-lg-0 overview-section mt-1 mb-4">
                <h4>Overview</h4>
                  {/* <div className="mx-auto row align-items-center "> */}
                    <div className="d-block d-lg-flex">
                    <Overviewsection classname='col-12 col-lg-4        mt-2 overview-card-body' progress={cardData.course_progress} outOff={cardData.total_course} cardHeading="Courses in progress" cardText='Lorem ipsum dolor sit amet. Vel temporibus aperiam est'/>
                    <Overviewsection classname='col-12 col-lg-4 mx-lg-2  mt-2 overview-card-body' progress={cardData.course_completed} outOff={cardData.total_course} cardHeading="Courses completed"  cardText='Lorem ipsum dolor sit amet. Vel temporibus aperiam est'/>
                    <Overviewsection classname='col-12 col-lg-4       mt-2 overview-card-body'progress={cardData.average_score} outOff='4' cardHeading="Average Scores" cardText='Lorem ipsum dolor sit amet. Vel temporibus aperiam est'/>
                  </div>
                  {/* </div> */}
               </div>
                <h4>Your Training Plan</h4>
                <Mytrainingcalendar event={event} setTTViewDate={setTTViewDate} />
            </>
          )}
        </div>
        <div
          className="col-12 col-lg-3 my-time-table pr-0 mt-3 mt-lg-5 mb-2 mb-lg-0 pb-3"
          id="my-time-table"
        >
          <h4>Timetable</h4>
          {loader === "loading" ? (
            <div className="loader-class-learning col-12 py-5">
               <Stack sx={{ color: 'grey.600' }} spacing={3}  className="col-1 mx-auto" style={{marginTop:'30vh'}}>
                <CircularProgress color="inherit" />
              </Stack>
            </div>
          ) : (
            <>
              <h6>
                {new Date(ttViewDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h6>
              <Mytimetable todayTT={todayTT} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learningtab;
