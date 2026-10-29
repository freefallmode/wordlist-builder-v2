// The "All words" screen: every entry in the library in one sortable, filterable table.
import { h, select, plural } from './dom.js';
import { A } from './state.js';
import { linkIds } from './model.js';
import { editEntry } from './dialogs.js';

const PAGE = 200;
const S = { q: '', flag: '', rec: '', status: '', show: '', sort: 'text', dir: 1, page: 0 };

const FLAGS = [['', 'any flags'], ['adult', 'adult'], ['sensitive', 'sensitive'], ['tm', 'trademark'], ['vulgar', 'vulgar'], ['region', 'region-specific'], ['none', 'no flags']];
const SHOW = [['', 'all words'], ['on', 'enabled only'], ['off', 'disabled only'], ['roots', 'roots only'], ['alias', 'aliases only'], ['orphan', 'not in any theme']];
const STATUS = [['', 'any status'], ['new', 'new (by hand)'], ['gen', 'generated, not reviewed'], ['rev', 'reviewed']];

const flagList = e => ['adult', 'sensitive', 'tm', 'vulgar'].filter(k => e[k]);
const themeNames = (P, e) => linkIds(P, e).map(id => P.ix.theme.get(id)?.name).filter(Boolean);

function matches(P, e) {
  if (S.q) {
    const q = S.q.toLowerCase();
    if (!(e.text + ' ' + e.gloss).toLowerCase().includes(q) && !themeNames(P, e).some(n => n.toLowerCase().includes(q))) return false;
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
  const keys = {
    text: e => e.text.toLowerCase(), gloss: e => (e.gloss || '').toLowerCase(), pos: e => e.pos, type: e => e.type,
    rec: e => e.rec || 9, status: e => e.status, alias: e => (rootOf(e)?.text || '￿').toLowerCase(),
    themes: e => linkIds(P, e).length,
  };
  const key = keys[S.sort] || keys.text;
  const list = P.entries.filter(e => matches(P, e)).sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : a.id - b.id) * S.dir);
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  if (S.page >= pages) S.page = pages - 1;
  const rows = list.slice(S.page * PAGE, (S.page + 1) * PAGE);

  const th = (label, k) => h('th.sortable', { class: S.sort === k ? 'sorted' : '', title: 'Click to sort by ' + label,
    onclick: () => { S.dir = S.sort === k ? -S.dir : 1; S.sort = k; S.page = 0; A.render(); } }, label, h('span.sortmark', S.sort === k ? (S.dir > 0 ? ' ▲' : ' ▼') : ' ⇅'));
  const pick = (k, opts) => { const el = select(opts, S[k]); el.onchange = () => { S[k] = el.value; S.page = 0; A.render(); }; return el; };
  const recOpts = [['', 'any rating'], ...[1, 2, 3, 4, 5].map(n => [String(n), 'rating ' + n]), ['0', 'unrated']];
  const flagBadges = e => flagList(e).map(k => h('span.badge.' + (k === 'sensitive' ? 'sens' : k), { title: k }, k === 'tm' ? 'T' : k[0].toUpperCase()))
    .concat(e.region.length ? [h('span.badge.region', e.region.join('/'))] : []);
  const themesCell = e => { const n = themeNames(P, e); return n.length ? n.slice(0, 3).join(', ') + (n.length > 3 ? ` +${n.length - 3}` : '') : h('span.hint', '(none)'); };

  const pager = () => h('div.pager', {}, h('button', { disabled: S.page === 0, onclick: () => { S.page--; A.render(); } }, '‹ Prev'),
    h('span.hint', ` ${list.length ? S.page * PAGE + 1 : 0}–${Math.min(list.length, (S.page + 1) * PAGE)} of ${list.length.toLocaleString()} `),
    h('button', { disabled: S.page >= pages - 1, onclick: () => { S.page++; A.render(); } }, 'Next ›'));

  return [
    h('div.thead', {}, h('h1', {}, 'All words'),
      h('p.hint', `${plural(P.entries.length, 'entry')} in the library (${P.entries.filter(e => e.enabled).length.toLocaleString()} enabled). Click a heading to sort, click a word to edit it.`),
      h('div.actions', {}, h('button', { onclick: () => { A.view = null; A.render(); } }, '← Overview'))),
    h('div.tools.wrap', {},
      h('input.filter', { placeholder: 'filter by word, meaning or theme…', value: S.q, oninput: ev => { S.q = ev.target.value; S.page = 0; A.render(true); } }),
      pick('show', SHOW), pick('flag', FLAGS), pick('rec', recOpts), pick('status', STATUS)),
    pager(),
    h('div.awrap', {}, h('table.aw', {}, h('tr', {}, h('th.on', ''), th('Word', 'text'), th('Meaning', 'gloss'), th('pos', 'pos'), th('type', 'type'), th('rating', 'rec'),
      h('th', 'flags'), th('alias of', 'alias'), th('themes', 'themes'), th('status', 'status')),
      rows.length ? rows.map(e => h('tr', { class: [e.aliasOf ? 'alias' : '', e.enabled ? '' : 'off'].join(' ') },
        h('td.on', {}, h('input', { type: 'checkbox', checked: e.enabled, title: 'enabled', onchange: ev => { e.enabled = ev.target.checked; A.changed(); } })),
        h('td.word', { onclick: () => editEntry(e) }, e.text),
        h('td.dim', e.gloss || ''), h('td.dim', e.pos.slice(0, 3)), h('td.dim', e.type), h('td', e.rec || h('span.hint', '?')),
        h('td', flagBadges(e)), h('td.dim', rootOf(e) ? `${rootOf(e).text}${e.aliasKind ? ' · ' + e.aliasKind : ''}` : ''),
        h('td.dim', themesCell(e)), h('td', h('span.dot.' + e.status, { title: e.status }, e.status === 'rev' ? '✓' : e.status === 'gen' ? 'g' : '·')))) :
        h('tr', h('td', { colspan: 10, class: 'hint' }, 'No words match.')))),
    list.length > 40 && pager(),
  ].filter(Boolean);
}
