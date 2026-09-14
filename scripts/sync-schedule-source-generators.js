const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
  path.join(ROOT, 'scripts', 'generate-anime-pages.js'),
  path.join(ROOT, 'scripts', 'generate-schedule-pages.js')
];

const REQUIRED_SOURCES = [
  {
    line: "  'data/title-hotfix-20260909.js',",
    anchor: "  'data/title-fixes-20260905.js',"
  },
  {
    line: "  'data/schedule-updates-20260907.js',",
    anchor: "  'data/streaming-policy-20260905.js',"
  }
];

let changed = 0;

function syncRequiredSource(source, required, file) {
  const escaped = required.line
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const duplicatePattern = new RegExp(`^\\s*${escaped}\\s*$`, 'gm');
  source = source.replace(duplicatePattern, '').replace(/\n{3,}/g, '\n\n');

  if (!source.includes(required.anchor)) {
    throw new Error(`Could not find sourceFiles anchor ${required.anchor} in ${path.relative(ROOT, file)}`);
  }

  return source.replace(required.anchor, `${required.anchor}\n${required.line}`);
}

for (const file of TARGETS) {
  const original = fs.readFileSync(file, 'utf8');
  let source = original;

  for (const required of REQUIRED_SOURCES) {
    source = syncRequiredSource(source, required, file);
  }

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
const scheduleTagMatch = home.match(/<script(?:\s+defer)?\s+src="data\/schedule-updates-20260907\.js\?v=[^"]+"><\/script>\s*/);
if (scheduleTagMatch) {
  const scheduleTag = scheduleTagMatch[0].trim();
  home = home.replace(scheduleTagMatch[0], '');
  const homeAnchor = /(<script(?:\s+defer)?\s+src="data\/streaming-kr-20260908\.js\?v=[^"]+"><\/script>)/;
  if (!homeAnchor.test(home)) throw new Error('Could not find homepage schedule ordering anchor.');
  home = home.replace(homeAnchor, `$1\n${scheduleTag}`);
}
if (home !== homeOriginal) {
  fs.writeFileSync(homeFile, home);
  changed += 1;
}

console.log(`Latest title and schedule override ordering synced across ${changed} file${changed === 1 ? '' : 's'}.`);
