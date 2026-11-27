# Review of Julia's v494-v510 (branch julia-category-fixes-2, 2026-11-27)

Automated checks on the branch (v510, base v493 c388252): gate PASS 10/10 (`--base main`); `check --diff` against v493 clean; strict export and export contract PASS; every batch reruns to 0 changes. Export 3253 -> 3261 themes, 61400 -> 61392 entries.
The branch already holds main's v493 (no merge needed on her side).
Content read by five Opus reviewers (v494-v496, v497-v499, v500-v501, v502-v505, v506-v510); the main claims spot-checked against the library.
Verdict: every batch can merge (v499 as it is); the rest with fixes, and one policy question first.

## Policy question (Simon decides): remove grim and political words, or keep them and flag?

Julia's batches unlink words as "grim" or as dictators, at her user's request, not under a library rule:
v497 Holocaust, Gestapo, gulag, war crime, casualty, Rommel, kamikaze (from World War II terms), boiling oil; v498 Hitler, Stalin, Lenin, Mao Zedong, Mussolini, Fidel Castro (famous leaders), Bokassa; v505 mortar, howitzer, torpedo, depth charge, bayonet, ammunition, sniper, air strike, dogfight; v507 Molotov cocktail, rubber bullets; v508 Stalinism, Leninism, Maoism, Trotskyism; v509 bribe, embezzle, launder; v510 jihad.

The library's way so far is a flag, not removal:
- Hitler was flagged `offensive` in v432 ("serious topic: Nazi leader, like swastika") and kept in famous leaders; v444 confirmed it. DESIGN-entries 3.8 flags serious topics (heroin, suicide, slave, swastika).
- War and weapons are `adult` (Simon, 2026-11-20): rifle, grenade, missile, tank are flagged and stay linked in army words; crusade is adult+sensitive and stays in medieval times.
- Religious words are `sensitive` (v457); jihad was the example of a correctly flagged one.

What the removals do in the game:
- v497 changes nothing exported: every theme it touches is under wars_and_battles (adult). It only deletes curated data.
- v498 does change play: famous leaders is sensitive, not adult, so it plays from level 31. Without Stalin and Mao it loses first answers adults give; it keeps 33 words (14 easy), and still holds Julius Caesar, Genghis Khan, Napoleon (and emperors keeps Nero, Caligula).
- v505 is half done: the unflagged weapons left army words, the adult-flagged ones (rifle, grenade, tank, artillery) stay. The notice says weapons left army words; most are still there.
- Molotov cocktail still plays, unflagged, in words named after people. Jihad is singled out while crusade stays.
- Trotskyism's reason ("named after a dictator") is wrong: Trotsky never ruled. Bolshevism stays.

Recommendation: keep the flag approach.
- Restore the links and flag: Hitler (already offensive); Holocaust, Gestapo, gulag, war crime `offensive` (Holocaust also adult+sensitive, it has no flag now); the six v505 weapons `adult` like rifle; Molotov cocktail and rubber bullets `adult`; jihad back in Islam words with `adult` like crusade (or sensitive only, as now).
- Stalin, Mussolini: restore; flag `offensive` if they should stay out of the family export. Mao, Lenin, Castro: restore unflagged ("dictator" is not a library criterion), or flag like Stalin.
- Accept the removals that are right for other reasons: casualty and Rommel back (Rommel is a top famous general; Lee and Jackson were kept); Fat Man, lebensraum, Anschluss, Bokassa stay out as obscure; boiling oil out as not a weapon; bribe, embezzle, launder out (crimes are adult; accept); the four -isms out (sensitive theme, Simon's call; people-named ideologies keeps 12).
- The alternative, Julia's way, needs a written rule ("grim or dictator words are not linked") and v505 finished (unlink the adult-flagged weapons too).

## A. Clear fixes (into v511)

v494-v496 (ancient civilizations, medieval times, pirates)
1. pirate_crew: ship's cat 21289 stays though parrot left as "a pet, not crew": unlink (no other theme: delete or relink).
2. lost_treasures: Sutton Hoo left as "found"; Atocha 21219 (found 1985) and Priam's treasure 54306 (found 1873) are found too: unlink both, or keep Sutton Hoo.

v497-v499 (wars, famous people, archaeology)
3. wars_and_battles: link World War I 69005 and World War II 69006 at t1 (only in conflicts in history now; Vietnam and Korean War are there).
4. Crusades 69007 new beside crusade 6711: add the kin link.

v500-v501 (Wild West, mythology)
5. people_of_the_frontier: cowboy 12534 (t1) into the buckaroo = vaquero = cowpuncher = cowpoke group; cowgirl 69014 into it too (or out).
6. desperado 27591 into the outlaw = bandit group; pioneer 6748 = settler 69013.
7. deputy 69010 needs a gloss (lawman).

v502-v505 (fantasy, family, jobs, military)
8. bandolier 21319 left army kit but stays in army words: make them agree.
9. jobs: link paramedic 3490 (in community helpers, not in jobs); offer butcher, barber, soldier.

v506-v510 (school, society, government, money, religion)
10. MIT 69019: type acronym (like NASA). Harvard 69017: familiarity 2.
11. Molotov cocktail 61415 still plays unflagged: flag adult (whatever the policy answer).

## B. Judgement calls (my recommendation first)

1. famous_universities: Oxford 56867 and Cambridge 56868 are the city entries. Recommend new sense entries Oxford [university], Cambridge [university] (org), and add Columbia; type the others org.
2. Associations added in v494: jaguar in aztecs_and_maya, elephant in ancient_india, Roman numeral in ancient_rome. Recommend: drop.
3. castles (v495): king and queen are people (ranks). Recommend: drop them, keep throne and knight.
4. on_a_pirate_ship first answers: plank [pirate] (not adult itself), telescope grouped with spyglass, treasure [loot]. Recommend: add.
5. tricksters: Coyote and Raven come from Native American folklore (sensitive theme) but their entries are unflagged, so they play early; Iktomi and others were left out "as sensitive". Recommend: keep both, fix the notice reason (little known, not sensitive).
6. Greek and Roman god pairs (Poseidon/Neptune, Zeus/Jupiter, Aphrodite/Venus, Eros/Cupid) not grouped, while Sumerian/Akkadian pairs are (v444). Recommend: keep separate (two famous pantheons; grouping leaves sea and thunder gods with 1-2 easy answers); say so in the notice.
7. family_and_friends (v503): the same "an event, not a person" reason fits sleepover, playdate, family reunion, which stay. Recommend: take them out too.
8. community_helpers: shares 79% with its parent jobs (allowed); electrician, plumber (t3) are just jobs. Recommend: keep the theme, drop those two.
9. legendary_heroes (v502): Merlin is a wizard, not a hero, like Mordred. Recommend: out.
10. things you do with money: gamble and bet stay unflagged though gambling is adult (Simon, 2026-11-20). Recommend: confirm or flag.

## C. Minor (into v511 if Simon wants)

- Groups or merges: Great Wall [monument] 20455 = Great Wall of China 2316; pyramid = Great Pyramid in famous ruins; Olympic Games 6651 needs a gloss (ancient) beside Olympics 44292; calendar stone 20421 = Aztec calendar 59324.
- Misfits left: stowaway in pirate crew; clergy, chamberlain in feudal ranks; Hanging Gardens, Library of Alexandria in famous ruins; kiln, geophysics, anthropology in archaeology; Ran (sea gods, reads as the verb).
- Additions: atomic bomb for Fat Man in World War II terms; marine, commando, cadet in kinds of soldier; Hyperion, Mazu for sun and sea gods; Fenrir in mythical creatures.
- kinds of soldier and service members share 67% (merge candidate).
- Notice wording: v501's "a rival game has thunder gods" line copied to sun, sea and love gods; v498 does not list the aliases (Mao Tse-tung, Castro) that leave with their roots.
