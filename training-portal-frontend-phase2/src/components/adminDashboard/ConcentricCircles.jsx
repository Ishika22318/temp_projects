import React from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ConcentricCirclesExample = (props) => {
  return (
    <div style={{height:"20vh", width:"20vh", marginTop:'-15px'}} className="concentric-container">
      <CircularProgressbarWithChildren
        value={props.progress/props.total*100}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: '#FFB700',
          trailColor: '#eee'
        })}
      >
        <div style={{ width: '64%' }}>
          <CircularProgressbarWithChildren
            value={props.completed/props.total*100}
            strokeWidth={8}
            styles={buildStyles({
              pathColor: '#0D4896',
              trailColor: '#eee'
            })}
          >
            <div style={{ width: '48%' }}>
              <CircularProgressbar
                value={props.notStarted/props.total*100}
                strokeWidth={16}
                styles={buildStyles({
                  pathColor: '#D41717',
                  trailColor: '#eee'
                })}
              />
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ConcentricCirclesExample;
