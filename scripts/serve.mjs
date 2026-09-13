/**
 * Minimal static server for the built site, mirroring the GitHub Pages
 * layout (dist served under /protfolio/). Used by scripts/verify.mjs.
 *   node scripts/serve.mjs [port]
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { createGzip } from 'node:zlib';

const port = Number(process.argv[2] ?? 4173);
const root = path.resolve('dist');
const base = '/protfolio/';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
};

createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (!url.pathname.startsWith(base)) {
    res.writeHead(404).end('not found');
    return;
  }
  let file = path.join(root, decodeURIComponent(url.pathname.slice(base.length)));
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(404).end('not found');
    return;
  }
  const type = types[path.extname(file)] ?? 'application/octet-stream';
  const headers = { 'content-type': type, 'cache-control': 'public, max-age=600' };
  // GitHub Pages compresses text assets; mirror that so measurements are realistic.
  const compressible = /^(text\/|application\/(javascript|json|manifest|xml)|image\/svg)/.test(type);
  if (compressible && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
    headers['content-encoding'] = 'gzip';
    res.writeHead(200, headers);
    createReadStream(file).pipe(createGzip()).pipe(res);
    return;
  }
  res.writeHead(200, headers);
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving dist at http://localhost:${port}${base}`));
