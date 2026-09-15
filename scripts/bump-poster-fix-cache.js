const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const targets = [
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'ranking', 'index.html')
];
const version = '20260915-catalog1';

for (const target of targets) {
  if (!fs.existsSync(target)) continue;
  const source = fs.readFileSync(target, 'utf8');
  const next = source.replace(
    /data\/poster-fixes-20260905\.js\?v=[^"']+/g,
    `data/poster-fixes-20260905.js?v=${version}`
  );

  if (next === source) {
    console.log(`Poster-fixes cache version already current or script tag not found: ${path.relative(ROOT, target)}`);
  } else {
    fs.writeFileSync(target, next);
    console.log(`Updated poster-fixes cache version: ${path.relative(ROOT, target)}`);
  }
}
