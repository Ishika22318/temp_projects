import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';

const WeeksMenuDropdown = ({selectedWeeks,setSelectedWeeks,weeksList}) => {

  return (
    <div  className='week-dropdown-class'>
        <Select value={selectedWeeks} onChange={(e)=>setSelectedWeeks(e.target.value)} style={{ height: '40px' }} >
          <MenuItem value="all">
            All Batches
          </MenuItem>
            {
              weeksList.map((item,index) => (
                <MenuItem value={item[1]} key={index}>
                  {item[0]}
                </MenuItem>
              ))
            }
        </Select>
    </div>
  );
}

export default WeeksMenuDropdown;
