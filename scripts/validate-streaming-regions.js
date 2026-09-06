#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const context = {
  URL,
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
  console
};
context.window.window = context.window;
context.globalThis = context;
vm.createContext(context);

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
  if (!fs.existsSync(filename)) throw new Error(`Missing required source: ${relative}`);
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, { filename: relative });
}

const anime = Array.isArray(context.window.animeData) ? context.window.animeData : [];
const regions = Array.isArray(context.window.streamingRegionOrder) ? context.window.streamingRegionOrder : [];
const platformIds = new Set((context.window.ottPlatforms || []).map(platform => platform.id));
const isDirect = context.window.isDirectRegionalStreamingUrl;
const errors = [];
const stats = {};

if (!anime.length) errors.push('No anime data loaded.');
if (!regions.length) errors.push('No streaming regions loaded.');
if (typeof isDirect !== 'function') errors.push('Regional direct URL validator is unavailable.');

for (const regionId of regions) {
  let linkedTitles = 0;
  let linkCount = 0;

  for (const item of anime) {
    const regional = item.streamingByRegion?.[regionId];
    if (!regional || typeof regional !== 'object') {
      errors.push(`${item.id}: missing streamingByRegion.${regionId}`);
      continue;
    }

    if (Object.keys(regional.current || {}).length) {
      errors.push(`${item.id}: current-installment links are not allowed in ${regionId}`);
    }

    const previous = regional.previous || {};
    const entries = Object.entries(previous);
    if (entries.length) linkedTitles += 1;

    const urls = new Set();
    for (const [platformId, url] of entries) {
      linkCount += 1;
      if (!platformIds.has(platformId)) {
        errors.push(`${item.id}: unknown platform ${platformId} in ${regionId}`);
        continue;
      }
      if (!isDirect(regionId, platformId, url)) {
        errors.push(`${item.id}: invalid direct URL for ${regionId}/${platformId}: ${url}`);
      }
      if (urls.has(url)) errors.push(`${item.id}: duplicate ${regionId} streaming URL: ${url}`);
      urls.add(url);
    }
  }

  stats[regionId] = { linkedTitles, linkCount };
}

for (const regionId of ['jp', 'us']) {
  const meta = context.window.streamingRegionalAuditMeta?.[regionId];
  if (!meta) {
    errors.push(`Missing audit metadata for ${regionId}`);
    continue;
  }
  const expected = stats[regionId]?.linkedTitles ?? 0;
  if (meta.linkedTitles !== expected) {
    errors.push(`${regionId}: audit metadata linkedTitles=${meta.linkedTitles}, actual=${expected}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.verifiedAt || '')) {
    errors.push(`${regionId}: invalid verifiedAt`);
  }
}

console.log('Regional streaming validation:', JSON.stringify(stats));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Regional streaming validation passed.');
