const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = (process.env.POSTER_VERIFY_BASE_URL || 'https://newani.me').replace(/\/$/, '');
const MANIFEST_PATH = path.join(ROOT, 'data', 'poster-recovery-sources.json');
const MAX_ATTEMPTS = Number(process.env.POSTER_VERIFY_ATTEMPTS || 18);
const RETRY_MS = Number(process.env.POSTER_VERIFY_RETRY_MS || 10000);
const ACTIVE_DATA_FILES = [
  'data/anime.js',
  'data/anime-20260904.js',
  ...fs.readdirSync(path.join(ROOT, 'data'))
    .filter(name => /^poster-fixes-.*\.js$/.test(name))
    .map(name => `data/${name}`)
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex');

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

function collectActivePosterRefs() {
  const refs = new Set();
  for (const rel of ACTIVE_DATA_FILES) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const text = fs.readFileSync(abs, 'utf8');
    for (const match of text.matchAll(/assets\/posters\/[^"'`\s)]+\.webp/g)) refs.add(match[0]);
  }
  return refs;
}

function collectChangedPosterPaths() {
  let base = process.env.POSTER_VERIFY_BASE_SHA || '';
  if (!/^[0-9a-f]{40}$/i.test(base) || /^0+$/.test(base)) {
    try { base = git(['rev-parse', 'HEAD^']); } catch { return []; }
  }
  try {
    return git(['diff', '--name-only', `${base}..HEAD`, '--', 'assets/posters'])
      .split(/\r?\n/)
      .filter(Boolean)
      .filter(name => name.endsWith('.webp'));
  } catch {
    return [];
  }
}

function collectManifestTargets() {
  if (!fs.existsSync(MANIFEST_PATH)) return [];
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  return Array.isArray(manifest.posters) ? manifest.posters.map(item => item.path).filter(Boolean) : [];
}

function walkFiles(dir, predicate, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(abs, predicate, output);
    else if (predicate(abs)) output.push(abs);
  }
  return output;
}

function referenceFilesFor(asset) {
  const candidates = [
    ...ACTIVE_DATA_FILES.map(rel => path.join(ROOT, rel)),
    ...walkFiles(path.join(ROOT, 'anime'), file => file.endsWith('.html')),
    ...walkFiles(path.join(ROOT, '2026'), file => file.endsWith('.html')),
    ...walkFiles(path.join(ROOT, '2027'), file => file.endsWith('.html'))
  ];
  const refs = [];
  for (const abs of candidates) {
    if (!fs.existsSync(abs)) continue;
    const text = fs.readFileSync(abs, 'utf8');
    if (text.includes(asset)) refs.push(path.relative(ROOT, abs).replace(/\\/g, '/'));
  }
  return [...new Set(refs)].sort();
}

function liveUrlForFile(rel) {
  if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
  else if (rel === 'index.html') rel = '';
  return `${BASE_URL}/${rel}`;
}

async function fetchNoCache(url) {
  const joiner = url.includes('?') ? '&' : '?';
  const response = await fetch(`${url}${joiner}__poster_verify=${encodeURIComponent(HEAD)}-${Date.now()}`, {
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
    headers: {
      'user-agent': 'NewAnimePosterVerifier/1.0 (+https://newani.me/)',
      'cache-control': 'no-cache, no-store, max-age=0',
      'pragma': 'no-cache'
    }
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

async function verifyAsset(asset) {
  const localPath = path.join(ROOT, asset);
  if (!fs.existsSync(localPath)) throw new Error(`${asset}: local file missing`);
  const local = fs.readFileSync(localPath);
  const localMeta = await sharp(local, { failOn: 'error' }).metadata();
  if (localMeta.format !== 'webp' || !localMeta.width || !localMeta.height) {
    throw new Error(`${asset}: local WebP decode failed`);
  }

  const assetResponse = await fetchNoCache(`${BASE_URL}/${asset}`);
  const live = Buffer.from(await assetResponse.arrayBuffer());
  if (
    live.length < 16 ||
    live.subarray(0, 4).toString('ascii') !== 'RIFF' ||
    live.subarray(8, 12).toString('ascii') !== 'WEBP'
  ) throw new Error(`${asset}: live response is not WebP`);

  const liveMeta = await sharp(live, { failOn: 'error' }).metadata();
  if (liveMeta.format !== 'webp' || !liveMeta.width || !liveMeta.height) {
    throw new Error(`${asset}: live WebP decode failed`);
  }
  if (liveMeta.width !== localMeta.width || liveMeta.height !== localMeta.height) {
    throw new Error(`${asset}: live dimensions ${liveMeta.width}x${liveMeta.height} != local ${localMeta.width}x${localMeta.height}`);
  }
  if (sha256(live) !== sha256(local)) {
    throw new Error(`${asset}: live bytes do not match repository bytes`);
  }

  const refs = referenceFilesFor(asset);
  const hasDetail = refs.some(rel => rel.startsWith('anime/') && rel.endsWith('/index.html'));
  const hasArchive = refs.some(rel => /^(2026|2027)\/(?:index\.html|\d{2}\/index\.html)$/.test(rel));
  const hasRuntimeData = refs.some(rel => ACTIVE_DATA_FILES.includes(rel));
  if (!hasDetail) throw new Error(`${asset}: no generated detail-page reference found`);
  if (!hasArchive) throw new Error(`${asset}: no generated schedule archive reference found`);
  if (!hasRuntimeData) throw new Error(`${asset}: no active runtime data reference found`);

  for (const rel of refs) {
    const response = await fetchNoCache(liveUrlForFile(rel));
    const text = await response.text();
    if (!text.includes(asset)) throw new Error(`${asset}: live ${rel} does not reference expected asset`);
  }

  return `${asset} (${localMeta.width}x${localMeta.height}, ${refs.length} live refs)`;
}

const HEAD = git(['rev-parse', 'HEAD']);
const activeRefs = collectActivePosterRefs();
const targets = [...new Set([...collectManifestTargets(), ...collectChangedPosterPaths()])]
  .filter(asset => activeRefs.has(asset) && fs.existsSync(path.join(ROOT, asset)))
  .sort();

(async () => {
  if (!targets.length) {
    console.log('No active poster assets require live verification.');
    return;
  }

  let lastErrors = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    lastErrors = [];
    const successes = [];
    for (const asset of targets) {
      try {
        successes.push(await verifyAsset(asset));
      } catch (error) {
        lastErrors.push(error.message);
      }
    }

    if (!lastErrors.length) {
      console.log(`Live poster verification passed for ${successes.length} asset${successes.length === 1 ? '' : 's'}:`);
      successes.forEach(item => console.log(`- ${item}`));
      return;
    }

    console.log(`Live poster verification attempt ${attempt}/${MAX_ATTEMPTS} not ready:`);
    lastErrors.forEach(error => console.log(`- ${error}`));
    if (attempt < MAX_ATTEMPTS) await sleep(RETRY_MS);
  }

  console.error('Live poster verification failed after deployment wait window.');
  lastErrors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
