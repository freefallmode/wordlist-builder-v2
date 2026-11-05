// Every playable theme of a root with all its words, in chunks of 60 themes.
// Run: node tools/gen/list-words.mjs            chunks per root
//      node tools/gen/list-words.mjs <root> <n>
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const SIZE = 60, rootOf = t => { let x = t; while (x.parent) x = P.ix.theme.get(x.parent); return x.id; };
const words = new Map(); for (const e of P.entries) for (const t of Object.keys(e.typ)) (words.get(t) || words.set(t, []).get(t)).push(e.text + (e.gloss ? ` (${e.gloss})` : ''));
const of = r => P.themes.filter(t => !t.group && rootOf(t) === r);
const [root, n] = process.argv.slice(2);
if (!root) { for (const r of P.ix.kids.get('')) console.log(r.id.padEnd(22), Math.ceil(of(r.id).length / SIZE), 'chunks'); process.exit(); }
for (const t of of(root).slice((n - 1) * SIZE, n * SIZE)) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  console.log(`\n${t.id}  "${path.slice(1).join(' > ')}"${t.note ? '  note: ' + t.note : ''}\n  ${(words.get(t.id) || []).join(', ')}`);
}
