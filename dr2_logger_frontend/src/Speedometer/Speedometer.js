import React from 'react';
import GaugeComponent from 'react-gauge-component';

function Speedometer({ speed }) {
  return (
    <GaugeComponent
      type="radial"
      style={{ width: '100%' }}
      arc={{
        gradient: true,
        subArcs: [
          {
            limit: 0,
            color: '#5BE12C',
            showTick: true
          },
          {
            limit: 50,
            color: '#F5CD19',
            showTick: true
          },
          {
            limit: 100,
            color: '#F58B19',
            showTick: true
          },
          {
            limit: 150,
            color: '#EA4228',
            showTick: true
          },
          {
            limit: 200,
            color: '#0A0A0A',
            showTick: true
          }
        ]
      }}
      minValue={0}
      maxValue={200}
      value={speed}
      pointer={{ elastic: true }}
    />
  );
}

export default Speedometer;
