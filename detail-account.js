(() => {
  'use strict';

  const detail = window.ANIME_DETAIL;
  const wishlist = window.NewAnimeWishlist;
  if (!detail?.id || !wishlist) return;

  const stylesheet = href => {
    const target = new URL(href, location.href);
    if ([...document.querySelectorAll('link[rel="stylesheet"]')].some(node => {
      const url = new URL(node.href, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    })) return;
    const node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = href;
    document.head.appendChild(node);
  };

  const script = src => new Promise((resolve, reject) => {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(node => {
      if (!node.src) return false;
      const url = new URL(node.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (existing) {
      if (window.NewAnimeAuth) return resolve();
      existing.addEventListener('load', resolve, { once:true });
      existing.addEventListener('error', reject, { once:true });
      return;
    }
    const node = document.createElement('script');
    node.src = src;
    node.async = false;
    node.onload = resolve;
    node.onerror = reject;
    document.head.appendChild(node);
  });

  stylesheet('/auth.css?v=20260908-auth2');
  stylesheet('/account-refine.css?v=20260908-authui10');

  const heartSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>';
  const posterWrap = document.querySelector('.detail-poster-wrap');
  let heart = posterWrap?.querySelector('[data-detail-wishlist]') || null;

  if (posterWrap && !heart) {
    heart = document.createElement('button');
    heart.type = 'button';
    heart.className = 'detail-wishlist-toggle';
    heart.dataset.detailWishlist = detail.id;
    heart.innerHTML = heartSvg;
    posterWrap.appendChild(heart);
    heart.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      wishlist.toggle(detail.id);
    });
  }

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };
  const copy = {
    ko:{ add:'위시리스트에 추가', remove:'위시리스트에서 제거' },
    ja:{ add:'ウィッシュリストに追加', remove:'ウィッシュリストから削除' },
    en:{ add:'Add to wishlist', remove:'Remove from wishlist' }
  };

  function renderHeart() {
    if (!heart) return;
    const active = wishlist.has(detail.id);
    const text = copy[language()] || copy.ko;
    heart.classList.toggle('is-active', active);
    heart.setAttribute('aria-pressed', String(active));
    heart.setAttribute('aria-label', active ? text.remove : text.add);
    heart.title = active ? text.remove : text.add;
  }

  document.addEventListener('newanime:wishlist', renderHeart);
  document.addEventListener('newanime:language', renderHeart);
  renderHeart();

  script('/auth.js?v=20260908-auth11')
    .catch(error => console.warn('Shared account UI could not be loaded on detail page.', error));
})();
