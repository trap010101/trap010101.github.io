const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const parts = [0, 1, 2, 3, 4].map(index =>
  fs.readFileSync(
    path.join(__dirname, 'poster-upload', `lulutto-part-${index}.txt`),
    'utf8'
  ).trim()
);
const buffer = Buffer.from(parts.join(''), 'base64');

if (buffer.length !== 58334) {
  throw new Error(`Unexpected Lulutto poster size: ${buffer.length}`);
}

const sha1 = crypto.createHash('sha1').update(buffer).digest('hex');
if (sha1 !== '24e7ac1bb0726ea286002570c156144058cbab62') {
  throw new Error(`Unexpected Lulutto poster SHA-1: ${sha1}`);
}

if (
  buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
  buffer.subarray(8, 12).toString('ascii') !== 'WEBP'
) {
  throw new Error('Reconstructed Lulutto poster is not WebP');
}

const output = path.join(
  root,
  'assets',
  'posters',
  'magical-sisters-lulutto-lilly-part-2-cropped-v2.webp'
);
fs.writeFileSync(output, buffer);
console.log(`Rebuilt ${path.relative(root, output)} (${buffer.length} bytes, ${sha1})`);
