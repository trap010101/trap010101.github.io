#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const POLICY = path.join(ROOT, 'data/streaming-policy-20260905.js');
const INDEX = path.join(ROOT, 'index.html');
const MARKER = '// 2026-09-10 follow-up official PV audit';

const additions = {
  'tenkaichi-the-greatest-warrior-under-the-rising-sun': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=-TzkokU9NpY' }
  ],
  'the-guy-she-was-interested-in-wasnt-a-guy-at-all': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=qWJo5abhQ08' }
  ],
  'the-strongest-magicmasters-retirement-plan': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=nEnxKwK3UlY' }
  ],
  'soara-and-the-house-of-monsters': [
    { label:{ ko:'울트라 티저 PV', ja:'ウルトラティザーPV', en:'Ultra Teaser PV' }, url:'https://www.youtube.com/watch?v=3XfUJwvfVq8' }
  ],
  'dengeki-daisy': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=Xjko6DPoACU' }
  ],
  'fall-in-love-you-false-angels': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=3OCNfYqUNlQ' }
  ],
  'magic-to-the-limit-reincarnated-elf': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=7AJmItoJgoM' }
  ],
  'glasses-sometimes-yankee-kun': [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=qHM5FvelBxM' }
  ],
  lona: [
    { label:{ ko:'티저 PV', ja:'ティザーPV', en:'Teaser PV' }, url:'https://www.youtube.com/watch?v=zuhk83AZq2o' }
  ],
  'we-are-aliens': [
    { label:{ ko:'본예고', ja:'本予告', en:'Main Trailer' }, url:'https://www.youtube.com/watch?v=0nk-AWBxZPc' }
  ],
  'takopis-original-sin-thank-you-see-you-tomorrow': [
    { label:{ ko:'스페셜 영상', ja:'スペシャル映像', en:'Special Video' }, url:'https://www.youtube.com/watch?v=F0pqUWNrTXI' }
  ],
  'hotel-inhumans-season-2': [
    { label:{ ko:'2기 본 PV', ja:'第2期 本PV', en:'Season 2 Main PV' }, url:'https://www.youtube.com/watch?v=JxeA37qVwnc' }
  ],
  'beat-and-motion': [
    { label:{ ko:'PV 1탄', ja:'第1弾PV', en:'PV #1' }, url:'https://www.youtube.com/watch?v=NMSPJoELxw4' }
  ]
};

if (!fs.existsSync(POLICY)) throw new Error('Streaming policy file not found.');
let policy = fs.readFileSync(POLICY, 'utf8');
if (!policy.includes(MARKER)) {
  const payload = JSON.stringify(additions, null, 2);
  policy += `\n\n${MARKER}\n(() => {\n  if (!Array.isArray(window.animeData)) return;\n  const updates = ${payload};\n  const auditDate = '2026-09-10';\n  window.animeData.forEach(anime => {\n    const next = updates[anime.id];\n    if (!next?.length) return;\n    const existing = Array.isArray(anime.pvs) ? anime.pvs : [];\n    const seen = new Set();\n    anime.pvs = [...next, ...existing].filter(entry => {\n      if (!entry?.url || seen.has(entry.url)) return false;\n      seen.add(entry.url);\n      return true;\n    });\n    anime.links ||= {};\n    anime.links.pv = anime.pvs[0]?.url || null;\n    anime.verification ||= { verifiedAt:auditDate, sources:[] };\n    anime.verification.sources = Array.isArray(anime.verification.sources) ? anime.verification.sources : [];\n    next.forEach(entry => {\n      if (anime.verification.sources.some(source => source?.url === entry.url)) return;\n      anime.verification.sources.push({\n        type:'official-youtube',\n        url:entry.url,\n        label:\`Official YouTube — \${entry.label?.en || 'PV'}\`,\n        supports:['pv'],\n        verifiedAt:auditDate\n      });\n    });\n    anime.verification.verifiedAt = auditDate;\n    anime.updatedAt = auditDate;\n  });\n})();\n`;
  fs.writeFileSync(POLICY, policy);
  console.log('Appended follow-up official PV audit.');
} else {
  console.log('Follow-up official PV audit already present.');
}

if (fs.existsSync(INDEX)) {
  let html = fs.readFileSync(INDEX, 'utf8');
  const next = html.replace(
    /data\/streaming-policy-20260905\.js\?v=[^\"]+/g,
    'data/streaming-policy-20260905.js?v=20260910-pv-streaming2'
  );
  if (next !== html) {
    fs.writeFileSync(INDEX, next);
    console.log('Bumped homepage PV/streaming policy cache key.');
  } else {
    console.log('Homepage policy cache key already current or not found.');
  }
}
