// Scan for batch v433 (tidy-up step 1): lists orphans, stale nameOkIn keys, same-text root pairs and long theme names, as TSV in a scratch dir.
// Run: node tools/gen/batch433-scan.mjs <outdir> [--lib <path>]
import fs from 'node:fs';
import path from 'node:path';
import { parseProject } from '../../js/store.js';
import { reindex, linkIds } from '../../js/model.js';
const arg = k => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const OUT = process.argv[2];
const P = parseProject(fs.readFileSync(arg('--lib') || new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const ix = P.ix, th = id => ix.theme.get(id);
const aliasesOf = new Map(); for (const e of P.entries) if (e.aliasOf) { if (!aliasesOf.has(e.aliasOf)) aliasesOf.set(e.aliasOf, []); aliasesOf.get(e.aliasOf).push(e); }
const inGroup = new Map(); for (const t of P.themes) for (const g of t.groups || []) for (const id of g) inGroup.set(id, (inGroup.get(id) || []).concat(t.id));
const kinOf = new Map(); for (const e of P.entries) for (const k of e.kin || []) kinOf.set(k, (kinOf.get(k) || []).concat(e.id));
// batch texts that mention "text id"
const gen = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1'));
const txts = fs.readdirSync(gen).filter(f => /^batch\d+-(changes|review)\.txt$/.test(f)).map(f => [f, fs.readFileSync(path.join(gen, f), 'utf8')]);
const mention = e => { const k = `${e.text} ${e.id}`; return txts.filter(([, s]) => s.includes(k)).map(([f]) => f.replace(/-(changes|review)\.txt/, '')).filter((v, i, a) => a.indexOf(v) === i).join(','); };
const sameText = e => (ix.byText.get(e.text.toLowerCase()) || []).filter(x => x !== e).map(x => `${x.id}${x.aliasOf ? '>' + x.aliasOf : ''}[${x.gloss}]{${linkIds(P, x.aliasOf ? ix.entry.get(x.aliasOf) : x).slice(0, 4).join(',')}}`).join(' ');
// 1. orphans
const orph = P.entries.filter(e => !e.aliasOf && e.enabled !== false && !linkIds(P, e).length);
fs.writeFileSync(path.join(OUT, 'orphans.tsv'), ['id\ttext\tgloss\tpos\ttype\tfam\tflags\tregion\tstatus\taliases\tkin\tkinBy\tgroups\tsameText\tbatches'].concat(orph.map(e =>
  [e.id, e.text, e.gloss, e.pos, e.type, e.fam, ['adult', 'sensitive', 'offensive', 'tm'].filter(f => e[f]).join(','), (e.region || []).join(','), e.status,
   (aliasesOf.get(e.id) || []).map(a => `${a.text}(${a.aliasKind})`).join('; '), (e.kin || []).map(k => ix.entry.get(k)?.text + ' ' + k).join('; '),
   (kinOf.get(e.id) || []).length, (inGroup.get(e.id) || []).join(','), sameText(e), mention(e)].join('\t'))).join('\n'));
// 2. same-text enabled roots
const roots = P.entries.filter(e => !e.aliasOf && e.enabled !== false);
const by = new Map(); for (const e of roots) { const k = e.text.toLowerCase(); if (!by.has(k)) by.set(k, []); by.get(k).push(e); }
const rows = ['text\tid\tgloss\tpos\ttype\tfam\tthemes(parent)\taliases\tkin'];
for (const [k, es] of by) if (es.length > 1) {
  for (const e of es) rows.push([e.text, e.id, e.gloss, e.pos, e.type, e.fam, linkIds(P, e).map(t => `${t}:${e.typ[t]}(${th(t)?.parent})`).join(' '), (aliasesOf.get(e.id) || []).map(a => `${a.text}(${a.aliasKind})`).join('; '), (e.kin || []).length].join('\t'));
  rows.push('');
}
fs.writeFileSync(path.join(OUT, 'sametext.tsv'), rows.join('\n'));
// 3. theme names over 24
const exported = P.themes.filter(t => !t.group);
fs.writeFileSync(path.join(OUT, 'longnames.tsv'), ['id\tname\tlen\tparentName\tkind\trule\tcount\tsample'].concat(P.themes.filter(t => [...t.name].length > 24).map(t => {
  const ws = (ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.typ[t.id] !== undefined).sort((a, b) => a.typ[t.id] - b.typ[t.id]);
  return [t.id, t.name, [...t.name].length, th(t.parent)?.name || '', t.tkind || '', t.rule || '', ws.length, ws.slice(0, 8).map(e => e.text).join(', ')].join('\t');
})).join('\n'));
console.log(`orphans ${orph.length}; same-text groups ${rows.filter(r => r === '').length}; long names ${P.themes.filter(t => [...t.name].length > 24).length}`);
