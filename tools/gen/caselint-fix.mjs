// Relinks the real sense faults the case lint found: BlackBerry (phone) in fruit themes -> blackberry; Dot (name) in "tiny things" -> dot; ruby in "girls' names" -> Ruby.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const th = n => P.themes.find(t => t.name === n);
const show = (t, x) => console.log(t, JSON.stringify(P.entries.filter(e => e.text.toLowerCase() === t).map(e => [e.id, e.text, e.gloss, e.type, Object.keys(e.typ || {}).length])));
['blackberry', 'dot', 'ruby'].forEach(x => show(x));
const move = (from, to, tn) => {
  const t = th(tn); if (!t || !from || !to) { console.log('skip', tn); return; }
  if (to.typ[t.id]) { console.log('already', tn, to.text); } else { to.typ[t.id] = from.typ[t.id]; if (from.tm && from.tm[t.id]) { to.tm = to.tm || {}; to.tm[t.id] = from.tm[t.id]; } }
  delete from.typ[t.id]; if (from.tm) delete from.tm[t.id]; if (from.show) delete from.show[t.id];
  console.log('moved', from.text, '->', to.text, 'in', tn);
};
const f = (t, g) => P.entries.find(e => e.text === t && (!g || e.gloss === g));
const bb = f('BlackBerry', 'phone'), blk = P.entries.find(e => e.text === 'blackberry' && !e.aliasOf);
for (const n of ['berries', 'foraging finds', 'thorny plants']) move(bb, blk, n);
{ const t = th("girls' names"), old = P.entries.find(e => e.text === 'ruby' && e.typ && e.typ[t.id]);
  const id = Math.max(...P.entries.map(e => e.id)) + 1;
  P.entries.push({ id, text: 'Ruby', gloss: "girl's name", type: 'person', fam: old.fam, typ: { [t.id]: old.typ[t.id] }, status: 'gen' });
  delete old.typ[t.id]; if (old.show) delete old.show[t.id]; if (old.tm) delete old.tm[t.id]; console.log('new Ruby', id); }
if (process.argv.includes('--apply')) { reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('v' + P.lib.version); }
