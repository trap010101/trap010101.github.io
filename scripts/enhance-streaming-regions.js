const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const ANIME_DIR = path.join(ROOT, 'anime');

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
  'data/streaming-regions.js',
  'data/streaming-jp-20260906.js',
  'data/streaming-us-20260906.js',
  'data/streaming-policy-20260905.js'
];

for (const relative of sourceFiles) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) continue;
  vm.runInContext(fs.readFileSync(filename, 'utf8'), runtime, { filename: relative });
}

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];
const animeById = new Map(animeData.filter(anime => anime?.id).map(anime => [anime.id, anime]));
const platformNames = Object.fromEntries(
  (runtime.window.ottPlatforms || []).map(platform => [platform.id, platform.name])
);

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

let updated = 0;
for (const [animeId, anime] of animeById) {
  const filename = path.join(ANIME_DIR, animeId, 'index.html');
  if (!fs.existsSync(filename)) continue;

  let html = fs.readFileSync(filename, 'utf8');
  const match = html.match(/<script>window\.ANIME_DETAIL=(\{[\s\S]*?\});<\/script>/);
  if (!match) continue;

  let detail;
  try {
    detail = JSON.parse(match[1]);
  } catch (error) {
    console.warn(`Could not parse ANIME_DETAIL for ${animeId}:`, error.message);
    continue;
  }

  detail.streamingByRegion = anime.streamingByRegion || {
    kr: { current: {}, previous: anime.previousStreaming || {} },
    jp: { current: {}, previous: {} },
    us: { current: {}, previous: {} }
  };
  detail.streamingRegionOrder = runtime.window.streamingRegionOrder || ['kr', 'jp', 'us'];
  detail.streamingRegions = runtime.window.streamingRegions || {};
  detail.streamingPlatformNames = platformNames;
  detail.streamingAuditMeta = runtime.window.streamingRegionalAuditMeta || {};

  html = html.replace(match[0], `<script>window.ANIME_DETAIL=${safeJson(detail)};</script>`);

  // Country detection must execute before the detail region UI reads its default.
  if (!html.includes('/streaming-region-country-default.js')) {
    const countryScript = '  <script src="/streaming-region-country-default.js?v=20260906-country1"></script>\n';
    if (html.includes('/detail-streaming-region.js')) {
      html = html.replace(
        /\s*<script src="\/detail-streaming-region\.js\?v=[^"]+"><\/script>/,
        `\n${countryScript}  <script src="/detail-streaming-region.js?v=20260906-region1"></script>`
      );
    } else {
      html = html.replace('</body>', `${countryScript}  <script src="/detail-streaming-region.js?v=20260906-region1"></script>\n</body>`);
    }
  } else {
    html = html.replace(
      /<script src="\/streaming-region-country-default\.js\?v=[^"]+"><\/script>/g,
      '<script src="/streaming-region-country-default.js?v=20260906-country1"></script>'
    );
  }

  if (!html.includes('/detail-streaming-region.js')) {
    html = html.replace(
      '</body>',
      '  <script src="/detail-streaming-region.js?v=20260906-region1"></script>\n</body>'
    );
  }

  if (html.includes('/streaming-region-compact.js')) {
    html = html.replace(
      /<script src="\/streaming-region-compact\.js\?v=[^"]+"><\/script>/g,
      '<script src="/streaming-region-compact.js?v=20260906-region4"></script>'
    );
  } else {
    html = html.replace(
      '</body>',
      '  <script src="/streaming-region-compact.js?v=20260906-region4"></script>\n</body>'
    );
  }

  fs.writeFileSync(filename, html);
  updated += 1;
}

console.log(`Enhanced ${updated} anime detail pages with regional streaming data.`);
