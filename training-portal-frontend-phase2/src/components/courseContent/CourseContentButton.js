import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function CourseContentButton(props)
{ 
    return (<Button variant="outlined"  fullWidth  > <Link to={props.viewCourseLink} style={{textDecoration:"none"  , color:'inherit' }}>View Course </Link></Button>);
}