// Capitalised single-word members (entry text or shown text) in themes where >=80% of the members are lowercase.
import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const cap = s => /^\p{Lu}/u.test(s);
const T = new Map(p.themes.map(t => [t.id, t]));
const rows = [];
for (const t of p.themes) {
  if (t.group || ['wordplay', 'compound'].includes(t.tkind) || /^names_that/.test(t.id)) continue;
  const m = p.entries.filter(e => e.typ && e.typ[t.id] != null && !e.aliasOf);
  if (m.length < 8) continue;
  const shownOf = e => (e.show && e.show[t.id]) || e.text;
  if (m.filter(e => !cap(shownOf(e))).length / m.length < 0.8) continue;
  for (const e of m) { const s = shownOf(e); if (cap(s) && !/\s/.test(s) && !/^\p{Lu}{2,}s?$/u.test(s) && !e.tm && e.type !== 'org') rows.push({ e: e.id, t: t.id, text: e.text, shown: s, gloss: e.gloss || '', type: e.type || '', n: Object.keys(e.typ).length, theme: t.name }); }
}
fs.mkdirSync(new URL('./lone/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('./lone/candidates.json', import.meta.url), JSON.stringify(rows));
const N = 8, per = Math.ceil(rows.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(new URL(`./lone/list-${i + 1}.txt`, import.meta.url), rows.slice(i * per, (i + 1) * per).map(r => `${r.e}\t${r.t}\t${r.theme}\t${r.shown}\t${r.text !== r.shown ? 'entry: ' + r.text : ''}\t${r.gloss}\t${r.type}`).join('\n') + '\n');
console.log(rows.length);
