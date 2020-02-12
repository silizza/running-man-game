import React, { useState } from 'react';
import stay from '../imgs/stay.png';
import run from '../imgs/run.png';

export default function Man({action, duration, position}) { 
  
  return(
    <div className={`man-container ${action}`} style={{left: `${position}rem`}}>
      <img className={`man ${action} ${duration}`} src={run} />
      
    </div>
  )
}