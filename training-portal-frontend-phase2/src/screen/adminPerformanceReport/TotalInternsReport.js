import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/adminPerformanceReport/Header";
import PieChart from "../../components/adminPerformanceReport/PieChart";
import BarGraph from "../../components/adminPerformanceReport/BarGraph";
import { getAllUsersReports, getTopandPoorPerformer } from "../../services/adminPerformanceReportApi";
import { handleDownloadPDF } from '../../utils/pdfDownload';
// MUI IMPORTS
import { Box, Typography, Button, Grid, Paper, Card } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { CircularProgress } from "@material-ui/core";
import { handleError } from '../../utils/handleError';

let data=[];
let filteredData=[];

function Report() {
  const [topPerformer, setTopPerformer] = useState([]);
  const [poorPerformer, setPoorPerformer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          localStorage.clear();
          navigate("/401");
        }
        data = await getAllUsersReports();
        await sortHandle(data); 
        setIsLoading(false);
      } catch (error) {

        handleError(error, navigate);
      }
    };
  
    fetchData();
  }, []);

  const sortHandle = async (filteredData) => {
    const sortedData = await filteredData.sort((a,b) => b.score- a.score);
    let topThree = []
    let bottomThree = []
  
    if(sortedData.length <= 3){ topThree = sortedData;}
    else{
    topThree = sortedData.slice(0,3);
    }
    if(sortedData.length <=3) bottomThree = sortedData;
    else{
      bottomThree = sortedData.slice(-3);
    }
      setTopPerformer(topThree);
      setPoorPerformer(bottomThree);
    }
  
  useEffect(()=>{
    const fetchData = async () => {
      if(selectedBatch === 'All'){
      filteredData = data;
      }
      else{
      filteredData = data.filter((user) => {
        return user.batch_id.includes(selectedBatch);
      });
    }
      await sortHandle(filteredData); 
    };
  
    fetchData(); // Call the async function
  },[selectedBatch])

  return (
    <Box padding="10px 40px" bgcolor="#F6F6F6" sx={{ padding: { xs: "10px" } }}>
      <Header title="Performance" downloadHandler={handleDownloadPDF} selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch}>
    <div id="content-to-print"> 
      <Box>
      <Box px={1.5} mt={2}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} sm={10} lg={3}>
            <Paper elevation={1}>
              <Card variant="outlined" sx={{ minHeight: 455 }}></Card>
            </Paper>
          </Grid>

    <Grid item xs={12} sm={10} lg={6}>
            <Paper elevation={1}>
       
              <Card
                variant="outlined"
                sx={{
                  height: 455,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflowX: "hidden",
                }}
              >
                <PieChart width = "800px" height = "550px" />
              </Card>
           
            </Paper>
          </Grid>

          <Grid item xs={12} sm={10} lg={2.5}>
            <Box
              minHeight={500}
              display="flex"
              flexDirection="column"
            >
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    color: "#fff",
                    bgcolor: "#0D4896",
                    textTransform: "capitalize",
                    py: 1.5,
                    width: "100%",
                  }}
                  onClick={() => {
                    navigate("/performanceTable");
                  }}
                >
                  <ArticleIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    View intern report
                  </Typography>
                </Button>
              </Box>

              <Box my={1}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    color="#0D4896"
                    fontWeight="500"
                    mb={2}
                  >
                    Top three performer
                  </Typography>

                  {!isLoading ? (
                    topPerformer.map((intern) => (
                      <Box
                        key={intern.name}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignContent={"center"}
                        textAlign={"center"}
                        my={1.5}
                      >
                        <Typography
                          variant="body1"
                          width={"25px"}
                          height={"25px"}
                          bgcolor={"#ECF4FD"}
                          borderRadius={"50%"}
                          p={0.5}
                        >
                          IN
                        </Typography>

                        <Box
                          width={"80%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignContent={"center"}
                          ml={1}
                        >
                          <Typography
                            variant="body2"
                            sx={{ width: "60%", mt: 1, textAlign: "start" }}
                          >
                            {intern.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ width: "40%", marginLeft: "1", mt: 1 }}
                          >
                            {intern.score} / 5
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box display={"flex"} justifyContent={"center"}>
                      <CircularProgress color="primary" />
                    </Box>
                  )}
                </Paper>
              </Box>

              <Box>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    color="#0D4896"
                    fontWeight="500"
                    mb={2}
                  >
                    Interns with poor Performance
                  </Typography>

                  {!isLoading ? (
                    poorPerformer.map((intern) => (
                      <Box
                        key={intern.name}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignContent={"center"}
                        textAlign={"center"}
                        my={1}
                      >
                        <Typography
                          variant="body1"
                          width={"25px"}
                          height={"25px"}
                          bgcolor={"#ECF4FD"}
                          borderRadius={"50%"}
                          p={0.5}
                        >
                          IN
                        </Typography>

                        <Box
                          width={"80%"}
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignContent={"center"}
                          ml={1}
                        >
                          <Typography
                            variant="body2"
                            sx={{ width: "60%", mt: 1, textAlign: "start" }}
                          >
                            {intern.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ width: "40%", marginLeft: "1", mt: 1 }}
                          >
                            {intern.score} / 5
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box display={"flex"} justifyContent={"center"}>
                      <CircularProgress color="primary" />
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* BAR CHART */}
   
      <Box px={1.5} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Card
                variant="outlined"
                sx={{
                  minHeight: 500,
                  display: "flex",
                  justifyContent: "center",
                  overflowX: "auto",
                }}
              >
                <BarGraph width={"800px"} />
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      </Box>
      </div>

      </Header>
    </Box>
    
  );
}

export default Report;
