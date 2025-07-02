import React from 'react';
import styles from './Meteor.module.css';

const meteorColors = [
  '#fff', '#ffe066', '#aeefff', '#ffb3b3', '#ffd700', '#baffc9', '#b3b3ff'
];

const Meteor = ({ x, y, length, angle, opacity, onClick }) => {
  const color = meteorColors[Math.floor(Math.random() * meteorColors.length)];
  const thickness = Math.random() * 2 + 2;
  const tailLength = length * (0.6 + Math.random() * 0.3);

  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width: length,
    height: thickness,
    opacity,
    transform: `rotate(${angle + 180}deg)`
  };

  return (
    <div className={styles.meteor} style={style} onClick={onClick} title="Метеорит">
      <div
        className={styles.tail}
        style={{
          width: tailLength,
          height: thickness,
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          borderRadius: thickness,
        }}
      />
      <div
        className={styles.core}
        style={{
          width: thickness * 1.5,
          height: thickness * 1.5,
          left: 0,
          top: -thickness * 0.25,
          background: color,
          boxShadow: `0 0 8px 2px ${color}99`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};

export default Meteor; 