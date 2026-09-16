const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const refs = new Set();

function collect(file) {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/assets\/posters\/[^"'`\s)]+\.webp/g)) refs.add(match[0]);
}

collect(path.join(DATA_DIR, 'anime.js'));
collect(path.join(DATA_DIR, 'anime-20260904.js'));
for (const name of fs.readdirSync(DATA_DIR).filter(name => /^poster-fixes-.*\.js$/.test(name))) {
  collect(path.join(DATA_DIR, name));
}

(async () => {
  const errors = [];
  for (const rel of [...refs].sort()) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) {
      errors.push(`${rel}: missing`);
      continue;
    }

    const buffer = fs.readFileSync(abs);
    if (
      buffer.length < 16 ||
      buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
      buffer.subarray(8, 12).toString('ascii') !== 'WEBP'
    ) {
      errors.push(`${rel}: invalid RIFF/WEBP header`);
      continue;
    }

    try {
      const metadata = await sharp(buffer, { failOn: 'error' }).metadata();
      if (metadata.format !== 'webp' || !metadata.width || !metadata.height) {
        errors.push(`${rel}: invalid decoded metadata`);
      }
    } catch (error) {
      errors.push(`${rel}: decode failed (${error.message})`);
    }
  }

  if (errors.length) {
    console.error(`Poster validation failed (${errors.length} error${errors.length === 1 ? '' : 's'}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Validated ${refs.size} referenced WebP poster assets.`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
