const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLE_HREF = '/title-wrap-refine.css?v=20260906-title2';
const STYLE_LINK = `  <link rel="stylesheet" href="${STYLE_HREF}" />\n`;
const DETAIL_STYLE_HREF = '/anime-detail.css?v=20260908-ui2';
const ARCHIVE_STYLE_HREF = '/schedule-archive.css?v=20260908-ui1';
const SITE_CHROME_STYLE_HREF = '/site-chrome.css?v=20260909-4';
const MENU_MOBILE_STYLE_HREF = '/menu-mobile-refine.css?v=20260906-menu1';
const SECONDARY_HEADER_SCRIPT = '/secondary-header.js?v=20260908-4';
const SECONDARY_SCALE_STYLE_HREF = '/secondary-scale.css?v=20260909-3';
const SECONDARY_MENU_ORDER_SCRIPT = '/secondary-menu-order.js?v=20260908-2';
const SECONDARY_AUTH_BOOTSTRAP_SCRIPT = '/secondary-auth-bootstrap.js?v=20260909-18';
const GOOGLE_BUTTON_STYLE_HREF = '/google-login-button-fit.css?v=20260908-1';
const GOOGLE_BUTTON_STYLE_LINK = `  <link rel="stylesheet" href="${GOOGLE_BUTTON_STYLE_HREF}" />\n`;
const DETAIL_LANGUAGE_SCRIPT = '/language-switcher-compact.js?v=20260908-detail14';
const HOMEPAGE_LINKS_SCRIPT = 'anime-links.js?v=20260909-authui22';
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

function homepageHeaderMarkup(kind) {
  const shareExtra = kind === 'archive' ? ' data-secondary-share' : '';
  return `    <header class="site-header">\n      <a class="site-brand" href="/" aria-label="NewAnime">\n        <img class="brand-logo" src="/assets/newanime-logo.webp" alt="NewAnime" width="500" height="124" decoding="async" fetchpriority="high" />\n      </a>\n      <div class="site-header-spacer" aria-hidden="true"></div>\n      <div class="language-row" id="languageSwitcher" aria-label="언어 선택">\n        <button class="language-btn active" type="button" data-lang="ko">KR</button>\n        <button class="language-btn" type="button" data-lang="ja">JP</button>\n        <button class="language-btn" type="button" data-lang="en">EN</button>\n      </div>\n      <div class="menu-wrap">\n        <button class="menu-toggle" id="menuToggle" type="button" aria-label="메뉴" aria-expanded="false" aria-controls="siteMenu">\n          <span class="menu-toggle-line" aria-hidden="true"></span>\n          <span class="menu-toggle-line" aria-hidden="true"></span>\n          <span class="menu-toggle-line" aria-hidden="true"></span>\n        </button>\n        <div class="site-menu hidden" id="siteMenu" data-secondary-menu role="menu">\n          <a class="site-menu-item" href="/updates/" role="menuitem" id="updatesMenuLink" data-secondary-updates>\n            <span class="site-menu-icon" aria-hidden="true">\n              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">\n                <path d="M3 12a9 9 0 1 0 3-6.7"></path>\n                <path d="M3 4v5h5"></path>\n                <path d="M12 7v5l3 2"></path>\n              </svg>\n            </span>\n            <span id="updatesMenuLabel">UPDATES</span>\n          </a>\n          <a class="site-menu-item" href="mailto:admin@newani.me" role="menuitem">\n            <span class="site-menu-icon" aria-hidden="true">@</span>\n            <span id="contactMenuLabel">CONTACT</span>\n          </a>\n          <button class="site-menu-item" id="shareButton" type="button" role="menuitem"${shareExtra}>\n            <span class="site-menu-icon" aria-hidden="true">↗</span>\n            <span id="shareMenuLabel">SHARE</span>\n          </button>\n        </div>\n      </div>\n    </header>\n    <div class="share-status hidden" id="shareStatus" role="status" aria-live="polite"></div>`;
}

function homepageFooterMarkup(year = '2026') {
  return `    <footer>\n      <div id="footerDescription">방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.</div>\n      <nav class="site-footer-links" aria-label="Site information">\n        <a id="archiveFooterLink" href="/${year}/">ARCHIVE</a>\n        <a href="/updates/">UPDATES</a>\n        <a href="/about/">ABOUT</a>\n        <a href="/privacy/">PRIVACY</a>\n        <a href="/policy/">POLICY</a>\n        <a href="mailto:admin@newani.me">CONTACT</a>\n      </nav>\n      <div id="footerCopyright">© 2026 NewAnime</div>\n    </footer>`;
}

function pageYear(html, filename) {
  const relative = path.relative(ROOT, filename).replace(/\\/g, '/');
  const pathMatch = relative.match(/^(2026|2027)(?:\/|$)/);
  if (pathMatch) return pathMatch[1];
  const breadcrumb = html.match(/href="\/(2026|2027)\/"/);
  return breadcrumb?.[1] || '2026';
}

function normalizeSecondaryChrome(html, kind, filename) {
  const header = homepageHeaderMarkup(kind);
  const headerPattern = /\s*<header class="(?:detail-header|archive-header|secondary-site-header|site-header)[^"]*">[\s\S]*?<\/header>\s*(?:<div class="(?:secondary-share-status|share-status)[^>]*>[\s\S]*?<\/div>)?/;
  if (headerPattern.test(html)) html = html.replace(headerPattern, `\n${header}`);

  const footerPattern = /\s*<footer(?: class="(?:detail-footer|archive-footer)")?>[\s\S]*?<\/footer>/;
  if (footerPattern.test(html)) html = html.replace(footerPattern, `\n${homepageFooterMarkup(pageYear(html, filename))}`);

  html = ensureStyle(html, SITE_CHROME_STYLE_HREF, /href="\/site-chrome\.css\?v=[^"]+"/g);
  html = ensureStyle(html, MENU_MOBILE_STYLE_HREF, /href="\/menu-mobile-refine\.css\?v=[^"]+"/g);
  html = ensureStyle(html, SECONDARY_SCALE_STYLE_HREF, /href="\/secondary-scale\.css\?v=[^"]+"/g);
  html = ensureScript(html, SECONDARY_HEADER_SCRIPT, /src="\/secondary-header\.js\?v=[^"]+"/g);
  html = ensureScript(html, SECONDARY_MENU_ORDER_SCRIPT, /src="\/secondary-menu-order\.js\?v=[^"]+"/g);
  html = ensureScript(html, SECONDARY_AUTH_BOOTSTRAP_SCRIPT, /src="\/secondary-auth-bootstrap\.js\?v=[^"]+"/g);

  if (kind === 'detail') {
    html = html.replace(
      /document\.querySelector\('\[data-share\]'\)\.textContent = data\.copy\[lang\]\.share;/g,
      "document.getElementById('shareMenuLabel').textContent = data.copy[lang].share;"
    );
    html = html.replace(
      /document\.querySelector\('\[data-share\]'\)\?\.addEventListener\('click', async \(\) => \{/g,
      "document.getElementById('shareButton')?.addEventListener('click', async () => {"
    );
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
    html = normalizeSecondaryChrome(html, 'detail', filename);
  }

  if (html.includes('class="archive-shell"')) {
    html = html.replace(/href="\/schedule-archive\.css\?v=[^"]+"/g, `href="${ARCHIVE_STYLE_HREF}"`);
    html = normalizeSecondaryChrome(html, 'archive', filename);
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

console.log(`Applied shared text wrapping and homepage chrome to ${changed} pages.`);
