import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>Галактика</div>
      <nav className={styles.right}>
        <a href="#main" className={styles.link}>Главная</a>
        <a href="#about" className={styles.link}>О галактике</a>
        <a href="#planets" className={styles.link}>Планеты</a>
        <a href="#spacecraft-history" className={styles.link}>Покорение космоса</a>
        <a href="#spacecraft" className={styles.link}>Вояджер-1</a>
      </nav>
    </header>
  );
};

export default Header; 