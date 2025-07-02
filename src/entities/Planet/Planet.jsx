import React from 'react';
import styles from './Planet.module.css';

const rotationSpeeds = {
  mercury: '1s',
  venus: '1.5s',
  earth: '2s',
  mars: '2.5s',
  jupiter: '3.5s',
  saturn: '4s',
  uranus: '5s',
  neptune: '6s',
};
const rotationSpeedsNum = {
  mercury: 360 / 1,
  venus: 360 / 1.5,
  earth: 360 / 2,
  mars: 360 / 2.5,
  jupiter: 360 / 3.5,
  saturn: 360 / 4,
  uranus: 360 / 5,
  neptune: 360 / 6,
};

const Planet = ({ name, color, size, orbit, angle, onClick, patternType }) => {
  const planetStyle = {
    width: size,
    height: size,
    background: color,
    left: `calc(50% + ${orbit * Math.cos(angle)}px - ${size / 2}px)`,
    top: `calc(50% + ${orbit * Math.sin(angle)}px - ${size / 2}px)`
  };

  const animDuration = parseFloat((rotationSpeeds[patternType] || '3s'));
  const selfRotationAngle = ((angle / (2 * Math.PI)) * 360 * (2 / animDuration)) % 360;
  const shadowAngle = angle * 180 / Math.PI - selfRotationAngle;

  const innerStyle = {
    animationDuration: rotationSpeeds[patternType] || '3s'
  };

  const shadowStyle = {
    transform: `rotate(${shadowAngle}deg)`
  };

  return (
    <div
      className={styles.planet}
      style={planetStyle}
      onClick={onClick}
      title={name}
    >
      <div style={innerStyle} className={styles.planetInner}>
        <div className={styles.planetShadow} style={shadowStyle} />
        {patternType === 'mercury' && <div className={styles.mercuryPattern}></div>}
        {patternType === 'venus' && <div className={styles.venusPattern}></div>}
        {patternType === 'earth' && <><div className={styles.earthOcean}></div><div className={styles.earthCloud}></div></>}
        {patternType === 'mars' && <div className={styles.marsPattern}></div>}
        {patternType === 'jupiter' && <div className={styles.jupiterBands}></div>}
        {patternType === 'saturn' && <><div className={styles.saturnBands}></div><div className={styles.saturnRing}></div></>}
        {patternType === 'uranus' && <div className={styles.uranusPattern}></div>}
        {patternType === 'neptune' && <div className={styles.neptunePattern}></div>}
      </div>
    </div>
  );
};

const DetailedPlanet = ({ name, color, size, angle, patternType, effect }) => {
  const planetStyle = {
    width: size,
    height: size,
    background: color,
    position: 'relative',
    borderRadius: '50%',
    boxShadow: '0 0 30px 10px #0006',
    overflow: 'hidden',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  const innerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'relative',
    animation: 'planet-spin 6s linear infinite',
    animationPlayState: 'running',
    transform: `rotate(${angle}deg)`
  };

  return (
    <div style={planetStyle} title={name}>
      <div style={innerStyle}>
        {patternType === 'mercury' && <><div className={styles.mercuryPattern}></div><div className={styles.pattern1}></div><div className={styles.crater + ' ' + styles.crater1}></div><div className={styles.crater + ' ' + styles.crater2}></div></>}
        {patternType === 'venus' && <><div className={styles.venusPattern}></div><div className={styles.pattern2}></div><div className={styles.venusCloud}></div></>}
        {patternType === 'earth' && <>
          <div className={styles.earthOcean}></div>
          <div className={styles.earthCloud}></div>
          <div className={styles.earthLand}></div>
          <div className={styles.pattern1}></div>
          {effect === 'aurora' && <div className={styles.aurora}></div>}
        </>}
        {patternType === 'mars' && <>
          <div className={styles.marsPattern}></div>
          <div className={styles.pattern2}></div>
          <div className={styles.crater + ' ' + styles.crater1}></div>
          <div className={styles.crater + ' ' + styles.crater3}></div>
          {effect === 'dust' && <div className={styles.dustStorm}></div>}
        </>}
        {patternType === 'jupiter' && <>
          <div className={styles.jupiterBands}></div>
          <div className={styles.pattern1}></div>
          <div className={styles.jupiterSpot + (effect === 'storm' ? ' ' + styles.storm : '')}></div>
        </>}
        {patternType === 'saturn' && <>
          <div className={styles.saturnBands}></div>
          <div className={styles.saturnRing + (effect === 'rings-glow' ? ' ' + styles.ringsGlow : '')}></div>
          <div className={styles.pattern2}></div>
          <div className={styles.saturnBandsExtra}></div>
        </>}
        {patternType === 'uranus' && <><div className={styles.uranusPattern}></div><div className={styles.pattern1}></div><div className={styles.uranusIce}></div></>}
        {patternType === 'neptune' && <><div className={styles.neptunePattern}></div><div className={styles.pattern2}></div><div className={styles.neptuneIce}></div></>}
      </div>
    </div>
  );
};

export default Planet;
export { DetailedPlanet }; 