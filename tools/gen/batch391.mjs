// Library batch v391 (2026-11-17, Simon approved): the three oddities the W2 work (v390) left in the "names that are ..." themes, ISSUES.md W2.
//   1 MAY: 27948 may [might] (the modal verb) was the months-theme member; the month entry 25268 May takes its link, the verb is unlinked (it was in no other theme).
//   2 ASPEN: 1649 quaking aspen is no name; its link in names that are trees goes (aspen 1648, shown Aspen, stays; the synonym group [aspen, quaking aspen] there goes with it).
//   3 PAEONY: the export shows a British player the root's UK spelling alias inside a shown text, so peony 1717 (UK alias paeony) gave "Paeony", which is no name.
//      The flowers theme links a new name entry Peony [name] (no UK alias) instead; the flower keeps its other 13 themes.
//   4 NAMES: given-name entries that exist (Daisy 67400, Lily 67401, Poppy 67402, Rowan 67404, Ruby 67399) take the names-theme links of the common words (capital rule:
//      the theme's sense is a name); the common entry's link and its capital shown text go. Same typicality as the link it replaces.
// Allow-list keys of the removed links leave js/caselint-allow.js; keys for new case-lint hits in the names themes are added (none expected).
// Evidence per change: tools/gen/batch391-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch391.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint } from '../../js/caselint.js';
import { CASE_OK } from '../../js/caselint-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/caselint-allow.js', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const NT = P.themes.filter(t => /^names that are /.test(t.name)).map(t => t.id);
const TH = id => P.themes.find(t => t.id === id);
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const sameText = () => { const s = new Set(); for (const t of P.themes) { const seen = new Map(); for (const e of P.ix.byTheme.get(t.id) || []) { const k = ((!e.aliasOf && e.show?.[t.id]) || e.text).toLowerCase(); if (seen.has(k) && seen.get(k) !== e.id) s.add(`${t.id}: "${k}" (${seen.get(k)}, ${e.id})`); else seen.set(k, e.id); } } return s; };
const [before, mBefore] = count(), sameBefore = sameText();
const log = [], dropKeys = new Set();
let n = 0;
const lab = e => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}`;

// move the link in `tid` from entry `from` to entry `to` (same typicality); the old link's shown text goes with it
function move(tid, from, to, why) {
  const a = E(from), b = E(to);
  if (a.typ[tid] === undefined && b.typ[tid] !== undefined) return;   // done on an earlier run
  if (a.typ[tid] === undefined) throw Error(`${from}: not in ${tid}`);
  if (b.typ[tid] !== undefined) throw Error(`${to}: already in ${tid}`);
  const v = a.typ[tid], sh = a.show?.[tid];
  delete a.typ[tid]; if (a.show) delete a.show[tid]; if (a.use) delete a.use[tid];
  b.typ[tid] = v; n++; dropKeys.add(from + '|' + tid);
  for (const g of TH(tid).groups || []) if (g.includes(from)) throw Error(`${from} is in a group of ${tid}: check by hand`);
  log.push(`${tid}: ${lab(a)} (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}) -> ${lab(b)}; ${a.text} keeps ${Object.keys(a.typ).length} other themes  (${why})`);
}
function unlink(tid, id, why) {
  const a = E(id);
  if (a.typ[tid] === undefined) return;
  const v = a.typ[tid], sh = a.show?.[tid];
  delete a.typ[tid]; if (a.show) delete a.show[tid]; if (a.use) delete a.use[tid]; n++; dropKeys.add(id + '|' + tid);
  const t = TH(tid), gs = (t.groups || []).map(g => g.filter(x => x !== id)), kept = gs.filter(g => g.length > 1);
  if (JSON.stringify(kept) !== JSON.stringify(t.groups || [])) { log.push(`${tid}: groups ${JSON.stringify(t.groups)} -> ${JSON.stringify(kept)}`); t.groups = kept; }
  log.push(`${tid}: ${lab(a)} unlinked (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}); keeps ${Object.keys(a.typ).length} other themes  (${why})`);
}

// 1 MAY
move('names_that_are_months', 27948, 25268, 'gloss "might", pos verb: the modal verb, not the month; 25268 May [month] is the month entry, as April 15, June 16, July 25269, August 25271 in this theme');
// 2 QUAKING ASPEN
unlink('names_that_are_trees', 1649, 'a species name, not used as a given name; the name sense is covered by aspen 1648 shown "Aspen" (no Aspen [given name] entry; 50013 Aspen is the ski town)');
// 3 PAEONY: a name entry Peony, so the UK alias of the flower no longer applies in this theme
{ let pe = P.entries.find(e => e.text === 'Peony' && e.gloss === 'name');
  if (!pe) { const f = E(1717); pe = addEntry(P, 'Peony', { gloss: 'name', pos: 'noun', type: 'person', fam: f.fam, status: 'gen', region: [] }); reindex(P); n++;
    log.push(`new entry ${lab(pe)} fam ${pe.fam} (as Daisy 67400 [name] person; the flower's familiarity)  (a girl's name in use in England and Wales; spelt Peony, never Paeony)`); }
  move('names_that_are_flowers', 1717, pe.id, 'the export derives a UK shown text from a root\'s UK spelling alias: peony + paeony gave "Paeony", not a name; the name entry has no UK alias, so every player sees "Peony"'); }
// 4 NAMES: existing given-name entries
for (const [tid, from, to] of [['names_that_are_flowers', 1695, 67400], ['names_that_are_flowers', 1697, 67401], ['names_that_are_flowers', 1701, 67402],
  ['names_that_are_trees', 1679, 67404], ['names_that_are_gems', 31657, 67399], ['names_that_are_colors', 31657, 67399]])
  move(tid, from, to, `capital rule: the theme's sense is a name and ${E(to).text} [${E(to).gloss}] (${E(to).type}, in ${Object.keys(E(to).typ).filter(x => !NT.includes(x)).join(', ')}) is that name`);
reindex(P);

// UK shown texts left in the names themes (the export rule: a root with a show there and a UK-only spelling alias)
const ukLeft = [];
for (const tid of NT) for (const e of P.ix.byTheme.get(tid) || []) if (!e.aliasOf && e.show?.[tid]) { const uk = P.entries.find(x => x.aliasOf === e.id && x.aliasKind === 'spelling' && (x.region || []).includes('UK') && !(x.region || []).includes('US')); if (uk) ukLeft.push(`${tid} ${e.id} ${e.text} shown ${e.show[tid]}, UK ${uk.text}`); }
const newAllow = new Set(); for (const i of caseLint(P)) if (NT.includes(i.themeId) && !CASE_OK.has(i.entryId + '|' + i.themeId)) newAllow.add(i.entryId + '|' + i.themeId);
const unused = [...dropKeys].filter(k => CASE_OK.has(k));
const [after, mAfter] = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const newSame = [...sameAfter].filter(x => !sameBefore.has(x));
const body = `${log.join('\n') || 'none'}\n\nUK shown texts left in the names themes: ${ukLeft.join('; ') || 'none'}\nSame text twice in a theme, new: ${newSame.join('; ') || 'none'}`
  + `\nAllow-list keys removed (links gone): ${unused.join(', ') || 'none'}\nAllow-list keys added: ${[...newAllow].join(', ') || 'none'}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}`;
console.log(body + `\n\n${n} changes`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  let src = fs.readFileSync(ALLOW, 'utf8');
  for (const k of unused) { const re = new RegExp(`\\n  '${k.replace('|', '\\|')}',[^\\n]*`); if (!re.test(src)) throw Error('allow key not found ' + k); src = src.replace(re, ''); }
  if (newAllow.size) src = src.replace(/\n\]\);\s*$/, `\n${[...newAllow].map(k => `  '${k}', // names theme, v391`).join('\n')}\n]);\n`);
  fs.writeFileSync(ALLOW, src);
  console.log('library v' + P.lib.version + ' ' + P.lib.modified);
}
