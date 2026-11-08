// The "All themes" screen: every theme and group in the library in one sortable, filterable table.
import { h, select, plural } from './dom.js';
import { A } from './state.js';
import { eff, pathOf, themeDifficulty } from './model.js';

const PAGE = 200;
const S = { q: '', show: '', sort: 'name', dir: 1, page: 0 };
const SHOW = [['', 'all themes'], ['play', 'playable themes'], ['group', 'groups'], ['adult', 'adult'], ['sensitive', 'sensitive'], ['tm', 'trademark'], ['lang', 'language-specific'], ['region', 'region-specific'],
  ['complete', 'complete sets'], ['off', 'disabled'], ['empty', 'with no words'], ['thin', 'with too few words']];

// c is the counts() of app.js (own = distinct words per playable theme, tot = words in the theme and its sub-themes, play / ready = playable themes below).
export function allThemesView(c, open) {
  const P = A.P, min = P.settings.minWords || 4;
  const own = t => (t.group ? 0 : c.own.get(t.id) || 0);
  const kids = t => (P.ix.kids.get(t.id) || []).length;
  const parentName = t => (t.parent && P.ix.theme.get(t.parent)?.name) || '';
  const flagsOf = t => { const ef = eff(P, t.id); return [ef.adult && 'A', ef.sensitive && 'S', ef.tm && 'T', ef.lang && 'L', t.complete && '✓'].filter(Boolean); };
  const keep = {
    play: t => !t.group, group: t => t.group, adult: t => eff(P, t.id).adult, sensitive: t => eff(P, t.id).sensitive, tm: t => eff(P, t.id).tm, lang: t => eff(P, t.id).lang,
    region: t => eff(P, t.id).region.length > 0, complete: t => t.complete, off: t => !eff(P, t.id).enabled, empty: t => !t.group && own(t) === 0, thin: t => !t.group && own(t) < min,
  }[S.show];
  const q = S.q.trim().toLowerCase();
  const keys = {
    name: t => t.name.toLowerCase(), parent: t => parentName(t).toLowerCase(), words: own, total: t => c.tot.get(t.id) || 0, subs: kids,
    diff: t => themeDifficulty(t) || 99, pop: t => t.pop || 99, ident: t => t.ident || 99, flags: t => flagsOf(t).join(''),
  };
  const key = keys[S.sort] || keys.name;
  const list = P.themes.filter(t => (!keep || keep(t)) && (!q || pathOf(P, t.id).join(' > ').toLowerCase().includes(q) || (t.note || '').toLowerCase().includes(q)))
    .sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : a.name.localeCompare(b.name)) * S.dir);
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  if (S.page >= pages) S.page = pages - 1;
  const rows = list.slice(S.page * PAGE, (S.page + 1) * PAGE);

  const th = (label, k, title) => h('th.sortable', { class: S.sort === k ? 'sorted' : '', title: title || 'Click to sort by ' + label,
    onclick: () => { S.dir = S.sort === k ? -S.dir : (k === 'words' || k === 'total' ? -1 : 1); S.sort = k; S.page = 0; A.render(); } }, label, h('span.sortmark', S.sort === k ? (S.dir > 0 ? ' ▲' : ' ▼') : ' ⇅'));
  const pick = el => { el.onchange = () => { S.show = el.value; S.page = 0; A.render(); }; return el; };
  const pager = () => h('div.pager', {}, h('button', { disabled: S.page === 0, onclick: () => { S.page--; A.render(); } }, '‹ Prev'),
    h('span.hint', ` ${list.length ? S.page * PAGE + 1 : 0}–${Math.min(list.length, (S.page + 1) * PAGE)} of ${list.length.toLocaleString()} `),
    h('button', { disabled: S.page >= pages - 1, onclick: () => { S.page++; A.render(); } }, 'Next ›'));
  const num = (n, bad) => h('td.num', { class: bad ? 'hint' : '' }, n);

  return [
    h('div.thead', {}, h('h1', {}, 'All themes'),
      h('p.hint', `${plural(P.themes.length, 'theme')} in the library (${P.themes.filter(t => !t.group).length.toLocaleString()} playable, the rest groups). Click a heading to sort, click a theme to open it.`),
      h('div.actions', {}, h('button', { onclick: () => { A.view = null; A.render(); } }, '← Overview'))),
    h('div.tools.wrap', {},
      h('input.filter', { placeholder: 'filter by name, path or note…', value: S.q, oninput: ev => { S.q = ev.target.value; S.page = 0; A.render(true); } }),
      pick(select(SHOW, S.show))),
    pager(),
    h('div.awrap', {}, h('table.aw.ath', {}, h('tr', {}, th('theme', 'name'), th('parent', 'parent'), th('words', 'words', 'Distinct words in the theme itself'), th('with sub-themes', 'total', 'Distinct words in the theme and its sub-themes'),
      th('subs', 'subs', 'Direct sub-themes'), th('difficulty', 'diff', 'Worked out from identifiability and popularity (1 easiest, 5 hardest)'), th('pop', 'pop', 'Popularity (1 most popular)'), th('ident', 'ident', 'Identifiability (1 obvious, 5 obscure)'), th('flags', 'flags')),
      rows.length ? rows.map(t => h('tr.clickable', { class: [t.group ? 'group' : '', eff(P, t.id).enabled ? '' : 'off'].join(' '), title: pathOf(P, t.id).join(' > '), onclick: () => open(t.id) },
        h('td.word', {}, t.name, t.group && h('span.tag', 'group')),
        h('td.dim', parentName(t)),
        t.group ? h('td.num') : num(own(t), own(t) < min),
        h('td.num', c.tot.get(t.id) || ''), h('td.num', kids(t) || ''),
        h('td.num', themeDifficulty(t) ? themeDifficulty(t).toFixed(1) : ''), h('td.num', t.pop || ''), h('td.num', t.ident || ''),
        h('td', flagsOf(t).join(' ')))) :
        h('tr', h('td', { colspan: 9, class: 'hint' }, 'No themes match.')))),
    list.length > 40 && pager(),
  ].filter(Boolean);
}
