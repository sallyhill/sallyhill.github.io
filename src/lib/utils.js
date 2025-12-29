export const randomLavenderTone = () => {
  const h = 260 + Math.random() * 30;
  const s = 35 + Math.random() * 30;
  const l = 70 + Math.random() * 20;
  return `hsl(${h.toFixed(0)} ${s.toFixed(0)}% ${l.toFixed(0)}%)`;
};

export const stripHtml = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  return (tmp.textContent || tmp.innerText || '').trim();
};

export const youtubeIdFromUrl = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/watch')) return u.searchParams.get('v') || '';
      const parts = u.pathname.split('/').filter(Boolean);
      return parts.includes('embed') || parts.includes('shorts') ? parts.pop() : '';
    }
  } catch { }
  return '';
};