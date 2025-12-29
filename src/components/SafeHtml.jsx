import React from 'react'

const renderSafeHtml = (html) => {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html || '', 'text/html')
    const allowed = new Set(['p','a','em','strong','h1','h2','h3','h4','h5','h6','ul','ol','li','img','blockquote','pre','code','br','span'])
    const isSafeUrl = (url) => {
      try {
        const u = new URL(url, window.location.origin)
        return u.protocol === 'http:' || u.protocol === 'https:'
      } catch { return false }
    }
    const walk = (node, key) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent
      if (node.nodeType !== Node.ELEMENT_NODE) return null
      const tag = node.tagName.toLowerCase()
      if (!allowed.has(tag)) return null
      const children = Array.from(node.childNodes).map((n, i) => walk(n, `${key}-${i}`)).filter(Boolean)
      const props = { key }
      if (tag === 'a') {
        const href = node.getAttribute('href') || ''
        if (isSafeUrl(href)) {
          props.href = href
          props.target = '_blank'
          props.rel = 'noopener noreferrer'
        }
      } else if (tag === 'img') {
        const src = node.getAttribute('src') || ''
        if (isSafeUrl(src)) {
          props.src = src
          const alt = node.getAttribute('alt') || ''
          if (alt) props.alt = alt
        } else {
          return null
        }
      }
      return React.createElement(tag, props, children.length ? children : undefined)
    }
    return Array.from(doc.body.childNodes).map((n, i) => walk(n, `n-${i}`)).filter(Boolean)
  } catch {
    return null
  }
}

const SafeHtml = ({ html, as: Tag = 'div', className, ...rest }) => {
  const content = renderSafeHtml(html)
  return <Tag className={className} {...rest}>{content}</Tag>
}

export default SafeHtml
