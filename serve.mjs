// Tiny static server for local use: node serve.mjs [port] [--lan]. Listens on 127.0.0.1 only; --lan (or HOST=0.0.0.0) listens on every interface, for opening the app from a phone. (Opened as file:// the frequency list and modules cannot load.)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

const root = fileURLToPath(new URL('.', import.meta.url));
const args = process.argv.slice(2), lan = args.includes('--lan') || process.env.HOST === '0.0.0.0';
const port = +args.find(a => !a.startsWith('--')) || 8100;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' };

createServer(async (req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end('bad request'); return; }
  if (p.split(/[\\/]/).some(s => s.startsWith('.'))) { res.writeHead(403).end(); return; }   // .git, .claude and other dot folders are not served
  if (p.endsWith('/')) p += 'index.html';
  const file = normalize(join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(body);
  } catch { res.writeHead(404).end('not found'); }
}).listen(port, lan ? '0.0.0.0' : '127.0.0.1', () => {
  console.log(`http://localhost:${port}/`);
  if (lan) console.log(`WARNING: --lan: this folder is readable by anyone on the local network: ${Object.values(networkInterfaces()).flat().filter(i => i.family === 'IPv4' && !i.internal).map(i => `http://${i.address}:${port}/`).join('  ') || '(no network address found)'}`);
});
