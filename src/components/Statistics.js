import React, {useContext} from 'react';
import {ManContext} from '../context/manContext';
import './statistics.css';

export default function Statistics() {

  const {score, lifesCount} = useContext(ManContext);

  return (
    <div className="statistics flex-container">
      <div className="flex-container">
        <span>Lifes</span> 
        <span>{lifesCount}</span>
      </div>
      <div className="flex-container">
        <span>Score</span>
        <span>{score}</span>
      </div>
    </div>
  )
}