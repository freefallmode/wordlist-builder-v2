// Gap fixes: (a) case-split entries: if most of their links are shown lowercase, the entry is a common word: lowercase it everywhere;
// the rest are allowed per link. (b) common words in themes of names: relinked to a person entry (created if missing).
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { caseLint } from '../../js/caselint.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const issues = caseLint(P), ent = new Map(P.entries.map(e => [e.id, e])), th = new Map(P.themes.map(t => [t.id, t]));
const startsCap = s => /^\p{Lu}/u.test(s), log = [];
let nextId = Math.max(...P.entries.map(e => e.id)) + 1;
for (const id of new Set(issues.filter(i => i.kind === 'case-split').map(i => i.entryId))) {
  const e = ent.get(id); if (e.type === 'title') continue; const ts = Object.keys(e.typ);
  const low = ts.filter(t => e.show && e.show[t] && !startsCap(e.show[t])).length;
  if (low * 2 >= ts.length || low > ts.length - low) {
    const lc = e.text.toLowerCase();
    if (P.entries.some(x => x !== e && x.text === lc && (x.gloss || '') === (e.gloss || ''))) { log.push('dup ' + e.text); continue; }
    e.text = lc; e.type = 'common'; for (const k of Object.keys(e.show || {})) if (e.show[k].toLowerCase() === lc) delete e.show[k];
    if (e.show && !Object.keys(e.show).length) delete e.show; log.push('common ' + lc);
  }
}
for (const i of issues.filter(i => i.kind === 'common-in-names')) {
  const e = ent.get(i.entryId), t = th.get(i.themeId); if (['high street', 'mountain ash'].includes(e.text)) continue;
  const cap = e.text[0].toUpperCase() + e.text.slice(1);
  if (e.gloss === 'name' && Object.keys(e.typ).length === 1) { e.text = cap; e.type = 'person'; log.push('retyped ' + cap); continue; }
  let n = P.entries.find(x => x.text === cap && x.type === 'person' && !x.aliasOf);
  if (!n) { n = { id: nextId++, text: cap, gloss: 'name', type: 'person', fam: e.fam, typ: {}, status: 'gen' }; P.entries.push(n); }
  n.typ[t.id] = e.typ[t.id]; delete e.typ[t.id]; if (e.show) delete e.show[t.id]; if (e.tm) delete e.tm[t.id];
  log.push(`name ${cap} in ${t.name}`);
}
console.log(log.join('\n'));
if (process.argv.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version); }
