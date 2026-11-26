// Compare our game export (Word Safari family export) with Bubble Word Jam's 1,800 levels.
// Usage: node compare.mjs <export.json> <levels.json> <out.json>
import fs from 'fs';
const [exportPath, levelsPath, outPath] = process.argv.slice(2);
const ex = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
const levels = JSON.parse(fs.readFileSync(levelsPath, 'utf8'));
const norm = s => s.toLowerCase().replace(/[’']/g, "'").split(/\s+/).filter(Boolean).join(' ');
const stem = w => w.replace(/ies$/, 'y').replace(/(ches|shes|sses|xes)$/, m => m.slice(0, -2)).replace(/([^s])s$/, '$1');
const stats = xs => {
  const s = [...xs].sort((a, b) => a - b), n = s.length, mid = n >> 1;
  return { n, min: s[0], max: s[n - 1], mean: +(s.reduce((a, b) => a + b, 0) / n).toFixed(2),
           median: n % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2 };
};
const pct = (a, b) => +(100 * a / b).toFixed(1);
const out = {};

// ---- our library (export) ----
const TF = ex.themeFields, ti = k => TF.indexOf(k);
const th = ex.themes;
const isGroup = t => t[ti('flags')] & 32, isAdult = t => t[ti('flags')] & 1;
const playable = th.map(t => !isGroup(t) && !isAdult(t) && t[ti('popularity')] >= 1);
const E = ex.entries, N = E.text.length;
const offs = []; let o = 0;
for (let i = 0; i < N; i++) { offs.push(o); o += E.linkCount[i]; }
const members = th.map(() => new Set());
const themesPerWord = [];
const rootWords = new Set(), allWords = new Set();
let roots = 0, aliases = 0, multi = 0, lenSum = 0, split = 0;
for (let i = 0; i < N; i++) {
  allWords.add(norm(E.text[i]));
  if (E.flags[i] & 9) continue;
  if (E.root[i] !== 0) { aliases++; continue; }
  roots++;
  const w = norm(E.text[i]);
  rootWords.add(w);
  if (w.includes(' ')) multi++;
  lenSum += w.replace(/[^a-z]/g, '').length;
  if (E.breaks[i] && E.breaks[i].length) split++;
  const ts = new Set();
  for (let k = 0; k < E.linkCount[i]; k++) {
    const t = E.links[(offs[i] + k) * 4];
    if (playable[t]) { members[t].add(i); ts.add(t); }
  }
  if (ts.size) themesPerWord.push(ts.size);
}
const sizes = th.map((t, i) => playable[i] ? members[i].size : null).filter(x => x !== null);
const depth = i => { let d = 0; for (let p = th[i][ti('parent')]; p >= 0; p = th[p][ti('parent')]) d++; return d; };
const playIdx = th.map((t, i) => i).filter(i => playable[i]);
const hasPlayableParent = playIdx.filter(i => { const p = th[i][ti('parent')]; return p >= 0 && playable[p]; }).length;
const sizeHist = {};
for (const s of sizes) { const b = s < 4 ? '<4' : s <= 4 ? '4' : s <= 8 ? '5-8' : s <= 15 ? '9-15' : s <= 30 ? '16-30' : s <= 60 ? '31-60' : '61+'; sizeHist[b] = (sizeHist[b] || 0) + 1; }
const kinds = {};
for (const i of playIdx) { const k = ex.kindNames[th[i][ti('kind')]]; kinds[k] = (kinds[k] || 0) + 1; }
const diff = playIdx.map(i => th[i][ti('difficulty')]).filter(d => d > 0);
const biggest = playIdx.map(i => [th[i][ti('name')], members[i].size]).sort((a, b) => b[1] - a[1]).slice(0, 8);
out.lib = {
  version: ex.lib.version, themesAll: th.length, groups: th.filter(isGroup).length, playable: playIdx.length,
  playableWith4: sizes.filter(s => s >= 4).length, wordsPerTheme: stats(sizes), wordsPerTheme4: stats(sizes.filter(s => s >= 4)),
  sizeHist, biggest, roots, aliases, wordsLinked: themesPerWord.length, themesPerWord: stats(themesPerWord),
  multiWordPct: pct(multi, roots), meanLetters: +(lenSum / roots).toFixed(2), splitPct: pct(split, roots),
  subThemesPct: pct(hasPlayableParent, playIdx.length), maxDepth: Math.max(...playIdx.map(depth)),
  kinds, difficulty: stats(diff),
};

// ---- Bubble Word Jam ----
const pools = new Map(), wordThemes = new Map();
let slots = 0, withParent = 0, bMulti = 0, bLen = 0, bSplit = 0;
const bWords = new Map();
for (const lv of levels) for (const t of lv.themes) {
  slots++; if (t.parent) withParent++;
  const k = norm(t.theme);
  if (!pools.has(k)) pools.set(k, new Set());
  for (const x of t.words) {
    const w = norm(x.word);
    pools.get(k).add(w);
    if (!wordThemes.has(w)) wordThemes.set(w, new Set());
    wordThemes.get(w).add(k);
    if (!bWords.has(w)) bWords.set(w, !!x.split);
    else if (x.split) bWords.set(w, true);
  }
}
for (const [w, s] of bWords) { if (w.includes(' ')) bMulti++; bLen += w.replace(/[^a-z]/g, '').length; if (s) bSplit++; }
const bSizes = [...pools.values()].map(s => s.size);
out.bwj = {
  levels: levels.length, slots, themes: pools.size, wordsPerTheme: stats(bSizes), words: bWords.size,
  themesPerWord: stats([...wordThemes.values()].map(s => s.size)), multiWordPct: pct(bMulti, bWords.size),
  meanLetters: +(bLen / bWords.size).toFixed(2), splitPct: pct(bSplit, bWords.size),
  subThemeSlotsPct: pct(withParent, slots),
};

// ---- overlap ----
const libThemeNames = new Map();
for (const i of playIdx) libThemeNames.set(stem(norm(th[i][ti('name')])), i);
const libWordsStem = new Set([...allWords].map(stem));
const inLib = [...bWords.keys()].filter(w => allWords.has(w) || libWordsStem.has(stem(w)));
const themeHits = [...pools.keys()].filter(k => libThemeNames.has(stem(k)));
// for matching themes, how much of BWJ's set is in our theme
let cover = [], bigger = 0;
for (const k of themeHits) {
  const i = libThemeNames.get(stem(k));
  const ours = new Set([...members[i]].map(j => stem(norm(E.text[j]))));
  const theirs = [...pools.get(k)];
  cover.push(theirs.filter(w => ours.has(stem(w))).length / theirs.length);
  if (ours.size >= theirs.length) bigger++;
}
out.overlap = {
  bwjWordsInLib: inLib.length, bwjWordsInLibPct: pct(inLib.length, bWords.size),
  bwjThemesNameMatch: themeHits.length, bwjThemesNameMatchPct: pct(themeHits.length, pools.size),
  matchedThemeCoverMean: +(100 * cover.reduce((a, b) => a + b, 0) / cover.length).toFixed(1),
  matchedThemesOursBigger: pct(bigger, themeHits.length),
  missingWordsSample: [...bWords.keys()].filter(w => !inLib.includes(w)).slice(0, 30),
};
fs.writeFileSync(outPath, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
