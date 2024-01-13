import React from 'react';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"
import {Popover} from "bootstrap";
 
//import "@fullcalendar/core/main.css";
//import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

const Mytrainingcalendar = ({event,setTTViewDate}) => {
    
    //console.log(res)
    const handleDateSelect = (eventInfo)=>{
        setTTViewDate(eventInfo.dateStr)
    }
    return ( 
        <div className='col-12 p-1 p-lg-2 my-calendar-view'>
              
                <FullCalendar                   
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}              
                    // intitalView='dayGridMonth'
                    themeSystem="Simplex"
                    headerToolbar={{
                        left: 'prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'
                       
                      }}
                    events={event}
                    dayMaxEvents={2}
                    selectable={true}
                    dateClick={handleDateSelect}
                   
                    eventDidMount={info=>{
                        return new Popover(info.el,{
                            title:info.event.title,
                            placement:'right',
                            trigger:'hover',
                            customclass:'popoverStyle',
                            content:`<p>${(info.event.start).toLocaleTimeString('en-US',{hour12:true,hour:'numeric',minute:'numeric'})} - ${(info.event.end).toLocaleTimeString('en-US',{hour12:true,hour:'numeric',minute:'numeric'})}</p>`,
                            html:true,
                        })                       
                    }}
                    displayEventTime={false}
                    displayEventEnd="true"
                    eventColor={"#12599c"}
                    
                />
           
        </div>
     );
}
 
export default Mytrainingcalendar;