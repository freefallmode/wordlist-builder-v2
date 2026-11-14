// Applies tools/gen/lone/r-<n>.txt (`<entryId> <themeId> L|K`): L lowercases the member where it is wrong.
//  - entry used only in this theme and not typed proper: the entry text is lowercased (same entry, same sense);
//  - otherwise a lowercase shown text is set for this theme (the entry keeps its capital elsewhere);
//  - a capital that comes from a shown text is lowercased in place.
// Run: node tools/gen/lone-apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url);
const LIB = here('../../data/wordlist-en.project.json');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const cand = JSON.parse(fs.readFileSync(here('./lone/candidates.json'), 'utf8'));
const by = new Map(cand.map(r => [r.e + '|' + r.t, r]));
const stat = { L: 0, K: 0, bad: 0, renamed: 0, shown: 0, inplace: 0, skipped: 0 }, log = [];
// agent L verdicts reversed after review: named periods/movements/genres, letter-shaped terms and other conventionally capitalised words
const KEEP = new Set(['Viking', 'Renaissance', 'Baroque', 'Gothic', 'K-pop', 'J-pop', 'Britpop', 'Madchester', 'Dixieland', 'Dada', 'MacGuffin', 'X-ray', 'T-bar', 'T-minus', 'T-square', 'T-bone', 'A-frame', 'U-boat', 'D-pad', 'C-clamp', "J'adoube", 'Kufic', 'Kalamkari', 'Pichwai', 'Pattachitra', 'Fernet', 'Scud', "Hold'em", 'Rah-rah', 'Festschrift', 'Brutalism']);
const dupKey = (text, gloss) => text + '|' + (gloss || '');
const seen = new Set(P.entries.filter(e => !e.aliasOf).map(e => dupKey(e.text, e.gloss)));
for (let i = 1; fs.existsSync(here(`./lone/r-${i}.txt`)); i++) for (const l of fs.readFileSync(here(`./lone/r-${i}.txt`), 'utf8').split(/\r?\n/)) {
  if (!l.trim()) continue;
  const m = /^(\d+)\s+(\S+)\s+([LK])\s*$/.exec(l.trim()), r = m && by.get(m[1] + '|' + m[2]);
  if (!r) { stat.bad++; console.log('bad ' + l); continue; }
  stat[m[3]]++; if (m[3] === 'K') continue;
  if (KEEP.has(r.shown)) { stat.L--; stat.K++; continue; }
  const e = P.ix.entry.get(r.e), low = r.shown.toLowerCase();
  if (!e) { stat.skipped++; continue; }
  if (e.show && e.show[r.t] && e.show[r.t] === r.shown) { e.show[r.t] = low; stat.inplace++; log.push(`${r.t}: ${e.text} shown ${r.shown} -> ${low}`); continue; }
  const aliases = P.entries.some(a => a.aliasOf === e.id);
  if (aliases && !(e.show && e.show[r.t])) { stat.skipped++; log.push(`${r.t}: ${e.text} skipped (has aliases; a case-only shown text would hide a UK/regional alias)`); continue; }
  if (Object.keys(e.typ).length === 1 && !e.type && !aliases && !seen.has(dupKey(e.text.toLowerCase(), e.gloss))) { seen.delete(dupKey(e.text, e.gloss)); e.text = e.text.toLowerCase(); seen.add(dupKey(e.text, e.gloss)); stat.renamed++; log.push(`${r.t}: entry ${r.shown} -> ${low}`); }
  else { e.show = Object.assign({}, e.show, { [r.t]: low }); stat.shown++; log.push(`${r.t}: ${e.text} shown ${low} (entry keeps its capital)`); }
}
console.log(stat);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 12).map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(here('./lone/log.txt'), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }
