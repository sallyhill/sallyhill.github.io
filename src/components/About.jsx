import React from 'react'
import styles from './About.module.css'
import noddlesJpg from '../assets/noddles.jpg'
import Card from './ui/Card.jsx'

const About = () => (
  <Card as="section" className={styles.about} aria-labelledby="about-title">
    <h2 id="about-title" className={styles.about__title}>About</h2>
    <div className={styles.about__content}>
      <div className={styles.about__body}>
        <p>
          I'm a visual artist by training, but I'm a coder by trade.<br/>
          I got my start in code with Myspace layouts. These days, I spend an obscene amount of time talking to AI at work.<br/>
          Outside of work, I've been learning music production for a few years. Before, that, I was making rough demos.<br/>
          Sometimes I paint. I write poetry. In the past, I made installation sculptures and did performance art.
        </p>
        <p>I love to learn about:</p>
        <ul className={styles.about__list}>
          <li>Audio Synthesis</li>
          <li>Music composition</li>
          <li>Tarot</li>
          <li>Somatic practices</li>
          <li>The basic electrical components that make up synths</li>
          <li>Generative video and audio</li>
          <li>Ceramics</li>
        </ul>
      </div>
      <img src={noddlesJpg} alt="studio noddles" className={styles.about__image} />
    </div>
  </Card>
)

export default About