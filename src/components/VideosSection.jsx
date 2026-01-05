import React from 'react';
import { randomLavenderTone, youtubeIdFromUrl } from '../lib/utils.js';
import styles from './VideosSection.module.css';
import morePng from '../assets/more.png';
import Card from './ui/Card.jsx';
import Button from './ui/Button.jsx';

const VideosSection = () => {
  const performanceLinks = [
    'https://youtu.be/RKyeNk_rl8U',
    'https://youtu.be/bCYxJ8YOZxo',
    'https://youtu.be/s03HJxvLNkM'
  ];
  const [videoId, setVideoId] = React.useState('');
  const embedRef = React.useRef(null);

  React.useEffect(() => {
    const el = embedRef.current;
    if (!el) return;
    if (!videoId) { el.style.height = '0px'; el.style.opacity = '0'; el.innerHTML = ''; return; }
    const w = el.clientWidth || el.getBoundingClientRect().width;
    const targetH = Math.round((9/16) * w);
    el.style.height = `${targetH}px`;
    el.style.opacity = '1';
    el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  }, [videoId]);

  return (
    <div className={styles.videos} aria-labelledby="videos-title">
      <img src={morePng} alt="More performances" className={styles.videos__image} />
      <header className={styles.videos__header}><h2 id="videos-title">Old Performance Videos</h2></header>
      <Card padding={16}>
        <div className={styles.videos__grid} aria-label="Performance videos grid">
          {performanceLinks.map((url, idx) => {
            const id = youtubeIdFromUrl(url);
            return (
              <div key={idx} className={styles.videos__tile} style={{ background: randomLavenderTone() }} onClick={() => setVideoId(id)}>
                <div className={styles.videos__tileInner}><div className={styles.videos__label}>{id ? `Video ${id.slice(0,6)}` : 'Video'}</div></div>
              </div>
            );
          })}
        </div>
        <div ref={embedRef} className={`${styles.videos__frame} ${styles['videos__frame--16x9']} ${styles.videos__embed}`} style={{ marginTop: 12 }} />
        <div className={`${styles.videos__controls} ${videoId ? styles['videos__controls--open'] : ''}`} aria-label="Video controls">
          <Button onClick={() => setVideoId('')}>Close video</Button>
        </div>
        <p className={styles.videos__subtitle} style={{ marginTop: 12 }}>Click a square to open the video below.</p>
      </Card>
    </div>
  );
};

export default VideosSection;