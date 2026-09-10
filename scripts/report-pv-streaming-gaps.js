#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
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

function run(relative) {
  const filename = path.join(ROOT, relative);
  if (!fs.existsSync(filename)) return false;
  vm.runInContext(fs.readFileSync(filename, 'utf8'), runtime, { filename: relative });
  return true;
}

[
  'data/anime.js',
  'data/anime-20260904.js',
  'data/title-fixes-20260905.js',
  'data/title-hotfix-20260909.js',
  'data/poster-fixes-20260905.js',
  'data/official-sites-20260905.js',
  'data/pvs.js',
  'data/pvs-audit-20260905.js'
].forEach(run);

const animeData = Array.isArray(runtime.window.animeData) ? runtime.window.animeData : [];
const legacyStreaming = new Map(animeData.map(anime => [anime.id, { ...(anime.streaming || {}) }]));

[
  'data/platforms.js',
  'data/streaming-regions.js',
  'data/streaming-jp-20260906.js',
  'data/streaming-us-20260906.js',
  'data/streaming-policy-20260905.js',
  'data/streaming-kr-20260908.js'
].forEach(run);

const directPv = value => {
  if (!value || typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return (host === 'youtu.be' && url.pathname.length > 1) ||
      ((host === 'youtube.com' || host.endsWith('.youtube.com')) && url.pathname === '/watch' && url.searchParams.has('v'));
  } catch (_) {
    return false;
  }
};

const title = anime => anime?.title?.ko || anime?.title?.ja || anime?.title?.en || anime?.id || '';
const isSeriesCandidate = anime => Array.isArray(anime?.tags) && anime.tags.includes('series') && !anime.tags.includes('new');

const pvGaps = [];
const krGaps = [];
for (const anime of animeData) {
  const pvCandidates = [
    ...(Array.isArray(anime.pvs) ? anime.pvs.map(entry => entry?.url) : []),
    anime?.links?.pv
  ].filter(Boolean);
  if (!pvCandidates.some(directPv)) {
    pvGaps.push({ id: anime.id, title: title(anime), current: pvCandidates[0] || '' });
  }

  if (!isSeriesCandidate(anime)) continue;
  const previous = anime?.streamingByRegion?.kr?.previous || anime?.previousStreaming || {};
  if (Object.keys(previous).length) continue;
  const legacy = legacyStreaming.get(anime.id) || {};
  krGaps.push({ id: anime.id, title: title(anime), legacy });
}

console.log(`PV gap candidates: ${pvGaps.length}`);
for (const item of pvGaps) {
  console.log(`PV_GAP\t${item.id}\t${item.title}\t${item.current || '-'}`);
}
console.log(`KR previous-series gap candidates: ${krGaps.length}`);
for (const item of krGaps) {
  const legacy = Object.entries(item.legacy).map(([platform, url]) => `${platform}=${url}`).join(',');
  console.log(`KR_GAP\t${item.id}\t${item.title}\t${legacy || '-'}`);
}
