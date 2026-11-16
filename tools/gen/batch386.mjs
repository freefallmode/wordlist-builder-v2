// Library batch v386 (2026-11-16): amended rule 8 (Simon, 2026-11-16: an accent pair's root keeps the diacritics when at least one major English dictionary prints them, regional ones included;
//   plain only when all print it plain; the plain form is always a spelling alias). Re-checks the four plain/accented calls of v385 on dictionary pages read this session.
//   SWAP: root and spelling alias change roles (both ids kept): links, ratings, shown texts, `use`, name allowances, synonym groups and other aliases move to the new root;
//      word-level fields (gloss, fam, type, pos, region, tm, adult, sensitive, vulgar) swap with the role, so each role keeps what it had. A shown text equal to the new root's text is dropped.
//   doner -> döner (Cambridge prints "döner kebab"), droewors -> droëwors (Dictionary of South African English prints droëwors), agogô -> agogo (no English dictionary prints agogô). raki stays.
// Evidence per word: tools/gen/batch386-changes.txt. Changes nothing when already done, so it can be rerun as a check. Run: node tools/gen/batch386.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
import { validate, nameLeak } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error(`no entry ${id}`); return e; };
const KEYS = ['text', 'gloss', 'type', 'pos', 'fam', 'tm', 'region', 'aliasOf', 'aliasKind'];
const short = e => KEYS.filter(k => !(k === 'region' && !e.region?.length) && !(k === 'aliasOf' && !e.aliasOf) && !(k === 'aliasKind' && !e.aliasKind) && !(k === 'gloss' && !e.gloss) && !(k === 'tm' && !e.tm)).map(k => `${k}=${JSON.stringify(e[k])}`).join(' ')
  + ` links={${Object.entries(e.typ || {}).map(([k, v]) => k + ':' + v).join(',')}}${Object.keys(e.show || {}).length ? ' show=' + JSON.stringify(e.show) : ''}${e.nameOkIn?.length ? ' nameOkIn=' + e.nameOkIn : ''}`;
let msgs = new Set();
const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) if (i.sev !== 'info') { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; m.add(`${i.sev} ${i.kind}: ${i.msg}`); } msgs = [msgs, m]; return c; };
const before = count();
const swapInGroups = (from, to) => { const r = []; for (const t of P.themes) if (t.groups?.some(g => g.includes(from))) { r.push(t.id); t.groups = t.groups.map(g => g.includes(from) ? [...new Set(g.map(x => x === from ? to : x))] : g).filter(g => g.length > 1); } return r; };
const WORD = ['gloss', 'fam', 'type', 'pos', 'region', 'tm', 'adult', 'sensitive', 'vulgar'];
const log = [];
let n = 0;

// Root `rid` becomes a spelling alias of its spelling alias `aid`, which becomes the root.
function swap(rid, aid, why) {
  const r = E(rid), a = E(aid);
  if (!a.aliasOf && r.aliasOf === aid && r.aliasKind === 'spelling') return null;   // done on an earlier run
  if (r.aliasOf || a.aliasOf !== rid || a.aliasKind !== 'spelling') throw Error(`swap ${rid}/${aid}: not a root and its spelling alias`);
  if (Object.keys(a.typ).length || Object.keys(a.use || {}).length || Object.keys(a.show || {}).length || a.nameOkIn?.length) throw Error(`swap ${rid}/${aid}: the alias holds theme data, check by hand`);
  if (Object.values(r.use || {}).includes(aid)) throw Error(`swap ${rid}/${aid}: a theme uses the alias as a form`);
  if (P.entries.some(x => x.aliasOf === aid)) throw Error(`swap ${rid}/${aid}: the alias has aliases`);
  const wasR = short(r), wasA = short(a);
  for (const k of WORD) [r[k], a[k]] = [a[k], r[k]];
  const dropped = Object.entries(r.show || {}).filter(([, s]) => s === a.text).map(([t]) => t);
  a.typ = r.typ; a.show = Object.fromEntries(Object.entries(r.show || {}).filter(([, s]) => s !== a.text)); a.use = r.use || {}; a.nameOkIn = [...(r.nameOkIn || [])];
  r.typ = {}; r.show = {}; r.use = {}; r.nameOkIn = [];
  const gs = swapInGroups(rid, aid);
  const others = P.entries.filter(x => x.aliasOf === rid && x !== a); for (const x of others) x.aliasOf = aid;
  a.aliasOf = 0; a.aliasKind = ''; r.aliasOf = aid; r.aliasKind = 'spelling';
  reindex(P);
  for (const tid of Object.keys(a.typ)) { const t = P.ix.theme.get(tid); if (t && !nameLeak(t, a.show?.[tid] ? { ...a, text: a.show[tid] } : a) && nameLeak(t, r)) r.nameOkIn.push(tid); }
  n++;
  return `${rid} before: ${wasR}\n${aid} before: ${wasA}\n${aid} after:  ${short(a)}\n${rid} after:  ${short(r)}\n  roles swapped: links, ratings, shown texts, use, name allowances move to ${aid}${dropped.length ? '; shown text dropped (now the root\'s own text): ' + dropped.join(', ') : ''}${gs.length ? '; groups: ' + gs.join(', ') : ''}${others.length ? '; aliases re-parented: ' + others.map(x => x.id).join(', ') : ''}\n  (${why})`;
}
const push = s => { if (s) log.push(s); };

push(swap(29440, 26966, 'döner: amended rule 8: Cambridge English Dictionary prints the headword "döner kebab"; the root takes the diacritic, doner stays its spelling alias; "Turkish everyday words" no longer needs a shown text, "words from Turkish" (locked, Turkish) now shows döner'));
push(swap(17804, 53496, 'droëwors: amended rule 8: the Dictionary of South African English (dsae.co.za) prints the headword droëwors ("Also droewors"); a regional English dictionary, so the root takes the diaeresis, droewors stays its spelling alias'));
push(swap(46480, 46481, 'agogo: amended rule 8: no English dictionary prints agogô (Oxford Learner\'s prints agogo, plural agogos; Wiktionary agogo); the root is plain, agogô stays its spelling alias; "capoeira words" is not a locked foreign-language theme, so no shown text'));

reindex(P);
const after = count(), ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
{ const [[, b], a] = msgs; const nw = [...a].filter(x => !b.has(x)), gone = [...b].filter(x => !a.has(x)); if (nw.length || gone.length) console.log(`new issues:\n  ${nw.join('\n  ') || 'none'}\ngone:\n  ${gone.join('\n  ') || 'none'}`); }
const body = `Root swaps under the amended rule 8 (${log.length}):\n${log.join('\n') || '  none'}`;
console.log(body);
console.log(`\n${n} changes; checks before ${JSON.stringify(before)}; changed kinds: ${diff.join(', ') || 'none'}`);
if (process.argv.includes('--apply') && n) {
  stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
  const NOTE = `Rule 8 as amended (Simon, 2026-11-16; DESIGN-entries.md "Single-word names: rules 6 to 9"): an accent pair's root keeps the diacritics of the language of origin
  when at least one major English dictionary prints them, regional ones included; it is plain only when all English dictionaries print it plain; the
  plain form is always kept as a spelling alias.
Method: dictionary pages read on 2026-11-16 in the built-in browser (read-only, no sign-in, no cookie choices made): Oxford Learner's
  (oxfordlearnersdictionaries.com), Cambridge (dictionary.cambridge.org), Dictionary.com (Random House Unabridged and Collins English Dictionary),
  Wordnik (American Heritage 5th edition, Century, Wiktionary), Dictionary of South African English (dsae.co.za). britannica.com/dictionary answered
  with a bot check (403): not used. Wiktionary alone does not decide a root.

Evidence per word (the form each dictionary prints for the sense):
  raki (19298) STAYS the root, rakı (26967) its spelling alias; "Turkish everyday words" keeps showing rakı.
    Oxford Learner's: raki (no rakı on the page). Dictionary.com: Random House raki ("Or rakee"), Collins raki; the etymology cites Turkish "raki".
    Wordnik: American Heritage raki; "rakı" has no definitions. Cambridge: no entry. v385: Merriam-Webster raki. No English dictionary prints rakı.
  döner (26966) BECOMES the root, doner (29440) its spelling alias.
    Cambridge: headword "döner kebab" (UK, "also kebab"). Oxford Learner's: "doner kebab" (British English). Dictionary.com: Collins "doner kebab"
    (ö only in the etymology, "Turkish döner rotating"). One major dictionary prints the diacritic: the root takes it. 19124 "doner kebab" (separate
    entry, shown "doner" in "kebab types") is NOT changed: outside this check; the same Cambridge evidence would make it "döner kebab" (for Simon).
  droëwors (53496) BECOMES the root, droewors (17804) its spelling alias.
    Dictionary of South African English: headword droëwors, "Forms: Also droewors", origin Afrikaans. Oxford Learner's, Cambridge, Dictionary.com,
    Wordnik: no entry. v385 read Wiktionary only (droewors). The DSAE is the national historical dictionary of South African English (the
    regional-dictionary clause of rule 8, as Oxford's New Zealand edition for Māori words): call for Simon if it should not count as major.
  agogo (46481) BECOMES the root, agogô (46480) its spelling alias.
    Oxford Learner's: agogo ("plural agogos"; v385 recorded "no entry": wrong). Wordnik: only Wiktionary, agogo. Cambridge, Dictionary.com: no
    entry. No English dictionary prints agogô, so the root is plain. The alias agogô keeps the gloss "capoeira" it had as 46481's (word-level
    fields swap with the role: the root keeps gloss "", fam 5).
Locked themes: "words from Turkish" now shows döner (was doner); "Turkish everyday words" shows döner as the root's own text (its shown text dropped).
No entry is added or deleted; ids and export positions are unchanged.`;
  fs.writeFileSync(new URL('batch386-changes.txt', import.meta.url), `Library v${P.lib.version} (tools/gen/batch386.mjs, ${P.lib.modified}): ${n} changes (amended rule 8: v385's plain roots re-checked; döner, droëwors accented roots, agogo plain root, raki unchanged).\nChecks: changed kinds ${diff.join(', ') || 'none'}\n\n${body}\n\n${NOTE}`);
  console.log('library v' + P.lib.version);
}
