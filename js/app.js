// App shell: loading, the theme tree, the theme view, file actions.
import { h, $, select, dialog, toast, debounce, plural } from './dom.js';
import { A } from './state.js';
import { parseOutline, formatOutline } from './outline.js';
import { placeTheme, deleteTheme, newProject, reindex, eff, themeStats, effRec, pathOf, descendants, sortDepthFirst, nowStamp, REC_HELP } from './model.js';
import { loadLocal, saveLocal, serializeProject, parseProject, download, pickFile, stampSave } from './store.js';
import { loadFreq } from './freq.js';
import { editTheme, addTheme, editEntry, bulkAdd, generate, rateUnrated, showValidation, showExport, showSettings, openPath } from './dialogs.js';
import { isAncestor } from './model.js';
import { entryDefaults } from './model.js';

const VERSION = '2';

// ---------- change handling ----------

let savedAt = '';
const autosave = debounce(async () => {
  try { await saveLocal(A.P); savedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { savedAt = 'failed'; }
  renderStatus();
}, 700);

A.changed = () => { reindex(A.P); A.dirty = true; autosave(); render(); };
A.render = () => render();

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
];
function filterVisible() {
  const f = THEME_FILTERS.find(x => x[0] === A.tflag)?.[2];
  if (!f) return null;
  const P = A.P, vis = new Set(), hit = new Set();
  for (const t of P.themes) if (f(P, t, eff(P, t.id))) { hit.add(t.id); for (let x = t; x; x = x.parent && P.ix.theme.get(x.parent)) vis.add(x.id); }
  vis.hits = hit.size;
  return vis;
}
function renderTree() {
  const P = A.P, box = $('#tree'), q = A.search.trim().toLowerCase();
  if (q) {
    const themes = P.themes.filter(t => t.name.toLowerCase().includes(q)).slice(0, 60);
    const words = q.length < 2 ? [] : P.entries.filter(e => e.text.toLowerCase().includes(q)).slice(0, 60);
    const sect = (key, title, hits) => [
      h('div.sechead.fold', { onclick: () => { searchOpen[key] = !searchOpen[key]; renderTree(); } }, (searchOpen[key] ? '▾ ' : '▸ ') + title),
      ...(searchOpen[key] ? hits : [])];
    box.replaceChildren(...[
      sect('themes', `Themes (${themes.length})`,
        themes.map(t => h('div.hit', { onclick: () => select_(t.id) }, h('b', t.name), h('span.path', pathOf(P, t.id).slice(0, -1).join(' › '))))),
      sect('words', `Words (${words.length})`,
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
const recSel = (value, onchange, auto = false) => select([[0, auto ? 'auto' : '–'], 1, 2, 3, 4, 5], value, { class: 'rs ' + RECCLASS[value], onchange });

function overview() {
  const P = A.P, c = counts(), min = P.settings.minWords || 4;
  const tops = P.ix.kids.get('') || [];
  const playable = P.themes.filter(t => !t.group && eff(P, t.id).enabled).length;
  const ready = [...c.own].filter(([id, n]) => n >= min && eff(P, id).enabled).length;
  return h('div.overview', {},
    h('h1', 'Wordlist builder'),
    h('p', {}, `${plural(P.entries.length, 'entry')} · ${plural(playable, 'playable theme')} · ${ready.toLocaleString()} with ${min}+ words · language: ${P.lang}`),
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
    h('div.crumbs', {}, path.slice(0, -1).map((n, i) => h('a', { href: '#', onclick: ev => { ev.preventDefault(); select_(P.ix.theme.get(pathIds(t.id)[i]).id); } }, n + ' › '))),
    h('h1', {}, t.name, t.group && h('span.tag', 'group'), !ef.enabled && h('span.tag.off', 'disabled')),
    h('div.chips', {}, badges(t), t.d ? h('span.badge.d', { title: 'Theme difficulty' }, 'difficulty ' + t.d) : h('span.badge.d0', 'not rated')),
    t.note && h('p.note', t.note),
    h('div.actions', {}, h('button', { onclick: () => editTheme(t) }, 'Theme settings…'), h('button', { onclick: () => addTheme(t.id) }, '+ Sub-theme'),
      !t.group && h('button', { onclick: () => bulkAdd(t.id) }, '+ Add words…'), !t.group && h('button.primary', { onclick: () => generate(t.id) }, 'Generate with Claude…'),
      h('button', { title: 'Ask Claude to rate the difficulty of the unrated themes here', onclick: () => rateUnrated(t.id) }, 'Rate themes…')));
  const parts = [head];
  if (kids.length) {
    const c = counts();
    parts.push(h('div.kids', {}, kids.map(k => h('div.kid', { onclick: () => select_(k.id) }, h('b', k.name), h('span.hint', k.group ? `${c.ready.get(k.id)}/${c.play.get(k.id)} ready` : `${c.own.get(k.id)} words`)))));
  }
  if (t.group) { if (!kids.length) parts.push(h('p.hint', 'This group is empty. Add a sub-theme.')); return parts; }

  const status = st.roots >= min ? h('span.ok', `${st.roots} distinct words ✓`) : h('span.bad', `${st.roots} of ${min} needed`);
  parts.push(h('div.poolbar', {}, status, h('span.hint', ` · ${plural(st.entries, 'entry')} · pool depth by rating:`), bandBar(st),
    t.complete && h('span.hint', ' · complete set: the list must be every member')));
  parts.push(entryTable(t));
  return parts;
}

function pathIds(id) { const out = []; let t = A.P.ix.theme.get(id); while (t) { out.unshift(t.id); t = t.parent && A.P.ix.theme.get(t.parent); } return out; }

function entryTable(t) {
  const P = A.P;
  const list = (P.ix.byTheme.get(t.id) || []).filter(e => (A.showOff || e.enabled) && (!A.filter || (e.text + ' ' + e.gloss).toLowerCase().includes(A.filter.toLowerCase())));
  const inList = new Set(list.map(e => e.id));
  const roots = list.filter(e => !e.aliasOf || !inList.has(e.aliasOf));
  const key = { text: e => e.text.toLowerCase(), rec: e => effRec(P, e, t.id) || 9, status: e => e.status, type: e => e.type }[A.sort] || (e => e.text.toLowerCase());
  roots.sort((a, b) => key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0);
  const rows = [];
  for (const e of roots) { rows.push(e); for (const a of list.filter(x => x.aliasOf === e.id)) rows.push(a); }
  const th = (label, k) => h('th.sortable', { class: A.sort === k ? 'on' : '', onclick: () => { A.sort = k; render(); } }, label);
  const flagsOf = e => ['adult', 'sensitive', 'tm', 'vulgar'].filter(k => e[k]).map(k => h('span.badge.' + (k === 'sensitive' ? 'sens' : k), { title: k }, k === 'tm' ? 'T' : k[0].toUpperCase())).concat(e.region.length ? [h('span.badge.region', e.region.join('/'))] : []);
  return h('div.etable', {},
    h('div.tools', {}, h('input.filter', { placeholder: 'filter words…', value: A.filter, oninput: ev => { A.filter = ev.target.value; render(true); } }),
      h('label.chk', {}, h('input', { type: 'checkbox', checked: A.showOff, onchange: ev => { A.showOff = ev.target.checked; render(); } }), ' show disabled')),
    h('table', {}, h('tr', {}, h('th.on', ''), th('Word', 'text'), h('th', 'pos'), th('type', 'type'), th('rating', 'rec'), h('th', { title: 'Rating in this theme' }, 'in theme'), h('th', 'flags'), th('status', 'status')),
      rows.length ? rows.map(e => h('tr', { class: [e.aliasOf ? 'alias' : '', e.enabled ? '' : 'off'].join(' ') },
        h('td.on', {}, h('input', { type: 'checkbox', checked: e.enabled, title: 'enabled', onchange: ev => { e.enabled = ev.target.checked; A.changed(); } })),
        h('td.word', { onclick: () => editEntry(e) }, e.aliasOf ? h('span.arrow', '↳ ') : '', e.text, e.gloss && h('span.gloss', ` (${e.gloss})`), e.aliasKind && h('span.hint', ` ${e.aliasKind}`)),
        h('td.dim', e.pos.slice(0, 3)), h('td.dim', e.type), h('td', {}, recSel(e.rec, ev => { e.rec = +ev.target.value; A.changed(); })),
        h('td', {}, recSel(e.th[t.id] || 0, ev => { e.th[t.id] = +ev.target.value; A.changed(); }, true), !!e.aliasOf && !e.th[t.id] && h('span.hint', ' ' + effRec(P, e, t.id))),
        h('td', flagsOf(e)), h('td', h('span.dot.' + e.status, { title: e.status }, e.status === 'rev' ? '✓' : e.status === 'gen' ? 'g' : '·')))) :
        h('tr', h('td', { colspan: 8, class: 'hint' }, 'No words yet. Use “Add words…” or “Generate with Claude…”.'))));
}

// ---------- shell ----------

function render(keepFocus = false) {
  const main = $('#main'), top = main.scrollTop;
  const focus = keepFocus && document.activeElement && document.activeElement.classList.contains('filter');
  const pos = focus ? document.activeElement.selectionStart : 0;
  renderTree();
  const t = A.sel && A.P.ix.theme.get(A.sel);
  main.replaceChildren(...[].concat(t ? themeView(t) : overview()));
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

async function boot() {
  $('#version').textContent = 'v' + VERSION;
  let P = await loadLocal();
  if (!P || !P.themes.length) P = await loadSkeleton();
  A.P = P; reindex(P);
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
  tf.append(...THEME_FILTERS.map(([v, l]) => h('option', { value: v }, l)));
  tf.onchange = () => { A.tflag = tf.value; renderTree(); };
  $('#btn-home').onclick = () => { A.sel = null; render(); };
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
}

boot().catch(e => { document.body.append(h('pre.fatal', String(e && e.stack || e))); console.error(e); });
