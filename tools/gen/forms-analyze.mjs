// Lists (1) aliases that are a shorter form of their root (candidates to become the root) and (2) roots in the same theme that are forms of one word (rain / rainy).
// Run: node tools/gen/forms-analyze.mjs [short|family]
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex, sameText } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8')); reindex(P);
const which = process.argv[2] || 'short';
const toks = s => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').match(/[a-z0-9]+/g) || [];
const lab = e => e.text + (e.gloss ? ` (${e.gloss})` : '');
if (which === 'short') {
  let n = 0;
  for (const a of P.entries) {
    if (!a.aliasOf) continue;
    const r = P.ix.entry.get(a.aliasOf); if (!r) continue;
    const ta = toks(a.text), tr = toks(r.text);
    if (!(ta.length < tr.length && ta.every(w => tr.includes(w)))) continue;
    const lead = tr.slice(0, tr.length - ta.length).join(' '), keepsTail = tr.slice(tr.length - ta.length).join(' ') === ta.join(' ');
    const others = sameText(P, a.text).filter(x => x !== a);
    n++;
    console.log(`${a.id}\t${lab(a)} [${a.aliasKind}] <- ${r.id}\t${lab(r)}\t${r.type}/${r.pos || 'noun'}\t${keepsTail ? 'drops leading ' + lead : 'keeps head only if first'}\tthemes ${Object.keys(r.th).length}/${Object.keys(a.th).length}\trec ${a.rec}/${r.rec}${others.length ? '\tSAME TEXT: ' + others.map(lab).join('; ') : ''}`);
  }
  console.log(n, 'pairs');
} else {
  const rel = (a, b) => { const c = [a + 'y', a + 'ly', a + 'ing', a + 'ed', a + 'er', a + 's', a + 'es', a.replace(/e$/, '') + 'ing', a.replace(/e$/, '') + 'y', a.replace(/e$/, '') + 'ed', a + a.slice(-1) + 'y', a + a.slice(-1) + 'ing', a + a.slice(-1) + 'ed', a + 'al', a + 'ic', a + 'ish', a + 'ful', a + 'less', a.replace(/y$/, 'ier'), a.replace(/y$/, 'ies')]; return c.includes(b); };
  const seen = new Set(); let n = 0;
  for (const [tid, list] of P.ix.byTheme) {
    const roots = list.filter(e => !e.aliasOf && !/[ -]/.test(e.text) && e.text.length > 2);
    for (const a of roots) for (const b of roots) {
      if (a === b || !rel(a.text.toLowerCase(), b.text.toLowerCase())) continue;
      const k = tid + a.id + '-' + b.id; if (seen.has(k)) continue; seen.add(k); n++;
      console.log(`${tid}\t${a.id} ${lab(a)} ${a.pos || 'noun'} rec ${a.rec} pop ${a.th[tid]}\t${b.id} ${lab(b)} ${b.pos || 'noun'} rec ${b.rec} pop ${b.th[tid]}\t${P.ix.theme.get(tid).complete ? 'COMPLETE' : ''}`);
    }
  }
  console.log(n, 'pairs');
}
