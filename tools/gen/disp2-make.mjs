import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const N = 6, per = Math.ceil(p.themes.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(new URL(`./disp2/list-${i + 1}.txt`, import.meta.url), p.themes.slice(i * per, (i + 1) * per).map(t => `${t.id}\t${t.name}`).join('\n') + '\n');
console.log(p.themes.length);
