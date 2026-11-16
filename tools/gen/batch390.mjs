// Library batch v390 (2026-11-16, Simon approved): the game manager's two gaps (Māori without macrons, plain "doner" shown), ISSUES.md T17 and W2.
//   A1 MACRON: a plain Māori-origin root takes the macron form printed by Te Aka (maoridictionary.co.nz; NZ English usage for the English names) and the plain form becomes a new
//      spelling alias (appended; links, shown texts and name allowances stay on the root, as batch387 did for döner kebab). Rule 8 (DESIGN-entries.md "rules 6 to 9").
//   A2 SHOW: a shown text that drops a diacritic the root has (döner kebab shown "doner") takes it; Lake Taupo becomes Lake Taupō with a plain spelling alias.
//   B  T17: Draconian -> draconian (rule 1: M-W "draconian, often Draconian", Oxford lowercase). Bermudas, Easter egg [software], colonial architecture unchanged (verified).
//   C  W2: in the "names that are ..." themes every shown text is capital (Simon: the theme's sense is a name); a common entry gets a capital `show` there,
//      and those links go into js/caselint-allow.js (they are intended capitals for the name sense).
// Evidence per change: tools/gen/batch390-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch390.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { caseLint } from '../../js/caselint.js';
import { CASE_OK } from '../../js/caselint-allow.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), ALLOW = new URL('../../js/caselint-allow.js', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const strip = s => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const PROPER = new Set(['person', 'place', 'org', 'title', 'proper']);
const NT = P.themes.filter(t => /^names that are /.test(t.name)).map(t => t.id);
let newAllow = new Set();
let msgs = [];
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { if (/^case-/.test(i.kind) && newAllow.has(i.entryId + '|' + i.themeId)) continue; c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } msgs.push(m); return c; };
// same text twice in one theme (DESIGN.md 8.5), over roots' shown texts and aliases' own texts, lowercase
const sameText = () => { const s = new Set(); for (const t of P.themes) { const seen = new Map(); for (const e of P.ix.byTheme.get(t.id) || []) { const k = ((!e.aliasOf && e.show?.[t.id]) || e.text).toLowerCase(); if (seen.has(k) && seen.get(k) !== e.id) s.add(`${t.id}: "${k}" (${seen.get(k)}, ${e.id})`); else seen.set(k, e.id); } } return s; };
const before = count(), sameBefore = sameText();
const log = { A1: [], A2: [], B: [], C: [] }, skip = [];
let n = 0;

// root `id` from `from` to `to`; the plain text becomes a new spelling alias (gloss: aliasGloss)
function macron(part, id, from, to, why, aliasGloss = '', aliasNameOk = []) {
  const e = E(id);
  if (e.text === to) return;   // done on an earlier run
  if (e.text !== from || e.aliasOf) throw Error(`${id}: expected root "${from}", found "${e.text}"`);
  if (strip(from) !== strip(to)) throw Error(`${id}: ${from} / ${to} differ beyond diacritics`);
  const clash = P.entries.find(x => x !== e && x.text === to && (x.gloss || '') === (e.gloss || ''));
  if (clash) throw Error(`${id}: an entry "${to}" exists (${clash.id}): check by hand`);
  if (P.entries.some(x => x.aliasOf === id)) throw Error(`${id}: has aliases already: check by hand`);
  const was = `${e.text} (type ${e.type}, links ${Object.entries(e.typ).map(([k, v]) => k + ':' + v).join(',')}${Object.keys(e.show || {}).length ? ', show ' + JSON.stringify(e.show) : ''})`;
  e.text = to; n++;
  const a = addEntry(P, from, { pos: e.pos, fam: e.fam, status: e.status, region: [], gloss: aliasGloss, type: e.type, typ: {}, show: {}, use: {}, nameOkIn: [...new Set([...(e.nameOkIn || []), ...aliasNameOk])], aliasOf: id, aliasKind: 'spelling' });
  reindex(P); n++;
  log[part].push(`${id} "${from}" -> "${to}"  was ${was}; new spelling alias ${a.id} "${from}"${aliasGloss ? ' [' + aliasGloss + ']' : ''}${a.nameOkIn.length ? ' (name allowed in ' + a.nameOkIn + ')' : ''}  (${why})`);
}
function show(part, id, tid, from, to, why) {
  const e = E(id);
  if (e.show?.[tid] === to) return;
  if (e.show?.[tid] !== from || !(tid in e.typ)) throw Error(`${id} ${tid}: expected show "${from}", found ${JSON.stringify(e.show?.[tid])}`);
  e.show[tid] = to; n++;
  log[part].push(`${id} "${e.text}" in ${tid}: shown "${from}" -> "${to}"  (${why})`);
}

// ---------- A1: Māori macron roots (Te Aka headwords read 2026-11-16) ----------
const TA = 'Te Aka headword';
const A1 = [
  [7566, 'Maori', 'Māori', `${TA} "Māori" (noun: Māori, indigenous New Zealander; modifier: Māori)`],
  [62326, 'Cook Islands Maori', 'Cook Islands Māori', 'Te Aka prints Māori with the macron in every sense; Wiktionary English proper noun "Cook Islands Māori"'],
  [21151, 'Maui', 'Māui', `${TA}s "Māui-pōtiki", "Māui-tikitiki-a-Taranga" (personal name, the Polynesian character), "Te Ika-a-Māui"; 36611 Maui [island, Hawaii] is a different word and stays`, 'demigod'],
  [22161, 'Tane', 'Tāne', `${TA} "Tāne Mahuta" (personal name, atua of the forest), "Tāne-whakapiripiri"; 27103 tāne [man] is a separate entry in Māori words`, 'god'],
  [22171, 'Tane Mahuta', 'Tāne Mahuta', `${TA} "Tāne Mahuta"`, 'forest god'],
  [22168, 'Papatuanuku', 'Papatūānuku', `${TA} "Papatūānuku" (personal name, Earth mother)`],
  [22163, 'Tawhirimatea', 'Tāwhirimātea', `${TA} "Tāwhirimātea" (personal name, atua of the wind)`],
  [22164, 'Tumatauenga', 'Tūmatauenga', `${TA} "Tūmatauenga" (personal name, atua of war)`],
  [22169, 'Hine-nui-te-po', 'Hine-nui-te-pō', `${TA} "Hine-nui-te-pō" (personal name)`],
  [22183, 'Tawhaki', 'Tāwhaki', 'Te Aka names the hero Tāwhaki in "kanohi o Tāwhaki" and "Te Moana-tāpokopoko-a-Tāwhaki" (plain "tawhaki" is a different word, the Fiordland crested penguin)'],
  [22181, 'Te Ika-a-Maui', 'Te Ika-a-Māui', `${TA} "Ika-a-Māui, Te" (location, North Island)`],
  [22187, "Maui's fish hook", "Māui's fish hook", 'the same Māui (Te Aka "Māui-pōtiki"); Te Aka "Matau-a-Māui, Te" (the fish hook of Māui, Hawke Bay)'],
  [51215, 'Maui dolphin', 'Māui dolphin', 'NZ Department of Conservation page title and text "Māui dolphin" (doc.govt.nz)'],
  [35440, 'powhiri', 'pōwhiri', `${TA} "pōwhiri" (to welcome)`],
  [35444, 'hapu', 'hapū', `${TA} "hapū" sense 3 (kinship group, subtribe)`],
  [35445, 'kaumatua', 'kaumātua', `${TA} "kaumātua" sense 3 (elder)`],
  [51202, 'piwakawaka', 'pīwakawaka', `${TA} "pīwakawaka" (fantail)`],
  [51205, 'kakariki', 'kākāriki', `${TA} "kākāriki" sense 3 (yellow- and red-crowned parakeet)`],
  [51210, 'kokako', 'kōkako', `${TA} "kōkako" (Callaeas cinerea)`],
  [51214, 'kereru', 'kererū', `${TA} "kererū" (New Zealand pigeon)`],
  [51221, 'karearea', 'kārearea', `${TA} "kārearea" (New Zealand falcon)`],
  [8232, 'takahe', 'takahē', `${TA} "takahē" (South Island takahē)`],
  [51515, 'koauau', 'kōauau', `${TA} "kōauau" (cross-blown flute)`],
  [51516, 'putorino', 'pūtōrino', `${TA} "pūtōrino" (large traditional flute)`],
  [51517, 'pukaea', 'pūkāea', `${TA} "pūkāea" (long wooden trumpet)`],
  [51518, 'putatara', 'pūtātara', `${TA} "pūtātara" (knobbed triton, "the shell of which is used for conch shell trumpets"): the instrument is named after the shell`],
  [51519, 'purerehua', 'pūrerehua', `${TA} "pūrerehua" sense 2 (bullroarer, a traditional Māori musical instrument)`],
  [52336, 'kowhaiwhai', 'kōwhaiwhai', `${TA} "kōwhaiwhai" (painted scroll patterns)`],
  [56564, 'manuka', 'mānuka', `${TA} "mānuka" (tea-tree, Leptospermum scoparium)`],
  [56565, 'kowhai', 'kōwhai', `${TA} "kōwhai" sense 2 (Sophora trees)`],
  [56566, 'totara', 'tōtara', `${TA} "tōtara" (Podocarpus totara)`],
  [56573, 'puriri', 'pūriri', `${TA} "pūriri" (Vitex lucens)`],
  [56576, 'matai', 'mataī', `${TA} "mataī" (black pine, Prumnopitys taxifolia; "mātai" is a different word)`],
  [56577, 'kanuka', 'kānuka', `${TA} "kānuka" (white tea-tree)`],
  [57108, 'Whangarei', 'Whangārei', `${TA} "Whangārei-terenga-paraoa" (location: Whangārei)`],
];
for (const [id, f, t, why, g] of A1) macron('A1', id, f, t, why, g || '');
// Tāne [god] and tāne [man] now read the same in lowercase: the Māori-words entry gets a gloss (Te Aka "tāne": husband, male, man)
{ const e = E(27103); if (e.text !== 'tāne') throw Error('27103 changed'); if (!e.gloss) { e.gloss = 'man'; n++; log.A1.push('27103 "tāne" gloss "" -> "man"  (Te Aka "tāne": husband, male, man; Checks needs a gloss now that 22161 reads Tāne [god])'); } }

// ---------- A2: shown texts that drop the root's diacritic ----------
show('A2', 19124, 'kebab_types', 'doner', 'döner', 'root döner 26966 (v386) and döner kebab (v387) carry it; Cambridge "döner kebab"');
macron('A2', 36838, 'Lake Taupo', 'Lake Taupō', 'Te Aka "Taupō-nui-a-Tia: Lake Taupō"; root Taupō 57111; the alias may name the lake in "famous lakes", as the doner kebab alias in "kebab types"', '', ['famous_lakes']);
show('A2', 36838, 'famous_lakes', 'Taupo', 'Taupō', 'Te Aka "Lake Taupō"; root Taupō 57111');
show('A2', 55513, 'wool_fabrics', 'vicuna', 'vicuña', 'root vicuña 9719 (v385), vicuna its spelling alias');
for (const [id, tid] of [[8244, 'penguin_species'], [8244, 'penguins'], [36587, 'famous_islands'], [50810, 'seals_and_sea_lions']]) show('A2', id, tid, 'Galapagos', 'Galápagos', 'root Galápagos 57215 (v383), Galapagos 41020 its spelling alias');
for (const tid of ['berries', 'blank_berry']) show('A2', 17188, tid, 'acai', 'açaí', 'root açaí 53687 (v383), acai 16737 and açai 62997 its spelling aliases');

// ---------- B: T17 ----------
{ const e = E(62416);
  if (e.text === 'Draconian') { if (e.type !== 'proper' || Object.keys(e.show || {}).length) throw Error('62416 not as expected');
    e.text = 'draconian'; e.type = 'common'; n++;
    log.B.push(`62416 "Draconian" proper -> "draconian" common in words_named_after_people  (rule 1: M-W headword "draconian", "variants often Draconian"; Oxford Learner's and Cambridge "draconian"; Random House "Draconian" with sense 2 "often lowercase", Collins "draconian": the dictionaries disagree / M-W "often capitalized": lowercase)`); }
  else if (e.text !== 'draconian') throw Error('62416 changed'); }

// ---------- C: W2, names that are ... ----------
const perTheme = {};
for (const tid of NT) {
  perTheme[tid] = [];
  for (const e of P.ix.byTheme.get(tid) || []) {
    if (e.aliasOf && e.typ[tid] == null) continue;   // inherits its root's link
    const cur = e.show?.[tid] || e.text;
    if (/^\p{Lu}/u.test(cur)) continue;
    const to = cur[0].toUpperCase() + cur.slice(1);
    e.show = { ...(e.show || {}), [tid]: to }; n++;
    perTheme[tid].push(`${e.id} ${cur} -> ${to}`);
  }
  if (perTheme[tid].length) log.C.push(`${tid} (${perTheme[tid].length}): ${perTheme[tid].join('; ')}`);
}
reindex(P);
// links in the names themes that the case lint flags after C: intended capitals for the name sense
for (const i of caseLint(P)) if (NT.includes(i.themeId) && !CASE_OK.has(i.entryId + '|' + i.themeId)) newAllow.add(i.entryId + '|' + i.themeId);

const after = count(), sameAfter = sameText(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const [b, a] = msgs; const nw = [...a].filter(x => !b.has(x)), gone = [...b].filter(x => !a.has(x)); if (nw.length || gone.length) console.log(`new issues:\n  ${nw.join('\n  ') || 'none'}\ngone:\n  ${gone.join('\n  ') || 'none'}`); }
const newSame = [...sameAfter].filter(x => !sameBefore.has(x)), goneSame = [...sameBefore].filter(x => !sameAfter.has(x));
const lintKinds = {}; for (const i of caseLint(P)) if (newAllow.has(i.entryId + '|' + i.themeId)) lintKinds[i.kind] = (lintKinds[i.kind] || 0) + 1;
const body = Object.entries(log).map(([k, v]) => `== ${k} (${v.length}) ==\n${v.join('\n') || '  none'}`).join('\n\n')
  + `\n\nSame text twice in a theme: new ${newSame.length ? newSame.join('; ') : 'none'}; gone ${goneSame.length ? goneSame.join('; ') : 'none'}`
  + `\nCase-lint links in the names themes to allow: ${newAllow.size} (${Object.entries(lintKinds).map(([k, v]) => k + ' ' + v).join(', ') || 'none'})`;
console.log(body);
console.log(`\n${n} changes (A1 ${log.A1.length}, A2 ${log.A2.length}, B ${log.B.length}, C ${Object.values(perTheme).reduce((s, x) => s + x.length, 0)} shown texts); checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  if (newAllow.size) {
    const src = fs.readFileSync(ALLOW, 'utf8'), th = new Map(P.themes.map(t => [t.id, t]));
    const rows = [...newAllow].map(k => { const [e, t] = k.split('|'); return `  '${k}', // ${E(+e).text} shown "${E(+e).show?.[t] || E(+e).text}" in ${th.get(t).name}: capital for the name sense (W2, Simon 2026-11-16, v390)`; });
    fs.writeFileSync(ALLOW, src.replace(/\n\]\);\s*$/, `\n${rows.join('\n')}\n]);\n`));
  }
  fs.writeFileSync(new URL('batch390-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch390.mjs, ${P.lib.modified}): ${n} changes.\nChecks: changed kinds ${diff.join(', ') || 'none'}\n\n${body}\n`);
  console.log('library v' + P.lib.version);
}
