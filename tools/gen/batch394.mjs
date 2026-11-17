// Library batch v394 (2026-11-18, Simon approved T30 and I18).
// T30: names_that_are_months links of Augusta (one entry for the given name and the US state capital), Augustine [saint] and Augustus [emperor]
//   move to new [name] person entries (as Avril / Julio at v393), same typicality and fam (so the same link difficulty). Augusta 29879 becomes
//   the place (gloss "city", type place) and keeps us_state_capitals; Augustus 20386 gets the gloss "emperor" (needs-gloss once Augustus [name] exists).
// I18: given names are typed person (Simon). Every proper entry whose themes are all given-name themes (the "names" folder without surnames, plus
//   flowers_used_as_girls_names) is retyped person, except two whose label is a place (Brooklyn [borough], Carolina [US state]); plus 10 named
//   entries whose other themes are persons too (characters, saints, evangelists, a queen). Aliases of the retyped entries that are typed proper follow.
//   Entries that mix a given name with a sense that is not a person are listed, not changed.
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch394.mjs [--apply]
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
  log.push(`${TID}: ${lab(a)} (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}) -> ${lab(b)} (same typicality, no shown text); ${a.text} keeps ${Object.keys(a.typ).length} other themes (${Object.keys(a.typ).join(', ')})  (${why})`);
}
function nameEntry(text, fam, why) {
  let e = P.entries.find(x => x.text === text && x.gloss === 'name');
  if (!e) { e = addEntry(P, text, { gloss: 'name', pos: 'noun', type: 'person', fam, status: 'gen', region: [] }); reindex(P); n++;
    log.push(`new entry ${lab(e)} fam ${e.fam}, region none, status gen, as Avril 67462 / Julio 67463 [name] person  (${why})`); }
  return e;
}
function set(id, key, val, why) {
  const e = E(id); if (e[key] === val) return;
  log.push(`${lab(e)} ${key} ${e[key] ?? 'none'} -> ${val}  (${why})`); e[key] = val; n++;
}

// ---------- T30 ----------
set(29879, 'gloss', 'city', 'needs-gloss once Augusta [name] exists; as Lincoln 29892, Cheyenne 29899, Denver 35912 [city]');
set(29879, 'type', 'place', 'the entry keeps only the US state capital: places are place');
const ag = nameEntry('Augusta', 3, 'fam 3 as the old entry: an old-fashioned given name, rare today');
move(29879, ag.id, 'T30: Augusta held the name and the city; the city keeps us_state_capitals, the name entry takes the name link');
const an = nameEntry('Augustine', 3, 'fam 3 as Augustine [saint]: a given name known mainly through the saints');
move(34344, an.id, 'T30: the link sat on the saint; Augustine [saint] keeps famous_saints');
set(20386, 'gloss', 'emperor', 'needs-gloss once Augustus [name] exists');
const au = nameEntry('Augustus', 2, 'fam 2 as Augustus [emperor]: known as a given name through Augustus Gloop and the emperor it honours');
move(20386, au.id, 'T30: the link sat on the emperor; Augustus [emperor] keeps ancient_rome, emperors, roman_emperors');
reindex(P);

// ---------- I18 ----------
const NAMES = new Set(); const walk = id => { for (const t of P.themes) if (t.parent === id && t.id !== 'surnames') { NAMES.add(t.id); walk(t.id); } };
walk('names'); NAMES.add('flowers_used_as_girls_names');
for (const id of NAMES) TH(id);
const PLACE_LABEL = new Map([[29882, 'Brooklyn [borough]'], [29897, 'Carolina [US state]']]);   // label is a place: left (names_that_are_places sits on place senses, as Virginia, Denver)
const PERSON_TOO = new Map([   // other themes are persons too (type person: 'a named person or character')
  [29641, 'Beatrice: Shakespeare character'], [29652, 'Rosalind: Shakespeare character'], [29654, 'Cordelia: Shakespeare character'],
  [29768, 'Gertrude: Shakespeare character'], [29667, 'Matthew: evangelist'], [56818, 'John [name]: evangelist'], [29732, 'Esther: queen'],
  [29798, 'Cuthbert: saint'], [29818, 'Meg: March sister'], [29819, 'Beth: March sister']]);
const retyped = [], mixed = [];
for (const e of P.entries) {
  if (e.aliasOf || e.type !== 'proper') continue;
  const th = Object.keys(e.typ || {}); if (!th.some(t => NAMES.has(t))) continue;
  const other = th.filter(t => !NAMES.has(t));
  if (PLACE_LABEL.has(e.id)) { mixed.push(`${lab(e)}: only ${th.join(', ')}, but labelled a place; left`); continue; }
  if (other.length && !PERSON_TOO.has(e.id)) { mixed.push(`${lab(e)} name themes ${th.filter(t => NAMES.has(t)).join(', ')}; other ${other.join(', ')}`); continue; }
  e.type = 'person'; n++; retyped.push(e);
}
for (const id of PERSON_TOO.keys()) if (!retyped.includes(E(id)) && E(id).type !== 'person') throw Error('not retyped ' + id);
const aliasRetyped = [];
for (const e of P.entries) if (e.aliasOf && e.type === 'proper' && retyped.includes(E(e.aliasOf))) { e.type = 'person'; n++; aliasRetyped.push(e); }
// left: given-name entries in a name theme that are not proper (common words with a capital show, places, the title Carmen): not this rule
reindex(P);

// allow list: keys of links gone; keys for new case-lint hits
const unused = [...dropKeys].filter(k => CASE_OK.has(k));
const keep = new Set([...CASE_OK].filter(k => !dropKeys.has(k)));
const lint = caseLint(P), newAllow = [];
for (const i of lint) { const k = i.entryId + '|' + i.themeId; if (!keep.has(k) && !newAllow.includes(k)) newAllow.push(k); }
const lintMsg = lint.filter(i => !keep.has(i.entryId + '|' + i.themeId)).map(i => `${i.entryId}|${i.themeId}: ${i.msg || i.kind || ''}`);
const [after, mAfter] = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const newSame = [...sameAfter].filter(x => !sameBefore.has(x));
const body = `T30:\n  ${log.join('\n  ') || 'none'}`
  + `\n\nMembers of ${TID} now: ${(P.ix.byTheme.get(TID) || []).map(e => lab(e) + (e.aliasOf ? ' (alias of ' + e.aliasOf + ')' : '') + ' typ ' + (e.typ[TID] ?? 'inherited')).join('; ')}`
  + `\n\nI18: given-name themes (${NAMES.size}): ${[...NAMES].join(', ')}`
  + `\n  retyped proper -> person: ${retyped.length} entries${retyped.length ? ':\n    ' + retyped.map(e => `${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''}`).join(', ') : ''}`
  + `\n  aliases retyped with their root: ${aliasRetyped.length}${aliasRetyped.length ? ': ' + aliasRetyped.map(e => `${e.id} ${e.text} (${e.aliasKind}, of ${e.aliasOf})`).join(', ') : ''}`
  + `\n  left (proper, a given-name theme plus another sense):\n    ${mixed.join('\n    ') || 'none'}`
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
