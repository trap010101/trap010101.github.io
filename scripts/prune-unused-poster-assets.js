const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const POSTER_DIR = path.join(ROOT, 'assets', 'posters');
const AUDIT_PATH = path.join(ROOT, 'data', 'poster-prune-audit.json');
const PRUNE = process.argv.includes('--prune');

const IMAGE_EXT_RE = /\.(?:webp|avif|png|jpe?g|gif|svg)$/i;
const REF_RE = /\/?assets\/posters\/([^"'`<>\s?#)\\]+?\.(?:webp|avif|png|jpe?g|gif|svg))/gi;
const TEXT_EXTENSIONS = new Set(['.html', '.js', '.mjs', '.cjs', '.json', '.css', '.xml', '.webmanifest']);
const EXCLUDED_REFERENCE_FILES = new Set([
  'data/poster-asset-audit.json',
  'data/poster-prune-audit.json'
]);
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const MAX_DELETE_COUNT = Number(process.env.POSTER_PRUNE_MAX_DELETE || 120);
const MAX_DELETE_RATIO = Number(process.env.POSTER_PRUNE_MAX_RATIO || 0.35);

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path.resolve(full) === path.resolve(POSTER_DIR)) continue;
      walk(full, callback);
      continue;
    }
    if (entry.isFile()) callback(full);
  }
}

function listPosterAssets() {
  if (!fs.existsSync(POSTER_DIR)) return [];
  return fs.readdirSync(POSTER_DIR, { withFileTypes: true })
    .filter(entry => entry.isFile() && IMAGE_EXT_RE.test(entry.name))
    .map(entry => {
      const full = path.join(POSTER_DIR, entry.name);
      const stat = fs.statSync(full);
      return {
        name: entry.name,
        relativePath: `assets/posters/${entry.name}`,
        fullPath: full,
        bytes: stat.size
      };
    })
    .sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function collectReferences() {
  const references = new Map();
  const dynamicReferenceFiles = [];

  walk(ROOT, filePath => {
    const relative = toPosix(path.relative(ROOT, filePath));
    if (EXCLUDED_REFERENCE_FILES.has(relative)) return;
    if (!TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) return;

    const stat = fs.statSync(filePath);
    if (stat.size > 8 * 1024 * 1024) return;

    const text = fs.readFileSync(filePath, 'utf8');
    if (text.includes('assets/posters/${') && !relative.startsWith('scripts/')) {
      dynamicReferenceFiles.push(relative);
    }

    REF_RE.lastIndex = 0;
    let match;
    while ((match = REF_RE.exec(text)) !== null) {
      const filename = match[1];
      if (!filename || filename.includes('${') || filename.includes('{')) continue;
      const assetPath = `assets/posters/${filename}`;
      if (!references.has(assetPath)) references.set(assetPath, new Set());
      references.get(assetPath).add(relative);
    }
  });

  return { references, dynamicReferenceFiles };
}

function writeAudit(payload) {
  fs.mkdirSync(path.dirname(AUDIT_PATH), { recursive: true });
  fs.writeFileSync(AUDIT_PATH, JSON.stringify(payload, null, 2) + '\n');
}

const assets = listPosterAssets();
const assetPaths = new Set(assets.map(asset => asset.relativePath));
const { references, dynamicReferenceFiles } = collectReferences();

if (dynamicReferenceFiles.length) {
  console.error('Unsafe dynamic poster path construction detected outside maintenance scripts:');
  dynamicReferenceFiles.forEach(file => console.error(`- ${file}`));
  console.error('Poster pruning aborted to avoid deleting assets that may be resolved dynamically at runtime.');
  process.exit(1);
}

const missing = [...references.keys()]
  .filter(ref => !assetPaths.has(ref))
  .sort();

if (missing.length) {
  console.error('Missing poster assets are still referenced by active site files:');
  for (const ref of missing) {
    console.error(`- ${ref}`);
    for (const source of [...references.get(ref)].sort()) console.error(`    referenced by ${source}`);
  }
  console.error('Poster pruning aborted. Fix dangling references first.');
  process.exit(1);
}

const unused = assets.filter(asset => !references.has(asset.relativePath));
const maxByRatio = Math.max(10, Math.floor(assets.length * MAX_DELETE_RATIO));
const safetyLimit = Math.min(MAX_DELETE_COUNT, maxByRatio);

console.log(`Poster assets: ${assets.length}`);
console.log(`Referenced poster assets: ${assets.length - unused.length}`);
console.log(`Unreferenced poster assets: ${unused.length}`);

if (!unused.length) {
  console.log('No orphan poster assets found.');
  process.exit(0);
}

unused.forEach(asset => console.log(`- ${asset.relativePath} (${(asset.bytes / 1024).toFixed(1)} KiB)`));

if (!PRUNE) {
  console.log('Dry run only. Re-run with --prune to remove these orphan assets.');
  process.exit(0);
}

if (unused.length > safetyLimit) {
  console.error(`Refusing to delete ${unused.length} poster assets; safety limit is ${safetyLimit}.`);
  console.error('Review the reference model or adjust POSTER_PRUNE_MAX_DELETE / POSTER_PRUNE_MAX_RATIO explicitly.');
  process.exit(1);
}

let deletedBytes = 0;
for (const asset of unused) {
  fs.unlinkSync(asset.fullPath);
  deletedBytes += asset.bytes;
}

writeAudit({
  auditedAt: new Date().toISOString(),
  mode: 'prune',
  totalAssetsBefore: assets.length,
  referencedAssets: assets.length - unused.length,
  deletedCount: unused.length,
  deletedBytes,
  deleted: unused.map(asset => ({ path: asset.relativePath, bytes: asset.bytes }))
});

console.log(`Deleted ${unused.length} orphan poster assets, freeing ${(deletedBytes / 1024 / 1024).toFixed(2)} MiB.`);
