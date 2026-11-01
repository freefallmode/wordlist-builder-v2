// The "All words" screen: every entry in the library in one sortable, filterable table.
import { h, select, plural } from './dom.js';
import { A } from './state.js';
import { linkIds, flagKey } from './model.js';
import { editEntry } from './dialogs.js';

const PAGE = 200;
const S = { q: '', in: 'wordalias', flag: '', rec: '', status: '', show: '', sort: 'text', dir: 1, page: 0 };

const SCOPE = [['wordalias', 'search word or alias'], ['word', 'search the word'], ['alias', 'search the alias'], ['meaning', 'search the meaning'], ['theme', 'search the themes'], ['any', 'search everything']];
const FLAGS = [['', 'any flags'], ['adult', 'adult'], ['sensitive', 'sensitive'], ['tm', 'trademark'], ['vulgar', 'vulgar'], ['region', 'region-specific'], ['none', 'no flags']];
const SHOW = [['', 'all words'], ['on', 'enabled only'], ['off', 'disabled only'], ['roots', 'roots only'], ['alias', 'aliases only'], ['orphan', 'not in any theme']];
const STATUS = [['', 'any status'], ['new', 'new (by hand)'], ['gen', 'generated, not reviewed'], ['rev', 'reviewed']];

// Column widths: every column but "themes" has a width (the default below, or one set by dragging the edge of its heading; double-click fits it to its text,
// shift + double-click goes back to the default). "themes" takes the space that is left, so the table fits the screen and only that column loses text. Widths are kept in the browser.
const COLS = { on: 28, text: 150, gloss: 130, aliases: 170, aliasof: 130, themes: 0, pos: 82, type: 76, rec: 76, flags: 0, status: 80 };
const MIN_THEMES = 12;
let FLAGS_W = 54, W = {};
try { W = JSON.parse(localStorage.getItem('awCols') || '{}') || {}; } catch { W = {}; }
const saveW = () => { try { localStorage.setItem('awCols', JSON.stringify(W)); } catch { /* storage unavailable */ } };
const colW = k => W[k] || (k === 'flags' ? FLAGS_W : COLS[k]) || 0;
const tableMin = () => Object.keys(COLS).reduce((n, k) => n + (k === 'themes' ? (W.themes || MIN_THEMES) : colW(k)), 0);
function colGrip(k, thEl) {
  const w = colW(k);
  if (w) thEl.style.width = w + 'px';
  const tbl = () => thEl.closest('table'), apply = px => { thEl.style.width = px + 'px'; if (tbl()) tbl().style.minWidth = tableMin() + 'px'; };
  thEl.append(h('span.colgrip', { title: 'Drag to change the width; double-click to fit the text; shift + double-click for the default',
    onclick: ev => ev.stopPropagation(),
    ondblclick: ev => {
      ev.stopPropagation();
      if (ev.shiftKey) { delete W[k]; saveW(); A.render(true); return; }
      const t = tbl(), i = thEl.cellIndex;
      let fit = thEl.scrollWidth;
      for (const r of t.rows) { const c = r.cells[i]; if (c && r.cells.length > 4) fit = Math.max(fit, c.scrollWidth); }
      W[k] = Math.max(24, Math.min(700, Math.ceil(fit) + 2)); saveW(); apply(W[k]);
    },
    onmousedown: ev => {
      ev.preventDefault(); ev.stopPropagation();
      const x0 = ev.clientX, w0 = thEl.getBoundingClientRect().width; let px = w0;
      const move = e => { px = Math.max(24, Math.min(700, Math.round(w0 + e.clientX - x0))); W[k] = px; apply(px); };
      const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); saveW(); };
      document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    } }));
  return thEl;
}

const flagList = e => ['adult', 'sensitive', 'tm', 'vulgar'].filter(k => e[k]);
const themeNames = (P, e) => linkIds(P, e).map(id => P.ix.theme.get(id)?.name).filter(Boolean);

// The other names of an entry: the aliases that point at it (and, for an alias, the word it is an alias of).
function otherNames(P, e, aliasesOf) { const r = e.aliasOf && P.ix.entry.get(e.aliasOf); return (aliasesOf.get(e.id) || []).map(a => a.text).concat(r ? [r.text] : []); }

function matches(P, e, aliasesOf) {
  if (S.q) {
    const q = S.q.toLowerCase();
    const inWord = () => e.text.toLowerCase().includes(q), inMeaning = () => (e.gloss || '').toLowerCase().includes(q), inTheme = () => themeNames(P, e).some(n => n.toLowerCase().includes(q)), inAlias = () => otherNames(P, e, aliasesOf).some(n => n.toLowerCase().includes(q));
    if (!(S.in === 'word' ? inWord() : S.in === 'alias' ? inAlias() : S.in === 'wordalias' ? inWord() || inAlias() : S.in === 'meaning' ? inMeaning() : S.in === 'theme' ? inTheme() : inWord() || inAlias() || inMeaning() || inTheme())) return false;
  }
  if (S.flag === 'region' ? !e.region.length : S.flag === 'none' ? (flagList(e).length || e.region.length) : S.flag && !e[S.flag]) return false;
  if (S.rec !== '' && e.rec !== +S.rec) return false;
  if (S.status && e.status !== S.status) return false;
  switch (S.show) {
    case 'on': return e.enabled;
    case 'off': return !e.enabled;
    case 'roots': return !e.aliasOf;
    case 'alias': return !!e.aliasOf;
    case 'orphan': return !e.aliasOf && !Object.keys(e.th).length;
  }
  return true;
}

export function allWordsView() {
  const P = A.P;
  const rootOf = e => e.aliasOf && P.ix.entry.get(e.aliasOf);
  const aliasesOf = new Map();
  for (const a of P.entries) if (a.aliasOf) { if (!aliasesOf.has(a.aliasOf)) aliasesOf.set(a.aliasOf, []); aliasesOf.get(a.aliasOf).push(a); }
  const keys = {
    text: e => e.text.toLowerCase(), gloss: e => (e.gloss || '').toLowerCase(), pos: e => e.pos, type: e => e.type,
    rec: e => e.rec || 9, status: e => e.status, flags: flagKey, alias: e => (rootOf(e)?.text || '￿').toLowerCase(),
    themes: e => linkIds(P, e).length, aliases: e => (aliasesOf.get(e.id)?.[0]?.text || '￿').toLowerCase(),
  };
  const key = keys[S.sort] || keys.text;
  const list = P.entries.filter(e => matches(P, e, aliasesOf)).sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : a.id - b.id) * S.dir);
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  if (S.page >= pages) S.page = pages - 1;
  const rows = list.slice(S.page * PAGE, (S.page + 1) * PAGE);

  const flagWidth0 = Math.max(54, ...rows.map(e => 16 + flagList(e).length * 22 + (e.region.length ? 14 + e.region.join('/').length * 7 : 0)));   // the flags column fits the widest row on the page
  FLAGS_W = flagWidth0;
  const th = (label, k, col) => colGrip(col, h('th.sortable', { class: S.sort === k ? 'sorted' : '', title: 'Click to sort by ' + label,
    onclick: () => { S.dir = S.sort === k ? -S.dir : 1; S.sort = k; S.page = 0; A.render(); } }, label, h('span.sortmark', S.sort === k ? (S.dir > 0 ? ' ▲' : ' ▼') : ' ⇅')));
  const pick = (k, opts) => { const el = select(opts, S[k]); el.onchange = () => { S[k] = el.value; S.page = 0; A.render(); }; return el; };
  const recOpts = [['', 'any rating'], ...[1, 2, 3, 4, 5].map(n => [String(n), 'rating ' + n]), ['0', 'unrated']];
  const flagBadges = e => flagList(e).map(k => h('span.badge.' + (k === 'sensitive' ? 'sens' : k), { title: k }, k === 'tm' ? 'T' : k[0].toUpperCase()))
    .concat(e.region.length ? [h('span.badge.region', e.region.join('/'))] : []);
  const aliasCell = e => { const as = aliasesOf.get(e.id) || []; return as.length ? h('span', { title: as.map(a => a.text + (a.aliasKind ? ' (' + a.aliasKind + ')' : '')).join(', ') }, as.map(a => a.text).join(', ')) : ''; };
  const themesCell = e => { const n = themeNames(P, e); return n.length ? n.slice(0, 3).join(', ') + (n.length > 3 ? ` +${n.length - 3}` : '') : h('span.hint', '(none)'); };

  const pager = () => h('div.pager', {}, h('button', { disabled: S.page === 0, onclick: () => { S.page--; A.render(); } }, '‹ Prev'),
    h('span.hint', ` ${list.length ? S.page * PAGE + 1 : 0}–${Math.min(list.length, (S.page + 1) * PAGE)} of ${list.length.toLocaleString()} `),
    h('button', { disabled: S.page >= pages - 1, onclick: () => { S.page++; A.render(); } }, 'Next ›'));

  return [
    h('div.thead', {}, h('h1', {}, 'All words'),
      h('p.hint', `${plural(P.entries.length, 'entry')} in the library (${P.entries.filter(e => e.enabled).length.toLocaleString()} enabled). Click a heading to sort, click a word to edit it.`),
      h('div.actions', {}, h('button', { onclick: () => { A.view = null; A.render(); } }, '← Overview'))),
    h('div.tools.wrap', {},
      h('input.filter', { placeholder: 'filter…', value: S.q, oninput: ev => { S.q = ev.target.value; S.page = 0; A.render(true); } }),
      pick('in', SCOPE), pick('show', SHOW), pick('flag', FLAGS), pick('rec', recOpts), pick('status', STATUS)),
    pager(),
    h('div.awrap', {}, h('table.aw', { style: 'min-width:' + tableMin() + 'px' }, h('tr', {}, colGrip('on', h('th.on', '')), th('Word', 'text', 'text'), th('Meaning', 'gloss', 'gloss'), th('aliases', 'aliases', 'aliases'), th('alias of', 'alias', 'aliasof'), th('themes', 'themes', 'themes'), th('pos', 'pos', 'pos'), th('type', 'type', 'type'), th('rating', 'rec', 'rec'),
      th('flags', 'flags', 'flags'), th('status', 'status', 'status')),
      rows.length ? rows.map(e => h('tr', { class: [e.aliasOf ? 'alias' : '', e.enabled ? '' : 'off'].join(' ') },
        h('td.on', {}, h('input', { type: 'checkbox', checked: e.enabled, title: 'enabled', onchange: ev => { e.enabled = ev.target.checked; A.changed(); } })),
        h('td.word', { onclick: () => editEntry(e) }, e.text),
        h('td.dim', e.gloss || ''), h('td.dim', aliasCell(e)), h('td.dim', rootOf(e) ? `${rootOf(e).text}${e.aliasKind ? ' · ' + e.aliasKind : ''}` : ''),
        h('td.dim', themesCell(e)), h('td.dim', e.pos), h('td.dim', e.type), h('td', e.rec || h('span.hint', '?')),
        h('td', flagBadges(e)), h('td', h('span.dot.' + e.status, { title: e.status }, e.status === 'rev' ? '✓' : e.status === 'gen' ? 'g' : '·')))) :
        h('tr', h('td', { colspan: 11, class: 'hint' }, 'No words match.')))),
    list.length > 40 && pager(),
  ].filter(Boolean);
}
