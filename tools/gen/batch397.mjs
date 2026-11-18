// Library batch v397 (2026-11-18, Simon approved; ISSUES.md I20 and I21).
// I20: the common words that v390/v391 showed with a capital in the "names that are ..." themes (hope, jade, willow ...) follow the v395 rule
//   (DESIGN-entries.md, after the I18 paragraph: every link in a given-name theme sits on a given-name entry, gloss "name", type person).
//   Each word gets a "<Word> [name]" entry (type person, the old entry's fam, so every moved link keeps its difficulty) that takes the
//   given-name-theme links at the same typicality; the shown text (case-only) goes; the common entry keeps its other themes. When the shown
//   text differs from the entry's text (cherry tree "Cherry", pine tree "Pine", cassia tree "Cassia"), the name entry has the shown text.
//   One name entry per text (Cherry takes cherry [fruit]'s colors link and cherry tree's trees link). elder [tree], liberty [freedom] and
//   unity [harmony] become the name in place (IN_PLACE below: otherwise they keep no exported link, leave the export and shift its indices). A common entry that now shares its text
//   with the name and has no gloss gets one (needs-gloss), as v395 did for April, Siena ...
//   Left as batch395 listed: flowers_used_as_girls_names (the theme is about the flowers), same-person entries, word-play links, gloss variants.
// I21: sablé / sable [biscuit] and Sacré-Cœur / Sacre-Coeur are each one thing stored as two roots: the plain root becomes the accented root's
//   spelling alias in place (same id, so no export index moves), its links move to the root (as batch385's merge). kūmara / kumara stay as they are.
// Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch397.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, sameText as byText } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
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
const lab = e => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}${e.aliasOf ? ` (${e.aliasKind} alias of ${e.aliasOf})` : ''}`;
const NAMES = new Set(); const walk = id => { for (const t of P.themes) if (t.parent === id && t.id !== 'surnames') { NAMES.add(t.id); walk(t.id); } };
walk('names'); NAMES.add('flowers_used_as_girls_names');
const sec = s => log.push('', s);

// ---------- I20 ----------
// gloss for a common entry that has none and would share its text with the new name entry (needs-gloss); the wording follows the
// existing glosses of the same group (willow [tree], heather [plant], tawny [color], beryl [gemstone], honor [virtue] ...)
const GLOSS = new Map([
  [64, 'color'], [65, 'color'], [7684, 'color'], [7692, 'color'], [7712, 'color'], [7717, 'color'], [7720, 'color'], [7725, 'color'], [29937, 'color'],
  [1630, 'tree'], [1634, 'tree'], [1637, 'tree'], [1646, 'tree'], [1655, 'tree'], [1657, 'tree'], [1664, 'tree'], [1675, 'tree'], [1676, 'tree'],
  [1694, 'flower'], [1698, 'flower'], [1706, 'flower'], [1707, 'flower'], [1708, 'flower'], [1713, 'flower'], [1722, 'flower'], [1730, 'flower'],
  [1733, 'flower'], [1736, 'flower'], [1737, 'flower'], [1738, 'flower'], [1751, 'flower'], [1770, 'plant'], [1776, 'plant'], [29857, 'flowers'],
  [21132, 'spice'],
  [3972, 'happiness'], [4000, 'wish'], [4030, 'calm'], [4184, 'fairness'], [4273, 'belief'], [28298, 'giving'],
]);
const I20 = P.entries.filter(e => !e.aliasOf && e.type === 'common' && Object.keys(e.typ).some(t => NAMES.has(t) && t !== 'flowers_used_as_girls_names'));
// [name] text per entry: the shown text of its name links (all the same), else the entry's text with a capital
const nameText = e => { const sh = [...new Set(Object.keys(e.typ).filter(t => NAMES.has(t) && t !== 'flowers_used_as_girls_names').map(t => e.show?.[t] || e.text[0].toUpperCase() + e.text.slice(1)))];
  if (sh.length !== 1) throw Error(`${lab(e)}: name links show ${sh.join(', ')}`); return sh[0]; };
// move the link of theme tid from entry `from` to entry `to`, same typicality; a shown text that only changes case is dropped (as batch395)
function move(tid, from, to, why) {
  const a = E(from), b = E(to); TH(tid);
  if (a.typ[tid] === undefined && b.typ[tid] !== undefined) return;
  if (a.typ[tid] === undefined) throw Error(`${from}: not in ${tid}`);
  if (b.typ[tid] !== undefined) throw Error(`${to}: already in ${tid}`);
  if ((TH(tid).groups || []).some(g => g.includes(from))) throw Error(`${from} is in a group of ${tid}: check by hand`);
  if (a.nameOkIn?.includes(tid)) throw Error(`${from} has nameOkIn ${tid}: check by hand`);
  if (a.use?.[tid]) throw Error(`${from} has a use in ${tid}: check by hand`);
  for (const x of P.ix.aliases.get(from) || []) if (x.typ?.[tid] !== undefined) throw Error(`alias ${x.id} of ${from} has its own ${tid} link: check by hand`);
  const v = a.typ[tid], sh = a.show?.[tid];
  if (sh && sh.toLowerCase() !== b.text.toLowerCase()) throw Error(`${from} shows "${sh}" in ${tid}: check by hand`);
  delete a.typ[tid]; if (a.show) delete a.show[tid];
  b.typ[tid] = v; n++; dropKeys.add(from + '|' + tid);
  log.push(`${tid}: ${lab(a)} (typicality ${v}${sh ? ', shown "' + sh + '"' : ''}) -> ${lab(b)} (same typicality${sh ? ', the case-only shown text goes' : ''})  (${why})`);
}
function set(id, key, val, why) {
  const e = E(id); if (e[key] === val) return;
  log.push(`${lab(e)} ${key} ${e[key] === '' || e[key] === undefined ? 'none' : e[key]} -> ${val}  (${why})`); e[key] = val; n++;
}
sec('I20: a [name] entry takes each given-name-theme link of a common word (flowers_used_as_girls_names stays on the flowers)');
const made = new Map();   // name text -> entry
const aliasLoss = [];
// entries whose given-name link is their only exported link: the entry itself becomes the name (same id, so its export index stays, as Brooklyn
// and Carolina at v395); without this the common entry would have no exported link, leave the export and shift every later index
const IN_PLACE = new Map([
  [28134, 'elder [tree] had no theme but names_that_are_trees'],
  [28278, 'liberty [freedom] had no theme but names_that_are_virtues'],
  [21504, 'unity [harmony] had only peace_words besides names_that_are_virtues, and peace_words is not in the game export; a new unity [harmony] takes peace_words'],
]);
for (const e of I20) {
  const txt = nameText(e), th = Object.keys(e.typ).filter(t => NAMES.has(t) && t !== 'flowers_used_as_girls_names');
  if (IN_PLACE.has(e.id)) {
    const why = 'I20: ' + IN_PLACE.get(e.id) + ', so the entry becomes the name ' + txt + ' in place (same id and export index, as Brooklyn and Carolina at v395)';
    const other = Object.keys(e.typ).filter(t => !th.includes(t));
    if (other.length) {
      const c = addEntry(P, e.text, { pos: e.pos, status: 'gen', region: [...e.region], gloss: e.gloss, type: 'common', fam: e.fam }); reindex(P); n++;
      log.push(`new entry ${lab(c)} fam ${c.fam}, region none, status gen  (the common sense of ${e.id}, same text, gloss and fam, so the moved links keep their difficulty)`);
      for (const t of other) move(t, e.id, c.id, 'I20: the common sense keeps ' + t);
    }
    for (const t of th) { if (e.show?.[t]) { if (e.show[t] !== txt) throw Error(`${lab(e)} shows "${e.show[t]}" in ${t}`); log.push(`${t}: ${lab(e)} shown "${e.show[t]}" -> none (the entry's text is now "${txt}")`); delete e.show[t]; n++; } dropKeys.add(e.id + '|' + t); }
    for (const a of P.ix.aliases.get(e.id) || []) throw Error(`${lab(e)} has alias ${lab(a)}: check by hand`);
    set(e.id, 'text', txt, why); set(e.id, 'gloss', 'name', 'the rule: a given-name entry has gloss "name"'); set(e.id, 'type', 'person', 'I18');
    reindex(P); made.set(txt, e); continue;
  }
  // an existing given-name entry with this text takes the links; any other entry with the text is another sense
  const exist = P.entries.filter(x => x.text === txt && !x.aliasOf && x.type === 'person');
  if (exist.length > 1) throw Error(`"${txt}": ${exist.length} person entries, check by hand`);
  let nm = exist[0] || made.get(txt) || P.entries.find(x => x.text === txt && x.gloss === 'name' && !x.aliasOf);
  if (nm && nm.gloss !== 'name' && nm.type === 'person') throw Error(`"${txt}": person entry ${lab(nm)} without gloss "name", check by hand`);
  if (!nm) {
    nm = addEntry(P, txt, { pos: 'noun', status: 'gen', region: [], gloss: 'name', type: 'person', fam: e.fam }); reindex(P); n++;
    log.push(`new entry ${lab(nm)} fam ${nm.fam}, region none, status gen  (fam ${e.fam} as ${e.id} "${e.text}", so the moved links keep their difficulty)`);
  } else if (made.has(txt) && nm.fam !== e.fam) throw Error(`"${txt}": fam ${nm.fam} vs ${e.fam} of ${lab(e)}`);
  made.set(txt, nm);
  for (const a of P.ix.aliases.get(e.id) || []) aliasLoss.push(`${lab(a)} no longer inherits ${th.join(', ')} from ${e.id} "${e.text}"`);
  for (const t of th) move(t, e.id, nm.id, `I20: the given name ${txt}; ${e.text} keeps ${Object.keys(e.typ).filter(x => !th.includes(x)).length} other theme(s)`);
}
reindex(P);
sec('I20: glosses for common entries that now share their text with a [name] entry (needs-gloss)');
const miss = [];
for (const nm of made.values()) for (const x of byText(P, nm.text)) if (x !== nm && !x.gloss) {
  if (!GLOSS.has(x.id)) { miss.push(`${lab(x)} [${Object.keys(x.typ).join(',')}] beside ${lab(nm)}`); continue; }
  set(x.id, 'gloss', GLOSS.get(x.id), `needs-gloss beside ${nm.text} [name]`);
}
if (miss.length) throw Error('needs a gloss (add to GLOSS):\n' + miss.join('\n'));
for (const id of GLOSS.keys()) if (!E(id).gloss) throw Error(`GLOSS ${id} unused`);

// ---------- I21 ----------
// merge root `aid` into root `rid` in place: `aid` becomes rid's spelling alias (same id, so its export index stays), its links move to rid (as batch385 merge)
const strip = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/œ/g, 'oe').toLowerCase();
const short = e => `text=${JSON.stringify(e.text)}${e.gloss ? ' gloss=' + JSON.stringify(e.gloss) : ''} type=${e.type} fam=${e.fam}${e.sensitive ? ' sensitive' : ''}${e.region?.length ? ' region=' + e.region : ''}${e.aliasOf ? ` aliasOf=${e.aliasOf} aliasKind=${e.aliasKind}` : ''} links={${Object.entries(e.typ || {}).map(([k, v]) => k + ':' + v).join(',')}}`;
function merge(rid, aid, why, opt = {}) {
  const r = E(rid), a = E(aid);
  if (a.aliasOf === rid && !Object.keys(a.typ).length) return;
  if (strip(r.text) !== strip(a.text)) throw Error(`merge ${rid}/${aid}: texts differ beyond accents`);
  if (a.aliasOf || r.aliasOf || Object.keys(a.use || {}).length || Object.keys(r.use || {}).length || a.nameOkIn?.length || Object.keys(a.show || {}).length) throw Error(`merge ${rid}/${aid}: check by hand`);
  if (P.entries.some(x => x.use && Object.values(x.use).includes(aid))) throw Error(`merge ${rid}/${aid}: a use points at ${aid}`);
  if (P.entries.some(x => x.aliasOf === aid)) throw Error(`merge ${rid}/${aid}: ${aid} has aliases`);
  if (P.themes.some(t => (t.groups || []).some(g => g.includes(aid)))) throw Error(`merge ${rid}/${aid}: in a group, check by hand`);
  if (a.pos !== r.pos || a.type !== r.type) throw Error(`merge ${rid}/${aid}: pos or type differ`);
  const wasR = short(r), wasA = short(a), moved = [];
  for (const [tid, v] of Object.entries(a.typ)) { if (tid in r.typ) throw Error(`merge ${rid}/${aid}: both in ${tid}`); r.typ[tid] = v; moved.push(`${tid} (typicality ${v})`); }
  const fam = Math.min(r.fam || 5, a.fam || 5); r.fam = fam;
  Object.assign(a, { typ: {}, show: {}, use: {}, nameOkIn: [], aliasOf: rid, aliasKind: 'spelling', fam, gloss: opt.gloss ?? a.gloss, sensitive: r.sensitive, region: [] });
  reindex(P);
  for (const tid of Object.keys(r.typ)) { const t = P.ix.theme.get(tid); if (t && !nameLeak(t, r) && nameLeak(t, a)) throw Error(`merge ${rid}/${aid}: alias leaks the name of ${tid}`); }
  n++;
  log.push(`${rid} before: ${wasR}`, `${aid} before: ${wasA}`, `${rid} after:  ${short(r)}`, `${aid} after:  ${short(a)}`, `  links moved to ${rid}: ${moved.join(', ')}  (${why})`);
}
sec('I21.1: sablé / sable [biscuit]');
merge(53157, 59451, 'one biscuit; rule 8: the Cambridge English Dictionary prints the headword "sablé (also sable)", so the root keeps the accent (Oxford and Merriam-Webster have no entry for the biscuit, see batch397-changes.txt); "sable" keeps its gloss "biscuit" beside sable [animal], [black], [color], [African grazer], Sable [name]; fam the lower of the two, as batch385');
sec('I21.2: Sacré-Cœur / Sacre-Coeur');
merge(57402, 37403, 'one basilica; the root keeps the French spelling (paris_landmarks; its alias Sacré-Coeur 57403 already existed); "Sacre-Coeur" is the plain spelling alias rule 8 asks for; fam the lower of the two, as batch385; sensitive as the root and its other alias');
reindex(P);

// allow list: keys of links gone are removed; new case-lint hits checked by hand are added (after burgundy's line, the same case)
const ADD = new Map([
  ['7684|colors_named_after_places', 'magenta the colour in colors named after places, beside Magenta [name] (v397)'],
  ['7685|colors_named_after_places', 'fuchsia the colour in colors named after places, beside Fuchsia [name] (v397)'],
  ['7712|colors_named_after_places', 'sienna the colour in colors named after places, beside Sienna [name] (v397)'],
]);
const unused = [...dropKeys].filter(k => CASE_OK.has(k)), added = [...ADD.keys()].filter(k => !CASE_OK.has(k));
for (const k of unused) CASE_OK.delete(k);
for (const k of added) CASE_OK.add(k);   // so the checks below count as after the apply
const lint = caseLint(P), newAllow = [];
for (const i of lint) { const k = i.entryId + '|' + i.themeId; if (!newAllow.includes(k)) newAllow.push(k); }
const unhit = added.filter(k => { CASE_OK.delete(k); const hit = caseLint(P).some(i => i.entryId + '|' + i.themeId === k); CASE_OK.add(k); return !hit; });
if (unhit.length) throw Error('ADD key with no case-lint hit: ' + unhit.join(', '));
const left = [];
for (const e of P.entries) {
  const th = Object.keys(e.typ || {}); if (!th.some(t => NAMES.has(t))) continue;
  const other = th.filter(t => !NAMES.has(t));
  if (e.type === 'person' && !other.length && (e.gloss === 'name' || !e.gloss)) continue;
  left.push(`${lab(e)}: ${th.filter(t => NAMES.has(t)).join(', ')}${other.length ? ' | other: ' + other.join(', ') : ''}`);
}
const [after, mAfter] = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const newSame = [...sameAfter].filter(x => !sameBefore.has(x));
console.log(`I20 common entries: ${I20.length}; name entries used: ${made.size}`
  + `\n${log.join('\n  ').trim() || 'none'}`
  + `\n\nAliases that stop inheriting a given-name link: ${aliasLoss.join('; ') || 'none'}`
  + `\n\nLeft in given-name themes (not a person entry with only name themes): ${left.length}\n    ${left.join('\n    ')}`
  + `\nSame text twice in a theme, new: ${newSame.join('; ') || 'none'}\nAllow-list keys removed (links gone): ${unused.length}: ${unused.join(', ') || 'none'}`
  + `\nAllow-list keys added (case-lint hits checked by hand): ${added.map(k => k + ' (' + ADD.get(k) + ')').join(', ') || 'none'}\nCase lint after, not allowed: ${newAllow.join(', ') || 'none'}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}`
  + `\n\n${n} changes`);
if (process.argv.includes('--apply') && (n || added.length || unused.length)) {
  if (newAllow.length) throw Error('case-lint hit with no reviewed reason, not applied: ' + newAllow.join(', '));
  if (n) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); }
  let src = fs.readFileSync(ALLOW, 'utf8');
  for (const k of unused) { const re = new RegExp(`\\n  '${k.replace('|', '\\|')}',[^\\n]*`); if (!re.test(src)) throw Error('allow key not found ' + k); src = src.replace(re, ''); }
  for (const k of [...added].reverse()) { const at = "\n  '7691|colors_named_after_places',", p = src.indexOf(at); if (p < 0) throw Error('anchor not found'); const q = src.indexOf('\n', p + 1);
    src = src.slice(0, q) + `\n  '${k}', // ${ADD.get(k)}` + src.slice(q); }
  fs.writeFileSync(ALLOW, src);
  console.log('library v' + P.lib.version + ' ' + P.lib.modified);
}
