import React from 'react';
import { randomLavenderTone } from '../lib/utils.js';
import styles from './AudioSection.module.css';
import Card from './ui/Card.jsx';

const AudioSection = () => {
  const [openIdx, setOpenIdx] = React.useState(-1);
  const s3Links = [
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/154_less.mp3', title: '154 eclat crew' },
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/timebox_switch_bpm.mp3', title: 'timebox_switch' },
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/aconite.mp3', title: 'aconite' },
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/grindhouse_dumb_wavetable_synth_longer.mp3', title: 'tis the night!!' }
  ];
  return (
    <div className={styles.audio} aria-labelledby="audio-title">
      <header className={styles.audio__header}><h2 id="audio-title">Audio</h2></header>
      <Card padding={16}>
        <div className={styles.audio__grid} aria-label="Audio tracks grid">
          {s3Links.map((item, idx) => (
            <div key={idx} className={`${styles.audio__tile} ${openIdx === idx ? styles['audio__tile--open'] : ''}`} style={{ background: randomLavenderTone() }} onClick={() => setOpenIdx(idx)}>
              {openIdx !== idx && (
                <div className={styles.audio__inner}><div className={styles.audio__label}>{item.title || (item.url.split('/').pop() || '').replace(/\.[^/.]+$/, '')}</div></div>
              )}
              {openIdx === idx && (
                <div className={styles.audio__wrap}><audio src={item.url} controls autoPlay preload="none" controlsList="nodownload" /></div>
              )}
            </div>
          ))}
        </div>
        <p className={styles.audio__subtitle} style={{ marginTop: 12 }}>Click a square to play.</p>
      </Card>
    </div>
  );
};

export default AudioSection;