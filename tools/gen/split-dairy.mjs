// "dairy and eggs" becomes "dairy" and "eggs" (egg dishes move under eggs); "dairy products" is merged into "dairy".
// Run: node tools/gen/split-dairy.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, deleteTheme, sameText } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
const root = t => sameText(P, t).filter(e => !e.aliasOf);
const D = P.ix.theme.get('dairy_and_eggs'); D.name = 'dairy';
const E = { ...D, id: 'eggs', name: 'eggs', parent: 'food_drink', pop: 2, groups: [], note: '' }; delete E.groups; P.themes.push(E);
P.ix.theme.get('egg_dishes').parent = 'eggs';
const mv = (text, rating) => { const es = root(text).filter(e => e.th.dairy_and_eggs !== undefined); if (es.length !== 1) throw Error(text + ' ' + es.length); const e = es[0]; delete e.th.dairy_and_eggs; e.th.eggs = rating; return e; };
const egg = mv('egg', 1); mv('yolk', 2); mv('albumen', 3);
for (const t of P.themes) if (t.id === 'dairy_and_eggs') t.groups = (t.groups || []).filter(g => g.every(id => P.ix.entry.get(id)?.th.dairy_and_eggs !== undefined));
const make = (text, shown, rating, rec, gloss = '', id = 0) => { const e = id ? P.ix.entry.get(id) : addEntry(P, text, { pos: 'noun', type: 'common', rec, gloss, status: 'gen' }); if (e.text !== text) throw Error(text); e.th.eggs = rating; if (shown) { e.show = { ...e.show, eggs: shown }; e.nameOkIn = [...(e.nameOkIn || []), 'eggs']; } return e; };
make('quail egg', 'quail', 2, 2, '', 20264); make('duck egg', 'duck', 2, 2, '', 20263); make('ostrich egg', 'ostrich', 3, 2, '', 57815); make('eggshell', 'shell', 2, 1, 'hen shell'); make('egg carton', 'carton', 3, 1, '', 62428);
make('free-range egg', 'free-range', 3, 3); make('Easter egg', 'Easter', 3, 1, '', 25040);
reindex(P);
for (const a of P.entries) if (a.aliasOf && P.ix.entry.get(a.aliasOf)?.th.eggs !== undefined && /egg/i.test(a.text)) a.nameOkIn = [...new Set([...(a.nameOkIn || []), 'eggs'])];   // full names kept as aliases of the bare word
// dairy products into dairy
const dp = P.ix.theme.get('dairy_products');
for (const e of P.ix.byTheme.get('dairy_products') || []) { if (e.aliasOf) continue; if (e.th.dairy_and_eggs === undefined) e.th.dairy_and_eggs = e.th.dairy_products; delete e.th.dairy_products; }
reindex(P); deleteTheme(P, 'dairy_products'); reindex(P);
const bad = validate(P).filter(i => i.sev !== 'info' && (i.themeId === 'eggs' || i.themeId === 'dairy_and_eggs' || /egg|dairy/i.test(i.msg)));
console.log(bad.map(i => i.msg).join('\n') || 'clean');
console.log('dairy', (P.ix.byTheme.get('dairy_and_eggs') || []).filter(e => !e.aliasOf).length, 'eggs', (P.ix.byTheme.get('eggs') || []).filter(e => !e.aliasOf).length);
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
