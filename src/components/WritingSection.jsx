import React from 'react'
import { TUMBLR_API_KEY, TUMBLR_WRITING_HOSTNAME } from '../lib/config.js'
import { stripHtml } from '../lib/utils.js'
import SafeHtml from './SafeHtml.jsx'
import styles from './WritingSection.module.css'
import Card from './ui/Card.jsx'
import Button from './ui/Button.jsx'

const firstHeadingText = (html) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html || ''
  const h = tmp.querySelector('h1, h2, h3')
  return h ? (h.textContent || '').trim() : ''
}

const bodyTextWithoutFirstHeading = (html) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html || ''
  const h = tmp.querySelector('h1, h2, h3')
  if (h) h.remove()
  const text = (tmp.textContent || tmp.innerText || '').trim()
  return text
}

const bodyHtmlWithoutFirstHeading = (html) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html || ''
  const h = tmp.querySelector('h1, h2, h3')
  if (h) h.remove()
  return tmp.innerHTML
}

const deriveTitle = (post) => {
  const t = (post?.summary && post.summary.trim())
    || (post?.title && post.title.trim())
    || firstHeadingText(post?.body || '')
    || (stripHtml(post?.body || '').split('\n')[0] || '').trim()
  return t || 'Untitled'
}

const deriveExcerpt = (post, max = 140) => {
  const text = bodyTextWithoutFirstHeading(post?.body || '')
  return text.slice(0, max) + (text.length > max ? '…' : '')
}


const WritingSection = () => {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [reader, setReader] = React.useState({ open: false, post: null })

  React.useEffect(() => {
    (async () => {
      try {
        const url = `https://api.tumblr.com/v2/blog/${encodeURIComponent(TUMBLR_WRITING_HOSTNAME)}/posts/text?api_key=${encodeURIComponent(TUMBLR_API_KEY)}&limit=12`
        const res = await fetch(url, { mode: 'cors' })
        const data = await res.json()
        setPosts((data.response && data.response.posts) || [])
      } catch (e) { setError('Unable to load writing posts.') }
      finally { setLoading(false) }
    })()
  }, [])

  return (
    <div className={styles.writing} aria-labelledby="writing-title">
      <header className={styles.writing__header}><h2 id="writing-title">Writing</h2></header>
      <Card padding={16}>
        {loading && <div className={styles.writing__subtitle}>Loading writing…</div>}
        {error && <div className={styles.writing__subtitle}>{error}</div>}
        {!loading && !error && (
          <div className={styles.writing__grid} aria-label="Writing posts from Tumblr">
            {posts.map((p, idx) => {
              const title = deriveTitle(p).slice(0, 120)
              const excerpt = deriveExcerpt(p)
              return (
                <article key={idx} className={styles.writing__card} onClick={() => setReader({ open: true, post: p })}>
                  <div className={styles.writing__title}>{title || 'Untitled'}</div>
                  <div className={styles.writing__excerpt}>{excerpt}</div>
                </article>
              )
            })}
          </div>
        )}
        <p className={styles.writing__subtitle} style={{ marginTop: 12 }}>Click a card to read in full.</p>
      </Card>

      {reader.open && (
        <div className={styles.writing__backdrop} onClick={(e) => { if ((e.target).classList.contains(styles.writing__backdrop)) setReader({ open: false, post: null }); }}>
          <div className={styles.writing__reader} role="dialog" aria-modal="true" aria-labelledby="reader-title">
            <header className={styles.writing__readerHeader}>
              <h3 className={styles.writing__readerTitle} id="reader-title">{deriveTitle(reader.post).slice(0, 120)}</h3>
              <div className={styles.writing__readerActions}>
                <Button onClick={() => setReader({ open: false, post: null })}>Close</Button>
              </div>
            </header>
            <div className={styles.writing__scroll}>
              <SafeHtml className={styles.writing__content} html={bodyHtmlWithoutFirstHeading(reader.post?.body || '')} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingSection;