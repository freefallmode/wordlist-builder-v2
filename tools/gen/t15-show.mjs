// T15 helper (read-only): node tools/gen/t15-show.mjs word word ...  prints id | text | type | theme paths (short) | gloss | shown texts,
// for every lowercase single-word entry typed common with that text, plus any capitalised entry with the same letters (as a twin note).
import fs from 'node:fs';
const P = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const th = new Map(P.themes.map(t => [t.id, t]));
const path = id => { const a = []; for (let t = th.get(id); t; t = th.get(t.parent)) a.unshift(t.name); return a.slice(-2).join('>'); };
const want = new Set(process.argv.slice(2).map(w => w.toLowerCase()));
for (const e of P.entries) if (want.has(e.text.toLowerCase()))
  console.log(`${e.id} | ${e.text} | ${e.type || 'common'} | ${Object.keys(e.typ || {}).map(path).join('; ').slice(0, 140)} | ${(e.gloss || '').slice(0, 40)}${e.show ? ' | show ' + JSON.stringify(e.show).slice(0, 60) : ''}${e.tm ? ' | tm' : ''}`);
