// Links the pop-1 words (pop1-new-words.mjs) that already exist as entries; prints the choice where an entry has several senses. Words with no entry are written to pop1-new-words2.mjs for apply-words.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { DATA } from './pop1-new-words.mjs';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const fresh = {}, log = [];
for (const [tid, rows] of Object.entries(DATA)) {
  for (const [text, rec, inRec, o] of rows) {
    const c = P.entries.filter(e => !e.aliasOf && e.text.toLowerCase() === text.toLowerCase() && e.th[tid] === undefined);
    if (!c.length) { if (P.entries.some(e => !e.aliasOf && e.text.toLowerCase() === text.toLowerCase() && e.th[tid] !== undefined)) continue; (fresh[tid] ||= []).push(o ? [text, rec, inRec, o] : [text, rec, inRec]); continue; }
    const score = e => Object.keys(e.th).filter(k => (P.ix.theme.get(k)?.pop || 9) <= 2).length * 10 - (e.rec || 5) - (e.type === 'proper' ? 20 : 0);
    const best = c.slice().sort((a, b) => score(b) - score(a))[0];
    if (o?.g) { const m = c.find(e => e.gloss === o.g); if (m) { m.th[tid] = inRec; continue; } }
    best.th[tid] = inRec;
    if (c.length > 1) log.push(`${tid}: ${text} -> [${best.gloss || ''}] of ${c.map(e => e.gloss || '-').join(' / ')}`);
  }
}
console.log(log.join('\n'));
fs.writeFileSync(new URL('./pop1-new-words2.mjs', import.meta.url), 'export const DATA = ' + JSON.stringify(fresh, null, 1).replace(/\n\s+/g, ' ') + ';\nexport const THEMES = {};\n');
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
console.log('fresh:', Object.values(fresh).flat().map(r => r[0]).join(', '));
