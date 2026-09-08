(() => {
  'use strict';
  if (!document.querySelector('.archive-shell')) return;

  const script = src => new Promise((resolve, reject) => {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(node => {
      if (!node.src) return false;
      const url = new URL(node.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (existing) {
      if (existing.dataset.loaded === 'true' || existing.readyState === 'complete') return resolve();
      existing.addEventListener('load', resolve, { once:true });
      existing.addEventListener('error', reject, { once:true });
      return;
    }
    const node = document.createElement('script');
    node.src = src;
    node.async = false;
    node.onload = () => { node.dataset.loaded = 'true'; resolve(); };
    node.onerror = reject;
    document.head.appendChild(node);
  });

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

  stylesheet('/wishlist.css?v=20260908-wishlist4');
  stylesheet('/auth.css?v=20260908-auth2');
  stylesheet('/account-refine.css?v=20260908-authui10');
  stylesheet('/google-login-button-fit.css?v=20260908-1');

  Promise.resolve()
    .then(() => Array.isArray(window.animeData) ? null : script('/data/anime.js?v=20260907-schedule1'))
    .then(() => script('/data/anime-20260904.js?v=20260905-data2'))
    .then(() => script('/data/title-fixes-20260905.js?v=20260905-title1'))
    .then(() => script('/data/poster-fixes-20260905.js?v=20260907-posters4'))
    .then(() => script('/data/schedule-updates-20260907.js?v=20260907-schedule2'))
    .then(() => script('/wishlist.js?v=20260908-wishlist3'))
    .then(() => script('/auth-config.js?v=20260908-auth6'))
    .then(() => script('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.115.0'))
    .then(() => script('https://accounts.google.com/gsi/client'))
    .then(() => script('/auth.js?v=20260908-auth10'))
    .then(() => script('/wishlist-sync.js?v=20260908-sync1'))
    .catch(error => console.warn('Archive account / wishlist UI could not be loaded.', error));
})();
