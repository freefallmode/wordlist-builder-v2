// Repairs synonym groups after entries were replaced by their bare names: a member that is no longer a word of the theme is swapped for what replaced it (its root, or the entry the review file names), else dropped; a group left with fewer than two members goes.
// Run: node tools/gen/groups-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// where a replaced entry kept other themes it stays a root with no link here, so the review files say what replaced it
const repl = new Map();
for (let n = 1; n <= 18; n++) {
  const f = new URL(`./leak/k4-${n}.txt`, import.meta.url); if (!fs.existsSync(f)) continue;
  let tid;
  for (const l of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    let m;
    if ((m = /^T (\S+)/.exec(l))) tid = m[1];
    else if ((m = /^S (\d+) = (\d+)/.exec(l))) repl.set(tid + '|' + m[1], { id: +m[2] });
    else if ((m = /^S (\d+) \| ([^|]+) \| ([^|]*) \|/.exec(l))) repl.set(tid + '|' + m[1], { text: m[2].trim(), gloss: m[3].trim() === '-' ? '' : m[3].trim() });
  }
}
let swapped = 0, dropped = 0, gone = 0;
for (const t of P.themes) {
  if (!t.groups?.length) continue;
  const ok = e => e && !e.aliasOf && e.typ[t.id] !== undefined;
  t.groups = t.groups.map(g => {
    const out = [];
    for (const id of g) {
      let e = P.ix.entry.get(id);
      if (!ok(e)) {
        const r = e?.aliasOf && P.ix.entry.get(e.aliasOf), x = repl.get(t.id + '|' + id);
        const y = ok(r) ? r : x && (x.id ? P.ix.entry.get(x.id) : P.entries.find(z => !z.aliasOf && z.text === x.text && (z.gloss || '') === x.gloss && z.typ[t.id] !== undefined));
        if (ok(y)) { e = y; swapped++; } else { dropped++; continue; }
      }
      if (!out.includes(e.id)) out.push(e.id);
    }
    return out;
  }).filter(g => { if (g.length >= 2) return true; gone++; return false; });
}
console.log({ swapped, dropped, groupsRemoved: gone });
if (process.argv.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
