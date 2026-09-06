const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://newani.me';
const OUT_DIR = path.join(ROOT, 'anime');

const runtime = {
  window: {},
  document: {
    readyState: 'loading',
    addEventListener() {},
    getElementById() { return null; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    head: { appendChild() {} },
    createElement() { return { style: {}, setAttribute() {}, appendChild() {} }; },
    documentElement: { lang: 'ko' }
  },
  URL,
  Intl,
  Date,
  console
};
runtime.window.window = runtime.window;
runtime.globalThis = runtime;
vm.createContext(runtime);

const sourceFiles = [
  'data/anime.js',
  'data/anime-20260904.js',
  'data/title-fixes-20260905.js',
  'data/poster-fixes-20260905.js',
  'data/official-sites-20260905.js',
  'data/pvs.js',
  'data/pvs-audit-20260905.js',
  'data/platforms.js',
  'data/streaming-policy-20260905.js'
];

for (const relative of sourceFiles) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) continue;
  vm.runInContext(fs.readFileSync(filename, 'utf8'), runtime, { filename: relative });
}

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function primaryRelease(anime) {
  return anime?.release?.japan || anime?.release?.global || anime?.release?.korea || null;
}

function archiveNodes(anime) {
  const release = primaryRelease(anime);
  if (!release?.year) return [];

  const nodes = [
    { name: String(release.year), href: `/${release.year}/` }
  ];

  if (release.month && ['date', 'month'].includes(release.status)) {
    const mm = String(release.month).padStart(2, '0');
    nodes.push({ name: mm, href: `/${release.year}/${mm}/` });
  } else if (['year', 'tba'].includes(release.status)) {
    nodes.push({ name: 'TBA', href: `/${release.year}/tba/` });
  }

  return nodes;
}

function breadcrumbMarkup(nodes) {
  if (!nodes.length) return '';
  return `<nav class="detail-breadcrumb" aria-label="Schedule navigation">
      <a href="/">HOME</a>
      ${nodes.map(node => `<span class="detail-breadcrumb-separator" aria-hidden="true">›</span><a href="${esc(node.href)}">${esc(node.name)}</a>`).join('')}
    </nav>`;
}

function breadcrumbJsonLd(anime, nodes) {
  if (!nodes.length) return null;
  const canonical = `${SITE}/anime/${encodeURIComponent(anime.id)}/`;
  const items = [
    { '@type': 'ListItem', position: 1, name: 'NewAnime', item: `${SITE}/` }
  ];
  nodes.forEach((node, index) => {
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: node.name,
      item: `${SITE}${node.href}`
    });
  });
  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: anime.title?.ko || anime.title?.ja || anime.title?.en || anime.id,
    item: canonical
  });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

let enhanced = 0;
for (const anime of animeData) {
  if (!anime?.id) continue;
  const pagePath = path.join(OUT_DIR, anime.id, 'index.html');
  if (!fs.existsSync(pagePath)) continue;

  const nodes = archiveNodes(anime);
  if (!nodes.length) continue;

  let html = fs.readFileSync(pagePath, 'utf8');
  const breadcrumb = breadcrumbMarkup(nodes);
  const jsonLd = breadcrumbJsonLd(anime, nodes);

  if (!html.includes('/anime-breadcrumb.css')) {
    html = html.replace(
      /(<link rel="stylesheet" href="\/anime-detail\.css\?[^>]+>)/,
      `$1\n  <link rel="stylesheet" href="/anime-breadcrumb.css?v=20260906-seo3" />`
    );
  }

  if (!html.includes('class="detail-breadcrumb"')) {
    html = html.replace(
      /(<a class="detail-back"[\s\S]*?<\/a>)/,
      `$1\n    ${breadcrumb}`
    );
  }

  if (jsonLd && !html.includes('"@type":"BreadcrumbList"')) {
    html = html.replace(
      /(<script type="application\/ld\+json">[\s\S]*?<\/script>)/,
      `$1\n  <script type="application/ld+json">${safeJson(jsonLd)}</script>`
    );
  }

  fs.writeFileSync(pagePath, html);
  enhanced += 1;
}

console.log(`Enhanced ${enhanced} anime detail pages with schedule breadcrumbs.`);
