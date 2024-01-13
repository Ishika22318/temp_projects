import React, { useEffect, useState } from "react";
import WelcomMessage from "../../components/adminDashboard/welcome";
import WeeklyEvaluationComponent from "../../components/adminDashboard/weekly-evaluation-component";
import Cards from "../../components/adminDashboard/Cards";
import { Typography } from "@mui/material";
import { weeklyEvaluationAPI, coursesCountAPI } from "../../utils/url";
import { fetchWeeklyEvaluationTableData } from "../../services/apicall";
import "../../assets/static/dashboard-component.css";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function DashboardPage(props) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  const [coursesCardData, setCoursesCardData] = useState({});
  const [dropdownData, setDropdownData] = useState({ roles: [], weeksList: [] });
  const [selectedRoleDropdown, setSelectedRoleDropdown] = useState("all");
  const [selectedWeeks, setSelectedWeeks] = useState("all");

  const getTableData = async () => {
    try {
      const token = localStorage.getItem("token");
      const fetchData = await fetchWeeklyEvaluationTableData(token, `${weeklyEvaluationAPI}?showBatch=${selectedWeeks}&showRole=${selectedRoleDropdown}`);
      const fetchCoursesData = await fetchWeeklyEvaluationTableData(token, `${coursesCountAPI}?showBatch=${selectedWeeks}&showRole=${selectedRoleDropdown}`);

      // console.log(fetchData);

      setWeeklyData(fetchData.weeklyData);
      setCoursesCardData(fetchCoursesData.allCoursesStatusCount);
      setDropdownData({ roles: fetchCoursesData.roleData, weeksList: fetchCoursesData.batchData });
      setLoader(false);
    } catch (error) {
      setLoader(false);
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
  };

  useEffect(() => {
    setLoader(true);
    getTableData();
  }, [selectedWeeks, selectedRoleDropdown]);

  return (
    <div className="dashboard-div mt-5 pt-4 pb-1">
      <WelcomMessage
        selectedWeeks={selectedWeeks}
        setSelectedWeeks={setSelectedWeeks}
        selectedRoleDropdown={selectedRoleDropdown}
        setSelectedRoleDropdown={setSelectedRoleDropdown}
        dropdownData={dropdownData}
      />
      <div className="dashboard-card-div">
        <>
          <Typography variant="h6" style={{ color: "#0D4896", fontWeight: "bold" }}>
            Courses
          </Typography>
          {loader ? (
            <div className="loader-class-learning col-12 ">
              <Stack sx={{ color: "grey.600" }} spacing={3} className="col-1 mx-auto" style={{ marginTop: "30vh" }}>
                <CircularProgress color="inherit" />
              </Stack>
            </div>
          ) : (
            <>
              {Object.keys(coursesCardData).length === 0 ? (
                <div className="col-12 ">
                  <Stack sx={{ color: "grey.600" }} spacing={3} className="col-6 mx-auto" style={{ marginTop: "30vh", height: "70vh" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
                      NO COURSES TO SHOW
                    </Typography>
                  </Stack>
                </div>
              ) : (
                <>
                  <Cards coursesCardData={coursesCardData} />
                </>
              )}
            </>
          )}
        </>
      </div>
      {Object.keys(coursesCardData).length === 0 ? (
        <></>
      ) : (
        <>
          <div className="dashboard-weekly-evaluation-div">
            {!loader && weeklyData.length > 0 ? (
              <>
                <WeeklyEvaluationComponent data={weeklyData} selectedRoleDropdown={selectedRoleDropdown} selectedWeeks={selectedWeeks} />
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
