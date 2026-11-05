// Builds "starts with ..." wordplay themes from agent files tools/gen/starts/<theme>.txt (format in BRIEF-starts-with.md).
// Per file: a combined theme "starts with <kind>" (the first word of each type) under letter play, and a sub-theme "starts with <type>" for each type with 4+ words.
// Run: node tools/gen/starts-apply.mjs [--only key,key] [--apply] [--report file]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, sortDepthFirst, uniqueThemeId } from '../../js/model.js';
import { validate, nameLeak, themeNameWords } from '../../js/validate.js';
const here = p => new URL(p, import.meta.url), arg = (k, d) => process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : d;
const ONLY = new Set(arg('--only', '').split(',').filter(Boolean)), LIB = here('../../data/wordlist-en.project.json'), REPORT = arg('--report', '');
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const POS = new Set(['noun', 'verb', 'adjective', 'adverb', 'other']), log = [], problems = [];
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
const entryFor = w => { let e = P.entries.find(x => !x.aliasOf && x.text.toLowerCase() === w.text && x.enabled && x.type !== 'proper'); if (!e) { e = addEntry(P, w.text, { pos: w.pos, type: 'common', rec: w.rec, status: 'gen' }); log.push('new ' + w.text); } return e; };
const mkTheme = (name, parent, note, rule) => { const t = { id: uniqueThemeId(P, slug(name)), name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: true, region: [], note, pop: 3, tkind: 'wordplay', rule }; P.themes.push(t); reindex(P); return t; };
const link = (t, w) => { const e = entryFor(w); e.th[t.id] = w.link; if (nameLeak(t, e, themeNameWords(t))) e.nameOkIn = [...new Set([...(e.nameOkIn || []), t.id])]; return e; };
const files = fs.readdirSync(here('./starts/')).filter(f => /\.txt$/.test(f) && !f.startsWith('cands-') && (!ONLY.size || ONLY.has(f.replace('.txt', ''))));
for (const f of files) {
  const types = []; let kind = '', note = '', cur = null;
  for (const raw of fs.readFileSync(here('./starts/' + f), 'utf8').split(/\r?\n/)) {
    const l = raw.trim(); if (!l || l.startsWith('#')) continue;
    let m;
    if ((m = /^THEME\s+(.+?)\s*\|\s*(.*)$/.exec(l))) { kind = m[1].replace(/^starts with\s+/i, ''); note = m[2]; }
    else if ((m = /^TYPE\s+(\S+)/.exec(l))) { cur = { type: m[1].toLowerCase(), words: [] }; types.push(cur); }
    else if ((m = /^W\s+(\S+)\s*\|\s*(\w+)\s*\|\s*(\d)\s*\|\s*(\d)$/.exec(l)) && cur) {
      const w = { text: m[1].toLowerCase(), pos: m[2], rec: +m[3], link: +m[4] };
      if (!POS.has(w.pos) || !w.text.startsWith(cur.type) || w.text.length < cur.type.length + 2 || w.text === cur.type) { problems.push(`${f}: rejected "${l}"`); continue; }
      if (cur.words.some(x => x.text.includes(w.text) || w.text.includes(x.text))) { problems.push(`${f}: "${w.text}" overlaps another word of ${cur.type}`); continue; }
      cur.words.push(w);
    } else problems.push(`${f}: cannot read "${l.slice(0, 70)}"`);
  }
  const usable = types.filter(t => t.words.length); if (!kind || !usable.length) { problems.push(`${f}: nothing to build`); continue; }
  const top = mkTheme('starts with ' + kind, 'letter_play', note, 'starts:' + kind.replace(/^an? /, ''));
  for (const t of usable) {
    link(top, t.words[0]);
    if (t.words.length >= 4) { const sub = mkTheme('starts with ' + t.type, top.id, `words that begin with "${t.type}" but have nothing to do with it: ${t.words.slice(0, 4).map(w => w.text).join(', ')}`, 'starts:' + t.type); for (const w of t.words) link(sub, w); }
  }
  reindex(P); log.push(`${f}: ${top.name}: ${usable.length} types, ${usable.filter(t => t.words.length >= 4).length} sub-themes`);
}
sortDepthFirst(P); reindex(P);
console.log(log.filter(x => /starts with/.test(x)).join('\n')); console.log('new entries:', log.filter(x => x.startsWith('new ')).length); console.log(problems.join('\n'));
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 8).map(i => i.msg));
if (REPORT) fs.writeFileSync(REPORT, [...log, '', '## Problems', ...problems].map(x => x.startsWith('#') || !x ? x : '- ' + x).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
