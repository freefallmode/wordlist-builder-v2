// Applies popularity results to the library.
// Run: node tools/gen/pop-apply.mjs <result file>...   [--lib file]
// A result file is plain text: a line `T <themeId> <pop>` starts a theme (pop 1-5 is the theme's own popularity), then one line `<entryId> <pop>` per word of that theme.
// A word listed under a theme gets th[theme] = pop (roots and synonyms; spelling and form aliases never have their own). Themes done are recorded in tools/gen/pop/done.json.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const args = process.argv.slice(2), li = args.indexOf('--lib');
const LIB = li >= 0 ? args.splice(li, 2)[1] : new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const doneFile = li >= 0 ? LIB + '.done.json' : new URL('./pop/done.json', import.meta.url);   // a scratch library keeps its own list
const done = new Set(fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, 'utf8')) : []);
let themes = 0, links = 0, missing = 0; const problems = [];
for (const f of args) {
  let tid = null, tpop = 0, rated = new Set();
  const close = () => {
    if (!tid) return;
    const t = P.ix.theme.get(tid);
    const need = (P.ix.byTheme.get(tid) || []).filter(e => e.enabled && (!e.aliasOf || e.aliasKind === 'synonym'));
    const gone = need.filter(e => !rated.has(e.id));
    if (gone.length) { missing += gone.length; problems.push(`${f}: ${tid} has ${gone.length} words without a rating (${gone.slice(0, 4).map(e => e.text).join(', ')}...)`); }
    if (!gone.length) done.add(tid);
    themes++;
  };
  for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const s = line.trim(); if (!s) continue;
    let m;
    if ((m = /^T (\S+) ([1-5])$/.exec(s))) {
      close(); tid = m[1]; rated = new Set();
      const t = P.ix.theme.get(tid); if (!t || t.group) { problems.push(`${f}: no playable theme ${tid}`); tid = null; continue; }
      t.pop = +m[2];
    } else if ((m = /^(\d+) ([1-5])$/.exec(s))) {
      if (!tid) continue;
      const e = P.ix.entry.get(+m[1]);
      if (!e || !linkIds(P, e).includes(tid)) { problems.push(`${f}: entry ${m[1]} is not in ${tid}`); continue; }
      if (e.aliasOf && e.aliasKind !== 'synonym') continue;
      e.th[tid] = +m[2]; rated.add(e.id); links++;
    } else problems.push(`${f}: cannot read "${s.slice(0, 50)}"`);
  }
  close();
}
for (const p of problems.slice(0, 40)) console.log('PROBLEM', p);
if (problems.length > 40) console.log('... and', problems.length - 40, 'more problems');
reindex(P); stampSave(P);
fs.writeFileSync(LIB, serializeProject(P));
fs.writeFileSync(doneFile, JSON.stringify([...done].sort()));
console.log(`${themes} themes, ${links} words rated, ${missing} words still unrated -> library v${P.lib.version}; ${done.size} themes done`);
