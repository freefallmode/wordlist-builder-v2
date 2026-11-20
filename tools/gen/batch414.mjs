// Library batch v414 (approved by Simon 2026-11-20). The wordplay rules game g24 reads (tools/gen/ws-questions-2026-11-20.md, "Simon's decisions
// and the agreed rule strings" and "Game g24 committed"):
//   1. Rule strings on the 14 wordplay themes whose rule was "other" or "letter:...": no-vowels, roman and reversible (tested by the game) and
//      curated (links only, no property test) for the other 11. Themes found by id, names checked (some were renamed in v406).
//   2. The theme "letters in alphabetical order" is deleted (Simon) with the model's deleteTheme; its members keep their other themes.
//   3. Data faults the game found: model unlinked from animals plus a letter (no animal plus one letter makes it); fitness centre was a
//      spelling alias of gym (so UK players saw it in no vowels): it is the UK spelling of fitness center and is re-pointed there; rhyming and
//      zigzag items stored twice, as a hyphenated or closed root and a spaced root (mishmash / mish mash): one root (the dictionary form) with
//      the spaced form as a spelling alias (DESIGN-entries.md 3.7 A, LIBRARY-RULES "never a second root for the same sense"); its links move
//      to the root under the root's own text.
//   4. Reversible words: every member's reverse must be a word of the export (game: "the reversed text is a different library word;
//      palindromes don't count"). Per failing member: the reverse added as a form alias of an existing root (pools, pans, tips, warts, snoops),
//      a new root where a theme really wants it (part [hair] in hair, with its UK word parting and its plural parts), or the member unlinked.
//   5. Silly rhyming pairs (id rhyming_word_pairs) never played in 2,000 levels per mode: rated as an easy theme (popularity 2,
//      identifiability 2: difficulty 1.5) while every word is band 3 or 4 (familiarity 2-4, typicality 2-4). Identifiability 2 -> 3
//      (difficulty 2.5, as its parent silly-sounding words), so its words fall in the theme's band.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch414.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteTheme, unlinkEntry, addEntry, shownFor, linkIds, parseRule } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { checkContract } from '../export-contract.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out'), REVIEW = arg('--review'), CHANGES = arg('--changes');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
setFreq(parseFreq(fs.readFileSync(new URL('../../data/freq-en.txt', import.meta.url), 'utf8')));
{ const b = new URL('../../data/breaks-en.txt', import.meta.url); if (fs.existsSync(b)) setBreaks(parseBreaks(fs.readFileSync(b, 'utf8'))); }
const ix = new Proxy({}, { get: (_, k) => P.ix[k] }), E = id => { const e = ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; }, lab = e => `${e.text} ${e.id}`;
const T = tid => { const t = ix.theme.get(tid); if (!t) throw Error('no theme ' + tid); return t; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c, rev: iss.filter(i => i.kind === 'contract-reversible-missing').map(i => `${i.at}: ${i.msg}`), rule: iss.filter(i => /^contract-rule/.test(i.kind)).map(i => `${i.at}: ${i.msg}`) }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), themeRows: file.themes, themeFields: file.themeFields, shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
let n = 0;

// ---------- 1. rule strings ----------
const CURATED = [['places_that_are_also_words', 'places that are also words'], ['homographs', 'homographs'], ['acronyms', 'acronyms'],
  ['portmanteau_words', 'portmanteau words'], ['tech_blends', 'tech word blends'], ['entertainment_blends', 'entertainment word blends'],
  ['zigzag_words', 'zigzag words'], ['rhyming_pairs', 'rhyming pairs'], ['rhyming_word_pairs', 'silly rhyming pairs'],
  ['numbers_with_the_first_letter_changed', 'numbers, first letter changed'], ['animals_plus_a_letter', 'animals plus a letter']];
const RULES = [['no_vowels', 'no vowels', 'no-vowels'], ['words_made_of_roman_numerals', 'words made of Roman numerals', 'roman'],
  ['reversible_words', 'reversible words', 'reversible'], ...CURATED.map(([id, name]) => [id, name, 'curated'])];
const A1 = [];
for (const [id, name, rule] of RULES) {
  const t = T(id); if (t.name !== name) throw Error(`${id} is "${t.name}", not "${name}"`);
  if (t.tkind !== 'wordplay') throw Error(`${id} is not a wordplay theme`);
  if (parseRule(rule).state !== 'ok') throw Error('not in the grammar: ' + rule);
  if (t.rule === rule) continue;
  A1.push(`${id} "${name}": ${JSON.stringify(t.rule || '')} -> ${rule}`); t.rule = rule; n++;
}

// ---------- 2. theme deleted ----------
const DEL = ['letters_in_alphabetical_order', 'letters in alphabetical order'], A2 = [];
if (ix.theme.get(DEL[0])) {
  const t = T(DEL[0]); if (t.name !== DEL[1]) throw Error(`${DEL[0]} is "${t.name}"`);
  if ((ix.kids.get(DEL[0]) || []).length) throw Error(DEL[0] + ' has sub-themes');
  const mem = P.entries.filter(e => e.typ[DEL[0]] !== undefined);
  deleteTheme(P, DEL[0]); n++; reindex(P);
  const alone = mem.filter(e => !linkIds(P, e).length);
  A2.push(`${DEL[0]} "${DEL[1]}" deleted: ${mem.length} links dropped (${mem.map(lab).join(', ')}); members left with no theme (no longer exported): ${alone.map(lab).join(', ') || 'none'}`);
}

// ---------- 3. data faults ----------
const A3 = [];
const unlink = (id, text, tid, why, out) => {
  const e = E(id); if (e.text !== text) throw Error(`${id} is not ${text}`);
  if (e.typ[tid] === undefined) return;
  unlinkEntry(P, e, tid); n++; out.push(`unlinked: ${lab(e)} from ${tid}: ${why}`);
};
unlink(49429, 'model', 'animals_plus_a_letter', 'no animal plus one letter makes "model" (mole + d is "modle")', A3);
{ // fitness centre: the UK spelling of fitness center, not of gym
  const a = E(3600), gym = E(3597), fc = E(3599);
  if (a.text !== 'fitness centre' || gym.text !== 'gym' || fc.text !== 'fitness center') throw Error('fitness ids');
  if (a.aliasOf === gym.id) {
    if (fc.aliasOf || a.aliasKind !== 'spelling') throw Error('fitness centre: unexpected shape');
    a.aliasOf = fc.id; n++;
    for (const f of ['adult', 'vulgar', 'sensitive', 'tm']) a[f] = !!fc[f];
    A3.push(`re-pointed: ${lab(a)} [${a.region}] (spelling) from ${lab(gym)} to ${lab(fc)}: the UK spelling of fitness center, not of gym; gym (in no vowels) no longer has a UK display text`);
    if (fc.region.length) { A3.push(`root region: ${lab(fc)} [${fc.region}] -> []: a US spelling with its UK alias is untagged, as color (and neighborhood watch in v413)`); fc.region = []; }
  }
}
// spaced second roots of rhyming and zigzag items -> spelling aliases of the dictionary form
const SPELL = [   // [spaced id, text, root id, root text]
  [28943, 'hodge podge', 27803, 'hodgepodge'], [28949, 'namby pamby', 27817, 'namby-pamby'], [28940, 'higgledy piggledy', 27818, 'higgledy-piggledy'],
  [28941, 'topsy turvy', 27819, 'topsy-turvy'], [28938, 'willy nilly', 27820, 'willy-nilly'], [28978, 'wishy washy', 27821, 'wishy-washy'],
  [28933, 'hanky panky', 27822, 'hanky-panky'], [28973, 'mish mash', 27823, 'mishmash'], [28947, 'fuddy duddy', 27827, 'fuddy-duddy'],
  [28979, 'pitter patter', 27828, 'pitter-patter'], [28932, 'walkie talkie', 4601, 'walkie-talkie'], [28946, 'okey dokey', 32634, 'okey-dokey'],
  [28966, 'rootin tootin', 27612, "rootin' tootin'"], [28968, 'bees knees', 27264, "bee's knees"], [28969, 'tick tock', 39584, 'tick-tock'],
  [28976, 'see saw', 5938, 'seesaw'], [28977, 'tip top', 62482, 'tip-top'], [28981, 'knick knack', 25679, 'knick-knack'],
  [28991, 'fiddle faddle', 27783, 'fiddle-faddle'], [28992, 'chiff chaff', 59929, 'chiffchaff'], [62401, 'hee haw', 10220, 'hee-haw'],
];
const SKIP3 = ['roly poly 28950 (plump, in rhyming pairs) / roly-poly 1418 (the pill bug): different senses',
  'teeter totter 28990 (zigzag words): the same thing as seesaw, whose teeter-totter 5939 is already a regional alias of seesaw; seesaw is now in zigzag words through see saw, so the two stand for one thing there (an alias of an alias is not allowed): left for Simon'];
for (const [xid, xt, rid, rt] of SPELL) {
  const X = E(xid), R = E(rid);
  if (X.text !== xt || R.text !== rt) throw Error(`${xid}/${rid} are not ${xt}/${rt}`);
  if (R.aliasOf) throw Error(`${rid} is an alias`);
  if (X.aliasOf === rid) continue;
  if (X.aliasOf) throw Error(`${xid} is an alias of ${X.aliasOf}`);
  if (X.adult !== R.adult || X.vulgar !== R.vulgar || X.sensitive !== R.sensitive) throw Error(`${xid}/${rid}: flags differ`);
  if ((ix.aliases.get(xid) || []).length || (X.kin || []).length || Object.keys(X.use || {}).length || Object.keys(X.show || {}).length || (X.nameOkIn || []).length) throw Error(`${xid} has aliases, kin, use, show or name allowances: by hand`);
  for (const t of P.themes) if ((t.groups || []).some(g => g.includes(xid))) throw Error(`${xid} is in a group of ${t.id}: by hand`);
  const did = [];
  for (const [tid, v] of Object.entries(X.typ)) {
    if (R.typ[tid] !== undefined) { did.push(`${tid}: the root is there already (typicality ${R.typ[tid]}; ${v} dropped)`); continue; }
    R.typ[tid] = v; did.push(`${tid} (typicality ${v}) moved, shown as "${R.text}"`);
  }
  const f0 = X.fam;
  Object.assign(X, { typ: {}, show: {}, use: {}, kin: [], aliasOf: R.id, aliasKind: 'spelling', region: [], fam: R.fam, pos: R.pos, type: R.type });
  for (const f of ['adult', 'vulgar', 'sensitive', 'tm']) X[f] = !!R[f];
  n++; reindex(P);
  A3.push(`spelling: ${lab(X)} -> spelling alias of ${lab(R)} (familiarity ${f0} -> ${R.fam}, the root's): ${did.join('; ')}`);
}

// ---------- 4. reversible words ----------
const A4 = [], RT = 'reversible_words';
const formOf = (rootId, rootText, text, pos, why) => {   // a form alias (a grammatical form: plural, third person) of an exported root
  const R = E(rootId); if (R.text !== rootText || R.aliasOf) throw Error(`${rootId} is not the root ${rootText}`);
  if (P.entries.some(e => e.text === text)) return;
  const a = addEntry(P, text, { fam: R.fam, pos, type: R.type, aliasOf: R.id, aliasKind: 'form', region: [], adult: R.adult, vulgar: R.vulgar, sensitive: R.sensitive, tm: R.tm, status: 'rev' });
  n++; reindex(P); A4.push(`form alias: ${lab(a)} of ${lab(R)} (familiarity ${a.fam}, ${pos}): ${why}`);
};
formOf(32114, 'pool', 'pools', 'noun', 'the reverse of sloop; plural of pool [water]');
formOf(28035, 'pan', 'pans', 'noun', 'the reverse of snap; plural of pan [cookware]');
formOf(20015, 'tip', 'tips', 'noun', 'the reverse of spit; plural of tip [gratuity]');
formOf(14348, 'wart', 'warts', 'noun', 'the reverse of straw; plural of wart');
formOf(29372, 'snoop', 'snoops', 'verb', 'the reverse of spoons; third person of snoop');
{ // part [hair]: the line where hair is divided, a real member of hair (with cowlick, bangs); its UK word parting; its plural parts
  let R = P.entries.find(e => e.text === 'part' && e.gloss === 'hair');
  if (!R) {
    R = addEntry(P, 'part', { gloss: 'hair', fam: 2, pos: 'noun', type: 'common', region: [], typ: { hair: 3 }, status: 'rev' }); n++;
    A4.push(`new root: ${lab(R)} [hair] (familiarity 2, noun, common) in hair (typicality 3): the line where hair is divided; the reverse of trap`);
    const u = addEntry(P, 'parting', { fam: 2, pos: 'noun', type: 'common', aliasOf: R.id, aliasKind: 'regional', region: ['UK'], status: 'rev' }); n++;
    A4.push(`regional alias: ${lab(u)} [UK] of ${lab(R)} (familiarity 2): the UK word for a hair part`);
    reindex(P);
  }
  formOf(R.id, 'part', 'parts', 'noun', 'the reverse of strap; plural of part [hair]');
}
const UNREV = [[71, 'denim', 'the reverse "mined" is only a verb form of mine, and the library\'s mine entries are the pronoun and the pit (no verb, no theme for it)'],
  [3552, 'diaper', 'the reverse "repaid" needs repay, whose one fitting theme (things you do with money) holds pay: one word family, so repay would have to be grouped with it (DESIGN-entries.md 3.7 B)'],
  [19463, 'decaf', 'the reverse "faced" is a verb form of face, and the library\'s face entries are nouns (body part, clock); typicality 5'],
  [28515, 'time', 'the reverse "emit" has no fitting theme'],
  [29046, 'smart', 'the reverse "trams" would be the plural of tram, which is a regional alias of streetcar (a form cannot hang off an alias)'],
  [62412, 'retool', 'the reverse "looter" has no fitting theme (crimes and stealing crimes list crimes, not criminals); retool is familiarity 4, typicality 5']];
for (const [id, text, why] of UNREV) unlink(id, text, RT, why, A4);
reindex(P);

// ---------- 5. silly rhyming pairs ----------
const A5 = [];
{ const t = T('rhyming_word_pairs'); if (t.name !== 'silly rhyming pairs') throw Error('rhyming_word_pairs renamed');
  if (t.ident === 2) { t.ident = 3; n++; A5.push(`rhyming_word_pairs "silly rhyming pairs": identifiability 2 -> 3 (popularity 2; difficulty 1.5 -> 2.5): its 14 words are all band 3-4, so at difficulty 1.5 none fit the theme's band`); } }

// ---------- the game's tests on the tested themes (members as the game reads them: root links, shown text) ----------
const flat = s => s.toLowerCase().replace(/[ -]/g, '');
function gameTests(x) {
  const words = new Set(x.text.map(t => t.toLowerCase())), st = [], out = [];
  let q = 0; for (const c of x.linkCount) { st.push(q); q += c; }
  const test = { no_vowels: s => /^[a-z]+$/.test(flat(s)) && !/[aeiou]/.test(flat(s)), words_made_of_roman_numerals: s => /^[ivxlcdm]+$/.test(flat(s)),
    reversible_words: s => { const t = s.toLowerCase(), r = [...t].reverse().join(''); return r !== t && words.has(r); } };
  const cnt = {};
  x.ids.forEach((id, i) => { if (x.root[i] || x.flags[i] & 11) return; for (let j = 0; j < x.linkCount[i]; j++) { const k = (st[i] + j) * 4, th = x.themes[x.links[k]], f = test[th]; if (!f) continue; const sh = x.links[k + 3], s = sh ? x.shown[sh - 1][0] : x.text[i]; cnt[th] = (cnt[th] || 0) + 1; if (!f(s)) out.push(`${th}: "${s}" ${id}`); } });
  return { cnt, fail: out };
}

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
for (const [xid, , rid] of SPELL) for (const e of [E(xid), E(rid)]) if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract(), g0 = gameTests(x0), g1 = gameTests(x1);
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO (the export code changed since it was written: compared with the in-memory export before the changes)'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.map(t => `${t} (index ${x0.themes.indexOf(t)})`).join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]}, was ${x0.themes[tShift]}): every later theme index is one lower`}`);
{ const c = f => x0.themeFields.indexOf(f), d = x1.themeFields.indexOf.bind(x1.themeFields), ch = [];
  x1.themes.forEach((t, i) => { const j = x0.themes.indexOf(t); if (j < 0) return; for (const f of ['rule', 'difficulty', 'identifiability']) if (x0.themeRows[j][c(f)] !== x1.themeRows[i][d(f)]) ch.push(`${t} ${f} ${JSON.stringify(x0.themeRows[j][c(f)])} -> ${JSON.stringify(x1.themeRows[i][d(f)])}`); });
  cmp.push(`Theme rows changed (rule, difficulty, identifiability): ${ch.length}: ${ch.join('; ')}`); }
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${lab(E(x1.ids[firstShift]))}, was ${ix.entry.get(x0.ids[firstShift]) ? lab(E(x0.ids[firstShift])) : x0.ids[firstShift]})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${ix.entry.get(id) ? lab(E(id)) : id}`).join(', ') || 'none'}`);
const firstAny = x1.ids.findIndex((id, i) => x0.ids[i] !== id || x1.text[i] !== x0.text[i] || x1.flags[i] !== x0.flags[i] || x1.root[i] !== x0.root[i] || x1.linkCount[i] !== x0.linkCount[i] || x1.fam[i] !== x0.fam[i]);
cmp.push(`First row with any change (entry, text, flags, root, link count or familiarity): ${firstAny < 0 ? 'none' : `${firstAny} (${lab(E(x1.ids[firstAny]))})`}`);
const toAlias = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(id => lab(E(id)));
cmp.push(`root -> alias rows ${toAlias.length}: ${toAlias.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]).length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(E(x1.ids[firstLinkShift]))}) on, link positions move`}`);
function shownMap(x) {   // root rows: per theme, the text shown for each link (what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
{ const m0 = shownMap(x0), m1 = shownMap(x1), fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (${id})`; };
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Root links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  cmp.push(`  gone: ${lost.map(fmt).join(', ') || 'none'}`, `  new: ${gained.map(fmt).join(', ') || 'none'}`, `  rating: ${rated.map(k => fmt(k) + ' ' + m0.get(k) + ' -> ' + m1.get(k)).join(', ') || 'none'}`); }

const summary = ['Wordplay rules for game g24, the alphabetical-order theme deleted, the data faults the game found.',
  `1. rule strings: ${A1.length}`, ...A1.map(x => '  ' + x),
  `2. theme deleted: ${A2.length}`, ...A2.map(x => '  ' + x),
  `3. data faults: ${A3.length}`, ...A3.map(x => '  ' + x), `   skipped: ${SKIP3.length}`, ...SKIP3.map(x => '    ' + x),
  `4. reversible words: ${A4.length}`, ...A4.map(x => '  ' + x),
  `5. silly rhyming pairs: ${A5.join('; ') || 'done'}`,
  `The game's tests (no vowels, roman, reversible) on root links of the family export: members before ${JSON.stringify(g0.cnt)}, failing ${g0.fail.length}: ${g0.fail.join(', ') || 'none'}; after ${JSON.stringify(g1.cnt)}, failing ${g1.fail.length}: ${g1.fail.join(', ') || 'none'}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}`,
  `  contract-rule* after: ${k1.rule.length}${k1.rule.length ? ': ' + k1.rule.join(' | ') : ''}; contract-reversible-missing before ${k0.rev.length}, after ${k1.rev.length}${k1.rev.length ? ': ' + k1.rev.join(' | ') : ''}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch414-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
