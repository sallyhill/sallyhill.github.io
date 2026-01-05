import React from 'react';
import styles from './Work.module.css';
import workPng from '../assets/work.png';

const Work = () => (
  <section className={styles.work} aria-labelledby="work-title">
    <img src={workPng} alt="work artwork" className={styles.work__image} />
  </section>
);

export default Work;