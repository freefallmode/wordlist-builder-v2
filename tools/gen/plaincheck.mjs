import fs from 'fs';
import { parseProject } from '../../js/store.js';
import * as M from '../../js/model.js';
const P = parseProject(fs.readFileSync('data/wordlist-en.project.json', 'utf8'));
M.reindex(P);
const th = new Map(P.themes.map(t => [t.id, t]));
const plain = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/đ/g, 'd').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe');
const FB = /[āăąćēęěğĩīńōőśşũūơțảĀĂĄĆĒĘĚĞĨĪŃŌŐŚŞŨŪƠȚẢ]/;
const al = new Map(); for (const e of P.entries) if (e.aliasOf) { if (!al.has(e.aliasOf)) al.set(e.aliasOf, []); al.get(e.aliasOf).push(e); }
const out = { lockedOnly: [], open: [] };
for (const e of P.entries) {
  if (e.aliasOf || plain(e.text) === e.text) continue;
  const p = plain(e.text).toLowerCase();
  if ((al.get(e.id) || []).some(a => a.text.toLowerCase() === p)) continue;
  const ts = Object.keys(e.typ || {}).map(id => th.get(id)).filter(Boolean);
  const locked = ts.length && ts.every(t => M.themeLocked(P, t));
  (locked ? out.lockedOnly : out.open).push(`${e.id} ${e.text} (${e.type || 'common'}${FB.test(e.text) ? ', fallback letter' : ''}) in ${ts.map(t => t.id).join(', ') || '-'}`);
}
console.log('locked-only', out.lockedOnly.length, 'open', out.open.length);
const types = {}; for (const r of out.open) { const k = r.match(/\(([a-z]+)/)[1]; types[k] = (types[k] || 0) + 1; } console.log('open by type', types);
fs.writeFileSync(process.argv[2], '--- in an open theme\n' + out.open.join('\n') + '\n--- only in locked themes\n' + out.lockedOnly.join('\n') + '\n');
