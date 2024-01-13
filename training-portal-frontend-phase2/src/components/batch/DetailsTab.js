import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const container = { width: '100%' , 
margin:"14px 0px"  , 
marginTop:"25px" , fontWeight:"400"
}

export default function DetailsTab({selectedCurveLabel , selectedTab , handleSelectedTab}) {

  const labels = selectedCurveLabel=== "Technical Skills Training" ? ["Interns" , "Mentors"] : ["Interns"] ;

  const handleChange = (event, newValue) => {
  handleSelectedTab(newValue);
  };

  return (
    <Box sx={container}>
      <Box >
        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
          {
            labels.map((label , index)=>{
               return <Tab label={label}  />
            })
          }
         
        </Tabs>
      </Box>
    </Box>
  );
}
