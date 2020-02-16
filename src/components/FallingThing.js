import React, {useState, useEffect, useContext} from 'react';
import stone from '../imgs/stone.png';
import heart from '../imgs/heart.png';
import acceleration from '../imgs/acceleration.png';
import danger from '../imgs/danger.png';
import diamond from '../imgs/diamond.png';
import { ManContext } from '../context/manContext';

export default function FallingThing({left}) {

  const man = useContext(ManContext);

  const types = [
     {
      name: 'heart',
      image: heart,
      chance: [0, 0.05]
    }, {
      name: 'danger',
      image: danger,
      chance: [0.05, 0.1]
    }, {
      name: 'stone',
      image: stone,
      chance: [0.1, 0.58]
    }, {
      name: 'diamond',
      image: diamond,
      chance: [0.58, 0.92]
    }, {
      name: 'acceleration',
      image: acceleration,
      chance: [0.92, 1]
    }
  ];

  const getRandomType = () => {

    let rand = Math.random();

    for (let type of types) {
      if (type.chance[0] < rand && type.chance[1] > rand) {
        return type;
      }
    }
  }

  const [topPosition, setTopPosition] = useState(-4);
  const [type, setType] = useState(getRandomType());
  const [isHidden, setIsHidden] = useState(false);

  
  useEffect(() => {

    if (topPosition >= 23.5) {
      
      if (man.checkIfHit(left, type.name)) {
        upDateFalling();
      };
    }
    
    const timerId = setInterval(fall, man.fallingSpeed);
    return () => {
      clearInterval (timerId);
    };
  }, [topPosition])

  const fall = () => {
    
    if (topPosition >= 29) {
        upDateFalling();
    } else {
      setTopPosition(prev => prev + 1);
    }
  }

  const upDateFalling = () => {
    setIsHidden(true);
      setType(getRandomType());
      setTopPosition (-4);   
      setTimeout(() => setIsHidden(false), 200) 
  }

  return (
    <div className="falling-thing"
          hidden={isHidden}
          style={{left: `${left}rem`, top: `${topPosition}rem` }}
    >
      <img src={type.image}></img>
      
    </div>
  )
}