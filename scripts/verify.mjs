/**
 * Cross-breakpoint verification of the built site.
 *
 *   node scripts/verify.mjs [baseUrl] [outDir]
 *
 * For every required viewport and both themes it checks for horizontal
 * overflow, captures full-page screenshots, and exercises the theme system,
 * the mobile menu (mouse + keyboard), reduced-motion rendering, the skip link
 * and every link on the page. Console errors fail the run.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadPlaywright } from './browser.mjs';

const baseUrl = process.argv[2] ?? 'http://localhost:4173/protfolio/';
const outDir = process.argv[3] ?? path.join(process.cwd(), '.verify');
mkdirSync(outDir, { recursive: true });

const WIDTHS = [375, 390, 430, 768, 1024, 1440, 1920];
const THEMES = ['light', 'dark'];
const problems = [];
const notes = [];

const { chromium, version } = loadPlaywright();
notes.push(`playwright ${version}`);
const browser = await chromium.launch();

async function newPage(context, { theme, reducedMotion = 'no-preference', width, height }) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ colorScheme: theme, reducedMotion });
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  page.on('requestfailed', (req) => consoleErrors.push(`request failed: ${req.url()}`));
  page.on('response', (res) => {
    if (res.status() >= 400 && res.url().startsWith(baseUrl.replace(/\/protfolio\/$/, ''))) {
      consoleErrors.push(`${res.status()} ${res.url()}`);
    }
  });
  page.consoleErrors = consoleErrors;
  return page;
}

async function settle(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  // Let load animations finish and force every reveal into view.
  await page.waitForTimeout(1600);
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

async function overflowReport(page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const docOverflow = document.documentElement.scrollWidth > vw + 1;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
        const cls = typeof el.className === 'string' ? el.className.split(' ').slice(0, 2).join('.') : '';
        offenders.push(`${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
        if (offenders.length > 8) break;
      }
    }
    return { vw, scrollWidth: document.documentElement.scrollWidth, docOverflow, offenders };
  });
}

// 1. Breakpoints × themes -----------------------------------------------------
for (const width of WIDTHS) {
  for (const theme of THEMES) {
    const context = await browser.newContext();
    const height = width < 768 ? 844 : width < 1024 ? 1024 : 900;
    const page = await newPage(context, { theme, width, height });
    await page.goto(baseUrl);
    await settle(page);

    const applied = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (applied !== theme) problems.push(`[${width}/${theme}] system theme not applied: got ${applied}`);

    const overflow = await overflowReport(page);
    if (overflow.docOverflow || overflow.offenders.length) {
      problems.push(`[${width}/${theme}] horizontal overflow: scrollWidth=${overflow.scrollWidth} vw=${overflow.vw} ${overflow.offenders.join(' | ')}`);
    }

    await page.screenshot({ path: path.join(outDir, `${width}-${theme}.png`), fullPage: true });
    if (page.consoleErrors.length) problems.push(`[${width}/${theme}] console: ${page.consoleErrors.join(' || ')}`);
    await context.close();
  }
}

// 2. Theme persistence: stored preference beats the system setting ------------
{
  const context = await browser.newContext();
  const page = await newPage(context, { theme: 'dark', width: 1440, height: 900 });
  await page.goto(baseUrl);
  await page.evaluate(() => localStorage.setItem('tejas-theme', 'light'));
  await page.reload();
  const applied = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  if (applied !== 'light') problems.push(`stored light preference ignored under dark system (got ${applied})`);

  // Toggle via header button, verify persistence across reload.
  await page.getByRole('button', { name: /switch to dark theme/i }).first().click();
  await page.waitForTimeout(200);
  const afterToggle = await page.evaluate(() => [document.documentElement.getAttribute('data-theme'), localStorage.getItem('tejas-theme')]);
  if (afterToggle[0] !== 'dark' || afterToggle[1] !== 'dark') problems.push(`toggle did not persist dark: ${afterToggle}`);
  await page.reload();
  const afterReload = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  if (afterReload !== 'dark') problems.push(`dark theme lost on reload (got ${afterReload})`);

  // "System" option in footer returns to the OS setting.
  await page.getByRole('radio', { name: 'System' }).first().scrollIntoViewIfNeeded();
  await page.getByRole('radio', { name: 'System' }).first().click();
  const system = await page.evaluate(() => [document.documentElement.getAttribute('data-theme'), localStorage.getItem('tejas-theme')]);
  if (system[0] !== 'dark' || system[1] !== null) problems.push(`system option failed: ${system}`);
  notes.push('theme persistence ok');
  await context.close();
}

// 3. Mobile menu: mouse, keyboard, focus trap, escape -------------------------
{
  const context = await browser.newContext();
  const page = await newPage(context, { theme: 'light', width: 390, height: 844 });
  await page.goto(baseUrl);
  await settle(page);

  await page.getByRole('button', { name: 'Menu' }).click();
  await page.waitForTimeout(700);
  const dialog = page.getByRole('dialog', { name: 'Site menu' });
  if (!(await dialog.isVisible())) problems.push('mobile menu did not open');
  await page.screenshot({ path: path.join(outDir, '390-menu-open.png') });

  const focusedInMenu = await page.evaluate(() => !!document.activeElement?.closest('#mobile-menu'));
  if (!focusedInMenu) problems.push('focus did not move into the mobile menu');

  // Tab around the menu; focus must stay inside.
  for (let i = 0; i < 14; i += 1) await page.keyboard.press('Tab');
  const stillInside = await page.evaluate(() => !!document.activeElement?.closest('#mobile-menu'));
  if (!stillInside) problems.push('focus escaped the mobile menu while tabbing');

  const bodyLocked = await page.evaluate(() => getComputedStyle(document.documentElement).overflow === 'hidden');
  if (!bodyLocked) problems.push('page scroll not locked while menu open');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  if (await dialog.isVisible()) problems.push('Escape did not close the mobile menu');
  const backOnButton = await page.evaluate(() => document.activeElement?.textContent?.trim());
  if (backOnButton !== 'Menu') problems.push(`focus not returned to Menu button (on "${backOnButton}")`);

  // Navigate via a menu link.
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.waitForTimeout(500);
  await page.getByRole('link', { name: /02\s*Experience/i }).click();
  await page.waitForTimeout(900);
  const hash = await page.evaluate(() => location.hash);
  if (hash !== '#experience') problems.push(`menu link did not navigate (hash=${hash})`);
  if (await dialog.isVisible()) problems.push('menu stayed open after navigating');

  // Dark theme mobile menu screenshot
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.getByRole('radio', { name: 'Dark' }).first().click({ force: true }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, '390-menu-open-dark.png') });
  if (page.consoleErrors.length) problems.push(`[menu] console: ${page.consoleErrors.join(' || ')}`);
  notes.push('mobile menu ok');
  await context.close();
}

// 4. Keyboard: skip link first, then header controls -------------------------
{
  const context = await browser.newContext();
  const page = await newPage(context, { theme: 'light', width: 1440, height: 900 });
  await page.goto(baseUrl);
  await settle(page);
  const order = [];
  for (let i = 0; i < 9; i += 1) {
    await page.keyboard.press('Tab');
    order.push(
      await page.evaluate(() => {
        const el = document.activeElement;
        return `${el.tagName.toLowerCase()}:${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 24)}`;
      }),
    );
  }
  if (!order[0].startsWith('a:Skip to content')) problems.push(`first tab stop is ${order[0]}, expected skip link`);
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
  const skipVisible = await page.evaluate(() => {
    const a = document.querySelector('.skip-link');
    return document.activeElement === a && a.getBoundingClientRect().top >= 0;
  });
  if (!skipVisible) problems.push('skip link not visible when focused');
  notes.push(`tab order: ${order.join(' → ')}`);
  await context.close();
}

// 5. Reduced motion: everything visible immediately -----------------------------
{
  const context = await browser.newContext();
  const page = await newPage(context, { theme: 'light', width: 390, height: 844, reducedMotion: 'reduce' });
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal], h1')].filter((el) => {
      const cs = getComputedStyle(el);
      return parseFloat(cs.opacity) < 0.99 || (cs.clipPath && cs.clipPath !== 'none' && cs.clipPath.includes('100%'));
    }).length,
  );
  if (hidden) problems.push(`reduced motion: ${hidden} elements still hidden after load`);
  await page.screenshot({ path: path.join(outDir, '390-reduced-motion.png'), fullPage: true });
  notes.push('reduced motion ok');
  await context.close();
}

// 6. Links & images -------------------------------------------------------------
{
  const context = await browser.newContext();
  const page = await newPage(context, { theme: 'light', width: 1440, height: 900 });
  await page.goto(baseUrl);
  await settle(page);

  const { anchors, hrefs, images } = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href]')];
    const anchors = links.map((a) => a.getAttribute('href')).filter((h) => h.startsWith('#'));
    const hrefs = [...new Set(links.map((a) => a.href).filter((h) => /^https?:/.test(h)))];
    const images = [...document.querySelectorAll('img')].map((img) => ({
      alt: img.getAttribute('alt'),
      w: img.getAttribute('width'),
      h: img.getAttribute('height'),
      loaded: img.complete && img.naturalWidth > 0,
      src: img.currentSrc.split('/').pop(),
    }));
    return { anchors, hrefs, images };
  });

  for (const anchor of new Set(anchors)) {
    const exists = await page.evaluate((id) => !!document.getElementById(id), anchor.slice(1));
    if (!exists) problems.push(`anchor target missing: ${anchor}`);
  }
  for (const img of images) {
    if (img.alt === null) problems.push(`image without alt: ${img.src}`);
    if (!img.w || !img.h) problems.push(`image without width/height: ${img.src}`);
    if (!img.loaded) problems.push(`image failed to load: ${img.src}`);
  }

  const external = hrefs.filter((h) => !h.startsWith(baseUrl));
  const results = [];
  for (const href of external) {
    try {
      const res = await context.request.fetch(href, { method: 'GET', maxRedirects: 5, timeout: 20000, headers: { 'user-agent': 'Mozilla/5.0' } });
      results.push([res.status(), href]);
      if (res.status() >= 400 && res.status() !== 999) problems.push(`link ${res.status()}: ${href}`);
    } catch (err) {
      problems.push(`link error: ${href} (${err.message.split('\n')[0]})`);
    }
  }
  notes.push(`checked ${external.length} external links, ${images.length} images, ${new Set(anchors).size} anchors`);
  writeFileSync(path.join(outDir, 'links.json'), JSON.stringify(results, null, 2));
  await context.close();
}

await browser.close();

const report = [`# Verification: ${baseUrl}`, ...notes.map((n) => `- ${n}`), '', problems.length ? '## Problems' : '## No problems found', ...problems.map((p) => `- ${p}`)].join('\n');
writeFileSync(path.join(outDir, 'report.md'), report);
console.log(report);
process.exit(problems.length ? 1 : 0);
