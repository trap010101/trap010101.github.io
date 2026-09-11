(() => {
  'use strict';

  if (window.NewAnimeTheme?.ready) return;

  const STORAGE_KEY = 'newanimeTheme';
  const VALID = new Set(['system', 'light', 'dark']);
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)');
  const DARK_LOGO_SRC = '/assets/newanime-logo.svg?v=20260909-logo2';
  const LIGHT_LOGO_SRC = '/assets/newanime-logo-light.svg?v=20260911-light1';

  const COPY = {
    ko: {
      settings: '설정', settingsTitle: '설정', settingsDescription: '사이트 표시 환경을 설정합니다.',
      theme: '테마', themeDescription: '화면에 사용할 테마를 선택하세요.', close: '닫기',
      system: '시스템', systemDescription: '기기의 화면 설정을 따릅니다.',
      light: '라이트', lightDescription: '밝은 화면으로 표시합니다.',
      dark: '다크', darkDescription: '어두운 화면으로 표시합니다.'
    },
    ja: {
      settings: '設定', settingsTitle: '設定', settingsDescription: 'サイトの表示環境を設定します。',
      theme: 'テーマ', themeDescription: '表示に使用するテーマを選択してください。', close: '閉じる',
      system: 'システム', systemDescription: '端末の表示設定に合わせます。',
      light: 'ライト', lightDescription: '明るいテーマで表示します。',
      dark: 'ダーク', darkDescription: '暗いテーマで表示します。'
    },
    en: {
      settings: 'SETTINGS', settingsTitle: 'Settings', settingsDescription: 'Customize how NewAnime is displayed.',
      theme: 'Theme', themeDescription: 'Choose the theme used for the site.', close: 'Close',
      system: 'System', systemDescription: 'Follow your device appearance.',
      light: 'Light', lightDescription: 'Use the light appearance.',
      dark: 'Dark', darkDescription: 'Use the dark appearance.'
    }
  };

  const css = `
    .settings-modal[hidden] { display: none !important; }
    .settings-modal {
      position: fixed;
      inset: 0;
      z-index: 420;
      display: grid;
      place-items: center;
      padding: 20px;
    }
    .settings-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(3,5,10,.72);
      backdrop-filter: blur(16px) saturate(112%);
      -webkit-backdrop-filter: blur(16px) saturate(112%);
    }
    .settings-dialog {
      position: relative;
      z-index: 1;
      width: min(390px, calc(100vw - 32px));
      padding: 22px;
      border: 1px solid rgba(255,255,255,.09);
      border-radius: 24px;
      color: var(--text, #f6f7fb);
      background:
        radial-gradient(circle at 18% -10%, rgba(126,143,255,.17), transparent 38%),
        linear-gradient(180deg, rgba(21,24,34,.99), rgba(12,14,20,.995));
      box-shadow: 0 28px 80px rgba(0,0,0,.52), inset 0 1px rgba(255,255,255,.03);
    }
    .settings-dialog-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
    }
    .settings-kicker {
      margin: 0 0 7px;
      color: #91a2ff;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: .13em;
      text-transform: uppercase;
    }
    .settings-dialog h2 {
      margin: 0;
      font-size: 21px;
      line-height: 1.22;
      letter-spacing: -.035em;
    }
    .settings-description {
      margin: 8px 0 0;
      color: #9199aa;
      font-size: 11px;
      line-height: 1.6;
    }
    .settings-close {
      width: 32px;
      height: 32px;
      min-width: 32px;
      padding: 0;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 50%;
      color: #a8b0c0;
      background: rgba(255,255,255,.028);
      font-size: 18px;
      line-height: 1;
    }
    .settings-close:hover,
    .settings-close:focus-visible {
      transform: none;
      color: #fff;
      border-color: rgba(142,161,255,.24);
      background: rgba(142,161,255,.09);
    }
    .settings-section {
      margin-top: 20px;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,.07);
    }
    .settings-section-title {
      margin: 0;
      font-size: 12px;
      font-weight: 900;
      letter-spacing: -.01em;
    }
    .settings-section-description {
      margin: 5px 0 12px;
      color: #858ea0;
      font-size: 10px;
      line-height: 1.5;
    }
    .settings-theme-options {
      display: grid;
      gap: 7px;
    }
    .settings-dialog .theme-choice {
      min-height: 54px;
      width: 100%;
      display: grid;
      grid-template-columns: 30px minmax(0,1fr) 18px;
      align-items: center;
      justify-content: initial;
      gap: 11px;
      padding: 9px 11px;
      border-radius: 13px;
      text-align: left;
    }
    .settings-dialog .theme-choice-icon {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(255,255,255,.06);
      border-radius: 9px;
      background: rgba(255,255,255,.025);
    }
    .settings-dialog .theme-choice-icon svg { width: 15px; height: 15px; }
    .settings-choice-copy { min-width: 0; display: block; }
    .settings-choice-copy strong {
      display: block;
      color: inherit;
      font-size: 11px;
      font-weight: 900;
      line-height: 1.25;
    }
    .settings-choice-copy small {
      display: block;
      margin-top: 3px;
      color: #7f889a;
      font-size: 9px;
      font-weight: 650;
      line-height: 1.35;
    }
    .settings-choice-state {
      width: 17px;
      height: 17px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 50%;
      color: transparent;
      font-size: 10px;
      background: rgba(255,255,255,.025);
    }
    .settings-dialog .theme-choice[aria-pressed="true"] .settings-choice-state {
      color: #fff;
      border-color: rgba(142,161,255,.5);
      background: #7083e6;
    }
    body.settings-modal-open { overflow: hidden !important; }

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

    /* Light theme refinement v2: neutral surfaces, clearer hierarchy and component parity. */
    html[data-theme="light"] {
      --bg: #f6f7f9 !important;
      --panel: #ffffff !important;
      --panel-2: #f8f9fb !important;
      --surface: #ffffff !important;
      --surface-2: #f8f9fb !important;
      --line: rgba(31,37,48,.105) !important;
      --text: #20242d !important;
      --muted: #697283 !important;
      --accent: #5d70d7 !important;
      --accent-2: #8065d3 !important;
      --accent-soft: rgba(93,112,215,.095) !important;
      --shadow: 0 14px 42px rgba(38,45,61,.095) !important;
      background: #f6f7f9 !important;
    }
    html[data-theme="light"] body {
      background:
        radial-gradient(circle at 9% 2%, rgba(81,69,113,.075), transparent 27rem),
        radial-gradient(circle at 92% 18%, rgba(49,89,117,.070), transparent 34rem),
        linear-gradient(135deg, #fffefe 0%, #f8f6fb 46%, #f2f7fa 100%) !important;
    }
    html[data-theme="light"] .site-header {
      border-color: rgba(31,37,48,.095) !important;
      background: rgba(255,255,255,.94) !important;
      box-shadow: 0 1px 0 rgba(255,255,255,.8), 0 8px 26px rgba(38,45,61,.075) !important;
    }
    html[data-theme="light"] .site-brand {
      border-radius: 10px;
      background: rgba(32,37,48,.035);
      box-shadow: inset 0 0 0 1px rgba(31,37,48,.045);
    }
    html[data-theme="light"] .brand-logo {
      filter: none !important;
    }
    html[data-theme="light"] .hero,
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(31,37,48,.095) !important;
      background:
        linear-gradient(120deg, rgba(81,69,113,.078) 0%, rgba(255,255,255,.92) 48%, rgba(49,89,117,.064) 100%),
        #ffffff !important;
      box-shadow: 0 14px 40px rgba(38,45,61,.085) !important;
    }
    html[data-theme="light"] .toolbar,
    html[data-theme="light"] .archive-nav {
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.94) !important;
      box-shadow: 0 10px 28px rgba(38,45,61,.07) !important;
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
      border-color: rgba(31,37,48,.085) !important;
      background: #ffffff !important;
      box-shadow: 0 8px 26px rgba(38,45,61,.055) !important;
    }
    html[data-theme="light"] .card {
      background: linear-gradient(180deg, #ffffff, #fbfbfd) !important;
    }
    html[data-theme="light"] .card:hover,
    html[data-theme="light"] .archive-card:hover,
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible {
      border-color: rgba(93,112,215,.24) !important;
      background: #ffffff !important;
      box-shadow: 0 12px 30px rgba(38,45,61,.08) !important;
    }
    html[data-theme="light"] .month-count,
    html[data-theme="light"] .date {
      color: #4f609d !important;
      border-color: rgba(93,112,215,.15) !important;
      background: rgba(93,112,215,.07) !important;
    }
    html[data-theme="light"] #search,
    html[data-theme="light"] input,
    html[data-theme="light"] textarea,
    html[data-theme="light"] select { color: var(--text) !important; }
    html[data-theme="light"] .search-wrap {
      border-color: rgba(31,37,48,.095) !important;
      background: #fbfcfd !important;
    }
    html[data-theme="light"] .season-divider::after {
      background: linear-gradient(90deg, rgba(31,37,48,.13), transparent) !important;
    }
    html[data-theme="light"] .verification-trigger {
      color: #5368c8 !important;
      border-color: rgba(93,112,215,.16) !important;
      background: rgba(93,112,215,.055) !important;
    }
    html[data-theme="light"] .stream-modal-backdrop,
    html[data-theme="light"] .wishlist-backdrop,
    html[data-theme="light"] .auth-backdrop,
    html[data-theme="light"] .detail-account-backdrop {
      background: rgba(28,33,44,.34) !important;
      backdrop-filter: blur(14px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(14px) saturate(108%) !important;
    }
    html[data-theme="light"] .stream-dialog,
    html[data-theme="light"] .wishlist-dialog,
    html[data-theme="light"] .auth-dialog,
    html[data-theme="light"] .account-dialog,
    html[data-theme="light"] .detail-account-dialog {
      border-color: rgba(31,37,48,.10) !important;
      background:
        radial-gradient(circle at 8% 0%, rgba(81,69,113,.055), transparent 15rem),
        radial-gradient(circle at 96% 0%, rgba(49,89,117,.050), transparent 18rem),
        #ffffff !important;
      box-shadow: 0 26px 72px rgba(38,45,61,.18) !important;
    }
    html[data-theme="light"] .share-status {
      color: #35415d !important;
      border-color: rgba(31,37,48,.10) !important;
      background: rgba(255,255,255,.96) !important;
      box-shadow: 0 12px 30px rgba(38,45,61,.12) !important;
    }
    html[data-theme="light"] .meta .badge {
      border-color: rgba(var(--category-rgb, 91,112,215), .22) !important;
      background: rgba(var(--category-rgb, 91,112,215), .095) !important;
    }
    html[data-theme="light"] .meta .badge.major { color: #aa3f66 !important; }
    html[data-theme="light"] .meta .badge.new { color: #28789f !important; }
    html[data-theme="light"] .meta .badge.series { color: #545db0 !important; }
    html[data-theme="light"] .meta .badge.comic { color: #a95d28 !important; }
    html[data-theme="light"] .meta .badge.ln { color: #7650a7 !important; }
    html[data-theme="light"] .meta .badge.webtoon { color: #287f72 !important; }
    html[data-theme="light"] .meta .badge.webnovel { color: #8f49a5 !important; }
    html[data-theme="light"] .meta .badge.game { color: #4165a8 !important; }
    html[data-theme="light"] .meta .badge.original { color: #317b57 !important; }
    html[data-theme="light"] .meta .badge.movie { color: #966915 !important; }
    html[data-theme="light"] #filters .chip[data-filter]:not([data-filter="all"]) {
      color: #5d6573 !important;
      border-color: rgba(var(--category-rgb), .16) !important;
      background: rgba(var(--category-rgb), .035) !important;
    }
    html[data-theme="light"] #filters .chip[data-filter]:not([data-filter="all"]):hover,
    html[data-theme="light"] #filters .chip.active:not([data-filter="all"]) {
      color: #303745 !important;
      border-color: rgba(var(--category-rgb), .34) !important;
      background: rgba(var(--category-rgb), .12) !important;
    }
    html[data-theme="light"] .settings-modal-backdrop {
      background: rgba(28,33,44,.34) !important;
    }
    html[data-theme="light"] .settings-dialog {
      color: var(--text) !important;
      border-color: rgba(31,37,48,.10) !important;
      background:
        radial-gradient(circle at 14% -10%, rgba(81,69,113,.075), transparent 36%),
        radial-gradient(circle at 92% 8%, rgba(49,89,117,.045), transparent 28%),
        #ffffff !important;
      box-shadow: 0 26px 72px rgba(38,45,61,.18) !important;
    }
    html[data-theme="light"] .settings-kicker { color: #5669c8 !important; }
    html[data-theme="light"] .settings-description,
    html[data-theme="light"] .settings-section-description,
    html[data-theme="light"] .settings-choice-copy small { color: #737d8e !important; }
    html[data-theme="light"] .settings-section { border-top-color: rgba(31,37,48,.08) !important; }
    html[data-theme="light"] .settings-close,
    html[data-theme="light"] .settings-dialog .theme-choice {
      color: #5b6475 !important;
      border-color: rgba(31,37,48,.085) !important;
      background: #fafbfc !important;
    }
    html[data-theme="light"] .settings-dialog .theme-choice:hover,
    html[data-theme="light"] .settings-dialog .theme-choice:focus-visible,
    html[data-theme="light"] .settings-dialog .theme-choice[aria-pressed="true"] {
      color: #304174 !important;
      border-color: rgba(93,112,215,.24) !important;
      background: rgba(93,112,215,.075) !important;
    }
    html[data-theme="light"] .settings-dialog .theme-choice-icon,
    html[data-theme="light"] .settings-choice-state {
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(31,37,48,.025) !important;
    }
    html[data-theme="light"] .settings-dialog .theme-choice[aria-pressed="true"] .settings-choice-state {
      color: #fff !important;
      border-color: #5d70d7 !important;
      background: #5d70d7 !important;
    }

    /* Light theme refinement v3: restore translucent glass surfaces and remove artificial boxes. */
    html[data-theme="light"] {
      --panel: rgba(255,255,255,.64) !important;
      --panel-2: rgba(250,251,253,.76) !important;
      --surface: rgba(255,255,255,.62) !important;
      --surface-2: rgba(250,251,253,.75) !important;
      --line: rgba(31,37,48,.072) !important;
      --shadow: 0 14px 38px rgba(38,45,61,.072) !important;
    }

    html[data-theme="light"] .site-brand {
      background: transparent !important;
      border: 0 !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .site-header {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.72) !important;
      box-shadow: 0 8px 28px rgba(38,45,61,.065) !important;
      backdrop-filter: blur(20px) saturate(116%) !important;
      -webkit-backdrop-filter: blur(20px) saturate(116%) !important;
    }

    html[data-theme="light"] .site-header .language-row,
    html[data-theme="light"] .language-row {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.30) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .language-current,
    html[data-theme="light"] .menu-toggle,
    html[data-theme="light"] .auth-header-profile {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.30) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .language-options,
    html[data-theme="light"] .site-menu {
      border-color: rgba(31,37,48,.07) !important;
      background:
        linear-gradient(145deg, rgba(81,69,113,.045), transparent 58%),
        rgba(255,255,255,.82) !important;
      box-shadow: 0 18px 42px rgba(38,45,61,.13) !important;
      backdrop-filter: blur(22px) saturate(118%) !important;
      -webkit-backdrop-filter: blur(22px) saturate(118%) !important;
    }

    html[data-theme="light"] .hero,
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(31,37,48,.065) !important;
      background:
        linear-gradient(120deg, rgba(81,69,113,.055) 0%, rgba(255,255,255,.22) 48%, rgba(49,89,117,.045) 100%),
        rgba(255,255,255,.62) !important;
      box-shadow: 0 14px 38px rgba(38,45,61,.068) !important;
      backdrop-filter: blur(18px) saturate(112%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(112%) !important;
    }

    html[data-theme="light"] .toolbar,
    html[data-theme="light"] .archive-nav {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.67) !important;
      box-shadow: 0 10px 26px rgba(38,45,61,.055) !important;
      backdrop-filter: blur(18px) saturate(112%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(112%) !important;
    }

    html[data-theme="light"] .month,
    html[data-theme="light"] .source-box,
    html[data-theme="light"] .undated-item,
    html[data-theme="light"] .detail-panel,
    html[data-theme="light"] .archive-card,
    html[data-theme="light"] .event-card,
    html[data-theme="light"] .event-detail-panel,
    html[data-theme="light"] .event-meta-box,
    html[data-theme="light"] .info-panel,
    html[data-theme="light"] .info-callout {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.58) !important;
      box-shadow: 0 8px 24px rgba(38,45,61,.045) !important;
    }

    html[data-theme="light"] .month {
      backdrop-filter: blur(12px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(12px) saturate(108%) !important;
    }

    html[data-theme="light"] .card {
      border-color: rgba(31,37,48,.055) !important;
      background: linear-gradient(180deg, rgba(255,255,255,.56), rgba(255,255,255,.34)) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .card:hover,
    html[data-theme="light"] .archive-card:hover,
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible {
      border-color: rgba(93,112,215,.17) !important;
      background: rgba(255,255,255,.72) !important;
      box-shadow: 0 10px 24px rgba(38,45,61,.052) !important;
    }

    html[data-theme="light"] .search-wrap,
    html[data-theme="light"] .toolbar button,
    html[data-theme="light"] .chip,
    html[data-theme="light"] .month-nav a,
    html[data-theme="light"] .month-nav button,
    html[data-theme="light"] .archive-nav a {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.32) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .toolbar button:hover,
    html[data-theme="light"] .chip:hover {
      background: rgba(255,255,255,.52) !important;
    }

    html[data-theme="light"] .upcoming-slide,
    html[data-theme="light"] .upcoming-slide:is(:hover, :active, :focus, :focus-visible) {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.64) !important;
      box-shadow: 0 14px 30px rgba(38,45,61,.085) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] {
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(255,255,255,.74) !important;
      box-shadow: 0 18px 34px rgba(38,45,61,.105) !important;
    }

    html[data-theme="light"] .wishlist-summary,
    html[data-theme="light"] .wishlist-item,
    html[data-theme="light"] .wishlist-ranking-scope,
    html[data-theme="light"] .wishlist-ranking-more,
    html[data-theme="light"] .stream-dialog-note {
      border-color: rgba(31,37,48,.055) !important;
      background: rgba(255,255,255,.34) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .stream-dialog,
    html[data-theme="light"] .wishlist-dialog,
    html[data-theme="light"] .auth-dialog,
    html[data-theme="light"] .account-dialog,
    html[data-theme="light"] .detail-account-dialog,
    html[data-theme="light"] .settings-dialog {
      border-color: rgba(31,37,48,.07) !important;
      background:
        radial-gradient(circle at 14% -10%, rgba(81,69,113,.052), transparent 36%),
        radial-gradient(circle at 92% 8%, rgba(49,89,117,.035), transparent 28%),
        rgba(255,255,255,.88) !important;
      box-shadow: 0 24px 66px rgba(38,45,61,.155) !important;
      backdrop-filter: blur(24px) saturate(116%) !important;
      -webkit-backdrop-filter: blur(24px) saturate(116%) !important;
    }

    html[data-theme="light"] .settings-close,
    html[data-theme="light"] .stream-close,
    html[data-theme="light"] .wishlist-close,
    html[data-theme="light"] .wishlist-remove,
    html[data-theme="light"] .auth-close,
    html[data-theme="light"] .detail-account-close,
    html[data-theme="light"] .auth-signout,
    html[data-theme="light"] .detail-account-signout,
    html[data-theme="light"] .detail-account-button,
    html[data-theme="light"] .settings-dialog .theme-choice {
      border-color: rgba(31,37,48,.055) !important;
      background: rgba(255,255,255,.30) !important;
      box-shadow: none !important;
    }

    html[data-theme="light"] .settings-dialog .theme-choice:hover,
    html[data-theme="light"] .settings-dialog .theme-choice:focus-visible,
    html[data-theme="light"] .settings-dialog .theme-choice[aria-pressed="true"] {
      border-color: rgba(93,112,215,.18) !important;
      background: rgba(93,112,215,.065) !important;
    }

    html[data-theme="light"] .share-status {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.82) !important;
      box-shadow: 0 12px 28px rgba(38,45,61,.10) !important;
      backdrop-filter: blur(18px) saturate(112%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(112%) !important;
    }

    /* Light theme polish v4: neutral verification, darker footer links, readable carousel. */
    html[data-theme="light"] .verification-trigger {
      color: rgba(48, 55, 68, .58) !important;
      border-color: transparent !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .verification-trigger svg {
      fill: transparent !important;
    }
    html[data-theme="light"] .verification-trigger:hover,
    html[data-theme="light"] .verification-trigger:focus-visible {
      color: #3f4858 !important;
      border-color: transparent !important;
      background: rgba(31, 37, 48, .035) !important;
    }

    html[data-theme="light"] footer .site-footer-links a {
      color: #4f596a !important;
    }
    html[data-theme="light"] footer .site-footer-links a:hover,
    html[data-theme="light"] footer .site-footer-links a:focus-visible {
      color: #303846 !important;
    }

    html[data-theme="light"] .upcoming-slide,
    html[data-theme="light"] .upcoming-slide:is(:hover, :active, :focus, :focus-visible) {
      background: rgba(250, 251, 253, .94) !important;
      backdrop-filter: blur(18px) saturate(104%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(104%) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] {
      background: rgba(252, 253, 254, .985) !important;
    }
    html[data-theme="light"] .upcoming-body {
      background: rgba(252, 253, 254, .97) !important;
      box-shadow: inset 0 1px 0 rgba(31, 37, 48, .035) !important;
    }
    html[data-theme="light"] .upcoming-slide[data-position="center"] .upcoming-body {
      background: rgba(252, 253, 254, .995) !important;
    }
    html[data-theme="light"] .upcoming-title {
      color: #252b35 !important;
    }
    html[data-theme="light"] .upcoming-date {
      color: #606a7b !important;
    }

    @media (max-width: 520px) {
      .settings-modal { padding: 16px; }
      .settings-dialog { width: min(360px, calc(100vw - 24px)); padding: 19px; border-radius: 22px; }
      .settings-dialog .theme-choice { min-height: 52px; padding: 8px 10px; }
      .settings-description { max-width: 250px; }
    }

    /* Light theme polish v8: category color harmony and opaque hamburger menu. */
    html[data-theme="light"] #filters .chip[data-filter]:not([data-filter="all"]) {
      color: rgb(var(--category-rgb)) !important;
      color: color-mix(in srgb, rgb(var(--category-rgb)) 72%, #111827 28%) !important;
      border-color: rgba(var(--category-rgb), .24) !important;
      background: rgba(var(--category-rgb), .115) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.34) !important;
    }
    html[data-theme="light"] #filters .chip[data-filter]:not([data-filter="all"]):hover {
      color: rgb(var(--category-rgb)) !important;
      color: color-mix(in srgb, rgb(var(--category-rgb)) 68%, #101827 32%) !important;
      border-color: rgba(var(--category-rgb), .34) !important;
      background: rgba(var(--category-rgb), .16) !important;
    }
    html[data-theme="light"] #filters .chip.active:not([data-filter="all"]) {
      color: rgb(var(--category-rgb)) !important;
      color: color-mix(in srgb, rgb(var(--category-rgb)) 64%, #0f172a 36%) !important;
      border-color: rgba(var(--category-rgb), .40) !important;
      background: rgba(var(--category-rgb), .205) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 4px 12px rgba(var(--category-rgb), .075) !important;
    }
    html[data-theme="light"] .site-menu {
      border-color: rgba(31,37,48,.10) !important;
      background:
        linear-gradient(145deg, rgba(93,112,215,.035), transparent 58%),
        rgba(252,253,255,.985) !important;
      box-shadow: 0 18px 44px rgba(38,45,61,.145) !important;
      backdrop-filter: blur(20px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(20px) saturate(108%) !important;
    }


    /* Light theme polish v9: stable year filter states. */
    html[data-theme="light"] #yearFilters .year-chip:not(.active) {
      color: #556071 !important;
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(255,255,255,.54) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] #yearFilters .year-chip:not(.active):hover,
    html[data-theme="light"] #yearFilters .year-chip:not(.active):focus-visible {
      color: #35405a !important;
      border-color: rgba(93,112,215,.18) !important;
      background: rgba(255,255,255,.76) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] #yearFilters .year-chip.active,
    html[data-theme="light"] #yearFilters .year-chip.active:hover,
    html[data-theme="light"] #yearFilters .year-chip.active:focus-visible {
      color: #33437f !important;
      border-color: rgba(93,112,215,.30) !important;
      background: linear-gradient(135deg, rgba(93,112,215,.145), rgba(128,101,211,.105)) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.42), 0 4px 12px rgba(93,112,215,.055) !important;
      transform: none !important;
    }


    /* Light theme secondary pages v11: archive, detail, info, updates, event, ranking. */
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .info-page .hero,
    html[data-theme="light"] .event-page .hero,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(31,37,48,.07) !important;
      background: rgba(255,255,255,.66) !important;
      box-shadow: 0 14px 36px rgba(38,45,61,.065) !important;
      backdrop-filter: blur(18px) saturate(108%) !important;
      -webkit-backdrop-filter: blur(18px) saturate(108%) !important;
    }
    html[data-theme="light"] .archive-hero::after,
    html[data-theme="light"] .detail-hero-card::after {
      display: none !important;
    }

    /* Schedule archive pages. */
    html[data-theme="light"] .archive-back,
    html[data-theme="light"] .archive-kicker,
    html[data-theme="light"] .archive-description,
    html[data-theme="light"] .archive-count,
    html[data-theme="light"] .archive-alt-title {
      color: #687282 !important;
    }
    html[data-theme="light"] .archive-hero h1,
    html[data-theme="light"] .archive-section-head h2,
    html[data-theme="light"] .archive-card h3,
    html[data-theme="light"] .archive-card-title {
      color: #252b35 !important;
    }
    html[data-theme="light"] .archive-section-head h2 a:hover,
    html[data-theme="light"] .archive-card-title:hover,
    html[data-theme="light"] .archive-back:hover {
      color: #33437f !important;
    }
    html[data-theme="light"] .archive-summary span {
      color: #42558f !important;
      border-color: rgba(93,112,215,.16) !important;
      background: rgba(93,112,215,.065) !important;
    }
    html[data-theme="light"] .archive-nav {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.70) !important;
      box-shadow: 0 10px 26px rgba(38,45,61,.055) !important;
    }
    html[data-theme="light"] .archive-nav a {
      color: #596476 !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.32) !important;
    }
    html[data-theme="light"] .archive-nav a:hover,
    html[data-theme="light"] .archive-nav a[aria-current="page"] {
      color: #33437f !important;
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(93,112,215,.085) !important;
    }
    html[data-theme="light"] .archive-card {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.62) !important;
      box-shadow: 0 8px 22px rgba(38,45,61,.045) !important;
    }
    html[data-theme="light"] .archive-card:hover {
      border-color: rgba(93,112,215,.17) !important;
      background: rgba(255,255,255,.78) !important;
      box-shadow: 0 10px 24px rgba(38,45,61,.055) !important;
    }
    html[data-theme="light"] .archive-poster {
      border-color: rgba(31,37,48,.07) !important;
      background: #edf0f4 !important;
      box-shadow: 0 5px 14px rgba(38,45,61,.07) !important;
    }
    html[data-theme="light"] .archive-poster-fallback { color: #8a93a2 !important; }
    html[data-theme="light"] .archive-card-date { color: #52629e !important; }
    html[data-theme="light"] .archive-badge {
      color: #5b6575 !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(31,37,48,.025) !important;
    }
    html[data-theme="light"] .archive-empty {
      color: #687282 !important;
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.38) !important;
    }

    /* Anime detail pages. */
    html[data-theme="light"] .detail-back,
    html[data-theme="light"] .detail-breadcrumb,
    html[data-theme="light"] .detail-kicker,
    html[data-theme="light"] .alternate-titles,
    html[data-theme="light"] .panel-label,
    html[data-theme="light"] .panel-note,
    html[data-theme="light"] .source-heading span,
    html[data-theme="light"] .source-link small,
    html[data-theme="light"] .empty-state {
      color: #687282 !important;
    }
    html[data-theme="light"] .detail-back:hover,
    html[data-theme="light"] .detail-breadcrumb a:hover { color: #33437f !important; }
    html[data-theme="light"] .anime-localized h1,
    html[data-theme="light"] .panel-heading h2,
    html[data-theme="light"] .source-link strong,
    html[data-theme="light"] .release-value {
      color: #252b35 !important;
    }
    html[data-theme="light"] .detail-poster {
      border-color: rgba(31,37,48,.075) !important;
      background: #edf0f4 !important;
      box-shadow: 0 12px 28px rgba(38,45,61,.12) !important;
    }
    html[data-theme="light"] .detail-panel {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.57) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .detail-release-panel {
      background: rgba(245,247,252,.78) !important;
    }
    html[data-theme="light"] .detail-badge {
      color: #566171 !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(31,37,48,.025) !important;
    }
    html[data-theme="light"] .detail-action,
    html[data-theme="light"] .streaming-link,
    html[data-theme="light"] .source-link {
      color: #34405c !important;
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.36) !important;
    }
    html[data-theme="light"] .detail-action:hover,
    html[data-theme="light"] .streaming-link:hover,
    html[data-theme="light"] .source-link:hover {
      color: #33437f !important;
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(93,112,215,.075) !important;
    }
    html[data-theme="light"] .detail-toast {
      color: #35405a !important;
      border-color: rgba(31,37,48,.08) !important;
      background: rgba(252,253,255,.97) !important;
      box-shadow: 0 12px 30px rgba(38,45,61,.12) !important;
    }

    /* About, privacy and policy pages. */
    html[data-theme="light"] .info-panel {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.60) !important;
      box-shadow: 0 8px 24px rgba(38,45,61,.045) !important;
    }
    html[data-theme="light"] .info-panel h2 { color: #252b35 !important; }
    html[data-theme="light"] .info-panel h3 { color: #303744 !important; }
    html[data-theme="light"] .info-panel p,
    html[data-theme="light"] .info-panel li { color: #4f596a !important; }
    html[data-theme="light"] .info-panel strong { color: #2a303b !important; }
    html[data-theme="light"] .info-panel a {
      color: #42558f !important;
      text-decoration-color: rgba(66,85,143,.30) !important;
    }
    html[data-theme="light"] .info-meta { color: #737d8e !important; }
    html[data-theme="light"] .info-callout {
      border-color: rgba(93,112,215,.14) !important;
      background: rgba(93,112,215,.055) !important;
      box-shadow: none !important;
    }

    /* Updates page. */
    html[data-theme="light"] .changelog-day,
    html[data-theme="light"] .changelog-entries,
    html[data-theme="light"] .changelog-entry {
      border-color: rgba(31,37,48,.075) !important;
    }
    html[data-theme="light"] .changelog-day-header h2,
    html[data-theme="light"] .changelog-entry-title { color: #252b35 !important; }
    html[data-theme="light"] .changelog-group > h3,
    html[data-theme="light"] .changelog-entry p,
    html[data-theme="light"] .changelog-source,
    html[data-theme="light"] .updates-empty { color: #687282 !important; }
    html[data-theme="light"] .changelog-source:hover,
    html[data-theme="light"] .changelog-source:focus-visible { color: #33437f !important; }

    /* Event list/detail pages and forms. */
    html[data-theme="light"] {
      --event-panel: rgba(255,255,255,.64) !important;
      --event-line: rgba(31,37,48,.07) !important;
      --event-muted: #687282 !important;
      --event-accent: #5265bd !important;
    }
    html[data-theme="light"] .event-card,
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible,
    html[data-theme="light"] .event-detail-panel {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.62) !important;
      box-shadow: 0 9px 24px rgba(38,45,61,.05) !important;
    }
    html[data-theme="light"] .event-card:hover,
    html[data-theme="light"] .event-card:focus-visible {
      border-color: rgba(93,112,215,.17) !important;
      background: rgba(255,255,255,.78) !important;
    }
    html[data-theme="light"] .event-card-title,
    html[data-theme="light"] .event-detail-title { color: #252b35 !important; }
    html[data-theme="light"] .event-card-meta,
    html[data-theme="light"] .event-description,
    html[data-theme="light"] .event-action-note { color: #4f596a !important; }
    html[data-theme="light"] .event-card-meta dt,
    html[data-theme="light"] .event-meta-box span { color: #737d8e !important; }
    html[data-theme="light"] .event-meta-box strong,
    html[data-theme="light"] .event-form label { color: #303744 !important; }
    html[data-theme="light"] .event-back-link,
    html[data-theme="light"] .event-browse-link { color: #42558f !important; }
    html[data-theme="light"] .event-back-link:hover,
    html[data-theme="light"] .event-browse-link:hover,
    html[data-theme="light"] .event-browse-link:focus-visible { color: #33437f !important; }
    html[data-theme="light"] .event-meta-box,
    html[data-theme="light"] .event-eligibility-progress,
    html[data-theme="light"] .event-consent {
      border-color: rgba(31,37,48,.06) !important;
      background: rgba(255,255,255,.38) !important;
      box-shadow: none !important;
    }
    html[data-theme="light"] .event-condition {
      color: #56617a !important;
      border-color: rgba(93,112,215,.13) !important;
      background: rgba(93,112,215,.05) !important;
    }
    html[data-theme="light"] .event-condition > strong,
    html[data-theme="light"] .event-progress-head strong { color: #303744 !important; }
    html[data-theme="light"] .event-progress-head span,
    html[data-theme="light"] .event-entry-locked,
    html[data-theme="light"] .event-consent { color: #687282 !important; }
    html[data-theme="light"] .event-progress-track { background: rgba(31,37,48,.075) !important; }
    html[data-theme="light"] .event-action-panel,
    html[data-theme="light"] .event-entry-locked { border-color: rgba(31,37,48,.065) !important; }
    html[data-theme="light"] .event-secondary {
      color: #394355 !important;
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(255,255,255,.45) !important;
    }
    html[data-theme="light"] .event-email {
      color: #252b35 !important;
      border-color: rgba(31,37,48,.10) !important;
      background: rgba(255,255,255,.72) !important;
    }
    html[data-theme="light"] .event-email::placeholder { color: #8a93a2 !important; }
    html[data-theme="light"] .event-empty,
    html[data-theme="light"] .event-loading,
    html[data-theme="light"] .event-error {
      color: #687282 !important;
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.30) !important;
    }
    html[data-theme="light"] .event-complete {
      border-color: rgba(37,131,95,.15) !important;
      background: rgba(37,131,95,.045) !important;
    }
    html[data-theme="light"] .event-complete p { color: #587066 !important; }
    html[data-theme="light"] .event-complete-email { color: #303744 !important; }
    html[data-theme="light"] .event-cancelled {
      border-color: rgba(191,66,89,.15) !important;
      background: rgba(191,66,89,.045) !important;
    }
    html[data-theme="light"] .event-cancelled h2 { color: #873a49 !important; }
    html[data-theme="light"] .event-cancelled p { color: #6d5b61 !important; }

    /* Ranking page. */
    html[data-theme="light"] .ranking-page .hero::after {
      color: rgba(31,37,48,.035) !important;
    }
    html[data-theme="light"] .ranking-page .hero-kicker { color: #5265bd !important; }
    html[data-theme="light"] .ranking-page .hero p { color: #687282 !important; }
    html[data-theme="light"] .wishlist-rank-item:hover,
    html[data-theme="light"] .wishlist-rank-item:focus-visible { background: rgba(31,37,48,.025) !important; }
    html[data-theme="light"] .wishlist-rank-number { color: #657083 !important; }
    html[data-theme="light"] .wishlist-rank-item:nth-child(-n+3) .wishlist-rank-number { color: #5265bd !important; }
    html[data-theme="light"] .wishlist-rank-poster,
    html[data-theme="light"] .wishlist-podium-poster {
      color: #8993a3 !important;
      background: #edf0f4 !important;
    }
    html[data-theme="light"] .wishlist-podium-card {
      border-color: rgba(31,37,48,.07) !important;
      background: rgba(255,255,255,.62) !important;
      box-shadow: 0 12px 30px rgba(38,45,61,.065) !important;
    }
    html[data-theme="light"] .wishlist-podium-card:hover,
    html[data-theme="light"] .wishlist-podium-card:focus-visible {
      border-color: rgba(93,112,215,.19) !important;
      box-shadow: 0 16px 34px rgba(38,45,61,.085) !important;
    }
    html[data-theme="light"] .wishlist-podium-card.rank-1 {
      border-color: rgba(93,112,215,.18) !important;
      background: rgba(244,246,253,.82) !important;
    }
    html[data-theme="light"] .wishlist-podium-rank {
      color: #38435a !important;
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(252,253,255,.90) !important;
    }
    html[data-theme="light"] .rank-1 .wishlist-podium-rank {
      color: #40528f !important;
      border-color: rgba(93,112,215,.20) !important;
      background: rgba(239,242,253,.94) !important;
    }
    html[data-theme="light"] .ranking-page .wishlist-ranking-list,
    html[data-theme="light"] .wishlist-ranking-retired-list {
      border-color: rgba(31,37,48,.065) !important;
      background: rgba(255,255,255,.34) !important;
    }
    html[data-theme="light"] .ranking-page .wishlist-ranking-empty {
      border-color: rgba(31,37,48,.09) !important;
      background: rgba(255,255,255,.34) !important;
    }
    html[data-theme="light"] .wishlist-rank-completed {
      color: #687282 !important;
      border-color: rgba(31,37,48,.075) !important;
      background: rgba(31,37,48,.025) !important;
    }

  `;

  const style = document.createElement('style');
  style.id = 'newanimeThemeStyles';
  style.textContent = css;
  document.head.appendChild(style);

  function safeGet() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return VALID.has(value) ? value : 'system';
    } catch (_) {
      return 'system';
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

  function syncLogo(theme) {
    const expected = theme === 'light' ? LIGHT_LOGO_SRC : DARK_LOGO_SRC;
    document.querySelectorAll('img.brand-logo').forEach(img => {
      if (img.getAttribute('src') !== expected) img.setAttribute('src', expected);
    });
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
    syncLogo(theme);
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

  function settingsCopy() {
    return COPY[language()] || COPY.ko;
  }

  function closeSiteMenuForSettings() {
    const menu = document.getElementById('siteMenu');
    const toggle = document.getElementById('menuToggle');
    if (menu) menu.classList.add('hidden');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function createSettingsMenuButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'site-menu-item';
    button.id = 'settingsMenuButton';
    button.setAttribute('role', 'menuitem');
    button.innerHTML = `
      <span class="site-menu-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"></path>
        </svg>
      </span>
      <span class="settings-menu-label">SETTINGS</span>
    `;
    return button;
  }

  function createSettingsModal() {
    const modal = document.createElement('div');
    modal.className = 'settings-modal';
    modal.id = 'settingsModal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="settings-modal-backdrop" data-settings-close></div>
      <section class="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="settingsDialogTitle" tabindex="-1">
        <div class="settings-dialog-head">
          <div>
            <div class="settings-kicker" data-settings-kicker>SETTINGS</div>
            <h2 id="settingsDialogTitle" data-settings-title>Settings</h2>
            <p class="settings-description" data-settings-description></p>
          </div>
          <button class="settings-close" type="button" data-settings-close aria-label="Close">×</button>
        </div>
        <div class="settings-section">
          <h3 class="settings-section-title" data-theme-heading>Theme</h3>
          <p class="settings-section-description" data-theme-description></p>
          <div class="settings-theme-options">
            ${['system', 'light', 'dark'].map(key => `
              <button class="theme-choice settings-theme-choice" type="button" data-theme-choice="${key}" aria-pressed="false">
                <span class="theme-choice-icon">${icons[key]}</span>
                <span class="settings-choice-copy">
                  <strong data-theme-label="${key}">${key}</strong>
                  <small data-theme-option-description="${key}"></small>
                </span>
                <span class="settings-choice-state" aria-hidden="true">✓</span>
              </button>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    return modal;
  }

  function updateSettingsCopy() {
    const copy = settingsCopy();
    const menuLabel = document.querySelector('#settingsMenuButton .settings-menu-label');
    if (menuLabel && menuLabel.textContent !== copy.settings) menuLabel.textContent = copy.settings;
    const menuButton = document.getElementById('settingsMenuButton');
    if (menuButton && menuButton.getAttribute('aria-label') !== copy.settings) menuButton.setAttribute('aria-label', copy.settings);

    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    const bindings = [
      ['[data-settings-kicker]', copy.settings],
      ['[data-settings-title]', copy.settingsTitle],
      ['[data-settings-description]', copy.settingsDescription],
      ['[data-theme-heading]', copy.theme],
      ['[data-theme-description]', copy.themeDescription]
    ];
    bindings.forEach(([selector, value]) => {
      const node = modal.querySelector(selector);
      if (node && node.textContent !== value) node.textContent = value;
    });
    const close = modal.querySelector('.settings-close');
    if (close && close.getAttribute('aria-label') !== copy.close) close.setAttribute('aria-label', copy.close);

    ['system', 'light', 'dark'].forEach(key => {
      const button = modal.querySelector(`[data-theme-choice="${key}"]`);
      const label = button?.querySelector(`[data-theme-label="${key}"]`);
      const description = button?.querySelector(`[data-theme-option-description="${key}"]`);
      if (label && label.textContent !== copy[key]) label.textContent = copy[key];
      const descriptionKey = `${key}Description`;
      if (description && description.textContent !== copy[descriptionKey]) description.textContent = copy[descriptionKey];
      const ariaLabel = `${copy.theme}: ${copy[key]}

    /* Light theme archive hero v13: flat opaque surface, no page gradient bleed. */
    html[data-theme="light"] .archive-hero {
      background: #fbfcfd !important;
      background-image: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
`;
      if (button && button.getAttribute('aria-label') !== ariaLabel) button.setAttribute('aria-label', ariaLabel);
    });
  }

  function mountSettings() {
    document.getElementById('themeMenuControl')?.remove();
    const menu = document.getElementById('siteMenu');
    if (menu && !document.getElementById('settingsMenuButton')) {
      const button = createSettingsMenuButton();
      const share = menu.querySelector('#shareButton, [data-secondary-share], [data-share]');
      if (share) share.insertAdjacentElement('beforebegin', button);
      else menu.appendChild(button);
    }
    if (document.body && !document.getElementById('settingsModal')) {
      document.body.appendChild(createSettingsModal());
    }
    updateSettingsCopy();
    syncControls();
    return document.getElementById('settingsModal');
  }

  function openSettings() {
    const modal = mountSettings();
    if (!modal) return;
    closeSiteMenuForSettings();
    modal.hidden = false;
    document.body?.classList.add('settings-modal-open');
    requestAnimationFrame(() => modal.querySelector('.settings-dialog')?.focus());
  }

  function closeSettings({ restoreFocus = false } = {}) {
    const modal = document.getElementById('settingsModal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body?.classList.remove('settings-modal-open');
    if (restoreFocus) document.getElementById('settingsMenuButton')?.focus();
  }

  document.addEventListener('click', event => {
    const settingsButton = event.target.closest('#settingsMenuButton');
    if (settingsButton) {
      event.preventDefault();
      event.stopPropagation();
      openSettings();
      return;
    }

    const closeButton = event.target.closest('[data-settings-close]');
    if (closeButton) {
      event.preventDefault();
      closeSettings();
      return;
    }

    const button = event.target.closest('[data-theme-choice]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    apply(button.dataset.themeChoice, { persist: true });
  }, true);

  document.addEventListener('keydown', event => {
    const modal = document.getElementById('settingsModal');
    if (event.key !== 'Escape' || !modal || modal.hidden) return;
    event.preventDefault();
    closeSettings({ restoreFocus: true });
  }, true);

  document.addEventListener('newanime:language', updateSettingsCopy);

  new MutationObserver(updateSettingsCopy).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  const settingsObserver = new MutationObserver(() => {
    const missingMenuButton = document.getElementById('siteMenu') && !document.getElementById('settingsMenuButton');
    const missingModal = document.body && !document.getElementById('settingsModal');
    if (missingMenuButton || missingModal || document.getElementById('themeMenuControl')) mountSettings();
  });
  if (document.body) settingsObserver.observe(document.body, { childList: true, subtree: true });

  systemDark?.addEventListener?.('change', () => {
    if (preference === 'system') apply('system', { persist: false });
  });

  apply(preference, { persist: false, notify: false });
  mountSettings();

  window.NewAnimeTheme = Object.freeze({
    ready: true,
    get preference() { return preference; },
    get theme() { return resolved(preference); },
    set: next => apply(next, { persist: true }),
    refresh: () => {
      apply(preference, { persist: false });
      mountSettings();
    },
    openSettings,
    closeSettings
  });
})();