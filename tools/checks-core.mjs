// The Checks the library gate runs (tools/gate.mjs steps b and i) and `npm run check` (tools/check-lib.mjs): one definition so the two cannot drift.
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
// Issue keys (issueKey) Simon approved to appear new against the base: the gate does not fail on them. Adding one shows as "needs Simon's approval".
export const readAccept = (root = HERE) => new Set(JSON.parse(fs.readFileSync(path.join(root, BASELINE), 'utf8')).accept || []);

// Identity of an issue: severity + kind + location (theme / entry id). The message is part of it only for an issue with no location, so a
// warning whose wording changes (an entry renamed, a clash group grown) stays the same issue, while one fixed and another added is a change.
export const issueKey = i => `${i.sev}|${i.kind}|${i.themeId ?? ''}|${i.entryId ?? ''}` + (i.themeId == null && i.entryId == null ? '|' + i.msg : '');

// Issues of `next` that `base` does not have, matched by identity as a multiset (info excluded unless withInfo; keys in `accept` left out).
export function newIssues(next, base, withInfo = false, accept = null) {
  const have = new Map();
  for (const i of base) have.set(issueKey(i), (have.get(issueKey(i)) || 0) + 1);
  const out = [];
  for (const i of next) {
    if (!withInfo && i.sev === 'info') continue;
    const k = issueKey(i), n = have.get(k) || 0;
    if (accept?.has(k)) continue;
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

// ----- rules of record on the diff between two libraries (gate step i; npm run check -- <file> --diff <base>) -----
// rev:   every entry added or changed against the base has status "rev" (CLAUDE.md "Changing the library" 3; ISSUES I11).
// plain: rule 8 (LIBRARY-RULES.md): a root with diacritics keeps its plain spelling as an alias. Checked on the roots the change touched (new,
//        text changed, or that had the plain alias in the base), so the known older gaps (tools/gen/plaincheck.mjs) do not block.
// Returns { notRev: [{ id, text, status, how }], lostPlain: [{ id, text, plain }] }.
const canon = v => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']' : v && typeof v === 'object' ? '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}' : JSON.stringify(v);
export function diffRules(base, next, plainText) {
  const old = new Map(base.entries.map(e => [e.id, e])), notRev = [], lostPlain = [];
  const aliasTexts = P => { const m = new Map(); for (const e of P.entries) if (e.aliasOf) { if (!m.has(e.aliasOf)) m.set(e.aliasOf, new Set()); m.get(e.aliasOf).add(e.text.toLowerCase()); } return m; };
  const hasPlain = (m, e) => m.get(e.id)?.has(plainText(e.text).toLowerCase());
  const am = aliasTexts(next), ao = aliasTexts(base);
  for (const e of next.entries) {
    const o = old.get(e.id), changed = !o || canon(o) !== canon(e);
    if (changed && e.status !== 'rev') notRev.push({ id: e.id, text: e.text, status: e.status, how: o ? 'changed' : 'added' });
    if (e.aliasOf || plainText(e.text) === e.text || hasPlain(am, e)) continue;
    if (!o || o.text !== e.text || o.aliasOf || hasPlain(ao, o)) lostPlain.push({ id: e.id, text: e.text, plain: plainText(e.text) });
  }
  return { notRev, lostPlain };
}
export const diffRuleLines = d => [
  ...d.notRev.map(x => `entry ${x.id} "${x.text}" was ${x.how} but has status "${x.status}": every entry a batch adds or changes gets "rev"`),
  ...d.lostPlain.map(x => `root ${x.id} "${x.text}" has diacritics but no plain spelling alias "${x.plain}" (rule 8)`)];

// ----- approvals: a baseline count raised or an allow-list key added needs Simon's approval (gate step j) -----
// Baselines: every section of tools/checks-baseline.json that maps kinds to counts (warn, contract). Allow lists: the Sets below.
export const ALLOW_LISTS = { 'js/family-allow.js': ['FAMILY_OK'], 'js/caselint-allow.js': ['CASE_OK'], 'js/caselint-words.js': ['LOWER_OK'], 'js/sense-allow.js': ['SENSE_OK'], 'js/theme-twin-allow.js': ['THEME_TWIN_OK'] };
export function baselineRaises(oldB, newB) {
  const out = [];
  for (const [sec, m] of Object.entries(newB || {})) {
    if (Array.isArray(m)) { const was = new Set(oldB?.[sec] || []), add = m.filter(k => !was.has(k)); if (add.length) out.push(`${BASELINE} ${sec}: ${add.length} key${add.length === 1 ? '' : 's'} added (${add.slice(0, 3).join(', ')}${add.length > 3 ? ', ..' : ''})`); continue; }
    if (!m || typeof m !== 'object') continue;
    for (const [k, n] of Object.entries(m)) { const was = oldB?.[sec]?.[k] ?? 0; if (typeof n === 'number' && n > was) out.push(`${BASELINE} ${sec}.${k}: ${was} -> ${n}`); }
  }
  return out;
}
export function allowAdds(file, name, oldSet, newSet) {
  const added = [...(newSet || [])].filter(k => !(oldSet || new Set()).has(k));
  return added.length ? [`${file} ${name}: ${added.length} key${added.length === 1 ? '' : 's'} added (${added.slice(0, 5).join(', ')}${added.length > 5 ? ', ..' : ''})`] : [];
}
