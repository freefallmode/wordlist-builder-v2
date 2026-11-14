// Case fixes agreed with the game manager (see tools/gen/case-scan2.json): the member should be written correctly for its sense.
//   RENAME id -> text      (same entry, same sense, only the case changes)
//   RELINK theme: from -> to   (move the theme link to the entry with the right sense; typ copied)
//   SHOW id theme text     (case-only shown text; not for wordplay/compound themes)
// Run: node tools/gen/case-fix.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, deleteEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error('no entry ' + id); return e; };
const log = [];
const rename = (id, text) => { const e = E(id); log.push(`rename ${e.text} -> ${text} (#${id})`); e.text = text; };
const relink = (theme, from, to) => { const f = E(from), t = E(to); if (f.typ[theme] == null) throw Error(`${f.text} not in ${theme}`); if (t.typ[theme] == null) t.typ[theme] = f.typ[theme]; delete f.typ[theme]; if (f.show) delete f.show[theme]; { const th = P.ix.theme.get(theme); if (th.groups) th.groups = th.groups.map(g => [...new Set(g.map(i => i === from ? to : i))]).filter(g => g.length > 1); } log.push(`relink ${theme}: ${f.text}#${from} -> ${t.text}#${to}`); };
const show = (id, theme, text) => { const e = E(id); e.show = Object.assign({}, e.show, { [theme]: text }); log.push(`show ${theme}: ${e.text} as ${text}`); };

// common words written lowercase
for (const [id, t] of [[64789, 'green'], [64792, 'lime'], [64804, 'white'], [64812, 'court'], [64797, 'secretary'], [64818, 'instant'], [64806, 'star']]) rename(id, t);
rename(49261, 'blackberry'); rename(350, 'BlackBerry');       // the fruit and the phone had their cases swapped
rename(28287, 'Jack'); rename(30868, 'Ford'); rename(50053, 'MIDI');   // a name, a brand, an acronym
// wrong-sense or wrong-case entry linked: move the link to the right entry
relink('tree_parts', 29837, 30629); relink('flower_parts', 29837, 30629);   // bud (plant)
relink('medieval_pastimes', 633, 46535);                                    // skittles (the game, not the sweets)
relink('famous_racehorses', 40247, 22337);                                  // Man o' War (the horse)
relink('biblical_names', 27907, 56818);                                     // John (the name)
relink('golf_terms', 35118, 66320); relink('golf_course_features', 35118, 66320);
relink('old_time_jobs', 6881, 66848);                                       // iceman
relink('jewel_tones', 19663, 57763);                                        // bordeaux (the colour)
relink('hidden_body_parts', 2150, 55630);                                   // china (the word hides "chin")
relink('starts_with_a_bird', 47377, 57482);                                 // hawker (wordplay: fix the linked entry)
relink('trains', 62663, 2867);                                              // shinkansen
// case-only shown texts (categories only)
// proper-name entries that also serve common-word themes: keep the entry, show lowercase there
show(29944, 'poisonous_plants', 'hemlock'); for (const t of ['hair_colors', 'shades_of_black', 'colors_named_after_animals']) show(29938, t, 'raven');
show(29870, 'wedding_anniversaries', 'topaz'); show(29871, 'wedding_anniversaries', 'amethyst'); show(29843, 'tiny_things', 'dot');
show(2867, 'famous_trains', 'Shinkansen'); show(7109, 'stars', 'Sun'); show(20207, 'city_demonyms', 'Neapolitan');
// killer whale: the bare "Killer" stub goes, the full term is shown as "killer"
{
  const stub = E(64790), kw = P.entries.find(e => e.text === 'killer whale' && !e.aliasOf);
  for (const [th, v] of Object.entries(stub.typ)) { if (kw.typ[th] == null) { kw.typ[th] = v; kw.show = Object.assign({}, kw.show, { [th]: 'killer' }); } }
  for (const th of P.themes) if (th.groups && stub.typ[th.id] != null) th.groups = th.groups.map(g => [...new Set(g.map(i => i === stub.id ? kw.id : i))]).filter(g => g.length > 1);
  log.push('killer whale replaces the Killer stub in ' + Object.keys(stub.typ).join(', ')); deleteEntry(P, stub);
}
reindex(P);
// entries left without any theme and without aliases are dropped
for (const id of [29837, 633, 40247, 27907, 35118, 6881, 19663, 2150, 47377, 62663]) { const e = P.ix.entry.get(id); if (e && !Object.keys(e.typ).length && !P.entries.some(a => a.aliasOf === id)) { log.push('dropped empty entry ' + e.text + '#' + id); deleteEntry(P, e); } }
reindex(P);
const seen = new Map(); for (const e of P.entries) { const k = e.text + '|' + (e.gloss || ''); if (!e.aliasOf && seen.has(k)) console.log('same text and gloss:', k); seen.set(k, 1); }
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.map(i => i.msg).join('\n'));
console.log(log.join('\n'));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); fs.writeFileSync(new URL('./case-fix-log.txt', import.meta.url), log.join('\n') + '\n'); console.log('library v' + P.lib.version); }
