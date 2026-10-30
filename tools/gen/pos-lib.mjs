// Shared by pos-make.mjs and pos-apply.mjs: finds the themes whose words mix parts of speech.
// A theme is flagged when it has 6+ single-word entries and the entries that are not of its most common part of speech make up 15% or more
// (and are at least 2 words, or 25% or more). Wordplay (language-specific), colour and sound-effect themes are skipped: both parts of speech are normal there.
export const norm = e => { const p = (e.pos || 'noun').toLowerCase(); return p === 'adj' ? 'adjective' : p; };
export const EXEMPT = t => t.lang || /^shades_of|(^|_)colou?rs?($|_)|_tones$|^colou?rs|sounds$|onomatopoeia|noise/.test(t.id);
export function flagged(P) {
  const out = [];
  for (const t of P.themes) {
    if (t.group || EXEMPT(t)) continue;
    const roots = (P.ix.byTheme.get(t.id) || []).filter(e => !e.aliasOf && e.type !== 'phrase' && !/[ -]/.test(e.text));
    if (roots.length < 6) continue;
    const by = {}; for (const e of roots) (by[norm(e)] ||= []).push(e);
    const ranked = Object.entries(by).sort((a, b) => b[1].length - a[1].length);
    if (ranked.length < 2) continue;
    const dominant = ranked[0][0], minor = roots.filter(e => norm(e) !== dominant), share = minor.length / roots.length;
    if (share < 0.15 || (minor.length < 2 && share < 0.25)) continue;
    out.push({ t, roots, ranked, dominant, minor, share });
  }
  return out;
}
