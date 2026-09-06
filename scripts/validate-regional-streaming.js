#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const runtime = {
  window: {},
  document: {
    readyState: 'loading',
    addEventListener() {}
  },
  URL,
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
  if (!fs.existsSync(filename)) {
    console.error(`Missing regional streaming source: ${relative}`);
    process.exit(1);
  }
  vm.runInContext(fs.readFileSync(filename, 'utf8'), runtime, { filename: relative });
}

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];
const regionOrder = Array.isArray(runtime.window.streamingRegionOrder)
  ? runtime.window.streamingRegionOrder
  : ['kr', 'jp', 'us'];
const platformIds = new Set((runtime.window.ottPlatforms || []).map(platform => platform.id));
const validateDirectUrl = runtime.window.isDirectRegionalStreamingUrl;

const errors = [];

if (typeof validateDirectUrl !== 'function') {
  errors.push('window.isDirectRegionalStreamingUrl is unavailable');
}

for (const anime of animeData) {
  if (!anime?.id) continue;

  const byRegion = anime.streamingByRegion || {};
  for (const regionId of regionOrder) {
    const regionData = byRegion[regionId] || { current: {}, previous: {} };
    const current = regionData.current || {};
    const previous = regionData.previous || {};

    if (Object.keys(current).length) {
      errors.push(`${anime.id}: current-installment streaming must remain empty for ${regionId}`);
    }

    for (const [platformId, url] of Object.entries(previous)) {
      if (!platformIds.has(platformId)) {
        errors.push(`${anime.id}: unknown platform ${platformId} in ${regionId}`);
        continue;
      }

      if (!url || typeof url !== 'string') {
        errors.push(`${anime.id}: invalid empty URL for ${regionId}/${platformId}`);
        continue;
      }

      if (typeof validateDirectUrl === 'function' && !validateDirectUrl(regionId, platformId, url)) {
        errors.push(`${anime.id}: invalid direct streaming URL for ${regionId}/${platformId}: ${url}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Regional streaming validation failed with ${errors.length} error(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

const auditMeta = runtime.window.streamingRegionalAuditMeta || {};
console.log(
  `Regional streaming validation passed for ${animeData.length} anime. ` +
  `JP linked: ${auditMeta.jp?.linkedTitles ?? 'n/a'}, US linked: ${auditMeta.us?.linkedTitles ?? 'n/a'}.`
);
