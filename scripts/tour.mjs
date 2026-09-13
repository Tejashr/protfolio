/**
 * Viewport-sized screenshots of each section for design review.
 *   node scripts/tour.mjs [baseUrl] [outDir] [width] [theme]
 */
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { loadPlaywright } from './browser.mjs';

const [, , baseUrl = 'http://localhost:4173/protfolio/', outDir = '.tour', widthArg = '1440', theme = 'light'] = process.argv;
const width = Number(widthArg);
const height = width < 768 ? 844 : 900;
mkdirSync(outDir, { recursive: true });

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.emulateMedia({ colorScheme: theme });
await page.goto(baseUrl);
await page.waitForLoadState('networkidle');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2200);
await page.screenshot({ path: path.join(outDir, `${width}-${theme}-hero.png`) });

const stops = ['capabilities', 'experience', 'about', 'contact', 'footer'];
for (const id of stops) {
  await page.evaluate((target) => document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: 'instant' }), id);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, `${width}-${theme}-${id}.png`) });
}
await browser.close();
console.log(`wrote ${stops.length + 1} screenshots to ${outDir}`);
