import React from 'react';
import Game from './components/Game';
import ManState from './context/ManState';
import HighScores from './components/HighScores';

function App() {
  
  return (
    <div className="App">
      <ManState>
        <Game />     
        <HighScores />
      </ManState>
    </div>
  );
}

export default App;
