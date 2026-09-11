(() => {
  'use strict';

  if (window.NewAnimeMenuOrder?.ready) return;

  const eventLabels = {
    ko: '이벤트',
    ja: 'イベント',
    en: 'EVENT'
  };

  const resolveLanguage = () => {
    const pageLanguage = String(document.documentElement.lang || '').toLowerCase().slice(0, 2);
    if (eventLabels[pageLanguage]) return pageLanguage;

    const requested = new URLSearchParams(location.search).get('lang');
    if (eventLabels[requested]) return requested;

    try {
      const saved = localStorage.getItem('animeScheduleLang');
      if (eventLabels[saved]) return saved;
    } catch (_) {}

    return 'ko';
  };

  const createEventLink = () => {
    const link = document.createElement('a');
    link.className = 'site-menu-item';
    link.id = 'eventMenuLink';
    link.setAttribute('role', 'menuitem');
    link.innerHTML = `
      <span class="site-menu-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 7.5h16v9H4z"></path>
          <path d="M8 7.5v9"></path>
          <path d="M16 7.5v9"></path>
          <path d="M8 12h8"></path>
        </svg>
      </span>
      <span id="eventMenuLabel">EVENT</span>
    `;
    return link;
  };

  const syncEventLink = menu => {
    let link = menu.querySelector(':scope > #eventMenuLink');
    if (!link) {
      link = createEventLink();
      menu.appendChild(link);
    }

    const language = resolveLanguage();
    link.href = `/event/?lang=${language}`;
    const label = link.querySelector('#eventMenuLabel');
    if (label) label.textContent = eventLabels[language];
    return link;
  };

  const directChild = (menu, selector) => [...menu.children].find(node => node.matches?.(selector)) || null;

  const normalize = menu => {
    if (!menu) return;

    const eventLink = syncEventLink(menu);
    const ordered = [
      directChild(menu, '#authMenuButton'),
      directChild(menu, '#wishlistMenuButton'),
      eventLink,
      directChild(menu, '#updatesMenuLink, [data-secondary-updates]'),
      directChild(menu, 'a[href^="mailto:"]'),
      directChild(menu, '#settingsMenuButton'),
      directChild(menu, '#shareButton, [data-secondary-share], [data-share]')
    ].filter((node, index, nodes) => node && nodes.indexOf(node) === index);

    const children = [...menu.children];
    const remainder = children.filter(node => !ordered.includes(node));
    const expected = [...ordered, ...remainder];

    if (children.length === expected.length && children.every((node, index) => node === expected[index])) return;
    menu.replaceChildren(...expected);
  };

  const states = new WeakMap();

  const bind = menu => {
    if (!menu || states.has(menu)) return;

    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        normalize(menu);
      });
    };

    const observer = new MutationObserver(schedule);
    observer.observe(menu, { childList: true });
    states.set(menu, { observer, schedule });
    normalize(menu);
  };

  const boot = () => {
    const menu = document.getElementById('siteMenu');
    if (menu) bind(menu);
  };

  boot();
  if (document.body) new MutationObserver(boot).observe(document.body, { childList: true, subtree: true });
  else document.addEventListener('DOMContentLoaded', boot, { once: true });

  const refresh = () => {
    boot();
    const menu = document.getElementById('siteMenu');
    if (menu) states.get(menu)?.schedule();
  };

  ['newanime:auth', 'newanime:wishlist', 'newanime:language'].forEach(type => document.addEventListener(type, refresh));
  window.addEventListener('popstate', refresh);
  new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.NewAnimeMenuOrder = Object.freeze({ ready: true, normalize: refresh });
})();
