const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const ANIME_PATH = path.join(ROOT, 'data', 'anime.js');
const FIXES_PATH = path.join(ROOT, 'data', 'poster-fixes-20260905.js');

function posterSrc(anime) {
  return anime && anime.poster && typeof anime.poster.src === 'string'
    ? anime.poster.src
    : null;
}

function replacePosterSource(source, id, nextSrc) {
  const idToken = `"id": ${JSON.stringify(id)}`;
  const idIndex = source.indexOf(idToken);
  if (idIndex < 0) return { source, changed: false, reason: 'id-not-found' };

  const nextObject = source.indexOf('\n  {\n    "id": ', idIndex + idToken.length);
  const arrayEnd = source.indexOf('\n];', idIndex + idToken.length);
  const end = nextObject >= 0 ? nextObject : arrayEnd;
  if (end < 0) return { source, changed: false, reason: 'object-end-not-found' };

  const block = source.slice(idIndex, end);
  const srcPattern = /("poster"\s*:\s*\{[\s\S]*?"src"\s*:\s*)"[^"]*"/;
  const match = block.match(srcPattern);
  if (!match) return { source, changed: false, reason: 'poster-src-not-found' };

  const replacement = `${match[1]}${JSON.stringify(nextSrc)}`;
  const nextBlock = block.replace(srcPattern, replacement);
  if (nextBlock === block) return { source, changed: false, reason: 'already-current' };

  return {
    source: source.slice(0, idIndex) + nextBlock + source.slice(end),
    changed: true,
    reason: null
  };
}

const canonicalText = fs.readFileSync(ANIME_PATH, 'utf8');
const fixesText = fs.readFileSync(FIXES_PATH, 'utf8');
const sandbox = { window: {} };

vm.runInNewContext(canonicalText, sandbox, { filename: 'data/anime.js' });
if (!Array.isArray(sandbox.window.animeData)) {
  throw new Error('data/anime.js did not define window.animeData');
}

const before = new Map(
  sandbox.window.animeData.map(anime => [anime.id, posterSrc(anime)])
);

vm.runInNewContext(fixesText, sandbox, { filename: 'data/poster-fixes-20260905.js' });

const desired = new Map();
for (const anime of sandbox.window.animeData) {
  const previous = before.get(anime.id) ?? null;
  const next = posterSrc(anime);
  if (next && previous !== next) desired.set(anime.id, { previous, next });
}

let updated = canonicalText;
const synced = [];
const skipped = [];

for (const [id, change] of desired) {
  const result = replacePosterSource(updated, id, change.next);
  updated = result.source;
  if (result.changed) {
    synced.push({ id, from: change.previous, to: change.next });
  } else if (result.reason !== 'already-current') {
    skipped.push({ id, reason: result.reason });
  }
}

if (skipped.length) {
  console.error('Poster canonical sync could not safely update every override:');
  for (const item of skipped) console.error(`- ${item.id}: ${item.reason}`);
  process.exit(1);
}

if (updated !== canonicalText) fs.writeFileSync(ANIME_PATH, updated);

if (!synced.length) {
  console.log('Canonical poster sources already match active poster overrides.');
} else {
  console.log(`Synced ${synced.length} poster override(s) into data/anime.js:`);
  for (const item of synced) console.log(`- ${item.id}: ${item.from || '(none)'} -> ${item.to}`);
}
