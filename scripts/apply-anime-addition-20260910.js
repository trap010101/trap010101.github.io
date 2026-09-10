#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data/anime-20260904.js');
const INDEX = path.join(ROOT, 'index.html');
const MARKER = '// 2026-09-10: SSS-Class Revival Hunter addition';

if (!fs.existsSync(DATA)) throw new Error('Anime additions file not found.');

let source = fs.readFileSync(DATA, 'utf8');
if (!source.includes(MARKER)) {
  source += `\n\n${MARKER}\n(() => {\n  if (!Array.isArray(window.animeData)) return;\n  if (window.animeData.some(anime => anime?.id === 'sss-class-revival-hunter')) return;\n\n  const verifiedAt = '2026-09-10';\n  window.animeData.push({\n    id: 'sss-class-revival-hunter',\n    title: {\n      ko: 'SSS급 죽어야 사는 헌터',\n      ja: '死して生きるSSS級ハンター',\n      en: 'SSS-Class Revival Hunter'\n    },\n    aliases: [\n      'SSS급 자살헌터',\n      'SSS-Class Suicide Hunter',\n      '死して生きるSSS級ハンター'\n    ],\n    release: {\n      japan: { status: 'month', year: 2027, month: 1, day: null },\n      korea: null,\n      global: null\n    },\n    productionStatus: 'scheduled',\n    season: '2027-winter',\n    format: 'tv',\n    origin: 'web-novel',\n    tags: ['new', 'webnovel', 'webtoon'],\n    poster: null,\n    links: {\n      pv: 'https://www.youtube.com/watch?v=3Jbetkscl7k',\n      official: 'https://sss-revival.com/',\n      streaming: null\n    },\n    streaming: {},\n    verification: {\n      verifiedAt,\n      sources: [\n        {\n          type: 'official-x',\n          url: 'https://x.com/SSShunter_anime/status/2097716912893694453',\n          label: 'Official X — TV anime announcement / January 2027',\n          supports: ['announcement', 'release', 'format', 'pv'],\n          verifiedAt\n        },\n        {\n          type: 'official-site',\n          url: 'https://sss-revival.com/',\n          label: 'Official website — January 2027 TV anime',\n          supports: ['announcement', 'release', 'format'],\n          verifiedAt\n        }\n      ]\n    },\n    createdAt: verifiedAt,\n    updatedAt: verifiedAt\n  });\n})();\n`;
  fs.writeFileSync(DATA, source);
  console.log('Appended SSS-Class Revival Hunter to anime additions data.');
} else {
  console.log('SSS-Class Revival Hunter addition already present.');
}

if (fs.existsSync(INDEX)) {
  let html = fs.readFileSync(INDEX, 'utf8');
  const next = html.replace(
    /data\/anime-20260904\.js\?v=[^\"]+/g,
    'data/anime-20260904.js?v=20260910-data3'
  );
  if (next !== html) {
    fs.writeFileSync(INDEX, next);
    console.log('Bumped homepage anime additions cache key.');
  } else {
    console.log('Homepage anime additions cache key already current or not found.');
  }
}
