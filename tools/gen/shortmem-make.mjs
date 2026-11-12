import fs from 'fs';
const c=JSON.parse(fs.readFileSync('tools/gen/shortmem/candidates.json','utf8'));
const rows=c.convert.filter(r=>!r.inGroup&&!r.full[0].linked);
const N=8, per=Math.ceil(rows.length/N);
for(let i=0;i<N;i++){
  const part=rows.slice(i*per,(i+1)*per);
  fs.writeFileSync(`tools/gen/shortmem/list-${i+1}.txt`,part.map(r=>`${r.stub}\t${r.theme}\t${r.text}\t=> ${r.full[0].text}`).join('\n')+'\n');
}
console.log(rows.length,'rows in',N,'lists');
