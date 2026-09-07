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

console.log(`Normalized external poster URLs in ${changed} generated pages.`);
