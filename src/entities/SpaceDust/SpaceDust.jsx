import React from 'react';
import styles from './SpaceDust.module.css';

const SpaceDust = ({ x, y, size, opacity, onClick }) => {
  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'white',
    opacity,
    pointerEvents: 'auto',
    filter: 'blur(1px)'
  };
  return <div className={styles.dust} style={style} onClick={onClick} title="Космическая пыль" />;
};

export default SpaceDust; 