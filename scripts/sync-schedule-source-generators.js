const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
  path.join(ROOT, 'scripts', 'generate-anime-pages.js'),
  path.join(ROOT, 'scripts', 'generate-schedule-pages.js')
];
const SCHEDULE_SOURCE = "  'data/schedule-updates-20260907.js',";

let changed = 0;

for (const file of TARGETS) {
  let source = fs.readFileSync(file, 'utf8');
  if (source.includes("'data/schedule-updates-20260907.js'")) continue;

  const anchor = "  'data/official-sites-20260905.js',";
  if (!source.includes(anchor)) {
    throw new Error(`Could not find sourceFiles anchor in ${path.relative(ROOT, file)}`);
  }

  source = source.replace(anchor, `${anchor}\n${SCHEDULE_SOURCE}`);
  fs.writeFileSync(file, source);
  changed += 1;
}

console.log(`Schedule override source synced into ${changed} generator${changed === 1 ? '' : 's'}.`);
