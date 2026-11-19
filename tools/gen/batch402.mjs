// Library batch v402 (approved by Simon 2026-11-19): (1) the data errors listed in ISSUES.md I24 (seen by the v400 kin reviewers, tools/gen/kin400/notes.md),
// each checked; (2) prisoner 33709 and jailer 64106 (no theme since v398) linked into law_and_order.
// Verdicts for the I24 items that need no change are in tools/gen/batch402-changes.txt. Changes made here (no entry is deleted; one alias entry is new):
//   silky 14822        gloss "long-haired terrier" (the terriers entry, shown "silky") cleared: this is the adjective, one entry of that text
//   pin 25002          leaves banking_words (the fastening); PIN 29221 [bank code] (an acronym entry that had no banking link) joins banking_words, typicality 2
//   atomic 64815       is the "atomic family" (a synonym of nuclear family), not the adjective: text "atomic family", shown "atomic", gloss cleared,
//                      familiarity 4, typicality 4, grouped with nuclear family 3942 in family_and_friends; its kin link to atom 39502 goes (that was the adjective)
//   hawkish 39967      leaves words_for_cold (wrong sense: hawkish = aggressive); stays in hidden_birds
//   axe 51795          Latin music "axé": root text "axé" (rule 8: Oxford prints the accent), new spelling alias "axe" (gloss "music", as the root)
//   reading 50087      the town: text "Reading", type place, familiarity 3, typicality 3 (like Rugby, Bury: capital rule, shown text); gloss "town" stays
//   polis, mumming, livery   short glosses (city-state, folk play, servants' uniform)
//   prisoner, jailer   linked into law_and_order (typicality 2 and 3) and added to its group [prison, jail], so prison/prisoner and jail/jailer are no family-pair
// Changes nothing when already done, so it can be rerun as a check.
// Run: node tools/gen/batch402.mjs [--apply | --out <path>] [--lib <path>]
//   (no option) dry run; --apply writes the library; --out writes the changed library to <path> (testing); --lib <path> reads that copy.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, setKin, unlinkEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
import { buildExport, PRESETS } from '../../js/export.js';
import { CLASH_MAX } from '../../js/family.js';
import { FAMILY_OK } from '../../js/family-allow.js';
const ALLOW = new URL('../../js/family-allow.js', import.meta.url), LIB = new URL('../../data/wordlist-en.project.json', import.meta.url), COMMITTED = new URL('../../data/export/wordlist-game-family.json', import.meta.url);
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const APPLY = process.argv.includes('--apply'), OUT = arg('--out');
if (APPLY && OUT) throw Error('--apply or --out, not both');
const P = parseProject(fs.readFileSync(arg('--lib') || LIB, 'utf8')); reindex(P);
let ix = P.ix; const lab = e => `${e.text} ${e.id}`;

const count = () => { const c = {}, m = new Set(); for (const i of validate(P)) { c[i.sev + ':' + i.kind] = (c[i.sev + ':' + i.kind] || 0) + 1; if (i.sev !== 'info') m.add(`${i.sev} ${i.kind}: ${i.msg}`); } return [c, m]; };
// the family export with the entry id of each row (ids ride in the gloss column, put back afterwards)
function exp(full) {
  const g = new Map(P.entries.map(e => [e.id, e.gloss])); for (const e of P.entries) e.gloss = String(e.id);
  try {
    const { file } = buildExport(P, { ...(full ? PRESETS.full : PRESETS.family), gloss: true }), E = file.entries;
    return { ids: E.gloss.map(Number), text: E.text, clash: E.clash, links: E.links, linkCount: E.linkCount, themes: file.themes.map(t => t[0]), cols: Object.fromEntries(Object.entries(E).filter(([k, v]) => Array.isArray(v) && v.length === E.text.length && k !== 'gloss')) };
  } finally { for (const e of P.entries) e.gloss = g.get(e.id); }
}

const log = [], allowAdd = []; let n = 0;
const allow = (key, why) => { if (!fs.readFileSync(ALLOW, 'utf8').includes(`'${key}'`) && !FAMILY_OK.has(key)) { allowAdd.push(`  '${key}', // ${why}`); FAMILY_OK.add(key); } };
const get = (id, ...texts) => { const e = ix.entry.get(id); if (!e) throw Error('entry ' + id + ' missing'); if (!texts.includes(e.text)) throw Error(id + ': text is "' + e.text + '", expected ' + texts.join(' or ')); return e; };
const set = (e, k, v, note = '') => { if (JSON.stringify(e[k]) === JSON.stringify(v)) return; log.push(`${lab(e)}: ${k} ${JSON.stringify(e[k])} -> ${JSON.stringify(v)}${note}`); e[k] = v; n++; };
const link = (e, tid, r) => { if (e.typ[tid] === r) return; log.push(`${lab(e)}: link ${tid} ${e.typ[tid] ?? 'none'} -> ${r}`); e.typ[tid] = r; n++; };
const unlink = (e, tid) => { if (!(tid in e.typ)) return; log.push(`${lab(e)}: unlink ${tid} (typicality ${e.typ[tid]})`); unlinkEntry(P, e, tid); n++; };
const theme = id => { const t = ix.theme.get(id); if (!t) throw Error('no theme ' + id); return t; };

const [before, mBefore] = count(), x0 = exp(), f0 = exp(true);

// 1. silky: the gloss belongs to the terriers entry
{ const e = get(14822, 'silky'); if (e.gloss === 'long-haired terrier') set(e, 'gloss', ''); }
// 2. pin (fastening) out of banking_words; PIN (bank code) in
{ unlink(get(25002, 'pin'), 'banking_words'); const p = get(29221, 'PIN'); link(p, 'banking_words', 2); }
// 3. atomic: the atomic family, a synonym of nuclear family
{
  const e = ix.entry.get(64815), nuc = get(3942, 'nuclear family');
  if (!e) throw Error('atomic 64815 missing');
  if (e.text === 'atomic') {
    set(e, 'text', 'atomic family'); set(e, 'gloss', ''); set(e, 'fam', 4); link(e, 'family_and_friends', 4);
    e.show = { ...e.show, family_and_friends: 'atomic' }; log.push(`${lab(e)}: show family_and_friends "atomic"`); n++;
    const atom = ix.entry.get(39502); if (atom && (e.kin || []).includes(39502)) { setKin(P, e, atom, false); log.push(`unkin ${lab(e)} / ${lab(atom)} (the old text was the adjective)`); }
    const t = theme('family_and_friends'); t.groups = [...(t.groups || []), [nuc.id, e.id]]; log.push(`family_and_friends: new group [nuclear family 3942, atomic family 64815]`);
  }
}
// 4. hawkish out of words_for_cold
unlink(get(39967, 'hawkish'), 'words_for_cold');
// 5. axe (Latin music) -> axé with a spelling alias
{
  const e = ix.entry.get(51795); if (!e) throw Error('51795 missing');
  if (e.text === 'axe') {
    set(e, 'text', 'axé');
    const a = addEntry(P, 'axe', { gloss: e.gloss, pos: e.pos, type: e.type, fam: e.fam, region: [...e.region], aliasOf: e.id, aliasKind: 'spelling', status: e.status });
    const axes = ix.entry.get(28814); if (axes && (e.kin || []).includes(28814)) { setKin(P, e, axes, false); log.push(`unkin ${lab(e)} / ${lab(axes)} (axé is no longer the same written word as axes; keeps the axe clash group at 8)`); n++; allow('28814|51795', 'axes / axé: allowed (v402); axé is a different written word from axes, and the kin link made a 9-word clash group'); }
    log.push(`new alias entry ${lab(a)}: spelling alias of axé 51795, gloss "${a.gloss}", familiarity ${a.fam}`); n++;
  }
}
// 6. reading (the town) -> Reading
{ const e = get(50087, 'reading', 'Reading'); set(e, 'text', 'Reading'); set(e, 'type', 'place'); set(e, 'fam', 3); link(e, 'places_that_are_also_words', 3); }
// 7. glosses
for (const [id, t, g] of [[20373, 'polis', 'city-state'], [20995, 'mumming', 'folk play'], [20841, 'livery', "servants' uniform"]]) { const e = ix.entry.get(id); if (!e || e.text !== t) throw Error(`${id} is not ${t}`); if (!e.gloss) set(e, 'gloss', g); }
// 8. prisoner and jailer into law_and_order, grouped with prison and jail
{
  const t = theme('law_and_order'), pr = get(33709, 'prisoner'), jl = get(64106, 'jailer');
  link(pr, 'law_and_order', 2); link(jl, 'law_and_order', 3);
  // not grouped with prison and jail: in the full export that clash group (prison, jail, gaol, clinker, penitentiary, slammer, clink, correctional facility) would grow from 8 to 10 (limit 8)
  allow('2485|33709|law_and_order', 'prison / prisoner in law and order: kept as separate answers (v402): grouping would make a 10-word clash group'); allow('2486|64106|law_and_order', 'jail / jailer in law and order: as above (v402)');
}
reindex(P); ix = P.ix;

// ---------- after ----------
const [after, mAfter] = count(), x1 = exp(), f1 = exp(true);
const ks = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
const diff = ks.filter(k => before[k] !== after[k]).map(k => `${k} ${before[k] || 0} -> ${after[k] || 0}`);
const nw = [...mAfter].filter(x => !mBefore.has(x)), gone = [...mBefore].filter(x => !mAfter.has(x));
const warnLine = c => ks.filter(k => k.startsWith('warn:') || k.startsWith('error:')).map(k => `${k.replace(/^\w+:/, '')} ${c[k] || 0}`).join(', ');
const C = JSON.parse(fs.readFileSync(COMMITTED, 'utf8')).entries;
const same = (p, q) => p.length === q.length && p.every((v, i) => JSON.stringify(v) === JSON.stringify(q[i]));
const linksOf = x => { const m = new Map(); let p = 0; x.ids.forEach((id, i) => { const a = []; for (let j = 0; j < x.linkCount[i]; j++) { a.push(`${x.themes[x.links[p]]}:${x.links[p + 1]}`); p += 4; } m.set(id, a); }); return m; };
function compare(a, b, tag) {
  const out = [], ia = new Map(a.ids.map((id, i) => [id, i])), ib = new Map(b.ids.map((id, i) => [id, i]));
  const added = b.ids.filter(id => !ia.has(id)), removed = a.ids.filter(id => !ib.has(id));
  out.push(`${tag}: rows ${a.ids.length} -> ${b.ids.length}; added ${added.map(id => `${ix.entry.get(id)?.text} ${id} (row ${ib.get(id)})`).join(', ') || 'none'}; removed ${removed.length ? removed.join(', ') : 'none'}`);
  const shifted = b.ids.filter(id => ia.has(id) && ia.get(id) !== ib.get(id)).length;
  out.push(`  rows whose index changed: ${shifted}${shifted ? `; first insertion at row ${Math.min(...added.map(id => ib.get(id)))}` : ''}`);
  const la = linksOf(a), lb = linksOf(b), lc = [];
  for (const id of b.ids) if (ia.has(id)) { const p = la.get(id), q = lb.get(id); if (p.join() !== q.join()) lc.push(`  ${ix.entry.get(id)?.text} ${id}: [${p.join(' ')}] -> [${q.join(' ')}]`); }
  for (const id of added) lc.push(`  new row ${ix.entry.get(id)?.text} ${id}: [${lb.get(id).join(' ')}]`);
  out.push(`  link changes (theme:typicality): ${lc.length}`, ...lc);
  const cc = [];
  for (const k of Object.keys(b.cols)) { if (k === 'clash') continue; let d = 0; for (const id of b.ids) if (ia.has(id) && JSON.stringify(a.cols[k]?.[ia.get(id)]) !== JSON.stringify(b.cols[k][ib.get(id)])) { d++; if (d <= 5) cc.push(`  ${k}: ${ix.entry.get(id)?.text} ${id} ${JSON.stringify(a.cols[k][ia.get(id)])} -> ${JSON.stringify(b.cols[k][ib.get(id)])}`); } if (d > 5) cc.push(`  ${k}: ... ${d} rows in all`); }
  const text = b.ids.filter(id => ia.has(id) && a.text[ia.get(id)] !== b.text[ib.get(id)]).map(id => `${a.text[ia.get(id)]} -> ${b.text[ib.get(id)]} (${id})`);
  out.push(`  texts changed: ${text.join(', ') || 'none'}`, `  other columns changed (pos, type, flags, familiarity, regions, root, linkCount excluded):${cc.length ? '' : ' none'}`, ...cc);
  const stat = x => { const m = new Map(); x.clash.forEach((c, i) => { if (c) m.set(c, (m.get(c) || 0) + 1); }); const d = {}; for (const s of m.values()) d[s] = (d[s] || 0) + 1; return { ids: m.size, words: x.clash.filter(Boolean).length, d }; };
  const sa = stat(a), sb = stat(b), dl = d => Object.entries(d).sort((p, q) => p[0] - q[0]).map(([k, v]) => `${k}:${v}`).join(' ');
  out.push(`  clash: words with an id ${sa.words} -> ${sb.words}; ids ${sa.ids} -> ${sb.ids}; sizes before ${dl(sa.d)}; after ${dl(sb.d)}`);
  const ga = new Map(); a.clash.forEach((c, i) => { if (c) { if (!ga.has(c)) ga.set(c, []); ga.get(c).push(a.ids[i]); } });
  return out;
}
const baseOk = same(C.text, x0.text) && same(C.links, x0.links) && same(C.clash, x0.clash);
const clashOf = ids => { const m = new Map(); const x = f1; x.clash.forEach((c, i) => { if (c) { if (!m.has(c)) m.set(c, []); m.get(c).push(x.text[i]); } }); return m; };
const bigAfter = [...clashOf().values()].filter(g => g.length > CLASH_MAX).map(g => g.length);
const grp = id => { const i = f1.ids.indexOf(id); const c = i < 0 ? 0 : f1.clash[i]; return c ? f1.ids.map((x, j) => f1.clash[j] === c ? f1.text[j] : null).filter(Boolean) : []; };
const summary = [
  `Committed family export equals the in-memory export of the library before the changes: ${baseOk ? 'yes' : 'NO'}`,
  ...compare(x0, x1, 'Family export (committed v401 -> after)'), ...compare(f0, f1, 'Full export (before -> after)'),
  `Clash group of prisoner in the full export: ${grp(33709).length} [${grp(33709).join(', ')}]; of jailer: ${grp(64106).length}; of axé: ${grp(51795).length} [${grp(51795).join(', ')}]; groups above ${CLASH_MAX}: ${bigAfter.join(', ') || 'none'}`,
  `Allow-list lines (js/family-allow.js, on --apply): ${allowAdd.length ? '\n' + allowAdd.join('\n') : 'none (already there)'}`,
  `Checks: changed kinds: ${diff.join(', ') || 'none'}`, `Checks after (errors and warnings): ${warnLine(after) || 'none'}`];
console.log(`${log.join('\n') || 'no changes'}\n\n${summary.join('\n')}\nnew issues: ${nw.join(' | ') || 'none'}\ngone issues: ${gone.length ? gone.join(' | ') : 0}\n\n${n} library changes`);

if (APPLY || OUT) {
  if (nw.length) throw Error('new issues, not written');
  if (n) { stampSave(P); fs.writeFileSync(OUT || LIB, serializeProject(P)); console.log('written ' + (OUT || 'library') + ' v' + P.lib.version + ' ' + P.lib.modified); }
  if (APPLY && allowAdd.length) { fs.writeFileSync(ALLOW, fs.readFileSync(ALLOW, 'utf8').replace(/\n\]\);\s*$/, '\n' + allowAdd.join('\n') + '\n]);\n')); console.log(`${allowAdd.length} lines added to js/family-allow.js`); }
}
