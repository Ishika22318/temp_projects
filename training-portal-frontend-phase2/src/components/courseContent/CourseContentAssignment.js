import * as React from 'react';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DescriptionIcon from '@mui/icons-material/Description';
import CardContent from '@mui/material/CardContent';
import {Link} from 'react-router-dom';

export default function CourseContentAssignment(props)
{
    return (

      <Link to={props.assignmentLink} style={{textDecoration:"none"  , color:'inherit'}}>

        <Box mt={4}>
        <Card >
          <CardContent>
            <div style={{color:'#0D4896' , display:'flex' , alignItems:'center'}}>
              <DescriptionIcon/>
  
              <Typography variant="h5" component="div"  style={{ marginLeft:10}}>
                   Assignment
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