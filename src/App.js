import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import PlantList from './Plant';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌱🌻 Welcome to Erin's Oasis 🪴🌺</h1>
          { data ? <div><p>{ data.message }</p></div> : <p>Loading...</p> }   
          <PlantList />
      </header>
    </div>
  );
}

export default App;
