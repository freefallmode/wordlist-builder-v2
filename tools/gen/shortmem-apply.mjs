// Applies bare-stub review (tools/gen/shortmem/r-<n>.txt: `<stubId> C|K|X`): for C, link the full term to the theme with
// the stub's typ and show = stub text, then delete the stub. Held cases (in synonym group, full term already linked, several full terms) are untouched.
// Run: node tools/gen/shortmem-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const cand = JSON.parse(fs.readFileSync(here('./shortmem/candidates.json'), 'utf8'));
const byStub = new Map(cand.convert.map(r => [r.stub, r]));
const stat = { C: 0, K: 0, X: 0, bad: 0, skipped: 0 }, keep = [], wrong = [];
for (let i = 1; fs.existsSync(here(`./shortmem/r-${i}.txt`)); i++) {
  for (const l of fs.readFileSync(here(`./shortmem/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
    if (!l.trim()) continue;
    const m = /^(\d+)\s+([CKX])\s*$/.exec(l.trim()), r = m && byStub.get(+m[1]);
    if (!r) { stat.bad++; console.log('bad line r-' + i + ': ' + l); continue; }
    stat[m[2]]++;
    if (m[2] === 'K') { keep.push(r.text + ' (' + r.theme + ')'); continue; }
    if (m[2] === 'X') { wrong.push(r.text + ' / ' + r.full[0].text + ' (' + r.theme + ')'); continue; }
    const stub = P.ix.entry.get(r.stub), full = P.ix.entry.get(r.full[0].id);
    if (!stub || !full || P.entries.some(a => a.aliasOf === stub.id) || Object.keys(stub.typ).length !== 1 || (full.typ[r.theme] != null)) { stat.skipped++; continue; }
    full.typ[r.theme] = stub.typ[r.theme];
    full.show = Object.assign({}, full.show, { [r.theme]: stub.text });
    deleteEntry(P, stub);
  }
}
// aliases of a converted full term need their own short display (an alias text can also carry the theme word)
for (const [aid, tid, sh] of [[9950, 'frogs_and_toads', 'gliding'], [66610, 'things_made_of_paper', 'kitchen']]) { const a = P.ix.entry.get(aid); if (a) a.show = Object.assign({}, a.show, { [tid]: sh }); }
console.log(stat);
fs.writeFileSync(here('./shortmem/keep.txt'), keep.join('\n') + '\n'); fs.writeFileSync(here('./shortmem/wrong.txt'), wrong.join('\n') + '\n');
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 8).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
