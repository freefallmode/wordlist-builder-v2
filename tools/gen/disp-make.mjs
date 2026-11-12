import fs from 'node:fs';
const p = JSON.parse(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
const rows = p.themes.filter(t => !/[A-Z]/.test(t.name));
const N = 6, per = Math.ceil(rows.length / N);
for (let i = 0; i < N; i++) fs.writeFileSync(new URL(`./disp/list-${i + 1}.txt`, import.meta.url), rows.slice(i * per, (i + 1) * per).map(t => `${t.id}\t${t.name}`).join('\n') + '\n');
console.log(rows.length);
