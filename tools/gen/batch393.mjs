// Library batch v393 (2026-11-17, Simon approved W9): names_that_are_months links of the foreign month words avril and julio sit on the month sense.
//   New entries Avril [name] and Julio [name] person (as Peony 67457 / Aurora 67458) take those links (same typicality); avril and julio keep their month themes
//   and lose the shown text. The other members were checked (batch393-changes.txt); doubtful ones are listed there, not changed.
// Allow-list keys of moved links leave js/caselint-allow.js; keys only for new case-lint hits are added (none expected: the name entries are capital).
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch393.mjs [--apply]
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
const log = [], dropKeys = new Set();
let n = 0;
const lab = e => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}`;
const TID = 'names_that_are_months';

function move(from, to, why) {
  const a = E(from), b = E(to);
  if (a.typ[TID] === undefined && b.typ[TID] !== undefined) return;
  if (a.typ[TID] === undefined) throw Error(`${from}: not in ${TID}`);
  if (b.typ[TID] !== undefined) throw Error(`${to}: already in ${TID}`);
  for (const g of TH(TID).groups || []) if (g.includes(from)) throw Error(`${from} is in a group of ${TID}: check by hand`);
  const v = a.typ[TID], sh = a.show?.[TID];
  delete a.typ[TID]; if (a.show) { delete a.show[TID]; if (!Object.keys(a.show).length) delete a.show; } if (a.use) delete a.use[TID];
  b.typ[TID] = v; n++; dropKeys.add(from + '|' + TID);
  log.push(`${TID}: ${lab(a)} (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}) -> ${lab(b)} (same typicality, no shown text); ${a.text} keeps ${Object.keys(a.typ).length} other themes (${Object.keys(a.typ).join(', ')}${Object.keys(a.show || {}).length ? '; shown ' + JSON.stringify(a.show) : ''})  (${why})`);
}
function nameEntry(text, fam, why) {
  let e = P.entries.find(x => x.text === text && x.gloss === 'name');
  if (!e) { e = addEntry(P, text, { gloss: 'name', pos: 'noun', type: 'person', fam, status: 'gen', region: [] }); reindex(P); n++;
    log.push(`new entry ${lab(e)} fam ${e.fam}, region none, status gen, as Peony 67457 / Aurora 67458 [name] person  (${why})`); }
  return e;
}

{ const e = E(27146); if (!e.gloss) { e.gloss = 'French month'; n++;
  log.push(`27146 "avril" gloss none -> "French month" (Checks needs-gloss: two entries "avril" once Avril [name] exists; as its siblings mai 27147 [French month], julio 27160 [Spanish month])`); } }
const av = nameEntry('Avril', 3, 'fam 3: known to English-speaking players mainly through Avril Lavigne; rare as a given name in the US and UK; the month word avril is fam 3');
move(27146, av.id, 'W9: avril [French month] is the month sense; the theme links given names (Mai, Julius, Augusta), so the name entry takes it');
const ju = nameEntry('Julio', 3, 'fam 3: known to English-speaking players through Julio Iglesias and "Me and Julio Down by the Schoolyard", common among US Hispanic boys but not a mainstream English name; as Catalina, Paloma 3 (latin american names); the month word julio is fam 3');
move(27160, ju.id, 'W9: julio [Spanish month] is the month sense, as avril');
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
const body = `W9:\n  ${log.join('\n  ') || 'none'}`
  + `\n\nMembers of ${TID} now: ${(P.ix.byTheme.get(TID) || []).map(e => lab(e) + (e.aliasOf ? ' (alias of ' + e.aliasOf + ')' : '') + ' typ ' + (e.typ[TID] ?? 'inherited')).join('; ')}`
  + `\nSame text twice in a theme, new: ${newSame.join('; ') || 'none'}\nAllow-list keys removed (links gone): ${unused.join(', ') || 'none'}`
  + `\nCase lint after (not allowed): ${lintMsg.join(' | ') || 'none'}\nAllow-list keys to add: ${newAllow.join(', ') || 'none'}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}`;
console.log(body + `\n\n${n} changes`);
if (process.argv.includes('--apply') && n) {
  if (newAllow.length) throw Error('case-lint hit with no reviewed reason, not applied: ' + newAllow.join(', '));
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  let src = fs.readFileSync(ALLOW, 'utf8');
  for (const k of unused) { const re = new RegExp(`\\n  '${k.replace('|', '\\|')}',[^\\n]*`); if (!re.test(src)) throw Error('allow key not found ' + k); src = src.replace(re, ''); }
  fs.writeFileSync(ALLOW, src);
  console.log('library v' + P.lib.version + ' ' + P.lib.modified);
}
