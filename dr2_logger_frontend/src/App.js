import React, { useState, useEffect } from 'react';
import './App.css';
import Speedometer from './Speedometer/Speedometer';
import Revometer from './Revometer/Revometer';

function App() {
  const [telemetryData, setTelemetryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTelemetryData();
    const interval = setInterval(fetchTelemetryData, 50);
    return () => clearInterval(interval); 
  }, []);

  const fetchTelemetryData = () => {
    fetch('http://localhost:5000/api/game-state')
      .then(async response => {
        if (!response.ok) {
          throw new Error('Failed to fetch telemetry data');
        }
        const jsonData = await response.json();
        setTelemetryData(jsonData);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="App">
      <div className="App-content">
        {error ? (
          <p>Error: {error}</p>
        ) : telemetryData ? (
          <div>
            <h2>Car Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Speedometer speed={telemetryData.Speed.split(' ')[0] * 3.6} />
              <Revometer rpm={telemetryData.RPM} />
            </div>
          </div>
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </div>
  );
}

export default App;
