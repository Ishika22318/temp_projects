import { React, useState, useEffect, useRef } from "react";
import SingleReport from "../../components/adminPerformanceReport/SingleReport";
import { Grid } from "@mui/material";
import PieChart from "../../components/adminPerformanceReport/PieChart";
import BarChart from "../../components/adminPerformanceReport/BarGraph";
import RatingsTable from "../../components/adminPerformanceReport/RatingsTable";
import Header from "../../components/adminPerformanceReport/Header";
import Report from "../reportTab/report";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { handleDownloadPDF } from "../../utils/pdfDownload";
import { useLocation, useNavigate, useParams } from "react-router-dom/dist";
import { getSingleUserGradeReport } from "../../services/adminPerformanceReportApi";
import { handleError } from "../../utils/handleError";

function UsersTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [userReport, setUserReport] = useState({});
  const location = useLocation();
  const param = useParams();
  const email = param.email;
  console.log(location.state);
  const id = location.state === null ? null : location.state.internId; 
  const reportStatus  = location.state === null ? false : location.state.reportStatus;
  console.log(reportStatus)
const navigate = useNavigate();


  const fetchSingleUserGradeData = async () => {
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSingleUserGradeData();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="loader-class-learning col-12 ">
          <Stack sx={{ color: "grey.600" }} spacing={3} className="col-1 mx-auto" style={{ marginTop: "30vh" }}>
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}

      {!isLoading && (
        <div style={{ backgroundColor: "#F6F6F6", padding: "30px" }}>
          <Header title="Report" downloadHandler={handleDownloadPDF} selectHandleBool={true}>
            <div id="content-to-print">
              <Box>
                <SingleReport id={id} email={email} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        overflow: "auto",
                        overflowY: "hidden",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      <PieChart width="650px" height="390px" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        overflow: "auto",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "white",
                      }}
                    >
                      <BarChart width="600px" />
                    </Box>
                  </Grid>
                </Grid>
                {reportStatus ? <Report email={email} /> : ""}
                <h3 style={{ textAlign: "left", margin: "20px 0px" }}>Score Index</h3>
                <RatingsTable sx={{ boxShadow: "15px -15px 15px 15px #00000014" }} />
              </Box>
            </div>
          </Header>
        </div>
      )}
    </div>
  );
}

export default UsersTab;
