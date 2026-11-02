// Applies theme renames: node tools/gen/rename-apply.mjs <file>... [--apply]   (without --apply: dry run)
//   K <theme id>
//   R <theme id> | <new name> # reason
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { themeNameWords, nameLeak } from '../../js/validate.js';
const args = process.argv.slice(2), APPLY = args.includes('--apply'), files = args.filter(a => !a.startsWith('--'));
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const bad = [], names = new Map(P.themes.map(t => [t.name.toLowerCase(), t.id])), moves = [];
let k = 0;
for (const f of files) for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
  const s = line.trim(); if (!s) continue;
  let m;
  if ((m = /^K (\S+)$/.exec(s))) { if (!P.ix.theme.get(m[1])) bad.push('no theme ' + m[1]); k++; continue; }
  if (!(m = /^R (\S+) \| ([^|#]+?)\s*(?:#.*)?$/.exec(s))) { bad.push('cannot read: ' + s.slice(0, 70)); continue; }
  const t = P.ix.theme.get(m[1]), name = m[2].trim();
  if (!t) { bad.push('no theme ' + m[1]); continue; }
  const other = names.get(name.toLowerCase()); if (other && other !== t.id) { bad.push(`"${name}" is already the name of ${other}`); continue; }
  const probe = { ...t, name, nameOk: false };
  const leaks = (P.ix.byTheme.get(t.id) || []).filter(e => nameLeak(probe, e.show?.[t.id] ? { ...e, text: e.show[t.id] } : e, themeNameWords(probe)) && !(e.nameOkIn || []).includes(t.id));
  if (leaks.length) bad.push(`"${name}" leaks into ${leaks.slice(0, 3).map(e => e.text).join(', ')}`);
  moves.push([t, name]); names.set(name.toLowerCase(), t.id);
}
for (const b of bad.slice(0, 40)) console.log('PROBLEM', b);
console.log(`${k} kept, ${moves.length} renamed${bad.length ? ', ' + bad.length + ' problems' : ''}`);
if (APPLY) { for (const [t, name] of moves) t.name = name; reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
