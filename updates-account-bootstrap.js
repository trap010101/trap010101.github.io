(() => {
  'use strict';

  if (!document.body?.classList.contains('updates-page')) return;
  if (window.NewAnimeUpdatesAccountBootstrap?.ready) return;

  const loadScript = src => new Promise((resolve, reject) => {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(node => {
      if (!node.src) return false;
      const url = new URL(node.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });

    if (existing) {
      if (existing.dataset.loading !== 'true' && existing.dataset.newanimeLoading !== 'true') return resolve(existing);
      existing.addEventListener('load', () => resolve(existing), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const node = document.createElement('script');
    node.src = src;
    node.async = false;
    node.dataset.loading = 'true';
    node.onload = () => {
      node.dataset.loading = 'false';
      node.dataset.loaded = 'true';
      resolve(node);
    };
    node.onerror = error => {
      node.dataset.loading = 'false';
      reject(error);
    };
    document.head.appendChild(node);
  });

  const loadStylesheet = href => {
    const target = new URL(href, location.href);
    const exists = [...document.querySelectorAll('link[rel="stylesheet"]')].some(node => {
      const url = new URL(node.href, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (exists) return;
    const node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = href;
    document.head.appendChild(node);
  };

  const currentLanguage = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };

  function syncSharedLinks() {
    const lang = currentLanguage();
    const brand = document.querySelector('.site-brand');
    if (brand) brand.href = `/?lang=${lang}`;

    const archive = document.getElementById('archiveFooterLink');
    if (archive) archive.href = `/2026/?lang=${lang}`;

    document.querySelectorAll('footer a[href^="/updates/"], footer a[href^="/about/"], footer a[href^="/privacy/"], footer a[href^="/policy/"]').forEach(link => {
      const url = new URL(link.href, location.origin);
      url.searchParams.set('lang', lang);
      link.href = `${url.pathname}${url.search}`;
    });
  }

  let lastLanguage = currentLanguage();
  function publishLanguageIfChanged() {
    const next = currentLanguage();
    syncSharedLinks();
    if (next === lastLanguage) return;
    lastLanguage = next;
    document.dispatchEvent(new CustomEvent('newanime:language', { detail: { lang: next } }));
  }

  new MutationObserver(publishLanguageIfChanged).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  loadStylesheet('/wishlist.css?v=20260909-wishlist5');
  loadStylesheet('/google-login-button-fit.css?v=20260908-1');

  const wishlistReady = Promise.resolve()
    .then(() => loadScript('/language-switcher-compact.js?v=20260911-theme2'))
    .then(() => Array.isArray(window.animeData) ? null : loadScript('/data/anime.js?v=20260907-schedule1'))
    .then(() => loadScript('/data/anime-20260904.js?v=20260905-data2'))
    .then(() => loadScript('/data/title-fixes-20260905.js?v=20260909-title2'))
    .then(() => loadScript('/data/title-hotfix-20260909.js?v=20260909-1'))
    .then(() => loadScript('/data/poster-fixes-20260905.js?v=20260907-posters4'))
    .then(() => loadScript('/data/schedule-updates-20260907.js?v=20260907-schedule2'))
    .then(() => loadScript('/wishlist.js?v=20260909-wishlist4'))
    .then(() => {
      const kicker = document.querySelector('.wishlist-kicker');
      if (kicker) kicker.textContent = 'newani.me';
    });

  const authReady = loadScript('/auth-bootstrap.js?v=20260909-authboot4')
    .then(() => window.NewAnimeAuthBootstrap?.ready || null);

  const ready = Promise.all([wishlistReady, authReady])
    .then(() => loadScript('/wishlist-sync.js?v=20260909-sync2'))
    .then(() => {
      syncSharedLinks();
      document.dispatchEvent(new CustomEvent('newanime:language', { detail: { lang: currentLanguage() } }));
      return true;
    })
    .catch(error => {
      console.warn('Updates account / wishlist UI could not be loaded.', error);
      return false;
    });

  syncSharedLinks();
  window.NewAnimeUpdatesAccountBootstrap = Object.freeze({ ready, syncSharedLinks });
})();
