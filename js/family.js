// Word families (DESIGN-entries.md 3.7): two entries whose texts are forms or derivations of one word (joy/joyful, gamer/gaming, pup/puppy),
// found by suffix stripping as tools/gen/famscan.mjs, with a stop list of look-alikes that are not one family (earl/early, tea/teach).
// Also the clash groups the export writes (synonym groups + kin, union across themes), shared by the export and the clash-big check.

// Endings stripped (one or two at a time), longest first. -y, -ie, -sy and -kins also catch pet and short forms (dad/daddy, tum/tummy, teeny/teensy).
const SUF = ['fulness', 'lessness', 'ousness', 'iness', 'ness', 'ments', 'ment', 'ings', 'ing', 'ers', 'er', 'est', 'ed', 'ful', 'ous', 'ious', 'less', 'ish', 'ily', 'ly', 'ies', 'es', 's', 'y',
  'ic', 'al', 'ical', 'ion', 'ions', 'ity', 'ive', 'able', 'ible', 'ist', 'ists', 'ism', 'ie', 'sy', 'kins'].sort((a, b) => b.length - a.length);

// Pairs that share letters but are not one family (from the v398 review, tools/gen/batch398-review.txt, "not a family"). Lowercase, either order.
const STOP_PAIRS = [
  'earl|early', 'tone|tonic', 'organ|organism', 'busy|business', 'can|canister', 'archer|archive', 'legal|legion', 'tension|tenement', 'century|centurion',
  'battery|battalion', 'policy|polity', 'solute|solution', 'ban|banishment', 'pet|petal', 'tea|teach', 'finish|fining', 'poker|pokies', 'they|thee', 'thy|this',
  'sandfly|sandfish', 'gnome|gnomic', 'tiger|tigerlily', 'move|movie', 'bus|business', 'danke|dankie',
];
export const FAMILY_STOP = new Set(STOP_PAIRS.map(p => p.split('|').sort().join('|')));

const step = x => {
  const r = [];
  for (const s of SUF) if (x.endsWith(s) && x.length - s.length >= 3) {
    const b = x.slice(0, -s.length); r.push(b, b + 'e');
    if (b.endsWith('i')) r.push(b.slice(0, -1) + 'y');
    if (/([bdgmnprt])\1$/.test(b)) r.push(b.slice(0, -1));
  }
  return r;
};
// The word itself and what one or two strippings leave (with a final e restored, i back to y, a doubled consonant undone).
export function stems(w) {
  const out = new Set([w]);
  for (const a of step(w)) { out.add(a); for (const b of step(a)) out.add(b); }
  return out;
}

// A text as the family test sees it: { w, st } for one plain word, { multi } for a phrase (compared only with its plural), null for anything else (digits, hyphens, apostrophes).
export function famKey(text) {
  const t = String(text || '').trim().toLowerCase();
  if (/^[a-z]+$/.test(t)) return { w: t, st: stems(t) };
  if (/^[a-z]+( [a-z]+)+$/.test(t)) return { multi: t.replace(/s$/, ''), t };
  return null;
}

// Are two keys (famKey) one word family? Single words: the shorter is a stem of the longer (vote/voter), or both share a stem of 4+ letters (gamer/gaming).
// Phrases: only when they differ by a final -s on the last word (onion ring/onion rings).
export function famKeys(a, b) {
  if (!a || !b) return false;
  if (a.multi || b.multi) return !!(a.multi && b.multi && a.multi === b.multi && a.t !== b.t);
  if (a.w === b.w) return false;
  const [s, l] = a.w.length <= b.w.length ? [a, b] : [b, a];
  if (FAMILY_STOP.has(s.w < l.w ? s.w + '|' + l.w : l.w + '|' + s.w)) return false;
  if (l.st.has(s.w)) return true;
  for (const x of s.st) if (x !== s.w && x.length >= 4 && l.st.has(x) && x.length >= s.w.length - 4) return true;
  return false;
}
export const isFamily = (textA, textB) => famKeys(famKey(textA), famKey(textB));

// Family pairs among items [{ id, text, ... }]: bucketed by stem, so only items that share a stem are compared. Returns [[itemA, itemB]] (each pair once).
export function familyPairs(items) {
  const keyed = items.map(x => ({ x, k: famKey(x.text) })).filter(y => y.k);
  const buckets = new Map(), pairs = [], seen = new Set();
  keyed.forEach((y, i) => { for (const s of y.k.multi ? [' ' + y.k.multi] : y.k.st) { if (!buckets.has(s)) buckets.set(s, []); buckets.get(s).push(i); } });
  for (const list of buckets.values()) {
    if (list.length < 2) continue;
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const a = list[i], b = list[j], key = a < b ? a * 1e6 + b : b * 1e6 + a;
      if (seen.has(key)) continue; seen.add(key);
      const A = keyed[a], B = keyed[b];
      if (famKeys(A.k, B.k)) pairs.push([A.x, B.x]);
    }
  }
  return pairs;
}

// ---------- clash groups ----------
// Words that stand for one another share a clash id: the members of each synonym group of the given themes (in theme order), then each kin pair (entry order).
// keep(id) says which entries take part (the export: those it writes). Union-find; the order of the unions is fixed, so the ids are stable.
// Returns { has(id), id(id) (0 when the entry is in no group of two or more), find, clashId (representative -> id), size (representative -> members) }.
export function clashGroups(P, themes, keep) {
  const clash = new Map(), find = x => { while (clash.has(x) && clash.get(x) !== x) x = clash.get(x); return x; };
  const union = m => { for (const id of m) if (!clash.has(id)) clash.set(id, id); for (const id of m.slice(1)) clash.set(find(id), find(m[0])); };
  for (const t of themes) for (const g of t.groups || []) union(g.filter(keep));
  for (const e of P.entries) if (!e.aliasOf && e.kin?.length && keep(e.id)) for (const k of e.kin) if (k > e.id && keep(k)) union([e.id, k]);
  const size = new Map(); for (const id of clash.keys()) { const c = find(id); size.set(c, (size.get(c) || 0) + 1); }
  const clashId = new Map([...size].filter(([, n]) => n > 1).map(([c], i) => [c, i + 1]));
  return { has: id => clash.has(id), id: id => clash.has(id) ? clashId.get(find(id)) || 0 : 0, find, clashId, size, members: () => {
    const m = new Map(); for (const id of clash.keys()) { const c = find(id); if (clashId.has(c)) { if (!m.has(c)) m.set(c, []); m.get(c).push(id); } } return m; } };
}
// Clash group size (DESIGN-entries.md 3.7, Group size): above CLASH_SOFT the clash-large check notes it, above CLASH_MAX (the hard limit) clash-big warns.
export const CLASH_SOFT = 8;
export const CLASH_MAX = 12;
