/**
 * Renders the PNG icons (favicon, Apple touch icon, PWA icons) from
 * public/favicon.svg. Run with: node scripts/make-icons.mjs
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

// Strip the dark-mode media query so PNGs always use the light-mode colours.
const svg = (await readFile(path.join(publicDir, 'favicon.svg'), 'utf8')).replace(/@media[\s\S]*?}\s*}/, '');
const source = Buffer.from(svg);

const targets = [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
];

for (const [file, size] of targets) {
  await sharp(source, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, file));
  console.log(`wrote public/${file} (${size}px)`);
}
