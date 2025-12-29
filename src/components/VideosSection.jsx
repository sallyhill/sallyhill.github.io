import React from 'react';
import { randomLavenderTone, youtubeIdFromUrl } from '../lib/utils.js';

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
    <div className="embed" aria-labelledby="videos-title">
      <img src="assets/more.png" alt="More performances" className="block-image" />
      <header><h2 id="videos-title">Old Performance Videos</h2></header>
      <div className="card" style={{ border: 'none', borderRadius: 0, padding: 16 }}>
        <div className="video-grid" aria-label="Performance videos grid">
          {performanceLinks.map((url, idx) => {
            const id = youtubeIdFromUrl(url);
            return (
              <div key={idx} className="v-square" style={{ background: randomLavenderTone() }} onClick={() => setVideoId(id)}>
                <div className="inner"><div className="label">{id ? `Video ${id.slice(0,6)}` : 'Video'}</div></div>
              </div>
            );
          })}
        </div>
        <div ref={embedRef} id="video-embed" className="frame r16x9" style={{ marginTop: 12, overflow: 'hidden', height: 0, opacity: 0, transition: 'height 240ms ease, opacity 240ms ease' }} />
        {videoId && (
          <div id="video-controls" className="open" aria-label="Video controls"><button className="button" type="button" onClick={() => setVideoId('')}>Close video</button></div>
        )}
        <p className="subtitle" style={{ marginTop: 12 }}>Click a square to open the video below.</p>
      </div>
    </div>
  );
};

export default VideosSection;