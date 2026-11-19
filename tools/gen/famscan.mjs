// Word-family scan: pairs of separate entries (different alias families) linked in one theme whose texts share a root by suffix stripping (joy/joyful, gamer/gaming). Rough: catches unrelated words too. Usage: node tools/gen/famscan.mjs <out.tsv>  (columns: theme, L if locked, derived|siblings, word a, word b, GROUP if in one synonym group, glosses)
import fs from 'node:fs';
import { parseProject } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const P = parseProject(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url),'utf8')); reindex(P);
const SUF = ['fulness','lessness','ousness','iness','ness','ments','ment','ings','ing','ers','er','est','ed','ful','ous','ious','less','ish','ily','ly','ies','es','s','y','ic','al','ical','ion','ions','ity','ive','able','ible','ist','ists','ism'];
SUF.sort((a,b)=>b.length-a.length);
// all candidate stems of a word: itself and with one or two suffixes stripped (with e-restore, y<-i, undoubling)
function stems(w){ const out=new Set([w]); const step=x=>{const r=[];for(const s of SUF) if(x.endsWith(s)&&x.length-s.length>=3){let b=x.slice(0,-s.length);r.push(b,b+'e');if(b.endsWith('i'))r.push(b.slice(0,-1)+'y');if(/([bdgmnprt])\1$/.test(b))r.push(b.slice(0,-1));}return r;};
 for(const a of step(w)){out.add(a);for(const b of step(a))out.add(b);} return out; }
const word = e => (e.text||'').toLowerCase();
const res=[]; 
for (const t of P.themes) {
  const ents = P.entries.filter(e => e.typ && e.typ[t.id] !== undefined);
  if (ents.length < 2) continue;
  const groups = t.groups||[];
  const inGroup=(a,b)=>groups.some(g=>g.includes(a.id)&&g.includes(b.id));
  const L = ents.filter(e=>/^[a-z]+$/i.test(e.text)).map(e=>({e,w:word(e),st:stems(word(e)),fam:e.aliasOf||e.id}));
  for (let i=0;i<L.length;i++) for (let j=i+1;j<L.length;j++){ const a=L[i],b=L[j]; if(a.fam===b.fam||a.w===b.w) continue;
    const [s,l]=a.w.length<=b.w.length?[a,b]:[b,a];
    // l derived from s (s is a stem of l), or both share a derived stem of length>=4
    let kind=null;
    if(l.st.has(s.w)) kind='derived'; else { for(const x of s.st) if(x!==s.w&&x.length>=4&&l.st.has(x)&&x.length>=s.w.length-4){kind='siblings';break;} }
    if(!kind) continue;
    res.push({t:t.id,locked:!!t.locked,kind,a:s.w,b:l.w,sense:[s.e.gloss||'',l.e.gloss||''],grp:inGroup(a.e,b.e)});
  }
}
fs.writeFileSync(process.argv[2], res.map(r=>[r.t,r.locked?'L':'',r.kind,r.a,r.b,r.grp?'GROUP':'',r.sense.join('|')].join('\t')).join('\n'));
console.log('pairs',res.length,'themes',new Set(res.map(r=>r.t)).size,'in groups',res.filter(r=>r.grp).length,'locked',res.filter(r=>r.locked).length);
