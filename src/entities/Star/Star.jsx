import React, { useState } from 'react';
import styles from './Star.module.css';

const Star = ({ size, color, onClick, angle }) => {
  const [hovered, setHovered] = useState(false);
  const starColor = hovered ? '#ff9900' : color;
  const selfRotation = {
    transform: `translate(-50%, -50%) rotate(${angle * 1.5}deg)`
  };

  return (
    <div
      className={styles.star}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 60% 40%, ${starColor} 70%, #fffbe6 100%)`,
        boxShadow: `0 0 60px 30px ${starColor}99, 0 0 120px 60px ${starColor}33`,
        position: 'absolute',
        left: '50%',
        top: '50%',
        cursor: 'pointer',
        zIndex: 3,
        transition: 'background 1.2s, box-shadow 1.2s',
        transform: `translate(-50%, -50%) rotate(${angle * 1.5}deg)`
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Солнце"
    >
      <div
        className={styles.sunPattern}
        style={{ transform: `translate(-50%, -50%) rotate(${angle * 2.5}deg)` }}
      />
    </div>
  );
};

export default Star; 