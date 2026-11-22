// The library gate: the one definition of the checks every change to the library data must pass, whoever makes it (a Claude session, a person,
// or the browser app's saved file once committed). Used by the pre-commit hook (.githooks/pre-commit), by CI (.github/workflows/library-gate.yml)
// and by hand (npm run gate).
//
// Run: node tools/gate.mjs              the working tree (tracked and untracked, not ignored) against HEAD
//      node tools/gate.mjs --staged     the index against HEAD (what the next commit would hold; the pre-commit hook)
//      node tools/gate.mjs --base <ref> HEAD against <ref> (their merge base; CI and manual runs)
//      --keep keeps the temporary checkout and prints its path.
//
// When no file under data/, no js/ file that validation or the export loads, and no gate file changed, it says so and exits 0.
// Otherwise it checks out the target content into a temporary directory (so staged content that differs from the working tree is what is
// checked, and nothing in the repository is written) and runs, in parallel:
//   a. npm test passes.
//   b. Checks (tools/checks-core.mjs, shared with npm run check: js/validate.js, no frequency list, as the batch scripts run them): 0 errors; each
//      warning kind at most its count in tools/checks-baseline.json (a kind not listed there counts as 0); and no error or warning new by identity
//      (kind + theme/entry id) against the base library, so a fixed warning cannot hide a new one (keys in the baseline's "accept" list excepted).
//      Info is reported, not gated.
//   c. A strict full export (tools/export-game.mjs --strict) to a temporary file exits 0.
//   d. tools/gen/style-case.mjs and tools/gen/propword-exceptions.mjs, without --apply, report 0 changes.
//   e. The committed data/export/wordlist-game-family.json equals a fresh export (parsed JSON, `generated` ignored).
//   f. When the library content changed, its version is higher than in the base.
//   g. Each batch script (tools/gen/batchNNN.mjs) new or changed in the diff makes 0 changes when rerun as a dry run. WARN only, not FAIL:
//      some replays legitimately flip-flop (batch409).
//   h. The export contract (tools/export-contract.mjs, GAME-CONTRACT.md) on the fresh export of step c: 0 errors; each warning kind at most its
//      count in the "contract" section of tools/checks-baseline.json.
//   i. On the diff against the base library: every entry added or changed has status "rev", and no accented root the change touched is left
//      without its plain spelling alias (rule 8) (checks-core.mjs diffRules).
//   j. Approvals, WARN only: a count raised in tools/checks-baseline.json, an "accept" key added, or a key added to an allow list
//      (js/family-allow.js, js/caselint-allow.js, LOWER_OK in js/caselint-words.js, js/sense-allow.js, js/theme-twin-allow.js, js/offensive-allow.js, OFFENSIVE_WORDS in js/offensive-words.js) against the base
//      is printed as "!! needs Simon's approval".
// Exit 1 on any FAIL, 2 on a usage or git error.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const LIB = 'data/wordlist-en.project.json', EXPORT = 'data/export/wordlist-game-family.json', BASELINE = 'tools/checks-baseline.json';
const CHECK_SCRIPTS = ['tools/gen/style-case.mjs', 'tools/gen/propword-exceptions.mjs'];
const GATE_FILES = ['tools/gate.mjs', 'tools/checks-core.mjs', 'tools/export-contract.mjs', BASELINE, 'tools/export-game.mjs', ...CHECK_SCRIPTS];
const BATCH = /^tools\/gen\/batch\d+\.mjs$/;
const STEP_TIMEOUT = 600000;
const args = process.argv.slice(2);

// ---------- internal: the Checks counts of a checked-out tree, as JSON (run as a child so it runs beside the other steps) ----------
if (args[0] === '--checks-json') {
  const R = args[1], baseLib = args[2], imp = f => import(pathToFileURL(path.join(R, f)).href);
  const { loadAndCheck, newIssues, where, diffRules, diffRuleLines, issueKey, readAccept } = await imp('tools/checks-core.mjs');
  const { plainText } = await imp('js/model.js');
  const cur = await loadAndCheck(path.join(R, LIB), R);
  const counts = {}, msgs = {};
  for (const i of cur.issues) {
    const k = i.sev + ':' + i.kind; counts[k] = (counts[k] || 0) + 1;
    if (i.sev !== 'info') { (msgs[k] ||= []); if (msgs[k].length < 5) msgs[k].push(i.msg); }
  }
  let fresh = null, diff = null, baseErr = null;
  if (baseLib) {
    let base = null; try { base = await loadAndCheck(baseLib, R); } catch (e) { baseErr = e.message; }
    if (base) { fresh = newIssues(cur.issues, base.issues, false, readAccept(R)).map(i => ({ key: issueKey(i), line: `${i.sev} ${i.kind}: ${i.msg}${where(i) ? ' (' + where(i) + ')' : ''}` })); diff = diffRuleLines(diffRules(base.P, cur.P, plainText)); }
  }
  process.stdout.write(JSON.stringify({ version: cur.version, counts, msgs, fresh, diff, baseErr }));
  process.exit(0);
}

// ---------- arguments and git ----------
const usage = () => { console.error('Usage: node tools/gate.mjs [--staged | --base <ref>] [--keep]'); process.exit(2); };
let mode = 'worktree', baseArg = null; const KEEP = args.includes('--keep');
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--staged') mode = 'staged';
  else if (args[i] === '--base') { mode = 'base'; baseArg = args[++i]; if (!baseArg) usage(); }
  else if (args[i] !== '--keep') usage();
}
const HERE = fileURLToPath(new URL('..', import.meta.url));
const git = (a, opt = {}) => execFileSync('git', a, { cwd: REPO, encoding: opt.encoding ?? 'utf8', maxBuffer: 256 << 20, env: opt.env || process.env, stdio: ['ignore', 'pipe', opt.quiet ? 'ignore' : 'inherit'] });
const tryGit = (a, opt = {}) => { try { return git(a, { ...opt, quiet: true }); } catch { return null; } };
const REPO = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: HERE, encoding: 'utf8' }).trim();
const EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
const t0 = Date.now(), secs = ms => (ms / 1000).toFixed(1) + 's';

const hasHead = tryGit(['rev-parse', '--verify', '-q', 'HEAD^{commit}']) !== null;
let base;   // the commit (or empty tree) the target is compared with
if (mode === 'base') {
  const ref = tryGit(['rev-parse', '--verify', '-q', baseArg + '^{commit}']);
  if (!ref) { console.error(`gate: no commit ${baseArg}`); process.exit(2); }
  base = (tryGit(['merge-base', ref.trim(), 'HEAD']) || ref).trim();
} else base = hasHead ? git(['rev-parse', 'HEAD']).trim() : EMPTY_TREE;
const lines = s => (s || '').split('\0').filter(Boolean);

let changed;
if (mode === 'staged') changed = lines(git(['diff', '--cached', '--name-only', '--no-renames', '-z', base]));
else if (mode === 'base') changed = lines(git(['diff', '--name-only', '--no-renames', '-z', base, 'HEAD']));
else changed = [...new Set([...lines(git(['diff', '--name-only', '--no-renames', '-z', base])), ...lines(git(['ls-files', '-z', '--others', '--exclude-standard']))])];

// js files that validation, the export, the case scripts or the gate load (their relative imports, followed from the working tree)
function closure(starts) {
  const seen = new Set(), stack = [...starts];
  while (stack.length) {
    const rel = stack.pop(); if (seen.has(rel)) continue; seen.add(rel);
    let src; try { src = fs.readFileSync(path.join(REPO, rel), 'utf8'); } catch { continue; }
    for (const m of src.matchAll(/(?:\bfrom|\bimport)\s*\(?\s*['"](\.{1,2}\/[^'"]+)['"]/g)) stack.push(path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1])));
  }
  return seen;
}
const JS = closure(['js/validate.js', 'js/export.js', 'js/store.js', 'tools/export-game.mjs', ...CHECK_SCRIPTS]);
const relevant = changed.filter(f => f.startsWith('data/') || GATE_FILES.includes(f) || BATCH.test(f) || (f.startsWith('js/') && JS.has(f)));
const label = { worktree: 'working tree vs HEAD', staged: 'index vs HEAD', base: `HEAD vs ${baseArg}` }[mode] + (base === EMPTY_TREE ? ' (no commits yet)' : ` (base ${base.slice(0, 7)})`);
if (!relevant.length) {
  console.log(`gate: ${label}: ${changed.length} changed file${changed.length === 1 ? '' : 's'}, none under data/, no validation or export code; nothing to check.`);
  process.exit(0);
}
console.log(`gate: ${label}: ${changed.length} changed files, ${relevant.length} relevant (${relevant.slice(0, 6).join(', ')}${relevant.length > 6 ? ', ..' : ''})`);

// ---------- the target tree, checked out into a temporary directory ----------
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'wlb-gate-')), T = path.join(TMP, 'tree'), OUTS = path.join(TMP, 'out');
fs.mkdirSync(T); fs.mkdirSync(OUTS);
const prefix = T.replace(/\\/g, '/') + '/';
const cleanup = () => { if (KEEP) console.log('gate: kept ' + TMP); else try { fs.rmSync(TMP, { recursive: true, force: true, maxRetries: 5 }); } catch { console.warn('gate: could not remove ' + TMP); } };
let exitCode = 1;
try {
  const tc = Date.now();
  if (mode === 'staged') git(['checkout-index', '-a', '-f', '--prefix=' + prefix]);   // honours GIT_INDEX_FILE (git commit <paths> uses a temporary index)
  else if (mode === 'base') {
    const env = { ...process.env, GIT_INDEX_FILE: path.join(TMP, 'index') };
    git(['read-tree', 'HEAD'], { env }); git(['checkout-index', '-a', '-f', '--prefix=' + prefix], { env });
  } else {
    for (const f of lines(git(['ls-files', '-z', '--cached', '--others', '--exclude-standard']))) {
      const src = path.join(REPO, f); if (!fs.existsSync(src) || !fs.statSync(src).isFile()) continue;
      fs.mkdirSync(path.dirname(path.join(T, f)), { recursive: true }); fs.copyFileSync(src, path.join(T, f));
    }
  }
  console.log(`gate: checked out the target into a temporary directory (${secs(Date.now() - tc)})`);

  const CHILD_ENV = { ...process.env }; delete CHILD_ENV.GIT_INDEX_FILE; delete CHILD_ENV.GIT_DIR; delete CHILD_ENV.GIT_WORK_TREE;
  const run = (cmd, a, opt = {}) => new Promise(res => {
    const s = Date.now(); let out = '', done = false;
    const c = spawn(cmd, a, { cwd: T, shell: !!opt.shell, env: CHILD_ENV, windowsHide: true });
    const fin = code => { if (done) return; done = true; clearTimeout(to); res({ code, out, ms: Date.now() - s }); };
    const to = setTimeout(() => { out += `\n[timed out after ${secs(STEP_TIMEOUT)}]`; c.kill(); fin(124); }, STEP_TIMEOUT);
    c.stdout.on('data', d => out += d); c.stderr.on('data', d => out += d);
    c.on('error', e => { out += '\n' + e.message; fin(127); }); c.on('close', code => fin(code ?? 1));
  });
  const tail = (s, n = 15) => s.trim().split(/\r?\n/).slice(-n).map(l => '      ' + l.slice(0, 220)).join('\n');
  const node = (...a) => run(process.execPath, a);
  const R = []; // { id, name, status: PASS | FAIL | WARN | SKIP, ms, detail }
  const result = (id, name, status, ms, detail = '') => R.push({ id, name, status, ms, detail });

  // a. npm test
  const stepA = run('npm test', [], { shell: true }).then(r => result('a', 'npm test', r.code === 0 ? 'PASS' : 'FAIL', r.ms,
    r.code === 0 ? (r.out.match(/ℹ pass \d+/)?.[0]?.replace('ℹ ', '') || '') : 'npm test failed:\n' + tail(r.out, 25)));

  // b. Checks against the baseline
  const baseBlobB = base === EMPTY_TREE ? null : tryGit(['rev-parse', '-q', '--verify', `${base}:${LIB}`])?.trim();
  let baseLibFile = null;
  if (baseBlobB) { baseLibFile = path.join(OUTS, 'base-lib.json'); fs.writeFileSync(baseLibFile, git(['cat-file', 'blob', baseBlobB], { encoding: 'buffer' })); }
  const stepB = node(fileURLToPath(import.meta.url), '--checks-json', T, ...(baseLibFile ? [baseLibFile] : [])).then(r => {
    const I = 'i', iName = 'changed entries have status rev; accented roots keep their plain alias (rule 8)';
    if (r.code !== 0) { result(I, iName, 'FAIL', r.ms, 'the Checks did not run (see b)'); return result('b', 'Checks', 'FAIL', r.ms, 'the Checks did not run:\n' + tail(r.out)); }
    const { counts, msgs, fresh, diff, baseErr } = JSON.parse(r.out), bad = [], below = [];
    // i. rules of record on the diff (tools/checks-core.mjs diffRules)
    if (!baseLibFile) result(I, iName, 'SKIP', r.ms, 'no library in the base');
    else if (!diff) result(I, iName, 'FAIL', r.ms, 'the base library could not be loaded: ' + baseErr);
    else result(I, iName, diff.length ? 'FAIL' : 'PASS', r.ms, diff.length ? diff.length + ' problem' + (diff.length === 1 ? '' : 's') + ':\n      - ' + diff.slice(0, 15).join('\n      - ') + (diff.length > 15 ? '\n      .. and ' + (diff.length - 15) + ' more' : '') + '\n      The batch sets status "rev" on every entry it adds or changes, and keeps the plain spelling alias of an accented root.' : 'none');
    let bl; try { bl = JSON.parse(fs.readFileSync(path.join(T, BASELINE), 'utf8')).warn; } catch (e) { return result('b', 'Checks', 'FAIL', r.ms, `${BASELINE} missing or unreadable: ${e.message}`); }
    const errs = Object.entries(counts).filter(([k]) => k.startsWith('error:'));
    for (const [k, n] of errs) bad.push(`error ${k.slice(6)}: ${n}\n${(msgs[k] || []).map(m => '        ' + m).join('\n')}`);
    const kinds = new Set([...Object.keys(bl), ...Object.keys(counts).filter(k => k.startsWith('warn:')).map(k => k.slice(5))]);
    const warnLine = [];
    for (const k of [...kinds].sort()) {
      const n = counts['warn:' + k] || 0, max = bl[k] ?? 0; warnLine.push(`${k} ${n}/${max}`);
      if (n > max) bad.push(`warn ${k}: ${n}, baseline ${max}\n${(msgs['warn:' + k] || []).map(m => '        ' + m).join('\n')}`);
      else if (n < max) below.push(`${k} ${n} < ${max}`);
    }
    const info = Object.entries(counts).filter(([k]) => k.startsWith('info:')).map(([k, n]) => `${k.slice(5)} ${n}`).join(', ');
    let d = `errors ${errs.reduce((s, [, n]) => s + n, 0)}; warn (count/baseline): ${warnLine.join(', ')}\n      info (not gated): ${info || 'none'}`;
    if (below.length) d += `\n      below the baseline (lower it in ${BASELINE} to lock the gain): ${below.join(', ')}`;
    if (bad.length) d += `\n      over the limit:\n      - ${bad.join('\n      - ')}\n      Errors must be fixed. A warning count above the baseline must be fixed, or the baseline raised by an explicit, approved edit of ${BASELINE} committed with the change.`;
    if (fresh?.length) d += '\n      ' + fresh.length + ' error/warning issue' + (fresh.length === 1 ? '' : 's') + ' new by identity (kind + theme/entry) against the base library; a fixed one must not hide a new one, so this fails (npm run check -- <file> --diff <base file>):\n      - ' + fresh.slice(0, 10).map(f => f.line).join('\n      - ') + (fresh.length > 10 ? '\n      .. and ' + (fresh.length - 10) + ' more' : '') + `\n      Fix it. A warning Simon approves to keep goes into the "accept" list of ${BASELINE} (its key: ${fresh[0].key}).`;
    result('b', 'Checks (0 errors, warnings within tools/checks-baseline.json, none new)', bad.length || fresh?.length ? 'FAIL' : 'PASS', r.ms, d);
  });

  // c. strict export, then e. the committed export equals a fresh one
  const fresh = path.join(OUTS, 'family.json');
  const stepCE = node('tools/export-game.mjs', 'family', fresh, '--strict').then(async r => {
    result('c', 'strict export', r.code === 0 ? 'PASS' : 'FAIL', r.ms, r.code === 0 ? r.out.trim().split(/\r?\n/)[0].replace(fresh, 'tmp') : tail(r.out));
    let ms = 0;
    const H = 'export contract (GAME-CONTRACT.md: 0 errors, warnings within the "contract" baseline)';
    if (r.code !== 0) { const r2 = await node('tools/export-game.mjs', 'family', fresh); ms = r2.ms; if (r2.code !== 0) { result('h', H, 'FAIL', 0, 'no export to check (see c)'); return result('e', 'committed export is current', 'FAIL', ms, 'the export failed:\n' + tail(r2.out)); } }
    // h. the export contract on the fresh export (tools/export-contract.mjs)
    const rh = await node('tools/export-contract.mjs', fresh, '--baseline', BASELINE);
    result('h', H, rh.code === 0 ? 'PASS' : 'FAIL', rh.ms, rh.out.trim().split(/\r?\n/).slice(1, rh.code === 0 ? 3 : 40).map(l => l.slice(0, 220)).join('\n      ').replace(fresh, 'tmp'));
    const s = Date.now();
    let a, b; try { a = JSON.parse(fs.readFileSync(path.join(T, EXPORT), 'utf8')); } catch (e) { return result('e', 'committed export is current', 'FAIL', ms, `${EXPORT} missing or not JSON: ${e.message}`); }
    b = JSON.parse(fs.readFileSync(fresh, 'utf8')); delete a.generated; delete b.generated;
    const diff = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter(k => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
    result('e', 'committed export is current', diff.length ? 'FAIL' : 'PASS', ms + Date.now() - s, diff.length
      ? `${EXPORT} differs from a fresh export in: ${diff.join(', ')} (committed lib v${a.lib?.version}, library v${b.lib?.version}). Regenerate it: node tools/export-game.mjs`
      : `equal (lib v${b.lib?.version}, generated ignored)`);
  });

  // d. the case scripts make no changes
  const stepD = Promise.all(CHECK_SCRIPTS.map(f => node(f))).then(rs => {
    const parts = rs.map((r, i) => { const n = r.out.match(/(\d+) changes/); return { f: path.basename(CHECK_SCRIPTS[i]), ok: r.code === 0 && n && +n[1] === 0, n: n ? n[1] : '?', r }; });
    const ok = parts.every(p => p.ok);
    result('d', 'style-case and propword-exceptions: 0 changes', ok ? 'PASS' : 'FAIL', Math.max(...rs.map(r => r.ms)),
      parts.map(p => `${p.f} ${p.n} changes${p.r.code ? ' (exit ' + p.r.code + ')' : ''}`).join('; ') + (ok ? '' : '\n' + parts.filter(p => !p.ok).map(p => tail(p.r.out, 12)).join('\n') + '\n      Run the script with --apply in a batch, or update its decisions.'));
  });

  // f. version bump when the library content changed
  const stepF = (async () => {
    const s = Date.now();
    const baseBlob = base === EMPTY_TREE ? null : tryGit(['rev-parse', '-q', '--verify', `${base}:${LIB}`])?.trim();
    const target = path.join(T, LIB), exists = fs.existsSync(target);
    const tBlob = exists ? git(['hash-object', '--path=' + LIB, target]).trim() : null;   // as git would store it
    if (!exists) return result('f', 'library version bumped', 'FAIL', Date.now() - s, `${LIB} is missing`);
    if (baseBlob && baseBlob === tBlob) return result('f', 'library version bumped', 'PASS', Date.now() - s, 'library unchanged');
    const ver = t => +(String(t).slice(0, 2000).match(/"lib"\s*:\s*\{\s*"version"\s*:\s*(\d+)/)?.[1] ?? NaN);
    const vNew = ver(fs.readFileSync(target, 'utf8').slice(0, 2000));
    const vOld = baseBlob ? ver(git(['cat-file', 'blob', baseBlob])) : null;
    if (vOld === null) return result('f', 'library version bumped', 'PASS', Date.now() - s, `no library in the base; v${vNew}`);
    const ok = vNew > vOld;
    result('f', 'library version bumped', ok ? 'PASS' : 'FAIL', Date.now() - s, ok ? `v${vOld} -> v${vNew}` : `the library changed but its version is v${vNew}, base v${vOld}: a change must bump lib.version (stampSave, as the batch --apply does).`);
  })();

  // g. changed batch scripts rerun as a dry run make 0 changes (WARN)
  const batches = relevant.filter(f => BATCH.test(f) && fs.existsSync(path.join(T, f)));
  const stepG = Promise.all(batches.map(f => node(f))).then(rs => {
    if (!batches.length) return result('g', 'changed batch scripts rerun to 0 changes', 'SKIP', 0, 'no batch script new or changed');
    const parts = rs.map((r, i) => { const m = [...r.out.matchAll(/(\d+) (?:library )?changes\b/g)].pop(); return { f: path.basename(batches[i]), n: m ? +m[1] : null, r }; });
    const ok = parts.every(p => p.r.code === 0 && p.n === 0);
    result('g', 'changed batch scripts rerun to 0 changes', ok ? 'PASS' : 'WARN', Math.max(...rs.map(r => r.ms)),
      parts.map(p => `${p.f}: ${p.r.code ? 'exit ' + p.r.code : (p.n ?? '?') + ' changes'}`).join('; ') + (ok ? '' : '\n' + parts.filter(p => p.r.code || p.n !== 0).map(p => tail(p.r.out, 8)).join('\n') + '\n      A replay that is not idempotent (some flip-flop legitimately, as batch409) does not block; check it is intended.'));
  });

  // j. approvals: a baseline count raised, an accepted issue or an allow-list key added against the base (WARN, for Simon to approve)
  const stepJ = (async () => {
    const s = Date.now(), lines = [];
    const { baselineRaises, allowAdds, ALLOW_LISTS } = await import(pathToFileURL(path.join(T, 'tools/checks-core.mjs')).href);
    const atBase = f => base === EMPTY_TREE ? null : tryGit(['show', `${base}:${f}`]);
    try { lines.push(...baselineRaises(JSON.parse(atBase(BASELINE) || '{}'), JSON.parse(fs.readFileSync(path.join(T, BASELINE), 'utf8')))); } catch (e) { lines.push(`${BASELINE}: could not compare (${e.message})`); }
    const BA = path.join(OUTS, 'base-allow'); fs.mkdirSync(BA, { recursive: true });
    for (const [f, names] of Object.entries(ALLOW_LISTS)) {
      try {
        const now = fs.existsSync(path.join(T, f)) ? await import(pathToFileURL(path.join(T, f)).href) : {};
        const src = atBase(f); let was = {};
        if (src) { const tmp = path.join(BA, path.basename(f, '.js') + '.mjs'); fs.writeFileSync(tmp, src); was = await import(pathToFileURL(tmp).href); }
        for (const n of names) lines.push(...allowAdds(f, n, was[n], now[n]));
      } catch (e) { lines.push(`${f}: could not compare (${e.message})`); }
    }
    result('j', 'no baseline raised or allow-list key added without approval', lines.length ? 'WARN' : 'PASS', Date.now() - s, lines.length
      ? lines.map(l => "!! needs Simon's approval: " + l).join('\n      ') + '\n      Commit only with his approval (say so in the commit message).'
      : 'none');
  })();

  await Promise.all([stepA, stepB, stepCE, stepD, stepF, stepG, stepJ]);
  R.sort((p, q) => p.id.localeCompare(q.id));
  for (const r of R) console.log(`  [${r.status}] ${r.id}. ${r.name} (${secs(r.ms)})${r.detail ? '\n      ' + r.detail : ''}`);
  const fails = R.filter(r => r.status === 'FAIL'), warns = R.filter(r => r.status === 'WARN');
  console.log(`gate: ${fails.length ? 'FAIL' : 'PASS'}: ${R.filter(r => r.status === 'PASS').length} passed, ${fails.length} failed${fails.length ? ' (' + fails.map(r => r.id).join(', ') + ')' : ''}, ${warns.length} warning${warns.length === 1 ? '' : 's'}; ${secs(Date.now() - t0)} in all`);
  if (fails.length) console.log('gate: library changes go through a tools/gen batch script; see CLAUDE.md and PROJECT_STATUS.md ("Library change workflow").');
  exitCode = fails.length ? 1 : 0;
} catch (e) {
  console.error('gate: error: ' + (e.stack || e.message)); exitCode = 2;
} finally { cleanup(); }
process.exit(exitCode);
