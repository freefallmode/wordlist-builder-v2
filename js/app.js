// App shell: loading, the theme tree, the theme view, file actions.
import { h, $, select, dialog, toast, debounce, plural } from './dom.js';
import { A } from './state.js';
import { parseOutline, formatOutline } from './outline.js';
import { flagKey, linkIds, placeTheme, deleteTheme, newProject, reindex, eff, themeStats, themeProfile, dialectMember, themeLocked, effRec, popIn, pathOf, descendants, sortDepthFirst, nowStamp, REC_HELP } from './model.js';
import { loadLocal, saveLocal, serializeProject, parseProject, download, pickFile, stampSave } from './store.js';
import { loadFreq } from './freq.js';
import { editTheme, addTheme, editEntry, bulkAdd, generate, showValidation, showExport, showSettings, openPath } from './dialogs.js';
import { isAncestor } from './model.js';
import { allWordsView } from './allwords.js';
import { entryDefaults } from './model.js';

const VERSION = '2';

// ---------- change handling ----------

let savedAt = '';
const autosave = debounce(async () => {
  try { await saveLocal(A.P); savedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { savedAt = 'failed'; }
  renderStatus();
}, 700);

A.changed = () => { reindex(A.P); A.dirty = true; autosave(); render(); };
A.render = keep => render(keep);

function renderStatus() {
  $('#save').textContent = (A.dirty ? 'Unsaved to file · ' : 'File saved · ') + (savedAt === 'failed' ? 'autosave failed' : savedAt ? 'autosaved ' + savedAt : '');
  const P = A.P, themes = P.themes.filter(t => !t.group).length;
  $('#lib').textContent = `library v${P.lib.version} · ${P.lib.modified} · ${themes.toLocaleString()} themes · ${P.entries.length.toLocaleString()} words (${P.entries.filter(e => e.enabled).length.toLocaleString()} enabled)`;
}

// ---------- tree ----------

function counts() {
  const P = A.P, own = new Map(), tot = new Map(), ready = new Map(), play = new Map();
  const min = P.settings.minWords || 4;
  for (const t of P.themes) if (!t.group) own.set(t.id, themeStats(P, t.id).roots);
  const sum = id => {
    const t = P.ix.theme.get(id);
    let n = t.group ? 0 : own.get(id), r = !t.group && own.get(id) >= min ? 1 : 0, p = t.group ? 0 : 1;
    for (const k of P.ix.kids.get(id) || []) { const c = sum(k.id); n += c[0]; r += c[1]; p += c[2]; }
    tot.set(id, n); ready.set(id, r); play.set(id, p);
    return [n, r, p];
  };
  for (const t of P.ix.kids.get('') || []) sum(t.id);
  return { own, tot, ready, play };
}

function badges(t) {
  const ef = eff(A.P, t.id), b = [];
  const add = (txt, cls, title) => b.push(h('span.badge.' + cls, { title }, txt));
  if (t.complete) add('✓', 'complete', 'Complete set');
  if (ef.adult) add('A', 'adult', 'Adult' + (t.adult ? '' : ' (inherited)'));
  if (ef.sensitive) add('S', 'sens', 'Sensitive' + (t.sensitive ? '' : ' (inherited)'));
  if (ef.tm) add('T', 'tm', 'Trademark' + (t.tm ? '' : ' (inherited)'));
  if (ef.lang) add('L', 'lang', 'Language-specific' + (t.lang ? '' : ' (inherited)'));
  if (ef.region.length) add(ef.region.join('/'), 'region', 'Region-specific');
  return b;
}

function rowButtons(t) {
  const btn = (label, title, fn) => h('button.rb', { title, onclick: ev => { ev.stopPropagation(); fn(); } }, label);
  return h('span.acts', {},
    btn('+', 'Add a sub-theme', () => addTheme(t.id)),
    btn('✎', 'Rename', () => renameTheme(t)),
    btn('🗑', 'Delete', () => {
      if (!confirm(`Delete "${t.name}"? Its sub-themes move up a level and words stay but lose this link.`)) return;
      deleteTheme(A.P, t.id); if (A.sel === t.id) A.sel = t.parent; A.changed();
    }));
}

function renameTheme(t) {
  const input = h('input', { value: t.name });
  dialog('Rename theme', h('div.form', {}, input), [
    { label: 'Cancel' },
    { label: 'Rename', primary: true, action: () => {
      const name = input.value.trim();
      if (!name) throw Error('A theme needs a name.');
      if (A.P.themes.some(x => x !== t && x.name.toLowerCase() === name.toLowerCase())) throw Error('Another theme already has this name.');
      t.name = name; A.changed();
    } },
  ]);
  setTimeout(() => { input.focus(); input.select(); }, 30);
}

function setLock(on) {
  A.unlock = on;
  try { localStorage.setItem('wlb2-unlock', on ? '1' : ''); } catch {}
  const b = $('#btn-lock');
  b.textContent = on ? '🔓' : '🔒';
  b.title = on ? 'Dragging themes is on: drop on a theme to nest it, near a row edge to reorder. Click to lock.' : 'Dragging themes is off. Click to unlock.';
  renderTree();
}

// Dragging themes in the tree (only while unlocked).
let drag = null;
const zone = e => e.target.closest && e.target.closest('#tree [data-id], #tree [data-root]');
const where = (e, r) => { if (r.dataset.root) return 'root'; const b = r.getBoundingClientRect(), y = (e.clientY - b.top) / b.height; return y < .28 ? 'before' : y > .72 ? 'after' : 'in'; };
const clearZones = () => document.querySelectorAll('.dz, .dzt, .dzb').forEach(n => n.classList.remove('dz', 'dzt', 'dzb'));
function canDrop(id, r, w) {
  if (!id) return false;
  const tid = r.dataset.id || null;
  if (id === tid) return false;
  const target = tid && A.P.ix.theme.get(tid);
  const parent = w === 'root' ? null : w === 'in' ? tid : target.parent;
  return !(parent && isAncestor(A.P, id, parent));
}
document.addEventListener('dragstart', e => {
  const r = e.target.closest && e.target.closest('#tree [data-id]'); if (!r || !A.unlock) return;
  drag = r.dataset.id; e.dataTransfer.setData('text/plain', drag); e.dataTransfer.effectAllowed = 'move';
});
document.addEventListener('dragover', e => {
  const r = zone(e); if (!drag || !r) return;
  const w = where(e, r); clearZones();
  if (canDrop(drag, r, w)) { e.preventDefault(); r.classList.add(w === 'before' ? 'dzt' : w === 'after' ? 'dzb' : 'dz'); }
});
document.addEventListener('dragleave', e => { const r = zone(e); if (r) r.classList.remove('dz', 'dzt', 'dzb'); });
document.addEventListener('drop', e => {
  const r = zone(e); if (!drag || !r) return;
  e.preventDefault();
  const w = where(e, r);
  if (canDrop(drag, r, w) && placeTheme(A.P, drag, r.dataset.id || null, w)) {
    if (w === 'in') A.open.add(r.dataset.id);
    A.changed();
  }
  drag = null; clearZones();
});
document.addEventListener('dragend', () => { drag = null; clearZones(); });

const searchOpen = { themes: true, words: true };

// Tree filter (the select above the tree): themes with a flag, set on them or inherited from a parent, plus their parents for context.
const THEME_FILTERS = [
  ['', 'All themes'],
  ['off', 'Disabled themes', (P, t, ef) => !ef.enabled],
  ['group', 'Groups (folders)', (P, t) => t.group],
  ['complete', 'Complete sets', (P, t) => t.complete],
  ['adult', 'Adult themes', (P, t, ef) => ef.adult],
  ['sensitive', 'Sensitive themes', (P, t, ef) => ef.sensitive],
  ['tm', 'Trademark / copyright themes', (P, t, ef) => ef.tm],
  ['lang', 'Language-specific themes', (P, t, ef) => ef.lang],
  ['region', 'Region-specific themes', (P, t, ef) => ef.region.length > 0],
  ['locked', 'Locked words (no substitution)', (P, t) => !t.group && themeLocked(P, t)],
  ['pop', 'Popularity…'],
  ['ident', 'Identifiability…'],
  ['diff', 'Difficulty…'],
];
// The "Popularity…" and "Difficulty…" choices open a second select for the level.
let profMemo = null;   // while counting, each theme's profile is worked out once
const prof = (P, t) => profMemo ? (profMemo.get(t.id) || profMemo.set(t.id, themeProfile(P, t.id)).get(t.id)) : themeProfile(P, t.id);
const LEVEL_FILTERS = {
  pop: [['0', 'not rated', (P, t) => !t.pop], ...[1, 2, 3, 4, 5].map(n => [String(n), String(n) + (n === 1 ? ' (most popular)' : n === 5 ? ' (least popular)' : ''), (P, t) => t.pop === n])],
  ident: [['0', 'not rated', (P, t) => !t.ident], ...[1, 2, 3, 4, 5].map(n => [String(n), String(n) + (n === 1 ? ' (obvious)' : n === 5 ? ' (obscure)' : ''), (P, t) => t.ident === n])],
  diff: [["0", "too few words to fill a set", (P, t) => !prof(P, t).lo],   // can serve a level: the 4th easiest and 4th hardest words straddle it
    ...[1, 2, 3, 4, 5].map(n => [String(n), 'can serve ' + n + (n === 1 ? ' (easiest)' : n === 5 ? ' (hardest)' : ''), (P, t) => { const p = prof(P, t); return p.lo > 0 && p.lo <= n && n <= p.hi; }])],
};
function filterVisible() {
  const lv = LEVEL_FILTERS[A.tflag]?.find(x => x[0] === A.tlevel)?.[2];
  const f = lv ? (P, t, ef) => !t.group && lv(P, t, ef) : THEME_FILTERS.find(x => x[0] === A.tflag)?.[2];
  if (!f) return null;
  const P = A.P, vis = new Set(), hit = new Set();
  for (const t of P.themes) if (f(P, t, eff(P, t.id))) { hit.add(t.id); for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) vis.add(x.id); }
  vis.hits = hit.size; vis.hit = hit;
  return vis;
}
// Search ranking: exact match first, then names starting with the text, then whole-word matches, then other substrings; shorter names first within each rank.
const searchRank = (name, q) => { const n = name.toLowerCase(), i = n.indexOf(q); if (i < 0) return -1; if (n === q) return 0; if (i === 0) return 1;
  for (let j = i; j >= 0; j = n.indexOf(q, j + 1)) if (!/[a-z0-9]/.test(n[j - 1] || ' ') && !/[a-z0-9]/.test(n[j + q.length] || ' ')) return 2; return 3; };
const ranked = (items, nameOf, q, cap) => { const hits = []; for (const it of items) { const r = searchRank(nameOf(it), q); if (r >= 0) hits.push([r, nameOf(it).length, nameOf(it).toLowerCase(), it]); }
  hits.sort((a, b) => a[0] - b[0] || a[1] - b[1] || (a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0)); return { total: hits.length, list: hits.slice(0, cap).map(x => x[3]) }; };
function renderTree() {
  const P = A.P, box = $('#tree'), q = A.search.trim().toLowerCase();
  if (q) {
    const only = filterVisible();   // the filter above the tree narrows the search too: only matching themes, and words in them
    const tr = ranked(only ? P.themes.filter(t => only.hit.has(t.id)) : P.themes, t => t.name, q, 60), themes = tr.list;
    const wr = q.length < 2 ? { total: 0, list: [] } : ranked(only ? P.entries.filter(e => linkIds(P, e).some(id => only.hit.has(id))) : P.entries, e => e.text, q, 60), words = wr.list;
    const sect = (key, title, hits) => [
      h('div.sechead.fold', { onclick: () => { searchOpen[key] = !searchOpen[key]; renderTree(); } }, (searchOpen[key] ? '▾ ' : '▸ ') + title),
      ...(searchOpen[key] ? hits : [])];
    box.replaceChildren(...[
      only && h('div.sechead', `Only the ${plural(only.hit.size, 'theme')} matching the filter`),
      sect('themes', `Themes (${tr.total > themes.length ? themes.length + ' of ' + tr.total : themes.length})`,
        themes.map(t => h('div.hit', { onclick: () => select_(t.id) }, h('b', t.name), h('span.path', pathOf(P, t.id).slice(0, -1).join(' › '))))),
      sect('words', `Words (${wr.total > words.length ? words.length + ' of ' + wr.total : words.length})`,
        words.map(e => h('div.hit', { onclick: () => editEntry(e) }, h('b', e.text), e.gloss && h('span.path', e.gloss),
          h('span.path', Object.keys(e.th).slice(0, 3).map(id => P.ix.theme.get(id)?.name).filter(Boolean).join(', '))))),
    ].flat().filter(Boolean));
    return;
  }
  const c = counts(), min = P.settings.minWords || 4, frag = document.createDocumentFragment(), vis = filterVisible();
  if (vis) frag.append(h('div.sechead', `${plural(vis.hits, 'theme')} match`));
  const walk = (key, depth) => {
    for (const t of (P.ix.kids.get(key) || []).filter(k => !vis || vis.has(k.id))) {
      const kids = (P.ix.kids.get(t.id) || []).filter(k => !vis || vis.has(k.id)), open = vis ? true : A.open.has(t.id), off = !eff(P, t.id).enabled;
      const n = t.group ? null : c.own.get(t.id);
      frag.append(h('div.node', { class: [t.group ? 'group' : '', A.sel === t.id ? 'sel' : '', off ? 'off' : '', !t.group && n === 0 ? 'empty' : '', !t.group && n > 0 && n < min ? 'thin' : ''].join(' '),
        style: `padding-left:${6 + depth * 14}px`, 'data-id': t.id, onclick: () => select_(t.id) },
        h('span.tog', { onclick: ev => { ev.stopPropagation(); open ? A.open.delete(t.id) : A.open.add(t.id); renderTree(); } }, kids.length ? (open ? '▾' : '▸') : ''),
        h('span.nm', t.name), badges(t), rowButtons(t),
        h('span.cnt', { title: t.group || kids.length ? `${c.ready.get(t.id)} of ${c.play.get(t.id)} themes have ${min}+ words` : '' },
          t.group ? `${c.ready.get(t.id)}/${c.play.get(t.id)}` : kids.length ? `${n} · ${c.ready.get(t.id) - (n >= min ? 1 : 0)}/${c.play.get(t.id) - 1}` : n)));
      if (A.unlock) frag.lastChild.draggable = true;
      if (open) walk(t.id, depth + 1);
    }
  };
  walk('', 0);
  if (A.unlock) frag.append(h('div.dropRoot', { 'data-root': '1' }, 'Drop here to make top level'));
  box.replaceChildren(frag);
}

function select_(id) {
  if (A.sel === id && !A.filter) { A.sel = null; render(); return; }
  A.sel = id; openPath(id); A.filter = '';
  if ((A.P.ix.kids.get(id) || []).length) A.open.add(id);
  render();
}

// ---------- main pane ----------

const RECCLASS = ['r0', 'r1', 'r2', 'r3', 'r4', 'r5'];
const themeBadge = (P, t) => { const p = themeProfile(P, t.id); return p.reach ? h('span.badge.d', { title: `Worked out from the words: the difficulty range in which the theme can fill a 4-word set. Roots at difficulty 1-5: ${p.counts.slice(1).join(' / ')}` }, (() => { const d = p.lo ? [p.lo, p.hi] : [1, 2, 3, 4, 5].filter(n => p.counts[n]); return `difficulty ${d[0]}–${d[d.length - 1]}`; })()) : null; };
const recSel = (value, onchange, auto = false) => select([[0, auto ? 'auto' : '–'], 1, 2, 3, 4, 5], value, { class: 'rs ' + RECCLASS[value], onchange });

function overview() {
  const P = A.P, c = counts(), min = P.settings.minWords || 4;
  const tops = P.ix.kids.get('') || [];
  const playable = P.themes.filter(t => !t.group && eff(P, t.id).enabled).length;
  const ready = [...c.own].filter(([id, n]) => n >= min && eff(P, id).enabled).length;
  return h('div.overview', {},
    h('h1', 'Wordlist builder'),
    h('p', {}, `${plural(P.entries.length, 'entry')} · ${plural(playable, 'playable theme')} · ${ready.toLocaleString()} with ${min}+ words · language: ${P.lang}`),
    h('div.actions', {}, h('button', { onclick: () => { A.view = 'words'; render(); } }, 'All words…')),
    h('p.hint', 'Pick a theme on the left. Add words by hand, paste a list, or generate with Claude (Settings → API key). The checks button finds problems; Export writes the game file.'),
    h('table.ov', {}, h('tr', {}, h('th', 'Group'), h('th', 'Themes'), h('th', `With ${min}+ words`), h('th', 'Words')),
      tops.map(t => h('tr.clickable', { onclick: () => select_(t.id) }, h('td', t.name), h('td', c.play.get(t.id)), h('td', c.ready.get(t.id)), h('td', c.tot.get(t.id))))));
}

function bandBar(st) {
  const total = st.entries || 1;
  return h('div.bands', {}, [1, 2, 3, 4, 5, 0].map(b => h('div.band.r' + b, { style: `flex:${Math.max(st.bands[b], 0)} 0 auto`, title: `${REC_HELP[b]}: ${st.bands[b]} entries (${st.rootBands[b]} distinct)` },
    h('span', {}, b ? b : '?'), h('b', st.bands[b]))));
}

function themeView(t) {
  const P = A.P, ef = eff(P, t.id), st = themeStats(P, t.id), min = P.settings.minWords || 4;
  const kids = P.ix.kids.get(t.id) || [];
  const path = pathOf(P, t.id);
  const head = h('div.thead', {},
    h('div.crumbs', {}, h('a', { href: '#', onclick: ev => { ev.preventDefault(); A.sel = null; A.view = null; render(); } }, 'Overview › '), path.slice(0, -1).map((n, i) => h('a', { href: '#', onclick: ev => { ev.preventDefault(); select_(P.ix.theme.get(pathIds(t.id)[i]).id); } }, n + ' › '))),
    h('div.titlebar', {}, h('div.titleleft', {}, h('h1', {}, t.name, t.group && h('span.tag', 'group'), !ef.enabled && h('span.tag.off', 'disabled')), h('div.chips', {}, badges(t), t.pop ? h('span.badge.d', { title: 'Theme popularity (1 most popular)' }, 'popularity ' + t.pop) : h('span.badge.d0', 'popularity not rated'), t.ident ? h('span.badge.d', { title: 'Identifiability (1 obvious, 5 obscure)' }, 'identifiability ' + t.ident) : h('span.badge.d0', 'identifiability not rated'),!t.group && themeBadge(A.P, t))),
      h('div.actions', {}, h('button', { onclick: () => editTheme(t) }, 'Theme settings…'), h('button', { onclick: () => addTheme(t.id) }, '+ Sub-theme'),
      !t.group && h('button', { onclick: () => bulkAdd(t.id) }, '+ Add words…'), !t.group && h('button.primary', { onclick: () => generate(t.id) }, 'Generate with Claude…'))),
    t.note && h('p.note', t.note));
  const parts = [head];
  if (t.group) { if (!kids.length) parts.push(h('p.hint', 'This group is empty. Add a sub-theme.')); else parts.push(entryTable(t)); return parts; }

  const status = st.roots >= min ? h('span.ok', `${st.roots} distinct words ✓`) : h('span.bad', `${st.roots} of ${min} needed`);
  parts.push(h('div.poolbar', {}, status, h('span.hint', ` · ${plural(st.entries, 'entry')} · pool depth by difficulty:`), bandBar(st),
    t.complete && h('span.hint', ' · complete set: the list must be every member')));
  parts.push(entryTable(t));
  return parts;
}

function pathIds(id) { const out = []; let t = A.P.ix.theme.get(id); while (t) { out.unshift(t.id); t = t.parent && A.P.ix.theme.get(t.parent); } return out; }

const SUB_CAP = 500;
// The word column's width is adjustable (drag the edge of its heading, double-click to reset); the synonyms column takes whatever space is left. The width is remembered in the browser.
const WORD_W = 230, wordWidth = w => document.documentElement.style.setProperty('--wordw', w + 'px');
try { const w = +localStorage.getItem('wordColW'); if (w >= 80) wordWidth(w); } catch { /* storage unavailable: the default width stays */ }
function wordHead(thEl) {
  thEl.append(h('span.colgrip', { title: 'Drag to change the width of the word column; double-click to reset',
    onclick: ev => ev.stopPropagation(),
    ondblclick: ev => { ev.stopPropagation(); wordWidth(WORD_W); try { localStorage.removeItem('wordColW'); } catch { /* ignore */ } },
    onmousedown: ev => {
      ev.preventDefault(); ev.stopPropagation();
      const x0 = ev.clientX, w0 = thEl.getBoundingClientRect().width; let w = w0;
      const move = e => { w = Math.max(80, Math.min(700, w0 + e.clientX - x0)); wordWidth(w); };
      const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); try { localStorage.setItem('wordColW', String(Math.round(w))); } catch { /* ignore */ } };
      document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
    } }));
  return thEl;
}
function entryTable(t) {
  const P = A.P, sub = !!A.showSub;
  // With "sub-themes" on, the table holds the words of this theme and of every theme below it (each word once).
  const subIds = new Set([t.id, ...descendants(P, t.id).map(x => x.id)]);
  const pool = sub ? [...new Map([...subIds].flatMap(id => P.ix.byTheme.get(id) || []).map(e => [e.id, e])).values()] : (P.ix.byTheme.get(t.id) || []);
  const tools = h('div.tools', {}, h('input.filter', { placeholder: 'filter words…', value: A.filter, oninput: ev => { A.filter = ev.target.value; render(true); } }),
    h('label.chk', {}, h('input', { type: 'checkbox', checked: A.showOff, onchange: ev => { A.showOff = ev.target.checked; render(); } }), ' show disabled'),
    h('label.chk', { title: 'Also list the words of every sub-theme' }, h('input', { type: 'checkbox', checked: sub, onchange: ev => { A.showSub = ev.target.checked; render(); } }), ' show words in sub-themes'));
  if (t.group && !sub) return h('div.etable', {}, tools);
  const formsOf = new Map();   // a word's forms (rainy for rain) are not rows of their own: the row shows the form this theme uses, with the root after an arrow
  for (const a of P.entries) if (a.aliasKind === 'form' && a.aliasOf) { if (!formsOf.has(a.aliasOf)) formsOf.set(a.aliasOf, []); formsOf.get(a.aliasOf).push(a); }
  const shown = e => (!e.aliasOf && P.ix.entry.get(e.use?.[t.id])) || e;
  const own = e => e.th[t.id] !== undefined;   // an alias linked in this theme on its own is a word of the theme like any other (public house in ___ house); otherwise it only sits under its root
  const dm = e => themeLocked(P, t) ? e : dialectMember(P, e);   // a locked theme shows exactly the linked word, whatever the library's dialect
  const label = e => ((!e.aliasOf || own(e)) && e.show?.[t.id]) ||(shown(e) !== e ? shown(e) : dm(e)).text;   // what the player sees for this word in this theme
  const f = A.filter.toLowerCase();
  const list = pool.filter(e => (A.showOff || e.enabled) && (!f || (e.text + ' ' + e.gloss).toLowerCase().includes(f) || (formsOf.get(e.id) || []).some(a => a.text.toLowerCase().includes(f))));
  const inList = new Set(list.map(e => e.id));
  const roots = list.filter(e => !e.aliasOf || !inList.has(e.aliasOf));
  const key = { text: e => label(e).toLowerCase(), rec: e => e.rec || 9, pos: e => e.pos, intheme: e => popIn(P, e, t.id) || 9, diff: e => effRec(P, e, t.id) || 9, status: e => e.status, type: e => e.type, flags: flagKey, syn: e => groupMates(t, e).toLowerCase() || '￿' }[A.sort] || (e => e.text.toLowerCase());
  const dir = A.sortDesc ? -1 : 1;
  roots.sort((a, b) => dir * (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0));
  let rows = [];
  const under = new Map(), openRows = A.expanded || (A.expanded = new Set());   // other names of a word (spellings, regional words ...) sit behind a button on its row
  for (const e of roots) { const as = list.filter(x => x.aliasOf === e.id && x.aliasKind !== 'form'); under.set(e.id, as); rows.push(e); if (openRows.has(e.id)) { const d = dm(e); rows.push(...(d !== e ? [{ asRoot: e }] : []), ...as.filter(a => a !== d)); } }   // the row already shows the dialect's word: list the root (if it is not the one shown) and the other names, never the one on the row
  const underRow = new Set([...under].filter(([id]) => openRows.has(id)).flatMap(([, as]) => as.map(a => a.id)));
  const total = rows.length;
  if (sub && total > SUB_CAP) rows = rows.slice(0, SUB_CAP);
  const where = e => linkIds(P, e).filter(id => subIds.has(id)).map(id => `${P.ix.theme.get(id)?.name} ${effRec(P, e, id) || ''}`.trim()).join(', ');
  const th = (label, k) => h('th.sortable', { class: A.sort === k ? 'sorted' : '', title: A.sort === k ? 'Click to reverse the order' : 'Click to sort by ' + label, onclick: () => { A.sortDesc = A.sort === k ? !A.sortDesc : false; A.sort = k; render(); } }, label, h('span.sortmark', A.sort === k ? (A.sortDesc ? ' ▼' : ' ▲') : ' ⇅'));
  const flagsOf = e => ['adult', 'sensitive', 'tm', 'vulgar'].filter(k => e[k]).map(k => h('span.badge.' + (k === 'sensitive' ? 'sens' : k), { title: k }, k === 'tm' ? 'T' : k[0].toUpperCase())).concat(e.region.length ? [h('span.badge.region', e.region.join('/'))] : []);
  const readAs = new Map();   // the meaning label is left out when the theme already gives the meaning; it shows for words that read the same as another word of the table, and in the sub-theme view
  for (const x of roots) { const k = label(x).toLowerCase(); readAs.set(k, (readAs.get(k) || 0) + 1); }
  const needLabel = e => sub || readAs.get(label(e).toLowerCase()) > 1;
  const synCell = (t, e) => [...mateIds(t, e).map(id => h('span.chip', {}, groupName(t, id), h('a.x', { href: '#', title: 'Not a synonym', onclick: ev => { ev.preventDefault(); leaveGroup(t, id); } }, '✕'))),
    h('input.synadd', { placeholder: '+', autocomplete: 'off', title: 'Type to find a word of this theme', ...lookup(() => pool.filter(x => !x.aliasOf && x.id !== e.id && !mateIds(t, e).includes(x.id) && (x.enabled || A.showOff)).map(x => [x.id, label(x)]), id => joinSynonyms(t, e.id, id)) })];
  // another name of a word (an alias, or the root when the row shows a dialect variant) sits under its row with its own part of speech, type, familiarity, flags and status
  const subRow = (a, note) => h('tr.alias', { class: a.enabled ? '' : 'off' }, h('td.on', {}, h('div.onwrap', {}, h('span.expander.none'), h('input', { type: 'checkbox', checked: a.enabled, title: 'enabled', onchange: ev => { a.enabled = ev.target.checked; A.changed(); } }))),
    h('td.word', { onclick: () => editEntry(a) }, a.text, a.gloss && h('span.gloss', ` (${a.gloss})`), note && h('span.hint', ' ' + note)), h('td'), h('td.dim', a.pos), h('td.dim', a.type), h('td', {}, recSel(a.rec, ev => { a.rec = +ev.target.value; A.changed(); })), h('td'), h('td'),
    h('td', flagsOf(a)), h('td', h('span.dot.' + a.status, { title: a.status }, a.status === 'rev' ? '✓' : a.status === 'gen' ? 'g' : '·')));
  return h('div.etable', {}, tools,
    sub && total > SUB_CAP && h('p.hint', `Showing the first ${SUB_CAP} of ${total} entries. Use the filter to narrow them.`),
    h('table', { class: sub ? 'sub' : '' }, h('tr', {}, h('th.on', ''), wordHead(th('word', 'text')), th('synonyms', 'syn'), th('pos', 'pos'), th('type', 'type'), th('familiarity', 'rec'), sub ? h('th', { title: 'Themes below this one that hold the word, with the typicality in each' }, 'themes') : th('typicality', 'intheme'), th('difficulty', 'diff'), th('flags', 'flags'), th('status', 'status')),
      rows.length ? rows.map(e => { if (e.asRoot) return subRow(e.asRoot, '(root)'); if (e.aliasOf && underRow.has(e.id)) return subRow(e, '(' + (e.aliasKind || 'unknown') + ' alias)'); const s = shown(e), v = s !== e ? s : dm(e), forms = e.aliasOf ? [] : formsOf.get(e.id) || [];   // v: the entry the row's columns describe (the form or dialect variant it shows, else the entry itself)
         return h('tr', { class: [e.aliasOf && !own(e) ? 'alias' : '', e.enabled ? '' : 'off'].join(' ') },
        h('td.on', {}, h('div.onwrap', {}, (under.get(e.id) || []).length > 0 ? h('a.expander', { href: '#', title: (openRows.has(e.id) ? 'Hide' : 'Show') + ' its ' + under.get(e.id).length + ' other name(s): spellings, regional words ...', onclick: ev => { ev.preventDefault(); ev.stopPropagation(); openRows.has(e.id) ? openRows.delete(e.id) : openRows.add(e.id); render(); } }, openRows.has(e.id) ? '▾' : '▸') : h('span.expander.none'), h('input', { type: 'checkbox', checked: e.enabled, title: 'enabled', onchange: ev => { e.enabled = ev.target.checked; A.changed(); } }))),
        h('td.word', { onclick: () => editEntry(s !== e ? e : v) },
          s !== e ? h('span.shownform', { title: 'Open this form', onclick: ev => { ev.stopPropagation(); editEntry(s); } }, label(e)) : label(e),
          label(e) !== e.text && h('span.root', { title: 'Open the entry behind it' }, ' ← ', h('span.rootname', {}, e.text)), e.gloss && needLabel(e) && h('span.gloss', ` (${e.gloss})`),
          forms.length > 0 && h('a.useform', { href: '#', title: 'Choose the form this theme shows', onclick: ev => { ev.preventDefault(); ev.stopPropagation(); formMenu(ev.currentTarget, [[0, e.text], ...forms.map(a => [a.id, a.text])], s === e ? 0 : s.id, v => { if (v) e.use = { ...e.use, [t.id]: v }; else { delete e.use[t.id]; if (!Object.keys(e.use).length) e.use = {}; } A.changed(); render(); }); } }, '▾'), e.aliasKind && h('span.hint', ` (${e.aliasKind} alias${e.aliasOf && !inList.has(e.aliasOf) ? ' of ' + (P.ix.entry.get(e.aliasOf)?.text || '?') : ''})`)),
        h('td.dim.syn', { title: 'Words of this theme that mean the same: only one of them appears in a level' }, e.aliasOf ? '' : synCell(t, e)),
        h('td.dim', v.pos), h('td.dim', v.type), h('td', {}, recSel(v.rec, ev => { v.rec = +ev.target.value; A.changed(); })),
        sub ? h('td.dim', where(e)) : h('td', {}, recSel(e.th[t.id] || 0, ev => { e.th[t.id] = +ev.target.value; A.changed(); }, true)),
        h('td', {}, sub ? '' : h('span.diffcell.' + RECCLASS[effRec(P, e, t.id)], { title: 'Difficulty: the harder of familiarity and typicality (worked out, not editable)' }, effRec(P, e, t.id) || '–')),
        h('td', flagsOf(v)), h('td', h('span.dot.' + v.status, { title: v.status }, v.status === 'rev' ? '✓' : v.status === 'gen' ? 'g' : '·'))); }) :
        h('tr', h('td', { colspan: 10, class: 'hint' }, 'No words yet. Use “Add words…” or “Generate with Claude…”.'))));
}

function groupName(t, id) { const e = A.P.ix.entry.get(id); return (e && (e.show?.[t.id] || A.P.ix.entry.get(e.use?.[t.id])?.text)) || e?.text || '?'; }   // a group member is named as its theme shows it
function groupMates(t, e) { return (t.groups || []).filter(g => g.includes(e.id)).flatMap(g => g.filter(id => id !== e.id)).map(id => groupName(t, id)).join(', '); }
// A search box with its own list under it (the browser's datalist looks different everywhere): type to narrow, arrows and Enter or a click to choose.
function lookup(items, pick) {
  let menu = null, at = 0, shown = [];
  const close = () => { menu?.remove(); menu = null; };
  const open = ev => {
    const input = ev.target, q = input.value.trim().toLowerCase();
    shown = items().filter(([, text]) => !q || text.toLowerCase().includes(q)).sort((a, b) => (b[1].toLowerCase().startsWith(q) - a[1].toLowerCase().startsWith(q)) || a[1].localeCompare(b[1])).slice(0, 60);
    close(); if (!shown.length) return;
    at = 0; const r = input.getBoundingClientRect();
    menu = h('div.formmenu.lookup', { style: `left:${Math.round(r.left)}px;top:${Math.round(r.bottom + 2)}px;min-width:${Math.max(160, Math.round(r.width))}px` },
      shown.map(([id, text], n) => h('div', { class: n === at ? 'cur' : '', onmousedown: e2 => { e2.preventDefault(); close(); pick(id); } }, text)));
    document.body.append(menu);
  };
  const mark = n => { at = (n + shown.length) % shown.length; [...menu.children].forEach((c, j) => c.classList.toggle('cur', j === at)); menu.children[at].scrollIntoView({ block: 'nearest' }); };
  return { oninput: open, onfocus: open, onblur: close, onkeydown: ev => {
    if (ev.key === 'Escape') close();
    else if (ev.key === 'ArrowDown' && menu) { ev.preventDefault(); mark(at + 1); }
    else if (ev.key === 'ArrowUp' && menu) { ev.preventDefault(); mark(at - 1); }
    else if (ev.key === 'Enter' && menu) { ev.preventDefault(); const id = shown[at][0]; close(); pick(id); }
  } };
}
function formMenu(anchor, items, current, pick) {   // a small list under the arrow, as wide as its longest form
  document.querySelectorAll('.formmenu').forEach(m => m.remove());
  const r = anchor.getBoundingClientRect();
  const m = h('div.formmenu', { style: `left:${Math.round(r.left)}px;top:${Math.round(r.bottom + 2)}px` }, items.map(([v, text]) => h('div', { class: v === current ? 'cur' : '', onclick: ev => { ev.stopPropagation(); m.remove(); pick(v); } }, text)));
  document.body.append(m);
  const off = ev => { if (!m.contains(ev.target)) { m.remove(); document.removeEventListener('click', off, true); } };
  setTimeout(() => document.addEventListener('click', off, true));
}
const mateIds = (t, e) => ((t.groups || []).find(g => g.includes(e.id)) || []).filter(id => id !== e.id);
function joinSynonyms(t, a, b) {   // a and b (and the words already grouped with either) become one group: a word is in one group per theme
  const all = new Set([a, b]);
  for (const g of t.groups || []) if (g.includes(a) || g.includes(b)) g.forEach(id => all.add(id));
  t.groups = (t.groups || []).filter(g => !g.includes(a) && !g.includes(b));
  t.groups.push([...all]); A.changed(); render();
}
function leaveGroup(t, id) {
  t.groups = (t.groups || []).map(g => g.filter(x => x !== id)).filter(g => g.length > 1);
  if (!t.groups.length) delete t.groups;
  A.changed(); render();
}

// ---------- shell ----------

function render(keepFocus = false) {
  const main = $('#main'), top = main.scrollTop;
  const focus = keepFocus && document.activeElement && document.activeElement.classList.contains('filter');
  const pos = focus ? document.activeElement.selectionStart : 0;
  renderTree();
  const t = A.sel && A.P.ix.theme.get(A.sel);
  main.replaceChildren(...[].concat(t ? themeView(t) : A.view === 'words' ? allWordsView() : overview()));
  main.scrollTop = top;
  if (focus) { const f = $('.filter'); f.focus(); f.setSelectionRange(pos, pos); }
  renderStatus();
}

async function loadSkeleton() {
  const text = await (await fetch('data/themes.txt')).text();
  const { themes, errors } = parseOutline(text);
  if (errors.length) console.warn(errors);
  const P = newProject();
  P.themes = themes;
  return P;
}

function mergeOutline(text) {
  const P = A.P, { themes, errors } = parseOutline(text);
  let added = 0, changed = 0;
  for (const n of themes) {
    const o = P.ix.theme.get(n.id);
    if (!o) { P.themes.push(n); added++; } else { Object.assign(o, n); changed++; }
  }
  sortDepthFirst(P); reindex(P);
  return { added, changed, errors };
}

const menuItem = (label, fn) => h('button.mi', { onclick: ev => { ev.target.closest('details').open = false; fn(); } }, label);

// The starter library shipped with the app (data/wordlist-en.project.json). Used when the browser holds no library, and offered when it is newer than the one in the browser.
async function fetchStarter() {
  try {
    const r = await fetch('data/wordlist-en.project.json', { cache: 'no-store' });
    if (!r.ok) return null;
    const P = parseProject(await r.text());
    return P.themes.length ? P : null;
  } catch { return null; }
}

async function offerStarterUpdate() {
  const S = await fetchStarter(), P = A.P;
  if (!S || S.lang !== P.lang || S.lib.version <= P.lib.version) return;
  let declined = 0;
  try { declined = +localStorage.getItem('wlb2-starter-declined') || 0; } catch {}
  if (declined >= S.lib.version) return;
  const words = S.entries.filter(e => !e.aliasOf).length.toLocaleString();
  if (confirm(`A newer starter library is available: v${S.lib.version} (${S.themes.length.toLocaleString()} themes, ${words} words). Yours is v${P.lib.version}.

OK opens it and REPLACES your current library. Save your project to a file first (File menu) if you want to keep it.
Cancel keeps yours; you will not be asked again for this version.`)) {
    reindex(S); A.P = S; A.sel = null; A.view = null; A.dirty = false; autosave(); A.render(); toast('Opened starter library v' + S.lib.version);
  } else { try { localStorage.setItem('wlb2-starter-declined', String(S.lib.version)); } catch {} }
}

async function boot() {
  $('#version').textContent = 'v' + VERSION;
  let P = await loadLocal();
  const fresh = !P || !P.themes.length;
  if (fresh) P = (await fetchStarter()) || await loadSkeleton();
  A.P = P; reindex(P);
  if (fresh) autosave();
  loadFreq().then(() => A.render()).catch(() => toast('Frequency list did not load (serve the folder over http).', true));
  $('#search').addEventListener('input', debounce(ev => { A.search = ev.target.value; renderTree(); }, 120));
  $('#btn-checks').onclick = showValidation;
  $('#btn-export').onclick = showExport;
  $('#btn-settings').onclick = showSettings;
  try { A.unlock = !!localStorage.getItem('wlb2-unlock'); } catch {}
  setLock(!!A.unlock);
  $('#btn-lock').onclick = () => setLock(!A.unlock);
  $('#btn-expand').onclick = () => { A.open = new Set(A.P.themes.filter(t => (A.P.ix.kids.get(t.id) || []).length).map(t => t.id)); renderTree(); };
  $('#btn-collapse').onclick = () => { A.open.clear(); renderTree(); };
  const tf = $('#tflag');
  tf.append(...THEME_FILTERS.map(([v, l]) => h('option', { value: v, 'data-label': l }, l)));
  const tl = $('#tlevel');
  // How many themes each choice matches, shown after its name; worked out when a list is opened or filled, so the numbers follow edits.
  const countThemes = f => { const P = A.P; let n = 0; for (const t of P.themes) if (f(P, t, eff(P, t.id))) n++; return n; };
  const label = (o, f) => { o.textContent = `${o.dataset.label}${f ? ' (' + countThemes(f).toLocaleString() + ')' : ''}`; };
  const countMain = () => { for (const o of tf.options) { const row = THEME_FILTERS.find(x => x[0] === o.value); label(o, row[0] === '' ? () => true : row[2]); } };
  const countLevels = () => { const lv = LEVEL_FILTERS[tf.value]; if (!lv) return; profMemo = new Map(); try { lv.forEach(([, , f], i) => label(tl.options[i], (P, t, ef) => !t.group && f(P, t, ef))); } finally { profMemo = null; } };
  tf.addEventListener('mousedown', countMain); tl.addEventListener('mousedown', countLevels);
  tl.onchange = () => { A.tlevel = tl.value; renderTree(); };
  tf.onchange = () => {
    A.tflag = tf.value;
    const lv = LEVEL_FILTERS[A.tflag];
    tl.hidden = !lv;
    if (lv) { tl.replaceChildren(...lv.map(([v, l]) => h('option', { value: v, 'data-label': l }, l))); tl.value = A.tlevel = lv[1][0]; countLevels(); }
    countMain(); renderTree();
  };
  countMain();
  $('#btn-home').onclick = () => { A.sel = null; A.view = null; render(); };
  $('#filemenu .mpop').append(
    menuItem('Save project file', () => {
      if (!A.dirty) return toast('No changes since the last file save.');
      stampSave(A.P);
      download(`wordlist-${A.P.lang}.project.json`, serializeProject(A.P));
      A.dirty = false; autosave(); render();
    }),
    menuItem('Open project file…', async () => {
      const f = await pickFile('.json'); if (!f) return;
      try { A.P = parseProject(f.text); reindex(A.P); A.sel = null; A.dirty = false; autosave(); render(); toast('Opened ' + f.name); } catch (e) { toast(e.message, true); }
    }),
    menuItem('Import theme outline…', async () => {
      const f = await pickFile('.txt'); if (!f) return;
      const r = mergeOutline(f.text); A.changed();
      toast(`${r.added} themes added, ${r.changed} updated` + (r.errors.length ? `; ${r.errors.length} problems (see console)` : ''), r.errors.length > 0); if (r.errors.length) console.warn(r.errors);
    }),
    menuItem('Export theme outline', () => download('themes.txt', formatOutline(A.P.themes), 'text/plain')),
    menuItem('Reset to the starter theme tree…', async () => {
      if (!confirm('Replace everything (all themes and words) with the empty starter tree? This cannot be undone.')) return;
      A.P = await loadSkeleton(); reindex(A.P); A.sel = null; A.changed();
    }));
  render();
  A.checkStarter = offerStarterUpdate;
  if (!fresh) offerStarterUpdate();
}

boot().catch(e => { document.body.append(h('pre.fatal', String(e && e.stack || e))); console.error(e); });
