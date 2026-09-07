const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const FIXES_PATH = path.join(ROOT, 'data', 'poster-fixes-20260905.js');
const AUDIT_PATH = path.join(ROOT, 'data', 'poster-asset-audit.json');
const ASSET_DIR = path.join(ROOT, 'assets', 'posters');

(async () => {
  if (!fs.existsSync(AUDIT_PATH)) {
    console.log('No poster asset audit found; nothing to optimize.');
    return;
  }

  const audit = JSON.parse(fs.readFileSync(AUDIT_PATH, 'utf8'));
  if (!Array.isArray(audit.posters) || !audit.posters.length) {
    console.log('Poster audit is empty; nothing to optimize.');
    return;
  }

  let fixes = fs.readFileSync(FIXES_PATH, 'utf8');
  let optimizedCount = 0;
  let sourceBytes = 0;
  let optimizedBytes = 0;

  for (const poster of audit.posters) {
    if (poster.optimized && poster.localPath?.endsWith('.webp')) continue;

    const oldLocalPath = poster.localPath;
    const inputPath = path.join(ROOT, oldLocalPath);
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Missing localized source asset for ${poster.id}: ${oldLocalPath}`);
    }

    const originalStat = fs.statSync(inputPath);
    sourceBytes += originalStat.size;

    const outputLocalPath = `assets/posters/${poster.id}-v2.webp`;
    const outputPath = path.join(ROOT, outputLocalPath);
    const tempPath = path.join(ASSET_DIR, `.${poster.id}.optimized.webp`);

    const pipeline = sharp(inputPath, { failOn: 'error' })
      .rotate()
      .resize({ width: 1600, height: 2200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 90, effort: 5, smartSubsample: true });

    const info = await pipeline.toFile(tempPath);
    if (!info.width || !info.height || info.width < 320 || info.height < 320) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      throw new Error(`Optimized image dimensions invalid for ${poster.id}: ${info.width}x${info.height}`);
    }

    fs.renameSync(tempPath, outputPath);
    if (path.resolve(inputPath) !== path.resolve(outputPath) && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);

    const finalStat = fs.statSync(outputPath);
    optimizedBytes += finalStat.size;
    fixes = fixes.replace(`src: "${oldLocalPath}"`, `src: "${outputLocalPath}"`);

    poster.originalLocalPath = oldLocalPath;
    poster.originalBytes = poster.originalBytes || originalStat.size;
    poster.originalWidth = poster.originalWidth || poster.width;
    poster.originalHeight = poster.originalHeight || poster.height;
    poster.localPath = outputLocalPath;
    poster.mime = 'image/webp';
    poster.bytes = finalStat.size;
    poster.width = info.width;
    poster.height = info.height;
    poster.aspectRatio = Number((info.width / info.height).toFixed(3));
    poster.optimized = true;
    poster.optimization = {
      format: 'webp',
      quality: 86,
      maxWidth: 1600,
      maxHeight: 2200,
      withoutEnlargement: true
    };

    poster.notes = Array.isArray(poster.notes) ? poster.notes.filter(note => note !== 'moderate source resolution') : [];
    if (poster.aspectRatio > 1.5 && !poster.notes.includes('landscape visual; card crop should be visually reviewed')) {
      poster.notes.push('landscape visual; card crop should be visually reviewed');
    }

    optimizedCount += 1;
    console.log(`${poster.id}: ${(originalStat.size / 1024).toFixed(1)} KiB -> ${(finalStat.size / 1024).toFixed(1)} KiB (${info.width}x${info.height})`);
  }

  fs.writeFileSync(FIXES_PATH, fixes);
  audit.optimization = {
    format: 'webp',
    quality: 86,
    maxWidth: 1600,
    maxHeight: 2200,
    optimizedCount,
    sourceBytes,
    optimizedBytes,
    savedBytes: Math.max(0, sourceBytes - optimizedBytes)
  };
  fs.writeFileSync(AUDIT_PATH, JSON.stringify(audit, null, 2) + '\n');

  console.log(`Optimized ${optimizedCount} posters; ${(sourceBytes / 1024 / 1024).toFixed(2)} MiB -> ${(optimizedBytes / 1024 / 1024).toFixed(2)} MiB.`);
})();
