// Library batch v416 (DRAFT: not approved by Simon yet; do not --apply until he has). Issue I30, reported by the game (g24 on v411):
// playable themes rated far easier than the words the game can use, so they never or rarely play. The game's word band per link is
// max(familiarity, typicality, round(link difficulty)); entries flagged adult, sensitive or vulgar are dropped. Aim: a theme's difficulty
// no more than about one band below its 4th-easiest usable word (gap under 2; 1 where the ratings allow).
// 27 themes had a gap of 2 or more on v414. Causes:
//   A. easy words flagged sensitive and dropped by the game (places of worship, religious festivals): NOT changed here; Simon decides.
//   B. a word rating that is clearly wrong (Arctic Ocean typicality 3 in the five oceans, sea urchin familiarity 4): fixed below.
//   C. the theme rated too easy for its real content: identifiability (and once popularity) raised below. Theme difficulty is
//      ident + 0.5 x (pop - 3) (themeDifficulty in js/model.js); v414 did the same for silly rhyming pairs.
// Ratings are for a general UK/US adult. Only ratings change: no entry, link or theme is added or removed, so no export index shifts.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch416.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, themeDifficulty } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
{ const b = new URL('../../data/breaks-en.txt', import.meta.url); if (fs.existsSync(b)) setBreaks(parseBreaks(fs.readFileSync(b, 'utf8'))); }
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const T = tid => { const t = ix.theme.get(tid); if (!t) throw Error('no theme ' + tid); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const build = () => buildExport(P, { ...PRESETS.family, zipf: true }).file;
const contract = f => { const c = {}; for (const i of checkContract(f)) c[i.kind] = (c[i.kind] || 0) + 1; return c; };
function gaps(f) {   // the game's view: per playable theme, its difficulty against the band of its 4th-easiest usable word
  const F = f.themeFields, at = k => F.indexOf(k), X = f.entries, w = f.themes.map(() => []);
  let off = 0;
  for (let i = 0; i < X.text.length; i++) {
    const lc = X.linkCount[i];
    if (!(X.flags[i] & 11)) for (let j = 0; j < lc; j++) { const b = (off + j) * 4, d = X.links[b + 1]; w[X.links[b]].push(Math.max(X.familiarity[i] || 1, X.links[b + 2] || 0, Math.round(d < 1 ? 3 : d))); }
    off += lc;
  }
  const m = new Map();
  f.themes.forEach((r, t) => { if (r[at('flags')] & 33 || !(r[at('popularity')] >= 1) || w[t].length < 4) return; const b4 = w[t].sort((a, b) => a - b)[3]; m.set(r[at('id')], { td: r[at('difficulty')], b4, gap: +(b4 - r[at('difficulty')]).toFixed(1) }); });
  return m;
}
const [before, mBefore] = count(), f0 = build(), k0 = contract(f0), g0 = gaps(f0);
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;

// ---------- B. word ratings ----------
// [entry id, text, field ('fam' or a theme id for its typicality), old, new, why]
const WORDS = [
  [36998, 'Arctic Ocean', 'the_five_oceans', 3, 1, 'one of the five oceans every child names (Pacific, Atlantic, Indian are 1)'],
  [32178, 'Southern Ocean', 'the_five_oceans', 4, 2, 'a full member of the five (a complete set), only named later than the other four; 4 is for peripheral members'],
  [502, 'sea urchin', 'fam', 4, 2, 'a well-known sea creature (rock pools, sushi); familiarity 4 is "few people know it"'],
  [3831, 'sodium', 'fam', 3, 2, 'an everyday word (salt, food labels), as well known as potassium (2)'],
  [40345, 'krypton', 'noble_gases', 3, 2, 'one of the first noble gases named after helium, neon and argon (xenon the same)'],
  [40348, 'xenon', 'noble_gases', 3, 2, 'as krypton'],
  [28023, 'gas', 'fam', 2, 1, 'gas [state of matter]: a word every child knows (liquid is 1)'],
  [28626, 'solid', 'fam', 2, 1, 'solid [state of matter]: as gas'],
  [40461, 'plasma', 'fam', 3, 2, 'plasma [physics]: the same word as plasma [screen] (2); the fourth state of matter is school science'],
  [24422, 'pantyhose', 'fam', 3, 2, 'the everyday US word (its UK alias tights is 1)'],
];
const AB = [];
for (const [id, text, field, o, v, why] of WORDS) {
  const e = E(id); if (e.text !== text) throw Error(`${id} is not ${text}`);
  if (field === 'fam') {
    if (e.fam === v) continue; if (e.fam !== o) throw Error(`${lab(e)} familiarity is ${e.fam}, not ${o}`);
    e.fam = v; n++; AB.push(`${lab(e)}: familiarity ${o} -> ${v} (all its themes): ${why}`);
  } else {
    T(field); if (e.typ[field] === undefined) throw Error(`${lab(e)} is not in ${field}`);
    if (e.typ[field] === v) continue; if (e.typ[field] !== o) throw Error(`${lab(e)} typicality in ${field} is ${e.typ[field]}, not ${o}`);
    e.typ[field] = v; n++; AB.push(`${lab(e)}: typicality in ${field} ${o} -> ${v}: ${why}`);
  }
}

// ---------- C. theme ratings ----------
// [theme id, name, field ('ident' or 'pop'), old, new, why]
const THEMES = [
  ['dwarf_planets', 'dwarf planets', 'ident', 2, 4, 'beyond Pluto the members are Ceres, Eris, Haumea, Makemake: few adults could name four'],
  ['layers_of_the_atmosphere', 'atmosphere layers', 'ident', 2, 3, 'troposphere, stratosphere, mesosphere, thermosphere: school science, not everyday'],
  ['layers_of_the_atmosphere', 'atmosphere layers', 'pop', 2, 3, 'a dry science list, not a popular theme'],
  ['abba_members', 'ABBA members', 'ident', 2, 3, 'the band is famous, its four members (Agnetha, Bjorn, Benny, Frida) much less so'],
  ['alkali_metals', 'alkali metals', 'ident', 2, 3, 'lithium, sodium, potassium are known; that they are the alkali metals, and cesium, rubidium, francium, are school chemistry'],
  ['british_cheeses', 'British cheeses', 'ident', 2, 3, 'beyond cheddar and Stilton the members are UK-only names (Wensleydale, red Leicester, Caerphilly)'],
  ['cat_breeds', 'cat breeds', 'ident', 1, 2, 'Siamese and Persian are obvious; most of the 48 members are breeder names (Burmese, Birman, Devon rex)'],
  ['deep_sea_fish', 'deep sea fish', 'ident', 2, 3, 'anglerfish and blobfish aside, the members are specialist names (viperfish, oarfish, fangtooth)'],
  ['famous_cricketers', 'famous cricketers', 'ident', 2, 3, 'cricket is little known in the US; the members are all familiarity 3-5'],
  ['fundamental_forces', 'fundamental forces', 'ident', 3, 4, 'gravity aside (electromagnetism, strong and weak interaction) it is physics, a complete set of four'],
  ['galilean_moons', 'Galilean moons', 'ident', 2, 3, 'Io, Europa, Ganymede, Callisto: astronomy, a complete set of four'],
  ['greek_buildings', 'Greek buildings', 'ident', 2, 3, 'Acropolis and Parthenon aside, the members are named temples and sites (Knossos, Erechtheion)'],
  ['indian_clothing', 'Indian clothing', 'ident', 2, 3, 'sari aside, the members are Hindi names (kurta, dhoti, dupatta, lehenga)'],
  ['indian_sweets', 'Indian sweets', 'ident', 2, 3, 'every member is familiarity 4-5 (gulab jamun, jalebi, barfi)'],
  ['japanese_clothing', 'Japanese clothing', 'ident', 2, 3, 'kimono aside, the members are Japanese names (yukata, obi, geta, tabi)'],
  ['marx_brothers', 'Marx Brothers', 'ident', 2, 3, 'Groucho and Harpo aside (Chico, Zeppo, Gummo), old film trivia'],
  ['nucleobases', 'nucleobases', 'ident', 2, 3, 'adenine, thymine, guanine, cytosine, uracil: biochemistry'],
  ['platonic_solids', 'Platonic solids', 'ident', 2, 3, 'cube aside (tetrahedron, octahedron, dodecahedron, icosahedron), geometry terms'],
  ['queen_members', 'Queen members', 'ident', 2, 3, 'Freddie Mercury and Brian May are famous; Roger Taylor and John Deacon much less'],
  ['starts_with_sun', 'starts with sun', 'ident', 3, 4, 'only four members, two of them hard (sundries, sunder); the library has no easy word starting "sun" that is unrelated to the sun'],
  ['vietnamese_food', 'Vietnamese food', 'ident', 2, 3, 'pho and banh mi aside, the members are Vietnamese dish names (bun cha, com tam)'],
];
const AC = [];
for (const [id, name, field, o, v, why] of THEMES) {
  const t = T(id); if (t.name !== name) throw Error(`${id} is "${t.name}", not "${name}"`);
  if (t[field] === v) continue; if (t[field] !== o) throw Error(`${id} ${field} is ${t[field]}, not ${o}`);
  const d0 = themeDifficulty(t); t[field] = v; n++;
  AC.push(`${id} "${name}": ${field === 'ident' ? 'identifiability' : 'popularity'} ${o} -> ${v} (difficulty ${d0} -> ${themeDifficulty(t)}): ${why}`);
}

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }

// ---------- after ----------
const [after, mAfter] = count(), f1 = build(), k1 = contract(f1), g1 = gaps(f1);
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const ck = [...new Set([...Object.keys(k0), ...Object.keys(k1)])].sort();
const same = (p, q) => JSON.stringify(p) === JSON.stringify(q);
const shape = [`Export shape: themes ${f0.themes.length} -> ${f1.themes.length}, entries ${f0.entries.text.length} -> ${f1.entries.text.length}; theme order ${same(f0.themes.map(r => r[0]), f1.themes.map(r => r[0])) ? 'unchanged' : 'CHANGED'}; entry texts ${same(f0.entries.text, f1.entries.text) ? 'unchanged' : 'CHANGED'}; link counts ${same(f0.entries.linkCount, f1.entries.linkCount) ? 'unchanged (no index shifts)' : 'CHANGED'}`];
const fmt = (id, g) => `${id} ${g.td} (4th word band ${g.b4}, gap ${g.gap})`;
const big0 = [...g0].filter(([, g]) => g.gap >= 2), big1 = [...g1].filter(([, g]) => g.gap >= 2);
const gapLines = [`Themes with a gap of 2+ bands: before ${big0.length}, after ${big1.length}`,
  `  left: ${big1.map(([id, g]) => fmt(id, g)).join('; ') || 'none'}`,
  `  changed: ${[...g1].filter(([id, g]) => !same(g0.get(id), g)).map(([id, g]) => `${id} ${g0.get(id).td}/${g0.get(id).b4}/${g0.get(id).gap} -> ${g.td}/${g.b4}/${g.gap}`).join('; ')}`];
const summary = ['Theme difficulty against usable words (I30, reported by the game under g24): word ratings fixed (B) and themes rated too easy raised (C).',
  'Not changed (A, Simon decides): places of worship and religious festivals lose their easy words because those entries are flagged sensitive.',
  `B. word ratings: ${AB.length}`, ...AB.map(x => '  ' + x),
  `C. theme ratings: ${AC.length}`, ...AC.map(x => '  ' + x),
  ...gapLines,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0[k] !== k1[k]).map(k => `${k} ${k0[k] || 0} -> ${k1[k] || 0}`).join(', ') || 'no change'}`,
  ...shape];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch416-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
