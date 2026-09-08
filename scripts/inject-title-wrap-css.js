const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLE_HREF = '/title-wrap-refine.css?v=20260906-title2';
const STYLE_LINK = `  <link rel="stylesheet" href="${STYLE_HREF}" />\n`;
const DETAIL_STYLE_HREF = '/anime-detail.css?v=20260908-ui1';
const ARCHIVE_STYLE_HREF = '/schedule-archive.css?v=20260908-ui1';
const DETAIL_LANGUAGE_SCRIPT = '/language-switcher-compact.js?v=20260908-detail4';
const HOMEPAGE_LINKS_SCRIPT = 'anime-links.js?v=20260908-authui2';
const TARGET_ROOTS = ['anime', '2026', '2027'];
const TARGET_FILES = [
  'index.html',
  'updates/index.html',
  'about/index.html',
  'privacy/index.html',
  'policy/index.html'
];

function updateFile(filename) {
  if (!fs.existsSync(filename)) return false;
  let html = fs.readFileSync(filename, 'utf8');
  const original = html;

  if (/href="\/title-wrap-refine\.css\?v=[^"]+"/.test(html)) {
    html = html.replace(
      /href="\/title-wrap-refine\.css\?v=[^"]+"/g,
      `href="${STYLE_HREF}"`
    );
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', `${STYLE_LINK}</head>`);
  }

  if (html.includes('class="detail-shell"')) {
    html = html.replace(
      /href="\/anime-detail\.css\?v=[^"]+"/g,
      `href="${DETAIL_STYLE_HREF}"`
    );
    html = html.replace(
      /src="\/language-switcher-compact\.js\?v=[^"]+"/g,
      `src="${DETAIL_LANGUAGE_SCRIPT}"`
    );
  }

  if (html.includes('class="archive-shell"')) {
    html = html.replace(
      /href="\/schedule-archive\.css\?v=[^"]+"/g,
      `href="${ARCHIVE_STYLE_HREF}"`
    );
  }

  if (filename === path.join(ROOT, 'index.html')) {
    html = html.replace(
      /src="\/?anime-links\.js\?v=[^"]+"/g,
      `src="${HOMEPAGE_LINKS_SCRIPT}"`
    );
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
    if (entry.isDirectory()) {
      changed += walk(fullPath);
    } else if (entry.isFile() && entry.name === 'index.html') {
      changed += updateFile(fullPath) ? 1 : 0;
    }
  }
  return changed;
}

let changed = 0;
for (const relative of TARGET_FILES) {
  changed += updateFile(path.join(ROOT, relative)) ? 1 : 0;
}
for (const target of TARGET_ROOTS) changed += walk(path.join(ROOT, target));

console.log(`Applied shared text wrapping and secondary UI cache versions to ${changed} pages.`);
