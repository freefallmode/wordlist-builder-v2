// Lists one chunk of playable themes for the popularity pass.
// Run: node tools/gen/pop-make.mjs            number of chunks
//      node tools/gen/pop-make.mjs <n>        chunk n (1-based): per theme its path, flags, note and every word to rate
// Chunks follow the theme tree order, 25 playable themes each, skipping themes that already have a result in tools/gen/pop/done.json.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
reindex(P);
const SIZE = 25;
const doneFile = new URL('./pop/done.json', import.meta.url);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const tree = []; const walk = (id) => { for (const t of P.ix.kids.get(id) || []) { tree.push(t); walk(t.id); } }; walk('');
const todo = tree.filter(t => !t.group && !done.has(t.id) && (P.ix.byTheme.get(t.id) || []).length);
const chunks = Array.from({ length: Math.ceil(todo.length / SIZE) }, (_, i) => todo.slice(i * SIZE, (i + 1) * SIZE));
const n = +process.argv[2];
if (!n) { console.log(chunks.length, 'chunks of up to', SIZE, 'themes;', todo.length, 'themes left'); process.exit(); }
const chunk = chunks[n - 1]; if (!chunk) throw Error('no such chunk');
for (const t of chunk) {
  const path = []; for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) path.unshift(x.name);
  const flags = ['complete', 'adult', 'sensitive', 'tm', 'lang'].filter(k => t[k]).join(',') + (t.region.length ? ' region:' + t.region.join('/') : '');
  const list = (P.ix.byTheme.get(t.id) || []).filter(e => e.enabled);
  const roots = list.filter(e => !e.aliasOf), syn = list.filter(e => e.aliasOf && e.aliasKind === 'synonym');
  console.log(`\nTHEME ${t.id} | ${path.join(' > ')} | ${flags || 'no flags'}${t.note ? ' | note: ' + t.note : ''} | ${roots.length} words`);
  roots.sort((a, b) => a.text.localeCompare(b.text));
  for (const e of roots) {
    console.log(`${e.id} ${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''} | rec ${e.rec}${e.th[t.id] ? ' old ' + e.th[t.id] : ''}`);
    for (const a of syn.filter(x => x.aliasOf === e.id)) console.log(`  ${a.id} ~ ${a.text}${a.gloss ? ' (' + a.gloss + ')' : ''} | rec ${a.rec}`);
  }
  // synonyms whose root is not in this list (the root is linked elsewhere): rated here too
  for (const a of syn.filter(x => !roots.some(r => r.id === x.aliasOf))) console.log(`  ${a.id} ~ ${a.text} (synonym of ${P.ix.entry.get(a.aliasOf)?.text}) | rec ${a.rec}`);
}
