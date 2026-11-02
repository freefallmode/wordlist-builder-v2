// Applies tools/gen/syn2/decisions.txt to the library as left by synonym-migrate.mjs (v251). Needs tools/gen/.tmp/pre-syn.json (git show e9e55f6:data/wordlist-en.project.json).
// Run once: node tools/gen/syn2/apply.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../../js/store.js';
import { reindex } from '../../../js/model.js';
import { validate } from '../../../js/validate.js';
const LIB = new URL('../../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const O = JSON.parse(fs.readFileSync(new URL('../.tmp/pre-syn.json', import.meta.url), 'utf8')), rootOf = new Map(O.entries.map(e => [e.id, e.aliasOf]));
const L = fs.readFileSync(new URL('./decisions.txt', import.meta.url), 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#')).map(l => l.split('|').map(x => x.trim()));
const E = id => P.ix.entry.get(id);
const state = a => a.aliasOf ? 'alias:' + a.aliasKind : (a.show && Object.keys(a.show).length ? 'SHOWN' : P.entries.some(x => x.aliasOf === a.id && x.aliasKind === 'abbreviation') ? 'ABBR' : 'ENTRY');
const regroup = (fn) => { for (const t of P.themes) if (t.groups) t.groups = t.groups.map(g => [...new Set(g.map(fn).filter(Boolean))]).filter(g => g.length > 1); };
const stat = {}; const bump = k => stat[k] = (stat[k] || 0) + 1; const problems = [];
const toAlias = (a, r, kind, region) => {   // a is an entry of its own; it becomes an alias of r
  a.aliasOf = r.id; a.aliasKind = kind; a.th = {}; delete a.show; a.region = region ? [region] : [];
  regroup(id => id === a.id ? 0 : id);
};
const toRoot = (a, r, kind, region) => {    // a takes over r's links; r becomes its alias
  a.th = { ...r.th, ...a.th };
  if (r.show) a.show = { ...r.show, ...a.show };
  r.th = {}; delete r.show;
  for (const s of P.entries) if (s.aliasOf === r.id && s !== a) s.aliasOf = a.id;
  r.aliasOf = a.id; r.aliasKind = kind; r.nameOkIn = []; if (region) r.region = [region];
  regroup(id => id === r.id ? a.id : id);
};
const toEntry = (a, r) => {                // a is an alias of r; it becomes an entry of its own with a synonym group per theme
  a.aliasOf = 0; a.aliasKind = ''; a.th = { ...r.th };
  for (const tid in a.th) { const t = P.ix.theme.get(tid); t.groups = t.groups || []; const g = t.groups.find(g => g.includes(r.id)); if (g) g.push(a.id); else t.groups.push([r.id, a.id]); }
};
for (const [ids, dec, dir, region] of L) {
  const a = E(+ids); if (!a) { problems.push(ids + ' missing'); continue; }
  if (dec === 'DROP') { if (a) problems.push(ids + ' DROP: already dropped expected'); continue; }
  const r = E(rootOf.get(+ids)), st = state(a);
  if (dec === 'SHOWN' || dec === 'ABBR') { if (st === (dec === 'SHOWN' ? 'SHOWN' : 'ABBR')) continue; }
  if (dec === 'ENTRY' && st === 'ENTRY') continue;
  if (dec === 'REG' && dir === 'K' && st === 'alias:regional') continue;
  if (!r) { problems.push(ids + ' ' + a.text + ': root gone (' + dec + ', ' + st + ')'); continue; }
  if (dec === 'SYN') { if (st === 'ENTRY' || st === 'alias:regional') { if (st === 'alias:regional') { a.aliasKind = 'synonym'; a.region = []; } else toAlias(a, r, 'synonym'); bump('SYN'); } else problems.push(ids + ' ' + a.text + ': SYN from ' + st); }
  else if (dec === 'ENTRY') { if (st === 'alias:regional') { toEntry(a, r); bump('ENTRY'); } else problems.push(ids + ' ' + a.text + ': ENTRY from ' + st); }
  else if (dec === 'ABBR' || dec === 'TRANS' || dec === 'REG') {
    const kind = { ABBR: 'abbreviation', TRANS: 'translation', REG: 'regional' }[dec];
    if (st === 'ENTRY' || st === 'SHOWN') {
      if (dec === 'REG' && dir === 'K') { toAlias(a, r, 'regional', region); bump('REG'); }
      else { toRoot(a, r, kind, dec === 'REG' ? region : ''); bump(dec); }
    } else problems.push(ids + ' ' + a.text + ': ' + dec + ' from ' + st);
  } else if (dec === 'SHOWN') problems.push(ids + ' ' + a.text + ': SHOWN from ' + st);
}
reindex(P);
console.log(stat); console.log(problems.join('\n') || 'no problems');
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 20).map(i => i.msg).join('\n'));
const k = {}; for (const e of P.entries) if (e.aliasOf) k[e.aliasKind] = (k[e.aliasKind] || 0) + 1; console.log(k);
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
