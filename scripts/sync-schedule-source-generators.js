const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGETS = [
  path.join(ROOT, 'scripts', 'generate-anime-pages.js'),
  path.join(ROOT, 'scripts', 'generate-schedule-pages.js'),
  path.join(ROOT, 'scripts', 'enhance-anime-seo.js')
];

const SCHEDULE_SOURCE = "  'data/schedule-updates-20260907.js',";
const TITLE_HOTFIX_SOURCE = "  'data/title-hotfix-20260909.js',";
const GENERATOR_ANCHOR = "  'data/streaming-policy-20260905.js',";

let changed = 0;

function syncGeneratorSources(original, file) {
  let source = original
    .replace(/^\s*'data\/schedule-updates-20260907\.js',?\s*$/gm, '')
    .replace(/^\s*'data\/title-hotfix-20260909\.js',?\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n');

  if (!source.includes(GENERATOR_ANCHOR)) {
    throw new Error(`Could not find sourceFiles anchor in ${path.relative(ROOT, file)}`);
  }

  return source.replace(
    GENERATOR_ANCHOR,
    `${GENERATOR_ANCHOR}\n${SCHEDULE_SOURCE}\n${TITLE_HOTFIX_SOURCE}`
  );
}

for (const file of TARGETS) {
  const original = fs.readFileSync(file, 'utf8');
  const source = syncGeneratorSources(original, file);

  if (source !== original) {
    fs.writeFileSync(file, source);
    changed += 1;
  }
}

// Keep homepage metadata patches in the same authoritative order as the static generators:
// base data -> metadata/poster/streaming patches -> schedule overrides -> final title hotfixes.
const homeFile = path.join(ROOT, 'index.html');
const homeOriginal = fs.readFileSync(homeFile, 'utf8');
let home = homeOriginal;

const scheduleTagMatch = home.match(/<script(?:\s+defer)?\s+src="data\/schedule-updates-20260907\.js\?v=[^"]+"><\/script>\s*/);
const titleTagMatch = home.match(/<script(?:\s+defer)?\s+src="data\/title-hotfix-20260909\.js\?v=[^"]+"><\/script>\s*/);

if (scheduleTagMatch && titleTagMatch) {
  const scheduleTag = scheduleTagMatch[0].trim();
  const titleTag = titleTagMatch[0].trim().replace(/\?v=[^"]+/, '?v=20260914-title2');

  home = home.replace(scheduleTagMatch[0], '');
  home = home.replace(titleTagMatch[0], '');

  const homeAnchor = /(<script(?:\s+defer)?\s+src="data\/streaming-kr-20260908\.js\?v=[^"]+"><\/script>)/;
  if (!homeAnchor.test(home)) throw new Error('Could not find homepage metadata ordering anchor.');

  home = home.replace(homeAnchor, `$1\n${scheduleTag}\n${titleTag}`);
  home = home.replace(/\n{3,}/g, '\n\n');
}

if (home !== homeOriginal) {
  fs.writeFileSync(homeFile, home);
  changed += 1;
}

console.log(`Latest title and schedule override ordering synced across ${changed} file${changed === 1 ? '' : 's'}.`);
