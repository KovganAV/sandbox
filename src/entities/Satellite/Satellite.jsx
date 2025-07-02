import React from 'react';
import styles from './Satellite.module.css';

const Satellite = ({ size, orbit, angle, color = '#ccc', name, onClick }) => {
  const satelliteStyle = {
    width: size,
    height: size,
    background: color,
    borderRadius: '50%',
    position: 'absolute',
    left: `calc(50% + ${orbit * Math.cos(angle)}px - ${size / 2}px)`,
    top: `calc(50% + ${orbit * Math.sin(angle)}px - ${size / 2}px)`,
    boxShadow: '0 0 8px 2px #0005',
    border: '1.5px solid #fff8',
    zIndex: 2
  };
  return <div className={styles.satellite} style={satelliteStyle} title={name} onClick={onClick} />;
};

export default Satellite; 