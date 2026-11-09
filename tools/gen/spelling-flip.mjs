// Spelling-pair cleanup (library v338): roots that carry the British spelling with only a US-tagged alias.
// FLIP: the US spelling becomes the root, the old root becomes a UK-tagged alias (spelling, or regional for word pairs).
// UNTAG: the "US spelling" is doubtful or equally standard, so drop the US tag (neutral variant).
// RETYPE: not a spelling at all; becomes a US regional word alias (never shown by region in the game).
// Run once: node tools/gen/spelling-flip.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const FLIP = ('theatre theater|oesophagus esophagus|pouffe pouf|kaftan caftan|lupin lupine|archaeologist archeologist|ochre ocher|grey squirrel gray squirrel|harbour porpoise harbor porpoise|grey wolf gray wolf|plough horse plow horse|draught horse draft horse|grey gray|flea-bitten grey flea-bitten gray|eyrie aerie|armour armor|catalogue catalog|louvred window louvered window|moustache mustache|mitre saw miter saw|microfibre cloth microfiber cloth|shovelling snow shoveling snow|fibreglass fiberglass|tv licence tv license|fertilise fertilize|enamoured enamored|ardour ardor|organised organized|sombre somber|gynaecologist gynecologist|harbour master harbor master|honours degree honors degree|colours colors|milking parlour milking parlor|centre line center line|neighbourhood neighborhood|travelling traveling|centreboard centerboard|100 metres 100 meters|200 metres 200 meters|400 metres 400 meters|800 metres 800 meters|1500 metres 1500 meters|5000 metres 5000 meters|10000 metres 10000 meters|favourite favorite|acclimatisation acclimatization|lustre luster|centre-back center back|oenology enology').split('|');
const FLIP_REGIONAL = ['rowlock oarlock', 'flexitime flextime'];
const UNTAG = ['plough plow', 'axe ax', 'ketchup catsup', 'kebab kabob', 'Colosseum Coliseum', 'gauge gage', 'vermilion vermillion', 'woolly wooly', 'mahjong mah-jongg', 'waterskiing water skiing', 'doughnut donut'];
const RETYPE = ['hi-fi music center'];
const pair = (P, s) => {
  const [rt, at] = (() => { const w = s.split(' '); for (let i = 1; i < w.length; i++) { const a = w.slice(0, i).join(' '), b = w.slice(i).join(' '); const r = P.entries.find(e => !e.aliasOf && e.text === a && P.entries.some(x => x.aliasOf === e.id && x.text === b && (x.region || []).includes('US'))); if (r) return [a, b]; } return [null, null]; })();
  if (!rt) { console.log('NOT FOUND', s); return null; }
  const rs = P.entries.filter(e => !e.aliasOf && e.text === rt && P.entries.some(x => x.aliasOf === e.id && x.text === at && (x.region || []).includes('US')));
  if (rs.length > 1) console.log('AMBIGUOUS', s, rs.map(r => r.id + ':' + (r.gloss || '')).join(','));
  const r = rs[0]; return [r, P.entries.find(x => x.aliasOf === r.id && x.text === at && (x.region || []).includes('US'))];
};
let nf = 0, nu = 0, nr = 0;
const flip = (r, e, kind) => {
  for (const [t, p] of Object.entries(r.typ || {})) if (e.typ === undefined || e.typ[t] === undefined) (e.typ = e.typ || {})[t] = p;
  for (const a of P.entries) if (a.aliasOf === r.id && a !== e) a.aliasOf = e.id;
  for (const t of P.themes) for (const g of t.groups || []) if (g.includes(r.id)) { const i = g.indexOf(r.id); if (g.includes(e.id)) g.splice(i, 1); else g[i] = e.id; }
  e.use = Object.assign({}, r.use, e.use); e.show = Object.assign({}, r.show, e.show); e.nameOkIn = [...new Set([...(e.nameOkIn || []), ...(r.nameOkIn || [])])];
  for (const k of ['fam', 'gloss', 'pos', 'type', 'adult', 'sensitive', 'status']) if (r[k] !== undefined && (e[k] === undefined || e[k] === '')) e[k] = r[k];
  if (r.fam !== undefined) e.fam = r.fam;
  r.typ = {}; r.use = {}; r.show = {}; r.nameOkIn = []; delete r.gloss; r.aliasOf = e.id; r.aliasKind = kind; r.region = ['UK'];
  e.aliasOf = 0; e.aliasKind = ''; e.region = []; nf++;
};
for (const s of FLIP) { const x = pair(P, s); if (x) flip(x[0], x[1], 'spelling'); reindex(P); }
for (const s of FLIP_REGIONAL) { const x = pair(P, s); if (x) flip(x[0], x[1], 'regional'); reindex(P); }
for (const s of UNTAG) { const x = pair(P, s); if (x) { x[1].region = []; nu++; } }
for (const s of RETYPE) { const x = pair(P, s); if (x) { x[1].aliasKind = 'regional'; nr++; } }
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P));
console.log({ flipped: nf, untagged: nu, retyped: nr }, 'library v' + P.lib.version);
