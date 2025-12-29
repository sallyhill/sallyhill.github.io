import React from 'react';
import { randomLavenderTone } from '../lib/utils.js';

const AudioSection = () => {
  const [openIdx, setOpenIdx] = React.useState(-1);
  const s3Links = [
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/154_less.mp3', title: '154 eclat crew' },
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/timebox_switch_bpm.mp3', title: 'timebox_switch' },
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/aconite.mp3', title: 'aconite' },
    { url: 'https://fawm2025.s3.ca-central-1.amazonaws.com/grindhouse_dumb_wavetable_synth_longer.mp3', title: 'tis the night!!' }
  ];
  return (
    <div className="embed" aria-labelledby="audio-title">
      <header><h2 id="audio-title">Audio</h2></header>
      <div className="card" style={{ border: 'none', borderRadius: 0, padding: 16 }}>
        <div className="audio-grid" aria-label="Audio tracks grid">
          {s3Links.map((item, idx) => (
            <div key={idx} className={`square ${openIdx === idx ? 'audio-open' : ''}`} style={{ background: randomLavenderTone() }} onClick={() => setOpenIdx(idx)}>
              {openIdx !== idx && (
                <div className="inner"><div className="label">{item.title || (item.url.split('/').pop() || '').replace(/\.[^/.]+$/, '')}</div></div>
              )}
              {openIdx === idx && (
                <div className="audio-wrap"><audio src={item.url} controls autoPlay preload="none" controlsList="nodownload" /></div>
              )}
            </div>
          ))}
        </div>
        <p className="subtitle" style={{ marginTop: 12 }}>Click a square to play.</p>
      </div>
    </div>
  );
};

export default AudioSection;