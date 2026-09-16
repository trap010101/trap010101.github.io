const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(ROOT, 'data', 'poster-recovery-sources.json');

async function isHealthyWebp(file, item) {
  if (!fs.existsSync(file)) return false;
  try {
    const buffer = fs.readFileSync(file);
    if (
      buffer.length < 16 ||
      buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
      buffer.subarray(8, 12).toString('ascii') !== 'WEBP'
    ) return false;
    const metadata = await sharp(buffer, { failOn: 'error' }).metadata();
    if (metadata.format !== 'webp' || !metadata.width || !metadata.height) return false;
    if (item.minWidth && metadata.width < item.minWidth) return false;
    if (item.minHeight && metadata.height < item.minHeight) return false;
    return true;
  } catch {
    return false;
  }
}

async function fetchImage(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; NewAnimePosterRecovery/1.0; +https://newani.me/)',
      'accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      'referer': new URL(url).origin + '/'
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 4096) throw new Error(`response too small (${buffer.length} bytes)`);
  return buffer;
}

(async () => {
  if (!fs.existsSync(MANIFEST)) {
    console.log('No poster recovery manifest; nothing to do.');
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const items = Array.isArray(manifest.posters) ? manifest.posters : [];
  let repaired = 0;

  for (const item of items) {
    const target = path.join(ROOT, item.path);
    if (await isHealthyWebp(target, item)) {
      console.log(`${item.id}: local WebP is healthy.`);
      continue;
    }

    console.log(`${item.id}: local poster is missing or undecodable; recovering from verified visual source.`);
    const source = await fetchImage(item.sourceUrl);
    const sourceMeta = await sharp(source, { failOn: 'error' }).metadata();
    if (!sourceMeta.width || !sourceMeta.height) throw new Error(`${item.id}: source image metadata invalid`);
    if (item.minWidth && sourceMeta.width < item.minWidth) throw new Error(`${item.id}: source width ${sourceMeta.width} is below ${item.minWidth}`);
    if (item.minHeight && sourceMeta.height < item.minHeight) throw new Error(`${item.id}: source height ${sourceMeta.height} is below ${item.minHeight}`);

    fs.mkdirSync(path.dirname(target), { recursive: true });
    const temp = `${target}.repair.tmp.webp`;
    await sharp(source, { failOn: 'error' })
      .rotate()
      .webp({ quality: 90, alphaQuality: 90, effort: 6, smartSubsample: true })
      .toFile(temp);

    const repairedMeta = await sharp(temp, { failOn: 'error' }).metadata();
    if (repairedMeta.format !== 'webp' || !repairedMeta.width || !repairedMeta.height) {
      fs.rmSync(temp, { force: true });
      throw new Error(`${item.id}: repaired WebP failed decode validation`);
    }
    fs.renameSync(temp, target);
    repaired += 1;
    console.log(`${item.id}: repaired ${repairedMeta.width}x${repairedMeta.height} WebP.`);
  }

  console.log(`Poster recovery complete; repaired ${repaired} asset${repaired === 1 ? '' : 's'}.`);
})().catch(error => {
  console.error(error);
  process.exit(1);
});
