// Shared theme bootstrap. The full controller is loaded once per page.
(() => {
  try {
    const saved = localStorage.getItem('newanimeTheme');
    const preference = ['system', 'light', 'dark'].includes(saved) ? saved : 'dark';
    const theme = preference === 'system'
      ? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = preference;
  } catch (_) {}

  if (window.NewAnimeTheme?.ready || document.querySelector('script[data-newanime-theme-loader]')) return;
  const script = document.createElement('script');
  script.src = '/theme.js?v=20260911-theme6';
  script.async = false;
  script.dataset.newanimeThemeLoader = 'true';
  document.head.appendChild(script);
})();

// Remove the one-time cache-busting token from the visible URL after navigation.
(() => {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('refresh')) return;
  url.searchParams.delete('refresh');
  const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, '', cleanUrl);
})();

// Compact collapsible language selector shared by the site chrome.
(() => {
  const ROOT_SELECTOR = '#languageSwitcher';
  const LABELS = { ko: 'KR', ja: 'JP', en: 'EN' };

  const style = document.createElement('style');
  style.id = 'compactLanguageSwitcherStyles';
  style.textContent = `
    #languageSwitcher.language-dropdown {
      position: relative !important;
      display: inline-flex !important;
      flex: 0 0 auto !important;
      width: auto !important;
      padding: 0 !important;
      gap: 0 !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
    }

    .language-current {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      min-width: 46px;
      height: 34px;
      padding: 0 8px;
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 10px;
      background: rgba(255,255,255,.035);
      color: #d6dbe8;
      font: inherit;
      font-size: 10px;
      font-weight: 900;
      letter-spacing: .05em;
      line-height: 1;
      cursor: pointer;
    }

    .language-current::after {
      content: '';
      width: 5px;
      height: 5px;
      border-right: 1.5px solid currentColor;
      border-bottom: 1.5px solid currentColor;
      transform: translateY(-1px) rotate(45deg);
      opacity: .62;
      transition: transform .14s ease;
    }

    .language-dropdown.is-open > .language-current::after {
      transform: translateY(1px) rotate(225deg);
    }

    .language-current:hover,
    .language-current:focus-visible,
    .language-dropdown.is-open > .language-current {
      transform: none !important;
      outline: none;
      color: #fff;
      border-color: rgba(142,161,255,.3);
      background: rgba(142,161,255,.11);
    }

    .language-options {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      z-index: 90;
      display: none;
      width: 52px;
      padding: 4px;
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 11px;
      background: rgba(15,18,26,.98);
      box-shadow: 0 14px 34px rgba(0,0,0,.4);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
    }

    .language-dropdown.is-open > .language-options {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    #languageSwitcher.language-dropdown .language-btn,
    #languageSwitcher.language-dropdown [data-lang] {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      min-width: 0 !important;
      min-height: 29px !important;
      height: 29px !important;
      padding: 0 6px !important;
      border: 0 !important;
      border-radius: 7px !important;
      background: transparent !important;
      color: #8993a6 !important;
      box-shadow: none !important;
      font-size: 9px !important;
      font-weight: 900 !important;
      letter-spacing: .04em !important;
      line-height: 1 !important;
      transform: none !important;
    }

    #languageSwitcher.language-dropdown .language-btn:hover,
    #languageSwitcher.language-dropdown .language-btn:focus-visible,
    #languageSwitcher.language-dropdown [data-lang]:hover,
    #languageSwitcher.language-dropdown [data-lang]:focus-visible {
      outline: none !important;
      color: #fff !important;
      background: rgba(255,255,255,.055) !important;
    }

    #languageSwitcher.language-dropdown .language-btn.active,
    #languageSwitcher.language-dropdown [data-lang].active {
      color: #fff !important;
      background: rgba(142,161,255,.12) !important;
    }

    @media (max-width: 520px) {
      .language-current {
        min-width: 42px;
        height: 32px;
        padding-inline: 7px;
      }
      .language-options { width: 48px; }
    }
  `;
  if (!document.getElementById(style.id)) document.head.appendChild(style);

  const syncToggle = root => {
    const active = root.querySelector('.language-options [data-lang].active');
    const current = active?.dataset.lang || document.documentElement.lang?.slice(0, 2) || 'ko';
    const toggle = root.querySelector(':scope > .language-current');
    if (!toggle) return;
    toggle.textContent = LABELS[current] || String(current).toUpperCase();
    toggle.setAttribute('aria-label', `Language: ${toggle.textContent}`);
  };

  const enhance = root => {
    if (!root || root.classList.contains('language-dropdown')) return;
    const buttons = [...root.querySelectorAll(':scope > [data-lang]')];
    if (!buttons.length) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'language-current';
    toggle.setAttribute('aria-haspopup', 'menu');
    toggle.setAttribute('aria-expanded', 'false');

    const options = document.createElement('div');
    options.className = 'language-options';
    options.setAttribute('role', 'menu');

    buttons.forEach(button => {
      button.setAttribute('role', 'menuitem');
      options.appendChild(button);
    });

    root.classList.add('language-dropdown');
    root.append(toggle, options);
    syncToggle(root);
  };

  const close = (root, { restoreFocus = false } = {}) => {
    if (!root?.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    const toggle = root.querySelector(':scope > .language-current');
    toggle?.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle?.focus();
  };

  const closeAll = except => {
    document.querySelectorAll(`${ROOT_SELECTOR}.language-dropdown.is-open`).forEach(root => {
      if (root !== except) close(root);
    });
  };

  document.querySelectorAll(ROOT_SELECTOR).forEach(enhance);

  document.addEventListener('click', event => {
    const toggle = event.target.closest('.language-current');
    if (toggle) {
      event.preventDefault();
      event.stopPropagation();
      const root = toggle.closest('.language-dropdown');
      if (!root) return;
      const open = !root.classList.contains('is-open');
      closeAll(root);
      root.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      return;
    }

    const option = event.target.closest('.language-options [data-lang]');
    if (option) {
      const root = option.closest('.language-dropdown');
      if (root) {
        const toggleButton = root.querySelector(':scope > .language-current');
        toggleButton.textContent = LABELS[option.dataset.lang] || option.textContent.trim();
        toggleButton.setAttribute('aria-label', `Language: ${toggleButton.textContent}`);
        close(root);
        requestAnimationFrame(() => syncToggle(root));
      }
      return;
    }

    closeAll(null);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector(`${ROOT_SELECTOR}.language-dropdown.is-open`);
    if (open) close(open, { restoreFocus: true });
  });
})();

// Shared EVENT entry for pages that use the standard hamburger menu.
(() => {
  const siteMenu = document.getElementById('siteMenu');
  if (!siteMenu || document.getElementById('eventMenuLink')) return;

  const labels = { ko: '이벤트', ja: 'イベント', en: 'EVENT' };
  const resolveLanguage = () => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (labels[requested]) return requested;

    try {
      const saved = window.localStorage.getItem('animeScheduleLang');
      if (labels[saved]) return saved;
    } catch (_) {}

    const pageLanguage = String(document.documentElement.lang || '').toLowerCase().slice(0, 2);
    return labels[pageLanguage] ? pageLanguage : 'ko';
  };

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

  const updatesLink = document.getElementById('updatesMenuLink');
  siteMenu.insertBefore(link, updatesLink || siteMenu.firstChild);

  const sync = () => {
    const language = resolveLanguage();
    link.href = `/event/?lang=${language}`;
    const label = document.getElementById('eventMenuLabel');
    if (label) label.textContent = labels[language];
  };

  sync();
  document.addEventListener('newanime:language', sync);
  window.addEventListener('popstate', sync);
  document.querySelectorAll('#languageSwitcher [data-lang]').forEach(button => {
    button.addEventListener('click', () => requestAnimationFrame(sync));
  });
})();