// Library batch v380 (2026-11-16, approved by Simon): the two entries that held two senses each are split, one entry per sense (ISSUES.md T15, T23).
//   41887 erlang stays the unit (lowercase common, gloss "unit", as volt [unit], watt [unit]); the new entry Erlang [language] takes "programming languages"
//   (proper, as Python [language], Haskell; no tm, as Java). 11783 stays the dance, written Balboa and typed proper (after the Balboa Peninsula;
//   swing-dance usage capitalises; Charleston [dance] is proper in the same theme; the T15 medium list proposed it); the new entry Balboa [conquistador]
//   (person, as Cortés, Pizarro) takes "conquistadors" and the theme's group with 54124 Vasco Núñez de Balboa.
//   Ratings: the new entries take the original's fields except fam (Erlang 4, as Elixir, Clojure, Haskell; Balboa 4 and typicality 2, as 54124, the same
//   person under his full name; the old 5/5 was the dance's). See tools/gen/batch380-changes.txt.
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch380.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// old id, old text, kept sense { text, gloss, type }, moved themes, new sense { text, gloss, type, fam, typ: { theme: typicality } (default: the old value) }, reason
const SPLIT = [
  [41887, 'erlang', { text: 'erlang', gloss: 'unit', type: 'common' }, ['programming_languages'], { text: 'Erlang', gloss: 'language', type: 'proper', fam: 4, typ: {} },
    'unit of telephone traffic (after A. K. Erlang), lowercase as volt, watt; the language is a name (Ericsson), proper as its siblings'],
  [11783, 'balboa', { text: 'Balboa', gloss: 'dance', type: 'proper' }, ['conquistadors'], { text: 'Balboa', gloss: 'conquistador', type: 'person', fam: 4, typ: { conquistadors: 2 } },
    'the dance is named after the Balboa Peninsula and capitalised in usage (Charleston [dance] proper); the conquistador is a person, as Cortés, Pizarro'],
];
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'status'];
const short = e => KEYS.map(k => `${k}=${JSON.stringify(e[k])}`).join(' ') + ' typ=' + JSON.stringify(e.typ);
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const shown = new Set(); for (const e of P.entries) for (const s of Object.values(e.show || {})) shown.add(String(s).toLowerCase());
const log = [];
let n = 0;
for (const [id, oldText, keep, move, add, why] of SPLIT) {
  const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`);
  const done = P.entries.find(x => x !== e && x.text === add.text && x.gloss === add.gloss);
  if (done) { if (e.text !== keep.text || e.gloss !== keep.gloss || e.type !== keep.type || move.some(t => e.typ[t]) || move.some(t => !done.typ[t])) throw Error(`entry ${id}: half done, check by hand`); continue; }
  if (e.text !== oldText || move.some(t => !e.typ[t])) throw Error(`entry ${id} is "${e.text}" ${JSON.stringify(e.typ)}, expected "${oldText}" linked to ${move}`);
  if (e.aliasOf || P.entries.some(a => a.aliasOf === id) || Object.keys(e.show || {}).length || Object.keys(e.use || {}).length || e.nameOkIn.length) throw Error(`entry ${id} has aliases, shown texts or nameOkIn: check by hand`);
  if (shown.has(oldText)) throw Error(`a shown text elsewhere is "${oldText}": check by hand`);
  for (const s of [keep, add]) { const twin = (P.ix.byText.get(s.text.toLowerCase()) || []).find(x => x !== e && (x.gloss || '') === s.gloss); if (twin) throw Error(`"${s.text}" [${s.gloss}] would repeat ${twin.id}`); }
  const was = short(e);
  const { id: _i, text: _t, gloss: _g, type: _y, typ: _l, ...rest } = structuredClone(e);
  const typ = Object.fromEntries(move.map(t => [t, add.typ[t] ?? e.typ[t]]));
  const x = addEntry(P, add.text, { ...rest, gloss: add.gloss, type: add.type, fam: add.fam ?? e.fam, typ });
  for (const t of move) delete e.typ[t];
  Object.assign(e, { text: keep.text, gloss: keep.gloss, type: keep.type });
  const gs = [];
  for (const t of move) for (const g of P.ix.theme.get(t).groups || []) { const i = g.indexOf(id); if (i >= 0) { g[i] = x.id; gs.push(`${t} group [${g.join(',')}]`); } }
  log.push(`${id} before: ${was}\n${id} after:  ${short(e)}\n${x.id} new:    ${short(x)}${gs.length ? '\n  moved: ' + gs.join('; ') : ''}\n  (${why})`);
  n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} splits; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = `Choices:
  Kept ids: 41887 keeps the unit (it had no gloss and was typed common, which fits the unit); 11783 keeps the dance (its gloss was "dance").
  Erlang [language] is proper, like every named language in the theme (Python, Haskell, Elixir; only acronyms differ); no tm (Java, Swift have none).
  Balboa [dance] is capital: named after the Balboa Peninsula, Newport Beach; swing-dance writing and Wikipedia write "Balboa", "Pure Balboa", "Bal-Swing";
    no Oxford or Merriam-Webster entry for the dance was found. Siblings: Charleston [dance] proper; lindy hop and peabody are lowercase in the same theme
    (doubtful for Simon: lowercase "balboa" would follow them). The T15 medium list proposed Balboa.
  Balboa [conquistador] is typed person, as Cortés, Pizarro, de Soto in the theme; it takes the theme's group with 54124 Vasco Núñez de Balboa (one per level).
  Ratings: fam copied except Erlang [language] 4 (the merged 5 suited the unit; Elixir, Clojure, Haskell are 4) and Balboa [conquistador] fam 4, typicality 2,
    as 54124 (the same man; the merged 5/5 suited the dance). Typicality otherwise copied (erlang in languages 4). status copied ("gen"). pos noun for all.
  The three "balboa" entries now differ by gloss: Balboa [dance], Balboa [conquistador], balboa [currency] 56799; erlang [unit] and Erlang [language] likewise.
    No two of them share a theme. The game keeps displayed text unique within a level (lowercase), so two of them never meet in one level.
`;
  fs.writeFileSync(new URL('batch380-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch380.mjs, ${P.lib.modified}): ${n} entries split into two, one entry per sense.\n\n${log.join('\n')}\n\n${NOTE}`);
  console.log('library v' + P.lib.version);
}
