// Turns reviewed pairs into regional aliases (alias-decisions.txt). Dry run unless --apply. Changes nothing but the library file.
// Run: node tools/gen/regalias/alias-apply.mjs [--apply] [decisions file]
// Rules: the alias keeps its own text, rating and flags; its theme links move to the root, except in locked themes (which must show the exact word),
// where it keeps them; it leaves any synonym group (a group of fewer than two members is dropped); its own aliases are re-pointed to the root.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex, themeLocked, deleteEntry, addEntry } from '../../../js/model.js';
import { validate, themeNameWords, nameLeak } from '../../../js/validate.js';
const here = p => new URL(p, import.meta.url), LIB = here('../../../data/wordlist-en.project.json');
const apply = process.argv.includes('--apply'), file = process.argv.slice(2).find(a => !a.startsWith('--')) || here('./alias-decisions.txt');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const before = new Set(validate(P).filter(i => i.sev !== 'info').map(i => i.kind + i.msg));
const lab = e => `#${e.id} ${e.text}${e.gloss ? ' [' + e.gloss + ']' : ''}`;
const tn = id => P.ix.theme.get(id)?.name || id;
const created = new Map(), log = [], problems = [], stat = { F: 0, created: 0, W: 0, L: 0, M: 0, R: 0, moved: 0, kept: 0, groupsLeft: 0, groupsDropped: 0, repointed: 0, shown: 0, dropped: 0 };
const leaveGroups = a => {
  for (const t of P.themes) {
    const gs = t.groups || [];
    for (const g of [...gs]) if (g.includes(a.id)) {
      g.splice(g.indexOf(a.id), 1); stat.groupsLeft++;
      const drop = g.length < 2; if (drop) { gs.splice(gs.indexOf(g), 1); stat.groupsDropped++; }
      log.push(`    left group in "${t.name}"${drop ? ' (group dropped)' : ''}`);
    }
  }
};
// Links of `a` go to the root, except in locked themes, where `holder` (the alias that stays) keeps them.
const moveLinks = (a, holder, root) => {
  for (const [tid, v] of Object.entries(a.typ)) {
    const t = P.ix.theme.get(tid);
    if (root.typ[tid] !== undefined && holder !== root) {   // both words are linked here: the family keeps the root's link only
      delete a.typ[tid]; if (a.show) delete a.show[tid]; stat.dropped++; log.push(`    drops its link in ${t && themeLocked(P, t) ? 'LOCKED ' : ''}"${tn(tid)}" (root is linked there)`); continue;
    }
    if (t && themeLocked(P, t)) {
      if (holder !== a) { holder.typ[tid] = holder.typ[tid] ?? v; delete a.typ[tid]; }
      stat.kept++; log.push(`    keeps link in locked "${tn(tid)}"`); continue;
    }
    if (root.typ[tid] === undefined) root.typ[tid] = v;
    delete a.typ[tid]; stat.moved++; log.push(`    link "${tn(tid)}" -> ${root.text}`);
  }
};
for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
  const s = raw.trim(); if (!s || s[0] === '#') continue;
  const [op, x, y, rg = '', rg2 = ''] = s.split(/\s+/), get = id => P.ix.entry.get(+id);
  if (op === 'R') {
    const e = get(x); if (!e) { problems.push('no entry ' + x); continue; }
    const was = e.region.join('/'); e.region = (y || '').split(',').filter(Boolean); stat.R++;
    log.push(`R ${lab(e)}: region ${was || '-'} -> ${e.region.join('/') || '-'}`); continue;
  }
  if (op === 'K') {   // K <entry id> <kind>: change an alias's kind (its region tags stay)
    const e = get(x); if (!e || !e.aliasOf) { problems.push('not an alias: ' + s); continue; }
    log.push(`K ${lab(e)} (${e.region.join('/') || '-'}): ${e.aliasKind} -> ${y}`); e.aliasKind = y; continue;
  }
  if (op === 'T') {   // T <id> <text> [| gloss]: rename an entry
    const m = /^T (\d+) (.*?)(?: \| (.*))?$/.exec(s), e = m && get(m[1]); if (!e) { problems.push('cannot read: ' + s); continue; }
    log.push(`T ${lab(e)} -> ${m[2]}${m[3] ? ' [' + m[3] + ']' : ''}`); e.text = m[2]; if (m[3] !== undefined) e.gloss = m[3]; continue;
  }
  if (op === 'X') {   // X <id> <theme id> <fam> <gloss>: another sense of the word, split off with its link in that theme
    const e = get(x), m = /^X \d+ (\S+) (\d) (.*)$/.exec(s); if (!e || !m || e.typ[m[1]] === undefined) { problems.push('cannot read: ' + s); continue; }
    const n = addEntry(P, e.text, { pos: e.pos, type: e.type, fam: +m[2], enabled: e.enabled, adult: e.adult, sensitive: e.sensitive, tm: e.tm, vulgar: e.vulgar, status: 'gen', gloss: m[3], typ: { [m[1]]: e.typ[m[1]] } });
    delete e.typ[m[1]]; stat.created++; log.push(`X new sense #${n.id} ${n.text} [${n.gloss}] fam${n.fam} takes the link in "${tn(m[1])}" from ${lab(e)}`); reindex(P); continue;
  }
  if (op === 'F') {   // F <alias id> <regions>: flip a regional alias with its root: the alias becomes the root and the old root becomes its regional alias with these regions
    const e = get(x), r = e && e.aliasOf && get(e.aliasOf); if (!r) { problems.push('not an alias: ' + s); continue; }
    log.push(`F ${lab(e)} becomes the root; ${lab(r)} becomes its regional alias (${y})`);
    for (const [t, p] of Object.entries(r.typ)) if (e.typ[t] === undefined) e.typ[t] = p;
    for (const a of P.entries) if (a.aliasOf === r.id && a !== e) { a.aliasOf = e.id; stat.repointed++; log.push(`    ${a.text} (${a.aliasKind}) now an alias of ${e.text}`); }
    for (const t of P.themes) for (const g of t.groups || []) if (g.includes(r.id)) { const i = g.indexOf(r.id); if (g.includes(e.id)) g.splice(i, 1); else g[i] = e.id; }
    e.use = Object.assign({}, r.use, e.use); e.show = Object.assign({}, r.show, e.show); e.nameOkIn = [...new Set([...(e.nameOkIn || []), ...(r.nameOkIn || [])])];
    r.typ = {}; r.use = {}; r.show = {}; r.nameOkIn = []; r.aliasOf = e.id; r.aliasKind = 'regional'; r.region = y.split(',');
    e.aliasOf = 0; e.aliasKind = ''; e.region = []; stat.F++; reindex(P); continue;
  }
  if (op === 'U') {   // U <entry id> <theme id>: remove a link
    const e = get(x); if (!e || e.typ[y] === undefined) { problems.push('no such link: ' + s); continue; }
    delete e.typ[y]; if (e.show) delete e.show[y]; log.push(`U ${lab(e)}: link in "${tn(y)}" removed`); continue;
  }
  let a = get(x), r = get(y), kind = op, regionArg = rg, aliasKind = 'regional';
  if (op === 'A') { kind = 'L'; aliasKind = rg; regionArg = rg2 === '-' ? '' : rg2; }   // A <alias id> <root id> <kind> <regions|->: an alias of any kind
  if (op === 'S') { kind = 'L'; aliasKind = 'synonym'; }   // S <alias id> <root id> =: a strict synonym alias (same answer everywhere); it keeps its region tag as information
  const copy = (e, over) => ({ pos: e.pos, type: e.type, fam: e.fam, enabled: e.enabled, adult: e.adult, sensitive: e.sensitive, tm: e.tm, vulgar: e.vulgar, status: 'gen', ...over });
  if (op === 'C') {   // C <id> <US|-> <text> [| gloss]: a new root entry for the equivalent; word <id> becomes its regional alias
    const m = /^C (\d+) (\S+) (.*?)(?: \| (.*))?$/.exec(s); a = m && get(m[1]);
    if (!a) { problems.push('cannot read: ' + s); continue; }
    r = (created.get(m[3].toLowerCase()));
    if (!r) {
      if (P.entries.some(e => e.text.toLowerCase() === m[3].toLowerCase() && e.enabled && !e.aliasOf && (e.gloss || '') === (m[4] || ''))) { problems.push(`"${m[3]}" already exists: ${s}`); continue; }
      r = addEntry(P, m[3], copy(a, { gloss: m[4] || '', region: m[2] === '-' ? [] : [m[2]] })); created.set(m[3].toLowerCase(), r); stat.created++;
      log.push(`C new root #${r.id} ${r.text}${r.gloss ? ' [' + r.gloss + ']' : ''} (${r.region.join('/') || '-'}) ${r.pos}/${r.type} fam${r.fam}`);
    }
    reindex(P); kind = 'L'; regionArg = '=';
  } else if (op === 'W') {   // W <id> <regions> <text>: a new regional alias of word <id>
    const m = /^W (\d+) (\S+) (.*?)(?: \| (.*))?$/.exec(s); a = m && get(m[1]);
    if (!a || a.aliasOf) { problems.push('cannot read: ' + s); continue; }
    if (P.entries.some(e => e.text.toLowerCase() === m[3].toLowerCase() && e.enabled && !e.aliasOf)) log.push(`    NOTE "${m[3]}" also exists as a root`);
    const n = addEntry(P, m[3], copy(a, { aliasOf: a.id, aliasKind: 'regional', region: m[2].split(','), gloss: m[4] ?? a.gloss }));
    stat.created++; stat.W++; log.push(`W new alias #${n.id} ${n.text}${n.gloss ? ' [' + n.gloss + ']' : ''} (${n.region.join('/')}) of ${lab(a)} fam${n.fam}`); reindex(P); continue;
  }
  if (!a || !r) { problems.push('missing entry in: ' + s); continue; }
  if (kind === 'L') {
    if (a.aliasOf || r.aliasOf || a.id === r.id) { problems.push(`not both roots: ${s}`); continue; }
    const dup = (P.ix.aliases.get(r.id) || []).find(o => o.text.toLowerCase() === a.text.toLowerCase());
    if (dup) { problems.push(`${lab(r)} already has an alias "${dup.text}" (#${dup.id}): use M for ${s}`); continue; }
    const regions = regionArg === '=' ? a.region.join(',') : regionArg;
    if (!regions && aliasKind === 'regional') { problems.push(`no region for ${s}`); continue; }
    log.push(`L ${lab(a)} (${a.region.join('/') || '-'}) -> ${aliasKind} alias of ${lab(r)}, region ${regions}`);
    for (const o of P.entries.filter(o => o.aliasOf === a.id)) { o.aliasOf = r.id; stat.repointed++; log.push(`    own alias ${lab(o)} (${o.aliasKind}) now an alias of ${r.text}`); }
    leaveGroups(a); a.aliasOf = r.id; a.aliasKind = aliasKind; a.region = regions.split(',').filter(Boolean); moveLinks(a, a, r);
    for (const k of ['use', 'show']) if (Object.keys(a[k] || {}).length) log.push(`    NOTE ${a.text} has ${k}: ${JSON.stringify(a[k])}`);
    stat.L++;
  } else if (op === 'M') {
    if (a.aliasOf || !r.aliasOf) { problems.push(`bad merge: ${s}`); continue; }
    const root = P.ix.entry.get(r.aliasOf);
    log.push(`M ${lab(a)} (fam ${a.fam}, ${a.region.join('/') || '-'}) merges into existing alias ${lab(r)} (fam ${r.fam}, ${r.region.join('/') || '-'}) of ${lab(root)}, then is deleted`);
    leaveGroups(a); if (P.entries.some(o => o.aliasOf === a.id)) problems.push(`${lab(a)} has aliases of its own`);
    moveLinks(a, r, root); deleteEntry(P, a); stat.M++;
  } else problems.push('cannot read: ' + s);
  reindex(P);
}
// A word that now sits in a theme whose name it repeats (school bus in bus types) shows without the repeated word (school), as the library does elsewhere.
for (let pass = 0; pass < 3; pass++) for (const i of validate(P)) {
  if (i.kind !== 'theme-name' || !i.entryId || before.has(i.kind + i.msg)) continue;
  const e = P.ix.entry.get(i.entryId), t = P.ix.theme.get(i.themeId); if (!e || !t || e.show?.[t.id]) continue;   // (the validator no longer flags an alias in a locked theme it does not link itself)
  const tw = themeNameWords(t), toks = e.text.split(/\s+/), keep = toks.filter(w => !themeNameWords({ name: w }).some(x => tw.includes(x)));
  if (!keep.length && nameLeak(t, { ...e, text: toks[toks.length - 1] }) === null) keep.push(toks[toks.length - 1]);   // only the thing the theme collects is left (fizzy drink -> drink)
  if (!keep.length || keep.length === toks.length) { problems.push(`cannot shorten "${e.text}" in "${t.name}"`); continue; }
  e.show = { ...e.show, [t.id]: keep.join(' ') }; stat.shown++; log.push(`S ${lab(e)} shows as "${keep.join(' ')}" in "${t.name}"`);
}
const after = validate(P).filter(i => i.sev !== 'info' && !before.has(i.kind + i.msg));
console.log(log.join('\n')); console.log('\nPROBLEMS', problems.length); problems.forEach(p => console.log(' ', p));
console.log('NEW WARNINGS/ERRORS', after.length); after.slice(0, 40).forEach(i => console.log(' ', i.sev, i.kind, i.msg));
console.log(stat);
if (apply && !problems.length && !after.some(i => i.sev === 'error')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('SAVED library v' + P.lib.version); }
else if (apply) console.log('NOT saved: fix the problems first');
