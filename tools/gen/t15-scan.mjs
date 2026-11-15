// T15 candidate scan (read-only): single-word entries stored lowercase and typed common that may be names for their sense.
// Signals: N = a capitalised entry with the same letters exists (place/person/proper twin); W = word is in PROPER_WORDS;
// T = a theme the entry is linked to is an origin category (breeds, cheeses, wines, dishes, sauces, fabrics, dances, clothes...).
// Run: node tools/gen/t15-scan.mjs [N|W|T|NT|...] [--all]   prints id | text | signals | themes | gloss, one short line each.
import fs from 'node:fs';
import { PROPER_WORDS } from '../../js/caselint-words.js';
const P = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const th = new Map(P.themes.map(t => [t.id, t]));
const path = id => { const a = []; for (let t = th.get(id); t; t = th.get(t.parent)) a.unshift(t.name); return a.join(' > '); };
const capTwin = new Map();
for (const e of P.entries) if (/^[A-Z]/.test(e.text) && !/\s/.test(e.text)) capTwin.set(e.text.toLowerCase(), (capTwin.get(e.text.toLowerCase()) || []).concat(e.type || 'common'));
const ORIGIN = /breed|cheese|wine|grape|dish|sauce|fabric|textile|cloth|dance|boot|shoe|hat|coat|jacket|garment|dress|cocktail|pastr|cake|bread|sausage|cattle|sheep|goat|pig|horse|dog|cat_|chicken|poultry|rabbit|pony|apple|pear|potato|lettuce|cabbage|bean|pepper|chili|tomato|rose|onion|beer|liqueur|spirit|brandy|whisk|rum|tea|coffee|soup|stew|pasta|salad|biscuit|cookie|dessert|pudding|ham|knot|stitch|lace|carpet|rug|porcelain|pottery|ceramic|furniture|chair|sofa|bed|car_|carriage|boat|cut|font|typeface|gun|rifle|pistol|knife|sword|game|card|mineral|gem|stone|marble|plant|flower|tree/;
const want = (process.argv[2] || 'NT').toUpperCase(), all = process.argv.includes('--all');
let n = 0; const out = [];
for (const e of P.entries) {
  const t = e.text; if (/[\s-]/.test(t) || t !== t.toLowerCase() || (e.type && e.type !== 'common')) continue;
  const tids = Object.keys(e.typ || {}); if (!tids.length) continue;
  const sig = (capTwin.has(t) ? 'N' : '') + (PROPER_WORDS.has(t) ? 'W' : '') + (tids.some(id => ORIGIN.test(id)) ? 'T' : '');
  if (![...want].every(c => sig.includes(c))) continue;
  n++; out.push(`${e.id} | ${t} | ${sig} ${capTwin.get(t) || ''} | ${tids.slice(0, 3).map(path).join('; ').slice(0, 110)} | ${(e.gloss || '').slice(0, 40)}`);
}
console.log(n + ' hits'); if (all) console.log(out.join('\n'));
