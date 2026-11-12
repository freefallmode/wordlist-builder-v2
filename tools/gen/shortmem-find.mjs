// Step 1 (read-only): find bare short member entries whose full term exists as another entry.
import fs from 'fs';
const p=JSON.parse(fs.readFileSync('data/wordlist-en.project.json','utf8'));
const E=p.entries, T=p.themes;
const themes=Array.isArray(T)?T:Object.values(T);
const tname=new Map(themes.map(t=>[t.id,t.name||t.id]));
const byText=new Map(); for(const e of E){const k=e.text.toLowerCase(); if(!byText.has(k))byText.set(k,[]); byText.get(k).push(e);}
const sing=w=>w.replace(/(ies)$/,'y').replace(/(ves)$/,'f').replace(/(ses|xes|ches|shes)$/,m=>m.slice(0,-2)).replace(/s$/,'');
const STOP=new Set(['and','of','the','in','for','with','things','kinds','types','words','names','a','to']);
const out={convert:[],multi:[],noFull:[]};
for(const e of E){
  if(e.aliasOf) continue;
  const th=Object.keys(e.typ||{}); if(th.length!==1) continue;
  const t=th[0]; if(e.show&&e.show[t]) continue;
  const words=String(tname.get(t)||t).toLowerCase().replace(/[^a-z' ]/g,' ').split(/\s+/).filter(w=>w&&!STOP.has(w));
  const cands=new Set(); for(const w of words){for(const s of [w,sing(w)]){cands.add(e.text.toLowerCase()+' '+s); cands.add(s+' '+e.text.toLowerCase());}}
  const full=[]; for(const c of cands){for(const f of byText.get(c)||[]) if(f!==e&&!f.aliasOf) full.push(f);}
  const rec={theme:t,stub:e.id,text:e.text,fam:e.fam,typ:e.typ[t],grp:!!(e.group||e.groups),full:full.map(f=>({id:f.id,text:f.text,fam:f.fam,linked:f.typ&&f.typ[t]!=null,showHere:f.show&&f.show[t]}))};
  if(full.length===1) out.convert.push(rec); else if(full.length>1) out.multi.push(rec); else if(e.text.length<=14) out.noFull.push(rec);
}
// stubs in synonym groups of theme
const grpThemes=themes.filter(t=>t.groups&&t.groups.length);
const inGroup=new Set(); for(const t of grpThemes) for(const g of t.groups) for(const m of (g.members||g)) inGroup.add(t.id+'|'+(m.id??m));
for(const k of ['convert','multi']) for(const r of out[k]) r.inGroup=inGroup.has(r.theme+'|'+r.stub);
fs.writeFileSync('tools/gen/shortmem/candidates.json',JSON.stringify(out,null,1));
console.log('convert',out.convert.length,'multi',out.multi.length,'noFull(short single-theme, no full)',out.noFull.length);
console.log('inGroup convert',out.convert.filter(r=>r.inGroup).length,'alreadyLinked full',out.convert.filter(r=>r.full[0].linked).length);
const by={};for(const r of out.convert)by[r.theme]=(by[r.theme]||0)+1;console.log(Object.entries(by).sort((a,b)=>b[1]-a[1]).slice(0,12).join(' | '));
console.log(JSON.stringify(out.convert.filter(r=>r.theme==='eagles').map(r=>[r.text,r.full[0].text])));
console.log(Object.keys(themes[0]), JSON.stringify(grpThemes[0]?.groups?.[0]));
