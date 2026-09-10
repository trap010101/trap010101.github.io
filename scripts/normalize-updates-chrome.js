const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'updates', 'index.html');

if (!fs.existsSync(TARGET)) throw new Error('updates/index.html not found');

const LOGO_SRC = '/assets/newanime-logo.svg?v=20260909-logo2';
const FAVICON_SRC = '/favicon-32x32.png?v=20260909-icon1';
const MENU_STYLE = '/menu-mobile-refine.css?v=20260906-menu1';
const GOOGLE_STYLE = '/google-login-button-fit.css?v=20260908-1';
const BOOTSTRAP_SRC = '/updates-account-bootstrap.js?v=20260910-shell1';

function ensureStylesheet(html, href) {
  const pathname = href.split('?')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<link[^>]+href=["']${pathname}(?:\\?[^"']*)?["'][^>]*>`, 'i');
  if (pattern.test(html)) return html.replace(pattern, `  <link rel="stylesheet" href="${href}" />`);
  return html.replace('</head>', `  <link rel="stylesheet" href="${href}" />\n</head>`);
}

function ensurePreload(html) {
  const logoPath = '/assets/newanime-logo.svg';
  if (html.includes(`href="${logoPath}`) && html.includes('rel="preload"')) return html;
  const preload = `  <link rel="preload" as="image" href="${LOGO_SRC}" type="image/svg+xml" fetchpriority="high" />\n`;
  const marker = '  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>';
  if (html.includes(marker)) return html.replace(marker, preload + marker);
  return html.replace('</head>', preload + '</head>');
}

function normalizeHead(html) {
  html = html.replace(/\s*<link rel="icon"[^>]*>/i, `\n  <link rel="icon" type="image/png" sizes="32x32" href="${FAVICON_SRC}" />`);
  html = ensurePreload(html);
  html = ensureStylesheet(html, MENU_STYLE);
  html = ensureStylesheet(html, GOOGLE_STYLE);
  return html;
}

function normalizeHeader(html) {
  html = html.replace(
    /<img class="brand-logo"[^>]*>/i,
    `<img class="brand-logo" src="${LOGO_SRC}" alt="NewAnime" width="1518" height="300" decoding="async" fetchpriority="high" />`
  );
  html = html.replace(/class="site-menu-item is-current"/g, 'class="site-menu-item"');
  return html;
}

function sharedFooter() {
  return `    <footer>\n      <div id="footerDescription">방영 예정 애니메이션과 극장판의 일정, PV, 공식 사이트, 스트리밍 정보를 한눈에 정리합니다.</div>\n      <nav class="site-footer-links" aria-label="Site information">\n        <a id="archiveFooterLink" href="/2026/">ARCHIVE</a>\n        <a href="/updates/" aria-current="page">UPDATES</a>\n        <a href="/about/">ABOUT</a>\n        <a href="/privacy/">PRIVACY</a>\n        <a href="/policy/">POLICY</a>\n        <a href="mailto:admin@newani.me">CONTACT</a>\n      </nav>\n      <div id="footerCopyright">© 2026 NewAnime</div>\n    </footer>`;
}

function normalizeFooter(html) {
  return html.replace(/\s*<footer>[\s\S]*?<\/footer>/i, `\n${sharedFooter()}`);
}

function normalizeScripts(html) {
  html = html.replace(/\n\s*<script src="\/updates-account-bootstrap\.js\?v=[^"]+"><\/script>/g, '');
  return html.replace('</body>', `  <script src="${BOOTSTRAP_SRC}"></script>\n</body>`);
}

let html = fs.readFileSync(TARGET, 'utf8');
html = normalizeHead(html);
html = normalizeHeader(html);
html = normalizeFooter(html);
html = normalizeScripts(html);
fs.writeFileSync(TARGET, html);

console.log('Normalized updates header, footer, brand assets, and shared account/wishlist bootstrap.');
