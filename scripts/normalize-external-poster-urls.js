const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const roots = ['anime', '2026', '2027'].map(name => path.join(ROOT, name));

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(target, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(target);
  }
  return files;
}

let changed = 0;
for (const file of roots.flatMap(root => walk(root))) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before
    .replace(/(["'])\/(https?:\/\/)/g, '$1$2')
    .replace(/https:\/\/newani\.me\/(https?:\/\/)/g, '$1');
  if (after === before) continue;
  fs.writeFileSync(file, after);
  changed += 1;
}

// inject-title-wrap-css.js intentionally normalizes shared chrome before this script runs.
// Pin the latest homepage runtime versions here so generated commits cannot roll back
// card refinements or regional streaming fixes to stale cache keys.
const homepage = path.join(ROOT, 'index.html');
if (fs.existsSync(homepage)) {
  const before = fs.readFileSync(homepage, 'utf8');
  const after = before
    .replace(/href="\/title-wrap-refine\.css\?v=[^"]+"/g, 'href="/title-wrap-refine.css?v=20260914-card3"')
    .replace(/src="\/?anime-links\.js\?v=[^"]+"/g, 'src="anime-links.js?v=20260914-streaming3"')
    .replace(/src="\/?data\/streaming-regions\.js\?v=[^"]+"/g, 'src="data/streaming-regions.js?v=20260914-regions3"');
  if (after !== before) {
    fs.writeFileSync(homepage, after);
    changed += 1;
  }
}

console.log(`Normalized external poster URLs and homepage runtime versions in ${changed} files.`);
