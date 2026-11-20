// Library batch v413 (approved by Simon 2026-11-20). The game shows one level to both dialects, reads regions only on aliases and never reads
// links on alias rows (tools/gen/ws-questions-2026-11-20.md, answers 2 and 4).
//   1. Alias-as-answer links: every alias with a link of its own (the 97 regional ones of tools/gen/regional-linked-aliases.tsv, plus 3 synonym or
//      abbreviation aliases: public house, betting shop, Christmas pud) loses it. Per link, as reviewed:
//        through  the root takes the link at the alias's typicality; in a locked theme (wordplay, compound, property, language) it shows the
//                 alias's text (its shown text when it had one), in an unlocked theme it shows its own text and British players get the
//                 regional alias by the dialect swap. The alias's name allowance for that theme passes to the root when the shown text needs it.
//        move     a wordplay or place-name link goes to a root with the same text and no dialect (buffalo, film, tap, jersey).
//        drop     a wrong-sense link (minim is not the fluid unit; a tap is not tapping a screen).
//        root     slang words in their own right become roots (fam, pos, type, gloss and region kept); clippings get kin with the old root
//                 (DESIGN-entries.md 3.7: pet and short forms are one family).
//   2. Regional roots with a same-sense equivalent in the other dialect stored as a separate root: the regional word becomes an alias of the US
//      (or neutral) root in place (id kept), as the I23 merge of batch403: links the root lacks move to it (in a locked theme, or where the theme
//      needs the regional word, with a shown text), links both had stay on the root, group places, kin and the regional word's own aliases pass
//      to the root. Kind: regional (the dialect's display alias), synonym when the root already has a display alias of that dialect, spelling
//      for a UK spelling, abbreviation for a clipping. A spelling alias takes the root's flags. Doubtful pairs are skipped (SKIPPED, with reasons).
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch413.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, themeLocked, moveKin, setKin, displayKey, linkIds } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { parseFreq, setFreq } from '../../js/freq.js';
import { parseBreaks, setBreaks } from '../../js/breaks.js';
import { CLASH_SOFT, CLASH_MAX } from '../../js/family.js';
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
const infos = kind => new Set(validate(P).filter(i => i.kind === kind).map(i => i.msg));
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c, dial: iss.filter(i => i.kind === 'contract-alias-dialect').map(i => `${i.at}: ${i.msg}`) }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), k0 = contract(), sd0 = infos('same-display');
const snap = new Map(P.entries.map(e => [e.id, JSON.stringify({ ...e, status: undefined })]));
const inh0 = new Map(P.entries.filter(e => e.aliasOf).map(e => [e.id, new Set(linkIds(P, e).filter(tid => e.typ[tid] === undefined))]));   // themes each alias was in before through its root (its own links were checked under their own shown text)
let n = 0;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const leaks = (t, e, show) => !!nameLeak(t, show ? { ...e, text: show } : e);
const dispKind = k => k === 'spelling' || k === 'regional';

// ---------- 1. alias links ----------
// Exceptions to "through" (per alias: per theme ['move', target id] | ['drop', why] | ['through', show text or null]), and the aliases that become roots.
const P1 = {
  1007: { text: 'buffalo', hidden_colors: ['move', 9793, 'buffalo [animal] has the same letters and no dialect'] },
  6364: { text: 'film', letters_in_alphabetical_order: ['move', 52276, 'film [camera] has the same letters and no dialect'] },
  11147: { text: 'minim', imperial_units: ['drop', 'wrong sense: minim [half note] is not the fluid unit'] },
  23781: { text: 'tap', reversible_words: ['move', 64433, 'tap [rhythm] has the same letters and no dialect'], computer_actions: ['drop', 'wrong sense: a tap [faucet] is not tapping a screen'] },
  4876: { text: 'jersey', words_named_after_places: ['move', 24850, 'jersey [fabric] is the same word (named after Jersey) and has no dialect; no shown text needed'] },
  1642: { text: 'gum tree', trees: ['through', null, 'unlocked: eucalyptus is the clearer answer, and "gum" alone also names the US sweetgum'], evergreen_trees: ['through', null, 'as trees'] },
  63490: { text: 'Christmas pud', puddings: ['through', 'plum', 'a capital in a shown text needs a proper-noun root; shown by its modifier, as rice, bread and summer pudding are'] },
  24590: { text: 'Wellington boots', british_english_words: ['through', 'wellies', 'the root\'s UK word, lowercase; a capital in a shown text needs a proper-noun root'] },
};
const ROOTS1 = {   // id: [text, kin with (pet or short form of the old root), why]
  962: ['joe', [], 'slang for coffee, a word of its own'], 964: ['char', [], 'slang for tea (from Chinese cha)'], 1346: ['mozzie', [1345], 'AU clipping of mosquito'],
  2644: ['banger', [], 'UK slang for an old car'], 3037: ['esky', [], 'AU word for a cool box (from a brand)'], 3556: ['binky', [], 'US baby talk for a pacifier'],
  4085: ['firie', [4083], 'AU pet form of firefighter'], 4092: ['sparky', [], 'slang for an electrician'], 4096: ['chippy', [], 'slang for a carpenter'],
  4574: ['telly', [4572], 'clipping of television'], 4954: ['sunnies', [4952], 'AU pet form of sunglasses'], 6000: ['joanna', [], 'Cockney rhyming slang for piano'],
  20110: ['brekkie', [20109], 'pet form of breakfast'], 24487: ['togs', [], 'AU/NZ word for swimwear'], 62484: ['shonky', [], 'AU slang for dodgy'],
};
const A1 = [], tally1 = {}, t1 = k => { tally1[k] = (tally1[k] || 0) + 1; };
const ownLinked = () => P.entries.filter(e => e.aliasOf && Object.keys(e.typ).length);
for (const [id, spec] of Object.entries(P1)) if (E(+id).text !== spec.text) throw Error(`${id} is not ${spec.text}`);
for (const [id, [text]] of Object.entries(ROOTS1)) if (E(+id).text !== text) throw Error(`${id} is not ${text}`);
for (const a of ownLinked()) {
  if (ROOTS1[a.id]) {
    const [, kin, why] = ROOTS1[a.id], R = E(a.aliasOf);
    if (!a.region.length) throw Error('new root without region ' + a.id);
    const k0 = a.aliasKind; a.aliasOf = 0; a.aliasKind = ''; n++;
    for (const k of kin) setKin(P, a, E(k), true);
    t1('root'); A1.push(`root: ${lab(a)} [${a.region}] (was a ${k0} alias of ${lab(R)}): ${why}; keeps ${Object.entries(a.typ).map(([t, v]) => t + ' ' + v).join(', ')}${kin.length ? '; kin ' + kin.map(k => lab(E(k))).join(', ') : ''}`);
    continue;
  }
  const R = E(a.aliasOf), spec = P1[a.id] || {};
  for (const [tid, v] of Object.entries(a.typ)) {
    const t = T(tid), act = spec[tid] || ['through'], locked = themeLocked(P, t);
    if (act[0] === 'drop') { t1('drop'); A1.push(`drop: ${lab(a)} in ${tid}: ${act[1]}`); }
    else if (act[0] === 'move') {
      const X = E(act[1]); if (X.aliasOf || X.text !== a.text || X.region.length) throw Error('bad move target ' + act[1]);
      if (X.typ[tid] !== undefined) { t1('drop'); A1.push(`drop: ${lab(a)} in ${tid}: ${lab(X)} is there already`); }
      else { X.typ[tid] = v; t1('move'); A1.push(`move: ${lab(a)} in ${tid} (typicality ${v}) -> ${lab(X)}: ${act[2]}`); }
    } else {
      if (R.typ[tid] !== undefined) { t1('drop'); A1.push(`drop: ${lab(a)} in ${tid}: the root is there already`); }
      else {
        const show = act.length > 1 ? act[1] : locked ? (a.show?.[tid] || a.text) : null;
        R.typ[tid] = v; if (show && show !== R.text) { R.show ||= {}; R.show[tid] = show; }
        if ((a.nameOkIn || []).includes(tid) && leaks(t, R, show)) R.nameOkIn = [...new Set([...(R.nameOkIn || []), tid])];
        t1('through'); A1.push(`through: ${lab(a)} in ${tid} -> ${lab(R)} (typicality ${v}${show && show !== R.text ? `, shown "${show}"` : ', its own text'}${locked ? ', locked' : ''})${act[2] ? ': ' + act[2] : ''}`);
      }
    }
    delete a.typ[tid]; if (a.show) delete a.show[tid]; if (a.use) delete a.use[tid];
    if (a.nameOkIn?.includes(tid)) a.nameOkIn = a.nameOkIn.filter(x => x !== tid);
    n++;
  }
}
reindex(P);
const left1 = ownLinked();

// ---------- 2. regional roots with an equivalent ----------
// [regional word id, text, root id, root text, kind, region (null: its own), why, { show: { theme: text | null } overrides, rootRegion }]
const UK = ['UK'], US = ['US'];
const M2 = [
  [145, 'newsagent', 146, 'newsstand', 'regional', null, 'the UK word (Simon\'s example)', { show: { shopkeepers: 'newsagent' } }],
  [27364, 'lorry', 28334, 'truck', 'regional', UK, 'the UK word; was untagged'],
  [27370, 'postcode', 26017, 'zip code', 'regional', UK, 'the UK word; was untagged'],
  [27375, 'ring road', 63888, 'beltway', 'regional', UK, 'the UK word for a road round a city; was untagged'],
  [4522, 'primary school', 4523, 'elementary school', 'regional', null, 'the UK word'],
  [64794, 'estate', 2604, 'station wagon', 'synonym', UK, 'the UK clipping; its alias estate car (regional UK) becomes the display word'],
  [28052, 'post', 28070, 'mail', 'regional', UK, 'the UK word for the letters; was untagged'],
  [38380, 'public toilet', 27904, 'restroom', 'regional', UK, 'the UK word; was untagged'],
  [23944, 'washing up', 23934, 'dishes', 'regional', null, 'the UK word for the chore'],
  [5157, 'bank holiday', 5158, 'public holiday', 'regional', null, 'the UK word'],
  [3791, 'face cloth', 3789, 'washcloth', 'synonym', UK, 'second UK word (flannel is the display word)'],
  [48744, 'hand luggage', 2730, 'carry-on', 'regional', null, 'the UK word'],
  [25561, 'baking paper', 25562, 'parchment paper', 'regional', UK, 'the UK word; greaseproof paper (an uncoated paper, a near match) becomes a synonym'],
  [64810, 'wholemeal', 62548, 'whole wheat', 'regional', UK, 'the UK word; was untagged'],
  [40325, 'washing line', 23257, 'clothesline', 'regional', UK, 'the UK word; was untagged'],
  [1867, 'rockery', 1866, 'rock garden', 'regional', null, 'the UK word', { show: { garden_features: 'rock' } }],   // as rock garden shows in garden and garden styles
  [23447, 'camp bed', 3049, 'cot', 'regional', null, 'the UK word for a cot [camp bed]'],
  [61315, 'school disco', 34996, 'school dance', 'regional', null, 'the UK word'],
  [34194, 'Whitsun', 5150, 'Pentecost', 'regional', null, 'the UK name of the feast'],
  [39183, 'chilli', 29499, 'chili', 'spelling', UK, 'UK spelling of chili [pepper]'],
  [24301, 'neighbourhood watch', 4251, 'neighborhood watch', 'spelling', UK, 'UK spelling; the root, now a US spelling with its UK alias, is untagged as color is', { rootRegion: [] }],
  [46707, 'chequered', 38904, 'checkered', 'spelling', UK, 'UK spelling', { drop: { motor_racing: 'checkered flag is the member there; chequered was grouped with it' }, dropKin: 'cheque and checkered only share letters (DESIGN-entries.md 3.7)' }],
  [66182, 'devilled', 63441, 'deviled', 'spelling', UK, 'UK spelling; was untagged'],
  [23508, 'net curtains', 23509, 'sheers', 'regional', null, 'the UK word'],
  [14312, 'Mohican', 14283, 'mohawk', 'regional', null, 'the UK word for the haircut'],
  [34937, 'BSc', 34951, 'BS', 'regional', UK, 'the UK abbreviation of the degree; was untagged'],
  [4670, 'tallboy', 23472, 'highboy', 'regional', null, 'the UK word'],
  [4173, 'longshoreman', 4172, 'stevedore', 'regional', null, 'the US word (docker is the UK one)'],
  [19543, 'club soda', 879, 'sparkling water', 'synonym', null, 'second US word (soda water is the regional one)'],
  [3070, 'campervan', 48282, 'camper van', 'spelling', null, 'closed UK spelling'],
  [48561, 'jacket potatoes', 19141, 'baked potato', 'synonym', null, 'plural of the UK word (jacket potato is the display word)'],
  [17748, 'black pudding', 17749, 'blood sausage', 'regional', null, 'the UK word', { show: { sausages: 'blood' } }],   // a modifier member, as Cumberland in sausages
  [17621, 'baby bella', 17620, 'cremini', 'regional', null, 'the US shop name'],
  [2828, 'life vest', 2827, 'life jacket', 'synonym', null, 'second US word (life preserver is the regional one)'],
  [5908, 'model railways', 2908, 'model railroad', 'synonym', null, 'plural of the UK word (model railway is the display word)'],
  [23449, 'Murphy bed', 23450, 'wall bed', 'regional', null, 'the US word'],
  [23521, 'dust ruffle', 16039, 'bed skirt', 'regional', null, 'the US word'],
  [33119, 'vet nurse', 57558, 'veterinary nurse', 'abbreviation', null, 'clipping of the UK word'],
  [46106, 'Chinese Whispers', 46109, 'telephone', 'regional', null, 'the UK name of the game'],
  [38411, 'no entry', 46721, 'do not enter', 'regional', UK, 'the UK sign; was untagged (the US form stays the root)'],
  [35188, 'poste restante', 61358, 'general delivery', 'regional', UK, 'the UK word; was untagged (the US form stays the root)'],
  [64812, 'court', 24627, 'pumps', 'synonym', null, 'clipping of the UK word (court shoes is the display word)'],
  [23352, 'jumpers', 4873, 'sweater', 'synonym', null, 'plural of the UK word (jumper is the display word)'],
  [66188, 'candyfloss', 628, 'cotton candy', 'synonym', UK, 'closed form of the UK word (candy floss is the display word); was untagged'],
];
const REPOINT2 = [[7225, 'metre rule', 7223, 7224, 'meter stick', 'the UK word for a meter stick, not for a yardstick']];
const KIND2 = [[66614, 'greaseproof paper', 25562, 'synonym', 'an uncoated paper, a near match; baking paper becomes the UK display word']];
const SKIPPED = [
  'mummy / mommy: words for mother is locked and lists both as answers',
  'brandy butter / hard sauce: brandy butter is flagged adult and hard sauce is not; merged, a word would move into or out of the family export',
  'rock pool / tide pool: tide pool is in the theme "rock pool"; the alias would carry the theme\'s own name',
  'satsuma / mandarin, tangerine, clementine: different fruits',
  'chips [food] / French fries, potato chips: the UK sense differs and the entry mixes both',
  'fortnight / two weeks: "two weeks" is a phrase used everywhere; fortnight is the word',
  'fresher / freshman, cop car / patrol car, copper, bobby / police officer, mate / buddy, nan / grandma: slang or informal words in their own right',
  'Hoover, Stanley knife, vacuum flask / thermos, Sellotape, rawlplug, Q-tip, Meccano / Erector Set: brand names used as words',
  'hoarding / billboard, lumber / timber, fanlight / transom, emulsion / latex paint: the regional entry or its partner mixes two senses',
  'boot, bonnet, fringe, plaster [bandage], lay-by, skip, fire engine, roundabout: untagged second roots of words the root already has as aliases (need a delete)',
  'main course / entrée, server / waiter, end table / side table, chocolate bar / candy bar: the other word is used in both dialects or is not the same thing',
  'fairy cake / cupcake, cottage pie / shepherd\'s pie, back bacon / Canadian bacon, digestive / graham cracker, crumpet / English muffin: different things',
  'Remembrance Day / Veterans Day, Pancake Day, Shrove Tuesday / Mardi Gras, Hogmanay / New Year\'s Eve: different observances',
  'boilersuit / coveralls: overalls holds both the bib (dungarees) and the one-piece (coveralls) sense',
  'mitre [joint], mitre [angle cutting]: senses unclear (a saw in saws and things with teeth); need a sense check first',
  'give way (root) / yield, sledge (root) / sled: the UK word is the root with a US alias; flipping roots is out of scope',
];
const A2 = [], famNotes = [], dropped2 = [], tally2 = {}, t2 = k => { tally2[k] = (tally2[k] || 0) + 1; };
const groupOf = (t, id) => (t.groups || []).find(g => g.includes(id));
for (const [id, text, rid, kind, why] of KIND2) {
  const a = E(id); if (a.text !== text) throw Error(`${id} is not ${text}`);
  if (a.aliasOf !== rid) throw Error(`${id} is not an alias of ${rid}`);
  if (a.aliasKind !== kind) { A2.push(`kind: ${lab(a)} under ${lab(E(rid))}: ${a.aliasKind} -> ${kind}: ${why}`); a.aliasKind = kind; n++; }
}
for (const [id, text, from, to, totext, why] of REPOINT2) {
  const a = E(id); if (a.text !== text) throw Error(`${id} is not ${text}`); if (E(to).text !== totext) throw Error(`${to} is not ${totext}`);
  if (a.aliasOf === to) continue;
  if (a.aliasOf !== from) throw Error(`${id} is not an alias of ${from}`);
  if (Object.keys(a.typ).length) throw Error(`${id} has links`);
  a.aliasOf = to; n++; t2('re-pointed'); A2.push(`re-point: ${lab(a)} [${a.region}] (${a.aliasKind}) from ${lab(E(from))} to ${lab(E(to))}: ${why}`);
}
reindex(P);
function merge(R, X, kind, region, why, o = {}) {
  const did = [];
  for (const [tid, v] of Object.entries(X.typ)) {
    if (o.drop?.[tid]) { dropped2.push(`${tid}: "${X.show?.[tid] || X.text}" ${X.id} dropped: ${o.drop[tid]}`); did.push(`${tid}: link dropped (${o.drop[tid]})`); continue; }
    const t = T(tid), locked = themeLocked(P, t);
    if (R.typ[tid] !== undefined) {
      dropped2.push(`${tid}${locked ? ' (locked)' : ''}: "${X.show?.[tid] || X.text}" ${X.id} no longer a separate answer; "${displayKey(P, R, tid)}" ${R.id} stays`);
      did.push(`${tid}: both linked, the root's link kept (typicality ${R.typ[tid]}; the alias's ${v} dropped)`);
      continue;
    }
    const ov = o.show && tid in o.show, show = ov ? o.show[tid] : locked ? (X.show?.[tid] || (X.use?.[tid] && E(X.use[tid]).text) || X.text) : null;   // unlocked: the root's own text, the dialect swap shows the regional word
    R.typ[tid] = v; if (show && show !== R.text) { R.show ||= {}; R.show[tid] = show; }
    if ((X.nameOkIn || []).includes(tid) && leaks(t, R, show)) R.nameOkIn = [...new Set([...(R.nameOkIn || []), tid])];
    if (show && (R.fam || 0) !== (X.fam || 0)) famNotes.push(`${tid}: "${show}" now rated at ${R.text}'s familiarity ${R.fam} (was ${X.fam})`);
    did.push(`${tid}: link moved (typicality ${v})${show && show !== R.text ? `, shown "${show}"` : ''}${locked ? ' (locked)' : ''}`);
  }
  for (const t of P.themes) {   // synonym groups: the regional word's places pass to the root (dropped where the root has a place in that theme)
    if (!t.groups) continue;
    const gs = [];
    for (const g of t.groups) {
      if (!g.includes(X.id)) { gs.push(g); continue; }
      const rg = groupOf(t, R.id), ng = (rg && rg !== g) || R.typ[t.id] === undefined ? g.filter(id => id !== X.id) : [...new Set(g.map(id => id === X.id ? R.id : id))];
      did.push(`${t.id} group (${g.map(id => E(id).text).join(', ')}) -> ${ng.length > 1 ? '(' + ng.map(id => E(id).text).join(', ') + ')' : 'gone'}`);
      if (ng.length > 1) gs.push(ng);
    }
    t.groups = gs; if (!gs.length) delete t.groups;
  }
  if ((X.kin || []).length) {   // kin is a word family: it passes to the root only from a spelling (the same word); a different word's family is not the root's
    if (kind === 'spelling' && !o.dropKin) { did.push(`kin ${X.kin.map(k => E(k).text).join(', ')} -> the root`); moveKin(P, X, R); }
    else { did.push(`kin ${X.kin.map(k => E(k).text).join(', ')} dropped (${o.dropKin || 'not the root\'s word family'})`); for (const k of [...X.kin]) setKin(P, X, E(k), false); }
  }
  for (const a of ix.aliases.get(X.id) || []) {   // the regional word's own aliases: re-pointed; a spelling, form or abbreviation of it is not one of the root
    const k0 = a.aliasKind; a.aliasOf = R.id; if (['spelling', 'form', 'abbreviation'].includes(k0)) a.aliasKind = 'synonym';
    did.push(`alias ${a.text} [${a.region}] re-pointed to the root${k0 !== a.aliasKind ? ` (${k0} -> ${a.aliasKind})` : ''}`);
  }
  for (const e of P.entries) if (e.use) for (const id of Object.values(e.use)) if (id === X.id) throw Error(`${lab(e)} uses ${X.id}`);
  const rset = region || X.region;
  Object.assign(X, { typ: {}, show: {}, use: {}, kin: [], aliasOf: R.id, aliasKind: kind, region: [...rset] });
  X.nameOkIn = (X.nameOkIn || []).filter(tid => R.typ[tid] !== undefined); if (!X.nameOkIn.length) delete X.nameOkIn;
  if (kind === 'spelling') for (const f of ['adult', 'vulgar', 'sensitive', 'tm']) X[f] = !!R[f];
  if (o.rootRegion) { did.push(`root region [${R.region}] -> [${o.rootRegion}]`); R.region = [...o.rootRegion]; }
  reindex(P);
  return did;
}
for (const [xid, xtext, rid, rtext, kind, region, why, o] of M2) {
  const X = E(xid), R = E(rid);
  if (X.text !== xtext) throw Error(`${xid} is not ${xtext}`); if (R.text !== rtext) throw Error(`${rid} is not ${rtext}`);
  if (R.aliasOf) throw Error(`${rid} is an alias`);
  if (X.aliasOf === rid) { if (X.aliasKind !== kind) throw Error(`${xid} is an alias of ${rid} of kind ${X.aliasKind}`); t2('done'); continue; }
  if (X.aliasOf) throw Error(`${xid} is an alias of ${X.aliasOf}`);
  if (X.adult !== R.adult || X.vulgar !== R.vulgar) throw Error(`${xid}/${rid}: adult or vulgar differ`);
  const reg = region || X.region;
  if (dispKind(kind)) for (const d of ['UK', 'US']) if (reg.includes(d)) {
    const other = (ix.aliases.get(rid) || []).filter(a => dispKind(a.aliasKind) && a.region.includes(d));
    if (other.length) throw Error(`${rtext} has a ${d} display alias already (${other.map(a => a.text)}): make ${xtext} a synonym`);
  }
  const was = `[${X.region}] root`;
  const did = merge(R, X, kind, region, why, o || {}); n++; t2(kind);
  A2.push(`${kind}: ${lab(X)} ${was} -> ${kind} [${X.region}] of ${lab(R)}${R.region.length ? ' [' + R.region + ']' : ''}: ${why}; ${did.join('; ') || 'no links of its own'}`);
}
reindex(P);
{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }
const left2 = ownLinked();

// ---------- name allowances ----------
// An alias now in a theme it was not in (its root gained the theme, or it became an alias) sits there under its own text in an unlocked theme:
// where that text holds a word of the theme name it is the real name there too, so it carries the name allowance (as batch403 and the existing
// aliases do: estate car in cars).
const nok = [];
for (const a of P.entries) {
  if (!a.aliasOf) continue;
  const was = inh0.get(a.id) || new Set();
  for (const tid of linkIds(P, a)) {
    if (was.has(tid) || (a.nameOkIn || []).includes(tid)) continue;
    const t = T(tid); if (themeLocked(P, t) || !nameLeak(t, a)) continue;
    a.nameOkIn = [...(a.nameOkIn || []), tid]; n++; nok.push(`${lab(a)} in ${tid}`);
  }
}

// ---------- status ----------
let revSet = 0, touched = 0;
for (const e of P.entries) { if (snap.get(e.id) === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
for (const [xid, , rid] of M2) for (const e of [E(xid), E(rid)]) if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract(), sd1 = infos('same-display');
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const sdNew = [...sd1].filter(x => !sd0.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const ck = [...new Set([...Object.keys(k0.c), ...Object.keys(k1.c)])].sort();
const clashMsgs = sev => validate(P).filter(i => i.kind === sev).map(i => i.msg.replace(/^A clash group .*? has (\d+) words.*?: (.*?)\.( It can.*)?$/, (m, k, w) => `${k} (${w.split(', ').slice(0, 6).join(', ')}${w.split(', ').length > 6 ? ', ..' : ''})`));
const large = clashMsgs('clash-large'), bigs = clashMsgs('clash-big');

// export comparison (before = the committed file when baseOk)
const CF = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')), CE = CF.entries;
const sameA = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const baseOk = sameA(CE.text, x0.text) && sameA(CE.links, x0.links) && sameA(CE.clash, x0.clash);
const cmp = [`Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO'}`];
const tGone = x0.themes.filter(t => !x1.themes.includes(t)), tNew = x1.themes.filter(t => !x0.themes.includes(t)), tShift = x1.themes.findIndex((t, i) => x0.themes[i] !== t);
cmp.push(`Themes ${x0.themes.length} -> ${x1.themes.length}; gone ${tGone.join(', ') || 'none'}; new ${tNew.join(', ') || 'none'}; theme indexes shift from ${tShift < 0 ? 'none' : `index ${tShift} (${x1.themes[tShift]})`}`);
const ia = new Map(x0.ids.map((id, i) => [id, i])), ib = new Map(x1.ids.map((id, i) => [id, i]));
const addedRows = x1.ids.filter(id => !ia.has(id)), removedRows = x0.ids.filter(id => !ib.has(id));
const firstShift = x1.ids.findIndex((id, i) => x0.ids[i] !== id);
const moved = x1.ids.filter((id, i) => ia.has(id) && ia.get(id) !== i).length;
cmp.push(`Entries ${x0.ids.length} -> ${x1.ids.length}; first row whose entry changed: ${firstShift < 0 ? 'none' : `${firstShift} (${lab(E(x1.ids[firstShift]))}, was ${lab(E(x0.ids[firstShift]))})`}; rows that moved: ${moved}; added ${addedRows.map(id => `${lab(E(id))} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removedRows.map(id => `${lab(E(id))}`).join(', ') || 'none'}`);
const firstAny = x1.ids.findIndex((id, i) => x0.ids[i] !== id || x1.text[i] !== x0.text[i] || x1.flags[i] !== x0.flags[i] || x1.root[i] !== x0.root[i] || x1.linkCount[i] !== x0.linkCount[i] || x1.fam[i] !== x0.fam[i]);
cmp.push(`First row with any change (entry, text, flags, root, link count or familiarity): ${firstAny < 0 ? 'none' : `${firstAny} (${lab(E(x1.ids[firstAny]))})`}`);
const textCh = x1.ids.filter((id, i) => ia.has(id) && x1.text[i] !== x0.text[ia.get(id)]).map(id => `${x0.text[ia.get(id)]} -> ${x1.text[ib.get(id)]} (${id})`);
const flagCh = x1.ids.filter((id, i) => ia.has(id) && x1.flags[i] !== x0.flags[ia.get(id)]);
const toAlias = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] !== 0 && x0.root[ia.get(id)] === 0).map(id => lab(E(id)));
const toRoot = x1.ids.filter((id, i) => ia.has(id) && x1.root[i] === 0 && x0.root[ia.get(id)] !== 0).map(id => lab(E(id)));
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed on ${flagCh.length} rows; root -> alias ${toAlias.length}: ${toAlias.join(', ') || 'none'}; alias -> root ${toRoot.length}: ${toRoot.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length}`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(E(x1.ids[firstLinkShift]))}) on, link positions move`}`);
function shownMap(x, rootsOnly) {   // per theme: the text shown for each link (root rows only when rootsOnly: what the game reads)
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { if (rootsOnly && x.root[i]) return; for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (row of ${id})`; };
for (const [label, ro] of [['root rows (what the game reads)', true], ['all rows', false]]) {
  const m0 = shownMap(x0, ro), m1 = shownMap(x1, ro);
  const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
  cmp.push(`Links by theme + shown text + row, ${label}: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
  if (ro) { for (const k of lost) cmp.push(`  gone: ${fmt(k)}`); for (const k of gained) cmp.push(`  new: ${fmt(k)}`); for (const k of rated) cmp.push(`  rating: ${fmt(k)} ${m0.get(k)} -> ${m1.get(k)}`); }
}
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);

const summary = ['Fixes: alias-as-answer links (the game never reads alias links); regional roots with an equivalent in the other dialect (contract-root-region).',
  `1. alias links: ${A1.length} actions; ${Object.entries(tally1).map(([k, v]) => k + ' ' + v).join(', ')}`, ...A1.map(x => '  ' + x),
  `   aliases with links of their own after part 1: ${left1.length}${left1.length ? ': ' + left1.map(lab).join(', ') : ''}`,
  `2. regional roots merged into their equivalent: ${M2.length} pairs; ${Object.entries(tally2).map(([k, v]) => k + ' ' + v).join(', ')}`, ...A2.map(x => '  ' + x),
  `   answers no longer separate (both were linked): ${dropped2.length}`, ...dropped2.map(x => '    ' + x),
  `   shown texts rated at the root's familiarity: ${famNotes.join('; ') || 'none'}`,
  `   skipped (doubtful or out of scope): ${SKIPPED.length}`, ...SKIPPED.map(x => '    ' + x),
  `name allowances given to aliases now in a theme whose name holds their word: ${nok.length}${nok.length ? ': ' + nok.join(', ') : ''}`,
  `aliases with links of their own after the batch: ${left2.length}${left2.length ? ': ' + left2.map(lab).join(', ') : ''}`,
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `same-display (info) new: ${sdNew.length}${sdNew.length ? ': ' + sdNew.join(' | ') : ''}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; after: ${ck.map(k => `${k} ${k1.c[k] || 0}`).join(', ')}; contract-alias-dialect after: ${k1.dial.length}${k1.dial.length ? ': ' + k1.dial.join(' | ') : ''}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch413-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
