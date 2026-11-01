// Settles the theme-name leaks the region-differing run created (library v216): shorter display text, dropped links, or the name allowed in the theme.
// Run once: node tools/gen/syn-leaks.mjs
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex } from '../../js/model.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const find = (text, theme) => { const e = P.entries.find(x => x.text === text && x.th[theme] !== undefined && !x.aliasOf) || P.entries.find(x => x.text === text && x.aliasOf && P.ix.entry.get(x.aliasOf).th[theme] !== undefined); if (!e) console.log('MISSING', text, theme); return e; };
const show = (text, theme, as) => { const e = find(text, theme); if (e) e.show[theme] = as; };
const drop = (text, theme) => { const e = find(text, theme); if (!e) return; delete e.th[theme]; delete e.show[theme]; const t = P.ix.theme.get(theme); if (t.groups) t.groups = t.groups.map(g => g.filter(id => id !== e.id)).filter(g => g.length > 1); };
const allow = (text, theme) => { const e = find(text, theme); if (e && !e.nameOkIn.includes(theme)) e.nameOkIn.push(theme); };
show('spring onion', 'onion_family', 'spring'); show('green onion', 'onion_family', 'green');
allow('cotton candy', 'candy');
drop('pill bug', 'insects_and_bugs'); drop('pill bug', 'garden_bugs');
show('stink bug', 'garden_bugs', 'stink'); show('shield bug', 'garden_bugs', 'shield');   // shield bug is the UK name of the stink bug
allow('gas', 'gas_station');
drop('police car', 'police_words'); drop('shopping centre', 'shopping_words'); drop('charity shop', 'charity_words');
drop('water pistol', 'water_park');
show('slip road', 'parts_of_a_road', 'slip'); show('town centre', 'parts_of_a_town', 'centre'); show('ticket office', 'ticket_words', 'office');
drop('pharmacy', 'pharmacy');
show('mail carrier', 'mail_words', 'carrier');
drop('bin', 'bins_and_recycling'); drop('bin bag', 'bins_and_recycling');
show('estate agent', 'real_estate_words', 'agent'); drop('real estate agent', 'real_estate_words');
drop('pants', 'pants_and_shorts'); drop('american football', 'american_football_terms');
show('model railway', 'model_making', 'railway');
for (const t of P.themes) if (t.groups && !t.groups.length) delete t.groups;
reindex(P); stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version);
