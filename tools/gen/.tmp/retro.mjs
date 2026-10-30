import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, addEntry, deleteEntry, sameText } from '../../../js/model.js';
const pre = parseProject(fs.readFileSync(new URL('./pre.json', import.meta.url), 'utf8')); reindex(pre);
const LIB = new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const APPLY = process.argv[2] === '--apply';
let made = 0, skipped = [];
for (const n of [1, 2, 3]) {
  let tid;
  for (const l of fs.readFileSync(new URL(`./pilot-${n}.txt`, import.meta.url), 'utf8').split(/\r?\n/)) {
    let m;
    if ((m = /^T (\S+)/.exec(l))) { tid = m[1]; continue; }
    if (!(m = /^S (\d+) (.*)$/.exec(l))) continue;
    const rest = m[2], id = +m[1], old = pre.ix.entry.get(id); if (!old || P.ix.entry.get(id)) continue;   // still there (it had other themes)
    let target;
    if ((m = /^= (\d+)$/.exec(rest))) target = P.ix.entry.get(+m[1]);
    else { const [, text, gloss] = /^\| ([^|]+) \| ([^|]*) \|/.exec(rest) || []; if (text) target = sameText(P, text.trim()).find(x => !x.aliasOf && (x.gloss || '') === (gloss.trim() === '-' ? '' : gloss.trim()) && x.th[tid] !== undefined); }
    if (!target || target.aliasOf) { skipped.push(`${old.text} (${tid})`); continue; }
    if (sameText(P, old.text).some(x => x.aliasOf === target.id)) { skipped.push(`${old.text}: already an alias`); continue; }
    const tk = new Set(target.text.toLowerCase().split(/\W+/).filter(Boolean)), ek = new Set(old.text.toLowerCase().split(/\W+/).filter(Boolean));
    if (tid === 'pies_and_tarts') {   // pies keep their full names as roots: undo the replacement
      if (APPLY) { const r = addEntry(P, old.text, { gloss: old.gloss, pos: old.pos, type: old.type, rec: old.rec, adult: old.adult, vulgar: old.vulgar, sensitive: old.sensitive, tm: old.tm, region: [...old.region], status: 'gen' }); r.th[tid] = target.th[tid]; r.nameOkIn = [tid]; if (Object.keys(target.th).length === 1) deleteEntry(P, target); else delete target.th[tid]; reindex(P); }
      made++; continue;
    }
    if (APPLY) {
      const a = addEntry(P, old.text, { gloss: old.gloss, pos: old.pos, type: old.type, rec: old.rec, adult: old.adult, vulgar: old.vulgar, sensitive: old.sensitive, tm: old.tm, region: [...old.region], status: 'gen' });
      a.aliasOf = target.id; a.aliasKind = [...tk].every(w => ek.has(w)) ? 'form' : 'synonym'; a.nameOkIn = [tid]; reindex(P);
    }
    made++;
  }
}
console.log(made, 'aliases', APPLY ? 'made' : 'to make', '; skipped:', skipped.join('; '));
if (APPLY) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); }
