(() => {
  'use strict';

  if (window.NewAnimeTheme?.ready) return;

  const STORAGE_KEY = 'newanimeTheme';
  const VALID = new Set(['system', 'light', 'dark']);
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)');

  const COPY = {
    ko: { theme: '테마', system: '시스템', light: '라이트', dark: '다크' },
    ja: { theme: 'テーマ', system: 'システム', light: 'ライト', dark: 'ダーク' },
    en: { theme: 'Theme', system: 'System', light: 'Light', dark: 'Dark' }
  };

  const css = `
    .theme-menu-control {
      margin: 4px 3px 3px;
      padding: 9px;
      border-top: 1px solid rgba(255,255,255,.075);
      border-radius: 10px;
    }
    .theme-menu-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0 2px 7px;
      color: #929bae;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .theme-menu-options {
      display: grid;
      grid-template-columns: repeat(3, minmax(0,1fr));
      gap: 4px;
    }
    .theme-choice {
      min-width: 0;
      min-height: 31px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 0 6px;
      border: 1px solid rgba(255,255,255,.065);
      border-radius: 8px;
      color: #aeb6c8;
      background: rgba(255,255,255,.025);
      font: inherit;
      font-size: 9px;
      font-weight: 850;
      line-height: 1;
      cursor: pointer;
      transition: color .16s ease, background .16s ease, border-color .16s ease;
    }
    .theme-choice:hover,
    .theme-choice:focus-visible {
      transform: none !important;
      outline: none;
      color: #f4f6ff;
      border-color: rgba(142,161,255,.28);
      background: rgba(142,161,255,.09);
    }
    .theme-choice[aria-pressed="true"] {
      color: #fff;
      border-color: rgba(142,161,255,.32);
      background: rgba(142,161,255,.14);
      box-shadow: inset 0 0 0 1px rgba(142,161,255,.06);
    }
    .theme-choice-icon {
      width: 12px;
      height: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }
    .theme-choice-icon svg {
      width: 12px;
      height: 12px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .theme-choice-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    html[data-theme="light"] {
      color-scheme: light !important;
      --bg: #f4f6fa !important;
      --panel: rgba(255,255,255,.88) !important;
      --panel-2: rgba(248,250,253,.96) !important;
      --surface: rgba(255,255,255,.9) !important;
      --surface-2: rgba(248,250,253,.96) !important;
      --line: rgba(25,31,43,.11) !important;
      --text: #191d26 !important;
      --muted: #687184 !important;
      --accent: #6175de !important;
      --accent-2: #8569da !important;
      --accent-soft: rgba(97,117,222,.10) !important;
      --good: #25835f !important;
      --warn: #a76b12 !important;
      --danger: #bf4259 !important;
      --shadow: 0 18px 55px rgba(42,50,70,.12) !important;
      --event-panel: rgba(255,255,255,.9) !important;
      --event-line: rgba(25,31,43,.11) !important;
      --event-muted: #687184 !important;
      --event-accent: #6175de !important;
      background: #f4f6fa !important;
    }

    html[data-theme="light"] body {
      color: var(--text) !important;
      background:
        radial-gradient(circle at 14% 8%, rgba(117,96,225,.09), transparent 29rem),
        radial-gradient(circle at 90% 18%, rgba(80,145,230,.07), transparent 33rem),
        linear-gradient(180deg, #fbfcfe 0%, #f4f6fa 48%, #f8f9fc 100%) !important;
    }

    html[data-theme="light"] .brand-logo {
      filter: brightness(.46) saturate(1.05) contrast(1.08) drop-shadow(0 1px 0 rgba(255,255,255,.35));
    }

    html[data-theme="light"] .site-header {
      border-color: var(--line) !important;
      background: rgba(255,255,255,.84) !important;
      box-shadow: 0 10px 30px rgba(42,50,70,.09) !important;
    }
    html[data-theme="light"] .site-header .language-row,
    html[data-theme="light"] .language-row {
      border-color: rgba(25,31,43,.10) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .language-current,
    html[data-theme="light"] .menu-toggle,
    html[data-theme="light"] .auth-header-profile {
      color: #4f596c !important;
      border-color: rgba(25,31,43,.11) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .language-current:hover,
    html[data-theme="light"] .language-current:focus-visible,
    html[data-theme="light"] .language-dropdown.is-open > .language-current,
    html[data-theme="light"] .menu-toggle:not(:disabled):hover,
    html[data-theme="light"] .menu-toggle[aria-expanded="true"] {
      color: #33406f !important;
      border-color: rgba(97,117,222,.28) !important;
      background: rgba(97,117,222,.09) !important;
    }
    html[data-theme="light"] .language-options,
    html[data-theme="light"] .site-menu {
      border-color: rgba(25,31,43,.11) !important;
      background:
        linear-gradient(145deg, rgba(97,117,222,.055), transparent 55%),
        rgba(255,255,255,.98) !important;
      box-shadow: 0 18px 44px rgba(42,50,70,.16) !important;
    }
    html[data-theme="light"] #languageSwitcher.language-dropdown .language-btn,
    html[data-theme="light"] #languageSwitcher.language-dropdown [data-lang] {
      color: #727b8d !important;
    }
    html[data-theme="light"] #languageSwitcher.language-dropdown .language-btn:hover,
    html[data-theme="light"] #languageSwitcher.language-dropdown .language-btn:focus-visible,
    html[data-theme="light"] #languageSwitcher.language-dropdown [data-lang]:hover,
    html[data-theme="light"] #languageSwitcher.language-dropdown [data-lang]:focus-visible,
    html[data-theme="light"] #languageSwitcher.language-dropdown .language-btn.active,
    html[data-theme="light"] #languageSwitcher.language-dropdown [data-lang].active {
      color: #27345e !important;
      background: rgba(97,117,222,.09) !important;
    }
    html[data-theme="light"] .site-menu-item {
      color: #313846 !important;
    }
    html[data-theme="light"] .site-menu-item:hover,
    html[data-theme="light"] .site-menu-item:focus-visible,
    html[data-theme="light"] .site-menu-item.is-current {
      color: #23315d !important;
      background: rgba(97,117,222,.09) !important;
    }
    html[data-theme="light"] .site-menu-icon {
      color: #5266c5 !important;
      border-color: rgba(97,117,222,.18) !important;
      background: rgba(97,117,222,.07) !important;
    }
    html[data-theme="light"] .theme-menu-control {
      border-top-color: rgba(25,31,43,.085);
    }
    html[data-theme="light"] .theme-menu-head { color: #7b8494; }
    html[data-theme="light"] .theme-choice {
      color: #697284;
      border-color: rgba(25,31,43,.09);
      background: rgba(31,38,54,.03);
    }
    html[data-theme="light"] .theme-choice:hover,
    html[data-theme="light"] .theme-choice:focus-visible,
    html[data-theme="light"] .theme-choice[aria-pressed="true"] {
      color: #314278;
      border-color: rgba(97,117,222,.24);
      background: rgba(97,117,222,.10);
    }

    html[data-theme="light"] .hero,
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(25,31,43,.105) !important;
      background:
        linear-gradient(135deg, rgba(116,97,218,.08), rgba(76,130,205,.035)),
        rgba(255,255,255,.86) !important;
      box-shadow: var(--shadow) !important;
    }
    html[data-theme="light"] .hero::after,
    html[data-theme="light"] .archive-hero::after,
    html[data-theme="light"] .detail-hero-card::after {
      opacity: .58;
    }
    html[data-theme="light"] .hero-kicker,
    html[data-theme="light"] .eyebrow,
    html[data-theme="light"] .archive-kicker {
      color: #5666ad !important;
      border-color: rgba(97,117,222,.18) !important;
      background: rgba(97,117,222,.07) !important;
    }

    html[data-theme="light"] .toolbar,
    html[data-theme="light"] .archive-nav {
      border-color: var(--line) !important;
      background: rgba(249,250,253,.88) !important;
      box-shadow: 0 12px 30px rgba(42,50,70,.08) !important;
    }
    html[data-theme="light"] .search-wrap,
    html[data-theme="light"] .toolbar button,
    html[data-theme="light"] .chip,
    html[data-theme="light"] .month-nav a,
    html[data-theme="light"] .month-nav button,
    html[data-theme="light"] .archive-nav a {
      border-color: rgba(25,31,43,.10);
      color: var(--text);
      background: rgba(31,38,54,.035);
    }
    html[data-theme="light"] .toolbar button:hover,
    html[data-theme="light"] .chip:hover {
      background: rgba(31,38,54,.065);
    }
    html[data-theme="light"] #search::placeholder { color: #8a92a1; }
    html[data-theme="light"] .chip.active,
    html[data-theme="light"] .year-chip.active,
    html[data-theme="light"] .month-nav button.active,
    html[data-theme="light"] .archive-nav a[aria-current="page"] {
      color: #344579 !important;
      border-color: rgba(97,117,222,.30) !important;
      background: rgba(97,117,222,.11) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .month,
    html[data-theme="light"] .card,
    html[data-theme="light"] .source-box,
    html[data-theme="light"] .undated-item,
    html[data-theme="light"] .detail-panel,
    html[data-theme="light"] .archive-card,
    html[data-theme="light"] .event-card,
    html[data-theme="light"] .event-detail-panel,
    html[data-theme="light"] .event-meta-box,
    html[data-theme="light"] .info-panel,
    html[data-theme="light"] .info-callout {
      border-color: var(--line) !important;
      background: rgba(255,255,255,.78) !important;
      box-shadow: 0 10px 30px rgba(42,50,70,.07) !important;
    }
    html[data-theme="light"] .card:hover,
    html[data-theme="light"] .archive-card:hover,
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible {
      border-color: rgba(97,117,222,.22) !important;
      background: rgba(255,255,255,.96) !important;
    }
    html[data-theme="light"] .undated {
      border-color: rgba(167,107,18,.18) !important;
      background: rgba(255,191,86,.075) !important;
    }
    html[data-theme="light"] .poster-frame,
    html[data-theme="light"] .archive-poster,
    html[data-theme="light"] .wishlist-rank-poster,
    html[data-theme="light"] .wishlist-podium-poster,
    html[data-theme="light"] .detail-poster {
      border-color: rgba(25,31,43,.09) !important;
      background: #e9edf4 !important;
    }

    html[data-theme="light"] .season-divider h2,
    html[data-theme="light"] .month-count,
    html[data-theme="light"] .date,
    html[data-theme="light"] .undated-title,
    html[data-theme="light"] .source-box strong,
    html[data-theme="light"] .archive-summary span,
    html[data-theme="light"] .archive-card-date,
    html[data-theme="light"] .event-card-title,
    html[data-theme="light"] .event-meta-box strong,
    html[data-theme="light"] .detail-badge,
    html[data-theme="light"] .detail-action,
    html[data-theme="light"] .streaming-link,
    html[data-theme="light"] .source-link,
    html[data-theme="light"] .wishlist-rank-number {
      color: #39445a !important;
    }
    html[data-theme="light"] .filter-label,
    html[data-theme="light"] .year-summary,
    html[data-theme="light"] .stream-dialog-kicker,
    html[data-theme="light"] .stream-dialog-desc,
    html[data-theme="light"] .archive-count,
    html[data-theme="light"] .archive-alt-title,
    html[data-theme="light"] .event-card-meta,
    html[data-theme="light"] .event-card-meta dt,
    html[data-theme="light"] .event-description,
    html[data-theme="light"] .event-meta-box span,
    html[data-theme="light"] .detail-kicker,
    html[data-theme="light"] .alternate-titles,
    html[data-theme="light"] .panel-label,
    html[data-theme="light"] .panel-note,
    html[data-theme="light"] .source-link small {
      color: var(--muted) !important;
    }

    html[data-theme="light"] .badge,
    html[data-theme="light"] .detail-badge,
    html[data-theme="light"] .archive-badge {
      color: #5c6678 !important;
      border-color: rgba(25,31,43,.085) !important;
      background: rgba(31,38,54,.04) !important;
    }
    html[data-theme="light"] .resource-btn,
    html[data-theme="light"] .stream-trigger,
    html[data-theme="light"] .detail-action,
    html[data-theme="light"] .streaming-link,
    html[data-theme="light"] .source-link,
    html[data-theme="light"] .event-secondary {
      color: #42517d !important;
      border-color: rgba(97,117,222,.16) !important;
      background: rgba(97,117,222,.06) !important;
    }
    html[data-theme="light"] .resource-btn:hover,
    html[data-theme="light"] .stream-trigger:hover,
    html[data-theme="light"] .detail-action:hover,
    html[data-theme="light"] .streaming-link:hover,
    html[data-theme="light"] .source-link:hover {
      border-color: rgba(97,117,222,.28) !important;
      background: rgba(97,117,222,.10) !important;
    }
    html[data-theme="light"] .resource-btn.disabled,
    html[data-theme="light"] .stream-trigger.disabled,
    html[data-theme="light"] .stream-trigger:disabled,
    html[data-theme="light"] .event-primary:disabled {
      color: #9aa1ae !important;
      border-color: rgba(25,31,43,.07) !important;
      background: rgba(31,38,54,.025) !important;
    }

    html[data-theme="light"] .stream-dialog,
    html[data-theme="light"] .wishlist-dialog,
    html[data-theme="light"] .auth-dialog,
    html[data-theme="light"] .account-dialog {
      color: var(--text) !important;
      border-color: rgba(25,31,43,.11) !important;
      background:
        radial-gradient(circle at 90% 0%, rgba(97,117,222,.08), transparent 18rem),
        #ffffff !important;
      box-shadow: 0 28px 80px rgba(42,50,70,.22) !important;
    }
    html[data-theme="light"] .stream-close {
      color: #596274 !important;
      border-color: rgba(25,31,43,.09) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .ott-option {
      color: #34456f !important;
      border-color: rgba(97,117,222,.15) !important;
      background: rgba(97,117,222,.055) !important;
    }
    html[data-theme="light"] .ott-option.disabled {
      color: #9ca3af !important;
      border-color: rgba(25,31,43,.06) !important;
      background: rgba(31,38,54,.02) !important;
    }
    html[data-theme="light"] .stream-dialog-note {
      color: #747d8f !important;
      border-color: rgba(25,31,43,.07) !important;
      background: rgba(31,38,54,.025) !important;
    }

    /* Light-theme completeness patch: hard-coded dark components. */
    html[data-theme="light"] .upcoming-slide,
    html[data-theme="light"] .upcoming-slide:is(:hover, :active, :focus, :focus-visible) {
      color: #252b38 !important;
      border-color: rgba(25,31,43,.11) !important;
      background: rgba(255,255,255,.94) !important;
      box-shadow: 0 16px 32px rgba(42,50,70,.13) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] {
      border-color: rgba(97,117,222,.34) !important;
      box-shadow: 0 18px 38px rgba(42,50,70,.17) !important;
    }
    html[data-theme="light"] .upcoming-poster { background: #e8ecf4 !important; }
    html[data-theme="light"] .upcoming-countdown { color: #5368c8 !important; }
    html[data-theme="light"] .upcoming-date { color: #6f7889 !important; }

    html[data-theme="light"] .wishlist-summary {
      color: #52617f !important;
      border-color: rgba(97,117,222,.16) !important;
      background: rgba(97,117,222,.06) !important;
    }
    html[data-theme="light"] .wishlist-item {
      border-color: rgba(25,31,43,.08) !important;
      background: rgba(31,38,54,.025) !important;
    }
    html[data-theme="light"] .wishlist-item-copy strong { color: #252b38 !important; }
    html[data-theme="light"] .wishlist-item-copy > span,
    html[data-theme="light"] .wishlist-unavailable,
    html[data-theme="light"] .wishlist-empty { color: #747d8f !important; }
    html[data-theme="light"] .wishlist-poster {
      color: #8c95a4 !important;
      border-color: rgba(25,31,43,.08) !important;
      background: #edf0f5 !important;
    }
    html[data-theme="light"] .wishlist-close,
    html[data-theme="light"] .wishlist-remove {
      border-color: rgba(25,31,43,.08) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .wishlist-close { color: #596274 !important; }

    html[data-theme="light"] .auth-dialog,
    html[data-theme="light"] .detail-account-dialog {
      border-color: rgba(25,31,43,.11) !important;
      background: radial-gradient(circle at 18% -12%, rgba(97,117,222,.11), transparent 38%), #fff !important;
      box-shadow: 0 26px 76px rgba(42,50,70,.20), inset 0 1px rgba(255,255,255,.6) !important;
    }
    html[data-theme="light"] .auth-dialog::before,
    html[data-theme="light"] .detail-account-dialog::before {
      background: linear-gradient(90deg, transparent, rgba(97,117,222,.24), transparent) !important;
    }
    html[data-theme="light"] .auth-kicker,
    html[data-theme="light"] .detail-account-kicker { color: #5f72d4 !important; }
    html[data-theme="light"] .auth-description,
    html[data-theme="light"] .detail-account-description,
    html[data-theme="light"] .auth-account-copy span,
    html[data-theme="light"] .detail-account-profile span,
    html[data-theme="light"] .auth-status,
    html[data-theme="light"] .detail-account-status { color: #747d8f !important; }
    html[data-theme="light"] .auth-close,
    html[data-theme="light"] .detail-account-close,
    html[data-theme="light"] .auth-signout,
    html[data-theme="light"] .detail-account-signout,
    html[data-theme="light"] .detail-account-button {
      color: #596274 !important;
      border-color: rgba(25,31,43,.09) !important;
      background: rgba(31,38,54,.035) !important;
    }
    html[data-theme="light"] .auth-close:hover,
    html[data-theme="light"] .detail-account-close:hover,
    html[data-theme="light"] .auth-signout:hover,
    html[data-theme="light"] .detail-account-signout:hover {
      color: #314278 !important;
      border-color: rgba(97,117,222,.22) !important;
      background: rgba(97,117,222,.08) !important;
    }
    html[data-theme="light"] .auth-account-avatar,
    html[data-theme="light"] .detail-account-profile > img,
    html[data-theme="light"] .detail-account-profile-fallback {
      border-color: rgba(97,117,222,.25) !important;
      background: #eef1f6 !important;
      box-shadow: 0 0 0 4px rgba(97,117,222,.04), 0 10px 24px rgba(42,50,70,.12) !important;
    }

    html[data-theme="light"] .event-status {
      color: #46599d !important;
      border-color: rgba(97,117,222,.19) !important;
      background: rgba(97,117,222,.07) !important;
    }
    html[data-theme="light"] .event-status.is-live {
      color: #267355 !important;
      border-color: rgba(37,131,95,.18) !important;
      background: rgba(37,131,95,.07) !important;
    }
    html[data-theme="light"] .event-status.is-ended {
      color: #7a8291 !important;
      border-color: rgba(25,31,43,.08) !important;
      background: rgba(31,38,54,.03) !important;
    }
    html[data-theme="light"] .event-condition {
      color: #5a6480 !important;
      border-color: rgba(97,117,222,.14) !important;
      background: rgba(97,117,222,.045) !important;
    }
    html[data-theme="light"] .event-primary {
      color: #fff !important;
      border-color: rgba(83,101,196,.34) !important;
      background: linear-gradient(135deg, #687ee1, #8b70dd) !important;
    }

    html[data-theme="light"] .wishlist-rank-item:hover,
    html[data-theme="light"] .wishlist-rank-item:focus-visible {
      background: rgba(31,38,54,.03) !important;
    }
    html[data-theme="light"] .wishlist-ranking-scope,
    html[data-theme="light"] .wishlist-ranking-more {
      color: #5f6879 !important;
      border-color: var(--line) !important;
      background: rgba(255,255,255,.72) !important;
    }
    html[data-theme="light"] .wishlist-rank-item:nth-child(-n+3) .wishlist-rank-number {
      color: #5869b8 !important;
    }

    html[data-theme="light"] .title-scroll::before,
    html[data-theme="light"] .undated-title-scroll::before {
      background: linear-gradient(90deg, rgba(255,255,255,.98) 20%, transparent) !important;
    }
    html[data-theme="light"] .title-scroll::after,
    html[data-theme="light"] .undated-title-scroll::after {
      background: linear-gradient(270deg, rgba(255,255,255,.98) 20%, transparent) !important;
    }

    html[data-theme="light"] footer,
    html[data-theme="light"] .source-box { color: var(--muted) !important; }
    html[data-theme="light"] footer a:hover { color: #344579 !important; }

    @media (max-width: 520px) {
      .theme-menu-control { padding: 8px; }
      .theme-choice { min-height: 30px; padding-inline: 5px; }
      .theme-choice-label { font-size: 8px; }
    }
  `;

  const style = document.createElement('style');
  style.id = 'newanimeThemeStyles';
  style.textContent = css;
  document.head.appendChild(style);

  function safeGet() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return VALID.has(value) ? value : 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  function safeSet(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
  }

  function resolved(preference) {
    if (preference === 'system') return systemDark?.matches ? 'dark' : 'light';
    return preference;
  }

  let preference = safeGet();

  function language() {
    const raw = String(document.documentElement.lang || 'ko').toLowerCase();
    return raw.startsWith('ja') ? 'ja' : raw.startsWith('en') ? 'en' : 'ko';
  }

  function syncMeta(theme) {
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'color-scheme';
      document.head.appendChild(meta);
    }
    meta.content = theme;
  }

  function syncControls() {
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      const selected = button.dataset.themeChoice === preference;
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  function apply(next, { persist = false, notify = true } = {}) {
    preference = VALID.has(next) ? next : 'system';
    if (persist) safeSet(preference);
    const theme = resolved(preference);
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.style.colorScheme = theme;
    syncMeta(theme);
    syncControls();
    if (notify) {
      document.dispatchEvent(new CustomEvent('newanime:theme', {
        detail: { preference, theme }
      }));
    }
  }

  const icons = {
    system: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="12" rx="2"></rect><path d="M8 20h8M12 16.5V20"></path></svg>',
    light: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"></circle><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"></path></svg>',
    dark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.1A8.5 8.5 0 0 1 8.9 4a8.5 8.5 0 1 0 11.1 11.1Z"></path></svg>'
  };

  function updateControlCopy(control) {
    const copy = COPY[language()] || COPY.ko;
    const heading = control.querySelector('[data-theme-heading]');
    if (heading && heading.textContent !== copy.theme) heading.textContent = copy.theme;
    ['system', 'light', 'dark'].forEach(key => {
      const button = control.querySelector(`[data-theme-choice="${key}"]`);
      const label = button?.querySelector('.theme-choice-label');
      if (label && label.textContent !== copy[key]) label.textContent = copy[key];
      const ariaLabel = `${copy.theme}: ${copy[key]}`;
      if (button && button.getAttribute('aria-label') !== ariaLabel) button.setAttribute('aria-label', ariaLabel);
    });
  }

  function createControl() {
    const control = document.createElement('div');
    control.className = 'theme-menu-control';
    control.id = 'themeMenuControl';
    control.setAttribute('role', 'group');
    control.innerHTML = `
      <div class="theme-menu-head" data-theme-heading>Theme</div>
      <div class="theme-menu-options">
        ${['system', 'light', 'dark'].map(key => `
          <button class="theme-choice" type="button" data-theme-choice="${key}" aria-pressed="false">
            <span class="theme-choice-icon">${icons[key]}</span>
            <span class="theme-choice-label">${key}</span>
          </button>
        `).join('')}
      </div>
    `;
    updateControlCopy(control);
    return control;
  }

  function mountControl() {
    const menu = document.getElementById('siteMenu');
    if (!menu) return null;
    let control = document.getElementById('themeMenuControl');
    if (!control) {
      control = createControl();
      const share = menu.querySelector('#shareButton, [data-secondary-share], [data-share]');
      if (share) share.insertAdjacentElement('beforebegin', control);
      else menu.appendChild(control);
    }
    updateControlCopy(control);
    syncControls();
    return control;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-theme-choice]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    apply(button.dataset.themeChoice, { persist: true });
  }, true);

  document.addEventListener('newanime:language', () => {
    const control = mountControl();
    if (control) updateControlCopy(control);
  });

  new MutationObserver(() => {
    const control = mountControl();
    if (control) updateControlCopy(control);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  const menuObserver = new MutationObserver(() => {
    if (!document.getElementById('themeMenuControl')) mountControl();
  });
  if (document.body) menuObserver.observe(document.body, { childList: true, subtree: true });

  systemDark?.addEventListener?.('change', () => {
    if (preference === 'system') apply('system', { persist: false });
  });

  apply(preference, { persist: false, notify: false });
  mountControl();

  window.NewAnimeTheme = Object.freeze({
    ready: true,
    get preference() { return preference; },
    get theme() { return resolved(preference); },
    set: next => apply(next, { persist: true }),
    refresh: () => {
      apply(preference, { persist: false });
      mountControl();
    }
  });
})();