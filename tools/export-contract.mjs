// Export contract check: the rules of GAME-CONTRACT.md (what the Word Safari game reads from the export, and which values break it), checked
// on an export file. Each rule below names the GAME-CONTRACT.md table or section it comes from.
//   error: the game crashes or silently drops something (a theme, an alias, a link). Always fails.
//   warn:  play is skewed. Gated per kind against the "contract" section of tools/checks-baseline.json (a kind not listed counts as 0).
//
// Run: node tools/export-contract.mjs [export.json] [--baseline <file>] [--kind <k>] [--json]
//   export.json  default data/export/wordlist-game-family.json
//   --baseline   default tools/checks-baseline.json of this repository
//   --kind k     list every issue of one kind
// Exit 0: no errors and no warning kind over its baseline; 1 otherwise; 2 usage.
// Used by tools/gate.mjs (step h, on the freshly made export) and by npm run check -- <file> --export.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const KIND_NAMES = ['category', 'place', 'property', 'wordplay', 'compound'];   // Top level: kindNames, exactly these
export const TOP_KEYS = ['lib', 'regions', 'regionBits', 'kindNames', 'themeFields', 'themes', 'entries', 'linkFields', 'shown', 'shownUK', 'nameWordLinks', 'nameThemeLinks'];
export const THEME_COLUMNS = ['id', 'name', 'parent', 'flags', 'popularity', 'kind', 'rule', 'difficulty', 'breaks'];   // Themes table: the fields the game reads (a missing one throws)
export const ENTRY_COLUMNS = ['text', 'pos', 'type', 'flags', 'familiarity', 'regions', 'regionsHi', 'root', 'clash', 'linkCount', 'links', 'breaks', 'zipf'];   // Entries table
export const LINK_FIELDS = ['theme', 'difficulty', 'typicality', 'shown'];   // Links table: the full-JSON reader assumes stride 4 in this order
export const MAX_DEPTH = 40, NAME_MAX = 30, MIN_WORDS = 4;
const T_ADULT = 1, T_GROUP = 32;                                     // theme flags the game hard-codes (Themes: flags)
const E_DROP = 1 | 2 | 8, E_SPELLING = 16, E_REGIONAL = 64;          // entry flags: adult, sensitive, vulgar are dropped; spelling / regional pick the dialect text

// Themes: rule. The game's wordplay grammar lives in js/model.js (parseRule), shared with js/validate.js; see wordplayRuleIssues below.
import { parseRule } from '../js/model.js';
export { parseRule };

// ----- Themes: rule (wordplay rule grammar and the tested rules' data; batch v414, game g24) -----
// rule: a wordplay or compound theme whose rule is not in the game's grammar never plays: an error (`contract-rule-unknown`; it was a warning
// until v414). reversible: the game's test is "the reversed text is a different library word; palindromes don't count", so a member whose
// reverse is no word of the export (any row, root or alias) is a member the game would not accept (`contract-reversible-missing`, warning).
export function wordplayRuleIssues(X, { add, err, tName, cKind, cRule, ownerOf, shownRoot }) {
  const themes = X.themes, ent = X.entries, links = ent.links, shown = Array.isArray(X.shown) ? X.shown : [];
  const rev = new Set();
  for (let i = 0; i < themes.length; i++) {
    const r = themes[i]; if (!Array.isArray(r) || !(r[cKind] === 3 || r[cKind] === 4)) continue;
    const pr = parseRule(r[cRule]);
    if (pr.state === 'unknown' && r[cRule]) err('contract-rule-unknown', `the ${KIND_NAMES[r[cKind]]} rule "${r[cRule]}" is not in the game's grammar: the theme is silently never used`, tName(i));
    else if (pr.state !== 'ok') err('contract-rule', `the ${KIND_NAMES[r[cKind]]} rule ${JSON.stringify(r[cRule])} ${r[cRule] ? 'has a bad argument' : 'is empty'}: the theme is silently never used`, tName(i));
    else if (r[cRule] === 'reversible') rev.add(i);
  }
  if (!rev.size) return;
  const words = new Set(ent.text.map(t => String(t).toLowerCase()));
  for (let l = 0; l < ownerOf.length; l++) {
    const t = links[4 * l], i = ownerOf[l]; if (!rev.has(t) || !shownRoot[i]) continue;
    const sh = links[4 * l + 3], text = String(sh ? shown[sh - 1]?.[0] : ent.text[i]).toLowerCase(), back = [...text].reverse().join('');
    if (back === text || !words.has(back)) add('warn', 'contract-reversible-missing', `"${text}" reversed is "${back}", ${back === text ? 'the same word (a palindrome)' : 'which is no word of the export'}: the game's reversible test fails`, `link ${l} (entry ${i} ${ent.text[i]}) in ${tName(t)}`);
  }
}

const isInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
const isNum = (v, lo, hi) => typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi;

// Checks an export object. Returns issues { sev, kind, msg, at }; at is a short location ("theme 12 fruits", "entry 345 apple", "link 99").
export function checkContract(X) {
  const out = [], add = (sev, kind, msg, at = '') => out.push({ sev, kind, msg, at });
  const err = (kind, msg, at) => add('error', kind, msg, at);

  // ----- Top level -----
  if (!X || typeof X !== 'object') { err('contract-top', 'the export is not a JSON object'); return out; }
  for (const k of TOP_KEYS) if (X[k] === undefined) err('contract-top', `the top-level key "${k}" is missing`);
  if (!X.lib || typeof X.lib !== 'object' || !Number.isInteger(X.lib.version)) err('contract-top', 'lib must be an object with an integer version (a missing lib throws)');
  if (!Array.isArray(X.regions) || !X.regions.includes('UK') || !X.regions.includes('US')) err('contract-top', 'regions must contain "UK" and "US", or no variants appear');
  if (!isInt(X.regionBits, 1, 31)) err('contract-top', `regionBits is ${JSON.stringify(X.regionBits)}; it must be at most 31`);
  if (JSON.stringify(X.kindNames) !== JSON.stringify(KIND_NAMES)) err('contract-top', `kindNames must be exactly ${KIND_NAMES.join(', ')}`);
  const tf = Array.isArray(X.themeFields) ? X.themeFields : [], ent = X.entries && typeof X.entries === 'object' ? X.entries : {};
  for (const c of THEME_COLUMNS) if (!tf.includes(c)) err('contract-columns', `themeFields has no "${c}" column (the game throws)`);
  for (const c of ENTRY_COLUMNS) if (!Array.isArray(ent[c])) err('contract-columns', `entries has no "${c}" column`);
  if (JSON.stringify(X.linkFields) !== JSON.stringify(LINK_FIELDS)) err('contract-columns', `linkFields must be exactly ${LINK_FIELDS.join(', ')} (the full-JSON reader assumes this order)`);
  if (out.length) return out;   // the rest needs the structure

  const themes = Array.isArray(X.themes) ? X.themes : [], nT = themes.length, col = c => tf.indexOf(c);
  const [cId, cName, cParent, cFlags, cPop, cKind, cRule, cDiff, cBreaks] = THEME_COLUMNS.map(col);
  const n = ent.text.length, links = ent.links, nL = Math.floor(links.length / 4), shown = Array.isArray(X.shown) ? X.shown : [];
  for (const c of ENTRY_COLUMNS) if (c !== 'links' && ent[c].length !== n) err('contract-columns', `entries.${c} has ${ent[c].length} values for ${n} entries`);
  if (out.length) return out;

  // ----- Entries: linkCount (sum equals links/4), and which themes have links -----
  let sum = 0; for (let i = 0; i < n; i++) { const c = ent.linkCount[i]; if (!isInt(c, 0, 1e9)) err('contract-entry', `linkCount ${JSON.stringify(c)} is not a whole number`, `entry ${i}`); else sum += c; }
  if (links.length % 4 || sum !== links.length / 4) { err('contract-links', `the linkCount values add up to ${sum}, but links holds ${links.length / 4} links: every later entry's links would shift`); return out; }
  const linked = new Uint8Array(nT), ownerOf = new Int32Array(nL);
  for (let i = 0, l = 0; i < n; i++) for (let k = 0; k < ent.linkCount[i]; k++, l++) { ownerOf[l] = i; const t = links[4 * l]; if (isInt(t, 0, nT - 1)) linked[t] = 1; }
  for (let i = 0; i < n; i++) if (ent.root[i] && ent.linkCount[i] !== 0) err('contract-alias-links', `an alias row has linkCount ${ent.linkCount[i]}; aliases carry no links (the game never reads them)`, `entry ${i} ${ent.text[i]}`);

  // ----- Themes -----
  const ids = new Map(), tName = i => `theme ${i} ${themes[i]?.[cId]}`;
  for (let i = 0; i < nT; i++) {
    const r = themes[i];
    if (!Array.isArray(r) || r.length < tf.length) { err('contract-theme', `the row has ${Array.isArray(r) ? r.length : 'no'} values for ${tf.length} fields`, `theme ${i}`); continue; }
    const id = r[cId];
    if (typeof id !== 'string' || !id.trim()) err('contract-theme-id', 'the id is empty (wordplay @id rules find nothing)', tName(i));
    else { const k = id.toLowerCase(); if (ids.has(k)) err('contract-theme-id', `the id is also theme ${ids.get(k)}'s (rules match ids case-insensitively, first match)`, tName(i)); else ids.set(k, i); }
    if (typeof r[cName] !== 'string' || !r[cName].trim()) err('contract-theme-name', 'the name is empty (a blank name is shown)', tName(i));
    else if ([...r[cName]].length > NAME_MAX) err('contract-theme-name', `the name "${r[cName]}" has ${[...r[cName]].length} characters; at most ${NAME_MAX}`, tName(i));
    const p = r[cParent];
    if (!(p === -1 || isInt(p, 0, nT - 1)) || p === i) err('contract-parent', `parent ${JSON.stringify(p)} is not -1 or another theme's index (an index past the end crashes at load)`, tName(i));
    if (!isInt(r[cFlags], 0, 255)) err('contract-theme', `flags ${JSON.stringify(r[cFlags])} is not a theme bit mask`, tName(i));
    if (!isInt(r[cKind], 0, KIND_NAMES.length - 1)) err('contract-kind', `kind ${JSON.stringify(r[cKind])} is not an index into kindNames`, tName(i));
    const playable = !(r[cFlags] & (T_ADULT | T_GROUP)) && linked[i];   // Cross-field rules: playable = not a group, not adult (and it has words)
    if (playable) {
      if (!isInt(r[cPop], 1, 5)) err('contract-popularity', `popularity ${JSON.stringify(r[cPop])} on a playable theme; 1-5 (0: the theme never plays)`, tName(i));
      if (!isNum(r[cDiff], 1, 5)) err('contract-difficulty', `difficulty ${JSON.stringify(r[cDiff])} on a playable theme; 1.0-5.0`, tName(i));
    }
    // wordplay, compound: exact, and need a rule in the game's grammar (wordplayRuleIssues, after the links)
    breaksOk(r[cBreaks], r[cName], `theme name breaks`, tName(i));
  }
  // @id targets (after every id is known), parent cycles and depth
  for (let i = 0; i < nT; i++) {
    const r = themes[i]; if (!Array.isArray(r)) continue;
    if (r[cKind] === 3 || r[cKind] === 4) { const { ref } = parseRule(r[cRule]); if (ref && !ids.has(ref.toLowerCase())) err('contract-rule', `the rule "${r[cRule]}" names @${ref}, which is no theme's id`, tName(i)); }
    let d = 0, p = r[cParent];
    while (p !== -1 && isInt(p, 0, nT - 1) && d <= MAX_DEPTH + 1 && p !== i) { d++; p = themes[p]?.[cParent]; }
    if (p === i) err('contract-parent', 'the parent chain comes back to the theme itself (a cycle corrupts the ancestors)', tName(i));
    else if (d > MAX_DEPTH) err('contract-parent', `more than ${MAX_DEPTH} ancestors (the game reads at most ${MAX_DEPTH})`, tName(i));
  }

  // ----- Entries -----
  const eName = i => `entry ${i} ${ent.text[i]}`;
  function breaksOk(b, text, what, at) {   // Entries: breaks, integer offsets inside the word
    const len = typeof text === 'string' ? text.length : 0;
    if (!Array.isArray(b) || b.some(x => !isInt(x, 1, len - 1))) err('contract-breaks', `${what} ${JSON.stringify(b)} are not whole-number offsets inside "${text}"`, at);
  }
  const isRoot = new Uint8Array(n), shownRoot = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const text = ent.text[i];
    if (typeof text !== 'string' || !text.trim()) err('contract-text', 'the text is empty (a blank balloon)', `entry ${i}`);
    if (!isInt(ent.pos[i], 0, 4)) err('contract-pos', `pos ${JSON.stringify(ent.pos[i])}; 0-4`, eName(i));
    if (!isInt(ent.familiarity[i], 1, 5)) err('contract-familiarity', `familiarity ${JSON.stringify(ent.familiarity[i])}; 1-5 on every root and alias`, eName(i));
    const ro = ent.root[i];
    if (ro === 0) isRoot[i] = 1;
    else if (!isInt(ro, 1, n) || ro - 1 === i) err('contract-root', `root ${JSON.stringify(ro)} is not 0 or another entry's 1-based row (the alias is silently dropped)`, eName(i));
    else if (ent.root[ro - 1] !== 0) err('contract-root', `root ${ro} points at an alias, not a root (chains aren't followed: the alias is silently dropped)`, eName(i));
    if (!isInt(ent.clash[i], 0, 1e9)) err('contract-clash', `clash ${JSON.stringify(ent.clash[i])}; 0 or more`, eName(i));
    if (!isInt(ent.zipf[i], 0, 74)) err('contract-zipf', `zipf ${JSON.stringify(ent.zipf[i])}; 0-74 (zipf x10)`, eName(i));
    breaksOk(ent.breaks[i], text, 'breaks', eName(i));
  }
  // ----- Links -----
  for (let l = 0; l < nL; l++) {
    const [t, d, ty, sh] = links.slice(4 * l, 4 * l + 4), at = `link ${l} (${eName(ownerOf[l])})`;
    if (!isInt(t, 0, nT - 1)) { err('contract-link', `theme ${JSON.stringify(t)} is not a theme index`, at); continue; }
    if (!isNum(d, 1, 5)) err('contract-link', `difficulty ${JSON.stringify(d)}; 1.0-5.0`, at);
    if (!isInt(ty, 1, 5)) err('contract-link', `typicality ${JSON.stringify(ty)}; 1-5`, at);
    if (!isInt(sh, 0, shown.length)) err('contract-link', `shown ${JSON.stringify(sh)}; 0 to ${shown.length}`, at);
    const i = ownerOf[l], playable = !(themes[t][cFlags] & (T_ADULT | T_GROUP));
    if (isRoot[i] && playable && !(ent.flags[i] & E_DROP)) shownRoot[i] = 1;   // Cross-field rules: shown words
  }
  // ----- Top level: shown, shownUK, nameWordLinks, nameThemeLinks -----
  shown.forEach((s, k) => { if (!Array.isArray(s) || typeof s[0] !== 'string' || !s[0].trim()) err('contract-shown', `shown[${k}] has no text (a blank balloon)`, `shown ${k}`); else if (!isInt(s[1], 0, 4)) err('contract-shown', `shown[${k}] "${s[0]}" has pos ${JSON.stringify(s[1])}; 0-4`, `shown ${k}`); });
  (X.shownUK || []).forEach((p, k) => { if (!Array.isArray(p) || !isInt(p[0], 0, nL - 1) || !isInt(p[1], 1, shown.length)) err('contract-shown', `shownUK[${k}] ${JSON.stringify(p)} needs a link number and an index+1 into shown`, `shownUK ${k}`); });
  (X.nameWordLinks || []).forEach((l, k) => { if (!isInt(l, 0, nL - 1)) err('contract-shown', `nameWordLinks[${k}] ${JSON.stringify(l)} is not a link number`, `nameWordLinks ${k}`); });
  (X.nameThemeLinks || []).forEach((p, k) => { if (!Array.isArray(p) || !isInt(p[0], 0, nL - 1) || !isInt(p[1], 0, nT - 1)) err('contract-shown', `nameThemeLinks[${k}] ${JSON.stringify(p)} needs a link number and a theme index`, `nameThemeLinks ${k}`); });

  wordplayRuleIssues(X, { add, err, tName, cKind, cRule, ownerOf, shownRoot });   // Themes: rule

  // ----- Warnings: what skews play -----
  const ukI = X.regions.indexOf('UK'), usI = X.regions.indexOf('US'), bits = X.regionBits;
  const has = (i, r) => r < bits ? !!(ent.regions[i] & (1 << r)) : !!(ent.regionsHi[i] & (1 << (r - bits)));
  const dial = new Map();   // root row -> { uk: [], us: [] } display aliases
  for (let i = 0; i < n; i++) {
    if (isRoot[i]) { if (ent.regions[i] || ent.regionsHi[i]) add('warn', 'contract-root-region', 'a root with regions: the game never reads root regions, so the word shows to everyone (a regional word belongs on an alias)', eName(i)); continue; }
    if (ent.flags[i] & E_DROP || !isInt(ent.root[i], 1, n)) continue;
    const uk = has(i, ukI), us = has(i, usI), sp = ent.flags[i] & E_SPELLING, rg = ent.flags[i] & E_REGIONAL;
    if ((sp || rg) && uk && us) add('warn', 'contract-alias-dialect', 'an alias tagged both UK and US (the game makes it British only)', eName(i));
    const d = dial.get(ent.root[i] - 1) || { uk: [], us: [] }; dial.set(ent.root[i] - 1, d);
    if ((sp || rg) && uk) d.uk.push(ent.text[i]); if (sp && us) d.us.push(ent.text[i]);   // Entries: flags (16 or 64 with UK: British text; 16 with US: American text)
  }
  for (const [r, d] of dial) for (const k of ['uk', 'us']) if (d[k].length > 1) add('warn', 'contract-alias-dialect', `${d[k].length} ${k.toUpperCase()} display aliases (${d[k].join(', ')}): the first in row order wins`, eName(r));
  const seen = new Map();
  for (let i = 0; i < n; i++) if (shownRoot[i]) {
    const k = ent.text[i].toLowerCase();
    // Two senses of one text are normal (4,383 rows at v411); the lookup by text keeps the first, which changes a result only when the first
    // row is not common (type 0) and this one is: the everyday word is then never a split half. Only those are reported.
    if (!seen.has(k)) seen.set(k, i);
    else if (ent.type[seen.get(k)] !== 0 && ent.type[i] === 0 && /^[a-z]{3,}$/.test(k)) add('warn', 'contract-dup-root', `the same lower-case text as ${eName(seen.get(k))}, typed ${X.typeNames?.[ent.type[seen.get(k)]] ?? ent.type[seen.get(k)]}: lookup by text keeps that first row, so this common word never counts as an everyday split half`, eName(i));
    if (ent.type[i] !== 0 && /^[a-z]{3,}$/.test(ent.text[i])) add('warn', 'contract-type-common', `a lower-case single word typed ${X.typeNames?.[ent.type[i]] ?? ent.type[i]}: only type 0 (common) counts as an everyday split half`, eName(i));
  }
  const usable = new Map();   // Cross-field rules: theme size, counted on shown roots (the game's band, gap and shape filters can only lower it)
  for (let l = 0; l < nL; l++) { const i = ownerOf[l]; if (!shownRoot[i]) continue; const t = links[4 * l]; if (!usable.has(t)) usable.set(t, new Set()); usable.get(t).add(i); }
  for (let t = 0; t < nT; t++) if (linked[t] && !(themes[t][cFlags] & (T_ADULT | T_GROUP))) {
    const k = usable.get(t)?.size || 0;
    if (k < MIN_WORDS) add('warn', 'contract-thin', `${k} usable word${k === 1 ? '' : 's'} (shown roots: not adult, sensitive or vulgar); a theme needs at least ${MIN_WORDS}`, tName(t));
  }
  return out;
}

// Counts per kind against the baseline section: { errors, warn: [{ kind, n, max, status }], over, below, byKind: Map(kind -> issues) }.
export function contractSummary(issues, baseline = {}) {
  const byKind = new Map(); for (const i of issues) { if (!byKind.has(i.kind)) byKind.set(i.kind, []); byKind.get(i.kind).push(i); }
  const errors = issues.filter(i => i.sev === 'error'), cnt = {};
  for (const i of issues) if (i.sev === 'warn') cnt[i.kind] = (cnt[i.kind] || 0) + 1;
  const warn = [...new Set([...Object.keys(baseline), ...Object.keys(cnt)])].sort().map(kind => { const n = cnt[kind] || 0, max = baseline[kind] ?? 0; return { kind, n, max, status: n > max ? 'OVER' : n < max ? 'below' : 'OK' }; });
  return { errors, warn, over: warn.filter(w => w.status === 'OVER'), below: warn.filter(w => w.status === 'below'), byKind };
}

// Text report: counts per kind with up to `ex` examples each.
export function contractReport(sum, ex = 3) {
  const L = [], line = i => `${i.at ? i.at + ': ' : ''}${i.msg}`;
  const errKinds = [...sum.byKind].filter(([, l]) => l[0].sev === 'error');
  L.push(`errors: ${sum.errors.length}${errKinds.length ? ' (' + errKinds.map(([k, l]) => `${k} ${l.length}`).join(', ') + ')' : ''}`);
  for (const [k, l] of errKinds) for (const i of l.slice(0, ex)) L.push(`  [error] ${k}: ${line(i)}`);
  L.push('warnings (count / baseline): ' + (sum.warn.map(w => `${w.kind} ${w.n}/${w.max}${w.status === 'OVER' ? ' OVER' : w.status === 'below' ? ' (below: lower it)' : ''}`).join(', ') || 'none'));
  for (const w of sum.warn) for (const i of (sum.byKind.get(w.kind) || []).slice(0, ex)) L.push(`  [warn] ${w.kind}: ${line(i)}`);
  return L;
}

export const readContractBaseline = file => JSON.parse(fs.readFileSync(file, 'utf8')).contract || {};

// ---------- CLI ----------
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const HERE = fileURLToPath(new URL('..', import.meta.url)), argv = process.argv.slice(2);
  const usage = m => { console.error((m ? m + '\n' : '') + 'Usage: node tools/export-contract.mjs [export.json] [--baseline <file>] [--kind <k>] [--json]'); process.exit(2); };
  let file = null, base = path.join(HERE, 'tools/checks-baseline.json'), kind = null, json = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--baseline') { base = argv[++i]; if (!base) usage('--baseline needs a file'); }
    else if (a === '--kind') { kind = argv[++i]; if (!kind) usage('--kind needs a kind'); }
    else if (a === '--json') json = true;
    else if (a.startsWith('--')) usage('Unknown option ' + a);
    else if (file === null) file = a; else usage('One file only');
  }
  file = path.resolve(file || path.join(HERE, 'data/export/wordlist-game-family.json'));
  let X; try { X = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { usage(`Cannot read ${file}: ${e.message}`); }
  const issues = checkContract(X), sum = contractSummary(issues, readContractBaseline(base)), ok = !sum.errors.length && !sum.over.length;
  if (json) console.log(JSON.stringify({ file, version: X?.lib?.version, ok, errors: sum.errors.length, warnings: sum.warn, issues: kind ? issues.filter(i => i.kind === kind) : issues.slice(0, 200) }, null, 1));
  else {
    console.log(`export contract (GAME-CONTRACT.md): ${file}, lib v${X?.lib?.version}`);
    if (kind) for (const i of issues.filter(i => i.kind === kind)) console.log(`  [${i.sev}] ${i.at ? i.at + ': ' : ''}${i.msg}`);
    else for (const l of contractReport(sum)) console.log('  ' + l);
    console.log(ok ? 'export contract: OK' : `export contract: FAIL (${[sum.errors.length && sum.errors.length + ' errors', sum.over.length && 'over baseline: ' + sum.over.map(w => w.kind).join(', ')].filter(Boolean).join('; ')})`);
  }
  process.exit(ok ? 0 : 1);
}
