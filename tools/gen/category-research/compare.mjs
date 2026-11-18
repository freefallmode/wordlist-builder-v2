// Matches collected category names (TSV: source, name, level, url) against the library's theme names.
// Usage (repository root): node tools/gen/category-research/compare.mjs data/wordlist-en.project.json tools/gen/category-research/compared.tsv tools/gen/category-research/sources.tsv
// Output columns: key, games (how many sources use it), uses (rows), bwj_uses (Bubble Word Jam rows), example name, verdict, best theme(s), score, sources.
// Verdict: have = same name once filler words (types of, kinds of, plurals, colour/color) are ignored; close = most of its words are in one
// theme name (a narrower or wider theme: Bicycle ~ bicycle parts, Opera ~ opera words); missing = neither. It matches names only, so a
// "missing" can still be a theme under another name (Non-Flying Birds = flightless birds): read the list, don't trust it blindly.
import fs from 'node:fs';
const R = new URL('../../../', import.meta.url).pathname;
const { parseProject } = await import(R + 'js/store.js');
const [lib, out, ...ins] = process.argv.slice(2);
const P = parseProject(fs.readFileSync(lib, 'utf8'));

// STRICT drops only filler; LOOSE also drops words that change what a theme collects (things, names, words, famous ...).
const STRICT = new Set(['the', 'a', 'an', 'of', 'and', 'types', 'type', 'kinds', 'kind', 'list', 'different', 'some', 'various']);
const STOP = new Set([...STRICT, 'or', 'in', 'on', 'to', 'for', 'with', 'things', 'thing', 'words', 'word', 'famous', 'common', 'popular', 'names', 'name', 'your', 'you', 'at', 'from', 'by', 'that', 'are', 'can', 'be']);
const SPELL = { colour: 'color', colours: 'colors', favourite: 'favorite', jewellery: 'jewelry', grey: 'gray', theatre: 'theater', harbour: 'harbor', flavour: 'flavor' };
// Crude singular, applied the same way to both sides (keys are for matching, not display): movies/movie -> movy, heroes -> hero.
const sing = w => w.length <= 3 ? w : /ies$/.test(w) ? w.slice(0, -3) + 'y' : /ie$/.test(w) ? w.slice(0, -2) + 'y' : /(ses|xes|ches|shes|oes)$/.test(w) ? w.slice(0, -2) : /s$/.test(w) && !/(ss|us|is)$/.test(w) ? w.slice(0, -1) : w;
const toks = (s, stop = STOP) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9 _-]/g, ' ').split(/[\s-]+/).map(w => SPELL[w] || w).filter(w => w && !stop.has(w)).map(sing);
const key = s => toks(s).sort().join(' ');
const strictKey = s => toks(s, STRICT).sort().join(' ');

const themes = P.themes.filter(t => !t.group).map(t => ({ t, k: key(t.name), sk: strictKey(t.name), w: new Set(toks(t.name)) }));
const byStrict = new Map(themes.map(x => [x.sk, x]));

const cats = new Map();   // key -> { names: Set, sources: Set, uses }
for (const f of ins) for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
  const [src, name] = line.split('\t'); if (!src || !name || src === 'game' || src === 'source') continue;   // skip header rows
  const k = strictKey(name); if (!k) continue;
  if (!cats.has(k)) cats.set(k, { names: new Map(), sources: new Set(), uses: 0, perSrc: new Map() });
  const c = cats.get(k); c.sources.add(src.trim()); c.uses++; c.names.set(name.trim(), (c.names.get(name.trim()) || 0) + 1); c.perSrc.set(src.trim(), (c.perSrc.get(src.trim()) || 0) + 1);
}

const rows = [];
for (const [k, c] of cats) {
  const w = new Set(toks([...c.names.keys()][0]));
  let verdict = 'missing', best = [], score = 0;
  if (byStrict.has(k)) { verdict = 'have'; best = [byStrict.get(k).t.name]; score = 1; }
  else if (!w.size) { verdict = 'missing'; }
  else {
    // share of the collected name's words found in the theme name, lightly penalised for extra theme words
    const scored = themes.map(x => { const hit = [...w].filter(t => x.w.has(t)).length; return { x, s: hit / w.size - 0.1 * Math.max(0, x.w.size - hit) }; })
      .filter(o => o.s > 0.3).sort((a, b) => b.s - a.s).slice(0, 3);
    // exact key = have; most of the name's words in one theme name = close (a narrower or wider theme, e.g. Bicycle ~ bicycle parts)
    if (scored.length) { score = +scored[0].s.toFixed(2); best = scored.map(o => o.x.t.name); verdict = score >= 0.5 ? 'close' : 'missing'; }
  }
  const example = [...c.names.entries()].sort((a, b) => b[1] - a[1])[0][0];
  rows.push({ k, games: c.sources.size, uses: c.uses, bwj: c.perSrc.get('Bubble Word Jam') || 0, example, verdict, best: best.join(' | '), score, sources: [...c.sources].join(', ') });
}
rows.sort((a, b) => b.games - a.games || b.uses - a.uses || a.k.localeCompare(b.k));
fs.writeFileSync(out, 'key\tgames\tuses\tbwj_uses\texample\tverdict\tbest_theme\tscore\tsources\n' + rows.map(r => [r.k, r.games, r.uses, r.bwj, r.example, r.verdict, r.best, r.score, r.sources].join('\t')).join('\n') + '\n');
const n = v => rows.filter(r => r.verdict === v).length;
console.log(`${rows.length} distinct categories: have ${n('have')}, close ${n('close')}, missing ${n('missing')}`);
