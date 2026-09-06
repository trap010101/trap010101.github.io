const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const htmlFiles = [
  'index.html',
  'updates/index.html',
  'about/index.html',
  'privacy/index.html',
  'policy/index.html'
];

function normalizeXDefault(html) {
  return html.replace(
    /(<link rel="alternate" hreflang="x-default" href="https:\/\/newani\.me\/[^"?]*(?:\/?)(?:\?lang=))en(" \/>)/g,
    '$1ko$2'
  );
}

for (const relative of htmlFiles) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) continue;
  let html = fs.readFileSync(filename, 'utf8');
  html = normalizeXDefault(html);

  if (relative === 'index.html' && !/<a href="\/updates\/">UPDATES<\/a>/.test(html)) {
    html = html.replace(
      '<a href="/2027/">2027</a>\n        <a href="/about/">ABOUT</a>',
      '<a href="/2027/">2027</a>\n        <a href="/updates/">UPDATES</a>\n        <a href="/about/">ABOUT</a>'
    );
  }

  fs.writeFileSync(filename, html);
}

const sitemapPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(
    /(hreflang="x-default" href="https:\/\/newani\.me\/[^"?]*(?:\/?)(?:\?lang=))en(" \/>)/g,
    '$1ko$2'
  );
  fs.writeFileSync(sitemapPath, sitemap);
}

console.log('Normalized x-default language to Korean and ensured homepage archive links.');
