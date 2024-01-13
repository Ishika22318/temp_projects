import * as React from 'react';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {Link} from 'react-router-dom';



export default function CourseContentAssessment(props)
{
    return (

<Link to={props.assessmentLink} style={{textDecoration:"none"  , color:'inherit'}}> 

        <Box mt={4}>
        <Card >
        <CardContent>
           <div style={{color:'#0D4896' , display:'flex' , alignItems:'center'}}>
              <MenuBookIcon/>
              <Typography variant="h5" component="div"  style={{ marginLeft:10}}>
                Assessment
              </Typography>
          </div>
          <Typography sx={{ fontSize: 14 , mt:2 }} color="text.secondary" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </CardContent>
      </Card>
     </Box>


</Link>


    );
}