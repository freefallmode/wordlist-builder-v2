// Theme tree as an indented outline: two spaces per level, one theme per line.
//
//   Food & Drink:                       a group (folder): name ends with ':' and is never played
//     fruits [complete]                 a theme; its children are indented below it
//       citrus fruits -- note text      everything after " -- " is a note for people and for the generator
//
// Tags in square brackets after the name:
//   [complete]                      a finite, fixed set (months, planets)
//   [adult] [sensitive] [trademark] [lang]   theme flags; [lang] = depends on English (spelling, sound, slang)
//   [off]                           disabled
//   [d:3]                           theme difficulty 1 to 5 (unrated when absent)
//   [region:US,UK]                  only widely known in those regions (audience)


export function slug(s) {
  // "___ball" (words before ball) and "fire___" (words after fire) must not collide with the plain themes "ball" and "fire".
  s = s.replace(/^_{2,}\s*/, 'blank ').replace(/\s*_{2,}$/, ' blank');
  return s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'theme';
}

export function newTheme(name, parent = null) {
  return { id: slug(name), name, parent, group: false, enabled: true, d: 0, complete: false, adult: false, sensitive: false,
    tm: false, lang: false, region: [], note: '' };
}

// Returns { themes, errors }. Themes are in outline order (parents before children).
export function parseOutline(text) {
  const themes = [], errors = [], ids = new Set(), stack = [];
  text.split(/\r?\n/).forEach((raw, i) => {
    if (!raw.trim() || raw.trim().startsWith('#')) return;
    const m = raw.match(/^( *)(.*)$/);
    const indent = m[1].length;
    if (indent % 2) errors.push(`line ${i + 1}: odd indent`);
    const depth = indent >> 1;
    let body = m[2], note = '';
    const k = body.indexOf(' -- ');
    if (k >= 0) { note = body.slice(k + 4).trim(); body = body.slice(0, k); }
    const tags = [];
    body = body.replace(/\s*\[([^\]]*)\]/g, (_, t) => { tags.push(t.trim()); return ''; }).trim();
    // The group colon may sit before or after the tags.
    let group = false;
    if (body.endsWith(':')) { group = true; body = body.slice(0, -1).trim(); }
    if (!body) { errors.push(`line ${i + 1}: empty name`); return; }
    if (depth > stack.length) { errors.push(`line ${i + 1}: indent jumps a level`); }
    stack.length = Math.min(depth, stack.length);
    const t = newTheme(body, stack.length ? stack[stack.length - 1].id : null);
    t.group = group; t.note = note;
    let id = t.id, n = 2;
    while (ids.has(id)) id = t.id + '_' + n++;
    if (id !== t.id) errors.push(`line ${i + 1}: duplicate name "${body}", id ${id}`);
    t.id = id; ids.add(id);
    for (const g of tags) {
      if (g === 'place' || g === 'property') continue; // retired tags, ignored
      if (g === 'wordplay') { t.lang = true; continue; } // retired tag: wordplay is language-specific
      else if (g === 'complete') t.complete = true;
      else if (g === 'adult') t.adult = true;
      else if (g === 'sensitive') t.sensitive = true;
      else if (g === 'trademark') t.tm = true;
      else if (g === 'lang') t.lang = true;
      else if (g === 'off') t.enabled = false;
      else if (g.startsWith('d:')) t.d = Math.max(0, Math.min(5, +g.slice(2) || 0));
      else if (g.startsWith('region:')) t.region = g.slice(7).split(',').map(s => s.trim()).filter(Boolean);
      else if (g.startsWith('geo:')) continue; // retired tag, ignored
      else errors.push(`line ${i + 1}: unknown tag [${g}]`);
    }
    themes.push(t);
    stack.push(t);
  });
  return { themes, errors };
}

export function formatOutline(themes) {
  const byId = new Map(themes.map(t => [t.id, t]));
  const depth = t => { let d = 0; while (t.parent && byId.has(t.parent)) { d++; t = byId.get(t.parent); } return d; };
  return themes.map(t => {
    const tags = [];
    if (t.region.length) tags.push('region:' + t.region.join(','));
    if (t.d) tags.push('d:' + t.d);
    for (const [k, v] of [['complete', t.complete], ['adult', t.adult], ['sensitive', t.sensitive], ['trademark', t.tm], ['lang', t.lang], ['off', !t.enabled]]) if (v) tags.push(k);
    return '  '.repeat(depth(t)) + t.name + (t.group ? ':' : '') + tags.map(g => ' [' + g + ']').join('') + (t.note ? ' -- ' + t.note : '');
  }).join('\n') + '\n';
}

export function childrenOf(themes) {
  const m = new Map();
  for (const t of themes) { const k = t.parent || ''; if (!m.has(k)) m.set(k, []); m.get(k).push(t); }
  return m;
}
