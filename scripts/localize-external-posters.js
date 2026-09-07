const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const FIXES_PATH = path.join(ROOT, 'data', 'poster-fixes-20260905.js');
const ASSET_DIR = path.join(ROOT, 'assets', 'posters');
const AUDIT_PATH = path.join(ROOT, 'data', 'poster-asset-audit.json');
const AUDITED_AT = '2026-09-07';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function detectImage(buffer) {
  if (buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))) {
    return { ext: 'png', mime: 'image/png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (buffer.length >= 10 && (buffer.subarray(0, 6).toString('ascii') === 'GIF87a' || buffer.subarray(0, 6).toString('ascii') === 'GIF89a')) {
    return { ext: 'gif', mime: 'image/gif', width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  if (buffer.length >= 12 && buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
    const chunk = buffer.subarray(12, 16).toString('ascii');
    let width = null;
    let height = null;
    if (chunk === 'VP8X' && buffer.length >= 30) {
      width = 1 + buffer[24] + (buffer[25] << 8) + (buffer[26] << 16);
      height = 1 + buffer[27] + (buffer[28] << 8) + (buffer[29] << 16);
    } else if (chunk === 'VP8L' && buffer.length >= 25 && buffer[20] === 0x2f) {
      const b1 = buffer[21], b2 = buffer[22], b3 = buffer[23], b4 = buffer[24];
      width = 1 + (((b2 & 0x3f) << 8) | b1);
      height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
    } else if (chunk === 'VP8 ' && buffer.length >= 30) {
      for (let i = 20; i + 7 < buffer.length; i++) {
        if (buffer[i] === 0x9d && buffer[i + 1] === 0x01 && buffer[i + 2] === 0x2a) {
          width = buffer.readUInt16LE(i + 3) & 0x3fff;
          height = buffer.readUInt16LE(i + 5) & 0x3fff;
          break;
        }
      }
    }
    return { ext: 'webp', mime: 'image/webp', width, height };
  }

  if (buffer.length >= 12 && buffer.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = buffer.subarray(8, 12).toString('ascii');
    if (['avif', 'avis', 'mif1', 'msf1'].includes(brand)) {
      return { ext: 'avif', mime: 'image/avif', width: null, height: null };
    }
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue; }
      if (offset + 4 > buffer.length) break;
      const size = buffer.readUInt16BE(offset + 2);
      if (size < 2) break;
      const isSof = [0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker);
      if (isSof && offset + 9 < buffer.length) {
        return { ext: 'jpg', mime: 'image/jpeg', width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }
      offset += 2 + size;
    }
    return { ext: 'jpg', mime: 'image/jpeg', width: null, height: null };
  }

  return null;
}

async function fetchBytes(url, id) {
  const headers = {
    'user-agent': 'Mozilla/5.0 (compatible; NewAnimePosterArchiver/1.0; +https://newani.me/)',
    'accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'referer': new URL(url).origin + '/'
  };

  let lastError = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, { headers, redirect: 'follow', signal: AbortSignal.timeout(45000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 4096) throw new Error(`response too small (${buffer.length} bytes)`);
      return buffer;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(1000 * attempt);
    }
  }

  const tempPath = path.join(ROOT, `.poster-${id}.download`);
  const result = spawnSync('curl', [
    '--fail', '--location', '--retry', '2', '--retry-delay', '1',
    '--connect-timeout', '20', '--max-time', '60',
    '--user-agent', headers['user-agent'], '--referer', headers.referer,
    '--output', tempPath, url
  ], { encoding: 'utf8' });
  if (result.status === 0 && fs.existsSync(tempPath)) {
    const buffer = fs.readFileSync(tempPath);
    fs.unlinkSync(tempPath);
    if (buffer.length >= 4096) return buffer;
  } else if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }

  throw new Error(`${lastError?.message || 'fetch failed'}; curl: ${(result.stderr || '').trim()}`);
}

function externalEntries(text) {
  const lines = text.split(/\r?\n/);
  const entries = [];
  let currentId = null;
  for (const line of lines) {
    const idMatch = line.match(/^\s{4}"([^"]+)":\s*\{$/);
    if (idMatch) currentId = idMatch[1];
    const srcMatch = line.match(/^\s{6}src:\s*"(https?:\/\/[^\"]+)",$/);
    if (currentId && srcMatch) entries.push({ id: currentId, url: srcMatch[1] });
  }
  return entries;
}

(async () => {
  const original = fs.readFileSync(FIXES_PATH, 'utf8');
  const entries = externalEntries(original);
  if (!entries.length) {
    console.log('No external poster URLs remain.');
    return;
  }

  fs.mkdirSync(ASSET_DIR, { recursive: true });
  const audit = [];
  const replacements = new Map();
  const failures = [];

  for (const { id, url } of entries) {
    process.stdout.write(`Localizing ${id} ... `);
    try {
      const buffer = await fetchBytes(url, id);
      const meta = detectImage(buffer);
      if (!meta) throw new Error('response is not a supported raster image');
      if (meta.width && meta.height && (meta.width < 320 || meta.height < 320)) {
        throw new Error(`image dimensions too small: ${meta.width}x${meta.height}`);
      }

      const filename = `${id}.${meta.ext}`;
      const localPath = `assets/posters/${filename}`;
      fs.writeFileSync(path.join(ASSET_DIR, filename), buffer);
      replacements.set(url, localPath);

      const ratio = meta.width && meta.height ? Number((meta.width / meta.height).toFixed(3)) : null;
      const notes = [];
      if (ratio !== null && ratio > 1.5) notes.push('landscape visual; card crop should be visually reviewed');
      if (meta.width && meta.height && Math.min(meta.width, meta.height) < 600) notes.push('moderate source resolution');

      audit.push({
        id,
        sourceUrl: url,
        localPath,
        mime: meta.mime,
        bytes: buffer.length,
        width: meta.width,
        height: meta.height,
        aspectRatio: ratio,
        notes
      });
      console.log(`${meta.mime} ${meta.width || '?'}x${meta.height || '?'} ${(buffer.length / 1024).toFixed(1)} KiB`);
    } catch (error) {
      failures.push({ id, url, error: error.message });
      console.log(`FAILED: ${error.message}`);
    }
  }

  if (failures.length) {
    for (const item of audit) {
      const diskPath = path.join(ROOT, item.localPath);
      if (fs.existsSync(diskPath)) fs.unlinkSync(diskPath);
    }
    console.error('\nPoster localization aborted because some sources failed:');
    failures.forEach(item => console.error(`- ${item.id}: ${item.error}`));
    process.exit(1);
  }

  let updated = original;
  for (const [sourceUrl, localPath] of replacements) {
    updated = updated.replace(`src: "${sourceUrl}"`, `src: "${localPath}"`);
  }
  fs.writeFileSync(FIXES_PATH, updated);
  fs.writeFileSync(AUDIT_PATH, JSON.stringify({ auditedAt: AUDITED_AT, count: audit.length, posters: audit }, null, 2) + '\n');

  console.log(`\nLocalized and validated ${audit.length} external poster assets.`);
})();
