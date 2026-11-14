// Odd-case members: in a theme, a member whose capitalisation differs from nearly all others (<=2 odd, <10%), where that member has a case twin elsewhere.
import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const byLow = new Map(); for (const e of p.entries) { const k = e.text.toLowerCase(); if (!byLow.has(k)) byLow.set(k, []); byLow.get(k).push(e); }
const isCap = s => /^\p{Lu}/u.test(s);
const rows = [];
for (const t of p.themes) {
  if (t.group) continue;
  const m = p.entries.filter(e => e.typ && e.typ[t.id] != null && !e.aliasOf && !(e.show && e.show[t.id]));
  const caps = m.filter(e => isCap(e.text)), lows = m.filter(e => !isCap(e.text));
  const [odd, kind] = caps.length <= lows.length ? [caps, 'capitalised among lowercase'] : [lows, 'lowercase among capitalised'];
  if (!odd.length || odd.length > 2 || odd.length / m.length >= 0.1 || m.length < 8) continue;
  const o2 = odd.filter(e => (byLow.get(e.text.toLowerCase()) || []).some(x => x !== e && !x.aliasOf && x.text !== e.text));
  if (o2.length) rows.push({ id: t.id, name: t.name, kind, odd: o2.map(e => e.text), twin: o2.map(e => byLow.get(e.text.toLowerCase()).filter(x => x !== e && x.text !== e.text).map(x => x.text)[0]) });
}
fs.writeFileSync(new URL('./case-scan2.json', import.meta.url), JSON.stringify(rows, null, 1));
console.log(rows.length);
for (const r of rows) console.log(`${r.id}: ${r.odd.join(', ')} (${r.kind}) twin ${r.twin.join(', ')}`);
