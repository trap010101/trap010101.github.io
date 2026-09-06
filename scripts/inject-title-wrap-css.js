const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const STYLE_HREF = '/title-wrap-refine.css?v=20260906-title1';
const STYLE_LINK = `  <link rel="stylesheet" href="${STYLE_HREF}" />\n`;
const TARGET_ROOTS = ['anime', '2026', '2027'];

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

let changed = updateFile(path.join(ROOT, 'index.html')) ? 1 : 0;
for (const target of TARGET_ROOTS) changed += walk(path.join(ROOT, target));

console.log(`Applied anime title wrapping stylesheet to ${changed} pages.`);
