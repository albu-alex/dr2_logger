import React from 'react';
import GaugeComponent from 'react-gauge-component';

function Revometer({ rpm }) {
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
            limit: 3333,
            color: '#F5CD19',
            showTick: true
          },
          {
            limit: 6666,
            color: '#F58B19',
            showTick: true
          },
          {
            limit: 10000,
            color: '#EA4228',
            showTick: true
          }
        ]
      }}
      minValue={0}
      maxValue={10000}
      value={rpm}
      pointer={{ elastic: true }}
    />
  );
}

export default Revometer;
