import React, {useContext} from 'react';
import {ManContext} from '../context/manContext';
import './statistics.css';
import heart from '../imgs/heart.png';

export default function Statistics() {

  const {score, lifesCount} = useContext(ManContext);

  return (
    <div className="statistics flex-container">
      <div className="flex-container lifes">
        <img src={heart} alt="Lifes"/>
        <span>{lifesCount}</span>
      </div>
      <div className="flex-container">
        <span>Score</span>
        <span>{score}</span>
      </div>
    </div>
  )
}