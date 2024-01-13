import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import LearningPathCurve from './LearningPathCurve';
import DetailsTab from './DetailsTab';
import { useLocation } from 'react-router-dom';
import * as styles from './BatchDetailsStyles';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as calendar } from './Calendar Icon.svg';
import { useNavigate } from 'react-router-dom';
import { handleError } from "../../utils/handleError";
import { batchDetailsAPI } from '../../services/batchapi';
import GenericTable from "../genericTable/genricTable";
import { INTERNS_DETAILS } from "../../utils/constants";
import { format_date } from '../../utils/batchHelper';
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function BatchDetails() {
  const location = useLocation();
  console.log("Location while testing", location);
  const batchId = location.state ? location.state.id : null;
  const navigate = useNavigate();
  const [batchDetails, setBatchDetails] = useState(null);
  const [st, setStatus] = useState("Created");
  const [selectedCurveIndex, setSelectedCurveIndex] = useState(-1);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [interns, setInterns] = useState([]);
  const [mentors, setMentors] = useState([]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    filterData(e.target.value);
  }
  const handleEditBatch = () => {
    navigate("/editBatch", { state: { id: batchId } });
  }

  const handleSelectedCurveIndex = (selectedIndex) => {
    setSelectedCurveIndex(selectedIndex);
    setSelectedTab(0);
    setSearchValue("");
    setFilteredData(interns);
  }
  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
    setSearchValue("");
    setFilteredData(tab === 0 ? interns : mentors);
  }
  const filterData = (valueToMatch) => {
    let searchedData;
    if (selectedTab === 0) {
      searchedData = interns.filter(intern => intern.name.includes(valueToMatch));
    }
    else {
      searchedData = mentors.filter(mentor => mentor.name.includes(valueToMatch));
    }
    setFilteredData(searchedData);
  }

  const getSingleBatchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }

      const { data, usersJson } = await batchDetailsAPI(batchId);
      console.log("api call successful ");
      setBatchDetails(data.data);
      setStatus(data.data.status);
      const users = usersJson.data;
      users.map((user, index) => {
        if (user.batchId.includes(batchId)) {
          if (user.role === "Intern") {
            interns.push(user);
          }
          else {
            mentors.push(user);
          }
        }
      });
      setFilteredData(interns);
      setIsLoading(false);
    } catch (error) {
      //  to handle error
      handleError(error, navigate)

    }





  }
  useEffect(() => {
    getSingleBatchDetails();

  }, [])

  const customStatus = st === "Created" ? styles.created : st === "Completed" ? styles.completed : st === "Blocked" ? styles.blocked : styles.inProgress;
  const cardBorder = st === "Created" ? styles.createdBorder : st === "Completed" ? styles.completedBorder : st === "Blocked" ? styles.blockedBorder : styles.inProgressBorder;
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
      )
      }



      {
        (!isLoading &&
          batchDetails !== null) ?
          (
            <Box style={{ marginTop: "70px" }}>
              <Grid container sx={styles.headingContainer}>
                <Grid sx={styles.heading}>Batches</Grid>
              </Grid>
              <Box container sx={{ padding: { xs: "8px", md: "16px" } }}>
                <Grid sx={{ ...styles.batchCard, ...cardBorder }}>
                  <Grid sx={styles.batchContainer}>
                    <Typography variant='div'>
                      <Typography variant="span" sx={styles.batchName}>{batchDetails.batch_name}</Typography>

                      <Typography variant="span" sx={{ ...styles.status, ...customStatus }}>{st}</Typography>
                    </Typography>
                    <Typography variant="div" sx={styles.edit} onClick={handleEditBatch}>Edit</Typography>
                  </Grid>

                  <Box sx={styles.date}> <SvgIcon component={calendar} style={{ marginRight: "10px" }} /> {format_date(batchDetails.start_date, 0)} - {format_date(batchDetails.end_date, 1)} </Box>
                  <Box sx={{ maxWidth: { xs: "100%", md: "70%" } }}>
                    <Typography variant='p' sx={styles.description}>
                      {batchDetails.description}
                    </Typography>
                  </Box>
                  <Grid container gap={2} sx={{ margin: "10px 0px" }}>

                    {
                      batchDetails.role.map((singleRole) => {
                        return <Typography variant="div" sx={styles.role} >
                          {singleRole.roleName}
                        </Typography>
                      })
                    }
                  </Grid>
                </Grid>
                <Box sx={{ marginTop: "20px" }}>
                  <Typography variant="div" sx={styles.sectionHeader}>
                    Learning path curve
                  </Typography>
                </Box>

                <Grid container sx={styles.learningPathCurveContainer} >
                  {
                    batchDetails.program.map((pr, index) => {

                      return <LearningPathCurve curveIndex={index} selectedCurveIndex={selectedCurveIndex} handleSelectedCurveIndex={handleSelectedCurveIndex} lastIndex={batchDetails.program.length - 1} programName={pr} />
                    })
                  }
                </Grid>

                <DetailsTab selectedCurveLabel={batchDetails.program[selectedCurveIndex]} selectedTab={selectedTab} handleSelectedTab={handleSelectedTab} />

                <TextField
                  value={searchValue}
                  sx={styles.search}
                  id="input-with-icon-textfield"
                  label=""
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  fullWidth
                  placeholder='Search'
                  onChange={handleSearchChange}
                />

                <Typography variant="div" sx={styles.sectionHeader}>
                  Showing {filteredData.length} {selectedTab === 0 ? "interns" : "mentors"}
                </Typography>


                <GenericTable headers={INTERNS_DETAILS} data={filteredData} selectedRows={[]} onRowSelect={() => { }} onViewClick={() => { }} />
                {console.log("FilteredData: ", filteredData)}


              </Box>
            </Box>) : <div></div>
      }


    </div>)
}

export default BatchDetails