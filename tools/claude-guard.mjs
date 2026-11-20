// Claude Code PreToolUse hook (.claude/settings.json). Reads the hook's JSON on stdin; exit 2 with a reason on stderr blocks the tool call.
//   Edit / Write / NotebookEdit: blocks edits to the library (data/wordlist-en.project.json) and to the game export (data/export/*).
//   Bash / PowerShell: blocks a `git commit` that skips the pre-commit gate (--no-verify, -n, or a -c core.hooksPath override) while data/
//   has staged changes (or unstaged ones, which -a or pathspecs would commit).
// Anything else, and anything it cannot parse, is allowed (exit 0).
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const LIB_REASON = 'Blocked by tools/claude-guard.mjs: the library and the game export are never edited by hand. Library changes go through a tools/gen/batchNNN.mjs script (dry run, then --apply, rerun to 0 changes), approved by Simon; the export is regenerated with node tools/export-game.mjs. See CLAUDE.md.';
const COMMIT_REASON = 'Blocked by tools/claude-guard.mjs: this git commit skips the pre-commit library gate (--no-verify, -n or a core.hooksPath override) while data/ has changes. Run npm run gate and commit without skipping the hook. See CLAUDE.md.';
const block = r => { process.stderr.write(r + '\n'); process.exit(2); };

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => raw += d);
process.stdin.on('end', () => { try { main(JSON.parse(raw)); } catch { /* unsure: allow */ } process.exit(0); });

function main(h) {
  const tool = h.tool_name || '', inp = h.tool_input || {};
  if (/^(Edit|Write|MultiEdit|NotebookEdit)$/.test(tool)) {
    const f = inp.file_path || inp.notebook_path; if (!f) return;
    const p = path.resolve(h.cwd || process.cwd(), String(f)).replace(/\\/g, '/').toLowerCase();
    if (p.endsWith('/data/wordlist-en.project.json') || /\/data\/export\/[^/]+$/.test(p)) block(LIB_REASON);
    return;
  }
  if (tool === 'Bash' || tool === 'PowerShell') {
    const cmd = String(inp.command || '');
    if (!/\bcommit\b/.test(cmd) || !skipsHook(cmd)) return;
    if (dataChanged(h.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd())) block(COMMIT_REASON);
  }
}

// Words of a command line, split into simple commands at ; & | && || and newlines. Quotes are honoured roughly; good enough to find flags.
function commands(s) {
  const out = []; let cur = [], w = '', q = null, has = false;
  const endWord = () => { if (has) cur.push(w); w = ''; has = false; };
  const endCmd = () => { endWord(); if (cur.length) out.push(cur); cur = []; };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === q) q = null; else w += c; continue; }
    if (c === '"' || c === "'") { q = c; has = true; continue; }
    if (/\s/.test(c)) { if (c === '\n') endCmd(); else endWord(); continue; }
    if (c === ';' || c === '&' || c === '|' || c === '(' || c === ')' || c === '{' || c === '}') { endCmd(); continue; }
    w += c; has = true;
  }
  endCmd(); return out;
}

function skipsHook(cmd) {
  for (const words of commands(cmd)) {
    let i = words.findIndex(x => /(^|[\\/])git(\.exe)?$/i.test(x)); if (i < 0) continue;
    let override = false; i++;
    for (; i < words.length && words[i].startsWith('-'); i++) {   // git's own options before the subcommand
      const o = words[i];
      if (o === '-c') { if (/^core\.hookspath=/i.test(words[i + 1] || '')) override = true; i++; }
      else if (/^-c.+/.test(o)) { if (/^-ccore\.hookspath=/i.test(o)) override = true; }
      else if (/^--config-env=core\.hookspath/i.test(o)) override = true;
      else if (o === '-C' || o === '--git-dir' || o === '--work-tree' || o === '--namespace') i++;
    }
    if (words[i] !== 'commit') continue;
    if (override) return true;
    const LONG_ARG = /^--(message|file|author|date|template|reuse-message|reedit-message|fixup|squash|cleanup|trailer|pathspec-from-file|gpg-sign)$/;
    for (let j = i + 1; j < words.length; j++) {
      const o = words[j];
      if (o === '--') break;
      if (o === '--no-verify') return true;
      if (o.startsWith('--')) { if (LONG_ARG.test(o) && o !== '--gpg-sign') j++; continue; }
      if (o.startsWith('-') && o.length > 1) {
        for (let k = 1; k < o.length; k++) {
          const c = o[k];
          if (c === 'n') return true;
          if ('mFcCt'.includes(c)) { if (k === o.length - 1) j++; break; }   // the rest of the word, or the next word, is the value
        }
      }
    }
  }
  return false;
}

function dataChanged(cwd) {
  try {
    const g = a => execFileSync('git', a, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    const top = g(['rev-parse', '--show-toplevel']);
    return !!(g(['-C', top, 'diff', '--cached', '--name-only', '--', 'data/']) || g(['-C', top, 'diff', '--name-only', '--', 'data/']));
  } catch { return false; }
}
