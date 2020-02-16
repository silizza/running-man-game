import React, { useState, useEffect, Fragment, useContext } from 'react';
import Man from './Man';
import FallingThing from './FallingThing';
import './game.css'; 
import Statistics from './Statistics';

export default function Game() { 

  let fallingThingsPosition = [];

  for (let i = 0; i < 12; i++) {
     fallingThingsPosition.push(i * 4);
  }  

  //mix array
  fallingThingsPosition.sort(() => Math.random() - 0.5 );
  
  const [fallingThings, setFallingThings] = useState([]); 
  const [positions, setPositions] = useState(fallingThingsPosition);  

  useEffect(() => {
    if (fallingThings.length < 12) {
      const timerID = setInterval(addFallingThing, 2000);
      return () => {
        clearInterval(timerID);
      }
    }
  }, [fallingThings]);

  const addFallingThing = () => {

    let newFallingThings = [...fallingThings];   
    let newPositions = [...positions]
    newFallingThings.push(<FallingThing 
                            key={positions[0]} 
                            left={positions[0]}                
                          />, 
                          <FallingThing 
                            key={positions[1]} 
                            left={positions[1]}               
                          />);
    newPositions.shift();
    newPositions.shift();

    setPositions(newPositions);
    setFallingThings(newFallingThings);
  } 
 
  

  return (
    <div 
      className="game-area">
      <Man/>
      {fallingThings}
      <Statistics />
    </div>
  )
}