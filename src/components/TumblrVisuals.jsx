import React from 'react';
import { TUMBLR_API_KEY, TUMBLR_BLOG_HOSTNAME, TUMBLR_LIMIT } from '../lib/config.js';
import { stripHtml } from '../lib/utils.js';
import styles from './TumblrVisuals.module.css';
import Card from './ui/Card.jsx';
import Button from './ui/Button.jsx';

const findImgInHtml = (html) => {
  if (!html || typeof html !== 'string') return '';
  const m = html.match(/<img[^>]*src="([^"]+)"/i);
  return m ? m[1] : '';
};

const getPostUrl = (p) => p.post_url || `https://${TUMBLR_BLOG_HOSTNAME}/post/${p.id}`;

const getImageUrl = (p) => {
  let imageUrl = '';
  if (Array.isArray(p.photos) && p.photos.length) {
    const ph = p.photos[0];
    imageUrl = (ph.original_size && ph.original_size.url) || (ph.alt_sizes && ph.alt_sizes[0]?.url) || '';
  }
  if (!imageUrl && p.thumbnail_url) imageUrl = p.thumbnail_url;
  if (!imageUrl && Array.isArray(p.trail)) {
    for (const t of p.trail) {
      const htmlCandidate = typeof t.content === 'string' ? t.content : (t.content_raw || '');
      const found = findImgInHtml(htmlCandidate);
      if (found) { imageUrl = found; break; }
    }
  }
  if (!imageUrl && p.body) imageUrl = findImgInHtml(p.body);
  return imageUrl;
};

const getPostTitle = (p) => {
  const raw = p.title || p.summary || stripHtml((p.caption || p.body) || '').split('\n')[0];
  return (raw || '').slice(0, 80);
};

const TumblrVisuals = () => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [modal, setModal] = React.useState({ open: false, img: '', url: '', title: '' });

  React.useEffect(() => {
    (async () => {
      try {
        const url = `https://api.tumblr.com/v2/blog/${encodeURIComponent(TUMBLR_BLOG_HOSTNAME)}/posts?api_key=${encodeURIComponent(TUMBLR_API_KEY)}&limit=${TUMBLR_LIMIT}`;
        const res = await fetch(url, { mode: 'cors' });
        const data = await res.json();
        setPosts((data.response && data.response.posts) || []);
      } catch (e) {
        setError('Unable to load Tumblr posts.');
      } finally { setLoading(false); }
    })();
  }, []);

  const items = posts
    .map((p) => ({ imageUrl: getImageUrl(p), postUrl: getPostUrl(p), title: getPostTitle(p) }))
    .filter((i) => i.imageUrl);

  return (
    <div className={styles.visuals} aria-labelledby="tumblr-title">
      <header className={styles.visuals__header}><h2 id="tumblr-title">Visuals</h2></header>
      <Card padding={0}>
        {loading && <div className={styles.visuals__subtitle} style={{ padding: 16 }}>Loading Tumblr posts…</div>}
        {error && <div className={styles.visuals__subtitle} style={{ padding: 16 }}>{error}</div>}
        {!loading && !error && (
          <div className={styles.visuals__grid}>
            {items.map((item, i) => (
              <Card as="article" key={i} padding={0} className={styles.visuals__itemCard}>
                <a href={item.postUrl} target="_blank" rel="noopener noreferrer" onClick={(ev) => { ev.preventDefault(); setModal({ open: true, img: item.imageUrl, url: item.postUrl, title: item.title }); }}>
                  <img src={item.imageUrl} alt="Tumblr post" />
                </a>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {modal.open && (
        <div className={styles.visuals__backdrop} onClick={(e) => { if ((e.target).classList.contains(styles.visuals__backdrop)) setModal({ open: false, img: '', url: '', title: '' }); }}>
          <div className={styles.visuals__modal}>
            <header className={styles.visuals__modalHeader}>
              <div>{modal.title}</div>
            </header>
            <div className={styles.visuals__modalContent}>
              <img className={styles.visuals__modalImage} src={modal.img} alt="Image preview" />
            </div>
            <footer className={styles.visuals__modalFooter}>
              <Button onClick={() => window.open(modal.url, '_blank', 'noopener,noreferrer')}>View post</Button>
              <Button onClick={() => setModal({ open: false, img: '', url: '', title: '' })}>Close</Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TumblrVisuals;