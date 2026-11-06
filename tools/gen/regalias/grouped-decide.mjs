// Writes grouped-decisions.txt from the reviewed rows of grouped-list.md (row number -> direction).
// B: the first word (A, the one the audit flagged) becomes the alias of the second (B). A <regions>: B becomes the alias of A, tagged with the regions.
// M: special merges, written by hand below. Rows not named here stay synonym groups.
import fs from 'node:fs';
const here = p => new URL(p, import.meta.url);
const pairs = JSON.parse(fs.readFileSync(here('./grouped-pairs.json'), 'utf8'));
const B = [1,2,4,5,6,8,9,10,11,13,14,17,21,23,24,26,30,32,33,34,35,36,38,39,40,41,42,43,44,46,47,49,50,51,53,54,55,56,59,60,61,64,71,72,76,77,78,79,81,84,87,88,89,92,94,95,96,98,99,101,102,103,104,105,108,110,111,112,113,117,118,121,127,130,131,132,133,134,135,137,140,141,142,143,144,148,149,150,151,152,154,155,157,158,159,160,161,162,163,164,166,167,169,170,171,172,173,174,175,177,180,181,183,184,186,187,188,190,191,192,193,194,195,196,197,198,199,200,201,203,204,205,206,207,208,209,210,211,213,214,216,217,219,220,222,223,225,226,227,228,229,231,233,234];
const A = { 16: 'UK', 31: 'UK', 65: 'UK', 68: 'UK', 70: 'UK', 82: 'UK', 123: 'UK', 145: 'UK', 146: 'UK', 147: 'UK', 178: 'UK', 185: 'UK', 202: 'UK' };
const out = ['# Decisions for the grouped regional pairs (grouped-list.md rows). L <alias id> <root id> <regions>; = means the alias keeps its own region tag.'];
const row = n => pairs[n - 1];
for (const n of B) { const p = row(n); out.push(`# ${n}`, `L ${p.a} ${p.b} =`); }
for (const [n, rg] of Object.entries(A)) { const p = row(+n); out.push(`# ${n}`, `L ${p.b} ${p.a} ${rg}`); }
// 20 boob tube is a US word for television; 115 and 179 duplicate aliases made in the first batch
const id = (t) => null;
out.push('# 20', `L ${row(20).a} 4572 =`);
out.push('# 115', 'M 23244 65785', '# 179', 'M 4897 24312');
fs.writeFileSync(here('./grouped-decisions.txt'), out.join('\n') + '\n');
console.log(B.length + Object.keys(A).length + 3, 'decisions');
