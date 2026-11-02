// The two clipped roots left by apply.mjs: `button` is merged into `button mushroom`; `open-faced` becomes the strict synonym alias `open-faced sandwich` of `open sandwich`.
// Run once: node tools/gen/syn2/loose-ends.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const LIB = new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => P.ix.entry.get(id);
const regroup = fn => { for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(fn).filter(Boolean))]).filter(g => g.length > 1); };
// button -> button mushroom
const btn = E(63415), full = E(17610);
if (btn.text !== 'button' || full.text !== 'button mushroom') throw Error('unexpected entries');
for (const [tid, r] of Object.entries(btn.th)) { full.th[tid] = Math.min(r, full.th[tid] ?? r); full.show = { ...full.show, [tid]: 'button' }; full.nameOkIn = [...new Set([...(full.nameOkIn || []), tid])]; }
for (const s of P.entries) if (s.aliasOf === btn.id) s.aliasOf = full.id;
regroup(id => id === btn.id ? full.id : id);
P.entries.splice(P.entries.indexOf(btn), 1);
// open-faced -> open-faced sandwich, a strict synonym of open sandwich
const of = E(65142), open = E(19034);
if (of.text !== 'open-faced' || open.text !== 'open sandwich') throw Error('unexpected entries');
Object.assign(of, { text: 'open-faced sandwich', gloss: '', aliasOf: open.id, aliasKind: 'synonym', th: {}, nameOkIn: ['sandwiches'] });
regroup(id => id === of.id ? 0 : id);
reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.map(i => i.msg).join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
