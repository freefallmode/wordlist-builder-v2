// Lists synonym aliases for review (phase 3 of DESIGN-entries.md): node tools/gen/syn-make.mjs <chunk> <chunks> [--themes a,b,c]
// Pilot: the synonyms (same region as their root) that are in, or whose root is in, one of the pilot themes. The listing goes to stdout.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const args = process.argv.slice(2), ti = args.indexOf('--themes'), ALL = args.includes('--all');   // --all: every synonym, not only those of the pilot themes
if (ALL) args.splice(args.indexOf('--all'), 1);
const THEMES = (ti >= 0 ? args.splice(ti, 2)[1] : 'illegal_drugs,countries,jobs,emotions,family_members,clothes,illnesses,pets,school,law_and_order').split(',');
const [chunk, chunks] = [+args[0] || 1, +args[1] || 1];
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const doneFile = new URL('./syn/done.json', import.meta.url);
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
const regDiff = (e, r) => e.region.length && JSON.stringify([...e.region].sort()) !== JSON.stringify([...r.region].sort());
const name = id => P.ix.theme.get(id)?.name || id;
const lab = e => e.text + (e.gloss ? ` (${e.gloss})` : '');
const list = P.entries.filter(e => e.aliasKind === 'synonym' && !done.has(e.id)).filter(e => { const r = P.ix.entry.get(e.aliasOf); return !regDiff(e, r) && (ALL || THEMES.some(t => e.th[t] !== undefined || r.th[t] !== undefined)); })
  .sort((a, b) => P.ix.entry.get(a.aliasOf).text.localeCompare(P.ix.entry.get(b.aliasOf).text) || a.text.localeCompare(b.text));
const mine = list.filter((_, i) => i % chunks === chunk - 1);
console.log(`# chunk ${chunk}/${chunks}: ${mine.length} synonyms. ${ALL ? "all themes" : "Pilot themes: " + THEMES.join(", ")}`);
for (const e of mine) {
  const r = P.ix.entry.get(e.aliasOf);
  const own = Object.entries(e.th).map(([t, p]) => `${t} (${name(t)}):${p}`).join(', ') || '-';
  const inh = Object.entries(r.th).map(([t, p]) => `${t}:${p}`).join(', ') || '-';
  const same = P.entries.filter(x => x.text.toLowerCase() === e.text.toLowerCase() && x !== e).map(x => `${x.id}${x.gloss ? ' ' + x.gloss : ''}`).join('; ');
  console.log(`${e.id} ${lab(e)} | ${e.pos} rec ${e.rec}${e.region.length ? ' ' + e.region.join('/') : ''} | synonym of ${r.id} ${lab(r)} rec ${r.rec}${r.region.length ? ' ' + r.region.join('/') : ''}\n    its own themes: ${own}\n    root's themes: ${inh}${same ? `\n    same text elsewhere: ${same}` : ''}`);
}
