import React from 'react';
import { TUMBLR_API_KEY, TUMBLR_BLOG_HOSTNAME, TUMBLR_LIMIT } from '../lib/config.js';
import { stripHtml } from '../lib/utils.js';

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
    <div className="embed" aria-labelledby="tumblr-title">
      <header><h2 id="tumblr-title">Visuals</h2></header>
      <div className="card" style={{ border: 'none', borderRadius: 0, padding: 0 }}>
        {loading && <div className="subtitle" style={{ padding: 16 }}>Loading Tumblr posts…</div>}
        {error && <div className="subtitle" style={{ padding: 16 }}>{error}</div>}
        {!loading && !error && (
          <div id="tumblr-feed" className="tumblr-grid">
            {items.map((item, i) => (
              <article key={i} className="card" style={{ padding: 0 }}>
                <a href={item.postUrl} target="_blank" rel="noopener noreferrer" onClick={(ev) => { ev.preventDefault(); setModal({ open: true, img: item.imageUrl, url: item.postUrl, title: item.title }); }}>
                  <img src={item.imageUrl} alt="Tumblr post" />
                </a>
              </article>
            ))}
          </div>
        )}
      </div>

      {modal.open && (
        <div className="modal-backdrop open" onClick={(e) => { if (e.target.classList.contains('modal-backdrop')) setModal({ open: false, img: '', url: '', title: '' }); }}>
          <div className="modal">
            <header>
              <div>{modal.title}</div>
            </header>
            <div className="content">
              <img src={modal.img} alt="Image preview" />
            </div>
            <footer>
              <button className="button" type="button" onClick={() => window.open(modal.url, '_blank', 'noopener,noreferrer')}>View post</button>
              <button className="button" type="button" onClick={() => setModal({ open: false, img: '', url: '', title: '' })}>Close</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default TumblrVisuals;