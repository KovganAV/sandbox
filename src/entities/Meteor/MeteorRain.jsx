import React, { useEffect, useRef, useState } from 'react';
import Meteor from './Meteor';

const getRandom = (min, max) => Math.random() * (max - min) + min;

const directions = [
  [0, getRandom(0, window.innerHeight), window.innerWidth, getRandom(0, window.innerHeight)],
  [window.innerWidth, getRandom(0, window.innerHeight), 0, getRandom(0, window.innerHeight)],
  [getRandom(0, window.innerWidth), 0, getRandom(0, window.innerWidth), window.innerHeight],
  [getRandom(0, window.innerWidth), window.innerHeight, getRandom(0, window.innerWidth), 0],
];

const MeteorRain = () => {
  const [meteors, setMeteors] = useState([]);
  const meteorId = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const dirIdx = Math.floor(Math.random() * 4);
      const d = directions[dirIdx].map(v => typeof v === 'function' ? v() : v);
      let [startX, startY, endX, endY] = [
        dirIdx === 0 ? 0 : dirIdx === 1 ? window.innerWidth : getRandom(0, window.innerWidth),
        dirIdx === 2 ? 0 : dirIdx === 3 ? window.innerHeight : getRandom(0, window.innerHeight),
        dirIdx === 0 ? window.innerWidth : dirIdx === 1 ? 0 : getRandom(0, window.innerWidth),
        dirIdx === 2 ? window.innerHeight : dirIdx === 3 ? 0 : getRandom(0, window.innerHeight),
      ];
      const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
      const id = meteorId.current++;
      setMeteors(meteors => [
        ...meteors,
        {
          id,
          startX,
          startY,
          endX,
          endY,
          angle,
          created: Date.now(),
        }
      ]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!meteors.length) return;
    const timeout = setTimeout(() => {
      setMeteors(meteors => meteors.filter(m => Date.now() - m.created < 2500));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [meteors]);

  return (
    <div style={{position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10000}}>
      {meteors.map(m => (
        <Meteor
          key={m.id}
          x={m.startX}
          y={m.startY}
          length={getRandom(80, 180)}
          angle={m.angle}
          opacity={0.8}
          style={{
            transition: 'transform 2.2s linear',
            transform: `translate(${m.endX - m.startX}px, ${m.endY - m.startY}px) rotate(${m.angle + 180}deg)`
          }}
        />
      ))}
    </div>
  );
};

export default MeteorRain; 