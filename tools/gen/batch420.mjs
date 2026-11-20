// Library batch v420 (rule approved by Simon 2026-11-20, "Yes, as advised"). Familiarity of spelling aliases:
// - a UK- or US-tagged spelling alias (a dialect display spelling the game shows) has its root's fam: same word, each dialect knows its own
//   spelling as well as the other knows the root; a higher one wrongly raises the word's band in the game;
// - an untagged spelling variant has the root's fam by default, higher only when that spelling is clearly rarer for a general UK/US adult;
// - a spelling alias is never easier (lower) than its root: raise the alias, lower the root, or (wrong form is root) flag for a later swap.
// Only fam values change (no text, kind, region or link change). Touches none of the words re-checked on 2026-11-20 (Liebfraumilch, hoover, Gavi, Côtes du Rhône, the classical orders), which needed no change
// (asserted).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch420.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
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
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; };
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const build = () => buildExport(P, { ...PRESETS.family, zipf: true }).file;
const contract = f => { const c = {}; for (const i of checkContract(f)) c[i.kind] = (c[i.kind] || 0) + 1; return c; };
const [before, mBefore] = count(), f0 = build(), k0 = contract(f0);
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));

// [id, text, from, to, reason]
const TAGGED = [
  [144, 'jeweller', 3, 2, 'UK spelling of jeweler (2)'],
  [579, 'pitta', 3, 2, 'UK spelling of pita (2)'],
  [661, 'lasagne', 2, 1, 'UK spelling of lasagna (1)'],
  [698, 'pilau', 4, 3, 'UK spelling of pilaf (3)'],
  [752, 'tartare sauce', 3, 2, 'UK spelling of tartar sauce (2)'],
  [1012, 'racoon', 3, 2, 'UK spelling of raccoon (2)'],
  [6031, 'synthesiser', 3, 2, 'UK spelling of synthesizer (2)'],
  [6799, 'tricorne', 5, 4, 'UK spelling of tricorn (4)'],
  [10185, 'miaow', 2, 1, 'UK spelling of meow (1)'],
  [14755, 'foetid', 5, 4, 'UK spelling of fetid (4)'],
  [17962, 'soya milk', 2, 1, 'UK form of soy milk (1)'],
  [17987, 'devilled eggs', 3, 2, 'UK spelling of deviled eggs (2)'],
  [20271, 'Battenburg', 4, 3, 'UK spelling of Battenberg cake (3)'],
  [26475, 'amongst', 3, 2, 'UK form of among (2)'],
  [30460, 'camomile', 3, 2, 'UK spelling of chamomile (2)'],
  [37913, 'north-east', 2, 1, 'UK spelling of northeast (1)'],
  [37916, 'south-east', 2, 1, 'UK spelling of southeast (1)'],
  [37918, 'south-west', 2, 1, 'UK spelling of southwest (1)'],
  [37920, 'north-west', 2, 1, 'UK spelling of northwest (1)'],
  [37932, 'forwards', 2, 1, 'UK form of forward (1)'],
  [39991, 'aluminium foil', 2, 1, 'UK spelling of aluminum foil (1)'],
  [46707, 'chequered', 4, 2, 'UK spelling of checkered (2)'],
  [58625, 'centre fielder', 4, 3, 'UK spelling of center fielder (3)'],
  [58756, '110 metres hurdles', 4, 3, 'UK spelling of 110 meter hurdles (3)'],
  [64938, 'centre snap', 4, 3, 'UK spelling of snap [american football] (3)'],
  [67342, 'colour in', 2, 1, 'UK spelling of color in (1)'],
  [55687, 'Festival of Colours', 2, 3, 'UK spelling of Festival of Colors (3); was easier than its root'],
  [66182, 'devilled', 2, 3, 'UK spelling of deviled (3); was easier than its root'],
];
const LOWER = [
  [9197, 'house fly', 1, 2, 'alias raised to root housefly (2): not every child knows the word; same word'],
  [18073, 'éclair', 2, 3, 'alias raised to root eclair (3; rare in text, Zipf 2.2, so not lowered). Flag: by rule 8 the root should be éclair (Oxford prints it), a later swap'],
  [20022, 'kids menu', 2, 3, "alias raised to root kids' menu (3; not in the frequency list, so not lowered)"],
  [21900, 'Balder', 3, 4, 'alias raised to root Baldur (4): Balder is no better known'],
  [21966, 'Ganesha', 2, 3, 'alias raised to root Ganesh (3): the same name, many adults know it'],
  [25588, 'tea light', 2, 3, 'alias raised to root tealight (3; rare in text, Zipf 1.6, so not lowered)'],
  [25707, 'key card', 2, 3, 'alias raised to root keycard (3; rare in text, Zipf 2.0, so not lowered)'],
  [26079, 'Juliet', 2, 3, 'alias raised to root Juliett (3): rated in the phonetic-alphabet sense'],
  [27567, 'double double', 3, 4, 'alias raised to root double-double (4): basketball/coffee term for people with the interest'],
  [35046, 'paper boy', 2, 3, 'alias raised to root paperboy (3; rare in text, Zipf 2.2, so not lowered)'],
  [35200, 'lede', 5, 4, 'ROOT lowered: lede ("bury the lede") is known to people with the interest (4), not few people'],
  [35201, 'lead', 3, 4, 'alias raised to root lede (4): rated in the journalism sense'],
  [35204, 'exposé', 4, 3, 'ROOT lowered: exposé is known to many adults, like expose (3)'],
  [43598, 'slap shot', 2, 3, 'alias raised to root slapshot (3): an ice-hockey term, less known in the UK'],
  [46216, 'Fenerbahce', 3, 4, 'plain form of Fenerbahçe (4): same name'],
  [46219, 'Besiktas', 3, 4, 'plain form of Beşiktaş (4): same name'],
  [46223, 'Basaksehir', 4, 5, 'plain form of Başakşehir (5): same name'],
  [46236, 'Goztepe', 4, 5, 'plain form of Göztepe (5): same name'],
  [46437, 'Sao Paulo FC', 3, 4, 'plain form of São Paulo [Brazilian club] (4): same name'],
  [46439, 'Gremio', 3, 4, 'plain form of Grêmio (4): same name'],
  [46448, 'Penarol', 3, 4, 'plain form of Peñarol (4): same name'],
  [46480, 'agogô', 4, 5, 'accented form of agogo (5): no better known (root plain by rule 8)'],
  [46689, 'Formula 1', 3, 2, 'ROOT lowered: Formula 1 is known to nearly every adult, like Formula One (2)'],
  [47290, 'Atatürk', 3, 4, 'alias raised to root Ataturk [airport] (4). Flag: by rule 8 the root should be Atatürk, a later swap'],
  [51969, 'Paul McCartney', 1, 2, 'alias raised to root McCartney (2): nearly every adult, not every child. Flag: a full name, not a spelling alias'],
  [54246, 'Sir John Franklin', 3, 4, 'alias raised to root John Franklin (4): the same person. Flag: a titled name, not a spelling alias'],
  [14011, 'baptistery', 5, 4, 'ROOT lowered: baptistery is known to people with the interest (4), like baptistry'],
  [11805, 'dabke', 5, 4, 'ROOT lowered: dabke is known to people with the interest (4)'],
  [61988, 'debka', 3, 4, 'alias raised to root dabke (4): no better known'],
  [25891, 'Uyghur', 4, 3, 'ROOT lowered: Uyghur is in the news, known to many adults, like Uighur (3)'],
  [62347, 'fevrier', 3, 4, 'plain form of février (4): same word'],
  [62351, 'aout', 3, 4, 'plain form of août (4): same word'],
];
const UNTAGGED = [
  [37914, 'north east', 2, 1, 'spaced form of northeast (1), as common as the root'],
  [25140, 'piñata', 3, 2, 'accented form of pinata (2), the usual English spelling. Flag: by rule 8 the root should be piñata, a later swap'],
  [19476, 'gluhwein', 4, 3, 'plain form of glühwein (3), the usual English spelling'],
  [37674, 'Maracana', 4, 3, 'plain form of Maracanã (3), the usual English spelling'],
  [57771, 'kirmizi', 4, 3, 'plain form of kırmızı (3): same word'],
  [57774, 'yesil', 4, 3, 'plain form of yeşil (3): same word'],
  [57785, 'altin', 5, 4, 'plain form of altın (4): same word'],
  [57787, 'gumus', 5, 4, 'plain form of gümüş (4): same word'],
  [5301, 'water skiing', 2, 1, 'spaced form of waterskiing (1), at least as common'],
  [36145, 'The Bahamas', 3, 2, 'the official name of Bahamas (2), as common'],
  [60575, 'nurses station', 4, 3, "nurses' station (3) without the apostrophe, as common"],
  [41065, 'lifecycle', 3, 2, 'closed form of life cycle (2), as common'],
  [18812, 'baba ghanoush', 4, 3, 'spelling of baba ganoush (3), at least as common'],
];
// left unchanged, listed in the review
const LEFT = {
  2487: 'gaol [UK,AU,IE] 3 of prison 2: tag wrong, not the UK display word for prison (Simon names gaol an untagged rare variant); untag in a later batch, then 3 is right',
  1718: 'paeony [UK] 4 of peony 2: tag wrong, UK writes peony; paeony is a rare variant; untag in a later batch, then 4 is right',
  22196: 'Yemaya 4 of Yemoja 5: Yemaya is the commoner spelling; the wrong form is root, a later swap',
  40534: 'glycerin 3 of glycerol 4: two names, not a spelling (synonym, or glycerin root); a later fix',
  40584: 'ether 3 of aether 4 [classical element]: US spelling is ether, the wrong form is root; a later swap',
};
const FLAG = {
  67281: 'ax is the US spelling of axe: tag US or make ax root (rule: US spelling is root)',
  5400: 'tae kwon do is as common as taekwondo; the root fam 1 looks too easy (2), then both 2',
  17921: 'emmentaler is not a spelling of Swiss cheese (translation or own root)',
  25709: 'lockpick is not a spelling of pick [tool] (own word)',
  4116: 'cabby is not a spelling of taxi driver (synonym/abbreviation of cab driver)',
  14386: 'pinkie is not a spelling of little finger (synonym)',
  2170: 'Türkiye is the official name, now in the news; 3 may fit better than 4',
  42990: 'racquet is the usual UK spelling in sport (UK tag?)',
};
const NOT420 = /^(Liebfraumilch|Hoover|hoover|Gavi|Côtes du Rhône|Cotes du Rhone|Doric|Ionic|Corinthian)$/;
let n = 0;
const L = { TAGGED: [], LOWER: [], UNTAGGED: [] };
for (const [name, list] of Object.entries({ TAGGED, LOWER, UNTAGGED })) for (const [id, text, from, to, why] of list) {
  const e = E(id);
  if (e.text !== text) throw Error(`${id}: text ${e.text}, expected ${text}`);
  if (NOT420.test(e.text) || (e.aliasOf && NOT420.test(E(e.aliasOf).text))) throw Error(`${id} ${text} is one of the re-checked words`);
  if (e.fam === to) continue;
  if (e.fam !== from) throw Error(`${id} ${text}: fam ${e.fam}, expected ${from}`);
  e.fam = to; n++; L[name].push(`${text} ${id}: fam ${from} -> ${to}; ${why}`);
}
// state after: every spelling alias against its root
const st = { same: 0, tagDiff: [], lower: [], untagHigher: [] };
for (const a of P.entries) {
  if (a.aliasKind !== 'spelling') continue;
  const r = E(a.aliasOf), d = `${a.text}${a.region?.length ? ' [' + a.region + ']' : ''} ${a.id} ${a.fam} of ${r.text}${r.gloss ? ' [' + r.gloss + ']' : ''} ${r.fam}`;
  if (a.fam === r.fam) st.same++;
  else if (a.fam < r.fam) st.lower.push(d + (LEFT[a.id] ? ' - ' + LEFT[a.id] : ''));
  else if ((a.region || []).some(x => x === 'UK' || x === 'US')) st.tagDiff.push(d + (LEFT[a.id] ? ' - ' + LEFT[a.id] : ''));
  else st.untagHigher.push(d + (FLAG[a.id] ? ' [' + FLAG[a.id] + ']' : ''));
}
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const [after, mAfter] = count(), f1 = build(), k1 = contract(f1);
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const ck = [...new Set([...Object.keys(k0), ...Object.keys(k1)])].sort();
const same = (p, q) => JSON.stringify(p) === JSON.stringify(q);
const summary = ['Familiarity of spelling aliases (rule approved by Simon 2026-11-20): a UK/US-tagged spelling has its root\'s fam; an untagged one the root\'s unless clearly rarer; never easier than its root. Only fam changes.',
  `1. UK/US-tagged spelling aliases set to the root's fam (${L.TAGGED.length}):`, ...L.TAGGED.map(x => '  ' + x),
  `2. Spelling aliases rated easier than their root (${L.LOWER.length}; ROOT = the root's fam changed):`, ...L.LOWER.map(x => '  ' + x),
  `3. Untagged spelling aliases rated higher, clearly wrong ones changed (${L.UNTAGGED.length}):`, ...L.UNTAGGED.map(x => '  ' + x),
  `State after: spelling aliases ${st.same + st.tagDiff.length + st.lower.length + st.untagHigher.length}; same fam as root ${st.same}`,
  `  tagged and different (${st.tagDiff.length}, left: tag wrong):`, ...st.tagDiff.map(x => '    ' + x),
  `  easier than the root (${st.lower.length}, left: wrong form is root or wrong kind):`, ...st.lower.map(x => '    ' + x),
  `  untagged and higher (${st.untagHigher.length}, left as honestly rarer spellings; flags in brackets are for a later look):`, ...st.untagHigher.map(x => '    ' + x),
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0[k] !== k1[k]).map(k => `${k} ${k0[k] || 0} -> ${k1[k] || 0}`).join(', ') || 'no change'}`,
  `Export shape: themes ${f0.themes.length} -> ${f1.themes.length}, entries ${f0.entries.text.length} -> ${f1.entries.text.length}; entry texts ${same(f0.entries.text, f1.entries.text) ? 'unchanged' : 'CHANGED'}; link counts ${same(f0.entries.linkCount, f1.entries.linkCount) ? 'unchanged' : 'CHANGED'}; familiarity values change, no rows added or removed`];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch420-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
