import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Overviewsection = (props) => {
  return (
        <Card className={props.classname}>
            <CardContent >
              <Typography variant='h4'>{props.progress} of {props.outOff}</Typography>
              <Typography variant='h5'>{props.cardHeading}</Typography>
              <Typography variant='p' style={{color:'grey'}}>{props.cardText}</Typography>
            </CardContent>
        
        </Card>

  );
};

export default Overviewsection;
