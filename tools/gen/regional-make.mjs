// Regional pairs that stand for each other (US word = root, the other word becomes a regional alias of it). Plan first, `--apply` to save.
// Run: node tools/gen/regional-make.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), APPLY = process.argv.includes('--apply');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// [root text, root gloss, other text, other gloss, extra themes in which the other word also leaves]
const PAIRS = [
  ['recess', 'playtime', 'break', 'mid-lesson pause'], ['cop car', '', 'panda car', ''], ['layover', '', 'stopover', ''], ['shot', 'vaccine', 'jab', 'vaccine'],
  ['tube', 'television', 'telly', ''], ['cell', 'wireless handset', 'mobile', 'phone', ['things_with_buttons']], ['cell phone', '', 'mobile phone', ''],
  ['panties', '', 'knickers', ''], ['range hood', '', 'extractor fan', 'range hood'], ['skeeter', '', 'mozzie', ''], ['mail carrier', '', 'postie', ''], ['butt', '', 'bottom', 'body part'],
];
const find = (t, g) => { const m = P.entries.filter(e => !e.aliasOf && e.text === t && (e.gloss || '') === g); if (m.length !== 1) throw Error(`${m.length} entries for ${t} [${g}]`); return m[0]; };
const log = [];
for (const [rt, rg, ot, og, more = []] of PAIRS) {
  const R = find(rt, rg), O = find(ot, og);
  const shared = Object.keys(O.typ).filter(k => R.typ[k] !== undefined || more.includes(k));
  const rest = Object.keys(O.typ).filter(k => !shared.includes(k));
  log.push(`${R.text} [${R.region}] <- ${O.text} [${O.region}] | leaves ${shared.join(', ') || '-'} | ${rest.length ? 'stays in ' + rest.join(', ') : 'nothing else'}`);
  if (!APPLY) continue;
  const N = { ...O, id: P.nextId++, gloss: O.gloss, aliasOf: R.id, aliasKind: 'regional', typ: {}, use: {}, show: {}, nameOkIn: [], status: 'gen' };
  for (const k of shared) { delete O.typ[k]; if (O.show) delete O.show[k]; }
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(x => x === O.id ? R.id : x))]).filter(g => g.length > 1);
  for (const a of P.entries) if (a.aliasOf === O.id) a.aliasOf = R.id;
  P.entries.push(N);
  // an entry with links to themes the root is not in (UK-words lists, compound sets, wordplay) keeps them as its own entry; both get a label so the two rows can be told apart
  if (!rest.length) P.entries.splice(P.entries.indexOf(O), 1);
  else { N.gloss = O.gloss || R.gloss || R.text; O.gloss = O.gloss === N.gloss || !O.gloss ? (O.region[0] || 'regional') + ' term' : O.gloss; if (O.gloss === N.gloss) O.gloss += ' (word)'; }
}
console.log(log.join('\n'));
if (APPLY) {
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => g.filter(id => P.ix.entry.get(id)?.typ[t.id] !== undefined)).filter(g => g.length > 1);   // a group member whose link moved away
  reindex(P);
  const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg) && !/rating-vs-zipf/.test(i.kind || i.msg)); console.log(bad.length, bad.slice(0, 8).map(i => i.msg).join('\n'));
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
}
