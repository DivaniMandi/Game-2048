import React from 'react';
import Game from './components/Game';
import './App.css';


const App = () => {
  return (
    <div className="App">
    <h1>Game 2048</h1>
    <h2>How to play:</h2>
    <p>Slide numbered tiles on the grid using arrow keys or buttons to combine them to create a tile with the number 2048.</p>
    <Game/>
    </div>
  );
};
export default App;
