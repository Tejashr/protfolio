/**
 * Renders public/og-image.png (1200x630) from scripts/og-template.html.
 * Run with: node scripts/make-og.mjs
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadPlaywright } from './browser.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const template = pathToFileURL(path.join(root, 'scripts', 'og-template.html')).href;
const out = path.join(root, 'public', 'og-image.png');

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(template);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log(`wrote ${path.relative(root, out)}`);
