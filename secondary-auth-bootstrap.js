(() => {
  'use strict';
  if (!document.querySelector('.archive-shell, .detail-shell, .ranking-shell')) return;

  const script = src => new Promise((resolve, reject) => {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(node => {
      if (!node.src) return false;
      const url = new URL(node.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (existing) {
      if (existing.dataset.loading !== 'true' && existing.dataset.newanimeLoading !== 'true') return resolve();
      if (existing.dataset.loaded === 'true' || existing.dataset.newanimeLoaded === 'true' || existing.readyState === 'complete') return resolve();
      existing.addEventListener('load', resolve, { once:true });
      existing.addEventListener('error', reject, { once:true });
      return;
    }
    const node = document.createElement('script');
    node.src = src;
    node.async = false;
    node.dataset.loading = 'true';
    node.onload = () => {
      node.dataset.loading = 'false';
      node.dataset.loaded = 'true';
      resolve();
    };
    node.onerror = error => {
      node.dataset.loading = 'false';
      reject(error);
    };
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

  const detailWishlistCopy = {
    ko:{ add:'위시리스트에 추가', remove:'위시리스트에서 제거' },
    ja:{ add:'ウィッシュリストに追加', remove:'ウィッシュリストから削除' },
    en:{ add:'Add to wishlist', remove:'Remove from wishlist' }
  };

  const language = () => {
    const value = (document.documentElement.lang || 'ko').toLowerCase();
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'ko';
  };

  function initDetailWishlist() {
    const detail = window.ANIME_DETAIL;
    const wishlist = window.NewAnimeWishlist;
    const posterWrap = document.querySelector('.detail-poster-wrap');
    if (!detail?.id || !wishlist || !posterWrap) return;

    let button = posterWrap.querySelector('[data-detail-wishlist]');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'detail-wishlist-toggle';
      button.dataset.detailWishlist = detail.id;
      button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.4 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg>';
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        wishlist.toggle(detail.id);
      });
      posterWrap.appendChild(button);
    }

    const render = () => {
      const active = wishlist.has(detail.id);
      const copy = detailWishlistCopy[language()] || detailWishlistCopy.ko;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', active ? copy.remove : copy.add);
      button.title = active ? copy.remove : copy.add;
    };

    document.addEventListener('newanime:wishlist', render);
    document.addEventListener('newanime:language', render);
    render();
  }

  stylesheet('/wishlist.css?v=20260909-wishlist5');

  const wishlistReady = Promise.resolve()
    .then(() => script('/language-switcher-compact.js?v=20260911-theme11'))
    .then(() => Array.isArray(window.animeData) ? null : script('/data/anime.js?v=20260907-schedule1'))
    .then(() => script('/data/anime-20260904.js?v=20260910-data3'))
    .then(() => script('/data/title-fixes-20260905.js?v=20260909-title2'))
    .then(() => script('/data/title-hotfix-20260909.js?v=20260909-1'))
    .then(() => script('/data/poster-fixes-20260905.js?v=20260907-posters4'))
    .then(() => script('/data/schedule-updates-20260907.js?v=20260907-schedule2'))
    .then(() => script('/wishlist.js?v=20260909-wishlist4'))
    .then(() => initDetailWishlist());

  const authReady = script('/auth-bootstrap.js?v=20260909-authboot4')
    .then(() => window.NewAnimeAuthBootstrap?.ready || null);

  wishlistReady.catch(error => console.warn('Secondary wishlist UI could not be loaded.', error));
  authReady.catch(error => console.warn('Secondary authentication UI could not be loaded.', error));

  Promise.all([wishlistReady, authReady])
    .then(() => script('/wishlist-sync.js?v=20260909-sync2'))
    .catch(error => console.warn('Secondary account / wishlist sync could not be loaded.', error));
})();