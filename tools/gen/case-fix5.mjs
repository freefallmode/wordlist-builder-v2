// Second round from the game manager's v360 re-scan: wrong-sense links and a few lowercase shown texts.
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const E = id => { const e = P.ix.entry.get(id); if (!e) throw Error('no ' + id); return e; };
const relink = (theme, from, to) => { const f = E(from), t = E(to); if (f.typ[theme] == null) throw Error(`${f.text} not in ${theme}`); if (t.typ[theme] == null) t.typ[theme] = f.typ[theme]; delete f.typ[theme]; if (f.show) delete f.show[theme]; const th = P.ix.theme.get(theme); if (th.groups) th.groups = th.groups.map(g => [...new Set(g.map(i => i === from ? to : i))]).filter(g => g.length > 1); console.log('relink', theme, f.text, '->', t.text); };
const show = (id, themes, text) => { const e = E(id); for (const t of themes) { if (e.typ[t] == null) throw Error(`${e.text} not in ${t}`); e.show = Object.assign({}, e.show, { [t]: text }); console.log('show', t, e.text, '->', text); } };
relink('river_features', 30868, 48657);        // ford (the crossing), not the car brand
relink('sports_venues', 35118, 66320);         // clubhouse
relink('palindromes', 29029, 14285);           // bob (wordplay: fix the linked entry)
relink('rhymes_with_cat', 3158, 51077);        // bobcat (the animal)
// anchorage: the common noun is a new entry; the city keeps American cities
{ const city = E(35924), a = addEntry(P, 'anchorage', { gloss: 'mooring area', pos: 'noun', fam: 3, typ: { ports_and_harbors: city.typ.ports_and_harbors }, status: 'gen' }); delete city.typ.ports_and_harbors; console.log('new entry anchorage #' + a.id); }
show(20690, ['knights'], 'sir'); show(29903, ['polar_regions', 'things_in_the_sky'], 'aurora');
show(64801, ['taiga'], 'cinnamon'); show(6965, ['angels_and_spirits', 'celtic_folklore'], 'banshee');
show(6962, ['mythical_creatures'], 'phoenix'); show(1561, ['winged_creatures'], 'pterodactyl');
// entries left with no theme are dropped
reindex(P);
for (const id of [35118, 30868]) { const e = P.ix.entry.get(id); if (e && !Object.keys(e.typ).length) { console.log('empty', e.text, id); } }
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log(bad.length, bad.slice(0, 8).map(i => i.msg).join('\n'));
stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
