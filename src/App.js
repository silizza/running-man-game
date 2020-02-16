import React from 'react';
import Game from './components/Game';
import ManState from './context/ManState';

function App() {
  
  return (
    <div className="App">
      <ManState>
        <Game />        
      </ManState>
    </div>
  );
}

export default App;
