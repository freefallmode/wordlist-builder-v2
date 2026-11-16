// Library batch v377 (2026-11-16, approved by Simon): the trademark flag (tm) on the seven brand names that batch v376 capitalised and left without one.
//   Only `tm` is set; text and type are not touched. Each word has exactly one entry; an entry that already has tm, or a different text, stops the script.
// Changes nothing when already right, so it can be rerun as a check. Writes tools/gen/batch377-changes.txt. Run: node tools/gen/batch377.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const TM = [[17934, 'Jarlsberg'], [53098, 'Cambozola'], [53102, 'Dolcelatte'], [53867, 'Cointreau'], [53508, 'Amarula'], [24707, 'Akubra'], [18157, 'Biscoff']];
const count = () => { const c = {}; for (const i of validate(P)) if (i.sev !== 'info') c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; return c; };
const before = count();
const log = [];
let n = 0;
for (const [id, text] of TM) {
  const same = P.entries.filter(x => x.text.toLowerCase() === text.toLowerCase()); if (same.length !== 1) throw Error(`"${text}" has ${same.length} entries`);
  const e = P.ix.entry.get(id); if (!e || e !== same[0]) throw Error(`no entry ${id} for "${text}"`);
  if (e.text !== text) throw Error(`entry ${id} is "${e.text}", expected "${text}"`);
  if (e.tm) continue;
  log.push(`${id} "${e.text}"  type ${e.type}  tm -> true${e.gloss ? '  [' + e.gloss + ']' : ''}`);
  e.tm = true; n++;
}
reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
console.log(log.join('\n'));
console.log(`${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  fs.writeFileSync(new URL('batch377-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch377.mjs, ${P.lib.modified}): ${n} entries changed (tm flag only; text and type unchanged).\n\n${log.join('\n')}\n`);
  console.log('library v' + P.lib.version);
}
