(() => {
  'use strict';

  const COPY = {
    ko: {
      event: '이벤트', updates: '업데이트', contact: '문의', share: '공유', menu: '메뉴',
      footer: '방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.'
    },
    ja: {
      event: 'イベント', updates: '更新', contact: 'お問い合わせ', share: '共有', menu: 'メニュー',
      footer: '放送予定のアニメと劇場版について、放送日、PV、公式サイト、配信情報をまとめています。'
    },
    en: {
      event: 'EVENT', updates: 'UPDATES', contact: 'CONTACT', share: 'SHARE', menu: 'Menu',
      footer: 'Browse broadcast dates, PVs, official sites, and streaming information for upcoming anime and films.'
    }
  };

  const resolveLanguage = () => {
    const requested = new URLSearchParams(location.search).get('lang');
    if (COPY[requested]) return requested;
    const pageLang = String(document.documentElement.lang || '').toLowerCase().slice(0, 2);
    if (COPY[pageLang]) return pageLang;
    try {
      const saved = localStorage.getItem('animeScheduleLang');
      if (COPY[saved]) return saved;
    } catch (_) {}
    return 'ko';
  };

  const withLang = (path, lang) => `${path}?lang=${lang}`;

  const loadStylesheet = href => {
    const target = new URL(href, location.href);
    const exists = [...document.querySelectorAll('link[rel="stylesheet"]')].some(link => {
      const url = new URL(link.href, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (exists) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  const loadScript = src => new Promise((resolve, reject) => {
    const target = new URL(src, location.href);
    const existing = [...document.scripts].find(script => {
      if (!script.src) return false;
      const url = new URL(script.src, location.href);
      return url.origin === target.origin && url.pathname === target.pathname;
    });
    if (existing) {
      if (existing.dataset.loaded === 'true' || existing.dataset.newanimeLoaded === 'true' || existing.readyState === 'complete') {
        resolve(existing);
        return;
      }
      existing.addEventListener('load', () => resolve(existing), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve(script);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  function sync() {
    const lang = resolveLanguage();
    const text = COPY[lang];

    document.getElementById('brandLink')?.setAttribute('href', withLang('/', lang));
    document.getElementById('eventMenuLink')?.setAttribute('href', withLang('/event/', lang));
    document.getElementById('updatesMenuLink')?.setAttribute('href', withLang('/updates/', lang));
    document.getElementById('archiveFooterLink')?.setAttribute('href', withLang('/2026/', lang));
    document.getElementById('updatesFooterLink')?.setAttribute('href', withLang('/updates/', lang));
    document.getElementById('aboutFooterLink')?.setAttribute('href', withLang('/about/', lang));
    document.getElementById('privacyFooterLink')?.setAttribute('href', withLang('/privacy/', lang));
    document.getElementById('policyFooterLink')?.setAttribute('href', withLang('/policy/', lang));

    const eventLabel = document.getElementById('eventMenuLabel');
    const updatesLabel = document.getElementById('updatesMenuLabel');
    const contactLabel = document.getElementById('contactMenuLabel');
    const shareLabel = document.getElementById('shareMenuLabel');
    const footerDescription = document.getElementById('footerDescription');
    const menuToggle = document.getElementById('menuToggle');

    if (eventLabel) eventLabel.textContent = text.event;
    if (updatesLabel) updatesLabel.textContent = text.updates;
    if (contactLabel) contactLabel.textContent = text.contact;
    if (shareLabel) shareLabel.textContent = text.share;
    if (footerDescription) footerDescription.textContent = text.footer;
    if (menuToggle) menuToggle.setAttribute('aria-label', text.menu);
  }

  loadStylesheet('/site-info.css?v=20260906-info1');
  loadStylesheet('/wishlist.css?v=20260909-wishlist5');

  const wishlistDataReady = Promise.resolve()
    .then(() => loadScript('/data/anime.js?v=20260912-zero1'))
    .then(() => loadScript('/data/anime-20260904.js?v=20260912-zero1'))
    .then(() => loadScript('/data/title-fixes-20260905.js?v=20260912-zero1'))
    .then(() => loadScript('/data/title-hotfix-20260909.js?v=20260912-zero1'))
    .then(() => loadScript('/data/poster-fixes-20260905.js?v=20260912-zero1'))
    .then(() => loadScript('/data/schedule-updates-20260907.js?v=20260910-schedule3'));

  const wishlistReady = wishlistDataReady
    .then(() => loadScript('/wishlist.js?v=20260911-poster1'))
    .then(() => {
      const kicker = document.querySelector('.wishlist-kicker');
      if (kicker) kicker.textContent = 'newani.me';
    });

  const authReady = Promise.resolve(window.NewAnimeAuthBootstrap?.ready || null);

  Promise.all([wishlistReady, authReady])
    .then(() => loadScript('/wishlist-sync.js?v=20260909-sync2'))
    .catch(error => console.warn('Event wishlist UI could not be loaded.', error));

  const brand = document.getElementById('brandLink');
  brand?.addEventListener('click', async event => {
    event.preventDefault();
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
      }
    } catch (_) {}

    const nextUrl = new URL('/', location.origin);
    nextUrl.searchParams.set('lang', resolveLanguage());
    nextUrl.searchParams.set('refresh', Date.now().toString(36));
    location.replace(nextUrl);
  });

  sync();
  document.addEventListener('newanime:language', () => requestAnimationFrame(sync));
  window.addEventListener('popstate', sync);
  document.querySelectorAll('#languageSwitcher [data-lang]').forEach(button => {
    button.addEventListener('click', () => requestAnimationFrame(sync));
  });
})();
