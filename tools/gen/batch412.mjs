// Library batch v412 (approved by Simon 2026-11-20):
//   1. One display alias per dialect (export contract `contract-alias-dialect`, GAME-CONTRACT.md Entries: flags). The game shows a British player the
//      first UK-tagged spelling or regional alias in row order and an American player the first US-tagged spelling alias, so a root keeps at most one
//      spelling/regional alias per dialect (US regional ones too, so the library reads the same way). For each root the standard everyday word of that
//      dialect stays; wrong region tags are fixed; the other true variants become synonym aliases (not display aliases; they keep the region when the
//      word is specific to it, as mailman [US] and garbage can [US] already do); a region is removed only when the word is not specific to the dialect;
//      when the root itself is the dialect's word (lapwing, tadpole, sleepover, conscription) no alias of that dialect stays. off-ramp (tagged UK under
//      on-ramp, the opposite thing) becomes a root of its own in parts of a road.
//   2. Alias flags (`alias-flags`): every spelling or form alias takes its root's adult, vulgar, sensitive and tm flags. The roots are right in every
//      case; Slip n Slide is the brand name of the generic slip and slide, not its spelling, so it becomes a synonym alias and keeps tm.
//   Part 3 (regional aliases with links of their own) changes nothing: the list is tools/gen/regional-linked-aliases.tsv.
// Every entry this batch changes or confirms gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch412.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
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
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
const contract = () => { const iss = checkContract(buildExport(P, { ...PRESETS.family, zipf: true }).file), c = {}; for (const i of iss) c[i.kind] = (c[i.kind] || 0) + 1; return { c, dial: iss.filter(i => i.kind === 'contract-alias-dialect').map(i => `${i.at}: ${i.msg}`) }; };
function exp() {   // the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try { const { file } = buildExport(P, { ...PRESETS.family, gloss: true }), X = file.entries; return { ids: X.gloss.map(Number), text: X.text, clash: X.clash, links: X.links, linkCount: X.linkCount, root: X.root, flags: X.flags, fam: X.familiarity, themes: file.themes.map(t => t[0]), shown: file.shown }; }
  finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}
const [before, mBefore] = count(), x0 = exp(), k0 = contract();
let n = 0, revSet = 0;
const revd = new Set(), rev = e => { if (e.status !== 'rev') { e.status = 'rev'; revSet++; n++; } revd.add(e.id); };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ---------- 1. one display alias per dialect ----------
// [alias id, text, root id, action, region after (null: unchanged), reason]
//   keep: the dialect's display alias, confirmed (status rev only)
//   retag: stays regional, region fixed
//   synonym: kind regional/spelling -> synonym (not a display alias), region as given
//   spelling: stays a spelling alias, region fixed (no longer UK/US)
//   root: becomes a root of its own (see ROOTS)
const UK = ['UK'], US = ['US'], NONE = [];
const D1 = [
  // scallion
  [421, 'spring onion', 422, 'keep', null, 'the UK word'],
  [423, 'green onion', 422, 'retag', US, 'green onion is the US word, not British'],
  // crayfish
  [500, 'crawfish', 499, 'keep', null, 'the usual US regional word'],
  [501, 'crawdad', 499, 'synonym', US, 'a second, more colloquial US word'],
  // soda
  [869, 'fizzy drink', 867, 'keep', null, 'the standard UK word'],
  [57861, 'fizzy pop', 867, 'synonym', UK, 'informal UK variant'],
  // lapwing: lapwing is the UK word itself
  [1121, 'peewit', 1120, 'synonym', UK, 'lapwing is the standard UK word; peewit is a folk name'],
  [1122, 'green plover', 1120, 'synonym', UK, 'lapwing is the standard UK word; green plover is an old name'],
  // tadpole: tadpole is the US word itself
  [1164, 'polliwog', 1163, 'synonym', US, 'tadpole is the standard US word; polliwog is dialect'],
  [1165, 'pollywog', 1163, 'synonym', US, 'tadpole is the standard US word; a variant of polliwog'],
  // pollock
  [1261, 'coley', 1258, 'keep', null, 'the UK fishmonger name'],
  [1262, 'saithe', 1258, 'synonym', UK, 'the less common UK name'],
  // roly-poly
  [1416, 'woodlouse', 1418, 'keep', null, 'the UK word'],
  [1417, 'pill bug', 1418, 'retag', US, 'pill bug is American, not British'],
  // stink bug
  [1423, 'shield bug', 1424, 'keep', null, 'the UK word'],
  [63671, 'shield', 1424, 'synonym', UK, 'a clipping of shield bug, not the display word'],
  // pruning shears
  [1880, 'secateurs', 1881, 'keep', null, 'the UK word'],
  [1882, 'pruners', 1881, 'retag', US, 'pruners is American usage, not British'],
  // GPS
  [2416, 'sat nav', 2415, 'keep', null, 'the UK word'],
  [2417, 'satnav', 2415, 'synonym', UK, 'the closed form of sat nav, not a spelling of GPS'],
  // movie theater
  [2476, 'cinema', 2477, 'keep', null, 'the UK word'],
  [2478, 'picture house', 2477, 'synonym', UK, 'dated UK word'],
  [64832, 'movie theatre', 2477, 'spelling', ['CA'], 'Canadian spelling; British players say cinema'],
  // license plate
  [2582, 'number plate', 2581, 'keep', null, 'the UK word'],
  [2583, 'registration plate', 2581, 'synonym', UK, 'formal UK term'],
  [48295, 'number plate game', 2581, 'synonym', UK, 'the UK name of the license plate game, not a spelling of license plate (it would replace license plate in cars)'],
  [2584, 'tag', 2581, 'keep', null, 'the only US alias'],
  // subway [train]
  [2648, 'underground', 2647, 'keep', null, 'the UK word'],
  [2649, 'tube', 2647, 'synonym', UK, 'the London Underground only'],
  [2650, 'metro', 2647, 'synonym', NONE, 'not British: metro is used in the US, Australia and Europe alike'],
  // railcar
  [2860, 'carriage', 2859, 'keep', null, 'the UK word'],
  [2861, 'coach', 2859, 'synonym', ['UK', 'IN'], 'second UK word'],
  // conductor [train]
  [2863, 'guard', 2862, 'keep', null, 'the UK word'],
  [2892, 'ticket inspector', 2862, 'synonym', UK, 'checks tickets only; a near match'],
  // caboose
  [2871, "guard's van", 2870, 'keep', null, 'the UK word'],
  [47693, 'brake van', 2870, 'synonym', UK, 'railway term for the same van'],
  // railroad crossing
  [2877, 'level crossing', 2879, 'keep', null, 'the UK word'],
  [2878, 'grade crossing', 2879, 'retag', US, 'grade crossing is American, not British'],
  // vacation rental
  [3003, 'holiday let', 3002, 'keep', null, 'the UK word'],
  [3004, 'holiday home', 3002, 'synonym', ['UK', 'AU'], 'a second home one owns; a near match'],
  // air mattress
  [23448, 'air bed', 3050, 'keep', null, 'the everyday UK word'],
  [3051, 'lilo', 3050, 'synonym', UK, 'a pool float (from the Li-Lo brand)'],
  // dump truck
  [3106, 'tipper truck', 3105, 'keep', null, 'the UK word'],
  [3107, 'dumper', 3105, 'synonym', UK, 'a site dumper; variant'],
  [49256, 'tipper', 3105, 'synonym', UK, 'short form of tipper truck'],
  [49257, 'dumper truck', 3105, 'synonym', UK, 'variant'],
  // garbage truck
  [3114, 'bin lorry', 3113, 'keep', null, 'the everyday UK word'],
  [3115, 'dustcart', 3113, 'synonym', UK, 'older UK word'],
  // stroller
  [3558, 'pushchair', 3557, 'keep', null, 'the UK word'],
  [3559, 'pram', 3557, 'synonym', ['UK', 'AU', 'NZ', 'IE'], 'a pram is a lie-flat carriage; a near match'],
  [3560, 'buggy', 3557, 'synonym', ['UK', 'IE'], 'informal UK word'],
  // sunscreen
  [66627, 'sun cream', 3745, 'keep', null, 'the everyday UK word'],
  [3747, 'suntan lotion', 3745, 'synonym', NONE, 'not British only: common in the US too'],
  // bobby pin
  [3800, 'hair grip', 3799, 'keep', null, 'the UK word'],
  [3801, 'Kirby grip', 3799, 'synonym', UK, 'second UK word (from a brand)'],
  // fiber
  [3823, 'fibre', 3822, 'keep', null, 'the UK spelling'],
  [3824, 'roughage', 3822, 'synonym', NONE, 'another word, used in the US too'],
  // roommate
  [3932, 'flatmate', 3931, 'keep', null, 'the UK word'],
  [3933, 'housemate', 3931, 'synonym', ['UK', 'AU', 'NZ'], 'someone sharing a house; a near match'],
  [3934, 'roomie', 3931, 'keep', null, 'the only US alias'],
  // sleepover: sleepover is the US word itself
  [3936, 'slumber party', 3935, 'synonym', US, 'sleepover is the standard US word'],
  [3937, 'pajama party', 3935, 'synonym', US, 'sleepover is the standard US word'],
  // carpenter
  [4095, 'joiner', 4094, 'keep', null, 'the UK trade word'],
  [4096, 'chippy', 4094, 'synonym', ['UK', 'AU'], 'slang nickname'],
  // mail carrier
  [4121, 'postman', 4120, 'keep', null, 'the UK word'],
  [66207, 'postie', 4120, 'synonym', ['UK', 'AU', 'NZ'], 'informal nickname'],
  // garbage collector
  [4126, 'binman', 4125, 'keep', null, 'the everyday UK word'],
  [4127, 'dustman', 4125, 'synonym', UK, 'older UK word'],
  [4128, 'refuse collector', 4125, 'synonym', UK, 'formal UK term'],
  [23988, 'bin man', 4125, 'synonym', UK, 'open form of binman'],
  // conscription: conscription is the UK word itself
  [4445, 'the draft', 4444, 'keep', null, 'the only US alias'],
  [4446, 'call-up', 4444, 'synonym', UK, 'conscription is the standard UK word'],
  [4447, 'national service', 4444, 'synonym', UK, 'the historical UK scheme; conscription is the standard word'],
  // principal [school]
  [4498, 'headteacher', 4497, 'keep', null, 'the UK word'],
  [4501, 'head', 4497, 'synonym', UK, 'short form'],
  [66687, 'head teacher', 4497, 'synonym', UK, 'open form of headteacher'],
  // notebook [paper]
  [4505, 'exercise book', 4504, 'keep', null, 'the UK word'],
  [4506, 'jotter', 4504, 'synonym', UK, 'Scottish and informal'],
  // cafeteria
  [4529, 'canteen', 4528, 'keep', null, 'the UK word'],
  [4531, 'dinner hall', 4528, 'synonym', UK, 'a school dinner hall only'],
  // teachers' lounge
  [4541, 'staff room', 4543, 'keep', null, 'the UK word'],
  [4542, 'staffroom', 4543, 'synonym', UK, 'closed form of staff room, not a spelling of teachers\' lounge'],
  // nightstand
  [4677, 'bedside table', 4676, 'keep', null, 'the UK word'],
  [4678, 'bedside cabinet', 4676, 'synonym', UK, 'variant'],
  // range hood
  [4775, 'cooker hood', 4773, 'keep', null, 'the UK word'],
  [66205, 'extractor fan', 4773, 'synonym', ['UK', 'AU'], 'the fan in it; a near match'],
  // sweater
  [4874, 'jumper', 4873, 'keep', null, 'the UK word'],
  [4876, 'jersey', 4873, 'synonym', UK, 'second UK word'],
  [4877, 'woolly', 4873, 'synonym', UK, 'informal'],
  [25746, 'knitted jumper', 4873, 'synonym', UK, 'longer form'],
  // sweatpants
  [4902, 'joggers', 4901, 'keep', null, 'the UK word'],
  [4903, 'trackies', 4901, 'synonym', ['AU', 'NZ', 'UK'], 'slang'],
  // handbag: handbag is neutral; purse is the US word
  [4958, 'purse', 4957, 'keep', null, 'the US word'],
  [4959, 'pocketbook', 4957, 'synonym', US, 'dated US word'],
  // fanny pack
  [4989, 'bum bag', 4988, 'keep', null, 'the UK word'],
  [4990, 'waist pack', 4988, 'synonym', NONE, 'not British: a retail term used in the US too'],
  // bachelor party
  [5182, 'stag night', 5181, 'keep', null, 'the UK word'],
  [25126, 'stag do', 5181, 'synonym', UK, 'informal variant'],
  // bachelorette party
  [5185, 'hen night', 5184, 'keep', null, 'the UK word (as stag night)'],
  [5186, 'hen do', 5184, 'synonym', UK, 'informal variant'],
  [25127, 'hen party', 5184, 'synonym', UK, 'variant'],
  // cell phone
  [66203, 'mobile phone', 7325, 'keep', null, 'the UK word, full term'],
  [7327, 'mobile', 7325, 'synonym', ['UK', 'AU', 'IE', 'IN'], 'short form of mobile phone'],
  // diarrhea
  [14882, 'diarrhoea', 14881, 'keep', null, 'the UK spelling'],
  [14884, 'the trots', 14881, 'synonym', NONE, 'slang, not British only'],
  // pill organizer
  [64866, 'pill organiser', 15352, 'keep', null, 'the UK spelling'],
  [15353, 'dosette box', 15352, 'synonym', UK, 'pharmacy term'],
  // baked potato
  [19146, 'jacket potato', 19141, 'keep', null, 'the UK word'],
  [63528, 'jacket', 19141, 'synonym', UK, 'short form'],
  // oven mitt
  [23127, 'oven glove', 19862, 'keep', null, 'the UK word'],
  [24763, 'oven gloves', 19862, 'synonym', UK, 'plural of oven glove'],
  // appetizer
  [20080, 'starter', 20079, 'keep', null, 'the everyday UK word for the course'],
  [64886, 'appetiser', 20079, 'synonym', UK, 'UK spelling, less usual than starter for the course'],
  // trash can
  [23250, 'bin', 23251, 'keep', null, 'the everyday UK word'],
  [25798, 'dustbin', 23251, 'synonym', UK, 'older UK word'],
  [39709, 'rubbish bin', 23251, 'synonym', UK, 'longer form'],
  // wood stove
  [23582, 'wood burner', 23583, 'keep', null, 'the UK word'],
  [23599, 'log burner', 23583, 'synonym', UK, 'variant'],
  // trash
  [27369, 'rubbish', 23972, 'keep', null, 'the UK word'],
  [23973, 'garbage', 23972, 'retag', US, 'garbage is American, not British'],
  // recycling center
  [24000, 'recycling centre', 23999, 'keep', null, 'the UK spelling'],
  [24001, 'tip', 23999, 'synonym', UK, 'informal: the dump'],
  // rubber boots
  [24588, 'wellies', 24589, 'keep', null, 'the everyday UK word'],
  [24590, 'Wellington boots', 24589, 'synonym', UK, 'full form'],
  [65834, 'Wellingtons', 24589, 'synonym', UK, 'variant'],
  // snap [fastener]
  [24981, 'press stud', 24982, 'keep', null, 'the UK word'],
  [24983, 'popper', 24982, 'synonym', UK, 'informal'],
  // paper towel
  [25550, 'kitchen roll', 25549, 'keep', null, 'the UK word'],
  [66610, 'kitchen paper', 25549, 'synonym', UK, 'variant'],
  // quotation marks
  [26102, 'inverted commas', 26101, 'keep', null, 'the UK word'],
  [26103, 'speech marks', 26101, 'synonym', UK, 'school term'],
  // mold [fungus]
  [30331, 'mould', 30330, 'keep', null, 'the UK spelling'],
  [14935, 'mould allergy', 30330, 'synonym', UK, 'an allergy, not a spelling of mold'],
  // weed whacker
  [30721, 'strimmer', 30722, 'keep', null, 'the UK word'],
  [30723, 'weed eater', 30722, 'retag', US, 'weed eater is American (from a US brand), not British'],
  // substitute teacher
  [34804, 'supply teacher', 34803, 'keep', null, 'the UK word'],
  [34805, 'cover teacher', 34803, 'synonym', UK, 'a near match'],
  // guidance counselor
  [34810, 'school counsellor', 34809, 'keep', null, 'the UK word'],
  [64910, 'guidance counsellor', 34809, 'spelling', ['IE', 'CA'], 'Irish and Canadian usage; British players say school counsellor'],
  // crossing guard
  [34813, 'lollipop lady', 34812, 'keep', null, 'the UK word'],
  [66367, 'lollipop man', 34812, 'synonym', UK, 'the male form'],
  // mailbox [postbox]
  [38220, 'postbox', 38221, 'keep', null, 'the UK word'],
  [40084, 'post box', 38221, 'synonym', UK, 'open form of postbox'],
  [61356, 'pillar box', 38221, 'synonym', UK, 'the old pillar type'],
  // on-ramp
  [38431, 'slip road', 38432, 'keep', null, 'the UK word'],
  [38433, 'off-ramp', 38432, 'root', null, 'the opposite thing (an exit ramp), not a UK word for on-ramp'],
  // downtown
  [38447, 'town centre', 38450, 'keep', null, 'the UK word'],
  [38449, 'city centre', 38450, 'synonym', UK, 'a city\'s; variant'],
  [38448, 'town center', 38450, 'keep', null, 'the only US alias'],
  // vapor
  [40476, 'vapour', 40475, 'keep', null, 'the UK spelling'],
  [31998, 'water vapour', 40475, 'synonym', UK, 'a longer term, not a spelling of vapor'],
  // swim meet
  [35003, 'swimming gala', 43300, 'keep', null, 'the UK word'],
  [43301, 'gala', 43300, 'synonym', UK, 'short form'],
  // student driver
  [46670, 'learner driver', 46671, 'keep', null, 'the UK word'],
  [35606, 'L-plater', 46671, 'synonym', ['UK', 'AU'], 'informal'],
  // turn signal
  [46673, 'indicator', 46674, 'keep', null, 'the UK word'],
  [46675, 'blinker', 46674, 'retag', US, 'blinker is American, not British'],
  // rest area
  [46737, 'services', 46736, 'keep', null, 'the UK word (motorway services)'],
  [46738, 'lay-by', 46736, 'synonym', UK, 'a roadside pull-in; a near match'],
  // tire chains
  [64947, 'tyre chains', 46858, 'keep', null, 'the UK spelling'],
  [46859, 'snow chains', 46858, 'synonym', NONE, 'not British only: used in the US too'],
  // trunk organizer
  [46865, 'boot organiser', 46864, 'keep', null, 'the UK word'],
  [64948, 'trunk organiser', 46864, 'synonym', UK, 'mixed form'],
  // flat tire
  [64950, 'flat tyre', 47991, 'keep', null, 'the UK spelling'],
  [47992, 'puncture', 47991, 'synonym', UK, 'the hole; a near match'],
  // gasoline
  [27368, 'petrol', 50000, 'keep', null, 'the UK word'],
  [46761, 'gas', 50000, 'retag', US, 'gas is American, not British'],
  // colored powder
  [64966, 'coloured powder', 55675, 'keep', null, 'the UK spelling'],
  [55676, 'colour powder', 55675, 'synonym', UK, 'variant'],
  // fiber optic cable
  [64971, 'fibre optic cable', 57824, 'keep', null, 'the UK spelling'],
  [57825, 'optical fibre', 57824, 'synonym', UK, 'the fibre itself; a near match'],
  // plush
  [5972, 'soft toy', 64800, 'keep', null, 'the UK word'],
  [5973, 'cuddly toy', 64800, 'synonym', UK, 'variant'],
  // taxi stand
  [13899, 'taxi rank', 67180, 'keep', null, 'the UK word'],
  [63911, 'rank', 67180, 'synonym', UK, 'short form'],
  // row house
  [125, 'terraced house', 67200, 'keep', null, 'the UK word'],
  [64222, 'terraced', 67200, 'synonym', UK, 'the adjective alone'],
];
// off-ramp: a root of its own (US/neutral, untagged), keeping the themes it reached through on-ramp, rated as on-ramp is there
const ROOTS = { 38433: { pos: 'noun', type: 'common', fam: 2, typ: { parts_of_a_road: 3, giving_directions: 5 } } };   // the two themes and ratings it had through on-ramp
const A1 = [], acts = {};
for (const [id, text, rid, act, region, why] of D1) {
  const e = E(id); if (e.text !== text) throw Error(`${id} is not ${text}: ${e.text}`);
  acts[act] = (acts[act] || 0) + 1;
  if (act === 'root') {
    const R = ROOTS[id];
    if (!e.aliasOf) { A1.push(`done: ${lab(e)} root`); rev(e); continue; }
    if (e.aliasOf !== rid) throw Error(`${id} is not an alias of ${rid}`);
    e.aliasOf = 0; e.aliasKind = ''; e.region = []; Object.assign(e, { pos: R.pos, type: R.type, fam: R.fam }); e.typ = { ...R.typ }; n++; rev(e);
    A1.push(`root: ${lab(e)} (was regional [UK] under ${lab(E(rid))}): ${why}; linked ${Object.entries(R.typ).map(([t, v]) => t + ' ' + v).join(', ')}`);
    continue;
  }
  if (e.aliasOf !== rid) throw Error(`${id} ${text} is not an alias of ${rid}`);
  const kind = act === 'synonym' ? 'synonym' : act === 'keep' ? e.aliasKind : act === 'retag' ? 'regional' : 'spelling';
  const reg = region || e.region;
  if (e.aliasKind === kind && same(e.region, reg)) { rev(e); if (act !== 'keep') A1.push(`done: ${act} ${lab(e)}`); continue; }
  if (act === 'keep') throw Error('keep changes ' + id);
  const was = `${e.aliasKind} [${e.region.join(',')}]`;
  e.aliasKind = kind; e.region = [...reg]; n++; rev(e);
  A1.push(`${act}: ${lab(e)} under ${lab(E(rid))}: ${was} -> ${kind} [${reg.join(',')}]: ${why}`);
}
reindex(P);
// the rule after: no root with two UK or two US spelling/regional aliases, none tagged both
const disp = a => a.aliasKind === 'spelling' || a.aliasKind === 'regional';
const left = [];
for (const r of P.entries) if (!r.aliasOf) {
  const al = (ix.aliases.get(r.id) || []).filter(disp);
  for (const d of ['UK', 'US']) { const l = al.filter(a => a.region.includes(d)); if (l.length > 1) left.push(`${lab(r)}: ${d} ${l.map(a => a.text).join(', ')}`); }
  for (const a of al) if (a.region.includes('UK') && a.region.includes('US')) left.push(`${lab(a)} tagged UK and US`);
}

// ---------- 2. alias flags ----------
const A2 = [];
const SYN2 = { 58941: 'Slip n Slide' };   // brand name of the generic root: a synonym alias, tm kept
for (const e of P.entries) {
  if (!e.aliasOf) continue;
  if (SYN2[e.id]) { if (e.text !== SYN2[e.id]) throw Error(e.id + ' is not ' + SYN2[e.id]);
    if (e.aliasKind === 'spelling') { e.aliasKind = 'synonym'; n++; rev(e); A2.push(`${lab(e)} under ${lab(E(e.aliasOf))}: spelling -> synonym (the Wham-O brand name of the generic root, not its spelling; tm kept)`); } else rev(e);
    continue; }
  if (e.aliasKind !== 'spelling' && e.aliasKind !== 'form') continue;
  const r = E(e.aliasOf), diff = ['adult', 'vulgar', 'sensitive', 'tm'].filter(f => !!e[f] !== !!r[f]);
  if (!diff.length) continue;
  for (const f of diff) e[f] = !!r[f];
  n++; rev(e); A2.push(`${lab(e)} (${e.aliasKind} of ${lab(r)}): ${diff.map(f => `${f} ${r[f] ? 'on' : 'off'}`).join(', ')}, as the root`);
}
reindex(P);
{ let hi = 0; for (const e of P.entries) if (e.id > hi) hi = e.id; if (P.nextId <= hi) { P.nextId = hi + 1; n++; } }

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), k1 = contract();
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
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
const rootCh = x1.ids.filter((id, i) => ia.has(id) && (x1.root[i] === 0) !== (x0.root[ia.get(id)] === 0)).map(id => lab(E(id)));
cmp.push(`Row text changes: ${textCh.join(', ') || 'none'}; flags changed on ${flagCh.length} rows; alias/root changed: ${rootCh.join(', ') || 'none'}`);
const sum = a => a.reduce((s, v) => s + v, 0);
const start = x => { const s = []; let q = 0; for (const c of x.linkCount) { s.push(q); q += c; } return s; };
const s0 = start(x0), s1 = start(x1);
const lcCh = x1.ids.filter((id, i) => ia.has(id) && x1.linkCount[i] !== x0.linkCount[ia.get(id)]);
cmp.push(`Links ${sum(x0.linkCount)} -> ${sum(x1.linkCount)}; rows whose link count changed: ${lcCh.length} (${lcCh.map(id => lab(E(id))).join(', ') || 'none'})`);
const firstLinkShift = x1.ids.findIndex((id, i) => ia.has(id) && s1[i] !== s0[ia.get(id)]);
cmp.push(`Link-index shifts: ${firstLinkShift < 0 ? 'none' : `from row ${firstLinkShift} (${lab(E(x1.ids[firstLinkShift]))}) on, link positions move`}`);
function shownMap(x) {
  const st = start(x), m = new Map();
  x.ids.forEach((id, i) => { for (let j = 0; j < x.linkCount[i]; j++) { const q = (st[i] + j) * 4, th = x.themes[x.links[q]], sh = x.links[q + 3], txt = sh ? x.shown[sh - 1][0] : x.text[i]; m.set(th + '\t' + txt + '\t' + id, `${x.links[q + 1]}/${x.links[q + 2]}`); } });
  return m;
}
const m0 = shownMap(x0), m1 = shownMap(x1);
const lost = [...m0.keys()].filter(k => !m1.has(k)), gained = [...m1.keys()].filter(k => !m0.has(k)), rated = [...m1.keys()].filter(k => m0.has(k) && m0.get(k) !== m1.get(k));
const fmt = k => { const [th, t, id] = k.split('\t'); return `${th}: "${t}" (row of ${id})`; };
cmp.push(`Links by theme + shown text + row: gone ${lost.length}, new ${gained.length}, rating changed ${rated.length}`);
for (const k of lost) cmp.push(`  gone: ${fmt(k)}`);
for (const k of gained) cmp.push(`  new: ${fmt(k)}`);
for (const k of rated) cmp.push(`  rating: ${fmt(k)} ${m0.get(k)} -> ${m1.get(k)}`);
const cstat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); const d = {}; for (const g of m.values()) d[g.length] = (d[g.length] || 0) + 1; return { m, d, words: x.clash.filter(Boolean).length }; };
const c0 = cstat(x0), c1 = cstat(x1), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
cmp.push(`Clash (family export): words with an id ${c0.words} -> ${c1.words}; ids ${c0.m.size} -> ${c1.m.size}; sizes before ${dl(c0.d)}; after ${dl(c1.d)}`);
cmp.push(`  groups over ${CLASH_SOFT} after: ${[...c1.m.values()].filter(g => g.length > CLASH_SOFT).length}`);

const summary = ['Fixes: one display alias per dialect (contract-alias-dialect); alias flags as the root (alias-flags).',
  `1. dialect aliases: ${D1.length} aliases under ${new Set(D1.map(d => d[2])).size} roots; actions ${Object.entries(acts).map(([k, v]) => k + ' ' + v).join(', ')}`, ...A1.map(x => '  ' + x),
  `   roots still with two display aliases of one dialect, or an alias tagged UK and US: ${left.length ? left.join('; ') : 'none'}`,
  `2. alias flags (${A2.length}):`, ...A2.map(x => '  ' + x),
  `library changes ${n}; status set to rev ${revSet}; entries touched ${revd.size}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0.c[k] !== k1.c[k]).map(k => `${k} ${k0.c[k] || 0} -> ${k1.c[k] || 0}`).join(', ') || 'no change'}; contract-alias-dialect after: ${k1.dial.length}${k1.dial.length ? ': ' + k1.dial.join(' | ') : ''}`,
  `clash-big (full library, > ${CLASH_MAX}) after: ${bigs.length}: ${bigs.join(' | ') || 'none'}`, `clash-large (full library, 9-${CLASH_MAX}) after: ${large.length}`,
  ...cmp];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch412-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  const okNew = nw.filter(x => !x.includes('clash-big'));
  if (okNew.length) throw Error('new issues, not written:\n' + okNew.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
