// English word frequency (Zipf scale) from data/freq-en.txt: lines of "<zipf*10> word word ...", built by wordfreq (CC BY-SA 4.0).
// 7 is "the", 5 to 6 everyday words, 4 common, 3 uncommon, 2 rare. Used as a cross-check on ratings and as an optional export column.
let F = null;

export const fold = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function parseFreq(text) {
  const m = new Map();
  for (const line of text.split('\n')) {
    const sp = line.split(' ');
    const z = +sp[0];
    if (!z) continue;
    for (let i = 1; i < sp.length; i++) if (sp[i]) m.set(sp[i], z / 10);
  }
  return m;
}

export async function loadFreq(url = 'data/freq-en.txt') {
  if (F) return F;
  F = parseFreq(await (await fetch(url)).text());
  return F;
}
export function setFreq(m) { F = m; }
export const freqLoaded = () => !!F;

// Zipf of a word or phrase; null when rarer than the list, undefined before the list has loaded.
// Phrases combine as wordfreq does: 1/f = sum of 1/f_i.
export function zipf(text) {
  if (!F) return undefined;
  const parts = fold(text).split(/[\s\-]+/).map(w => w.replace(/^[^a-z0-9]+|[^a-z0-9']+$/g, '')).filter(Boolean);
  if (!parts.length) return null;
  let inv = 0;
  for (const p of parts) {
    const z = F.get(p) ?? F.get(p.replace(/'s$/, ''));
    if (z == null) return null;
    inv += 1 / Math.pow(10, z);
  }
  return Math.round(Math.log10(1 / inv) * 10) / 10;
}
