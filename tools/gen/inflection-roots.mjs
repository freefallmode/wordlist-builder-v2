// Lists the inflection aliases made by inflection-dups.mjs and which form the rest of each theme uses, so the more natural form can be the root.
// Run: node tools/gen/inflection-roots.mjs <library before the aliases were made> [--apply]   (library now = data/wordlist-en.project.json)
// A pair swaps when the theme leans to the alias's form: at least half of its comparable entries (-ing words against bare verbs, plurals against singular nouns) use that form.
import { readFileSync, writeFileSync } from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { parseFreq, setFreq, zipf } from '../../js/freq.js';
setFreq(parseFreq(readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const old = parseProject(readFileSync(process.argv[2], 'utf8')), P = parseProject(readFileSync(LIB, 'utf8')); reindex(old); reindex(P);
const oldE = new Map(old.entries.map(e => [e.id, e]));
const cls = t => /ing$/i.test(t) && t.length > 5 ? 'ing' : /[^s]s$/i.test(t) ? 's' : 'plain';
const rows = [];
const NOT = new Set(['your','her','our','their','it','tender','yacht','log','jib']), BY_USAGE = new Set(['bicep','tricep']);   // reviewed by hand: pronoun pairs are not plurals, tender/tendering tied, yacht/log/jib also name things in other themes (boats, floating things, triangles); biceps and triceps are the usual names
for (const B of P.entries) {
  const o = oldE.get(B.id); if (!B.aliasOf || !o || !oldE.get(B.aliasOf) || o.aliasOf || B.aliasKind !== 'synonym') continue;
  const A = P.ix.entry.get(B.aliasOf), oA = oldE.get(A.id), ca = cls(A.text), cb = cls(B.text);
  for (const t of Object.keys(o.th)) if (oA.th[t] !== undefined) {
    const sib = old.entries.filter(e => !e.aliasOf && e.id !== A.id && e.id !== B.id && e.th[t] !== undefined);
    const kind = cb === 'ing' ? 'ing' : 's';
    const n = { form: 0, base: 0 };
    for (const e of sib) {
      const c = cls(e.text);
      if (c === kind) n.form++;
      else if (kind === 'ing' ? e.pos === 'verb' : (!e.pos || e.pos === 'noun')) n.base++;
    }
    const swap = !NOT.has(A.text) && (BY_USAGE.has(A.text) || ca !== cb && cb !== 'plain' && n.form + n.base >= 3 && n.form / (n.form + n.base) >= 0.5);
    rows.push({ t, A, B, n, kind, swap, za: zipf(A.text), zb: zipf(B.text) });
  }
}
for (const r of rows) console.log((r.swap ? 'SWAP ' : '     ') + r.t.padEnd(24), (r.A.text + ' / ' + r.B.text).padEnd(30), `${r.kind === 'ing' ? '-ing' : 'plural'} ${r.n.form} vs ${r.kind === 'ing' ? 'bare verb' : 'singular'} ${r.n.base}`.padEnd(32), `zipf ${r.za?.toFixed(1)} / ${r.zb?.toFixed(1)}`);
console.log(rows.length, 'pairs,', rows.filter(r => r.swap).length, 'swaps');
if (process.argv[3] === '--apply') {
  for (const r of rows.filter(r => r.swap)) {
    const { A, B } = r;
    for (const x of P.entries) if (x.aliasOf === A.id && x !== B) x.aliasOf = B.id;   // aliases of the old root follow the new root
    for (const [t, v] of Object.entries(A.th)) if (B.th[t] === undefined) B.th[t] = v;
    B.aliasOf = null; delete B.aliasKind;
    A.aliasOf = B.id; A.aliasKind = 'synonym'; A.th = {};
  }
  reindex(P); stampSave(P); writeFileSync(LIB, serializeProject(P)); console.log('applied, v' + P.lib.version);
}
