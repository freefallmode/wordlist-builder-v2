// Lists the themes to consider for splitting (phase 5 of DESIGN-entries.md): node tools/gen/split-make.mjs <chunk> <chunks> [--min 50]
// Every playable theme with at least --min distinct words (not counting aliases), largest first, dealt out to chunks. The listing goes to stdout.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, pathOf } from '../../js/model.js';
const args = process.argv.slice(2), mi = args.indexOf('--min'), MIN = mi >= 0 ? +args.splice(mi, 2)[1] : 50;
const [chunk, chunks] = [+args[0] || 1, +args[1] || 1];
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const roots = t => [...new Map((P.ix.byTheme.get(t.id) || []).map(e => [e.aliasOf || e.id, P.ix.entry.get(e.aliasOf || e.id)])).values()];
const kids = t => P.themes.filter(c => c.parent === t.id);
const cands = P.themes.filter(t => !t.group && t.enabled !== false).map(t => ({ t, es: roots(t) })).filter(x => x.es.length >= MIN)
  .sort((a, b) => b.es.length - a.es.length || a.t.name.localeCompare(b.t.name));
const mine = cands.filter((_, i) => i % chunks === chunk - 1);
console.log(`# chunk ${chunk}/${chunks}: ${mine.length} themes with at least ${MIN} words`);
for (const { t, es } of mine) {
  const sib = P.themes.filter(c => c.parent === t.parent && c.id !== t.id).map(c => c.name);
  console.log(`\n## ${t.id} (${t.name}) | ${es.length} words | path: ${pathOf(P, t.id)}${t.complete ? ' | COMPLETE: only exact sets' : ''}${t.lang ? ' | language-specific' : ''}`);
  if (t.note) console.log(`note: ${t.note}`);
  const k = kids(t); if (k.length) console.log(`existing sub-themes: ${k.map(c => `${c.name} (${(P.ix.byTheme.get(c.id) || []).length})`).join('; ')}`);
  if (sib.length && sib.length < 40) console.log(`siblings: ${sib.join('; ')}`);
  console.log('words (id text [gloss] pos rec pop):');
  console.log(es.map(e => `${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.pos[0]} ${e.fam} ${e.typ[t.id] ?? '-'}`).join('\n'));
}
