import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Mytimetable = (props) => {
    return ( 
        <>
        {props.todayTT.length > 0 ? 
        <>
        {props.todayTT.map((item,index)=>{
           return   <Card key={index} className='col-12 mt-2' >
                        <div className='row justify-content-center'>
                        <CardContent className='col-11  pl-2'>
                            <h5 style={{color:'#12599c'}}>{item.title}</h5>
                            <p style={{color:'grey'}}>{item.label}<br/>{item.timeline}</p>
                        </CardContent>
                        </div>
                    </Card> 
        })}
        </>
        :
        <>
            <Card className='col-12 mt-2' >
                <div className='row justify-content-center'>
                    <CardContent className='col-11  pl-2'>
                        <h5 style={{color:'grey'}}>No scheduled events.</h5>
                    </CardContent>
                </div>
            </Card> 
        
        </>
        }
                    
        </>
     );
}
 
export default Mytimetable;