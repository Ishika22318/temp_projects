import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom/dist";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Box, IconButton } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { red, green, grey } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from "@mui/material/CircularProgress";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { getSingleUserReport } from "../../services/adminPerformanceReportApi";
import { handleError } from "../../utils/handleError";

const SingleReport = ({ id, email }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [assignedInterns, setAssignedInterns] = useState([]);
  const [assignedMentors, setAssignedMentors] = useState([]);
  const navigate = useNavigate();

  const fetchSingleUserData = async () => {
    try{
    const data = await getSingleUserReport(id);
    setUserProfile(data);
    setAssignedInterns(data.data.assignedInterns);
    setAssignedMentors(data.data.assignedMentors);
    setIsLoading(false);
    }catch(error){
      handleError(error, navigate);
    }
  };

  useEffect(() => {
    fetchSingleUserData();
  }, []);


  return (
    <div>
      {isLoading && (
        <div className="loader-class-learning col-12 ">
          <Stack
            sx={{ color: "grey.600" }}
            spacing={3}
            className="col-1 mx-auto"
            style={{ marginTop: "30vh" }}
          >
            <CircularProgress color="inherit" />
          </Stack>
        </div>
      )}
      {!isLoading && (
        //  Showing User Information

        <Box
          sx={{
            backgroundColor: "whitesmoke",
            marginBottom: "50px",
          }}
        >
          <Box sx={{ m: 1.5 }}>
            <Grid container>
              <Grid xs={12}>
                <Card
                  sx={{
                    padding: {
                      sx: "3px 20px",
                      md: "6px 15px",
                      lg: "10px 15px",
                    },
                  }}
                >
                  <CardHeader
                    sx={{
                      marginBottom: "20px",
                      fontSize: {
                        xs: 20,
                        md: 24,
                      },
                    }}
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: red[500],
                          width: {
                            xs: 50,
                            md: 80,
                            lg: 100,
                          },
                          height: {
                            xs: 50,
                            md: 80,
                            lg: 100,
                          },
                        }}
                        aria-label="recipe"
                        src={userProfile.data.profilePicture}
                      ></Avatar>
                    }
                    title={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            fontSize: {
                              xs: 16,
                              md: 20,
                              lg: 24,
                            },
                            textAlign: "left",
                          }}
                        >
                          {userProfile.data.name}
                        </Box>
                        <Button
                        data-html2canvas-ignore
                          sx={{ marginRight: "10px" }}
                          onClick={() => {
                            navigate("/edit/" + id, {
                              state: {
                                userData: userProfile.data,
                                mentorList: assignedMentors,
                                internList: assignedInterns,
                              },
                            });
                          }}
                        >
                          Edit
                        </Button>
                      </Box>
                    }
                    subheader={
                      <Box
                        sx={{
                          fontSize: {
                            xs: 14,
                            md: 16,
                            lg: 18,
                          },
                          lineHeight: 2,
                          textAlign: "left",
                        }}
                      >
                        <EmailIcon sx={{ fontSize: 18, marginRight: 1.2 }} />{" "}
                        {userProfile.data.email} <br />
                        <LocalPhoneIcon
                          sx={{ fontSize: 18, marginRight: 1.5 }}
                        />
                        {userProfile.data.contact}
                      </Box>
                    }
                  ></CardHeader>

                  <CardContent
                    sx={{
                      paddingTop: {
                        xs: 0.4,
                        md: 0.6,
                      },
                      fontSize: {
                        xs: 14,
                        md: 16,
                        lg: 18,
                      },
                      alignItems: "center",
                      fontWeight: 500,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3} md={3}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            sx={{
                              color: green[500],
                              paddingRight: 0.4,
                              margin: 0,
                            }}
                          >
                            {userProfile.data.status === "true" ? (
                              <FiberManualRecordIcon
                                sx={{ fontSize: 16, color: "green" }}
                              />
                            ) : (
                              <FiberManualRecordIcon
                                sx={{ fontSize: 16, color: "red" }}
                              />
                            )}
                          </IconButton>
                          <Typography variant="p">
                            {userProfile.data.status === "true"
                              ? "Active"
                              : "Offline"}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            sx={{
                              color: grey[500],
                              paddingRight: 0.4,
                              margin: 0,
                            }}
                          >
                            <PersonIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          Intern
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3} md={3}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              height: 0,
                              fontSize: {
                                xs: 9,
                                md: 12,
                              },
                              padding: {
                                xs: 2,
                                md: 2,
                              },
                            }}
                          >
                            Framework Engineer
                          </Button>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sm={3}
                        md={3}
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: {
                              xs: "60%",
                              sm: "100%",
                            },
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="p">Project Released</Typography>
                          <IconButton
                            sx={{
                              color: red[500],
                              paddingLeft: 0.4,
                              margin: 0,
                            }}
                          >
                            {userProfile.data.released === "true" ? (
                              <CheckCircleIcon
                                sx={{ fontSize: 20, color: "green" }}
                              />
                            ) : (
                              <CancelIcon sx={{ fontSize: 20 }} />
                            )}
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "block",
                padding: 2,
                fontSize: 14,
                fontWeight: 500,
                textAlign: "left",
                marginTop: "20px",
              }}
            >
              {/* Showing Mentors Information  */}

              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {" "}
                {`Showing ${userProfile.data.assignedMentors.length} Mentors`}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {userProfile.data.assignedMentors.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                  <Card style={{ padding: "10px" }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: red[500],
                            width: {
                              xs: 40,
                              md: 50,
                              lg: 60,
                            },
                            height: { xs: 40, md: 50, lg: 60 },
                          }}
                          aria-label="recipe"
                        ></Avatar>
                      }
                      title={
                        <Box sx={{ fontSize: 18, textAlign: "left" }}>
                          {item.name}
                        </Box>
                      }
                      subheader={
                        <Box
                          sx={{
                            lineHeight: 2,
                            textAlign: "left",
                            fontSize: {
                              xs: 14,
                              md: 16,
                              lg: 18,
                            },
                          }}
                        >
                          <EmailIcon sx={{ fontSize: 18 }} /> {item.email}
                        </Box>
                      }
                      sx={{
                        paddingBottom: 0,
                        paddingTop: 0.7,
                        marginBottom: 0,
                      }}
                    ></CardHeader>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default SingleReport;
