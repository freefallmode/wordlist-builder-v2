// Finds entries whose text contains a word of their theme's name (soup in "tomato soup" under "types of soup"): they give the theme away.
// Run: node tools/gen/theme-name-leaks.mjs [--list] [--min 0.3] [--theme <id>]
//   default: summary and the worst themes; --list prints every leaking entry; --min only lists themes where at least that share of the words leak
import { readFileSync } from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1]; };
const P = parseProject(readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const STOP = new Set(('a an and or the of in on at to for from with by as is are that this these those your my our their its words word names name types type kinds kind famous common things thing parts part ' +
  'varieties variety styles style ways way terms term items item words types sorts sort different all some other about into over under more most not no').split(/\s+/));
const stem = w => w.length > 4 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 4 && /(ches|shes|sses|xes)$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w;
const toks = s => (s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').match(/[a-z]+/g) || []);
const keys = t => [...new Set(toks(t.name).filter(w => w.length > 2 && !STOP.has(w)).map(stem))];
const rows = [];
for (const t of P.themes) {
  if (t.group) continue;
  const ks = keys(t); if (!ks.length) continue;
  const ents = (P.ix.byTheme.get(t.id) || []);
  const roots = ents.filter(e => !e.aliasOf), leaks = [];
  for (const e of ents) {
    const ts = toks(e.text).map(stem);
    const hit = ks.find(k => ts.includes(k));
    if (hit) leaks.push({ e, hit });
  }
  if (leaks.length) rows.push({ t, total: ents.length, roots: roots.length, leaks, ks });
}
const only = opt('--theme', null), min = +opt('--min', 0);
const sel = rows.filter(r => (!only || r.t.id === only) && r.leaks.length / r.total >= min).sort((a, b) => b.leaks.length / b.total - a.leaks.length / a.total || b.leaks.length - a.leaks.length);
const nTheme = P.themes.filter(t => !t.group).length, nLeak = rows.reduce((s, r) => s + r.leaks.length, 0);
console.log(`${rows.length} of ${nTheme} themes have at least one entry with a word of the theme's name in it (${nLeak} entries).`);
for (const [lo, hi] of [[0.5, 1.01], [0.25, 0.5], [0.1, 0.25], [0, 0.1]])
  console.log(`  ${Math.round(lo * 100)}-${Math.min(100, Math.round(hi * 100))}% of the theme's entries: ${rows.filter(r => r.leaks.length / r.total >= lo && r.leaks.length / r.total < hi).length} themes`);
const lang = rows.filter(r => r.t.lang).length;
console.log(`  ${lang} of these themes are language-specific (wordplay), where it can be the point`);
for (const r of sel.slice(0, args.includes('--list') ? 9999 : 40)) {
  const pct = Math.round(100 * r.leaks.length / r.total);
  console.log(`\n${r.t.id}  (${r.ks.join('/')}): ${r.leaks.length}/${r.total} = ${pct}%${r.t.lang ? ' [lang]' : ''}`);
  console.log('   ' + r.leaks.slice(0, args.includes('--list') ? 999 : 8).map(x => x.e.text).join(', '));
}
