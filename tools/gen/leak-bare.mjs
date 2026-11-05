// Lists the entries the review dropped (D) that still leak, with the bare form (theme words cut out) and the existing entries of that text.
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, sameText, linkIds } from '../../js/model.js';
import { nameLeak, themeNameWords } from '../../js/validate.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const dir = new URL('./leak/', import.meta.url);
const FILLER = new Set(['of','the','a','an','de','du','la','le','and','in','on']);
const stem = w => w.length > 4 && /ies$/.test(w) ? w.slice(0, -3) + 'y' : w.length > 4 && /(ches|shes|sses|xes)$/.test(w) ? w.slice(0, -2) : w.length > 3 && /[^s]s$/.test(w) ? w.slice(0, -1) : w;
const out = []; let cur = null, n = 0;
for (const f of fs.readdirSync(dir).filter(f => /^r-\d+\.txt$/.test(f))) for (const line of fs.readFileSync(new URL(f, dir), 'utf8').split(/\r?\n/)) {
  const s = line.trim(); let m;
  if ((m = /^T (\S+)( OK)?$/.exec(s))) cur = m[2] ? null : P.ix.theme.get(m[1]);
  else if (cur && (m = /^D (\d+)$/.exec(s))) {
    const e = P.ix.entry.get(+m[1]); if (!e || e.aliasOf || !linkIds(P, e).includes(cur.id) || !nameLeak(cur, e)) continue;
    const ws = themeNameWords(cur), toks = e.text.split(/\s+/).filter(w => !ws.includes(stem(w.toLowerCase().normalize('NFKD').replace(/[^a-z]/g, ''))));
    while (toks.length && FILLER.has(toks[0].toLowerCase())) toks.shift(); while (toks.length && FILLER.has(toks.at(-1).toLowerCase())) toks.pop();
    const bare = toks.join(' '); if (!bare) continue;
    const same = sameText(P, bare).filter(x => !x.aliasOf);
    out.push({ tid: cur.id, e, bare, same }); n++;
  }
}
const lab = x => `${x.id}${x.gloss ? ' (' + x.gloss + ')' : ''} ${x.pos || ''} r${x.fam} in ${Object.keys(x.typ).length}${x.typ[cur?.id] !== undefined ? '' : ''}`;
for (const o of out) console.log(`${o.tid}\t${o.e.id} ${o.e.text}\t=> "${o.bare}"\t${o.same.length ? o.same.map(x => lab(x) + (x.typ[o.tid] !== undefined ? ' INTHEME' : '')).join('; ') : 'none exist'}`);
console.error(n, 'dropped roots;', out.filter(o => o.same.length).length, 'with an existing bare entry;', out.filter(o => !o.same.length).length, 'none');
