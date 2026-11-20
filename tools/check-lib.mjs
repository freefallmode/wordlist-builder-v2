// Data-check of a draft library against the rules the commit gate uses (tools/gate.mjs step b), while working.
// Run: npm run check -- [file] [--kind <k>] [--diff <otherFile>] [--export] [--json]
//   file       library to check (default data/wordlist-en.project.json), e.g. a scratch copy written by a batch script's --out
//   --kind k   list all issues of one kind
//   --diff f   show only issues new in file compared with f (matched by kind + message + theme/entry id)
//   --export   also run the strict export on the file (tools/export-game.mjs --strict --lib, to a temporary file)
//   --json     machine-readable output
// Exit 0: no errors and no warning kind over tools/checks-baseline.json (and, with --export, the strict export passes); 1 otherwise; 2 usage.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { HERE, LIB, loadAndCheck, readBaseline, summarize, newIssues, where } from './checks-core.mjs';

const argv = process.argv.slice(2);
const usage = m => { console.error((m ? m + '\n' : '') + 'Usage: npm run check -- [file] [--kind <k>] [--diff <otherFile>] [--export] [--json]'); process.exit(2); };
let file = null, kind = null, diff = null, doExport = false, json = false;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--kind') { kind = argv[++i]; if (!kind) usage('--kind needs a kind'); }
  else if (a === '--diff') { diff = argv[++i]; if (!diff) usage('--diff needs a file'); }
  else if (a === '--export') doExport = true;
  else if (a === '--json') json = true;
  else if (a.startsWith('--')) usage('Unknown option ' + a);
  else if (file === null) file = a;
  else usage('One file only');
}
file = path.resolve(file || path.join(HERE, LIB));
if (diff) diff = path.resolve(diff);
for (const f of [file, diff].filter(Boolean)) if (!fs.existsSync(f)) usage('No such file: ' + f);

const [cur, other] = await Promise.all([loadAndCheck(file), diff ? loadAndCheck(diff) : null]);
const baseline = readBaseline(), sum = summarize(cur.issues, baseline);
const fresh = other ? newIssues(cur.issues, other.issues) : null;   // errors and warnings new in the file
const pick = list => kind ? list.filter(i => i.kind === kind) : list;

let exp = null;
if (doExport) {
  const tmp = path.join(os.tmpdir(), `wlb-check-${process.pid}.json`);
  const r = spawnSync(process.execPath, [path.join(HERE, 'tools/export-game.mjs'), 'family', tmp, '--strict', '--lib', file], { encoding: 'utf8', maxBuffer: 256 << 20 });
  try { fs.rmSync(tmp, { force: true }); } catch {}
  exp = { ok: r.status === 0, out: ((r.stdout || '') + (r.stderr || '')).trim() };
}
const ok = !sum.errors.length && !sum.over.length && (!exp || exp.ok);

if (json) {
  console.log(JSON.stringify({
    file, version: cur.version, ok, errors: sum.errors, warnings: sum.warn, info: sum.info,
    issues: kind ? cur.issues.filter(i => i.kind === kind) : undefined,
    diff: other ? { against: diff, version: other.version, new: pick(fresh), gone: pick(newIssues(other.issues, cur.issues)) } : undefined,
    export: exp || undefined,
  }, null, 1));
  process.exit(ok ? 0 : 1);
}

const line = i => `[${i.sev}] ${i.kind}: ${i.msg}${where(i) ? '  (' + where(i) + ')' : ''}`;
console.log(`${file}: library v${cur.version}${other ? `; compared with ${diff} (v${other.version})` : ''}`);
if (other) {
  const show = pick(fresh);
  console.log(show.length ? `${show.length} issue${show.length === 1 ? '' : 's'} new in the file${kind ? ' of kind ' + kind : ' (errors and warnings)'}:` : `No new ${kind ? kind + ' issues' : 'errors or warnings'} compared with the other file.`);
  for (const i of show) console.log('  ' + line(i));
  const gone = pick(newIssues(other.issues, cur.issues));
  if (gone.length) console.log(`(${gone.length} issue${gone.length === 1 ? '' : 's'} of the other file are gone here.)`);
  console.log(`counts: ${sum.errors.length} errors; ${sum.over.length ? 'over baseline: ' + sum.over.map(w => `${w.kind} by ${w.over}`).join(', ') : 'all warning kinds within the baseline'}`);
} else if (kind) {
  const l = cur.issues.filter(i => i.kind === kind);
  console.log(`${l.length} ${kind} issue${l.length === 1 ? '' : 's'}:`);
  for (const i of l) console.log('  ' + line(i));
} else {
  console.log(`errors: ${sum.errors.length}`);
  for (const i of sum.errors) console.log('  ' + line(i));
  console.log('warnings (count / baseline):');
  for (const w of sum.warn) console.log(`  ${w.kind.padEnd(18)} ${String(w.n).padStart(3)} / ${w.max}  ${w.status === 'OVER' ? 'OVER by ' + w.over : w.status === 'below' ? 'OK (below baseline: lower it)' : 'OK'}`);
  const inf = Object.entries(sum.info).map(([k, n]) => `${k} ${n}`).join(', ');
  console.log(`info (not gated): ${inf || 'none'}`);
  const byKind = new Map();
  for (const i of cur.issues) if (i.sev === 'warn') (byKind.get(i.kind) || byKind.set(i.kind, []).get(i.kind)).push(i);
  for (const [k, l] of byKind) { console.log(`${k} (first ${Math.min(3, l.length)} of ${l.length}; --kind ${k} for all):`); for (const i of l.slice(0, 3)) console.log('  ' + where(i).padEnd(18) + ' ' + i.msg); }
}
if (exp) console.log(`strict export: ${exp.ok ? 'PASS' : 'FAIL'}\n${exp.out.split(/\r?\n/).slice(exp.ok ? 0 : -15, exp.ok ? 1 : undefined).map(l => '  ' + l.slice(0, 220)).join('\n')}`);
console.log(ok ? 'check: OK' : `check: FAIL (${[sum.errors.length && sum.errors.length + ' errors', sum.over.length && 'over baseline: ' + sum.over.map(w => w.kind).join(', '), exp && !exp.ok && 'export'].filter(Boolean).join('; ')})`);
process.exit(ok ? 0 : 1);
