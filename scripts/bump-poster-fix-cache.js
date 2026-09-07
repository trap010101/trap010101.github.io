const fs = require('node:fs');
const path = require('node:path');

const indexPath = path.resolve(__dirname, '..', 'index.html');
const source = fs.readFileSync(indexPath, 'utf8');
const next = source.replace(
  /data\/poster-fixes-20260905\.js\?v=[^"']+/g,
  'data/poster-fixes-20260905.js?v=20260907-posters3'
);

if (next === source) {
  console.log('Poster-fixes cache version already current or script tag not found.');
} else {
  fs.writeFileSync(indexPath, next);
  console.log('Updated poster-fixes cache version.');
}
