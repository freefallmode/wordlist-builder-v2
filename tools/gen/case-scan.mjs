// Themes whose members mix capitalised and lowercase texts where a member has a case twin (another entry with the same letters, other case).
import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const byLow = new Map(); for (const e of p.entries) { const k = e.text.toLowerCase(); if (!byLow.has(k)) byLow.set(k, []); byLow.get(k).push(e); }
const isCap = s => /^\p{Lu}/u.test(s);
const out = [];
for (const t of p.themes) {
  if (t.group) continue;
  const m = p.entries.filter(e => e.typ && e.typ[t.id] != null && !e.aliasOf);
  const shownCap = e => isCap((e.show && e.show[t.id]) || e.text);
  const caps = m.filter(shownCap), lows = m.filter(e => !shownCap(e));
  if (!caps.length || !lows.length) continue;
  const twins = m.filter(e => (byLow.get(e.text.toLowerCase()) || []).some(x => x !== e && !x.aliasOf && x.text !== e.text));
  if (!twins.length) continue;
  out.push({ id: t.id, name: t.name, caps: caps.length, lows: lows.length, twins: twins.map(e => e.text), minority: Math.min(caps.length, lows.length) });
}
out.sort((a, b) => a.minority - b.minority);
fs.writeFileSync(new URL('./case-scan.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(out.length);
for (const o of out.filter(o => o.minority <= 3).slice(0, 60)) console.log(`${o.id} (${o.caps} cap / ${o.lows} low) twins: ${o.twins.slice(0, 5).join(', ')}`);
