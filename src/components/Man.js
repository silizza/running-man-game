import React, { useEffect, useContext } from 'react';
import wall from '../imgs/wall.png';
import runs from '../imgs/run.png';
import {ManContext} from '../context/manContext';

export default function Man() { 

  const {action, duration, position, run, stay, move, speed} = useContext(ManContext);
  let timer;

  useEffect(() => {   

    document.addEventListener ('keydown', run);
    document.addEventListener ('keyup', stay);  

    let timerId;
    if (action == 'run') {
      timerId = setInterval(move, speed)
    }

    return () => {
      clearInterval(timerId);
      document.removeEventListener('keydown', run);
      document.removeEventListener('keyup', stay);
    };
  })
  
  return(
    <div className={`man-container ${action}`} style={{left: `${position}rem`}}>
      <img className={`man ${action} ${duration}`} src={(action == 'push') ? wall : runs} />
      
    </div>
  )
}