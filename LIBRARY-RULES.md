# Library rules: the reference for every library change

## 1. How to use this file

Read it top to bottom before you create, update or delete any theme, word, alias, link, rating, flag, group, kin or note. It is the method; `npm run gate` only enforces presence, ranges and the mechanical rules, so most of what follows is judgement the gate cannot see. Brackets give the check: a kind of `npm run check` (js/validate.js, js/family.js, js/caselint.js) or of the export contract (`contract-*`, tools/export-contract.mjs). "(error)" always fails; "(info)" is reported, never gated; anything else is a warning gated against `tools/checks-baseline.json`, and a warning new by identity fails too. "(no check: judgement)" means only you can get it right. "Detail:" points at a longer explanation; you should not need it.

Words used here: a **root** is an entry with no `aliasOf`; an **alias** points at a root; a **link** is an entry's membership of a theme (`typ[themeId]`, its typicality there); a **usable** word is one the game can show (a root, not adult, not offensive, linked to a playable theme; words with firstLevel 31 count but are held back to level 31).

## 2. Workflow: every change goes through a batch script

1. Simon approves the change first. Search git history for his earlier decisions on the words (`git log -S'<word>' --oneline`, grep `tools/gen/batch*-changes.txt`, DESIGN-entries.md 10).
2. Write `tools/gen/batchNNN.mjs`, the next number (it matches the library version it produces); copy the shape of the latest one: load with `parseProject` (js/store.js) and `reindex` (js/model.js), make the changes with the model functions, compare `validate` and the export contract before and after, write a review file, refuse to write when a non-info issue is new.
3. Dry run with `--out <draft>`, then `npm run check -- <draft> --diff data/wordlist-en.project.json` (no new issues).
4. `--apply`: every entry the batch changes or confirms gets `status: "rev"` (counted in the changes file); the version is bumped (`stampSave`). Rerun: 0 changes.
5. `node tools/export-game.mjs`, then `npm run gate` (tests, checks within baseline, nothing new by identity, strict export and case lint, export contract, `rev` on every added or changed entry, rule 8 plain aliases, style-case and propword-exceptions at 0, export current, version bumped). A raised baseline or a new allow-list key prints "needs Simon's approval": only with his OK.
6. Write the notice `tools/gen/batchNNN-changes.txt`: what changed, with reasons per word, and the export index shifts. Sending it to the game, and any pin, only on Simon's word.

Never hand-edit `data/*.json`. `data/breaks-en.txt` is written only by `tools/brk-merge.mjs`.

**Creating:** `addEntry(P, text, {...})` appends, so new entries take the next id and new export rows go at the end (no shift). A new theme gets the slug of its name as id (`uniqueThemeId`) and goes into its place in the depth-first order (`placeTheme`, or push then `sortDepthFirst`); later theme indexes shift by one: report it.

**Updating:** change fields in place; keep ids. Re-check every rule below for what the edit touches (a retyped word can trip the case lint; a new flag can make a theme thin for the game).

**Deleting:**
- A link: `unlinkEntry(P, e, tid)`. It also drops the shown text, `use` form, `nameOkIn` key and group places for that theme (a group left with one member is dissolved).
- A theme: `deleteTheme(P, tid)`. Refused while another theme's rule names it (`starts:@id`, `ends:@id`, `hidden:@id`): change that rule first. Its children move to its parent; every link, `show`, `use` and `nameOkIn` for it goes; its groups go with it. To merge two themes, first move the links the survivor lacks (keep the better typicality), its groups and note items, then delete.
- An entry: `deleteEntry(P, e)`. A root with aliases promotes one (the first spelling, else the first non-form, else the first), which takes the links, groups, kin, adult, firstLevel and (if it has none) region; other spellings and abbreviations of a different promoted word become `synonym`. Check the promoted alias's flags, type and case afterwards.
- Entries left with no theme stay (`orphan` (info)); delete one only when it is wrong in itself or a stub made only for the removed theme.
- After any delete: update complete-set notes (`complete-missing`, `complete-extra`), repair synonym groups (`group-small`, `group-member`, `group-missing` (error)) and kin (`kin-missing` (error), `kin-bad`), and check the theme still has 4 usable words (`thin`, `contract-thin`).
- Report in the notice: theme rows gone or added (later theme indexes shift), entry rows gone or newly exported or dropped (flags change which rows export), and from which row link positions move. The batch scripts print these (compare the two exports).

## 3. Generating a theme with N members, step by step

1. **Search first.** Look for the theme or a near-duplicate under another name (grep the theme names, check the members of likely twins: bike races / cycling races) and for every candidate word: `node tools/gen/find-word.mjs <word> ...` prints each entry with that text, its gloss, type, root and themes. Reuse an existing entry of the same sense; never add a second root for it. [`theme-twin` (info), `duplicate` (error), `sense-twin` (info)]
2. **Parent.** Put the theme under the group or theme it is a real subtype of. Flags and regions do not pass down: set each one the theme needs on the theme itself (Simon, 2026-11-27). [`theme-parent` (error); placement: judgement]
3. **Name** (section 6, Themes) and **id** (slug of the name).
4. **Kind and rule.** category (kinds of one thing; the default), place, property (members share an attribute), wordplay (chosen by spelling or sound), compound (members combine with a shared word), people (real people by name: composers, explorers, the Beatles; not fictional characters, gods or job words), name (given names and surnames as words: girls' names, surnames that are jobs; every theme in the names folder). The game holds people and name themes to level 41 (Simon, 2026-11-28). [`kind-people`: a theme with 70% or more words of type person that is not people, or a people theme under 70%; `kind-name`: a names-folder theme that is not name (warnings)] Wordplay and compound need a rule from the game's grammar (section 6).
5. **Flags.** complete, adult, tm, lang, foreign, region, firstLevel 31 for a sensitive topic, and locked / nameOk / familyOk only when they apply (section 4).
6. **Complete set?** Only a set with one agreed membership. Then N is the size of the set, and the note lists it exactly before you add members.
7. **Pick N members.** Every one unmistakably a member, the full term the player is asked to recognise, at most 4 words and 20 letters. Spread the difficulty unless told otherwise, by word difficulty: the harder of familiarity and typicality in this theme, as the game bands it (Simon, 2026-11-20). About a third easy (both 1-2), a third middle (the harder is 3), a third hard (the harder is 4-5), only words that really belong (`SPREADS.even` in js/ai.js, tools/gen/BRIEF-depth3.md). Size: at least 4 usable words (Simon, 2026-11-20); the generation briefs aimed at 15-40 words for a category theme and 12-30 for a narrow one, which gives the game more to choose from, but 4 is the only rule.
8. **Entry, alias or reuse** for each word: an existing entry of the same sense is only linked (add its typicality); a new sense of an existing text gets its own entry with a gloss (and the old one a gloss); a spelling, grammatical form, regional word, abbreviation, translation or strict synonym of a root is an alias, not a member (section 5, Aliases).
9. **Fields for each new entry:** text, gloss, pos, type, fam, flags, region, status `rev` (section 4).
10. **Typicality per link** for this theme (section 4).
11. **Overlap and families:** no two words for one thing, no word and a more specific form of it, no mixture or bare category word, no two forms of one word, at most one of two related words (section 5). Same-answer words that are both worth having go in one synonym group.
12. **Display:** `show` for a short text the theme shows (full term shown short in a kinds theme, compound member), `use` for a form alias the theme shows, `nameOkIn` where the full term contains a word of the theme name.
13. **Kin and clash:** for each new root, look for the same word family in other themes (`family-kin` (info) suggests pairs) and set kin; keep clash groups at 8 or fewer.
14. **Theme ratings last:** pop and ident (section 4), then compare theme difficulty with the 4th-easiest usable word (section 6).
15. **Batch** (section 2). New words of 8 or more letters need line-break points: `node tools/brk-tokens.mjs`, agents under `tools/gen/brk/BRIEF-brk.md`, `node tools/brk-merge.mjs todo`.

## 4. Fields

### Theme fields (theme dialog: js/dialogs.js `editTheme`)

- `id`: stable slug of the name (`citrus_fruits`); a leading or trailing `___` becomes `blank`; kept when the theme is renamed; unique ignoring case. Rules name themes by it. [`theme-dup-id` (error), `contract-theme-id` (error)]
- `name`: see section 6. [`theme-name-long`, `contract-theme-name` (error)]
- `parent`: the theme or group above; '' for a top-level group. The tree is for navigation and relatedness (no flag inheritance): a theme never pulls in its children's words. [`theme-parent` (error)]
- `group`: a folder, never played, holds no words. [`group-words`, `link-group`]
- `enabled`: leave true (no theme is disabled at v418); disabled passes down. (no check: judgement)
- `pop`, theme popularity 1-5, required on every theme with words: how good and appealing a pick the theme is for a general player. 1 headline themes people love (fruits, weather, the planets) · 2 popular · 3 ordinary · 4 less popular · 5 narrow, dry or niche. A complete set rates one step more popular. For a general UK/US adult, also for a region-tied theme. [`theme-unrated` (error), `contract-popularity` (error)]
- `ident`, identifiability 1-5, required: how easily a player works out the theme from four of its members, assuming easy words; independent of word difficulty and of popularity. Test: picture the four most typical members with no title; what would the player say?
  - 1 obvious, a child would name it (colors, farm animals, fruits, motion verbs: jump, walk, run, hop);
  - 2 clear and specific, an adult names it after a second look, or names a wider theme first and the title is an obvious refinement (musical instruments, chess pieces, game pieces, baseball bases, street food, alkali metals);
  - 3 needs a moment: several themes fit four members, a loose property, a niche fact decides (things that are round, words ending in -ship, machine sounds, Balkan countries, national spirits);
  - 4 hard: broad, a trick, or knowledge most lack (things made of metal, hidden words, starts-with and rhyme themes, homophones, macaque species, wild goats and sheep);
  - 5 obscure: not found without being told.
  - By kind: plain categories, places, people and names 1-2 (3+ when specialist or overlapping a neighbour); compound 3 (2 when the shared word is very common); property 3-4 (2 if concrete); wordplay 4 (3 for rhymes, double letters, palindromes; 5 for unusual patterns). Detail: tools/gen/BRIEF-ident.md. [`theme-unrated` (error)]
- Theme difficulty is never stored: `ident + 0.5 x (pop - 3)`, 1.0-5.0 (`themeDifficulty` in js/model.js). [`contract-difficulty` (error)]
- `complete`: a finite set with one agreed membership (months, planets, the four humours). Never for a set people disagree on (archangels). The game rates complete themes easier. [`complete-no-note`, `complete-extra`, `complete-missing`]
- `adult`: drugs, sexual content, violence (`FLAG_HELP`), and with them war, weapons, gambling and stag nights (Simon, 2026-11-20: they stay adult). An adult theme never plays. Alcohol is not adult: alcoholic drinks are sensitive only (Simon, I31, v418). (no check: judgement)
- `sensitive` on a theme: removed (Simon, 2026-11-27). A theme on religion, politics or death gets `firstLevel` 31 instead (batch v518 sets it on every theme that had the flag). Words lost theirs the same day (below). An old file's theme `sensitive: true` loads as firstLevel [31, 31, 31]; an outline `[sensitive]` tag reads as `[from:31]`.
- `firstLevel`: the first level at which the game may show the theme, per game mode: [easy, medium, hard], each a whole number of 1 or more, or null (blank) = anywhere. Left out of the file when all three are blank. Outline tag `[from:40]` (all modes) or `[from:-/30/-]`. A sensitive topic (religion, politics, death) has 31, the game's sensitive start level; set other values only when Simon asks. [`level-bad` (error)]
- `mustLevels`: the levels in which the game must show the theme, per mode: [[easy], [medium], [hard]], sorted, no duplicates; left out when all three are empty. Outline tag `[at:e5,12;m8;h3]`. Set only when Simon asks. A must level may not be below that mode's firstLevel, the theme must be playable (not a group, adult, offensive or disabled, rated, at least the minimum usable words), and no more themes may need one level than `settings.themesPerLevel` when that is set. The game does not read either field yet. [`level-bad`, `level-below-first`, `level-unplayable` (errors), `level-crowded`]
- `offensive`: the theme's topic or name is offensive (witchcraft, wizard words, illegal drugs); its words leave the default export with it. A theme name that contains an offensive word means the theme is flagged (or renamed). Section 5, Offensive words. [`offensive-theme`]
- `tm`: brands, titles, characters. The game does not read it. (no check: judgement)
- `lang`, language-specific: depends on English spelling, sound or slang and will not translate (rhymes, puns, slang, acronyms, anagrams, wordplay). Locks the theme by default; the game may drop it by plan. (no check: judgement)
- `foreign`: the words are mostly not English (numbers, colors or greetings in another language, Swahili or Māori words); not loanword themes (french phrases in english) or themes that only mention a country (french cities). Held back to the plan's starting level. [`foreign-flag`]
- `region[]`: who knows it, not what it is about. Tag a theme when a general US or UK adult knows it clearly less than a local: a country's teams, leagues, foods, festivals, TV, politics, systems, slang; cities and landmarks outside the US and UK and the lesser-known ones inside. Several codes are fine (`UK,IE,AU,NZ,ZA,IN` for cricket); a US-only theme is `US`. Do not tag world knowledge (animals, planets, world capitals, world religions and their festivals, Ancient Egypt, famous artists, global brands and sports), wordplay or foreign-language lists, or mixed themes; tag each theme itself (a folder's tag does not reach the themes under it); when unsure leave it untagged. Ratings stay for a general UK/US adult. Codes: US CA UK IE AU NZ ZA IN TR in the dialog; other codes are kept. Detail: tools/gen/BRIEF-regtag.md. (no check: judgement)
- `tkind`: category (default, not stored), place, property, wordplay, compound, people, name. [`contract-kind` (error); `kind-people`, `kind-name` (warnings)]
- `rule`: wordplay and compound only, in the game's grammar (section 6). [`rule-unknown`, `rule-theme` (errors), `contract-rule`, `contract-rule-unknown` (errors)]
- `locked`, Word substitution: absent = follow the kind (locked for wordplay, compound and `lang`); true = show exactly the linked word; false = regional and family words may stand in. Set it only to override. (no check: judgement)
- `nameOk`: members may contain the theme's own words (wordplay themes); the leak check skips the theme. No theme uses it at v418. (no check: judgement)
- `familyOk`: two words of one family may be separate answers (male/female titles, tenses, comparatives, plurals as a theme, anagram themes). Set by hand only, never by generation; not inherited, not exported. (`family-pair` skips it)
- `note`: shown to the generator and to people. For a complete set it is the exact comma list (section 6). [`complete-no-note`]
- `groups`: synonym groups, a list of lists of entry ids of this theme (section 5). [`group-small`, `group-member`, `group-missing` (error)]

### Entry fields (entry dialog: js/dialogs.js `editEntry`)

- `id`: numeric, from `nextId`; identity is the id, never the text. Keep ids when merging or converting (an entry becomes an alias in place).
- `text`: as normally written for this sense, US spelling, case and diacritics by section 5; no edge spaces; at most 4 words and 20 letters, no type exempt. [`empty-text` (error), `spaces`, `long`]
- `gloss` (Meaning/context): a short label of one or two words naming the sense (`donkey`, `fruit`, `language`, `name`). Required on every entry whose text another entry shares (its own aliases do not count); text + gloss unique. Leave empty when the text has one meaning. [`needs-gloss`, `duplicate` (errors)]
- `pos`: noun, verb, adjective, adverb, other (prepositions, numbers, interjections). Proper nouns are nouns. A form alias has its own; other aliases copy the root's. [`bad-pos` (error)]
- `type`: what the entry is. common (ordinary word, lowercase); person (a real, named person; given names too); place; org (company, brand, team, group); title (book, film, song, game, artwork); proper (other proper name: fictional character, figure of myth, legend or folklore, personification such as Uncle Sam, event, era, deity, surname, breed named after a place, named product, phrase with a proper word); acronym (letters said as letters or a word: NASA, UFO); phrase (idiom or set phrase only, never a name, never chosen to get past the word limit). A brand is `org` with tm; a named product or model is `proper` with tm (`Big Mac`); a company is `org` without tm. [`bad-type` (error), `type`, `case`]
- `enabled`: leave true; to drop a word, unlink or delete it. (no check: judgement)
- `fam`, familiarity 1-5, required on every entry and alias: how well known the word itself is, always for a general UK/US adult (a regional word too). 1 every child knows it (apple, dog; Mickey Mouse, London) · 2 nearly every adult (plum, otter; Cleopatra, Tokyo, NASA) · 3 many adults, not all (quince, ocelot; Tutankhamun, Timbuktu, UNESCO) · 4 people with the interest, job or region (kumquat, quokka; Hatshepsut, Lake Titicaca; rasgulla) · 5 few people (pulasan, a rare specialist term). Rate the word, not the thing or its importance; rate a name by whether an adult knows who or what it is, not by its frequency in text; when unsure, the harder. Detail: tools/gen/BRIEF-rec.md. [`unrated` (error), `contract-familiarity` (error); `rating-vs-zipf` outside the gate]
- `adult`: this sense is drugs, sexual content or violence (not alcohol). The game drops adult entries with their aliases. (no check: judgement)
- `sensitive`: removed (Simon, 2026-11-27); use `firstLevel` 31.
- `firstLevel` (roots only; an alias follows its root): as on themes, [easy, medium, hard], each a whole number of 1 or more or null = anywhere; null when none. 31 in every mode for a sense that touches religion, politics, death or alcohol (what `sensitive` meant). Narrow: a person or thing is not held back just for being historical (Theodore Roosevelt is not; v417). Other values only when Simon asks. An old file's root `sensitive: true` loads as [31, 31, 31]; an alias's is dropped. [`level-bad` (error; also a firstLevel on an alias)]
- `offensive`: some players object to this word, in any of its meanings; independent of adult and sensitive. Left out of the default export; the game drops it. Rules: section 5, Offensive words. [`offensive-word`, `offensive-unlisted` (info)]
- `tm`: a live trademark, product or brand name, also on a lowercase genericised word that is still a trademark (`xerox`, `taser`, `jet ski`); not on a company (`Ford`, `Google` [company]) or a former trademark now generic (`escalator`, `zipper`, `aspirin`). (no check: judgement)
- Set adult, tm and firstLevel for this sense only; `offensive` is about the word (section 5). Theme flags reach the links, not the entry: do not copy a theme's flag onto a word that does not have it itself. A form or spelling alias has its root's adult, offensive and tm; firstLevel lives on the root. [`alias-flags`]
- `region[]`: who mainly knows the word. A regional word with a same-sense equivalent in the other dialect is a `regional` alias of the US or neutral root, not a root (an alias's UK or US tag picks the dialect text). A regional word with no equivalent stays a root with its region: the game reads root regions and raises the word's band for every player (+1 UK- or US-only, +2 other regions only, +0 both UK and US; game g24), never hiding it. [`region-root-equiv`; `contract-root-region` (info); `alias-region` (info)]
- `aliasOf`, `aliasKind`: see section 5, Aliases.
- `typ{themeId: 1-5}`, typicality: one entry per link, how typical the word is of that theme, how readily it comes to mind: 1 the first words anyone names (rain, sun, snow in weather) · 2 typical · 3 ordinary member · 4 less typical or specialist · 5 a real member but peripheral (tomato in fruits). Not familiarity and not whether it belongs: a member of a complete set is never 4-5 just for being named later (Southern Ocean 2). 0 is not a rating. [`bad-rating` (error), `contract-link` (error)]
- Word difficulty is computed: `0.7 x the harder + 0.3 x the easier` of fam and typicality; the game's band is the harder.
- `status`: `rev` on everything a batch adds or changes (Simon's approval is the review); `gen` from the app's Generate (unreviewed); `new` added by hand in the app. The game does not read it. (gate step on the diff)
- `note`: free text for people (10 entries use it, e.g. "slang"). (no check)
- `show{themeId: text}`, Shown as: the shorter text that theme shows (`bald` for bald eagle in eagles, `fly` for firefly in ___fly). Only on themes the entry is linked to; keeps the root's case and diacritics, except deliberate plain shows in locked foreign-language themes; no case-only show where a correctly cased entry can be linked, never in wordplay or compound themes, never on an entry with regional or spelling aliases. [`show-theme`, `case-shown-wordplay`, `case-shown-alias`, `same-display` (info)]
- `use{themeId: aliasId}`: the theme shows one of the entry's `form` aliases (`rainy` for rain in weather conditions). Edited from the word table's form menu. [`use-theme`, `use-form`]
- `nameOkIn[]`: themes where the full text may contain a word of the theme name (compound members, `dried apple` in dried fruits, `electric truck` in truck types). Only for themes the entry is in. Not shown in the dialog. [`theme-name`; `nameOk-stale` (info)]
- `kin[]`: Related words (kin), section 5. [`kin-bad`, `kin-missing` (error)]

### Alias fields (same dialog, "This is an alias of")

- An alias has its own text, gloss, pos (forms), type, fam, flags and region; `aliasOf` the root's id; `aliasKind` one of spelling, form, regional, abbreviation, translation, synonym. [`alias-kind`, `unrated` (error)]
- No links, `typ`, `show`, `use`, groups or kin of its own: it appears wherever its root is (0 aliases hold links since v413; the export writes none). [`alias-links` (error), `contract-alias-links` (error), `kin-bad`, `group-member`]

## 5. Content rules

### Entries

- One entry is one meaning of one written form; two senses are two entries (`bat` [animal] / `bat` [club]; `bitch` [female dog] / `bitch` [insult], which is deleted: section 5, Offensive words). Link the entry in the sense the theme means: Maltese [dog] in dog breeds, never Maltese [language]; split a wrongly linked sense into its own entry. [`maybe-duplicate` when they share a theme; `sense-twin`, `sense-link` (info), allow list `js/sense-allow.js`]
- Never skip a good word because its text is taken by another sense: gloss both.
- The entry is the full term the player recognises; ratings, pos, type and flags describe the full term (harmless words can make a sensitive term: `crack house`). (no check: judgement)
- Use the shortest form people actually use (`smell`, not `sense of smell`); a long common alternative name is an alias of the short root. (no check: judgement)
- Kinds themes: a member that is only a modifier (`green`, `herbal` in teas; `igneous` in rocks; `mute` in swans) is the full-term entry shown short (`green tea` shown `green`). A short word that names the thing alone stays bare (`pine`, `merino`, `husky`, `panama`, `Pacific`). Never add a bare stub just for one theme. Closed compounds (`buttermilk`, `redwood`) and hyphenated terms (`A-road`) are never split; head-first names and fixed phrases stay whole (`island chain`, `Google Maps`); borderline cases stay whole (`town car`, `toy train`). Test: seen alone in the theme, does the short word still identify the kind? Detail: DESIGN-entries.md 3.6. [`case-bare-stub`; else judgement]
- Compound themes (`compound-end:room`, `compound-start:fire`): each member is the full term (`break room`, `firefly`), shown as the short word, with `nameOkIn` for the theme. Only fixed terms, never loose phrases (`good time`). [`theme-name`; else judgement]
- Given names: a link in a given-name theme (the "names" folder without surnames, and flowers used as girls' names) sits on a given-name entry: gloss `name`, type `person`. Another sense of the same word is its own entry, typed for that sense, and a name entry holds no link of another sense. Surnames are `proper`. (`case-common-in-names`; else judgement)
- **Flag, do not remove** (Simon, 2026-11-27): take a word out of a theme only when it is on the bad-word list (section 5, Offensive words), wrong for the theme (not one of its things, wrong sense, a misfit), or too obscure (familiarity 5). A correct member that is grim, violent, political or otherwise unsuitable for a family game stays linked and gets a flag: `offensive` when some people would object to the word itself (Hitler, Stalin, Mao Zedong, Holocaust, Gestapo, gulag), else `adult` (war, weapons, crime, gambling: mortar, Molotov cocktail, bribe, jihad like crusade). Either flag keeps it out of the game. (no check: judgement)

### Offensive words (DESIGN-entries.md 3.8; Simon, 2026-11-22)

The game must be able to leave out every word some players have objected to. Two tests, applied separately:

- **Delete** an entry whose meaning is crude, vulgar or a slur (`ass` [buttocks], `bollocks`, `spotted dick`). Never generate one. Mild insults (idiot, ninny) are kept, flagged.
- **Flag `offensive`** on any entry kept whose written word some players object to, in any of its meanings: the harmless meaning of a crude word (`ass` [donkey], `tit` [bird], `bitch` [female dog], `hooker` [rugby]); a spelling that is a slur (`negro` [Spanish for black]); medical and sexual words (penis, anus, condom, nude, gay, homosexual); serious topics (heroin, suicide, slave, swastika); religious and occult words (hell, devil, Satan, witch, wizard, cult); mild insults (idiot, moron, ninny). Derived words take it (witchcraft, shitty, bullshit).
- **A word with a harmless meaning** is flagged only if many players would think of the offensive meaning first, or would snigger at it: ass, tit, booby, bitch, knob, beaver yes; cow, spade, slope, ginger, pansy, fairy, tart, god, vegetable, special no.
- **Phrases** are flagged when the word keeps its offending meaning (`wicked witch`, `witch hat`, `idiot box`), not when the phrase names something harmless (`witch hazel`, `devil ray`, `thorny devil`): those go on the allow list `js/offensive-allow.js` (entry ids, Simon's approval).
- **Names and hyphenated phrases** are never flagged unless the whole name is the word (`Negro` [river], `Hell` [Michigan town], `Wizards` [NBA team]); `Moby Dick`, `Salem witch trials`, `cock-a-doodle-doo` are not. A name is decided by type, not by a capital letter.
- **Letters inside a word** never count (cocktail, Dickens, switch). But a line break may not leave an offensive piece (`cock|tail`): fix the line in `data/breaks-en.txt`.
- **Spellings and forms** take their root's flag; the rule covers words in every language and theme names.
- **The list** is `js/offensive-words.js` (built by `tools/gen/offensive-list-make.mjs` from LDNOOBW, Ofcom 2016 and 2026 and Wiktionary's swear words): a listed word matches as a whole word or its plural. Add a word only with Simon's approval. No list catches all slang: judge new slang, insult and anime words yourself.
- Checks: [`offensive-word`, `offensive-theme` (warn), `offensive-unlisted` (info), `contract-offensive-break` (warn)]

### Case and spelling

- One rule: a word is written the way it is correctly written for its sense in that theme. Lowercase unless a proper noun (person, place, organisation, title, brand, named period) or an acronym/initialism in capitals. Never copy a capital from a list or another entry (`garnet` the gem). [`case`, `case-*`, gate reruns of `tools/gen/style-case.mjs` and `tools/gen/propword-exceptions.mjs`]
- Link the entry whose sense fits: if a theme wants the common noun and only a proper entry exists, create the lowercase entry with a gloss. [`case-sense-proper`, `case-sense-common`, `case-cap-common`]
- Dictionary rules (Simon, 2026-11-16; detail and per-word evidence: DESIGN-entries.md "Capital rule and lint"):
  1. Take the capital the sense has in Oxford and Merriam-Webster. If they disagree, or M-W says "often capitalized", lowercase (the cheddar rule: `brie`, `parmesan`, `cotija`, `draconian`).
  2. No dictionary entry: follow the siblings in the theme (`Choron` like `Mornay`; `ankara` like `denim`).
  3. Grape varieties lowercase unless the name holds a proper word (`Müller-Thurgau`, `nero d'Avola`).
  4. A trademark follows the theme's sense: brand sense capital `org` + tm (`Kleenex`, `Cointreau`); in "brand names used as words", lowercase common + tm only when rule 6 allows.
  5. A capital follows the whole family of the sense (`Caesar` dressing, salad and cocktail).
  6. A trademark is lowercase only when both dictionaries print the sense lowercase or they disagree (`thermos`); else capital (`Hoover`, `Velcro`, `Frisbee`). A verb use is a separate lowercase entry (`google` [search the web]).
  7. `tm` marks product and brand names, not companies (above).
  8. Diacritics: a root keeps the diacritics of its language of origin when at least one major English dictionary prints them, regional ones included (Oxford NZ and Australian editions, Te Aka for Māori, the Dictionary of South African English): `jalapeño`, `Gruyère`, `déjà vu`, `döner`, `droëwors`, `kākāpō`, `Māori`. Plain only when all print it plain (`guarana`, `raki`, `agogo`). The plain form is always kept as a `spelling` alias with no region (`jalapeno`). [gate step on the diff for roots the change touches; older gaps: `node tools/gen/plaincheck.mjs`]
  9. A place-named wine is capital (`proper`) only when the dictionaries capitalise the sense (`Barolo`, `Chablis`, `Bordeaux`); if both print it lowercase, they disagree, or none could be checked, lowercase (`prosecco`, `rioja`, `chianti`), and mark the call "recheck" in the notice. A wine that shares an entry with its region is split (`Sancerre` [wine region] place / [wine] proper).
- A phrase with a proper word keeps that capital and is typed `proper` (`French fries`, `Yorkshire terrier`, `eggs Benedict`); lowercase only where dictionaries agree it is no longer felt as a name (`venetian blind`, `graham cracker`). [`case-lower-proper`, `case-lower-proper-word`, word list `js/caselint-words.js`]
- Styles and movements (art, architecture, design, literature, fashion) are lowercase (`baroque`, `gothic`, `art deco`, `cubism`); a word keeps a capital only when English has it only as a name or its adjective (`Victorian`, `Tudor`, `Moorish`, `Romanesque`, `Bauhaus`, `Greek revival`). A historical period is a name and a separate entry (`Renaissance` in periods, `renaissance` in styles). [`case-style-capital`]
- Places are `place`; a thing named after one is typed for itself (`Limousin` [cattle breed] proper). `brazil nut` is lowercase (Simon).
- An intended exception goes in `js/caselint-allow.js` (`entryId|themeId`), with Simon's OK.
- US spelling for roots; the UK spelling is a `spelling` alias tagged UK (below). Spelling-sensitive themes keep their own word (`plough` in ough words).

### Aliases

- People's names (Simon, 2026-11-23): the full name is the root (`Claude Monet`, `Isaac Newton`); the surname is its first `synonym` alias, at the same familiarity, so the game can still show "Monet". Exceptions: a person known by one name (`Rembrandt`, `Banksy`) and a full name over 20 letters keep the short name as root. Replaces the v164 "shorter name is the root" sweep. (no check: judgement)
- Kinds:
  - `spelling`: the same word spelt another way (`colour`, `jalapeno`, `Dobermann`); `satnav` is not a spelling of GPS;
  - `form`: a grammatical form only, an inflection or derivation of the same sense (`rainy`, `skis`, `apples`), never a compound or longer name;
  - `regional`: the same thing under another dialect's word (`bonnet` [UK] for hood, `pavement` [UK] for sidewalk);
  - `abbreviation`: a short form (`PC`, `nuke`);
  - `translation`: the same thing named in another language (`Danmark`, `Roma`, `Gaeilge`);
  - `synonym`: a strict synonym only, always the same answer in every theme (`besan` / gram flour); a near match (`sofa` / couch) is two entries in a synonym group.
  [`alias-kind`; `alias-fullname`, `alias-kind-suspect` (info)]
- An alias points at a root, never another alias, and differs from the root's text. [`alias-missing`, `alias-chain`, `alias-self` (errors), `alias-same`]
- The root is the US or neutral word; the UK spelling is a `spelling` alias tagged UK. When both spellings are standard in the US (doughnut / donut, whisky / whiskey) the usual one is root and the other untagged. [`alias-us-root`]
- Spelling aliases are tagged US or UK for a US/UK difference and untagged for a plain (accent) form. A regional alias always carries its region codes. [`alias-region` (info)]
- One display alias per dialect: a root has at most one UK-tagged and one US-tagged spelling or regional alias (the dialect's standard everyday word); other true variants are `synonym` aliases, keeping a region when specific to it. None of a dialect when the root is that dialect's word. No alias tagged both UK and US. [`contract-alias-dialect`]
- A spelling or form alias has the root's adult, offensive and tm flags; firstLevel lives on the root only (an alias follows it). [`alias-flags`, `level-bad`]
- Every alias has its own honest familiarity for a general UK/US adult (a rarer alias a higher number). A `spelling` alias tagged UK or US has its root's familiarity (the game shows it and raises the band by it); an untagged spelling the root's by default, higher only when that spelling is clearly rarer; a spelling is never easier than its root (Simon, 2026-11-20). [`unrated` (error), `spelling-fam`]
- Link the root, never the alias. Where a theme needs the alias's text (a locked theme, a regional answer), link the root and `show` the alias's text. [`alias-links` (error), `contract-alias-links` (error)]
- One alias family (a root and its aliases) has at most one member in a theme and one in a level. [`family-twice`]
- A regional root with a same-sense equivalent becomes an alias of it in place (id kept): links the root lacks move to it (with `show` where the theme needs the regional word), group places and kin pass to the root. Left a root, it would play harder than its sense is (the game raises a regional root's band). [`region-root-equiv`]

### Same word or related words

- Look for an existing entry first; reuse it, never a second root for the same sense in any theme. Two roots for one sense are merged: the weaker becomes an alias in place, links and groups move, or it is deleted if its text repeats an alias. [`duplicate` (error); across themes `sense-twin` (info)]
- Word families (DESIGN-entries.md 3.7): one family is a word and its inflection or derivation, two words from one root, or pet and short forms (vote/voter, gamer/gaming, joy/joyful, host/hostess, dad/daddy, pup/puppy); not words that only share letters (tea/teach) or compounds (fish/goldfish, the overlap rule).
  - Same word, same sense: one entry, the other a `form` alias; the theme shows the form it needs through `use` or `show`.
  - Related but different words appear in one theme only inside one synonym group; otherwise keep the better fit.
  - Separate answers with no group only in locked themes and `familyOk` themes.
  [`family-pair`, allow list `js/family-allow.js`]
- Synonym groups hold same-answer words of one theme (sofa / couch; subtract / minus / subtraction; Uluru / Ayers Rock): at least 2 members, all roots linked to the theme, one group per word per theme; only one member plays per level. Not a group: a word and its result, opposite, kind or part (sum / addition). Themes of synonyms ("words for happy") and of slang or nicknames take none. [`group-small`, `group-member`, `group-missing` (error)]
- Kin joins one-family roots in different themes (joy in emotions, joyful in happy words); one written word in another sense counts (hearts / heart). Symmetric, stored on both roots, never on an alias; set with `setKin`. Not kin: allow-list the pair in `js/family-allow.js`. [`kin-bad`, `kin-missing` (error), `family-kin` (info)]
- Clash groups (synonym groups + kin, joined across themes) stay at 8 or fewer; up to 12 for a real look-alike pair in big themes; above that unlink the weaker member or leave the kin unset. [`clash-large` (info) 9-12, `clash-big` above 12]
- Overlap: a theme never holds two words for one thing, or a word and a more specific form of it (cola / Coca-Cola, shears / pruning shears, top / spinning top) unless grouped. Fixes in order: one entry with the other as alias; a brand beside its generic word is one answer in a general-category theme (group or drop the brand) but separate members in a theme of examples (fizzy drinks); four or more subtypes become a sub-theme; fewer stay grouped. A species or breed beside its generic word in a kinds theme is fine. [`overlap` (info)]
- A member is one of the theme's things: never a mixture, collection or the whole category (`mixed nuts`, `fruit salad`, `cutlery`), never the bare category word in a theme of its kinds (`road` in road types). The bare word of a plural-named theme stays (`snake` in snakes). (no check: judgement)
- A longer entry that merely contains a member's word is not a member for that reason: a part, product, food, person, place or event built on a member is a different thing (`oil well` in fossil fuels, `duck breast` in poultry). (no check: judgement)
- Two words that show the same text in one theme are allowed; the export keeps the more popular. Prefer another name (electric ray -> torpedo). [`same-display` (info)]

## 6. Themes, links and ratings

### Themes

- Name: lowercase except proper nouns, their adjectives and acronyms (`US states`, `TV genres`); top-level folders keep title case. US (house) spelling and the root's diacritics (`Galápagos animals`, `Māori words`). Keep it as short as possible: screen space in the game is tight (Simon, 2026-11-20). Aim at 24 characters or fewer (two lines in the game's narrowest column), never over 30; drop words the members make obvious (`snakes`, not `types of snakes`; `cheeses`, not `kinds of cheese`; `pasta shapes`, not `different shapes of pasta`), prefer the shorter everyday word, and use a widely known abbreviation (`US`, `TV`, `UK`) over the spelled-out form. Shorten only while the name still says clearly what the members share. [`theme-name-long`; spelling and case: no check]
- The name describes the members by itself, outside the tree (`police equipment`, not `officer's equipment` under police), and contains no member's word; a single word that is the thing collected is fine (`bug` in garden bugs). [`theme-name`, `is-theme-name`]
- Do not rename the ancestors "names", "famous people", "surnames": the game finds people themes by them. (no check: judgement)
- Not a near-duplicate of an existing theme (bike races / cycling races); merge instead. [`theme-twin` (info), allow list `js/theme-twin-allow.js`]
- A theme X and an "X words" theme beside it (airport / airport words, sleep / sleep words, fitness / fitness words) are merged into X when "X words" holds more things of the same topic (Simon, 2026-11-22; replaces v408, which kept topic / "X words" pairs). When "X words" is how people talk about it, a different kind of answer, it stays and is renamed for what it is: `pirate talk` beside `pirates`, `wine tasting` beside `wines`. [`xwords-twin` (info: 30% shared), allow list `js/theme-twin-allow.js`]
- A sub-theme is a real subtype or a clear membership test (not a shared word: "water" in drinks), with at least 4 distinct words and a name that does not leak them. A word may sit in a parent and a child, each link rated for its own theme. Complete themes split only into exact sets. [`thin`]
- Every member belongs unambiguously: a thoughtful player must not argue it fits another ordinary theme better. (no check: judgement)
- Size: a playable theme needs at least 4 usable words (adult and offensive words do not count, unless the theme itself is offensive; words with firstLevel 31 count but only from level 31); a theme meant for early levels needs 4 without a late firstLevel. [`thin`, `contract-thin`]
- Complete set: the note is the exact comma list, `label: a, b (alt), c`; a parenthesis holds an alternative name; every member matches an item (by text, shown text, alias or group partner), every item is covered, one entry per item; nicknames go in the member's synonym group or alias. [`complete-no-note`, `complete-extra`, `complete-missing`]
- Theme difficulty against its words (I30): keep the theme difficulty no more than about one band below its 4th-easiest usable word (gap under 2), or it rarely plays; fix a wrong word rating, or raise ident (or pop). Compute with `themeDifficulty` and `themeProfile` (js/model.js). [`theme-gap`]
- Wordplay and compound rules, the game's grammar (`parseRule` in js/model.js): `palindrome`, `double-letters`, `homophone`, `onomatopoeia`, `anagram`, `no-vowels` (y is not a vowel; spaces and hyphens ignored), `roman` (only i v x l c d m), `reversible` (the reverse is another word of the export, not a palindrome), `curated`, `rhyme:X`, `contains:X`, `compound-start:X`, `compound-end:X`, `starts:X`, `ends:X` (X at least 2 letters, or `@id` for starts/ends), `hidden:@id`. Any other rule never plays. [`rule-unknown`, `rule-theme` (errors), `contract-rule`, `contract-rule-unknown` (errors)]
- Every member of a tested theme passes the game's test. `curated` plays from its links with no property test (Simon chose it over a `members` rule for untestable wordplay). [`contract-reversible-missing`; others: judgement]
- In locked themes the game shows exactly the linked text or its `show`; no dialect swap. (no check)

### Links and ratings

- Every rating is set in the batch that creates the theme, word or link: theme pop and ident, entry and alias fam, link typicality; none left at 0. All are for a general UK/US adult, never for a local. [`theme-unrated`, `unrated`, `bad-rating` (errors)]
- `show` and `use` only on themes the entry is linked to. [`show-theme`, `use-theme`, `use-form`]
- `nameOkIn` only for themes the entry is in. [`nameOk-stale` (info)]
- Never link a group. [`link-group`]

## 7. Open points for Simon

- Spelling aliases with region codes other than US/UK: kept "for now" (47 at v418; the docs say 44) until Simon settles them.
- Alias links (settled 2026-11-20, Simon): no alias holds a link; the root is linked. Enforced by the error `alias-links` and `contract-alias-links`; the app links the root, and the entry dialog of an alias shows the root's themes read-only.
- (Settled 2026-11-20, v419: the drink themes are sensitive, not adult.)
- (Settled 2026-11-20, Simon: adult stays as it is, covering drugs, sexual content and violence, including war, weapons, gambling and stag nights; alcohol is sensitive only.)
- I30 leftovers: places of worship and religious festivals (easy words sensitive) are for Simon; `theme-gap` (warn) lists the themes over the gap (Hindu festivals at its start).
- (Settled 2026-11-20, Simon: a UK/US spelling alias has its root's familiarity; an untagged variant the root's by default, higher only when clearly rarer; never easier than its root. Check `spelling-fam`; v420.)
- (Settled 2026-11-20, re-checked on dictionary pages: liebfraumilch, gavi and côtes du rhône stay lowercase (v392, Simon; gavi and côtes du rhône marked recheck); hoover [verb] is already its own lowercase root (v389); Doric, Ionic, Corinthian, Tuscan stay capital, Composite lowercase (v376). Evidence: tools/gen/words-evidence-2026-11-20.txt.)
