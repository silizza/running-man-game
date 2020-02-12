import React, { useState, useEffect } from 'react';
import Man from './Man';
import './game.css';


export default function Game() {

  const [manAction, setManAction] = useState("stay");
  const [manDuration, setManDuration] = useState("right");
  const [manPosition, setManPositon] = useState(0);

  useEffect(() => {
    document.onkeydown = run;
    document.onkeyup = stay;
    return () => {
      document.removeEventListener('onkeydown', run);
    };
  })
  
  const run = event => {
    
    if(event.key == "ArrowRight") {
      setManDuration('right');
      if(manPosition >= 45.5) {
        setManAction('stay');
        return;
      }
        setManAction('run');
        setManPositon(prev => prev + 0.3);
    }

    if(event.key == "ArrowLeft") {
      setManDuration('left');
      if(manPosition <= 0) {
        setManAction('stay');
        return;
      }
      setManAction('run');
      setManPositon(prev => prev - 0.3);
    }
  };

  const stay = event => {
    if(event.key == "ArrowRight" || "ArrowLeft") {
      setManAction('stay');
    }
  };

  return (
    <div 
      className="game-area"
      onKeyDown={run}
      onKeyUp={stay} >
      <Man action={manAction} duration={manDuration} position={manPosition}/>
    </div>
  )
}