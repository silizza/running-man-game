import React, { useContext, useState, useEffect } from 'react';
import { ManContext } from '../context/manContext';
import './highScores.css';

export default function HighScores() {

  const {score, lifesCount, onNewGame} = useContext(ManContext);

  const [highScores, setHighScores] = useState ('');
  const [highScoresList, setHighScoresList] = useState('');
  const [smallestScore, setSmallestScore] = useState (0);

  useEffect(() => {
    
    if (localStorage.highScores) {
      updateHighScores();
    }

  }, []);

  useEffect(() => {
    
    if (lifesCount == 0) {
      console.log('lifescount is 0. highscores');
      addHighScore();
    }
    
  }, [lifesCount])
  
  const updateHighScores = () => {
    let scores = localStorage.highScores.split(',');

    let listOfScores = scores.map(score => {
      let arr = score.split('_');
      return (<div key={scores.indexOf(score)} className="flex-container">
        <span>{arr[1]}</span>
        <span>{arr[0]}</span>
      </div>)
    })

    setHighScoresList(listOfScores);

    let smallest = (scores.length < 10) ? 0 : parseInt(scores[scores.length - 1]);
    setHighScores(localStorage.highScores);
    setSmallestScore(smallest); 
  }

  const addHighScore = () => {
    if (score < smallestScore) {
      alert(`Game over! Your score:${score}`);
      onNewGame();
      return;
    }

    let scores = highScores ? highScores.split(',') : [];
    const name = prompt('Congratulations! You have a high score! Enter your name: ', '');
    scores.push(`${score}_${name}`);

    scores.sort((score1, score2) => parseInt(score2) - parseInt(score1));

    if (scores.length > 10) {
      scores.pop();
    }

    const scoresStr = scores.join(',');

    localStorage.setItem('highScores', scoresStr);

    updateHighScores();
    onNewGame();
  }

  return (
    <div className="high-scores">
      <h2>High Scores</h2>
      {highScoresList}
    </div>
  )
}