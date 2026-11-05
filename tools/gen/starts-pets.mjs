// One-off (2026-11-06): wordplay themes next to "starts with a color": "starts with a pet" and "starts with public transport", each with one word per pet or vehicle,
// and a sub-theme per pet or vehicle that holds enough words ("starts with dog": dogmatic, doggerel ...). The pet word has nothing to do with the meaning (category, ratchet, busy)
// and the pet word itself is never a member. Run: node tools/gen/starts-pets.mjs [--apply]
import fs from 'node:fs';
import { parseProject, serializeProject, stampSave } from '../../js/store.js';
import { reindex, addEntry, sortDepthFirst, uniqueThemeId } from '../../js/model.js';
import { validate } from '../../js/validate.js';
const LIB = new URL('../../data/wordlist-en.project.json', import.meta.url);
const P = parseProject(fs.readFileSync(LIB, 'utf8')); reindex(P);
// word:pos:familiarity:typicality (typicality 1 = the clearest example)
const W = s => s.trim().split(/\s+/).map(x => { const [text, pos, rec, link] = x.split(':'); return { text, pos, rec: +rec, link: +link }; });
const PETS = {
  dog: W('dogmatic:adjective:3:2 doggerel:noun:4:4 dogged:adjective:3:3 dogsbody:noun:4:4 doggone:adjective:4:4'),
  cat: W('category:noun:1:1 catalogue:noun:1:2 catapult:noun:2:2 catastrophe:noun:2:3 cathedral:noun:1:3'),
  rat: W('ratchet:noun:2:1 ratio:noun:2:2 rattle:noun:1:3 ratify:verb:3:3 rattan:noun:3:4'),
  pig: W('pigment:noun:2:2 pigeon:noun:1:3 pigtails:noun:2:4 pigheaded:adjective:3:4'),
  hen: W('hence:other:2:3 henna:noun:2:2 henchman:noun:2:2 hendecagon:noun:5:5'),
  cow: W('coward:noun:1:1 cowl:noun:3:3 cower:verb:2:2 coworker:noun:1:3'),
  lamb: W('lambada:noun:3:3 lambda:noun:3:3 lambaste:verb:4:4 lambent:adjective:5:5'),
  pup: W('pupil:noun:1:1 puppet:noun:1:2 pupa:noun:3:3 pupusa:noun:4:5'),
};
const PET_SINGLE = W('mousse:noun:1:2 fishy:adjective:1:1 horseradish:noun:2:3 goatee:noun:2:2 newton:noun:2:3 ponytail:noun:1:3');   // pets with too few good words for a sub-theme
const BEST_PET = { dog: 'dogmatic', cat: 'category', rat: 'ratchet', pig: 'pigment', hen: 'henna', cow: 'coward', lamb: 'lambda', pup: 'pupil' };
const TRANS = {
  bus: W('busy:adjective:1:1 bush:noun:1:1 bustle:noun:3:3 business:noun:1:1 busker:noun:2:3'),
  cab: W('cabin:noun:1:1 cable:noun:1:1 cabbage:noun:1:2 cabaret:noun:3:3 cabal:noun:4:4'),
  metro: W('metronome:noun:3:2 metropolis:noun:3:3 metropolitan:adjective:3:4 metrology:noun:5:5'),
};
const TRANS_SINGLE = W('trainer:noun:1:1 trample:verb:2:2 taxidermy:noun:3:2 tuber:noun:3:3 jetty:noun:2:2 planet:noun:1:1 railing:noun:1:2');
const BEST_TRANS = { bus: 'busy', cab: 'cabin', metro: 'metronome' };
const log = [];
function entryFor(w) {
  let e = P.entries.find(x => !x.aliasOf && x.text.toLowerCase() === w.text && x.enabled);
  if (!e) { e = addEntry(P, w.text, { pos: w.pos, type: 'common', rec: w.rec, status: 'gen' }); log.push('new ' + w.text); }
  return e;
}
function theme(id, name, parent, note, rule) {
  const t = { id: uniqueThemeId(P, id), name, parent, group: false, enabled: true, complete: false, adult: false, sensitive: false, tm: false, lang: true, region: [], note, pop: 3, tkind: 'wordplay', rule };
  P.themes.push(t); reindex(P); return t;
}
function build(top, topName, topNote, topRule, groups, best, singles, leak) {
  const t = theme(top, topName, 'letter_play', topNote, topRule);
  const put = (th, w, nameOk) => { const e = entryFor(w); e.th[th.id] = w.link; if (nameOk) e.nameOkIn = [...new Set([...(e.nameOkIn || []), th.id])]; return e; };
  for (const [key, words] of Object.entries(groups)) {
    const sub = theme(`starts_with_${key}`, `starts with ${key}`, t.id, `words that begin with "${key}" but have nothing to do with it: ${words.slice(0, 4).map(w => w.text).join(', ')}`, `starts:${key}`);
    for (const w of words) put(sub, w, true);
    const b = words.find(w => w.text === best[key]); put(t, { ...b, link: b.link }, leak.test(b.text));
  }
  for (const w of singles) put(t, w, leak.test(w.text));
  reindex(P);
}
build('starts_with_a_pet', 'starts with a pet', 'one word for each pet that begins with its name but has nothing to do with it: category, ratchet, dogmatic, fishy, pigment', 'starts:pet', PETS, BEST_PET, PET_SINGLE, /^$/);
build('starts_with_public_transport', 'starts with public transport', 'one word for each kind of public transport that begins with its name but has nothing to do with it: busy, cabin, trample, planet, metronome', 'starts:public transport', TRANS, BEST_TRANS, TRANS_SINGLE, /^$/);
sortDepthFirst(P); reindex(P);
console.log(log.join(', '));
for (const id of ['starts_with_a_pet', 'starts_with_public_transport']) console.log(id, (P.ix.byTheme.get(id) || []).length, 'words;', (P.ix.kids.get(id) || []).map(k => k.name + ' ' + (P.ix.byTheme.get(k.id) || []).length).join(', '));
const bad = validate(P).filter(i => i.sev !== 'info' && !/longer than 20/.test(i.msg)); console.log('issues', bad.length, bad.slice(0, 8).map(i => i.msg));
if (process.argv.includes('--apply')) { stampSave(P); fs.writeFileSync(LIB, serializeProject(P)); console.log('library v' + P.lib.version); }
