// Bare capitalised stubs left in themes (game manager's level review): Gum, Moon, plus Vidalia, Savannah, Plush found by a follow-up scan.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
for (const [sid, fid, shown] of [[64791, 1642, 'gum'], [64802, 7953, 'moon'], [62539, 17566, 'Vidalia'], [63727, 9323, 'Savannah']]) {
  const s = P.ix.entry.get(sid), f = P.ix.entry.get(fid);
  if (!s || !f || P.entries.some(a => a.aliasOf === sid)) throw Error('bad ' + sid);
  for (const [t, v] of Object.entries(s.typ)) { if (f.typ[t] == null) { f.typ[t] = v; f.show = Object.assign({}, f.show, { [t]: shown }); } else if (!(f.show && f.show[t])) f.show = Object.assign({}, f.show, { [t]: shown }); const th = P.ix.theme.get(t); if (th.groups) th.groups = th.groups.map(g => [...new Set(g.map(i => i === sid ? fid : i))]).filter(g => g.length > 1); }
  console.log(s.text, '=>', f.text, Object.keys(s.typ).join(', ')); deleteEntry(P, s);
}
P.ix.entry.get(64800).text = 'plush';   // root of the soft toy / cuddly toy aliases: only the case changes
reindex(P);
console.log(validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)).length);
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
