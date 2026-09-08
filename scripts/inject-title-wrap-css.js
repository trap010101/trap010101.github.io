const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLE_HREF = '/title-wrap-refine.css?v=20260906-title2';
const STYLE_LINK = `  <link rel="stylesheet" href="${STYLE_HREF}" />\n`;
const DETAIL_STYLE_HREF = '/anime-detail.css?v=20260908-ui2';
const ARCHIVE_STYLE_HREF = '/schedule-archive.css?v=20260908-ui1';
const SECONDARY_HEADER_STYLE_HREF = '/secondary-header.css?v=20260908-1';
const SECONDARY_HEADER_SCRIPT = '/secondary-header.js?v=20260908-1';
const SECONDARY_SCALE_STYLE_HREF = '/secondary-scale.css?v=20260908-2';
const SECONDARY_MENU_INTEGRATION_STYLE_HREF = '/secondary-menu-integrations.css?v=20260908-1';
const SECONDARY_MENU_ORDER_SCRIPT = '/secondary-menu-order.js?v=20260908-1';
const SECONDARY_AUTH_BOOTSTRAP_SCRIPT = '/secondary-auth-bootstrap.js?v=20260908-1';
const GOOGLE_BUTTON_STYLE_HREF = '/google-login-button-fit.css?v=20260908-1';
const GOOGLE_BUTTON_STYLE_LINK = `  <link rel="stylesheet" href="${GOOGLE_BUTTON_STYLE_HREF}" />\n`;
const DETAIL_LANGUAGE_SCRIPT = '/language-switcher-compact.js?v=20260908-detail13';
const HOMEPAGE_LINKS_SCRIPT = 'anime-links.js?v=20260908-authui10';
const TARGET_ROOTS = ['anime', '2026', '2027'];
const TARGET_FILES = [
  'index.html',
  'updates/index.html',
  'about/index.html',
  'privacy/index.html',
  'policy/index.html'
];

function ensureStyle(html, href, pattern) {
  if (pattern.test(html)) return html.replace(pattern, `href="${href}"`);
  if (html.includes('</head>')) return html.replace('</head>', `  <link rel="stylesheet" href="${href}" />\n</head>`);
  return html;
}

function ensureScript(html, src, pattern) {
  if (pattern.test(html)) return html.replace(pattern, `src="${src}"`);
  if (html.includes('</body>')) return html.replace('</body>', `  <script src="${src}"></script>\n</body>`);
  return html;
}

function ensureGoogleButtonStyle(html) {
  if (/href="\/google-login-button-fit\.css\?v=[^"]+"/.test(html)) {
    return html.replace(
      /href="\/google-login-button-fit\.css\?v=[^"]+"/g,
      `href="${GOOGLE_BUTTON_STYLE_HREF}"`
    );
  }
  if (html.includes('</head>')) return html.replace('</head>', `${GOOGLE_BUTTON_STYLE_LINK}</head>`);
  return html;
}

function detailHeaderMarkup() {
  return `    <header class="secondary-site-header">\n      <a class="secondary-site-brand" data-secondary-brand href="/" aria-label="NewAnime"><img src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124"></a>\n      <div class="secondary-header-spacer" aria-hidden="true"></div>\n      <div class="detail-language secondary-language" id="languageSwitcher" aria-label="Language">\n        <button type="button" class="active" data-lang="ko">KR</button>\n        <button type="button" data-lang="ja">JP</button>\n        <button type="button" data-lang="en">EN</button>\n      </div>\n      <div class="secondary-menu-wrap">\n        <button class="secondary-menu-toggle" id="menuToggle" type="button" data-secondary-menu-toggle aria-label="메뉴" aria-expanded="false" aria-controls="siteMenu">\n          <span class="secondary-menu-line" aria-hidden="true"></span>\n          <span class="secondary-menu-line" aria-hidden="true"></span>\n          <span class="secondary-menu-line" aria-hidden="true"></span>\n        </button>\n        <div class="secondary-site-menu detail-header-actions hidden" id="siteMenu" data-secondary-menu role="menu">\n          <a class="secondary-menu-item" data-secondary-updates href="/updates/" role="menuitem">\n            <span class="secondary-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path></svg></span>\n            <span data-secondary-menu-label="updates">업데이트</span>\n          </a>\n          <a class="secondary-menu-item" href="mailto:admin@newani.me" role="menuitem">\n            <span class="secondary-menu-icon" aria-hidden="true">@</span>\n            <span data-secondary-menu-label="contact">문의</span>\n          </a>\n          <button class="secondary-menu-item secondary-share-item detail-share" type="button" role="menuitem" data-share>공유</button>\n        </div>\n      </div>\n    </header>\n    <div class="secondary-share-status hidden" data-secondary-share-status role="status" aria-live="polite"></div>`;
}

function archiveHeaderMarkup() {
  return `    <header class="secondary-site-header">\n      <a class="secondary-site-brand" data-secondary-brand href="/" aria-label="NewAnime"><img src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124"></a>\n      <div class="secondary-header-spacer" aria-hidden="true"></div>\n      <div class="archive-language secondary-language" id="languageSwitcher" aria-label="Language">\n        <button type="button" class="active" data-lang="ko">KR</button>\n        <button type="button" data-lang="ja">JP</button>\n        <button type="button" data-lang="en">EN</button>\n      </div>\n      <div class="secondary-menu-wrap">\n        <button class="secondary-menu-toggle" id="menuToggle" type="button" data-secondary-menu-toggle aria-label="메뉴" aria-expanded="false" aria-controls="siteMenu">\n          <span class="secondary-menu-line" aria-hidden="true"></span>\n          <span class="secondary-menu-line" aria-hidden="true"></span>\n          <span class="secondary-menu-line" aria-hidden="true"></span>\n        </button>\n        <div class="secondary-site-menu hidden" id="siteMenu" data-secondary-menu role="menu">\n          <a class="secondary-menu-item" data-secondary-updates href="/updates/" role="menuitem">\n            <span class="secondary-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path></svg></span>\n            <span data-secondary-menu-label="updates">업데이트</span>\n          </a>\n          <a class="secondary-menu-item" href="mailto:admin@newani.me" role="menuitem">\n            <span class="secondary-menu-icon" aria-hidden="true">@</span>\n            <span data-secondary-menu-label="contact">문의</span>\n          </a>\n          <button class="secondary-menu-item secondary-share-item" type="button" role="menuitem" data-secondary-share data-secondary-menu-label="share">공유</button>\n        </div>\n      </div>\n    </header>\n    <div class="secondary-share-status hidden" data-secondary-share-status role="status" aria-live="polite"></div>`;
}

function ensureDetailWishlistData(html) {
  if (html.includes('data-secondary-wishlist-data')) return html;
  const langPattern = /\s*<script src="\/language-switcher-compact\.js\?v=[^"]+"><\/script>/;
  const match = html.match(langPattern);
  if (!match) return html;
  const block = `\n  <script src="/data/anime.js?v=20260907-schedule1" data-secondary-wishlist-data></script>\n  <script src="/data/anime-20260904.js?v=20260905-data2" data-secondary-wishlist-data></script>\n  <script src="/data/title-fixes-20260905.js?v=20260905-title1" data-secondary-wishlist-data></script>\n  <script src="/data/poster-fixes-20260905.js?v=20260907-posters4" data-secondary-wishlist-data></script>\n  <script src="/data/schedule-updates-20260907.js?v=20260907-schedule2" data-secondary-wishlist-data></script>\n  <script src="${DETAIL_LANGUAGE_SCRIPT}"></script>`;
  return html.replace(langPattern, block);
}

function normalizeSecondaryHeader(html, kind) {
  const markup = kind === 'detail' ? detailHeaderMarkup() : archiveHeaderMarkup();
  const legacyPattern = kind === 'detail'
    ? /\s*<header class="detail-header">[\s\S]*?<\/header>/
    : /\s*<header class="archive-header">[\s\S]*?<\/header>/;
  const currentPattern = /\s*<header class="secondary-site-header">[\s\S]*?<\/header>\s*(?:<div class="secondary-share-status[^>]*>[\s\S]*?<\/div>)?/;

  if (currentPattern.test(html)) html = html.replace(currentPattern, `\n${markup}`);
  else if (legacyPattern.test(html)) html = html.replace(legacyPattern, `\n${markup}`);

  html = ensureStyle(html, SECONDARY_HEADER_STYLE_HREF, /href="\/secondary-header\.css\?v=[^"]+"/g);
  html = ensureStyle(html, SECONDARY_SCALE_STYLE_HREF, /href="\/secondary-scale\.css\?v=[^"]+"/g);
  html = ensureStyle(html, SECONDARY_MENU_INTEGRATION_STYLE_HREF, /href="\/secondary-menu-integrations\.css\?v=[^"]+"/g);
  html = ensureScript(html, SECONDARY_HEADER_SCRIPT, /src="\/secondary-header\.js\?v=[^"]+"/g);
  html = ensureScript(html, SECONDARY_MENU_ORDER_SCRIPT, /src="\/secondary-menu-order\.js\?v=[^"]+"/g);
  if (kind === 'archive') {
    html = ensureScript(html, SECONDARY_AUTH_BOOTSTRAP_SCRIPT, /src="\/secondary-auth-bootstrap\.js\?v=[^"]+"/g);
  }
  return html;
}

function updateFile(filename) {
  if (!fs.existsSync(filename)) return false;
  let html = fs.readFileSync(filename, 'utf8');
  const original = html;

  if (/href="\/title-wrap-refine\.css\?v=[^"]+"/.test(html)) {
    html = html.replace(/href="\/title-wrap-refine\.css\?v=[^"]+"/g, `href="${STYLE_HREF}"`);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', `${STYLE_LINK}</head>`);
  }

  if (html.includes('class="detail-shell"')) {
    html = html.replace(/href="\/anime-detail\.css\?v=[^"]+"/g, `href="${DETAIL_STYLE_HREF}"`);
    html = html.replace(/src="\/language-switcher-compact\.js\?v=[^"]+"/g, `src="${DETAIL_LANGUAGE_SCRIPT}"`);
    html = ensureGoogleButtonStyle(html);
    html = normalizeSecondaryHeader(html, 'detail');
    html = ensureDetailWishlistData(html);
  }

  if (html.includes('class="archive-shell"')) {
    html = html.replace(/href="\/schedule-archive\.css\?v=[^"]+"/g, `href="${ARCHIVE_STYLE_HREF}"`);
    html = normalizeSecondaryHeader(html, 'archive');
  }

  if (filename === path.join(ROOT, 'index.html')) {
    html = html.replace(/src="\/?anime-links\.js\?v=[^"]+"/g, `src="${HOMEPAGE_LINKS_SCRIPT}"`);
    html = ensureGoogleButtonStyle(html);
  }

  if (html === original) return false;
  fs.writeFileSync(filename, html);
  return true;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return 0;
  let changed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) changed += walk(fullPath);
    else if (entry.isFile() && entry.name === 'index.html') changed += updateFile(fullPath) ? 1 : 0;
  }
  return changed;
}

let changed = 0;
for (const relative of TARGET_FILES) changed += updateFile(path.join(ROOT, relative)) ? 1 : 0;
for (const target of TARGET_ROOTS) changed += walk(path.join(ROOT, target));

console.log(`Applied shared text wrapping and secondary UI cache versions to ${changed} pages.`);
