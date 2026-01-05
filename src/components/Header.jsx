import React from 'react';
import styles from './Header.module.css';
import sallyPng from '../assets/sally.png';

const Header = () => (
  <header className={styles.header}>
    <img src={sallyPng} alt="Artist header image" className={styles.header__hero} />
    <div>
      <div className={styles.header__title}>Sally Hill</div>
      <div className={styles.header__subtitle}>Visual Art / Music / Code</div>
    </div>
  </header>
);

export default Header;