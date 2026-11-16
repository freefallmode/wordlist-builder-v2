// Library batch v389 (2026-11-16, Simon approved): hoover [to vacuum] (23868), until now a UK regional alias of vacuum [to clean] (23859), becomes its own root:
//   aliasOf 0, aliasKind '', tm set, lowercase common verb (as google [search the web], batch383), region UK kept, linked only in "brand names used as words" (typ 1, as Hoover [vacuum cleaner]).
//   It keeps no theme through vacuum ("cleaning verbs" stays with vacuum: a second root there would only repeat its meaning). Hoover [vacuum cleaner] 4736 stays capital org+tm (rule 6).
// Every call and its evidence: tools/gen/batch389-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch389.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'region', 'aliasOf', 'aliasKind'];
const short = e => KEYS.filter(k => !(k === 'region' && !e.region?.length) && !(k === 'aliasOf' && !e.aliasOf) && !(k === 'aliasKind' && !e.aliasKind) && !(k === 'gloss' && !e.gloss) && !(k === 'tm' && !e.tm)).map(k => `${k}=${JSON.stringify(e[k])}`).join(' ')
  + ` links={${Object.entries(e.typ || {}).map(([k, v]) => k + ':' + v).join(',')}}${Object.keys(e.show || {}).length ? ' show=' + JSON.stringify(e.show) : ''}`;
let msgs = [];
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } msgs.push(m); return c; };
const before = count();
let n = 0; const log = [];

const h = E(23868), v = E(23859), B = 'brand_names_used_as_words';
if (h.text !== 'hoover' || v.text !== 'vacuum') throw Error('entries not as expected');
if (h.aliasOf === 0 && h.tm && B in h.typ) { /* done */ }
else {
  if (h.aliasOf !== 23859 || h.aliasKind !== 'regional' || Object.keys(h.typ).length || Object.keys(h.use || {}).length) throw Error('hoover not as expected: check by hand');
  if (P.entries.some(x => x.aliasOf === 23868 || Object.values(x.use || {}).includes(23868))) throw Error('something points at hoover: check by hand');
  if (P.entries.some(x => x !== h && x.text === 'hoover' && (x.gloss || '') === h.gloss)) throw Error('twin hoover exists');
  const was = short(h);
  Object.assign(h, { aliasOf: 0, aliasKind: '', tm: true, type: 'common', pos: 'verb', typ: { [B]: 1 }, show: {}, nameOkIn: [] });
  reindex(P); n++;
  log.push(`23868 before: ${was}\n23868 after:  ${short(h)}\n23859 unchanged: ${short(v)}\n  (own root, as google [search the web]: lowercase common verb, tm; region UK kept; only "brand names used as words" (typ 1, as Hoover 4736); vacuum keeps "cleaning verbs")`);
}
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const [b, a] = [msgs[0], msgs[1]]; const nw = [...a].filter(x => !b.has(x)), gone = [...b].filter(x => !a.has(x)); if (nw.length || gone.length) console.log(`new issues:\n  ${nw.join('\n  ') || 'none'}\ngone:\n  ${gone.join('\n  ') || 'none'}`); }
const body = log.join('\n') || '  none';
console.log(body);
console.log(`\n${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  fs.writeFileSync(new URL('batch389-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch389.mjs, ${P.lib.modified}): ${n} change (hoover [to vacuum] its own root).\nChecks: changed kinds ${diff.join(', ') || 'none'}\n\n${body}\n`);
  console.log('library v' + P.lib.version);
}
