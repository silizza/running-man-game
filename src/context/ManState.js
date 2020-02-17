import React, {useState} from 'react';
import {ManContext} from './manContext';

export default function ManState({children}) {


  
  const [action, setAction] = useState("stay");
  const [duration, setDuration] = useState("right");
  const [position, setPosition] = useState(0.2);  
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(30);
  const [fallingSpeed, setFallingSpeed] = useState(300);
  const [lifesCount, setLifesCount] = useState(10);

  const [dangerTimer, setDangerTimer] = useState(null);
  const [accelerationTimer, setAccelerationTimer] = useState(null);
  
  const run = event => {     

    if(event.repeat) {
       return;
    }

    if(event.key == "ArrowRight") {   
      setDuration('right');
      if (position >= 43) {
        setPosition(44);
        setAction("push");
        return;
      }
      setAction('run');       
    }

    if(event.key == "ArrowLeft") {      
      setDuration('left');
      if (position <= 1) {
        setPosition(0);
        setAction("push");
        return;
      }
      setAction('run');
    }
  };

  const move = () => {
    if (duration == "right") { 
      if (position >= 43) {
        setPosition(44);
        setAction("push");
        return;
      }     
      setPosition(prev => prev + 0.4);
    }

    if (duration == "left") {      
      setPosition(prev => prev - 0.4);
      if (position <= 1) {
        setPosition(0);
        setAction("push");
        return;
      }
    }
  };        

  const stay = event => {
    if(event.key == "ArrowRight" || "ArrowLeft") {
      setAction('stay');
    }
  };
  
  const checkIfHit = (left, type) => {

      if (left > (position - 3) && left < (position + 3)) {        
        hit(type);
        return true;
      }
  }

  const hit = type => {
    
    switch (type) {
      case 'diamond':
        setScore(prev => prev + 1);
        break;
      
      case 'stone':
        if(lifesCount == 1) {
          onGameOver();
        } else {        
          setLifesCount(prev => prev - 1);
        }
        break;

      case 'acceleration':
        setSpeed(10);
        setTimeout(() => {
          setSpeed(30);
        }, 5000);
        break;

      case 'danger':

        if(dangerTimer) {
          clearTimeout(dangerTimer);
        }

        setFallingSpeed(100);
        setDangerTimer(setTimeout(() => {
          setFallingSpeed(300);
          setDangerTimer(null);
        }, 7000));
        
        break;

      case 'heart':
        if (lifesCount < 10) {
          setLifesCount(prev => prev + 1)
        }
        break;
    }
  }

  const onGameOver = () => {
    setAction('stay');
    setPosition(0.2);
    setScore(0);
    setSpeed(30);
    setFallingSpeed(300);
    setLifesCount(10);
    alert(`Game over! Your score: ${score}`);
  }

  return (
    <ManContext.Provider value={{
      action, duration, position, run, stay, move, hit, checkIfHit, speed, fallingSpeed, score, lifesCount
    }}>
      {children}
    </ManContext.Provider>
  )
}