import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useState } from 'react';

function RoleMenuDropdown({selectedRoleDropdown,setSelectedRoleDropdown,roles}) { 
  return (
    <div className='roles-dropdown-class'style={{marginLeft:'20px'}}>
        <Select className= "roles-dropdown-menu" value={selectedRoleDropdown} onChange={(e)=>setSelectedRoleDropdown(e.target.value)} style={{height:'40px'}}>
          <MenuItem value="all">
            All Roles
          </MenuItem>
          {
            roles.map((role,index) => (
              <MenuItem value={role} key={index}>
                {role}
              </MenuItem>
            ))
          }
        </Select>
    </div>
  );
}

export default RoleMenuDropdown;
