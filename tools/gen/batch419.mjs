// Library batch v419 (approved by Simon 2026-11-20, "Yes, sensitive"). Issue I31, after v418 (drinks sensitive only): the drink themes
// still carried the theme adult flag, so they never played. Simon: they are sensitive, not adult. The adult flag is cleared on the 9 themes
// he was shown (cocktails, wines, beers, spirits, liqueurs, national spirits, wine regions, wine words, Oktoberfest) and on red wines and
// white wines, which sit under wines with their own adult flag. Each is (or inherits) sensitive; Oktoberfest gets the flag itself.
// The game (g25) holds sensitive themes to its sensitive start level (31). No entry changes.
// Every entry this batch changes gets status "rev". Changes nothing when already done (rerun as a check).
// Run: node tools/gen/batch419.mjs [--apply | --out <path>] [--lib <path>] [--changes <path>] [--review <path>]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
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
let n = 0;
const L = [];
const TH = new Map(P.themes.map(t => [t.id, t]));
const effSens = t => { for (let x = t; x; x = TH.get(x.parent)) if (x.sensitive) return true; return false; };
const IDS = ['cocktails', 'wines', 'red_wines', 'white_wines', 'wine_words', 'beers', 'spirits', 'liqueurs', 'national_spirits', 'wine_regions', 'oktoberfest'];
for (const id of IDS) {
  const t = TH.get(id); if (!t) throw Error('no theme ' + id);
  if (id === 'oktoberfest' && !t.sensitive) { t.sensitive = true; n++; L.push(`${id} "${t.name}": sensitive flag set (a beer festival)`); }
  if (!t.adult) continue;
  t.adult = false; n++; L.push(`${id} "${t.name}": adult flag cleared${t.sensitive ? ' (sensitive)' : ' (sensitive through its parent)'}`);
}
for (const id of IDS) if (!effSens(TH.get(id))) throw Error(id + ' is not sensitive');
reindex(P);   // effective theme flags are cached in the index
let revSet = 0, touched = 0;
for (const e of P.entries) { const s = snap.get(e.id); if (s === JSON.stringify({ ...e, status: undefined })) continue; touched++; if (e.status !== 'rev') { e.status = 'rev'; revSet++; } }
const [after, mAfter] = count(), f1 = build(), k1 = contract(f1);
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const ck = [...new Set([...Object.keys(k0), ...Object.keys(k1)])].sort();
const same = (p, q) => JSON.stringify(p) === JSON.stringify(q);
const summary = ['Issue I31 (Simon: "Yes, sensitive"): the drink themes lose the theme adult flag and are sensitive (held to the sensitive start level by game g25).', ...L.map(x => '  ' + x),
  `library changes ${n}; entries changed ${touched}; status set to rev ${revSet}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`,
  `Export contract (family export, zipf): ${ck.filter(k => k0[k] !== k1[k]).map(k => `${k} ${k0[k] || 0} -> ${k1[k] || 0}`).join(', ') || 'no change'}`,
  `Export shape: themes ${f0.themes.length} -> ${f1.themes.length}, entries ${f0.entries.text.length} -> ${f1.entries.text.length}; entry texts ${same(f0.entries.text, f1.entries.text) ? 'unchanged' : 'CHANGED'}; link counts ${same(f0.entries.linkCount, f1.entries.linkCount) ? 'unchanged' : 'CHANGED'}; theme flags change; themes and rows are added (left out as adult)`];
console.log(`${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length}\n\n${n} library changes`);
const reviewText = summary.join('\n') + `\nnew issues: ${nw.join(' | ') || 'none'}\n`;
if (CHANGES) fs.writeFileSync(CHANGES, reviewText);
fs.writeFileSync(REVIEW || new URL('./batch419-review.txt', import.meta.url), reviewText);
if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written:\n' + nw.join('\n'));
  if (n) { stampSave(P); fs.writeFileSync(OUT || arg('--lib') || LIB, serializeProject(P)); console.log('written ' + (OUT || arg('--lib') || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
}
