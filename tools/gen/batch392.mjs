// Library batch v392 (2026-11-17, Simon approved every change): doubtful members of the "names that are ..." themes, the three wines left by v388, T26, T28.
//   1 NAMES: 20 links with no given-name use leave their names theme (evidence392-names.txt DROP list); borderline names (Birch, Tulip, Petunia, Bluebell, Orchid,
//      Wisteria, Topaz, Magenta) stay. A synonym group left with one member goes, as v391 did for quaking aspen.
//   2 LINDEN: linden 1676 (a real given name) joins names that are trees, shown "Linden", in place of Lime/Basswood.
//   3 AURORA: new entry Aurora [name] person takes the names_that_are_places link of aurora [sky lights] (wrong sense), as Peony/Daisy at v391.
//   4 WINES (rules 1, 9): Gavi, Côtes du Rhône, Liebfraumilch lowercase common; plain spelling alias "cotes du rhone" (rule 8).
//   5 T26: pâté 18838 [spread] leaves pacific_instruments (the Cook Islands drum pate is another word).
//   6 T28: plain spelling aliases for Châteauneuf-du-Pape 53809 and Pouilly-Fuissé 53835 (rule 8), as v390's plain aliases.
// Not changed (Simon): toere, puniu, kalaau, ukeke, pu (Hawaiian dictionaries do not count under rule 8).
// Allow-list keys of removed links leave js/caselint-allow.js; keys only for new case-lint hits are added.
// Evidence per change: tools/gen/batch392-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch392.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint } from '../../js/caselint.js';
import { CASE_OK } from '../../js/caselint-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/caselint-allow.js', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const TH = id => { const t = P.themes.find(t => t.id === id); if (!t) throw Error(`no theme ${id}`); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const sameText = () => { const s = new Set(); for (const t of P.themes) { const seen = new Map(); for (const e of P.ix.byTheme.get(t.id) || []) { const k = ((!e.aliasOf && e.show?.[t.id]) || e.text).toLowerCase(); if (seen.has(k) && seen.get(k) !== e.id) s.add(`${t.id}: "${k}" (${seen.get(k)}, ${e.id})`); else seen.set(k, e.id); } } return s; };
const [before, mBefore] = count(), sameBefore = sameText();
const log = { N: [], L: [], A: [], W: [], T: [] }, dropKeys = new Set(), addWhy = new Map();
let n = 0;
const lab = e => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}`;

function unlink(part, tid, id, why) {
  const a = E(id);
  if (a.typ[tid] === undefined) return;   // done on an earlier run
  const v = a.typ[tid], sh = a.show?.[tid];
  delete a.typ[tid]; if (a.show) delete a.show[tid]; if (a.use) delete a.use[tid]; n++; dropKeys.add(id + '|' + tid);
  const t = TH(tid), gs = (t.groups || []).map(g => g.filter(x => x !== id)), kept = gs.filter(g => g.length > 1);
  if (JSON.stringify(kept) !== JSON.stringify(t.groups || [])) { log[part].push(`${tid}: groups ${JSON.stringify(t.groups)} -> ${JSON.stringify(kept)}`); t.groups = kept; }
  log[part].push(`${tid}: ${lab(a)} unlinked (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}); keeps ${Object.keys(a.typ).length} other themes${Object.keys(a.typ).length ? ' (' + Object.keys(a.typ).join(', ') + ')' : ''}  (${why})`);
}
function move(part, tid, from, to, why) {
  const a = E(from), b = E(to);
  if (a.typ[tid] === undefined && b.typ[tid] !== undefined) return;
  if (a.typ[tid] === undefined) throw Error(`${from}: not in ${tid}`);
  if (b.typ[tid] !== undefined) throw Error(`${to}: already in ${tid}`);
  for (const g of TH(tid).groups || []) if (g.includes(from)) throw Error(`${from} is in a group of ${tid}: check by hand`);
  const v = a.typ[tid], sh = a.show?.[tid];
  delete a.typ[tid]; if (a.show) delete a.show[tid]; if (a.use) delete a.use[tid];
  b.typ[tid] = v; n++; dropKeys.add(from + '|' + tid);
  log[part].push(`${tid}: ${lab(a)} (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}) -> ${lab(b)} (same typicality); ${a.text} keeps ${Object.keys(a.typ).length} other themes (${Object.keys(a.typ).join(', ')}${Object.keys(a.show || {}).length ? '; shown ' + JSON.stringify(a.show) : ''})  (${why})`);
}
function recase(part, id, from, to, why) {
  const e = E(id);
  if (e.text === to && e.type === 'common') return;
  if (e.text !== from || e.aliasOf) throw Error(`${id}: expected root "${from}", found "${e.text}"`);
  const clash = P.entries.find(x => x !== e && x.text === to); if (clash) throw Error(`${id}: an entry "${to}" exists (${clash.id})`);
  const was = `"${e.text}" ${e.type}`; e.text = to; e.type = 'common'; n++;
  log[part].push(`${id} ${was} -> "${to}" common; links ${Object.entries(e.typ).map(([k, v]) => k + ':' + v).join(', ')} unchanged${Object.keys(e.show || {}).length ? ', shown ' + JSON.stringify(e.show) : ', no shown texts'}  (${why})`);
}
function plain(part, id, text, why) {
  const e = E(id);
  if (P.entries.some(x => x.aliasOf === id && x.text === text)) return;
  if (e.aliasOf) throw Error(`${id} is an alias`);
  const clash = P.entries.find(x => x.text === text); if (clash) throw Error(`an entry "${text}" exists (${clash.id})`);
  const a = addEntry(P, text, { pos: e.pos, fam: e.fam, status: e.status, region: [], gloss: '', type: e.type, typ: {}, show: {}, use: {}, nameOkIn: [...(e.nameOkIn || [])], aliasOf: id, aliasKind: 'spelling' });
  reindex(P); n++;
  log[part].push(`new spelling alias ${a.id} "${text}" of ${id} "${e.text}" (${a.type}, fam ${a.fam} as the root, region none, no links of its own)  (${why})`);
}

// ---------- 1 NAMES: no given-name use (evidence392-names.txt: SSA via namealmanac, ONS via namestack) ----------
const NS = (tid, rows) => { for (const [id, ev] of rows) unlink('N', tid, id, ev); };
NS('names_that_are_trees', [[1678, 'basswood: no SSA record; a US regional alias of linden carrying its own link, linden takes the name sense (part 2)'],
  [1681, 'dogwood: no SSA record'], [29944, 'hemlock [poison]: no SSA record, and the wrong sense (hemlock [tree] is 29954)'], [1653, 'larch: no SSA record'],
  [1660, 'teak: SSA 62 births in all since 1983, peak 9'], [1656, 'hickory: SSA 17 births in all 1973-2023'], [1650, 'sycamore: no SSA record'], [1647, 'poplar: no SSA record'],
  [29942, 'rosewood: no SSA record'], [64792, 'lime [linden]: no SSA record; linden takes the name sense (part 2)'], [29985, 'mulberry: no SSA record'], [1635, 'elm: no SSA record']]);
NS('names_that_are_flowers', [[1744, 'freesia: SSA 7 births in all, all in 2000'], [1723, 'buttercup: no SSA record; a pet name, not a given name']]);
NS('names_that_are_gems', [[29877, 'zircon: no SSA record'], [29878, 'agate: no SSA record (Agata is another name)'], [29876, 'peridot: SSA about 5 births in all (2023)'], [29874, 'citrine: SSA 28 births in all 2019-2023']]);
NS('names_that_are_colors', [[7706, 'sepia: SSA 5 births in all (1973)'], [7723, 'russet: no SSA record']]);

// ---------- 2 LINDEN ----------
{ const tid = 'names_that_are_trees', e = E(1676), TYP = 3;
  if (e.typ[tid] === undefined) { e.typ[tid] = TYP; e.show = { ...(e.show || {}), [tid]: 'Linden' }; n++;
    log.L.push(`${tid}: ${lab(e)} linked, typicality ${TYP}, shown "Linden"; keeps ${Object.keys(e.typ).length - 1} other themes  (SSA 6,100 births since 1889, 210 in 2025; typicality as the sibling names with the same order of use: Alder 1675 (139 in 2025) 3, Cypress 1646 (184 in 2025) 3; the links it replaces were Lime 4 and Basswood 5)`); } }

// ---------- 3 AURORA ----------
{ let au = P.entries.find(e => e.text === 'Aurora' && e.gloss === 'name');
  if (!au) { au = addEntry(P, 'Aurora', { gloss: 'name', pos: 'noun', type: 'person', fam: 2, status: 'gen', region: [] }); reindex(P); n++;
    log.A.push(`new entry ${lab(au)} fam ${au.fam}, region none, as Peony 67457 / Daisy 67400 [name] person  (SSA 2025: 7,065 girls, #15; fam 2 as the girls' names of that rank: Nora, Stella, Hazel fam 2; the top ten are fam 1)`); }
  move('A', 'names_that_are_places', 29903, au.id, 'aurora [sky lights] is the wrong sense; the theme links names (Jordan, Chelsea, Georgia, Phoenix [name]); the name entry is capital, so no shown text'); }

// ---------- 4 WINES ----------
recase('W', 53828, 'Gavi', 'gavi', 'rule 9: no dictionary lists the wine, so lowercase; rule 2 siblings soave, muscadet, vinho verde, prosecco agree. Recheck');
recase('W', 53808, 'Côtes du Rhône', 'côtes du rhône', 'rule 1: M-W, the one dictionary that lists it, prints "côtes du rhône" lowercase, "often capitalized"; rule 9 agrees. Recheck');
plain('W', 53808, 'cotes du rhone', 'rule 8: M-W prints the circumflexes, so the accented form is the root and the plain form a spelling alias');
recase('W', 53832, 'Liebfraumilch', 'liebfraumilch', 'rule 1: M-W lowercase, Oxford, Collins, Random House capital: the dictionaries disagree, so lowercase. Recheck M-W');

// ---------- 5 T26 ----------
unlink('T', 'pacific_instruments', 18838, 'T26: pâté [spread] is the food; the Cook Islands slit drum "pate" is another word (no new entry, Simon)');

// ---------- 6 T28 ----------
plain('T', 53809, 'Chateauneuf-du-Pape', 'T28, rule 8: the plain form is always kept as a spelling alias of an accented root; the case of the root kept, as v390 (Maori, Cook Islands Maori): a lowercase alias of a proper root is a case warning');
plain('T', 53835, 'Pouilly-Fuisse', 'T28, rule 8: as Chateauneuf-du-Pape');
reindex(P);

// allow list: keys of links gone; keys for new case-lint hits (each printed, checked by hand before --apply)
const unused = [...dropKeys].filter(k => CASE_OK.has(k));
const keep = new Set([...CASE_OK].filter(k => !dropKeys.has(k)));
const lint = caseLint(P), newAllow = [];
for (const i of lint) { const k = i.entryId + '|' + i.themeId; if (!keep.has(k) && !newAllow.includes(k)) newAllow.push(k); }
const lintMsg = lint.filter(i => !keep.has(i.entryId + '|' + i.themeId)).map(i => `${i.entryId}|${i.themeId}: ${i.msg || i.kind || ''}`);
const [after, mAfter] = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const newSame = [...sameAfter].filter(x => !sameBefore.has(x));
const sec = (h, a) => `${h}:\n  ${a.join('\n  ') || 'none'}`;
const body = [sec('1 NAMES', log.N), sec('2 LINDEN', log.L), sec('3 AURORA', log.A), sec('4 WINES', log.W), sec('5/6 T26, T28', log.T)].join('\n')
  + `\n\nSame text twice in a theme, new: ${newSame.join('; ') || 'none'}\nAllow-list keys removed (links gone): ${unused.join(', ') || 'none'}`
  + `\nCase lint after (not allowed): ${lintMsg.join(' | ') || 'none'}\nAllow-list keys to add: ${newAllow.join(', ') || 'none'}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}`;
console.log(body + `\n\n${n} changes`);
const WHY = { '1676|names_that_are_trees': 'linden shown "Linden" in names that are trees: capital for the name sense (W2; v392, Simon 2026-11-17)' };
if (process.argv.includes('--apply') && n) {
  for (const k of newAllow) if (!WHY[k]) throw Error('case-lint hit with no reviewed reason, not applied: ' + k);
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  let src = fs.readFileSync(ALLOW, 'utf8');
  for (const k of unused) { const re = new RegExp(`\\n  '${k.replace('|', '\\|')}',[^\\n]*`); if (!re.test(src)) throw Error('allow key not found ' + k); src = src.replace(re, ''); }
  if (newAllow.length) src = src.replace(/\n\]\);\s*$/, `\n${newAllow.map(k => `  '${k}', // ${WHY[k]}`).join('\n')}\n]);\n`);
  fs.writeFileSync(ALLOW, src);
  console.log('library v' + P.lib.version + ' ' + P.lib.modified);
}
