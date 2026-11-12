// Two stragglers found by the game session's recount: whale (sharks) -> whale shark, Weddell (seals and sea lions) -> Weddell seal.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const [sid, fid, tid] of [[63653, 8746, 'sharks'], [63059, 9704, 'seals_and_sea_lions']]) {
  const s = P.ix.entry.get(sid), f = P.ix.entry.get(fid);
  if (!s || !f || f.typ[tid] != null || P.entries.some(a => a.aliasOf === sid)) { console.log('skip', sid); continue; }
  f.typ[tid] = s.typ[tid]; f.show = Object.assign({}, f.show, { [tid]: s.text });
  for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(i => i === sid ? fid : i))]).filter(g => g.length > 1);
  if (Object.keys(s.typ).length === 1) deleteEntry(P, s); else delete s.typ[tid];
  console.log('done', s.text, '=>', f.text);
}
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length);
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
