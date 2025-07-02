import React, { useState } from 'react';
import styles from './GalaxyWidget.module.css';
import { sun, planets, satellites } from '../../shared/const/planets';
import Planet from '../../entities/Planet/Planet';
import Star from '../../entities/Star/Star';
import Satellite from '../../entities/Satellite/Satellite';
import SpaceDust from '../../entities/SpaceDust/SpaceDust';
import Meteor from '../../entities/Meteor/Meteor';

const DUST_COUNT = 80;
const METEOR_MIN = 1;
const METEOR_MAX = 5;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getMeteorStartEnd() {
  const side = Math.floor(Math.random() * 4);
  let x, y, angle;
  if (side === 0) {
    x = -120;
    y = getRandom(0, window.innerHeight);
    angle = getRandom(-30, 30);
  } else if (side === 1) { 
    x = window.innerWidth + 120;
    y = getRandom(0, window.innerHeight);
    angle = getRandom(150, 210);
  } else if (side === 2) { 
    x = getRandom(0, window.innerWidth);
    y = -60;
    angle = getRandom(60, 120);
  } else { 
    x = getRandom(0, window.innerWidth);
    y = window.innerHeight + 60;
    angle = getRandom(-120, -60);
  }
  return { x, y, angle };
}

function createMeteor() {
  const { x, y, angle } = getMeteorStartEnd();
  return {
    x,
    y,
    length: getRandom(60, 120),
    angle,
    opacity: getRandom(0.3, 0.7),
    speed: getRandom(2, 4),
    startX: x,
    startY: y,
    direction: angle,
    born: Date.now() + Math.random() * 1000 
  };
}

const GalaxyWidget = () => {
  const [info, setInfo] = useState(null);
  const [time, setTime] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [dust] = useState(() =>
    Array.from({ length: DUST_COUNT }, () => ({
      x: getRandom(0, window.innerWidth),
      y: getRandom(0, window.innerHeight),
      size: getRandom(1, 3),
      opacity: getRandom(0.15, 0.5),
      speed: getRandom(0.05, 0.2),
      angle: getRandom(0, 2 * Math.PI)
    }))
  );
  const [meteors, setMeteors] = useState([]);
  const meteorTimer = React.useRef();

  React.useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 0.02 * animationSpeed), 16);
    return () => clearInterval(interval);
  }, [animationSpeed]);

  React.useEffect(() => {
    meteorTimer.current = setInterval(() => {
      setMeteors(prev => [
        ...prev,
        ...Array.from({ length: Math.floor(getRandom(METEOR_MIN, METEOR_MAX + 1)) }, createMeteor)
      ]);
    }, 2000);
    return () => clearInterval(meteorTimer.current);
  }, []);

  React.useEffect(() => {
    setMeteors(prev => prev.filter(m => {
      const dist = time * m.speed * 80;
      const rad = m.angle * Math.PI / 180;
      const x = m.startX + Math.cos(rad) * dist;
      const y = m.startY + Math.sin(rad) * dist;
      return !(
        x < -200 || x > window.innerWidth + 200 ||
        y < -120 || y > window.innerHeight + 120
      );
    }));
  }, [time]);

  const handlePlanetClick = (planet) => {
    setInfo(prev => (prev && prev.name === planet.name ? null : planet));
  };

  const handleStarClick = () => {
    setInfo(prev => (prev && prev.name === sun.name ? null : sun));
  };

  const handleSatelliteClick = (sat) => {
    setInfo(prev => (prev && prev.name === sat.name ? null : sat));
  };

  const animatedDust = dust.map((d, i) => {
    const angle = d.angle + time * d.speed * 0.2;
    const radius = 0.45 * Math.min(window.innerWidth, window.innerHeight) + 60;
    const x = window.innerWidth / 2 + Math.cos(angle) * radius;
    const y = window.innerHeight / 2 + Math.sin(angle) * radius;
    return (
      <SpaceDust
        key={i}
        x={x}
        y={y}
        size={d.size}
        opacity={d.opacity}
        onClick={() => setInfo({
          name: 'Космическая пыль',
          description: 'Космическая пыль — это мельчайшие частицы вещества, рассеянные в межпланетном и межзвёздном пространстве. Они состоят из силикатов, углерода, льда и других элементов. Пыль играет важную роль в формировании звёзд и планет, а также влияет на светимость и цвет звёзд. Частицы пыли могут быть размером от долей микрона до нескольких микрометров. В космосе пыль образует туманности и придаёт галактикам загадочный вид.'
        })}
      />
    );
  });

  const animatedMeteors = meteors.map((m, i) => {
    const dist = time * m.speed * 80;
    const rad = m.angle * Math.PI / 180;
    const x = m.startX + Math.cos(rad) * dist;
    const y = m.startY + Math.sin(rad) * dist;
    return (
      <Meteor
        key={m.born}
        x={x}
        y={y}
        length={m.length}
        angle={m.angle}
        opacity={m.opacity}
        onClick={() => setInfo({
          name: 'Метеорит',
          description: 'Метеориты — это небольшие твёрдые тела, которые входят в атмосферу планеты из космоса. При входе в атмосферу они нагреваются и светятся, образуя яркие полосы на небе — метеоры или "падающие звёзды". Если метеорит не сгорает полностью и достигает поверхности, он может образовать кратер. Метеориты бывают каменными, железными и смешанными, а их возраст может достигать миллиардов лет. Они несут информацию о ранней истории Солнечной системы.'
        })}
      />
    );
  });

  return (
    <div className={styles.galaxy}>
      <div style={{
        position: 'absolute',
        right: 36,
        bottom: 60,
        zIndex: 10,
        background: 'rgba(24,24,24,0.55)',
        border: '1.5px solid #ffe06655',
        borderRadius: 18,
        padding: '10px 18px 12px 18px',
        boxShadow: '0 2px 12px #0006',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 140,
        fontFamily: 'Montserrat, Arial, sans-serif',
        backdropFilter: 'blur(2px)'
      }}>
        <label style={{ color: '#ffe066', marginBottom: 6, fontSize: 13, letterSpacing: 0.5, fontWeight: 500 }}>
          Скорость анимации
        </label>
        <input
          type="range"
          min={0.1}
          max={2}
          step={0.01}
          value={animationSpeed}
          onChange={e => setAnimationSpeed(Number(e.target.value))}
          style={{
            width: 100,
            accentColor: '#ffe066',
            background: 'transparent',
            margin: 0,
            height: 3,
            borderRadius: 2
          }}
        />
        <div style={{ color: '#fff', fontSize: 12, marginTop: 2, letterSpacing: 0.5 }}>
          {animationSpeed.toFixed(2)}x
        </div>
      </div>
      {animatedDust}
      {animatedMeteors}
      {planets.map((planet, i) => {
        if (planet.name === 'Земля') {
          const moon = satellites.find(s => s.name === 'Луна');
          const earthAngle = time * planet.speed * animationSpeed + i;
          const earthX = 0.5 + (planet.orbit * Math.cos(earthAngle)) / window.innerWidth;
          const earthY = 0.5 + (planet.orbit * Math.sin(earthAngle)) / window.innerHeight;
          const moonAngle = time * moon.speed * animationSpeed;
          const moonOrbit = planet.size * 1.2;
          const moonX = Math.cos(moonAngle) * moonOrbit;
          const moonY = Math.sin(moonAngle) * moonOrbit;
          return (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                color={planet.color}
                size={planet.size}
                orbit={planet.orbit}
                angle={earthAngle}
                onClick={() => handlePlanetClick(planet)}
                patternType={planet.patternType}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${planet.orbit * Math.cos(earthAngle) + moonX}px - ${moon.size / 2}px)`,
                  top: `calc(50% + ${planet.orbit * Math.sin(earthAngle) + moonY}px - ${moon.size / 2}px)`
                }}
              >
                <Satellite
                  size={moon.size}
                  color={moon.color}
                  name={moon.name}
                  onClick={() => handleSatelliteClick(moon)}
                />
              </div>
            </React.Fragment>
          );
        }
        if (planet.name === 'Марс') {
          const phobos = satellites.find(s => s.name === 'Фобос');
          const deimos = satellites.find(s => s.name === 'Деймос');
          const marsAngle = time * planet.speed * animationSpeed + i;
          const phobosAngle = time * phobos.speed * animationSpeed;
          const deimosAngle = time * deimos.speed * animationSpeed;
          const phobosOrbit = planet.size * 1.1;
          const deimosOrbit = planet.size * 1.7;
          const phobosX = Math.cos(phobosAngle) * phobosOrbit;
          const phobosY = Math.sin(phobosAngle) * phobosOrbit;
          const deimosX = Math.cos(deimosAngle) * deimosOrbit;
          const deimosY = Math.sin(deimosAngle) * deimosOrbit;
          return (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                color={planet.color}
                size={planet.size}
                orbit={planet.orbit}
                angle={marsAngle}
                onClick={() => handlePlanetClick(planet)}
                patternType={planet.patternType}
              />
              <div
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${planet.orbit * Math.cos(marsAngle) + phobosX}px - ${phobos.size / 2}px)`,
                  top: `calc(50% + ${planet.orbit * Math.sin(marsAngle) + phobosY}px - ${phobos.size / 2}px)`
                }}
              >
                <Satellite
                  size={phobos.size}
                  color={phobos.color}
                  name={phobos.name}
                  onClick={() => handleSatelliteClick(phobos)}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${planet.orbit * Math.cos(marsAngle) + deimosX}px - ${deimos.size / 2}px)`,
                  top: `calc(50% + ${planet.orbit * Math.sin(marsAngle) + deimosY}px - ${deimos.size / 2}px)`
                }}
              >
                <Satellite
                  size={deimos.size}
                  color={deimos.color}
                  name={deimos.name}
                  onClick={() => handleSatelliteClick(deimos)}
                />
              </div>
            </React.Fragment>
          );
        }
        if (planet.name === 'Юпитер') {
          const io = satellites.find(s => s.name === 'Ио');
          const europa = satellites.find(s => s.name === 'Европа');
          const ganymede = satellites.find(s => s.name === 'Ганимед');
          const callisto = satellites.find(s => s.name === 'Каллисто');
          const jupiterAngle = time * planet.speed * animationSpeed + i;
          const moons = [io, europa, ganymede, callisto].filter(Boolean);
          return (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                color={planet.color}
                size={planet.size}
                orbit={planet.orbit}
                angle={jupiterAngle}
                onClick={() => handlePlanetClick(planet)}
                patternType={planet.patternType}
              />
              {moons.map((moon, idx) => {
                const moonAngle = time * moon.speed * animationSpeed + idx * Math.PI / 2;
                const moonOrbit = planet.size * (1.2 + idx * 0.5);
                const moonX = Math.cos(moonAngle) * moonOrbit;
                const moonY = Math.sin(moonAngle) * moonOrbit;
                return (
                  <div
                    key={moon.name}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${planet.orbit * Math.cos(jupiterAngle) + moonX}px - ${moon.size / 2}px)`,
                      top: `calc(50% + ${planet.orbit * Math.sin(jupiterAngle) + moonY}px - ${moon.size / 2}px)`
                    }}
                  >
                    <Satellite
                      size={moon.size}
                      color={moon.color}
                      name={moon.name}
                      onClick={() => handleSatelliteClick(moon)}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        }
        if (planet.name === 'Сатурн') {
          const titan = satellites.find(s => s.name === 'Титан');
          const rhea = satellites.find(s => s.name === 'Рея');
          const saturnAngle = time * planet.speed * animationSpeed + i;
          const moons = [titan, rhea].filter(Boolean);
          return (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                color={planet.color}
                size={planet.size}
                orbit={planet.orbit}
                angle={saturnAngle}
                onClick={() => handlePlanetClick(planet)}
                patternType={planet.patternType}
              />
              {moons.map((moon, idx) => {
                const moonAngle = time * moon.speed * animationSpeed + idx * Math.PI / 2;
                const moonOrbit = planet.size * (1.2 + idx * 0.5);
                const moonX = Math.cos(moonAngle) * moonOrbit;
                const moonY = Math.sin(moonAngle) * moonOrbit;
                return (
                  <div
                    key={moon.name}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${planet.orbit * Math.cos(saturnAngle) + moonX}px - ${moon.size / 2}px)`,
                      top: `calc(50% + ${planet.orbit * Math.sin(saturnAngle) + moonY}px - ${moon.size / 2}px)`
                    }}
                  >
                    <Satellite
                      size={moon.size}
                      color={moon.color}
                      name={moon.name}
                      onClick={() => handleSatelliteClick(moon)}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        }
        if (planet.name === 'Уран') {
          const oberon = satellites.find(s => s.name === 'Оберон');
          const titania = satellites.find(s => s.name === 'Титания');
          const uranusAngle = time * planet.speed * animationSpeed + i;
          const moons = [oberon, titania].filter(Boolean);
          return (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                color={planet.color}
                size={planet.size}
                orbit={planet.orbit}
                angle={uranusAngle}
                onClick={() => handlePlanetClick(planet)}
                patternType={planet.patternType}
              />
              {moons.map((moon, idx) => {
                const moonAngle = time * moon.speed * animationSpeed + idx * Math.PI / 2;
                const moonOrbit = planet.size * (1.2 + idx * 0.5);
                const moonX = Math.cos(moonAngle) * moonOrbit;
                const moonY = Math.sin(moonAngle) * moonOrbit;
                return (
                  <div
                    key={moon.name}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${planet.orbit * Math.cos(uranusAngle) + moonX}px - ${moon.size / 2}px)`,
                      top: `calc(50% + ${planet.orbit * Math.sin(uranusAngle) + moonY}px - ${moon.size / 2}px)`
                    }}
                  >
                    <Satellite
                      size={moon.size}
                      color={moon.color}
                      name={moon.name}
                      onClick={() => handleSatelliteClick(moon)}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        }
        if (planet.name === 'Нептун') {
          const triton = satellites.find(s => s.name === 'Тритон');
          const neptuneAngle = time * planet.speed * animationSpeed + i;
          const moons = [triton].filter(Boolean);
          return (
            <React.Fragment key={planet.name}>
              <Planet
                name={planet.name}
                color={planet.color}
                size={planet.size}
                orbit={planet.orbit}
                angle={neptuneAngle}
                onClick={() => handlePlanetClick(planet)}
                patternType={planet.patternType}
              />
              {moons.map((moon, idx) => {
                const moonAngle = time * moon.speed * animationSpeed + idx * Math.PI / 2;
                const moonOrbit = planet.size * (1.2 + idx * 0.5);
                const moonX = Math.cos(moonAngle) * moonOrbit;
                const moonY = Math.sin(moonAngle) * moonOrbit;
                return (
                  <div
                    key={moon.name}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${planet.orbit * Math.cos(neptuneAngle) + moonX}px - ${moon.size / 2}px)`,
                      top: `calc(50% + ${planet.orbit * Math.sin(neptuneAngle) + moonY}px - ${moon.size / 2}px)`
                    }}
                  >
                    <Satellite
                      size={moon.size}
                      color={moon.color}
                      name={moon.name}
                      onClick={() => handleSatelliteClick(moon)}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        }
        return (
          <Planet
            key={planet.name}
            name={planet.name}
            color={planet.color}
            size={planet.size}
            orbit={planet.orbit}
            angle={time * planet.speed * animationSpeed + i}
            onClick={() => handlePlanetClick(planet)}
            patternType={planet.patternType}
          />
        );
      })}
      <Star
        size={sun.size}
        color={sun.color}
        onClick={handleStarClick}
        angle={time}
      />
      {info && (
        <div className={styles.sideInfoBox}>
          <strong style={{fontSize: '1.3em'}}>{info.name}</strong>
          <div>{info.description}</div>
        </div>
      )}
    </div>
  );
};

export default GalaxyWidget; 