import React, { useEffect, useState } from 'react';
import { Grid, Box, MenuItem, Button, Select } from '@mui/material';
import { batchAPI } from '../../services/batchapi';
import { handleError } from '../../utils/handleError';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  
  const [batchNames, setBatchNames] = useState([]);
 
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllBatchApi();
  }, [])
  
 
  const headingContainer = {
    width: '100%',
    padding: { xs: '8px', md: '16px' },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '65px',
  };

  const heading = {
    fontSize: '32px',
    lineHeight: '40px',
    color: '#0D4896',
    fontWeight: '600',
  };

  const fetchAllBatchApi = async () => {
    try{
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.clear();
        navigate("/401");
      }
   const {data} = await batchAPI();
   
   const AllBatchData = data.data.map(batch => {
    return {
      batchName : batch.batch_name,
      batchid : batch.id
    }
   })

   setBatchNames(AllBatchData);
  }    catch (error) {
    //  to handle error

    handleError(error, navigate)

  }
  }


  return (
    <div style={{background: "#F6F6F6"}} >
      <Grid container sx={headingContainer} >
        <Grid sx={heading}>{props.title}</Grid>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Select
            size='small'
            value={props.selectedBatch}
            sx={{
              width: { xs: '100px', md: '200px', lg: '240px' },
              bgcolor: 'white',
              display: props.selectHandleBool ? 'none' : ''
            }}
            onChange={(e)=>{
              props.setSelectedBatch(e.target.value)
            }}
          >
            {/* <MenuItem value={'Jun23 - July23'}>Jun23 - July23</MenuItem>*/}
            <MenuItem value={'All'} selected={true}>All Batch</MenuItem> 
           {batchNames.map((batch) => (
              <MenuItem key={batch.batchid} value={batch.batchid}>
                {batch.batchName}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant='outlined'
            sx={{ ml: 2, color: '#0D4896', textTransform: 'capitalize', p: 1 }}
            onClick={props.downloadHandler}
          
          >
            Download Report
          </Button>
        </Box>
      </Grid>
      <div id='content-to-print'>{props.children}</div>
    </div>

  );
}

export default Header;
