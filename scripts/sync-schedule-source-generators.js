const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
  path.join(ROOT, 'scripts', 'generate-anime-pages.js'),
  path.join(ROOT, 'scripts', 'generate-schedule-pages.js')
];
const SCHEDULE_SOURCE = "  'data/schedule-updates-20260907.js',";
const GENERATOR_ANCHOR = "  'data/streaming-policy-20260905.js'";

let changed = 0;

for (const file of TARGETS) {
  const original = fs.readFileSync(file, 'utf8');
  let source = original.replace(/^\s*'data\/schedule-updates-20260907\.js',\s*\n/m, '');

  if (!source.includes(GENERATOR_ANCHOR)) {
    throw new Error(`Could not find sourceFiles anchor in ${path.relative(ROOT, file)}`);
  }

  source = source.replace(GENERATOR_ANCHOR, `${GENERATOR_ANCHOR},\n${SCHEDULE_SOURCE.replace(/,$/, '')}`);

  if (source !== original) {
    fs.writeFileSync(file, source);
    changed += 1;
  }
}

// On the homepage, schedule overrides must run after other metadata patches so
// the latest schedule verification timestamp and exact release date stay authoritative.
const homeFile = path.join(ROOT, 'index.html');
const homeOriginal = fs.readFileSync(homeFile, 'utf8');
let home = homeOriginal;
const scheduleTagMatch = home.match(/<script src="data\/schedule-updates-20260907\.js\?v=[^"]+"><\/script>\s*/);
if (scheduleTagMatch) {
  const scheduleTag = scheduleTagMatch[0].trim();
  home = home.replace(scheduleTagMatch[0], '');
  const homeAnchor = /(<script src="data\/streaming-kr-20260908\.js\?v=[^"]+"><\/script>)/;
  if (!homeAnchor.test(home)) throw new Error('Could not find homepage schedule ordering anchor.');
  home = home.replace(homeAnchor, `$1\n${scheduleTag}`);
}
if (home !== homeOriginal) {
  fs.writeFileSync(homeFile, home);
  changed += 1;
}

console.log(`Latest schedule override ordering synced across ${changed} file${changed === 1 ? '' : 's'}.`);
