const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLE_HREF = '/title-wrap-refine.css?v=20260906-title2';
const DETAIL_STYLE_HREF = '/anime-detail.css?v=20260908-ui1';
const ARCHIVE_STYLE_HREF = '/schedule-archive.css?v=20260908-ui1';
const GOOGLE_BUTTON_STYLE_HREF = '/google-login-button-fit.css?v=20260908-1';
const SECONDARY_HEADER_STYLE_HREF = '/secondary-header.css?v=20260908-1';
const DETAIL_LANGUAGE_SCRIPT = '/language-switcher-compact.js?v=20260908-detail13';
const SECONDARY_HEADER_SCRIPT = '/secondary-header.js?v=20260908-1';
const HOMEPAGE_LINKS_SCRIPT = 'anime-links.js?v=20260908-authui10';
const TARGET_ROOTS = ['anime', '2026', '2027'];
const TARGET_FILES = [
  'index.html',
  'updates/index.html',
  'about/index.html',
  'privacy/index.html',
  'policy/index.html'
];

const DETAIL_HEADER = `    <header class="secondary-site-header">
      <a class="secondary-site-brand" data-secondary-brand href="/" aria-label="NewAnime"><img src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124"></a>
      <div class="secondary-header-spacer" aria-hidden="true"></div>
      <div class="detail-language secondary-language" id="languageSwitcher" aria-label="Language">
        <button type="button" class="active" data-lang="ko">KR</button>
        <button type="button" data-lang="ja">JP</button>
        <button type="button" data-lang="en">EN</button>
      </div>
      <div class="secondary-menu-wrap">
        <button class="secondary-menu-toggle" type="button" data-secondary-menu-toggle aria-label="메뉴" aria-expanded="false" aria-controls="secondarySiteMenu">
          <span class="secondary-menu-line" aria-hidden="true"></span>
          <span class="secondary-menu-line" aria-hidden="true"></span>
          <span class="secondary-menu-line" aria-hidden="true"></span>
        </button>
        <div class="secondary-site-menu detail-header-actions hidden" id="secondarySiteMenu" data-secondary-menu role="menu">
          <a class="secondary-menu-item" data-secondary-updates href="/updates/" role="menuitem">
            <span class="secondary-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path></svg></span>
            <span data-secondary-menu-label="updates">업데이트</span>
          </a>
          <a class="secondary-menu-item" href="mailto:admin@newani.me" role="menuitem">
            <span class="secondary-menu-icon" aria-hidden="true">@</span>
            <span data-secondary-menu-label="contact">문의</span>
          </a>
          <button class="secondary-menu-item secondary-share-item detail-share" type="button" role="menuitem" data-share>공유</button>
        </div>
      </div>
    </header>
    <div class="secondary-share-status hidden" data-secondary-share-status role="status" aria-live="polite"></div>`;

const ARCHIVE_HEADER = `    <header class="secondary-site-header">
      <a class="secondary-site-brand" data-secondary-brand href="/" aria-label="NewAnime"><img src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124"></a>
      <div class="secondary-header-spacer" aria-hidden="true"></div>
      <div class="archive-language secondary-language" id="languageSwitcher" aria-label="Language">
        <button type="button" class="active" data-lang="ko">KR</button>
        <button type="button" data-lang="ja">JP</button>
        <button type="button" data-lang="en">EN</button>
      </div>
      <div class="secondary-menu-wrap">
        <button class="secondary-menu-toggle" type="button" data-secondary-menu-toggle aria-label="메뉴" aria-expanded="false" aria-controls="secondarySiteMenu">
          <span class="secondary-menu-line" aria-hidden="true"></span>
          <span class="secondary-menu-line" aria-hidden="true"></span>
          <span class="secondary-menu-line" aria-hidden="true"></span>
        </button>
        <div class="secondary-site-menu hidden" id="secondarySiteMenu" data-secondary-menu role="menu">
          <a class="secondary-menu-item" data-secondary-updates href="/updates/" role="menuitem">
            <span class="secondary-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v5h5"></path><path d="M12 7v5l3 2"></path></svg></span>
            <span data-secondary-menu-label="updates">업데이트</span>
          </a>
          <a class="secondary-menu-item" href="mailto:admin@newani.me" role="menuitem">
            <span class="secondary-menu-icon" aria-hidden="true">@</span>
            <span data-secondary-menu-label="contact">문의</span>
          </a>
          <button class="secondary-menu-item secondary-share-item" type="button" role="menuitem" data-secondary-share data-secondary-menu-label="share">공유</button>
        </div>
      </div>
    </header>
    <div class="secondary-share-status hidden" data-secondary-share-status role="status" aria-live="polite"></div>`;

function ensureStyle(html, href) {
  const basename = href.split('?')[0].replace(/^\//, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`href="\\/?${basename}\\?v=[^"]+"`, 'g');
  if (re.test(html)) return html.replace(re, `href="${href}"`);
  if (html.includes('</head>')) return html.replace('</head>', `  <link rel="stylesheet" href="${href}" />\n</head>`);
  return html;
}

function ensureScript(html, src) {
  const basename = src.split('?')[0].replace(/^\//, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`src="\\/?${basename}\\?v=[^"]+"`, 'g');
  if (re.test(html)) return html.replace(re, `src="${src}"`);
  if (html.includes('</body>')) return html.replace('</body>', `  <script src="${src}"></script>\n</body>`);
  return html;
}

function updateFile(filename) {
  if (!fs.existsSync(filename)) return false;
  let html = fs.readFileSync(filename, 'utf8');
  const original = html;

  html = ensureStyle(html, STYLE_HREF);

  if (html.includes('class="detail-shell"')) {
    html = html.replace(/href="\/anime-detail\.css\?v=[^"]+"/g, `href="${DETAIL_STYLE_HREF}"`);
    html = html.replace(/<header class="detail-header">[\s\S]*?<\/header>/, DETAIL_HEADER);
    html = ensureStyle(html, SECONDARY_HEADER_STYLE_HREF);
    html = ensureStyle(html, GOOGLE_BUTTON_STYLE_HREF);
    html = ensureScript(html, DETAIL_LANGUAGE_SCRIPT);
    html = ensureScript(html, SECONDARY_HEADER_SCRIPT);
  }

  if (html.includes('class="archive-shell"')) {
    html = html.replace(/href="\/schedule-archive\.css\?v=[^"]+"/g, `href="${ARCHIVE_STYLE_HREF}"`);
    html = html.replace(/<header class="archive-header">[\s\S]*?<\/header>/, ARCHIVE_HEADER);
    html = ensureStyle(html, SECONDARY_HEADER_STYLE_HREF);
    html = ensureScript(html, DETAIL_LANGUAGE_SCRIPT);
    html = ensureScript(html, SECONDARY_HEADER_SCRIPT);
  }

  if (filename === path.join(ROOT, 'index.html')) {
    html = html.replace(/src="\/?anime-links\.js\?v=[^"]+"/g, `src="${HOMEPAGE_LINKS_SCRIPT}"`);
    html = ensureStyle(html, GOOGLE_BUTTON_STYLE_HREF);
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

console.log(`Applied shared UI, homepage-style secondary headers, and cache versions to ${changed} pages.`);
