// Read-only: trademark/organisation/proper entries linked to themes where the other members are mostly common lowercase words.
import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const cap = s => /^\p{Lu}/u.test(s);
const out = [];
for (const t of p.themes) {
  if (t.group || t.tkind === 'wordplay' || t.tkind === 'compound') continue;
  const m = p.entries.filter(e => e.typ && e.typ[t.id] != null && !e.aliasOf);
  if (m.length < 8) continue;
  const lows = m.filter(e => !cap(e.text)).length;
  if (lows / m.length < 0.8) continue;
  for (const e of m) if ((e.type === 'org' || e.tm) && cap((e.show && e.show[t.id]) || e.text)) out.push({ theme: t.id, id: e.id, text: e.text, type: e.type || '', tm: !!e.tm, gloss: e.gloss || '', themes: Object.keys(e.typ).length });
}
fs.writeFileSync(new URL('./org-scan.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(out.length); for (const o of out) console.log(`${o.theme}: ${o.text} #${o.id} ${o.type}${o.tm ? ' tm' : ''} ${o.gloss ? '"' + o.gloss + '"' : ''} (${o.themes} themes)`);
