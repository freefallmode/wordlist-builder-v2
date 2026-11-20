// The Checks the library gate runs (tools/gate.mjs step b) and `npm run check` (tools/check-lib.mjs): one definition so the two cannot drift.
// Checks = js/validate.js over a loaded library, no frequency list, as the batch scripts run them.
// root is the repository (or a checked-out tree) whose js/ files are used; default: this repository.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const HERE = fileURLToPath(new URL('..', import.meta.url));
export const LIB = 'data/wordlist-en.project.json', BASELINE = 'tools/checks-baseline.json';

// Loads a library file and validates it. Returns { P, version, issues } (issues: { sev, kind, msg, themeId?, entryId? }).
export async function loadAndCheck(file, root = HERE) {
  const imp = f => import(pathToFileURL(path.join(root, f)).href);
  const [{ parseProject }, { reindex }, { validate }] = await Promise.all([imp('js/store.js'), imp('js/model.js'), imp('js/validate.js')]);
  const P = parseProject(fs.readFileSync(file, 'utf8')); reindex(P);
  return { P, version: P.lib.version, issues: validate(P) };
}

export const readBaseline = (root = HERE) => JSON.parse(fs.readFileSync(path.join(root, BASELINE), 'utf8')).warn;

// Identity of an issue: severity + kind + message + location (theme / entry id).
export const issueKey = i => `${i.sev}|${i.kind}|${i.msg}|${i.themeId ?? ''}|${i.entryId ?? ''}`;

// Issues of `next` that `base` does not have, matched by identity as a multiset (info excluded unless withInfo).
export function newIssues(next, base, withInfo = false) {
  const have = new Map();
  for (const i of base) have.set(issueKey(i), (have.get(issueKey(i)) || 0) + 1);
  const out = [];
  for (const i of next) {
    if (!withInfo && i.sev === 'info') continue;
    const k = issueKey(i), n = have.get(k) || 0;
    if (n) have.set(k, n - 1); else out.push(i);
  }
  return out;
}

// Counts per kind against the baseline: { errors, warn: [{ kind, n, max, status: 'OK' | 'OVER' | 'below', over }], info, over, below }.
export function summarize(issues, baseline) {
  const errors = issues.filter(i => i.sev === 'error'), cnt = {}, info = {};
  for (const i of issues) { if (i.sev === 'warn') cnt[i.kind] = (cnt[i.kind] || 0) + 1; else if (i.sev === 'info') info[i.kind] = (info[i.kind] || 0) + 1; }
  const kinds = [...new Set([...Object.keys(baseline), ...Object.keys(cnt)])].sort();
  const warn = kinds.map(kind => { const n = cnt[kind] || 0, max = baseline[kind] ?? 0; return { kind, n, max, status: n > max ? 'OVER' : n < max ? 'below' : 'OK', over: Math.max(0, n - max) }; });
  return { errors, warn, info, over: warn.filter(w => w.status === 'OVER'), below: warn.filter(w => w.status === 'below') };
}

export const where = i => [i.themeId != null ? 'theme ' + i.themeId : '', i.entryId != null ? 'entry ' + i.entryId : ''].filter(Boolean).join(', ');
