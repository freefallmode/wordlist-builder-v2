// One-off (2026-11-06): short displays for five members kept whole by the plain/kinds passes. Run: node tools/gen/five-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const names = { 'owls': 'hoot owl', 'small wild cats': 'leopard cat', 'eagles': 'American eagle', 'knots': 'love knot', 'garden styles': 'stroll garden' };
const show = { 'hoot owl': 'hoot', 'leopard cat': 'leopard', 'American eagle': 'American', 'love knot': 'love', 'stroll garden': 'stroll' };
let n = 0;
for (const [tn, text] of Object.entries(names)) {
  const t = P.themes.find(t => t.name === tn && !t.group); if (!t) throw Error('no theme ' + tn);
  const e = (P.ix.byTheme.get(t.id) || []).find(e => e.text === text && !e.aliasOf); if (!e) throw Error('no entry ' + text);
  e.show = { ...e.show, [t.id]: show[text] }; n++;
}
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('set', n, 'issues', bad.length, bad.slice(0, 5).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
