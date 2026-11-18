// Library batch v396 (2026-11-18, Simon approved; ISSUES.md T32): rule 8 (DESIGN-entries.md "Single-word names" rule 8 and the rule-8 notes in
//   section 10) keeps the plain form of every accented root as a `spelling` alias, so nothing is harder to find. At v395, 386 of 571 accented
//   roots had none (tools/gen/plaincheck395.txt, tools/gen/plaincheck.mjs). This batch adds them.
// Alias shape, as the plain aliases made by batch381 (cheeses), batch385/386 (Māori macron roots, doner, droewors) and batch390: kind spelling,
//   text = the root's text with diacritics stripped (plaincheck.mjs's mapping), type, pos and fam of the root, region none, status gen, no links,
//   shown texts or uses of its own, nameOkIn copied from the root (as batch390). No gloss, as most plain aliases (Maori, doner, Gruyere), unless
//   two new aliases share a text (Pokemon x3, Sao Paulo, curacao, Ancien Regime/ancien regime): each then takes its root's gloss (needs-gloss),
//   as grey [color] / grey [horse color].
// Not added (each listed with its reason in batch396-changes.txt):
//   COLLIDE: the plain text (case ignored) is already the text of an entry or alias of a different word.
//   DUP: the plain text is the same word stored a second time (a plain duplicate root, or an alias of another root): reported, not merged (manager).
//   MISLEAD: the plain form is a common English word of another meaning that nobody writes for this word.
// Every collision must be classified below, or the script stops. Changes nothing when already done, so it can be rerun as a check.
// Run: node tools/gen/batch396.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, sameText as byText } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint } from '../../js/caselint.js';
import { CASE_OK } from '../../js/caselint-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const plain = s => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/đ/g, 'd').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/œ/g, 'oe');
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const sameText = () => { const s = new Set(); for (const t of P.themes) { const seen = new Map(); for (const e of P.ix.byTheme.get(t.id) || []) { const k = ((!e.aliasOf && e.show?.[t.id]) || e.text).toLowerCase(); if (seen.has(k) && seen.get(k) !== e.id) s.add(`${t.id}: "${k}" (${seen.get(k)}, ${e.id})`); else seen.set(k, e.id); } } return s; };
const [before, mBefore] = count(), sameBefore = sameText(), lintBefore = new Set(caseLint(P).map(i => i.entryId + '|' + i.themeId));
const lab = e => `${e.id} "${e.text}"${e.gloss ? ' [' + e.gloss + ']' : ''} ${e.type}${e.aliasOf ? ` (${e.aliasKind} alias of ${e.aliasOf} "${E(e.aliasOf).text}")` : ''}`;
const ths = e => Object.keys(e.typ || {}).join(', ') || 'no links';

// collisions: the plain text is a different word (root id -> why)
const COLLIDE = new Map([
  [19647, 'rose [flower], rose [color], Rose [name], rose [pink gem]: other words; rosé is the wine'],
  [26960, 'cay [island type]: another word; çay is Turkish tea'],
  [27103, 'Tane 67424 is the spelling alias of Tāne [god] 22161 (the atua); tāne [man] is the common Māori noun (rule 5 of the brief: alias of another root)'],
  [35975, 'cordoba 56798 is the Nicaraguan currency; Córdoba is the city'],
  [36474, 'Medoc 62816 is the marathon (famous_marathons, the Marathon du Médoc), another entry; Médoc is the wine region'],
  [40003, 'lame 39366 (words_for_bad) is another word; lamé is the fabric'],
  [43811, 'coupe [car] 46629 and coupe [glass] 55839 are other senses; coupé here is the fencing cut'],
  [44519, 'kaka 8284 is the spelling alias of kākā [parrot] 27117; Kaká is the footballer'],
  [46486, 'AU 64564 is the abbreviation alias of astronomical unit; aú is the capoeira cartwheel'],
  [54367, 'Orleans 55167 [royal house] is another entry (the House of Orléans); Orléans [siege] is the battle'],
  [56890, 'Orleans 55167 [royal house] is another entry; Orléans [city] is the French city'],
  [56849, 'San Jose 35909 is the Californian city (american_cities); San José is the capital of Costa Rica'],
  [56917, 'Munster 36481 [province] and Munster 39725 [cheese] are other words; Münster is the German city'],
  [56949, 'San Sebastian 12776 is the film festival (film_festivals), another entry; San Sebastián is the city'],
  [57073, 'Belem 62558 is the tower in Lisbon (famous_towers), another place; Belém is the Brazilian city'],
  [57084, 'Vitoria 54379 is the battle in Spain (napoleonic_battles); Vitória is the Brazilian city'],
  [57409, 'pantheon [gods], pantheon [temple], Pantheon [Rome] are other words; Panthéon is the Paris monument'],
  [57735, 'marron 57755 is the French color word (colors_in_french); marrón is the Spanish one: another language\'s word'],
  [57749, 'indigo [color] 6 (the English color) and IndiGo [airline]: other entries; índigo is the Spanish color word (colors_in_spanish)'],
  [57775, 'sari 24356 is the Indian garment; sarı is Turkish yellow'],
]);
// the same word stored twice: reported for the manager, not added and not merged
const DUP = new Map([
  [53157, 'sable [biscuit] 59451 (cookies) is the same biscuit as sablé 53157 (french_pastries): a plain duplicate root'],
  [57402, 'Sacre-Coeur 37403 (famous_churches) is the same basilica as Sacré-Cœur 57402 (paris_landmarks): a plain duplicate root'],
  [27110, 'kumara 19393 is a regional alias of sweet potato 402; kūmara 27110 (maori_words) is the same word (the Māori and NZ English name of the sweet potato): stored twice, as a root and as another root\'s alias'],
]);
// plain form that would mislead: a common English word of another meaning
const MISLEAD = new Map([
  [46494, '"role" is a common English word; rolê (capoeira: a low circling movement) is never written so in English'],
  [57797, '"fume" is a common English word; füme is Turkish smoke grey (colors_in_turkish, locked)'],
]);

// candidates, as plaincheck.mjs
const cand = [];
for (const e of P.entries) {
  if (e.aliasOf || plain(e.text) === e.text) continue;
  cand.push(e);
}
const done = e => (P.ix.aliases.get(e.id) || []).find(a => a.text.toLowerCase() === plain(e.text).toLowerCase());
const todo = cand.filter(e => !done(e));
const share = new Map(); for (const e of todo) { const k = plain(e.text).toLowerCase(); share.set(k, (share.get(k) || 0) + 1); }
// when an earlier run added a glossed alias for a shared text, the rerun still knows the group: count the done aliases with gloss too
for (const e of cand) { const a = done(e); if (a && a.gloss && a.gloss === e.gloss) { const k = a.text.toLowerCase(); share.set(k, (share.get(k) || 0) + 1); } }

const added = [], skipped = { COLLIDE: [], DUP: [], MISLEAD: [] }, log = [];
let n = 0;
const used = new Set();
for (const e of todo) {
  const p = plain(e.text), others = byText(P, p).filter(x => x.aliasOf !== e.id);
  for (const [k, M] of Object.entries({ COLLIDE, DUP, MISLEAD })) if (M.has(e.id)) { used.add(e.id); skipped[k].push(`${lab(e)} in ${ths(e)} -> "${p}": ${M.get(e.id)}`); }
  if (used.has(e.id)) { if (!others.length && !MISLEAD.has(e.id)) throw Error(`${e.id}: listed as a collision but "${p}" collides with nothing`); continue; }
  if (others.length) throw Error(`${lab(e)}: "${p}" collides with ${others.map(lab).join('; ')}: classify by hand`);
  const multi = share.get(p.toLowerCase()) > 1;
  if (multi && !e.gloss) throw Error(`${lab(e)}: shares "${p}" with another root and has no gloss`);
  const a = addEntry(P, p, { pos: e.pos, fam: e.fam, status: 'gen', region: [], gloss: multi ? e.gloss : '', type: e.type, typ: {}, show: {}, use: {}, nameOkIn: [...(e.nameOkIn || [])], aliasOf: e.id, aliasKind: 'spelling' });
  n++;
  added.push(`${a.id} "${p}"${a.gloss ? ' [' + a.gloss + ']' : ''} ${a.type} fam ${a.fam}${a.nameOkIn.length ? ' nameOkIn ' + a.nameOkIn.join(',') : ''} -> ${lab(e)} in ${ths(e)}`);
}
for (const M of [COLLIDE, DUP, MISLEAD]) for (const id of M.keys()) if (!used.has(id) && !done(E(id))) throw Error(`${id} listed but not a candidate`);
reindex(P);

const lint = caseLint(P), newLint = lint.filter(i => !lintBefore.has(i.entryId + '|' + i.themeId) && !CASE_OK.has(i.entryId + '|' + i.themeId));
const [after, mAfter] = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const newSame = [...sameAfter].filter(x => !sameBefore.has(x));
const nSkip = Object.values(skipped).reduce((s, l) => s + l.length, 0);
console.log(`Candidates (accented roots with no plain spelling alias): ${todo.length}; added ${added.length}; skipped ${nSkip} (COLLIDE ${skipped.COLLIDE.length}, DUP ${skipped.DUP.length}, MISLEAD ${skipped.MISLEAD.length})`
  + `\n\nSkipped, plain text is a different word (COLLIDE):\n  ${skipped.COLLIDE.join('\n  ') || 'none'}`
  + `\n\nSkipped, the same word stored twice (DUP, for the manager):\n  ${skipped.DUP.join('\n  ') || 'none'}`
  + `\n\nSkipped, misleading plain form (MISLEAD):\n  ${skipped.MISLEAD.join('\n  ') || 'none'}`
  + `\n\nAdded (new id "text" [gloss] type fam -> root, root's links):\n  ${added.join('\n  ') || 'none'}`
  + `\n\nSame text twice in a theme, new: ${newSame.join('; ') || 'none'}\nCase lint, new hits: ${newLint.map(i => `${i.entryId}|${i.themeId}: ${i.msg || i.kind}`).join(' | ') || 'none'}`
  + `\nChecks: ${JSON.stringify(after)}; changed kinds: ${diff.join(', ') || 'none'}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.join(' | ') || 'none'}`
  + `\n\n${n} changes`);
if (process.argv.includes('--apply') && n) {
  if (newLint.length) throw Error('new case-lint hits, not applied');
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  console.log('library v' + P.lib.version + ' ' + P.lib.modified);
}
