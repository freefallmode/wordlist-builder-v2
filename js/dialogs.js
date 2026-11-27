// Dialogs: theme, entry, bulk add, generate, validation, export, settings.
import { h, select, check, field, dialog, toast, plural, fmtBytes } from './dom.js';
import { A } from './state.js';
import { newTheme, slug } from './outline.js';
import { POS, TYPES, TYPE_HELP, REGIONS, mergeRegions, FAMILIARITY_HELP, TYPICALITY_HELP, IDENT_HELP, ALIAS_KINDS, STATUS, STATUS_HELP, addEntry, entryDefaults, reindex, reindexThemes, indexEntry,
  FLAG_HELP, MODES, SENSITIVE_START, hasFirstLevel, hasMustLevels, pathOf, setKin, moveKin, deleteEntry, deleteTheme, unlinkEntry, linkTarget, moveTheme, isAncestor, uniqueThemeId, sameText, themeStats, dialectOf } from './model.js';
import { zipf, freqLoaded, loadFreq } from './freq.js';
import { loadBreaks } from './breaks.js';
import { validate, SEV_ORDER, themeNameChars } from './validate.js';
import { caseLint } from './caselint.js';
import { buildExport, DEFAULT_EXPORT, PRESETS, fixRegion, sizeOf, exportName, lintLine, reportLists, THEME_KINDS } from './export.js';
import { download } from './store.js';
import { MODELS, getKey, setKey, getModel, setModel, generateWords } from './ai.js';

const FAMILIARITY_OPTS = FAMILIARITY_HELP.map((l, i) => [i, l]);
const TYPICALITY_OPTS = [[0, 'auto'], ...TYPICALITY_HELP.slice(1).map((l, i) => [i + 1, l])];
const POPULARITY_OPTS = [[0, 'not rated'], [1, '1 headline themes people love (fruits, weather, the planets)'], [2, '2 popular'], [3, '3 ordinary'], [4, '4 less popular'], [5, '5 narrow, dry or niche']];   // theme popularity, DESIGN.md section 5

// Region ticks in the same box, with all / none links, as the region section of the Export window.
// The region section: the "region-specific" checkbox, which switches the region ticks on and off, with all / none and the ticks on one line in a box (sits right after the flag checkboxes).
const regionBox = (boxes, label, hint, extra = []) => {   // extra: codes without a tick-box, shown as text and kept on save
  const all = on => boxes.forEach(b => { b.querySelector('input').checked = on; });
  const btns = [h('button.link', { type: 'button', onclick: () => all(true) }, 'all'), h('button.link', { type: 'button', onclick: () => all(false) }, 'none')];
  const lock = () => { const off = !toggle.querySelector('input').checked; boxes.forEach(b => { b.querySelector('input').disabled = off; }); btns.forEach(b => { b.disabled = off; }); };
  const toggle = check(label, boxes.some(b => b.querySelector('input').checked), { onchange: ev => { if (!ev.target.checked) all(false); lock(); } });
  lock();
  return h('div.regionbox', {}, h('div.chips', [toggle, ...btns, ...boxes, extra.length > 0 && h('span.hint', 'also: ' + extra.join(', '))]), h('div.hint', hint));
};

// Theme picker by name: a text box with a datalist. Returns { input, get() } where get() gives a theme id or null.
let listSeq = 0;
function themePicker(placeholder, { groups = true } = {}) {
  const P = A.P, id = 'tl' + listSeq++;
  const list = h('datalist', { id });
  const byName = new Map();
  for (const t of P.themes) { if (!groups && t.group) continue; byName.set(t.name.toLowerCase(), t.id); list.append(h('option', { value: t.name }, pathOf(P, t.id).slice(0, -1).join(' > '))); }
  const input = h('input', { list: id, placeholder });
  return { node: h('span.picker', {}, input, list), input, get: () => byName.get(input.value.trim().toLowerCase()) || null };
}

// Level boxes (model.js level fields), one per game mode. levelRow lays boxes out as Easy [ ] Medium [ ] Hard [ ].
const levelRow = (boxes, extra) => h('div.chips', {}, ...MODES.map((m, i) => h('span', {}, m[0].toUpperCase() + m.slice(1) + ' ', boxes[i])), extra);
// First level (theme and entry dialogs): a number box per mode (blank = anywhere) and a "same for all" tick that copies Easy into the other two.
// read() gives [easy, medium, hard] (null = anywhere) or throws a message for the dialog's error line.
function firstLevelBoxes(fl) {
  const fl0 = Array.isArray(fl) ? fl : [null, null, null];
  const boxes = MODES.map((m, i) => h('input.level', { type: 'number', min: 1, step: 1, value: fl0[i] ?? '', placeholder: 'anywhere', 'aria-label': 'First level, ' + m, style: 'width:6em' }));
  const same = check('same for all', fl0[0] != null && fl0.every(v => v === fl0[0]), { onchange: () => sync() });
  const sync = () => { const on = same.querySelector('input').checked; boxes.slice(1).forEach(b => { b.disabled = on; if (on) b.value = boxes[0].value; }); };
  boxes[0].addEventListener('input', () => { if (same.querySelector('input').checked) sync(); });
  sync();
  const read = () => boxes.map((b, i) => { const s = b.value.trim(); if (!s) return null; if (!/^\d+$/.test(s) || +s < 1) throw Error(`First level, ${MODES[i]}: "${s}" is not a whole number of 1 or more.`); return +s; });
  return { node: levelRow(boxes, same), boxes, read, sig: () => boxes.map(b => b.value).join('/') };
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
    tkind: select(THEME_KINDS.map(k => [k, k]), w.tkind || 'category'),
    rule: h('input', { value: w.rule || '', placeholder: 'hidden:tree, rhyme:ake, palindrome, compound-end:bag, compound-start:snow' }),
    pop: select(POPULARITY_OPTS, w.pop || 0),
    ident: select(IDENT_HELP.map((l, v) => [v, l]), w.ident || 0),
    locked: select([['auto', 'Follow the kind (locked for wordplay, compound and language-specific)'], ['locked', 'Locked: show exactly the linked word'], ['free', 'Allowed: regional and family words may stand in']], w.locked === undefined ? 'auto' : w.locked ? 'locked' : 'free'),
  };
  const flags = ['enabled', 'group', 'complete', 'adult', 'offensive', 'tm', 'lang', 'foreign', 'nameOk'];   // adult, offensive, trademark, language: the order of the Export window (themes have no sensitive flag since 2026-11-27: First level 31)
  const flagLabel = { enabled: 'Enabled', group: 'Group (a folder, never played)', complete: 'Complete set (finite, fixed: months, planets)', adult: 'Adult content', offensive: 'Offensive topic (its words leave the default export)',
    tm: 'Trademark / copyright', lang: 'Language-specific (English spelling, sound or slang)', foreign: 'Foreign language (the words are mostly not English)', nameOk: "Words may contain the theme's own words (wordplay themes)" };
  const boxes = Object.fromEntries(flags.map(k => [k, check(flagLabel[k], w[k])]));
  const famBox = check('Same-family words may be separate answers (tenses, male/female titles, anagrams)', !!w.familyOk, { title: 'familyOk: the family-pair check skips this theme. Only for themes where the form of the word is the point. This theme only (not inherited); generation never sets it.' });
  const regionBoxes = REGIONS.map(c => check(c, w.region.includes(c), { 'data-c': c }));
  // Level fields (model.js): First level per game mode (blank = anywhere), with "same for all" copying the easy box; Must appear in levels, comma-separated per mode.
  const flBoxes = firstLevelBoxes(w.firstLevel), ml0 = hasMustLevels(w) ? w.mustLevels : [[], [], []];
  const mlBox = MODES.map((m, i) => h('input.levels', { value: ml0[i].join(', '), placeholder: 'e.g. 5, 12', 'aria-label': 'Must appear in levels, ' + m, style: 'width:9em' }));
  const body = h('div.form', {},
    field('Name', f.name),
    field('Parent theme', parentPick.node, 'Leave empty for a top-level group.'),
    h('div.flags', [...Object.values(boxes), famBox]),
    regionBox(regionBoxes, 'Region-specific', 'Tick the countries the theme is mainly known in (US states, British politics).', w.region.filter(c => !REGIONS.includes(c))),
    h('div.hint.flaghelp', {}, ['adult', 'offensive', 'tm', 'lang', 'foreign'].map(k => h('div', {}, FLAG_HELP[k]))),
    field('First level', flBoxes.node, `The first level of each game mode the theme may appear at; blank = anywhere. A sensitive topic (religion, politics, death) starts at ${SENSITIVE_START}. Otherwise set only when Simon asks.`),
    field('Must appear in levels', levelRow(mlBox), 'Levels of each game mode in which the game must show the theme, comma-separated (5, 12); blank = none. Set only when Simon asks.'),
    field('Kind', f.tkind, 'category = kinds of one thing; place; property = members share an attribute; wordplay = chosen by spelling or sound; compound = members combine with a shared word.'),
    field('Rule', f.rule, 'Wordplay and compound themes only: how the game tests a word. hidden:<what>, rhyme:<ending>, palindrome, anagram, homophone, onomatopoeia, double-letters, starts:<what>, ends:<ending> (for a category, name the theme by id: starts:@colors, hidden:@birds), contains:<letters>, compound-end:<word> for ___ word, compound-start:<word> for word ___, or other.'),
    field('Word substitution', f.locked, 'Whether the game may show a regional, spelling or alias word in place of the one linked (US word for a UK player). Locked themes always show the linked word.'),
    field('Theme popularity', f.pop, 'How familiar and appealing the theme is for a general player (1 most popular ... 5 least). How hard a theme is to work out is its identifiability.'),
    field('Identifiability', f.ident, 'How easily a player works out the theme from its members (1 obvious ... 5 obscure). Wordplay themes and broad themes ("things made of metal") rate high even when their words are easy.'),
    field('Note', f.note, 'Shown to the word generator and to people. For complete sets, list the exact members.'),
    !isNew && h('p.hint', {}, `${plural(themeStats(P, t.id).entries, 'entry')} linked. Flags belong to this theme only: sub-themes do not inherit them.`));
  return dialog(isNew ? 'New theme' : 'Theme: ' + t.name, body, [
    { label: 'Cancel' },
    !isNew && { label: 'Delete', action: async () => {
      if (!confirm(`Delete "${t.name}"? Its sub-themes move up a level and words stay but lose this link.`)) return false;
      const touch = deleteTheme(P, t.id); if (A.sel === t.id) A.sel = t.parent; A.changed(touch); } },
    { label: 'Save', primary: true, action: () => {
      const name = f.name.value.trim();
      if (!name) throw Error('A theme needs a name.');
      if (themeNameChars(name)) throw Error(`A theme name cannot have ${themeNameChars(name)} (the outline format uses it).`);
      if (P.themes.some(x => x !== t && x.name.toLowerCase() === name.toLowerCase())) throw Error('Another theme already has this name.');
      const pname = parentPick.input.value.trim(), parent = pname ? parentPick.get() : null;
      if (pname && !parent) throw Error('Parent theme not found.');
      if (parent && (parent === t.id || (!isNew && isAncestor(P, t.id, parent)))) throw Error('A theme cannot be inside itself.');
      Object.assign(w, { name, note: f.note.value.trim(), pop: +f.pop.value, ident: +f.ident.value });
      const tk = f.tkind.value, rule = f.rule.value.trim();
      if (tk === 'compound' && !/^compound-(end|start):./.test(rule)) throw Error('A compound theme needs a rule: compound-end:<word> or compound-start:<word>.');
      if (tk === 'wordplay' && !rule) throw Error('A wordplay theme needs a rule (or other).');
      if (tk === 'category') delete w.tkind; else w.tkind = tk;
      if ((tk === 'wordplay' || tk === 'compound') && rule) w.rule = rule; else delete w.rule;
      for (const k of flags) w[k] = boxes[k].querySelector('input').checked;
      { const fl = flBoxes.read();
        const ml = mlBox.map((b, i) => { const ps = b.value.split(/[\s,]+/).filter(Boolean); const bad = ps.find(s => !/^\d+$/.test(s) || +s < 1); if (bad) throw Error(`Must appear in levels, ${MODES[i]}: "${bad}" is not a whole number of 1 or more.`); return [...new Set(ps.map(Number))].sort((a, b) => a - b); });
        ml.forEach((l, i) => { const low = fl[i] == null ? [] : l.filter(v => v < fl[i]); if (low.length) throw Error(`Must appear in levels, ${MODES[i]}: ${low.join(', ')} ${low.length === 1 ? 'is' : 'are'} below the first ${MODES[i]} level ${fl[i]}.`); });
        if (fl.some(v => v != null)) w.firstLevel = fl; else delete w.firstLevel;
        if (ml.some(l => l.length)) w.mustLevels = ml; else delete w.mustLevels; }
      w.region = mergeRegions(t.region, regionBoxes.filter(b => b.querySelector('input').checked).map(b => b.querySelector('input').dataset.c));
      const oldParent = t.parent;
      Object.assign(t, w, { parent: oldParent });
      if (!w.tkind) delete t.tkind;
      if (!w.rule) delete t.rule;
      if (!w.firstLevel) delete t.firstLevel; if (!w.mustLevels) delete t.mustLevels;
      if (f.locked.value === 'auto') delete t.locked; else t.locked = f.locked.value === 'locked';
      if (famBox.querySelector('input').checked) t.familyOk = true; else delete t.familyOk;
      if (isNew) { t.id = uniqueThemeId(P, slug(name)); P.themes.push(t); reindexThemes(P); moveTheme(P, t.id, parent); A.sel = t.id; if (parent) A.open.add(parent); }
      else if ((parent || null) !== (oldParent || null)) { reindexThemes(P); moveTheme(P, t.id, parent); if (parent) A.open.add(parent); }
      A.changed({ themes: true });
    } },
  ].filter(Boolean), { wide: true });
}

export const addTheme = parentId => editTheme(Object.assign(newTheme('', parentId || null), { name: '' }), true);

// ---------- entry ----------

export async function editEntry(e, { isNew = false, themeId = null } = {}) {
  const P = A.P;
  const w = { ...e, region: [...e.region], typ: { ...e.typ }, show: { ...e.show } };
  if (isNew && themeId && !w.aliasOf) w.typ[themeId] = w.typ[themeId] ?? 0;
  const f = {
    text: h('input', { value: w.text, autofocus: true }),
    gloss: h('input', { value: w.gloss, placeholder: 'only if the text has other meanings, e.g. donkey' }),
    pos: select(POS, w.pos), type: select(TYPES.map(t => [t, `${t} — ${TYPE_HELP[t]}`]), w.type),
    fam: select(FAMILIARITY_OPTS, w.fam), status: select(STATUS.map(s => [s, `${s} — ${STATUS_HELP[s]}`]), w.status),
    note: h('textarea', { rows: 2 }, w.note), kind: select(ALIAS_KINDS.map(k => [k, k || '(not an alias)']), w.aliasKind),
  };
  const flags = { enabled: 'Enabled', adult: 'Adult', offensive: 'Offensive', tm: 'Trademark / copyright' };   // the order of the Export window (no sensitive since 2026-11-27: First level 31)
  const flBoxes = firstLevelBoxes(w.firstLevel);   // roots only: an alias follows its root
  const boxes = Object.fromEntries(Object.keys(flags).map(k => [k, check(flags[k], w[k])]));
  const regionBoxes = REGIONS.map(c => check(c, w.region.includes(c), { 'data-c': c }));

  // alias target: text box + datalist of matching entries ("text (meaning) #id")
  const aliasList = h('datalist', { id: 'al' + listSeq });
  const aliasInput = h('input', { list: 'al' + listSeq++, placeholder: 'type a word, pick from the list' });
  const labelOf = x => `${x.text}${x.gloss ? ' (' + x.gloss + ')' : ''} #${x.id}`;
  const root0 = w.aliasOf && P.ix.entry.get(w.aliasOf);
  if (root0) aliasInput.value = labelOf(root0);
  aliasInput.addEventListener('input', () => {
    const q = aliasInput.value.toLowerCase().replace(/ #\d+$/, '');
    aliasList.replaceChildren(...(q.length < 2 ? [] : P.entries.filter(x => x !== e && !x.aliasOf && x.text.toLowerCase().startsWith(q)).slice(0, 12).map(x => h('option', { value: labelOf(x) }))));
  });

  // Related words (kin): root entries of the same word family in other themes (DESIGN-entries.md 3.7). Kept on both entries; applied at save.
  const kin = [...(e.kin || [])];
  const kinList = h('datalist', { id: 'kl' + listSeq });
  const kinInput = h('input', { list: 'kl' + listSeq++, placeholder: 'type a word, pick from the list' });
  kinInput.addEventListener('input', () => {
    const q = kinInput.value.toLowerCase().replace(/ #\d+$/, '');
    kinList.replaceChildren(...(q.length < 2 ? [] : P.entries.filter(x => x !== e && !x.aliasOf && !kin.includes(x.id) && x.text.toLowerCase().startsWith(q)).slice(0, 12).map(x => h('option', { value: labelOf(x) }))));
  });
  const kinBox = h('div.kin');
  const kinRow = id => {
    const k = P.ix.entry.get(id), n = k ? Object.keys(k.typ).length : 0;
    return h('div.row', {},
      h('a', { href: '#', onclick: async ev => { ev.preventDefault(); if (k && await editEntry(k)) A.changed(); } }, k ? labelOf(k).replace(/ #\d+$/, '') : '#' + id + ' (missing)'),
      k && ` · ${n} theme${n === 1 ? '' : 's'} `,
      h('button.link', { type: 'button', title: 'Remove this kin', onclick: () => { kin.splice(kin.indexOf(id), 1); drawKin(); } }, '✕'));
  };
  const drawKin = () => kinBox.replaceChildren(
    ...(kin.length ? kin.map(kinRow) : [h('p.hint', 'None.')]),
    h('div.row', {}, h('span.picker', {}, kinInput, kinList), h('button', { type: 'button', onclick: () => {
      const m = kinInput.value.match(/#(\d+)$/), k = m && P.ix.entry.get(+m[1]);
      if (!k || k === e) return toast('Pick a word from the list.', true);
      if (k.aliasOf) return toast('Pick the root entry, not an alias.', true);
      if (!kin.includes(k.id)) kin.push(k.id);
      kinInput.value = ''; drawKin();
    } }, 'Add kin')));
  drawKin();
  const kinBlock = !w.aliasOf && h('div', {}, h('h3', 'Related words (kin)'),
    h('p.hint', 'The same word family in other themes (joy in emotions, joyful in happy words). The game never puts kin in one level. Stored on both words.'), kinBox);

  // Has anything been changed since the dialog opened? (Used to ask before leaving for a theme.)
  const sig = () => JSON.stringify([f.text.value, f.gloss.value, f.pos.value, f.type.value, f.fam.value, f.status.value, f.note.value, f.kind.value, aliasInput.value,
    Object.values(boxes).map(b => b.querySelector('input').checked), regionBoxes.map(b => b.querySelector('input').checked), flBoxes.sig(), w.typ, w.show, kin]);
  const initialSig = sig();
  const linksBox = h('div.links');
  const addPick = themePicker('add a theme…', { groups: false });
  const drawLinks = () => {
    const rootId = (() => { const m = aliasInput.value.match(/#(\d+)$/); return m ? +m[1] : 0; })();
    const root = rootId && P.ix.entry.get(rootId);
    const ids = new Set([...Object.keys(w.typ), ...(root ? Object.keys(root.typ) : [])]);
    linksBox.replaceChildren(
      ids.size ? h('table.links', {}, h('tr', {}, h('th', 'Theme'), h('th', root ? 'Typicality here (auto = harder of root and own)' : 'Typicality in this theme'), h('th', { title: 'What the theme shows the player instead of the full text, e.g. sun for sun hat in hats. Leave empty to show the full text.' }, 'Shown as'), h('th')),
        [...ids].map(tid => {
          const inherited = !!root && !(tid in w.typ);
          const own = tid in w.typ;
          return h('tr', { class: inherited ? 'inherited' : '' },
            h('td', {}, h('a', { href: '#', title: pathOf(P, tid).join(' > '), onclick: async ev => {
              ev.preventDefault();
              if (!P.ix.theme.has(tid)) return;
              const dlg = ev.target.closest('dialog');
              if (sig() !== initialSig) {
                // Unsaved edits: offer to save them, drop them, or stay.
                const choice = await dialog('Unsaved changes', h('p', 'You have changed this entry. Save before going to the theme?'), [
                  { label: 'Stay', action: () => 'stay' },
                  { label: 'Discard changes', action: () => 'discard' },
                  { label: 'Save and go', primary: true, action: () => { save(); return 'save'; } },   // a validation error stays in the prompt
                ]);
                if (choice !== 'save' && choice !== 'discard') return;
              }
              A.sel = tid; openPath(tid); A.filter = '';
              dlg.dispatchEvent(new Event('cancel'));   // closes the entry dialog
              A.render();
            } }, P.ix.theme.get(tid)?.name || tid + ' (missing)'), inherited && h('span.hint', ' from root (links live on the root)')),
            h('td', {}, inherited ? select(TYPICALITY_OPTS, root.typ[tid] || 0, { disabled: true }) : select(TYPICALITY_OPTS, w.typ[tid] || 0, { onchange: ev => { w.typ[tid] = +ev.target.value; } })),
            h('td', {}, own && h('input.shown', { value: w.show[tid] || '', placeholder: 'full text', size: 14, oninput: ev => { const v = ev.target.value.trim(); if (v) w.show[tid] = v; else delete w.show[tid]; } })),
            h('td', {}, (own || !root) && h('button.link', { type: 'button', title: 'Unlink', onclick: () => { delete w.typ[tid]; delete w.show[tid]; drawLinks(); } }, '✕')));
        })) : h('p.hint', 'Not linked to any theme yet.'),
      root ? h('p.hint', 'An alias holds no links of its own: the themes are those of the root. Edit the root to link a theme.') : h('div.row', {}, addPick.node, h('button', { type: 'button', onclick: () => {
        const tid = addPick.get();
        if (!tid) return toast('Pick a theme from the list.', true);
        if (!(tid in w.typ)) w.typ[tid] = 0;
        addPick.input.value = ''; drawLinks();
      } }, 'Link')));
  };
  aliasInput.addEventListener('change', drawLinks);
  drawLinks();

  const aliases = P.entries.filter(a => a.aliasOf === e.id);
  // "This is an alias of" (for an alias) and "Aliases of this entry" (for a root) sit in one place, under Themes; only the one that applies shows.
  const rootEntry = () => { const m = aliasInput.value.match(/#(\d+)$/); return m && P.ix.entry.get(+m[1]); };
  const rootLabel = () => { const r = rootEntry(); return r ? r.text + (r.gloss ? ` (${r.gloss})` : '') : ''; };
  const rootLink = h('a', { href: '#', onclick: async ev => {
    ev.preventDefault();
    const r = rootEntry();
    if (!r) return toast('Pick the root entry first.', true);
    if (await editEntry(r)) A.changed();
  } }, rootLabel());
  const picker = field('Pick the root entry', aliasInput, 'An alias takes its themes from its root unless it is linked to a theme itself (regional, synonym, abbreviation and translation aliases may be; one member of the family per theme); it has its own flags and familiarity. Spelling = same word spelled differently (color/colour); regional = the same thing under another regional word (sidewalk/pavement); synonym = a strict substitute that is always the same answer (besan/gram flour). A near match in meaning (sofa/couch) is an entry of its own, with a synonym group in the theme.');
  const linkRow = h('div.row', {}, rootLink, h('button.link', { type: 'button', onclick: () => { picker.hidden = !picker.hidden; } }, 'change'));
  picker.hidden = !!w.aliasOf;
  linkRow.hidden = !w.aliasOf;
  aliasInput.addEventListener('change', () => { rootLink.textContent = rootLabel(); linkRow.hidden = !rootEntry(); });
  const aliasSection = h('div', {}, h('h3', 'This is an alias of'), linkRow, picker, aliasList, field('Alias kind', f.kind));
  const aliasesList = h('div', {}, h('h3', 'Aliases of this entry'), aliases.map(a => h('div.row', {},
    h('a', { href: '#', onclick: async ev => { ev.preventDefault(); if (await editEntry(a)) A.changed(); } }, a.text),
    ` ${a.aliasKind || '?'}${a.region.length ? ' · ' + a.region.join('/') : ''} · familiarity ${a.fam || '?'}`)));
  // A root that has aliases cannot become one; a root without any gets a link that reveals the field.
  const revealer = h('div.row', {}, h('button.link', { type: 'button', onclick: () => { revealer.replaceWith(aliasSection); picker.hidden = false; } }, 'Make this an alias of another entry…'));
  const aliasBlock = w.aliasOf ? aliasSection : aliases.length ? aliasesList : revealer;
  const zv = freqLoaded() && w.text ? zipf(w.text) : undefined;

  const body = h('div.form', {},
    h('div.two', {}, field('Text (as written, with capitals)', f.text), field('Meaning/context', f.gloss)),
    h('div.two', {}, field('Part of speech', f.pos), field('Type', f.type)),
    h('div.two', {}, field('Familiarity (the word itself)', f.fam, zv === undefined ? '' : zv === null ? 'Not in the frequency list.' : `Zipf frequency ${zv.toFixed(1)} (4+ common, 3 uncommon, 2 rare).`), field('Status', f.status)),
    h('div.flags', Object.values(boxes)),
    regionBox(regionBoxes, 'Region-specific', 'Tick the countries the word is mainly known in (lorry, pavement).', w.region.filter(c => !REGIONS.includes(c))),
    h('div.hint.flaghelp', {}, ['adult', 'offensive', 'tm'].map(k => h('div', {}, FLAG_HELP[k]))),
    w.aliasOf ? h('p.hint', 'First level: an alias follows its root.') : field('First level', flBoxes.node, `The first level of each game mode the word may appear at; blank = anywhere. ${FLAG_HELP.late}`),
    h('h3', 'Themes'), linksBox,
    aliasBlock,
    kinBlock,
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
    if (dup) throw Error(`"${text}${gloss ? ' (' + gloss + ')' : ''}" already exists. Give each a meaning/context to tell them apart.`);
    const others = sameText(P, text).filter(x => x !== e);
    if (others.length && !gloss) throw Error(`"${text}" already exists with another meaning; give this one a meaning/context.`);
    const m = aliasInput.value.match(/#(\d+)$/);
    const aliasOf = aliasInput.value.trim() ? (m ? +m[1] : -1) : 0;
    if (aliasOf === -1 || (aliasOf && !P.ix.entry.get(aliasOf))) throw Error('Pick the alias target from the list.');
    if (aliasOf && P.ix.entry.get(aliasOf).aliasOf) throw Error('Point the alias at the root entry, not at another alias.');
    if (aliasOf && aliasOf === e.id) throw Error('An entry cannot be an alias of itself.');
    if (aliasOf && Object.keys(w.typ).length) throw Error('An alias holds no links of its own: unlink it from its themes (✕) and link the root instead.');
    if (aliasOf && e.id && P.entries.some(a => a.aliasOf === e.id)) throw Error('This entry has aliases of its own; move them first.');
    Object.assign(w, { text, gloss, pos: f.pos.value, type: f.type.value, fam: +f.fam.value, status: f.status.value, note: f.note.value.trim(), aliasOf,
      aliasKind: aliasOf ? (f.kind.value || 'synonym') : '' });
    for (const k of Object.keys(flags)) w[k] = boxes[k].querySelector('input').checked;
    { const fl = aliasOf ? null : flBoxes.read(); w.firstLevel = fl && fl.some(v => v != null) ? fl : null; }   // firstLevel lives on roots; an entry that becomes an alias drops it
    w.region = mergeRegions(e.region, regionBoxes.filter(b => b.querySelector('input').checked).map(b => b.querySelector('input').dataset.c));
    const unlinked = isNew ? [] : Object.keys(e.typ).filter(tid => !(tid in w.typ));
    const kinOld = e.kin || [];
    delete w.kin;
    Object.assign(e, w);
    for (const tid of unlinked) unlinkEntry(P, e, tid);   // also drops its form used, name allowance and synonym groups there
    if (isNew) { e.id = P.nextId++; e.kin = []; P.entries.push(e); }
    const kinTouched = [...new Set([...kinOld, ...kin])].map(id => P.ix.entry.get(id)).filter(Boolean);
    for (const k of kinTouched) setKin(P, e, k, kin.includes(k.id));
    if (e.aliasOf && e.kin.length) { const r = P.ix.entry.get(e.aliasOf); kinTouched.push(r); moveKin(P, e, r); }   // kin lives on the root
    A.changed({ entries: [e, ...kinTouched] });   // its aliases are re-filed with it
  };
  return dialog(isNew ? 'New entry' : `Entry: ${e.text}${e.gloss ? ' (' + e.gloss + ')' : ''}`, body, [
    { label: 'Cancel' },
    !isNew && { label: 'Delete', action: () => { if (!confirm(`Delete "${e.text}"?`)) return false; A.changed(deleteEntry(P, e)); } },
    { label: 'Save', primary: true, action: save },
  ].filter(Boolean), { wide: true });
}

// ---------- add words ----------

export async function bulkAdd(tid) {
  const P = A.P, t = P.ix.theme.get(tid);
  const ta = h('textarea', { rows: 12, placeholder: 'One word per line.\nOptional extras after |  :  meaning | familiarity | typicality\n  ass | donkey | 1 | 2' });
  const d = { pos: select(POS, 'noun'), type: select(TYPES, 'common'), fam: select(FAMILIARITY_OPTS, 0), typicality: select(TYPICALITY_OPTS, 0) };
  const body = h('div.form', {}, h('p', {}, `Adding to "${t.name}". Words that already exist are just linked.`), ta,
    h('div.two', {}, field('Part of speech', d.pos), field('Type', d.type)), h('div.two', {}, field('Familiarity', d.fam), field('Typicality in this theme', d.typicality)));
  return dialog('Add words', body, [{ label: 'Cancel' }, { label: 'Add', primary: true, action: () => {
    let added = 0, linked = 0; const problems = [], touched = [], viaRoot = [];
    for (const line of ta.value.split('\n')) {
      if (!line.trim()) continue;
      const [text, gloss = '', fam = '', typ = ''] = line.split('|').map(s => s.trim());
      const same = sameText(P, text), hit = same.find(x => (x.gloss || '').toLowerCase() === gloss.toLowerCase());
      if (hit) { const m = linkTarget(P, hit); if (m !== hit) viaRoot.push(text); if (!(tid in m.typ)) { m.typ[tid] = +typ || +d.typicality.value; touched.push(m); linked++; } continue; }   // an alias holds no links: its root is linked
      if (same.length && !gloss) { problems.push(text); continue; }
      indexEntry(P, addEntry(P, text, { gloss, pos: d.pos.value, type: d.type.value, fam: +fam || +d.fam.value, typ: { [tid]: +typ || +d.typicality.value } })); added++;   // filed at once: a later line may repeat it
    }
    A.changed({ entries: touched });
    toast(`${plural(added, 'word')} added, ${linked} linked` + (viaRoot.length ? `; ${viaRoot.join(', ')} ${viaRoot.length === 1 ? 'is an alias' : 'are aliases'}: the root was linked` : '') + (problems.length ? `; need a meaning/context: ${problems.join(', ')}` : ''), problems.length > 0);
  } }], { wide: true });
}

// ---------- generate ----------

export async function generate(tid) {
  const P = A.P, t = P.ix.theme.get(tid);
  const f = {
    model: select(MODELS, getModel()), n: h('input', { type: 'number', value: 20, min: 4, max: 80 }),
    spread: select([['even', 'spread across easy, medium, hard'], ['easy', 'well-known words first'], ['hard', 'harder words']], 'even'),
    extra: h('input', { placeholder: 'optional, e.g. include some tropical ones' }),
  };
  const out = h('div.gen');
  let result = null, ctl = null;
  const run = async st => {
    setModel(f.model.value);
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
    out.replaceChildren(h('table.gen', {}, h('tr', {}, h('th'), h('th', 'Word'), h('th', 'pos'), h('th', 'type'), h('th', 'familiarity'), h('th', 'typicality'), h('th', 'flags'), h('th', 'aliases')),
      result.map(x => {
        const exists = sameText(P, x.text).find(o => (o.gloss || '').toLowerCase() === (x.gloss || '').toLowerCase());
        return h('tr', { class: exists ? 'exists' : '' },
          h('td', {}, h('input', { type: 'checkbox', checked: x.take, onchange: ev => { x.take = ev.target.checked; } })),
          h('td', {}, x.text, x.gloss && h('span.hint', ` (${x.gloss})`), exists && h('span.hint', ' · exists, will be linked')),
          h('td', x.pos.slice(0, 3)), h('td', x.type), h('td', clamp(x.familiarity)), h('td', clamp(x.typicality)),
          h('td', ['adult', 'level31', 'tm', 'offensive'].filter(k => x[k]).map(k => k === 'level31' ? '31+' : k[0].toUpperCase()).join(' ') + (x.region.length ? ' ' + x.region.join('/') : '')),
          h('td', x.aliases.map(a => `${a.text} (${a.kind}${a.region.length ? ' ' + a.region.join('/') : ''}, ${clamp(a.familiarity)})`).join(', ')));
      })));
  };
  const add = () => {
    let created = 0, linked = 0; const touched = [];
    for (const x of result.filter(r => r.take)) {
      const text = x.text.trim(); if (!text) continue;
      const gloss = (x.gloss || '').trim();
      let root = sameText(P, text).find(o => (o.gloss || '').toLowerCase() === gloss.toLowerCase());
      if (root) {   // an existing word (or one of its alias family) is linked if no member of the family is in the theme yet; an alias is linked through its root
        const fam = root.aliasOf ? P.ix.entry.get(root.aliasOf) : root;
        if (![fam, ...P.entries.filter(a => a.aliasOf === fam.id)].some(m => tid in m.typ)) { const m = linkTarget(P, root); m.typ[tid] = clamp(x.typicality); touched.push(m); linked++; }
        root = fam;
      } else {
        root = addEntry(P, text, { gloss, pos: x.pos, type: x.type, fam: clamp(x.familiarity), adult: x.adult, firstLevel: x.level31 ? [SENSITIVE_START, SENSITIVE_START, SENSITIVE_START] : null, tm: x.tm, offensive: x.offensive, region: x.region,
          status: 'gen', typ: { [tid]: clamp(x.typicality) } });
        indexEntry(P, root); created++;
      }
      for (const a of x.aliases) {
        const at = a.text.trim(); if (!at || at.toLowerCase() === text.toLowerCase()) continue;
        if (sameText(P, at).some(o => (o.gloss || '').toLowerCase() === (a.gloss || '').toLowerCase())) continue;
        const al = addEntry(P, at, { gloss: (a.gloss || '').trim(), pos: root.pos, type: root.type, fam: clamp(a.familiarity), aliasOf: root.id, aliasKind: a.kind, region: a.region, status: 'gen',
          adult: root.adult, tm: root.tm, offensive: root.offensive });
        indexEntry(P, al); created++;   // the alias follows its root's links; a family has only one member linked in a theme
      }
    }
    A.changed({ entries: touched });
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
    list.replaceChildren(...[h('p.hint', `${plural(shown.length, 'issue')}${shown.length > 400 ? ' (showing the first 400)' : ''}`),
      shown.slice(0, 400).map(i => h('div.issue.' + i.sev, {}, h('span.sevtag', i.sev), ' ', i.msg, ' ',
        i.themeId && h('button.link', { type: 'button', onclick: () => { A.sel = i.themeId; openPath(i.themeId); A.render(); document.querySelector('dialog')?.dispatchEvent(new Event('cancel')); } }, 'go to theme'),
        i.entryId && h('button.link', { type: 'button', onclick: () => { const e = P.ix.entry.get(i.entryId); if (e) editEntry(e); } }, 'edit')))].flat());
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
  let o = JSON.parse(JSON.stringify(DEFAULT_EXPORT)), presetName = 'full';
  const info = h('div.exportinfo', 'Press Preview to see the counts and size.');
  const stale = () => { info.textContent = 'Press Preview to update.'; };
  const num = (key, label, min, max) => field(label, h('input', { type: 'number', min, max, value: o[key], onchange: ev => { o[key] = +ev.target.value; stale(); } }));
  const tick = (label, key) => check(label, o[key], { onchange: ev => { o[key] = ev.target.checked; stale(); } });
  const inc = (label, key) => check(label, o[key] !== 'exclude', { onchange: ev => { o[key] = ev.target.checked ? 'include' : 'exclude'; stale(); } });   // flag filters: ticked = include, unticked = leave out
  const preset = select(Object.keys(presets), 'full', { onchange: ev => {
    presetName = ev.target.value; o = Object.assign(JSON.parse(JSON.stringify(DEFAULT_EXPORT)), JSON.parse(JSON.stringify(presets[presetName])));
    form.replaceWith(form = build()); stale();
  } });
  const build = () => {
    o.region = fixRegion(o.region);
    if (o.region.mode === 'only') o.region.mode = 'all';
    const boxes = REGIONS.map(c => check(c, o.region.codes.includes(c), { onchange: () => set() }));
    const set = () => { o.region.codes = boxes.filter(b => b.querySelector('input').checked).map(b => b.textContent.trim()); stale(); };
    const all = on => { boxes.forEach(b => { b.querySelector('input').checked = on; }); set(); };
    const lock = () => { const off = o.region.mode === 'all'; boxes.forEach(b => { b.querySelector('input').disabled = off; }); both.forEach(b => { b.disabled = off; }); };
    const both = [h('button.link', { type: 'button', onclick: () => all(true) }, 'all'), h('button.link', { type: 'button', onclick: () => all(false) }, 'none')];
    const mode = check('Include region-specific words and themes', o.region.mode === 'all', { onchange: ev => { o.region.mode = ev.target.checked ? 'all' : 'exclude'; lock(); stale(); } });
    const region = h('div.regionbox', {}, mode,
      h('div.hint', 'If unticked, leave out words and themes tagged with any of these regions:'), h('div.chips', [...both, ...boxes]));
    lock();
    return h('div.form', {},
      h('div.two', {}, inc('Include adult content', 'adult'), inc('Include offensive words (off by default)', 'offensive'), inc('Include words and themes held to level 31 (first level 31+ in every mode)', 'sensitive'), inc('Include trademark / copyright', 'tm'), inc('Include language-specific themes', 'lang')),
      region,
      h('div.two', {}, tick('Include synonyms (couch / sofa)', 'synonyms'), tick('Include spelling variants (color / colour)', 'spellings'), tick('Include unrated words', 'unrated'), tick('Zipf frequency column', 'zipf'), tick('Meanings', 'gloss'), tick('Notes', 'notes')),
      h('div.two', {}, num('recMin', 'Easiest difficulty to include', 1, 5), num('recMax', 'Hardest difficulty to include', 1, 5), num('minWords', 'Minimum words per theme', 1, 20), num('maxEntryWords', 'Longest entry in words (0 = no limit)', 0, 10)));
  };
  let form = build();
  let last = null;
  const run = async (unsaved = false) => {
    reindex(P);
    let brkErr = null; if (P.lang === 'en') try { await loadBreaks(); } catch (e) { brkErr = e instanceof TypeError ? 'could not fetch it; serve the folder over http' : e.message; }   // the table is English-only: other languages are not fetched for and get no break points
    let frqErr = null; if (o.zipf && P.lang === 'en' && !freqLoaded()) try { await loadFreq(); } catch (e) { frqErr = e instanceof TypeError ? 'could not fetch it; serve the folder over http' : e.message; }   // the Zipf column is zeros without the list
    last = buildExport(P, o);
    if (unsaved) last.file.lib.unsaved = true;   // the library has edits no project file holds: this export's version is not a saved version (GAME-CONTRACT.md, DESIGN.md 8.6)
    const text = JSON.stringify(last.file);
    const s = await sizeOf(text);
    const r = last.report;
    info.replaceChildren(...[h('p', {}, `${plural(r.entriesOut, 'entry')} of ${r.entriesIn.toLocaleString()} · ${plural(r.themesOut, 'theme')} of ${r.themesIn.toLocaleString()}`),
      h('p', {}, `Size ${fmtBytes(s.raw)}${s.gz ? ' · gzipped ' + fmtBytes(s.gz) : ''}`),
      brkErr && h('p.hint', `Break table did not load (${brkErr}): this file has no break points, so the game will not hyphenate long words.`),
      frqErr && h('p.hint', `Frequency list did not load (${frqErr}): the Zipf column of this file is all zeros.`),
      r.droppedThin.length > 0 && h('p.hint', `${r.droppedThin.length} themes left out for having fewer than ${o.minWords} words after filtering.`),
      ...reportLists(r, o.minWords).map(l => h('details', {}, h('summary', {}, l.title), h('p.hint', {}, l.why), h('ul.hint', {}, l.lines.map(x => h('li', {}, x))))),
      ...r.notes.map(n => h('p.hint', n)), h('p.hint', lintLine(caseLint(P).length))].filter(Boolean));
    return text;
  };
  const body = h('div', {}, field('Preset', preset), form, info);
  return dialog('Export library', body, [
    { label: 'Close' },
    { label: 'Save as preset…', action: () => { const n = prompt('Preset name'); if (!n) return false; (P.settings.exportPresets ||= {})[n] = JSON.parse(JSON.stringify(o)); A.changed(); toast('Preset saved with the project.'); return false; } },
    { label: 'Preview', action: async () => { await run(); return false; } },
    { label: 'Download', primary: true, action: async () => {
      let unsaved = false;
      if (A.dirty) {   // the version in the file is the last saved one, so two different exports could carry the same version
        const ans = await dialog('Save the project file first?', h('p', {}, `The library has edits that are not in a project file, so this export would carry the version of the last save (v${P.lib.version}). Saving first gives it a new version.`),
          [{ label: 'Cancel', action: () => 'cancel' }, { label: 'Export anyway', action: () => 'anyway' }, { label: 'Save', primary: true, action: () => 'save' }]);
        if (ans === 'save') A.saveFile(); else if (ans === 'anyway') unsaved = true; else return false;
      }
      const text = await run(unsaved);
      download(exportName(P, presetName, true).replace(/.json$/, unsaved ? '-unsaved.json' : '.json'), text);
    } },
  ], { wide: true });
}

// ---------- settings ----------

export const LANGUAGES = [['en', 'en: English'], ['pt', 'pt: Portuguese'], ['de', 'de: German'], ['es', 'es: Spanish'], ['fr', 'fr: French'], ['ja', 'ja: Japanese']];

export async function showSettings() {
  const P = A.P, S = P.settings;
  const key = h('input', { type: 'password', value: getKey(), placeholder: 'sk-ant-…', autocomplete: 'off' });
  const remember = check('Remember the key in this browser (localStorage)', !!(() => { try { return localStorage.getItem('wlb2-key'); } catch { return ''; } })());
  const f = { model: select(MODELS, getModel()), lang: select(LANGUAGES, P.lang), min: h('input', { type: 'number', value: S.minWords, min: 1 }),
    maxW: h('input', { type: 'number', value: S.maxWords, min: 1 }), maxL: h('input', { type: 'number', value: S.maxLen, min: 3 }),
    dialect: select([['', '(none)'], ...REGIONS.map(c => [c, c])], dialectOf(P)) };
  const body = h('div.form', {},
    h('h3.sect', 'General (this app, all libraries)'),
    field('Anthropic API key', key, 'Used only from this browser, straight to the Anthropic API. Kept for this session unless you tick remember.'), remember,
    field('Model for generation', f.model),
    h('h3.sect', 'Library (saved with this library)'),
    field('Language', f.lang, 'The language of the words in this library. The frequency check and the generation prompt are written for English.'),
    field('Default dialect', f.dialect, 'Which variant the word tables show when a word has regional or spelling variants (US: color, UK: colour). Only the display changes; no data moves. Each library has its own, as languages spell differently.'),
    h('div.three', {}, field('Minimum words per theme', f.min), field('Longest entry, in words', f.maxW), field('Longest entry, in letters', f.maxL)));
  return dialog('Settings', body, [{ label: 'Cancel' }, { label: 'Save', primary: true, action: () => {
    setKey(key.value, remember.querySelector('input').checked);
    setModel(f.model.value);
    P.lang = f.lang.value;
    Object.assign(S, { dialect: f.dialect.value, minWords: +f.min.value || 4, maxWords: +f.maxW.value || 4, maxLen: +f.maxL.value || 20 });
    A.changed();
  } }]);
}
