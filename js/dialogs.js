// Dialogs: theme, entry, bulk add, generate, validation, export, settings.
import { h, $, select, check, field, dialog, toast, plural, fmtBytes } from './dom.js';
import { A } from './state.js';
import { newTheme, slug } from './outline.js';
import { POS, TYPES, TYPE_HELP, REGIONS, KIND_NAMES, REC_HELP, ALIAS_KINDS, STATUS, STATUS_HELP, addEntry, entryDefaults, reindex, linkIds, effRec, eff,
  pathOf, deleteEntry, deleteTheme, moveTheme, isAncestor, uniqueThemeId, sameText, themeStats, descendants } from './model.js';
import { zipf, freqLoaded } from './freq.js';
import { validate, SEV_ORDER } from './validate.js';
import { buildExport, DEFAULT_EXPORT, PRESETS, sizeOf } from './export.js';
import { download } from './store.js';
import { MODELS, getKey, setKey, generateWords, rateThemes, SPREADS } from './ai.js';

const REC_OPTS = REC_HELP.map((l, i) => [i, l]);
const IN_OPTS = [[0, 'auto'], ...REC_HELP.slice(1).map((l, i) => [i + 1, l])];

// Theme picker by name: a text box with a datalist. Returns { input, get() } where get() gives a theme id or null.
let listSeq = 0;
function themePicker(placeholder, { groups = true } = {}) {
  const P = A.P, id = 'tl' + listSeq++;
  const list = h('datalist', { id });
  const byName = new Map();
  for (const t of P.themes) { if (!groups && t.group) continue; byName.set(t.name, t.id); list.append(h('option', { value: t.name }, pathOf(P, t.id).slice(0, -1).join(' > '))); }
  const input = h('input', { list: id, placeholder });
  return { node: h('span.picker', {}, input, list), input, get: () => byName.get(input.value.trim()) || null };
}

// ---------- theme ----------

export async function editTheme(t, isNew = false) {
  const P = A.P;
  const w = { ...t, region: [...t.region] };
  const parentPick = themePicker('(top level)');
  parentPick.input.value = t.parent ? P.ix.theme.get(t.parent).name : '';
  const f = {
    name: h('input', { value: w.name }),
    note: h('textarea', { rows: 3 }, w.note),
    d: select(IN_OPTS.map(([v, l]) => [v, v ? l : 'not rated']), w.d),
    kind: select([['', 'category (plain)'], ['place', 'place: things found at a place'], ['property', 'property: things that share a property'], ['wordplay', 'wordplay: spelling, sound, structure']], w.kind),
    geo: h('input', { value: w.geo, placeholder: 'e.g. Asia, Europe' }),
  };
  const flags = ['enabled', 'group', 'complete', 'adult', 'sensitive', 'tm', 'lang'];
  const flagLabel = { enabled: 'Enabled', group: 'Group (a folder, never played)', complete: 'Complete set (finite, fixed: months, planets)', adult: 'Adult content', sensitive: 'Sensitive topic',
    tm: 'Trademark / copyright', lang: 'Language-specific (English spelling, sound or slang)' };
  const boxes = Object.fromEntries(flags.map(k => [k, check(flagLabel[k], w[k])]));
  const regionBoxes = REGIONS.map(c => check(c, w.region.includes(c), { 'data-c': c }));
  const body = h('div.form', {},
    field('Name', f.name),
    field('Parent theme', parentPick.node, 'Leave empty for a top-level group.'),
    h('div.flags', Object.values(boxes)),
    field('Theme difficulty', f.d, 'How recognisable the theme is as a category (1 everyone gets it at a glance ... 5 specialist).'),
    field('Kind', f.kind),
    field('Audience regions', h('div.chips', regionBoxes), 'Tick if the theme is mainly known in some countries (US states, British politics). Leave empty for everyone.'),
    field('Part of the world', f.geo, 'Optional: where the theme is about (not who knows it).'),
    field('Note', f.note, 'Shown to the word generator and to people. For complete sets, list the exact members.'),
    !isNew && h('p.hint', {}, `${plural(themeStats(P, t.id).entries, 'entry')} linked. Inherited flags (adult, sensitive, trademark, language, disabled) apply to sub-themes.`));
  return dialog(isNew ? 'New theme' : 'Theme: ' + t.name, body, [
    { label: 'Cancel' },
    !isNew && { label: 'Delete', action: async () => {
      if (!confirm(`Delete "${t.name}"? Its sub-themes move up a level and words stay but lose this link.`)) return false;
      deleteTheme(P, t.id); if (A.sel === t.id) A.sel = t.parent; A.changed(); } },
    { label: 'Save', primary: true, action: () => {
      const name = f.name.value.trim();
      if (!name) throw Error('A theme needs a name.');
      if (P.themes.some(x => x !== t && x.name.toLowerCase() === name.toLowerCase())) throw Error('Another theme already has this name.');
      const pname = parentPick.input.value.trim(), parent = pname ? parentPick.get() : null;
      if (pname && !parent) throw Error('Parent theme not found.');
      if (parent && (parent === t.id || (!isNew && isAncestor(P, t.id, parent)))) throw Error('A theme cannot be inside itself.');
      Object.assign(w, { name, note: f.note.value.trim(), d: +f.d.value, kind: f.kind.value, geo: f.geo.value.trim() });
      for (const k of flags) w[k] = boxes[k].querySelector('input').checked;
      w.region = regionBoxes.filter(b => b.querySelector('input').checked).map(b => b.querySelector('input').dataset.c);
      const oldParent = t.parent;
      Object.assign(t, w, { parent: oldParent });
      if (isNew) { t.id = uniqueThemeId(P, slug(name)); P.themes.push(t); reindex(P); moveTheme(P, t.id, parent); A.sel = t.id; if (parent) A.open.add(parent); }
      else if ((parent || null) !== (oldParent || null)) { reindex(P); moveTheme(P, t.id, parent); if (parent) A.open.add(parent); }
      A.changed();
    } },
  ].filter(Boolean), { wide: true });
}

export const addTheme = parentId => editTheme(Object.assign(newTheme('', parentId || null), { name: '' }), true);

// ---------- entry ----------

export async function editEntry(e, { isNew = false, themeId = null } = {}) {
  const P = A.P;
  const w = { ...e, region: [...e.region], th: { ...e.th } };
  if (isNew && themeId && !w.aliasOf) w.th[themeId] = w.th[themeId] ?? 0;
  const f = {
    text: h('input', { value: w.text, autofocus: true }),
    gloss: h('input', { value: w.gloss, placeholder: 'only if the text has other meanings, e.g. donkey' }),
    pos: select(POS, w.pos), type: select(TYPES.map(t => [t, `${t} — ${TYPE_HELP[t]}`]), w.type),
    rec: select(REC_OPTS, w.rec), status: select(STATUS.map(s => [s, `${s} — ${STATUS_HELP[s]}`]), w.status),
    note: h('textarea', { rows: 2 }, w.note), kind: select(ALIAS_KINDS.map(k => [k, k || '(not an alias)']), w.aliasKind),
  };
  const flags = { enabled: 'Enabled', adult: 'Adult', sensitive: 'Sensitive', tm: 'Trademark / copyright', vulgar: 'Vulgar' };
  const boxes = Object.fromEntries(Object.keys(flags).map(k => [k, check(flags[k], w[k])]));
  const regionBoxes = REGIONS.map(c => check(c, w.region.includes(c), { 'data-c': c }));

  // alias target: text box + datalist of matching entries ("text (gloss) #id")
  const aliasList = h('datalist', { id: 'al' + listSeq });
  const aliasInput = h('input', { list: 'al' + listSeq++, placeholder: 'type a word, pick from the list' });
  const labelOf = x => `${x.text}${x.gloss ? ' (' + x.gloss + ')' : ''} #${x.id}`;
  const root0 = w.aliasOf && P.ix.entry.get(w.aliasOf);
  if (root0) aliasInput.value = labelOf(root0);
  aliasInput.addEventListener('input', () => {
    const q = aliasInput.value.toLowerCase().replace(/ #\d+$/, '');
    aliasList.replaceChildren(...(q.length < 2 ? [] : P.entries.filter(x => x !== e && !x.aliasOf && x.text.toLowerCase().startsWith(q)).slice(0, 12).map(x => h('option', { value: labelOf(x) }))));
  });

  const linksBox = h('div.links');
  const addPick = themePicker('add a theme…', { groups: false });
  const drawLinks = () => {
    const rootId = (() => { const m = aliasInput.value.match(/#(\d+)$/); return m ? +m[1] : 0; })();
    const root = rootId && P.ix.entry.get(rootId);
    const ids = new Set([...Object.keys(w.th), ...(root ? Object.keys(root.th) : [])]);
    linksBox.replaceChildren(
      ids.size ? h('table.links', {}, h('tr', {}, h('th', 'Theme'), h('th', root ? 'Rating here (auto = harder of root and own)' : 'Rating in this theme'), h('th')),
        [...ids].map(tid => {
          const inherited = root && !(tid in w.th) ;
          const own = tid in w.th;
          return h('tr', { class: inherited ? 'inherited' : '' },
            h('td', {}, h('a', { href: '#', title: pathOf(P, tid).join(' > '), onclick: ev => { ev.preventDefault(); } }, P.ix.theme.get(tid)?.name || tid + ' (missing)'), inherited && h('span.hint', ' from root')),
            h('td', {}, select(IN_OPTS, w.th[tid] || 0, { onchange: ev => { w.th[tid] = +ev.target.value; } })),
            h('td', {}, (own || !root) && h('button.link', { type: 'button', title: 'Unlink', onclick: () => { delete w.th[tid]; drawLinks(); } }, '✕')));
        })) : h('p.hint', 'Not linked to any theme yet.'),
      h('div.row', {}, addPick.node, h('button', { type: 'button', onclick: () => {
        const tid = addPick.get();
        if (!tid) return toast('Pick a theme from the list.', true);
        if (!(tid in w.th)) w.th[tid] = 0;
        addPick.input.value = ''; drawLinks();
      } }, 'Link')));
  };
  aliasInput.addEventListener('change', drawLinks);
  drawLinks();

  const aliases = P.entries.filter(a => a.aliasOf === e.id);
  const aliasSection = h('div', {},
    field('This is an alias of', aliasInput, 'Leave empty for a root entry. An alias takes its themes from its root; it has its own flags and ratings. Spelling = same word spelled differently (color/colour); synonym = a different word (sofa/couch/settee).'), aliasList,
    field('Alias kind', f.kind));
  const zv = freqLoaded() && w.text ? zipf(w.text) : undefined;

  const body = h('div.form', {},
    h('div.two', {}, field('Text (as written, with capitals)', f.text), field('Gloss', f.gloss)),
    h('div.two', {}, field('Part of speech', f.pos), field('Type', f.type)),
    h('div.two', {}, field('Recognisability (the word itself)', f.rec, zv === undefined ? '' : zv === null ? 'Not in the frequency list.' : `Zipf frequency ${zv.toFixed(1)} (4+ common, 3 uncommon, 2 rare).`), field('Status', f.status)),
    h('div.flags', Object.values(boxes)),
    field('Regions', h('div.chips', regionBoxes), 'Tick if the word is mainly known in some countries (lorry, pavement). Empty = everyone.'),
    aliasSection,
    h('h3', 'Themes'), linksBox,
    aliases.length > 0 && h('div', {}, h('h3', 'Aliases of this entry'), aliases.map(a => h('div.row', {}, h('a', { href: '#', onclick: ev => { ev.preventDefault(); } }, a.text), ` ${a.aliasKind || '?'}${a.region.length ? ' · ' + a.region.join('/') : ''} · rating ${a.rec || '?'} `,
      h('button.link', { type: 'button', onclick: async () => { const ok = await editEntry(a); if (ok) { A.changed(); } } }, 'edit')))),
    !e.aliasOf && !isNew && h('div.row', {}, h('button', { type: 'button', onclick: async () => {
      const a = Object.assign(entryDefaults(), { aliasOf: e.id, aliasKind: 'synonym', pos: e.pos, type: e.type });
      if (await editEntry(a, { isNew: true })) A.changed();
    } }, '+ Add alias')),
    field('Note', f.note));

  const save = () => {
    const text = f.text.value.trim();
    if (!text) throw Error('The word cannot be empty.');
    const gloss = f.gloss.value.trim();
    const dup = sameText(P, text).find(x => x !== e && (x.gloss || '').toLowerCase() === gloss.toLowerCase());
    if (dup) throw Error(`"${text}${gloss ? ' (' + gloss + ')' : ''}" already exists. Give a gloss to tell the meanings apart.`);
    const others = sameText(P, text).filter(x => x !== e);
    if (others.length && !gloss) throw Error(`"${text}" already exists with another meaning; give this one a gloss.`);
    const m = aliasInput.value.match(/#(\d+)$/);
    const aliasOf = aliasInput.value.trim() ? (m ? +m[1] : -1) : 0;
    if (aliasOf === -1 || (aliasOf && !P.ix.entry.get(aliasOf))) throw Error('Pick the alias target from the list.');
    if (aliasOf && P.ix.entry.get(aliasOf).aliasOf) throw Error('Point the alias at the root entry, not at another alias.');
    if (aliasOf && aliasOf === e.id) throw Error('An entry cannot be an alias of itself.');
    if (aliasOf && P.entries.some(a => a.aliasOf === e.id)) throw Error('This entry has aliases of its own; move them first.');
    Object.assign(w, { text, gloss, pos: f.pos.value, type: f.type.value, rec: +f.rec.value, status: f.status.value, note: f.note.value.trim(), aliasOf,
      aliasKind: aliasOf ? (f.kind.value || 'synonym') : '' });
    for (const k of Object.keys(flags)) w[k] = boxes[k].querySelector('input').checked;
    w.region = regionBoxes.filter(b => b.querySelector('input').checked).map(b => b.querySelector('input').dataset.c);
    Object.assign(e, w);
    if (isNew) { e.id = P.nextId++; P.entries.push(e); }
    A.changed();
  };
  return dialog(isNew ? 'New entry' : `Entry: ${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''}`, body, [
    { label: 'Cancel' },
    !isNew && { label: 'Delete', action: () => { if (!confirm(`Delete "${e.text}"?`)) return false; deleteEntry(P, e); A.changed(); } },
    { label: 'Save', primary: true, action: save },
  ].filter(Boolean), { wide: true });
}

// ---------- add words ----------

export async function bulkAdd(tid) {
  const P = A.P, t = P.ix.theme.get(tid);
  const ta = h('textarea', { rows: 12, placeholder: 'One word per line.\nOptional extras after |  :  gloss | rating | in-theme rating\n  ass | donkey | 1 | 2' });
  const d = { pos: select(POS, 'noun'), type: select(TYPES, 'common'), rec: select(REC_OPTS, 0), inRec: select(IN_OPTS, 0) };
  const body = h('div.form', {}, h('p', {}, `Adding to "${t.name}". Words that already exist are just linked.`), ta,
    h('div.two', {}, field('Part of speech', d.pos), field('Type', d.type)), h('div.two', {}, field('Recognisability', d.rec), field('Rating in this theme', d.inRec)));
  return dialog('Add words', body, [{ label: 'Cancel' }, { label: 'Add', primary: true, action: () => {
    let added = 0, linked = 0; const problems = [];
    for (const line of ta.value.split('\n')) {
      if (!line.trim()) continue;
      const [text, gloss = '', rec = '', inRec = ''] = line.split('|').map(s => s.trim());
      const same = sameText(P, text), hit = same.find(x => (x.gloss || '').toLowerCase() === gloss.toLowerCase());
      if (hit) { if (!(tid in hit.th)) { hit.th[tid] = +inRec || +d.inRec.value; linked++; } continue; }
      if (same.length && !gloss) { problems.push(text); continue; }
      addEntry(P, text, { gloss, pos: d.pos.value, type: d.type.value, rec: +rec || +d.rec.value, th: { [tid]: +inRec || +d.inRec.value } });
      reindex(P); added++;
    }
    A.changed();
    toast(`${plural(added, 'word')} added, ${linked} linked` + (problems.length ? `; need a gloss: ${problems.join(', ')}` : ''), problems.length > 0);
  } }], { wide: true });
}

// ---------- generate ----------

export async function generate(tid) {
  const P = A.P, t = P.ix.theme.get(tid);
  const f = {
    model: select(MODELS, P.settings.model), n: h('input', { type: 'number', value: 20, min: 4, max: 80 }),
    spread: select([['even', 'spread across easy, medium, hard'], ['easy', 'well-known words first'], ['hard', 'harder words']], 'even'),
    extra: h('input', { placeholder: 'optional, e.g. include some tropical ones' }),
  };
  const out = h('div.gen');
  let result = null, ctl = null;
  const run = async st => {
    P.settings.model = f.model.value;
    st.textContent = 'Asking Claude…'; st.classList.remove('err');
    ctl = new AbortController();
    const r = await generateWords(P, t, { n: +f.n.value || 20, spread: f.spread.value, extra: f.extra.value, model: f.model.value, signal: ctl.signal });
    result = r.entries.map(x => ({ ...x, take: true }));
    st.textContent = `${plural(result.length, 'entry')} · cost $${r.cost.toFixed(3)}`;
    draw();
    return false;
  };
  const clamp = n => Math.max(1, Math.min(5, Math.round(+n) || 3));
  const draw = () => {
    out.replaceChildren(h('table.gen', {}, h('tr', {}, h('th'), h('th', 'Word'), h('th', 'pos'), h('th', 'type'), h('th', 'rec'), h('th', 'in'), h('th', 'flags'), h('th', 'aliases')),
      result.map(x => {
        const exists = sameText(P, x.text).find(o => (o.gloss || '').toLowerCase() === (x.gloss || '').toLowerCase());
        return h('tr', { class: exists ? 'exists' : '' },
          h('td', {}, h('input', { type: 'checkbox', checked: x.take, onchange: ev => { x.take = ev.target.checked; } })),
          h('td', {}, x.text, x.gloss && h('span.hint', ` (${x.gloss})`), exists && h('span.hint', ' · exists, will be linked')),
          h('td', x.pos.slice(0, 3)), h('td', x.type), h('td', clamp(x.rec)), h('td', clamp(x.inRec)),
          h('td', ['adult', 'sensitive', 'tm', 'vulgar'].filter(k => x[k]).map(k => k[0].toUpperCase()).join('') + (x.region.length ? ' ' + x.region.join('/') : '')),
          h('td', x.aliases.map(a => `${a.text} (${a.kind}${a.region.length ? ' ' + a.region.join('/') : ''}, ${clamp(a.rec)})`).join(', ')));
      })));
  };
  const add = () => {
    let created = 0, linked = 0;
    for (const x of result.filter(r => r.take)) {
      const text = x.text.trim(); if (!text) continue;
      const gloss = (x.gloss || '').trim();
      let root = sameText(P, text).find(o => (o.gloss || '').toLowerCase() === gloss.toLowerCase());
      if (root) { if (!(tid in root.th) && !root.aliasOf) { root.th[tid] = clamp(x.inRec); linked++; } }
      else {
        root = addEntry(P, text, { gloss, pos: x.pos, type: x.type, rec: clamp(x.rec), adult: x.adult, sensitive: x.sensitive, tm: x.tm, vulgar: x.vulgar, region: x.region,
          status: 'gen', th: { [tid]: clamp(x.inRec) } });
        reindex(P); created++;
      }
      for (const a of x.aliases) {
        const at = a.text.trim(); if (!at || at.toLowerCase() === text.toLowerCase()) continue;
        if (sameText(P, at).some(o => (o.gloss || '').toLowerCase() === (a.gloss || '').toLowerCase())) continue;
        const al = addEntry(P, at, { gloss: (a.gloss || '').trim(), pos: root.pos, type: root.type, rec: clamp(a.rec), aliasOf: root.id, aliasKind: a.kind, region: a.region, status: 'gen',
          adult: root.adult, sensitive: root.sensitive, tm: root.tm, vulgar: root.vulgar });
        const def = Math.max(root.th[tid] || root.rec, al.rec);
        if (clamp(a.inRec) !== def) al.th[tid] = clamp(a.inRec);
        reindex(P); created++;
      }
    }
    A.changed();
    toast(`${plural(created, 'entry')} added, ${linked} linked. Status "gen": review them.`);
  };
  const body = h('div.form', {}, h('p', {}, `Generate words for "${t.name}". ${getKey() ? '' : 'You need an API key: Settings.'}`),
    h('div.two', {}, field('Model', f.model), field(t.complete ? 'Words (complete set: all of them)' : 'About how many words', f.n)),
    field('Difficulty mix', f.spread), field('Extra instructions', f.extra), out);
  return dialog('Generate words', body, [
    { label: 'Close', action: () => { ctl && ctl.abort(); } },
    { label: 'Generate', action: run },
    { label: 'Add selected', primary: true, action: () => { if (!result) throw Error('Generate first.'); add(); } },
  ], { wide: true });
}

// Rate the difficulty of unrated themes under (and including) a theme, 80 at a time.
export async function rateUnrated(tid) {
  const P = A.P;
  const todo = [P.ix.theme.get(tid), ...descendants(P, tid)].filter(t => !t.group && !t.d);
  if (!todo.length) return toast('Every theme here already has a difficulty.');
  if (!confirm(`Ask Claude to rate ${todo.length} themes?`)) return;
  let done = 0, cost = 0;
  try {
    for (let i = 0; i < todo.length; i += 80) {
      const r = await rateThemes(P, todo.slice(i, i + 80), { model: P.settings.model });
      cost += r.cost;
      for (const x of r.ratings) { const t = P.ix.theme.get(x.id); if (t && x.d >= 1 && x.d <= 5) { t.d = Math.round(x.d); done++; } }
      toast(`Rated ${done} of ${todo.length}…`);
    }
  } catch (e) { toast(e.message, true); }
  A.changed();
  toast(`Rated ${done} themes · cost $${cost.toFixed(3)}`);
}

// ---------- validation ----------

export async function showValidation() {
  const P = A.P;
  const issues = validate(P).sort((a, b) => SEV_ORDER[a.sev] - SEV_ORDER[b.sev]);
  const counts = { error: 0, warn: 0, info: 0 };
  issues.forEach(i => counts[i.sev]++);
  const kinds = [...new Set(issues.map(i => i.kind))].sort();
  const sev = { error: true, warn: true, info: false };
  const kind = select([['', 'all kinds'], ...kinds], '');
  const list = h('div.issues');
  const draw = () => {
    const shown = issues.filter(i => sev[i.sev] && (!kind.value || i.kind === kind.value));
    list.replaceChildren(h('p.hint', `${plural(shown.length, 'issue')}${shown.length > 400 ? ' (showing the first 400)' : ''}`),
      shown.slice(0, 400).map(i => h('div.issue.' + i.sev, {}, h('span.sevtag', i.sev), ' ', i.msg, ' ',
        i.themeId && h('button.link', { type: 'button', onclick: () => { A.sel = i.themeId; openPath(i.themeId); A.render(); document.querySelector('dialog')?.dispatchEvent(new Event('cancel')); } }, 'go to theme'),
        i.entryId && h('button.link', { type: 'button', onclick: () => { const e = P.ix.entry.get(i.entryId); if (e) editEntry(e); } }, 'edit'))));
  };
  const body = h('div', {}, h('div.row', {}, ['error', 'warn', 'info'].map(s => check(`${s} (${counts[s]})`, sev[s], { onchange: ev => { sev[s] = ev.target.checked; draw(); } })), kind), list);
  kind.addEventListener('change', draw);
  draw();
  return dialog('Checks', body, [{ label: 'Close', primary: true }], { wide: true });
}

export function openPath(tid) {
  let t = A.P.ix.theme.get(tid);
  while (t && t.parent) { A.open.add(t.parent); t = A.P.ix.theme.get(t.parent); }
}

// ---------- export ----------

export async function showExport() {
  const P = A.P;
  const presets = { ...PRESETS, ...(P.settings.exportPresets || {}) };
  let o = JSON.parse(JSON.stringify(DEFAULT_EXPORT));
  const tri = (label, key) => field(label, select([['include', 'include'], ['exclude', 'leave out'], ['only', 'only these']], o[key], { onchange: ev => { o[key] = ev.target.value; stale(); } }));
  const info = h('div.exportinfo', 'Press Preview to see the counts and size.');
  const stale = () => { info.textContent = 'Press Preview to update.'; };
  const regionBoxes = REGIONS.map(c => check(c, o.region.codes.includes(c), { onchange: () => { o.region.codes = regionBoxes.filter(b => b.querySelector('input').checked).map(b => b.textContent.trim()); stale(); } }));
  const regionMode = select([['all', 'everything'], ['exclude', 'leave out region-specific'], ['only', 'only region-specific']], o.region.mode, { onchange: ev => { o.region.mode = ev.target.value; stale(); } });
  const num = (key, label, min, max) => field(label, h('input', { type: 'number', min, max, value: o[key], onchange: ev => { o[key] = +ev.target.value; stale(); } }));
  const tick = (label, key) => check(label, o[key], { onchange: ev => { o[key] = ev.target.checked; stale(); } });
  const preset = select(Object.keys(presets), 'full', { onchange: ev => {
    o = Object.assign(JSON.parse(JSON.stringify(DEFAULT_EXPORT)), JSON.parse(JSON.stringify(presets[ev.target.value])));
    form.replaceWith(form = build()); stale();
  } });
  const build = () => h('div.form', {},
    h('div.three', {}, tri('Adult content', 'adult'), tri('Sensitive topics', 'sensitive'), tri('Trademark / copyright', 'tm')),
    h('div.three', {}, tri('Vulgar words', 'vulgar'), tri('Language-specific themes', 'lang'), field('Region-specific', regionMode)),
    field('Regions (empty = any)', h('div.chips', regionBoxes)),
    h('div.flags', {}, tick('Include synonyms (couch / sofa)', 'synonyms'), tick('Include spelling variants (color / colour)', 'spellings'), tick('Zipf frequency column', 'zipf'), tick('Glosses', 'gloss'), tick('Notes', 'notes'), tick('Include unrated words', 'unrated')),
    h('div.three', {}, num('recMin', 'Lowest rating to include', 1, 5), num('recMax', 'Highest rating to include', 1, 5), num('minWords', 'Minimum words per theme', 1, 20)));
  let form = build();
  let last = null;
  const run = async () => {
    reindex(P);
    last = buildExport(P, o);
    const text = JSON.stringify(last.file);
    const s = await sizeOf(text);
    const r = last.report;
    info.replaceChildren(...[h('p', {}, `${plural(r.entriesOut, 'entry')} of ${r.entriesIn.toLocaleString()} · ${plural(r.themesOut, 'theme')} of ${r.themesIn.toLocaleString()}`),
      h('p', {}, `Size ${fmtBytes(s.raw)}${s.gz ? ' · gzipped ' + fmtBytes(s.gz) : ''}`),
      r.droppedThin.length > 0 && h('p.hint', `${r.droppedThin.length} themes left out for having fewer than ${o.minWords} words after filtering.`)].filter(Boolean));
    return text;
  };
  const body = h('div', {}, field('Preset', preset), form, info);
  return dialog('Export library', body, [
    { label: 'Close' },
    { label: 'Save as preset…', action: () => { const n = prompt('Preset name'); if (!n) return false; (P.settings.exportPresets ||= {})[n] = JSON.parse(JSON.stringify(o)); A.changed(); toast('Preset saved with the project.'); return false; } },
    { label: 'Preview', action: async () => { await run(); return false; } },
    { label: 'Download', primary: true, action: async () => {
      const text = await run();
      download(`wordlist-${P.lang}-v${P.lib.version}.json`, text);
    } },
  ], { wide: true });
}

// ---------- settings ----------

export async function showSettings() {
  const P = A.P, S = P.settings;
  const key = h('input', { type: 'password', value: getKey(), placeholder: 'sk-ant-…', autocomplete: 'off' });
  const remember = check('Remember the key in this browser (localStorage)', !!localStorage.getItem('wlb2-key'));
  const f = { model: select(MODELS, S.model), min: h('input', { type: 'number', value: S.minWords, min: 1 }), maxW: h('input', { type: 'number', value: S.maxWords, min: 1 }), maxL: h('input', { type: 'number', value: S.maxLen, min: 3 }) };
  const body = h('div.form', {}, field('Anthropic API key', key, 'Used only from this browser, straight to the Anthropic API. Kept for this session unless you tick remember.'), remember,
    field('Model for generation', f.model),
    h('div.three', {}, field('Minimum words per theme', f.min), field('Longest entry, in words', f.maxW), field('Longest entry, in letters', f.maxL)));
  return dialog('Settings', body, [{ label: 'Cancel' }, { label: 'Save', primary: true, action: () => {
    setKey(key.value, remember.querySelector('input').checked);
    Object.assign(S, { model: f.model.value, minWords: +f.min.value || 4, maxWords: +f.maxW.value || 2, maxLen: +f.maxL.value || 20 });
    A.changed();
  } }]);
}
