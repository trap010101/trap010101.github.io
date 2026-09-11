from pathlib import Path
import re

THEME = Path('theme.js')
source = THEME.read_text(encoding='utf-8')

old_copy = """  const COPY = {
    ko: { theme: '테마', system: '시스템', light: '라이트', dark: '다크' },
    ja: { theme: 'テーマ', system: 'システム', light: 'ライト', dark: 'ダーク' },
    en: { theme: 'Theme', system: 'System', light: 'Light', dark: 'Dark' }
  };
"""
new_copy = """  const COPY = {
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
"""
if old_copy not in source:
    raise RuntimeError('COPY block not found')
source = source.replace(old_copy, new_copy, 1)

settings_css_marker = '    .theme-menu-control {'
settings_css = r'''    .settings-modal[hidden] { display: none !important; }
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

'''
if settings_css_marker not in source:
    raise RuntimeError('theme CSS marker not found')
source = source.replace(settings_css_marker, settings_css + settings_css_marker, 1)

light_refine_marker = '''    @media (max-width: 520px) {
      .theme-menu-control { padding: 8px; }
      .theme-choice { min-height: 30px; padding-inline: 5px; }
      .theme-choice-label { font-size: 8px; }
    }
'''
light_refine = r'''    /* Light theme refinement v2: neutral surfaces, clearer hierarchy and component parity. */
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
        radial-gradient(circle at 11% 4%, rgba(113,94,215,.055), transparent 28rem),
        radial-gradient(circle at 92% 14%, rgba(72,137,219,.045), transparent 32rem),
        linear-gradient(180deg, #fafbfc 0%, #f6f7f9 48%, #f8f9fb 100%) !important;
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
      filter: brightness(.56) saturate(.92) contrast(1.12) drop-shadow(0 1px 0 rgba(255,255,255,.5)) !important;
    }
    html[data-theme="light"] .hero,
    html[data-theme="light"] .archive-hero,
    html[data-theme="light"] .detail-hero-card,
    html[data-theme="light"] .ranking-page .hero {
      border-color: rgba(31,37,48,.095) !important;
      background:
        linear-gradient(135deg, rgba(108,91,205,.055), rgba(73,125,195,.025)),
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
        radial-gradient(circle at 90% 0%, rgba(93,112,215,.055), transparent 17rem),
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
        radial-gradient(circle at 18% -10%, rgba(93,112,215,.085), transparent 38%),
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

    @media (max-width: 520px) {
      .settings-modal { padding: 16px; }
      .settings-dialog { width: min(360px, calc(100vw - 24px)); padding: 19px; border-radius: 22px; }
      .settings-dialog .theme-choice { min-height: 52px; padding: 8px 10px; }
      .settings-description { max-width: 250px; }
    }
'''
if light_refine_marker not in source:
    raise RuntimeError('light refine media marker not found')
source = source.replace(light_refine_marker, light_refine, 1)

start = source.find('  function updateControlCopy(control) {')
end = source.find("  systemDark?.addEventListener?.('change', () => {", start)
if start < 0 or end < 0:
    raise RuntimeError('theme control JS block not found')

settings_js = r'''  function settingsCopy() {
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
      const ariaLabel = `${copy.theme}: ${copy[key]}`;
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

'''
source = source[:start] + settings_js + source[end:]
source = source.replace("preference = VALID.has(next) ? next : 'system';", "preference = VALID.has(next) ? next : 'dark';", 1)
source = source.replace('  mountControl();\n\n  window.NewAnimeTheme', '  mountSettings();\n\n  window.NewAnimeTheme', 1)
source = source.replace("      mountControl();\n    }\n  });", "      mountSettings();\n    },\n    openSettings,\n    closeSettings\n  });", 1)

THEME.write_text(source, encoding='utf-8')

# Keep settings immediately before SHARE in any menu normalizer.
for filename in ('menu-order.js', 'secondary-menu-order.js'):
    path = Path(filename)
    if not path.exists():
        continue
    text = path.read_text(encoding='utf-8')
    text = text.replace("#themeMenuControl", "#settingsMenuButton")
    if filename == 'menu-order.js' and "directChild(menu, '#settingsMenuButton')" not in text:
        text = text.replace(
            "      directChild(menu, 'a[href^=\"mailto:\"]'),\n      directChild(menu, '#shareButton, [data-secondary-share], [data-share]')",
            "      directChild(menu, 'a[href^=\"mailto:\"]'),\n      directChild(menu, '#settingsMenuButton'),\n      directChild(menu, '#shareButton, [data-secondary-share], [data-share]')"
        )
    path.write_text(text, encoding='utf-8')

# Bump shared loader cache keys everywhere, including static-page generators.
lang_re = re.compile(r'/language-switcher-compact\.js\?v=[^"\']+')
header_re = re.compile(r'/secondary-header\.js\?v=[^"\']+')
for path in Path('.').rglob('*'):
    if not path.is_file() or path.suffix not in {'.html', '.js'}:
        continue
    if any(part in {'.git', 'node_modules'} for part in path.parts):
        continue
    text = path.read_text(encoding='utf-8')
    updated = lang_re.sub('/language-switcher-compact.js?v=20260911-theme4', text)
    updated = header_re.sub('/secondary-header.js?v=20260911-theme4', updated)
    updated = updated.replace('/theme.js?v=20260911-theme3', '/theme.js?v=20260911-theme4')
    updated = updated.replace('/theme.js?v=20260911-theme2', '/theme.js?v=20260911-theme4')
    if updated != text:
        path.write_text(updated, encoding='utf-8')
