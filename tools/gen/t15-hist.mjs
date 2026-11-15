// T15 helper (read-only): for the given entry ids, print every older library version (at the given commits) where the entry's text differs
// in case from today's. Run: node tools/gen/t15-hist.mjs <commit,commit,...> id id ...
import fs from 'node:fs';
import { execSync } from 'node:child_process';
const [revs, ...ids] = process.argv.slice(2), want = new Set(ids.map(Number));
const texts = src => { const m = new Map(); for (const l of src.split('\n')) { const r = /^\{"id":(\d+),"text":"((?:[^"\\]|\\.)*)"/.exec(l); if (r && want.has(+r[1])) m.set(+r[1], r[2]); } return m; };
const now = texts(fs.readFileSync(new URL('../../data/wordlist-en.project.json', import.meta.url), 'utf8'));
for (const rev of revs.split(',')) {
  const old = texts(execSync(`git show ${rev}:data/wordlist-en.project.json`, { maxBuffer: 1 << 28, encoding: 'utf8' }));
  const d = [...now].filter(([id, t]) => old.has(id) && old.get(id) !== t && old.get(id).toLowerCase() === t.toLowerCase()).map(([id, t]) => `${id}:${old.get(id)}`);
  console.log(rev, d.length ? d.join(' ') : '(none differ in case)');
}
