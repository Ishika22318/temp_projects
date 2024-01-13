import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';

function MenuDropdown({
  mentorData,
  selectedMentor, 
  handleMentorChange,
}) {
  
  return (
    <div >
        <Select value={selectedMentor === null ? "Select" : selectedMentor} onChange={handleMentorChange}  size="small">
          {
            mentorData.map((mentor,index) => (
              <MenuItem key={index} value={mentor} sx={{marginBottom:'10px'}}>
                <div style={{display:'flex',alignItems:'center',width:'200px',height:'25px',padding:'0px 5px 0px 5px'}}> 
                  <img src={mentor.image} style={{width:'30px',height:'30px',objectFit:'cover',borderRadius:'100%'}}/>
                  <Typography variant="caption" display="block" gutterBottom sx={{fontSize: '1rem',paddingTop:'5px',paddingLeft:'10px'}}>
                                          {mentor.name}
                  </Typography>
                </div>
              </MenuItem>
            ))
          }

        </Select>
    </div>
  );
}

export default MenuDropdown;
