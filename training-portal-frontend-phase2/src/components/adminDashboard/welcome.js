import { Typography } from '@mui/material'
import React from 'react'
import WeeksMenuDropdown from './drop-down-weeks';
import RoleMenuDropdown from './drop-down-role';


const WelcomMessage = (props)=> {
  return (
    <div className='dashboard-welcome-div' style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <div className='dashboard-welcome-message-div'>
            <Typography variant='h4' style={{color:'#0D4896',fontWeight:'bold'}}>Welcome Back, Admin</Typography>
            <Typography variant='captions'>Let's explore the latest update and progress achieved thus far!</Typography>
        </div>
        < div className='dashboard-weeksandrole-dropdown-menu-div'>
            <WeeksMenuDropdown selectedWeeks={props.selectedWeeks} setSelectedWeeks={props.setSelectedWeeks} weeksList={props.dropdownData.weeksList}/>
            <RoleMenuDropdown selectedRoleDropdown={props.selectedRoleDropdown} setSelectedRoleDropdown={props.setSelectedRoleDropdown} roles={props.dropdownData.roles}/>
        </div>
    </div>
  )
}

export default WelcomMessage;