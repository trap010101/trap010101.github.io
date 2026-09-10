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
