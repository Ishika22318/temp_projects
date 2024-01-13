import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { TabList } from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import Table from "./Table";
import { useParams, useNavigate } from "react-router-dom";
import { refactorAllCoursesData2 } from "../../utils/helpers";
import { courseManagementAPI } from '../../utils/url';
import {checkgetCall} from '../../services/apicall';
import { handleError } from "../../utils/handleError";

export default function Tabs({ tabHeadingsData }) {
  const [loader,setLoader]=useState(null)
  const [tableData, setFetchedData] = useState([]);
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  // refactor the fetched data and use this to update state
  let refactoredData = [];

  const fetchData = async () => {
    try {
      setLoader("loading")
      // get token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/401");
      }
      // refactoring code
      refactoredData = [];
      const data = await checkgetCall(token,courseManagementAPI);
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
      setFetchedData(refactorAllCoursesData2(data));
    } catch (error) {
      // to handle errors
      handleError(error,navigate)
    }
    setLoader(null)
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        {loader==="loading"?
    <div className='loader-class-learning col-12 '>
               <Stack sx={{ color: 'grey.600' }} spacing={3}  className="col-1 mx-auto" style={{marginTop:'30vh'}}>
                <CircularProgress color="inherit" />
              </Stack>
</div> 
    :
    <Box sx={{ width: "100%", typography: "body1" }}>
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList data-testid="tablist"  onChange={handleChange} aria-label="Tab-List">
          {/* labels->(Technical or soft skills) */}
          {tabHeadingsData.map((tabHeading) => {
            return (
              <Tab
                label={tabHeading.label}
                value={tabHeading.value}
                key={tabHeading.value}
              />
            );
          })}
        </TabList>
      </Box>

      {tabHeadingsData.map((tableRow) => {
        // filter records based on technical or soft courses
        const checkData = (row) => {
          return row.label === tableRow.label;
        };
    
        return (
          <TabPanel value={tableRow.value} key={tableRow.value}>
            <Table tableData={tableData.filter(checkData)} />
          </TabPanel>
        );
      })}
    </TabContext>
  </Box>
  }
    </>
  );
}
