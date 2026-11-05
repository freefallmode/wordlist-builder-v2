// Finds US/UK spelling pairs: node tools/gen/spell-uk.mjs [--apply]
//  - a root with a US spelling (color, theater, analyze ...) and no UK spelling entry gets a `spelling` alias tagged UK;
//  - an existing untagged spelling alias that is the UK form of its root (or the US form of a UK root) gets its tag.
// Without --apply nothing is written; the report lists what would change.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
const APPLY = process.argv.includes('--apply');
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);

const OUR = /^(colo|hono|labo|humo|harbo|neighbo|flavo|favo|rumo|vapo|odo|parlo|armo|tumo|valo|vigo|splendo|clamo|rigo|savio|behavio|endeavo|glamo|demeano|rancor|ardo|fervo|succo|candor)r(s|ed|ing|ful|less|able|ably|ite|ites|ist|ists|ful|ize|ise)?$/;
const WORDS = {
  theater: 'theatre', theaters: 'theatres', center: 'centre', centers: 'centres', centered: 'centred', fiber: 'fibre', fibers: 'fibres', liter: 'litre', liters: 'litres',
  saber: 'sabre', sabers: 'sabres', caliber: 'calibre', luster: 'lustre', somber: 'sombre', specter: 'spectre', meager: 'meagre', scepter: 'sceptre',
  catalog: 'catalogue', catalogs: 'catalogues', dialog: 'dialogue', dialogs: 'dialogues', analog: 'analogue', monolog: 'monologue', prolog: 'prologue', epilog: 'epilogue',
  defense: 'defence', offense: 'offence', pretense: 'pretence', gray: 'grey', aluminum: 'aluminium', tire: 'tyre', tires: 'tyres', jewelry: 'jewellery', pajamas: 'pyjamas', pajama: 'pyjama',
  plow: 'plough', plows: 'ploughs', mold: 'mould', molds: 'moulds', molding: 'moulding', moldy: 'mouldy', skeptic: 'sceptic', skeptics: 'sceptics', skeptical: 'sceptical', cozy: 'cosy',
  donut: 'doughnut', donuts: 'doughnuts', mustache: 'moustache', mustaches: 'moustaches', sulfur: 'sulphur', yogurt: 'yoghurt', yogurts: 'yoghurts', aging: 'ageing', ax: 'axe', axes: 'axes',
  fetus: 'foetus', esophagus: 'oesophagus', anesthesia: 'anaesthesia', anesthetic: 'anaesthetic', maneuver: 'manoeuvre', maneuvers: 'manoeuvres', cesarean: 'caesarean',
  estrogen: 'oestrogen', diarrhea: 'diarrhoea', pediatric: 'paediatric', orthopedic: 'orthopaedic', hemorrhage: 'haemorrhage', leukemia: 'leukaemia', anemia: 'anaemia', edema: 'oedema',
  encyclopedia: 'encyclopaedia', paleontology: 'palaeontology', archeology: 'archaeology', fulfill: 'fulfil', enroll: 'enrol', skillful: 'skilful', installment: 'instalment', willful: 'wilful',
  traveler: 'traveller', travelers: 'travellers', traveling: 'travelling', canceled: 'cancelled', modeling: 'modelling', modeled: 'modelled', labeled: 'labelled', labeling: 'labelling',
  leveled: 'levelled', leveling: 'levelling', signaling: 'signalling', signaled: 'signalled', counselor: 'counsellor', counselors: 'counsellors', counseling: 'counselling',
  fueling: 'fuelling', fueled: 'fuelled', jeweler: 'jeweller', jewelers: 'jewellers', channeled: 'channelled', tunneling: 'tunnelling', shoveling: 'shovelling', curb: 'kerb', curbs: 'kerbs',
};
const NOT_IZE = /(size|sized|sizes|sizing|prize|prized|prizes|seize|seized|seizes|seizing|capsize|capsized|maize|bronze)$/;
function ukToken(w) {
  const lo = w.toLowerCase(); let out = null;
  if (WORDS[lo]) out = WORDS[lo];
  else if (OUR.test(lo)) out = lo.replace(/^(.*)(or)(s|ed|ing|ful|less|able|ably|ite|ites|ist|ists|ize|ise)?$/, (m, a, b, c) => a + 'our' + (c || ''));
  else if (!NOT_IZE.test(lo) && /(iz)(e|es|ed|ing|ation|ations|er|ers)$/.test(lo) && lo.length > 5) out = lo.replace(/iz(e|es|ed|ing|ation|ations|er|ers)$/, 'is$1');
  else if (/(yz)(e|es|ed|ing)$/.test(lo) && lo.length > 5) out = lo.replace(/yz(e|es|ed|ing)$/, 'ys$1');
  if (!out || out === lo) return w;
  return w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase() ? out[0].toUpperCase() + out.slice(1) : out;
}
const ukText = text => text.replace(/[A-Za-z]+/g, ukToken);

const fold = s => s.toLowerCase();
const byText = new Map(); for (const e of P.entries) { const k = fold(e.text); if (!byText.has(k)) byText.set(k, []); byText.get(k).push(e); }
const add = [], tag = [], skipped = [];
for (const e of P.entries) {
  if (e.aliasOf) continue;
  if (!['common', 'phrase'].includes(e.type)) continue;
  if (/thagomizer/i.test(e.text)) continue;   // a coined word, not a spelling pair
  const uk = ukText(e.text); if (uk === e.text) continue;
  const same = byText.get(fold(uk)) || [];
  const mine = same.find(x => x.aliasOf === e.id);
  if (mine) { if (!mine.region.length && mine.aliasKind === 'spelling') tag.push({ a: mine, region: 'UK', root: e }); continue; }
  if (same.length) { skipped.push(`${e.text} -> ${uk}: "${uk}" already exists (entry ${same[0].id}${same[0].aliasOf ? ' alias of ' + same[0].aliasOf : ''})`); continue; }
  add.push({ root: e, uk });
}
// existing untagged spelling aliases that are a dialect pair the other way round (the alias is the US form of a UK root)
for (const a of P.entries) {
  if (!a.aliasOf || a.aliasKind !== 'spelling' || a.region.length) continue;
  const r = P.ix.entry.get(a.aliasOf);
  if (!r || tag.some(t => t.a === a)) continue;
  if (ukText(r.text) === a.text) tag.push({ a, region: 'UK', root: r });
  else if (ukText(a.text) === r.text) tag.push({ a, region: 'US', root: r });
}
console.log(`${add.length} UK spellings to add, ${tag.length} existing aliases to tag, ${skipped.length} skipped`);
console.log('add:', add.slice(0, 60).map(x => `${x.root.text}->${x.uk}`).join(', '));
console.log('tag:', tag.slice(0, 40).map(x => `${x.a.text}(${x.region}) of ${x.root.text}`).join(', '));
if (skipped.length) console.log('skipped:\n  ' + skipped.slice(0, 30).join('\n  '));
if (APPLY) {
  for (const { root, uk } of add) {
    addEntry(P, uk, { aliasOf: root.id, aliasKind: 'spelling', region: ['UK'], pos: root.pos, type: root.type, gloss: root.gloss, fam: root.fam, enabled: root.enabled,
      adult: root.adult, sensitive: root.sensitive, tm: root.tm, vulgar: root.vulgar, status: 'gen',
      show: Object.fromEntries(Object.entries(root.show || {}).map(([t, x]) => [t, ukText(x)])), nameOkIn: [...(root.nameOkIn || [])] });   // the alias shows what its root shows in a theme, respelled
  }
  for (const { a, region } of tag) a.region = [region];
  reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  console.log('library v' + P.lib.version);
}
