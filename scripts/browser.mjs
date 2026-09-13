/**
 * Resolves Playwright from wherever it is installed on this machine
 * (project, global, or npx cache) so the verification scripts can run
 * without adding a browser automation dependency to the site itself.
 */
import { createRequire } from 'node:module';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function candidates() {
  const list = [];
  const npxCache = path.join(os.homedir(), 'AppData', 'Local', 'npm-cache', '_npx');
  if (existsSync(npxCache)) {
    for (const dir of readdirSync(npxCache)) {
      const pkg = path.join(npxCache, dir, 'node_modules', 'playwright', 'package.json');
      if (existsSync(pkg)) list.push(pkg);
    }
  }
  const globalPkg = path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', 'playwright', 'package.json');
  if (existsSync(globalPkg)) list.push(globalPkg);
  return list;
}

export function loadPlaywright() {
  let best = null;
  for (const pkgPath of candidates()) {
    const require = createRequire(pkgPath);
    const { version } = require(pkgPath);
    if (!best || version.localeCompare(best.version, undefined, { numeric: true }) > 0) {
      best = { version, pkgPath, require };
    }
  }
  if (!best) throw new Error('Playwright is not installed on this machine.');
  const pw = best.require(path.dirname(best.pkgPath));
  return { ...pw, version: best.version };
}
