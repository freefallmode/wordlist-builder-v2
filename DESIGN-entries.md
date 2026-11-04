# Design: synonym groups, word forms and regional variants

Written 2026-10-31 after a discussion about `swede` appearing in "root vegetables" without `rutabaga`. Status: partly implemented (updated 2026-11-01). Numbers in sections 1 and 7 are from library v201 (62,786 entries, 58,551 roots, 2,485 playable themes). Implementation state is in section 10.

## 1. Problem

`alias` is doing three different jobs, and one of them does not fit:

| Kind today | Count | What it really is | Theme-dependent? |
|---|---|---|---|
| `spelling` (colour/color) | 566 | the same word spelled differently | no |
| `form` (rainy for rain) | 1,248 | the same word in another grammatical form | no |
| `synonym` | 2,304 | a different word with (nearly) the same meaning | **yes** |
| stray kinds (`short form`, `slang`, `abbreviation`, `variant`, `"2"`...) | about 110 | mixed | mixed |

Synonyms are the problem. Whether `pudding` and `dessert` mean the same depends on the theme, so a global alias cannot be right everywhere. In practice 2,142 aliases already carry their own theme links (5,926 links): the alias is being used as a free-standing member of a theme, which is how `castle` (alias of `rook`) ended up in `buildings`, and how `swede` ended up alone in "root vegetables" while `rutabaga` was missing.

About 780 of the synonyms are really **regional words** (`flat` for `apartment`, `bonnet` for `hood`). These are different: the equivalence holds in every theme, so they do not have the problem.

## 2. Principle

> **Global** facts are about the *same word*: its forms, spellings, abbreviations and regional equivalents. **Theme-local** facts are about *different words*: synonyms.

## 3. The model

### 3.1 Entries and aliases

An entry is still one word in one sense (text plus meaning label). A root is the **default-dialect** word (US, see 3.4). Aliases are surface variants of the same word. There are four kinds:

| Kind | Example | Inherits theme links | Rating |
|---|---|---|---|
| `spelling` | `colour` for `color` | yes | takes the root's recognisability and popularity |
| `form` | `rainy`, `raining` for `rain` | yes | own recognisability, shared popularity (see 3.3) |
| `regional` (new) | `bonnet` for `hood`, `flat` for `apartment` | yes | own recognisability |
| `abbreviation` (new, replaces `short form`, `acronym`, `nickname`) | `PC` for `personal computer` | yes | own recognisability, shared popularity |
| `translation` (new, 2026-11-01) | `Danmark` for `Denmark`, `Roma` for `Rome`, `Gaeilge` for `Irish` | yes | own recognisability |

A `synonym` alias is a **strict** synonym only: a word that is always the same answer as its root and can always substitute for it (same answer test, 3.3); the game may show whichever of the two suits the level difficulty. Near matches (`sofa`/`couch`) are separate entries with a synonym group. A regional, synonym, abbreviation or translation alias **may have theme links of its own** (decided 2026-11-04, see 3.5); a spelling or form alias never does. An alias with no link of its own appears in every theme its root is in. `swede` and `rutabaga` become two separate entries (or a `regional` pair, since `swede` is the UK word).

A regional variant carries `region` tags (UK, AU...). Spelling aliases carry US or UK only.

### 3.2 Synonym groups (theme-local)

A theme can declare groups of its own entries as interchangeable:

```
theme "desserts": groups: [[pudding, dessert]]
```

- Members are ordinary entries with their own ratings and theme links.
- **Rule for the game: at most one member of a group per level.**
- Another theme can list `pudding` and `dessert` as unrelated entries, or as a different group.
- A theme whose point is synonyms ("words for happy") simply declares no groups, so its members can appear together.

**Across themes.** If `pudding` (desserts) and `dessert` (meal courses) land in one level, the player is confused. This is handled by the **level generator**, not the library: the export gives every entry a `clash` id, built from the union of all theme groups it appears in, and the generator never puts two entries with the same clash id in a level. A report lists cross-theme clashes for review, because a few will be wrong where a theme treats the pair as different senses; exceptions can be added.

### 3.3 Word forms

A root is a **meaning** (`rain`), and its `form` aliases are its grammatical forms (`rainy` adjective, `raining` verb). `wind` (weather), `wind` (to turn) and `winding` are different meanings and different entries.

- **Per theme, one form is displayed.** The root's theme link may name an alias to use: `use: { weather: <id of "rainy"> }`. Default is the root itself. A theme link's popularity is shared by all forms of the entry.
- **Queryable.** A tool or a game theme can ask for the noun forms of a theme instead (`sun`, `rain`, `cloud`), which makes theme sets with matching parts of speech possible.
- Each form has its own part of speech and its own recognisability (`rainy` is not as well known as `rain`).
- **Same answer test.** A form counts as the same meaning if a player would accept it as the same answer. Derived words that have drifted (`sunny`, meaning cheerful) are a separate entry.

**Generated forms.** Agents may add a missing form where a theme prefers a part of speech, under these rules:
- it must be a normal dictionary word in everyday use, and the agent must be able to give a natural example sentence;
- it is checked against the word-frequency list, and rare forms are flagged;
- "no suitable form" is an explicit allowed answer;
- new forms stay `status: gen` until reviewed.

### 3.4 Regional variants and the default dialect

- Roots are the **US/neutral** word. Untagged means "the same everywhere".
- The regional alias carries its tags. `region` tags stay fully detailed in the data (UK, AU, NZ, IE, IN, CA, ZA and others). **No tag is merged or removed.**
- **In the game**, the player's region setting picks the member to show: the regional alias if the player's region is in its tags, otherwise the root. Only one is ever shown, so no clash rule is needed. Bucketing (for example US / UK / other, with AU, NZ, IE, IN and ZA following UK unless a word says otherwise) happens in the game, not in the data.
- **In the web app**, a setting "default dialect" (US or UK) chooses which member the app shows in lists and uses as the export fallback. It does **not** move data: with default UK the app shows `flat` for the `apartment` set. Flipping roots in the data is never needed.
- Spelling aliases: US and UK are enough.

### 3.5 Alias families in themes, and locked themes (2026-11-04)

A root and all its aliases form an **alias family**: one meaning, one primary (the root).

- **Linking.** Any regional, synonym, abbreviation or translation member of a family may be linked in a theme on its own, with its own link rating (difficulty is then `max(its own rec, the link)`, so `handbag` is no longer as hard as `pocketbook`). Spelling and form aliases are not linked on their own; the dialect swap handles them.
- **One per theme.** At most one member of a family may be linked in a theme (validation `family-twice`). The link says which word the theme wants; the rest of the family follows.
- **One per level.** The game never puts two words of the same family in one level. The export gives each word its family (the root), as it already does in the root column.
- **Locked themes.** A theme is *locked* when the game must show exactly the linked word. It then does not swap in a regional or spelling variant or another family member. Locked by default when the theme kind is `wordplay` or `compound`, or the theme (or an ancestor) is language-specific (`lang`); a theme can override either way with `locked: true` or `false` (theme dialog, Word substitution). The export writes bit 64 (`locked`) in the theme flags.
- **Unlocked themes** swap by the player's region as in 3.4: if the linked word has a family member for the player's region, that member is shown. A UK-only member linked in an unlocked theme is shown as such to a UK player, and swapped to the US word for a US player.
- `show` is separate: it is the short display text of an entry in a theme (`fly` for `greenfly` in a compound theme). It stays and works with locked and unlocked themes.

### 3.6 Compound and modifier members: the entry is the full term (2026-11-05)

What the player is asked to recognise is the **full term**, so the entry, its ratings, part of speech, type and flags describe the full term, never the bare word.

- **Compound themes** (`tkind` compound, rule `compound-end:room` or `compound-start:fire`): each member is an entry for the full term (`break room`, `firefly`); the theme shows the short word through `show` (`break`, `fly`). The entry carries `nameOkIn` for the theme, since the full term contains the theme's shared word. `rec`, the link rating, pos, type, adult, sensitive, tm, vulgar and region are judged for the full term (a harmless word can make a sensitive term: `crack house`). Loose phrases (an ordinary word plus the shared word: `good time`) are not members; only fixed terms are.
- **Kinds-of-X themes with modifier members:** a member that is only a modifier and does not mean the thing without its head noun (`green`, `herbal`, `bubble` in teas; `mute` in swans; `igneous` in rocks; `solid` in line types; `prime` in number types) is the full-term entry (`green tea`) shown as the modifier. A bare word that already means the thing (`pine`, `tote`, `leatherback`, `Pacific`, a saint's first name) stays as it is.
- **Entries with the same text** keep their meaning labels apart (`overlook` the verb and the viewpoint); a word that exists already is reused, not duplicated.
- **Shown text** repeats across entries more often now (several members show `board`); the generator treats two words with the same shown text as clashing in one level, as for synonym groups.
- Done in the library: all compound themes (v274 pilot, then the other 48 in v275: 130 links dropped, 923 moved to existing full terms, 703 new full-term entries, 394 emptied bare words deleted). Tools: `tools/gen/compound-make.mjs`, `BRIEF-compound.md`, `compound-apply.mjs`; modifiers: `BRIEF-modifier.md`, `compound-apply.mjs --prefix m`.

## 4. Splitting themes

Many themes can yield new themes of 4 or more words, especially once forms are queryable (`weather`: 58 nouns and 8 adjectives could give a `weather conditions` theme of adjectives and a `rough weather` theme of storms). Rules:
- A split theme should have at least 4 distinct words (relaxed from 8, 2026-11-03), be a real subtype or a clear membership test (not just a shared word: "water" in drinks is not a subtype), and have a name that does not leak its words.
- **Overlap rule** (2026-11-03). A theme must not list two words for the same thing, or a word and a more specific form of it, unless they are grouped. Cola and Coca-Cola, or pasta and pasta sauce, are the mistake. Fixes, in order: (1) the same thing under two names becomes one entry (the shortest form; the other an alias or dropped); (2) a brand and the generic word it stands for (cola and Coca-Cola): in a theme of a general category (soft drinks) they are one answer, so they go in a synonym group, or the brand leaves the theme when it adds nothing; in a theme of examples or kinds (fizzy drinks) Pepsi, cola, Sprite and lemonade are separate members and all stay. Test: would a player hesitate over which of the two a word is? A brand with no generic word listed in the theme stays; (3) four or more subtypes of one thing become their own sub-theme; (4) fewer than four stay in the parent and go in a theme-local synonym group so a level never uses both. The validator reports candidates as `overlap` (info).
- **A member is one of the theme's things, not a mix of them** (2026-11-03). A word that stands for a mixture, collection or the whole theme does not belong in it: `mixed nuts` is not a kind of nut (removed from `nuts`), and the same goes for `assorted sweets` in a sweets theme, `fruit salad` in a fruits theme or `cutlery` in a theme of knives and forks. It can sit in a theme of its own kind (snacks, dishes). The same holds for the bare category word in a theme named for its kinds ("types of X", "X types", breeds, varieties, species, styles): `road` is not a type of road, `aircraft` is not an aircraft type (7 such links removed from kebab, road, settlement, aircraft, motorcycle, traveler and soldier themes). The exception for the bare word of a plural-named theme (`snake` in snakes) does not apply there. Generation prompts and reviewers apply this as part of the overlap check.
- **Complete themes** (134 closed sets, whose note lists the exact members) are only split into pieces that are themselves exact sets.
- A word may sit in a parent and a child, but the level generator must not use the parent and its split-off children together. Check how the game handles sibling overlap before adding many splits.
- Splits are proposed by agents, names approved by a person.

## 5. Ratings

Terms (2026-11-03). **Familiarity** (`rec`): how well known the word is, on its own. **Typicality** (`th[theme]`, `inRec` in prompts): how readily the word comes to mind for one theme. **Difficulty**: the harder of the two for a word in a theme; computed, never stored, and exported per link. **Theme popularity** (`pop`): how familiar and appealing the theme is for a general player. The stored keys are unchanged; only the labels changed.

Unchanged in meaning (`rec`: how well known the word is; theme link `pop`: how typical it is of the theme), applied as in the table in 3.1. A regional variant's `rec` is judged for the audience of its region.

## 6. Export (format version 3)

- Aliases keep the root pointer, with kind bits for spelling, form, regional, abbreviation and translation (16, 32, 64, 128, 256, 512 for a strict synonym).
- Each alias row has its part of speech and region mask.
- Each theme link may have a `use` form index.
- Each entry gets a `clash` id (3.2).
- The game repo has not been updated to format 2 yet, so it can be moved straight to 3.

## 7. Migration plan

Run on a prototype slice first (`weather`, plus about ten synonym-heavy themes), then the library. Each phase ends with checks and a commit.

| Phase | Work | Size | Who |
|---|---|---|---|
| 0 | Fold the stray alias kinds (`short form`, `slang`, `variant`, `"2"` and so on) into the real kinds | about 110 | script plus review |
| 1 | Spelling: tag every spelling alias US or UK | 311 untagged | script (by spelling pattern) plus review |
| 2 | Regional words: `synonym` with a differing region becomes `regional`; flip the roots that are the UK word | 779 pairs; about 105 sure flips (UK root, US alias), plus some of 243 where the root is untagged but is really the UK word | script for the sure cases, agents for the 243 |
| 3 | Remaining synonyms (about 1,500): each becomes an independent entry. In each theme where the root and the synonym are both present they become a group; a synonym that only has its own link becomes a plain entry; a link that was really a different sense gets its own entry with a label | about 1,500 | agents, by theme |
| 4 | Families: merge `rain`/`rainy` pairs inside themes, then give forms parts of speech and a `use` form per theme | 1,248 forms plus in-theme duplicates | script plus agents |
| 5 | Split themes | open ended | agents propose, person approves |
| 6 | Export v3 and the game | | |

Safeguards: validation rules for each kind, a count of aliases with theme links (target 0), and a before/after list of every theme's member set so no theme loses words by accident.

## 8. Open questions

- Is one member per group per level always right, or should a few themes allow both (for example themes about word choice)? The proposal says: only themes that declare no groups.
- Region bucketing in the game (US / UK / other): confirm after seeing how many words are unique to AU, NZ, IE, IN, CA and ZA (90, 19, 19, 34, 14 and 7 words respectively tagged to a single region).
- How does the game use the root pointer and alias kind bits today? Not checked; the game repo is still on export format 1.

## 9. Shortened text in a theme (`show`)

Added 2026-11-01. A theme may show an entry under a shorter text than its own: `rock garden` is shown as `rock` in "garden styles" (`show: {garden_styles: "rock"}`). This is a theme-local fact, so it is **not** an alias: `rock` does not mean "rock garden" in any other theme. The earlier kept-by-name review recorded these as `form` aliases of the bare word; 1,147 of them were turned back into entries of their own (`tools/gen/show-migrate.mjs`). `form` now means a grammatical form only. Like `use`, `show` is written by export format 3 (see section 8).

## 10. Decisions log and implementation state

Decisions taken while building the weather prototype (2026-11-01), with the reason. The rest of this file is the plan they refine.

**Decisions**
- **Synonym groups are theme-local.** `theme.groups` is a list of lists of entry ids; a word is in one group per theme. Only one member of a group appears in a level, except in word-puzzle themes that declare no groups. The export gives every word in any group a `clash` id (groups joined across themes); the level builder never puts two with one id in a level.
- **Forms are grammatical only.** rain, rainy and raining are one meaning. The 1,164 "form" aliases that were really compounds or full names (rock garden of rock, school uniform of uniform, storm cloud of storm) were wrong: they came from a text-matching rule in the kept-by-name review script. They were rebuilt as entries (section 9). `hot springs`, `skis` and similar stay forms.
- **A theme shows a word through `use` (a form) or `show` (a shorter text).** The entry keeps its identity, ratings and links; the display is a property of the theme link. A form's own recognisability counts when it is shown (the harder of the two). The part of speech shown is the form's, so a theme of adjectives can be built from noun roots.
- **Shortening is not aliasing.** A bare word is a valid alias only where it means the same thing everywhere. Where the category supplies the meaning ("what type of garden? rock") it is `show`.
- **Duplicates in display are allowed in the library**; the export keeps the more popular (then the easier) and leaves the other out of that theme. If an obvious second name exists (electric ray -> torpedo) it is used instead.
- **Theme-name check uses the shown text**, so rock garden is fine where it shows as rock.
- **Roots are the US/neutral word; every region tag is kept** (not yet applied: see phases 1-2). The web-app default-dialect setting only changes what is shown and the export fallback; it never moves data.
- **Region in the game** is chosen from the player's setting, never by a clash rule: the regional alias if the player's region is in its tags, else the root.
- **Generated forms** (misty, hazy, showery, drizzly, thundery) follow section 3.3: ordinary dictionary words with a natural sentence, status `gen` until reviewed.
- **Weather split:** `weather` is nouns only; `weather conditions` (24 adjectives) is its child; the rough-weather part already exists as `storms`.

**Implemented**
- Phase 0: stray alias kinds folded into spelling, form, regional, abbreviation, synonym (library v202).
- Model and checks: `groups`, `use`, `show` (js/model.js, js/validate.js).
- Weather prototype (tools/gen/weather-proto.mjs, v203): 12 synonyms promoted to entries, 10 groups in weather and 4 in storms, `weather conditions`, five generated forms.
- Full-name rebuild (tools/gen/show-migrate.mjs, show-leftovers.mjs, v204-v206): 1,147 restored with `show`, 18 leftovers resolved, no theme-name warnings left.
- Export format 3 (section 6 of DESIGN.md): per-link shown text and part of speech, `clash`, regional and abbreviation bits, duplicate-display rule.
- Phase 3 (synonym aliases to entries), 2026-10-31: 1,557 same-region synonym aliases reviewed (tools/gen/syn-make.mjs, BRIEF-syn.md, syn-apply.mjs, syn-fixups.mjs): 1,361 became entries with 2,632 synonym groups library-wide, 40 different senses, 1 deleted, 155 retyped as abbreviation, spelling or regional. The 783 synonyms whose region differs from their root remain for phase 2 (regional words).
- Phase 2 (region-differing synonyms), 2026-11-01: 783 reviewed under the revised brief (BRIEF-syn.md, --regional listing, F flip): 457 regional/abbreviation/translation/spelling retypes, 130 flips (the US word becomes the root), 150 synonyms promoted to entries, 40 different senses, 6 deleted; three same-meaning pairs merged (syn-fixups2.mjs). New alias kind translation (bit 256) for other-language names. 23 theme-name leaks from the flips are still to settle.
- Game on format 3, 2026-11-01 (in progress): tools/export-game.mjs writes data/export/wordlist-game-family.json; the Unity project's WordLibrary.cs has a LoadV3 reader (uncommitted there: it maps the theme rating to the builder's theme popularity, per-theme word difficulty to link popularity, recognition to rec, language-specific themes to the wordplay kind, an alias and its root or a synonym group to one Root id, spelling aliases to Other). It loads (2,549 themes, 59,620 words) but LevelBuild cannot yet build level 2 from it: the new ratings are stricter (about 26,000 words at recognition 4-5 against about 2,100 before) so the plan dials need retuning or the easy pool needs more words. No levels were regenerated or committed.
- Word table: shown text with `← entry`, form arrow, synonyms column (drag a word onto another, chips with ✕, lookup box).
- Theme-name leak rule (js/validate.js `nameLeak`), 2026-11-01: an entry leaks when it contains a word of the theme name, except that a single word equal to the thing the theme collects (the last word of the name or of each "A and B" part: `pants` in pants and shorts, `bug` in garden bugs) is fine. Compounds (cotton candy in candy, green onion in onions) still leak: the theme shows the bare word (`show`), or keeps the full name where the full name is always used (cotton candy in sweets and candy) with `nameOkIn`. Nine UK aliases whose leak could not be fixed dropped their US roots too.
- Phase 5, theme splits, 2026-11-01: tools/gen/split-make.mjs lists the 230 themes with 50+ words, 20 agents proposed splits under BRIEF-split.md (tools/gen/split/p-*.txt), tools/gen/split-apply.mjs checks (at least 8 words, at most 70% of the parent, no leaking name, no existing name, parent not complete) and applies. 522 sub-themes were proposed and applied (108 themes left whole); 20 vague or overlapping ones were then dropped (living creatures, kinds of structure, ancient peoples ...). A sub-theme's words keep their parent link and get a link with the same rating. Sub-theme popularity is a judgement, not a calculation: an agent rated all 502 against the parent and siblings after the first pass left nearly all at 3. A parent and its sub-theme hold the same words, so a level builder must never use both in one level.
- Alias-only theme links settled (tools/gen/alias-links-apply.mjs, decisions in tools/gen/aliaslinks): an alias never holds theme links. Of 79 left, 24 moved to the root (13 `show` the alias spelling because the theme depends on it, 7 `use` a form, 4 plain) and 55 redundant ones were dropped; `lupine` (of wolves) became its own entry because it is not the flower.
- UK spellings (tools/gen/spell-uk.mjs, v230): every US-spelled root without a UK form got a `spelling` alias tagged UK (156: color/colour, theater/theatre, analyze/analyse ...), copying its flags, ratings and per-theme `show` (respelled). Only common words and phrases are converted, by fixed rules (-or/-our, -ize/-ise, -er/-re, -og/-ogue, doubled l and about 100 listed words); names are left alone. Where both spellings existed as roots they are merged (jewellery into jewelry, kerb into curb: the root is the US word).
- Duplicate senses in one theme (the 13 same-display pairs, v233): the weaker sense leaves the theme and the stronger stays; nothing is kept twice because only one can be placed. Orphans whose roots were dropped were deleted with their aliases.
- Complete themes: all 49 have a note listing the exact members (tools/gen/complete). Nicknames of a member sit in its synonym group; wrong members (Moon in bears, fuchsia in CMYK inks, Roman wind gods in Greek) were removed. A set with no single agreed membership is not complete (archangels).
- Case check: a name that starts with a digit (76ers, 49ers) counts as capitalised.
- Default dialect (see 3.4): Settings → Library → Default dialect; the word table shows the alias tagged with the dialect and the row's columns (part of speech, type, rating, flags, status) follow the word shown. The other names of a word sit under its row with their own columns and a tick-box; the root is listed there when the row shows a variant. No data moves.
- Theme difficulty is never stored (2026-11-03): the manual `diff` override and the AI theme rating were removed. `themeProfile` works it out from the words; the library shows "serves x to y" (the range in which the theme can fill a 4-word set) and the filter uses the same range; the export no longer writes a theme difficulty (the `difficulty` theme field was dropped; `counts` and `range` remain).
- Alias families and locked themes (2026-11-04): rules in 3.5. Code so far: `themeLocked` (model.js), the Word substitution field in the theme dialog, export theme bit 64, validations `family-twice` and `alias-link-kind`. Not yet: the game-side swap, a family column in the export for aliases beyond the existing root column, and the 25 via-alias compound links (to be linked to the alias itself).
- All words screen: aliases column, alias of, themes; a search scope (word or alias, word, alias, meaning, themes, everything) and a match mode (contains, starts with, exactly); every column resizable (drag a heading edge, double-click fits the text, shift + double-click resets), the themes column takes the space left so the table never scrolls; the word column of the theme table is resizable too. Widths are kept per browser.
- Game export (2026-11-01): tools/export-game.mjs writes data/export/wordlist-game-family.json. The Unity reader for format 3 was written (kept as tools/game/LoadV3.cs.txt; the file in the Unity repo was reverted at the owner's request) and loads 59,620 words, but level generation from the new ratings is not done: the ratings are stricter than the old plan dials. Decision: level generation is set aside; a new generator or on-the-fly generation in the game will be chosen later.

**Not yet done**
- All phases (0-5) are applied. Remaining: a game-side check that a parent theme and its sub-themes are never in one level, and the level generator for format 3 (see Game export above).
- Known limits: the UK spelling rules are finite (practise/practice and licence/license depend on part of speech and are not converted); 1,327 information notes remain for common words typed with a capital letter, most of them correct.
- Third kept-by-name review (v240-v247, 2026-11-02): "iced tea", "lemon tea" and the like were still kept under "teas". All 3,387 entries kept by name were reviewed again under BRIEF-leak4.md (18 agents, tools/gen/leak/k4-*.txt): 1,603 now show their bare name (`iced`, `lemon`, `carrot`), 1,782 stay kept by name, and the full names remain as aliases exempt from the check. Clean-up: 263 same-text entries got meaning labels (tools/gen/apply-labels.mjs, labels-*.txt), 20 duplicate bare entries made by two agents were merged (tools/gen/merge-dups.mjs), synonym groups were repointed at the bare entries (tools/gen/groups-fix.mjs), `common frog` and `common toad` went back to full names (`common` is ambiguous between them).
- Dairy and eggs split (tools/gen/split-dairy.mjs, v247): "dairy and eggs" became "dairy" (id kept as dairy_and_eggs), a new theme "eggs" holds egg, yolk, albumen, quail/duck/ostrich egg (shown as `quail`, `duck`, `ostrich`), eggshell, egg carton, free-range egg, Easter egg, and "egg dishes" moved under it; "dairy products" was merged into "dairy".
- Rule: a theme name must describe its members by itself, outside the tree (2026-11-02). The tree is only for organising. 163 of 2,988 themes were renamed to carry the context their parent used to give (`officer's equipment` -> `police equipment`, `room types` -> `hotel room types`, `titles for women` -> `female royal titles`); tools/gen/BRIEF-rename.md, rename-make.mjs, rename-apply.mjs (checks name clashes and leaks into members). New themes should be named the same way.
- Full names back as entries (tools/gen/show-migrate2.mjs, v249, 2026-11-02): the third kept-by-name review had left about 970 longer names (`road map`, `tartar sauce`) as `form` aliases of a new bare-word root (`road [driving chart]`), which turned the real name into a variant of a theme-local shortening. 966 of them are entries of their own again, shown under the bare text through `show`; 865 bare-word roots that nothing used any more were deleted. Left as they were: `egg sandwich`, `dragon egg` (the root is not in all of their themes), `white of the eye` / `eye white` (two names for one bare word); three leaks were settled by hand (spotted eagle ray left the eagles theme; electric truck keeps its full name in truck types through `nameOkIn`; sports jacket (athletic) left coats and jackets, where sports jacket (blazer) already is). The validator now notes a `form` alias that is a longer name of its root (`alias-fullname`). Rule: a theme-local shortening is `show`, never an alias.
- An alias with no kind bit in the export is kind `synonym`: the old kind (133 aliases) that section 3.1 says to remove. The export has no bit for it, so such aliases read as flags 0 with a non-zero root. They still need migrating into entries of their own or into regional/abbreviation aliases.
- Synonym kind retired (tools/gen/synonym-migrate.mjs, v251, 2026-11-02): the 133 `synonym` aliases are gone. 101 became entries of their own with the root's theme links and a synonym group per theme (mimosa / sensitive plant, Oscar / Academy Awards); 12 were theme-local shortenings of a longer name (`butterflies` for butterfly collecting) and were turned into `show` like the form aliases above (11 unused shortenings deleted); 14 were abbreviations or clippings (PTH, EV, nuke, grad party), where the full name is now the root and the short form an `abbreviation` alias; 5 carry a UK region and became `regional`; the `e-bike` alias of bike was dropped (e-bike is an entry already). The export now has no alias without a kind bit. `synonym` stays in ALIAS_KINDS so old files load, but the entry dialog no longer offers it, the "+ Add alias" button defaults to `regional`, and the AI alias schema allows only regional and spelling.
- Strict synonyms are aliases again (tools/gen/syn2, v252, 2026-11-02): retiring the whole kind in v251 was too coarse. `synonym` now means a **strict** synonym, always the same answer as its root (export bit 512; the game picks which of the two to show by difficulty); near matches stay entries with a synonym group. The 133 were re-checked one by one (decisions.txt, with a reason each): 56 strict synonym aliases, 27 near matches kept as entries, 17 abbreviation, 11 translation (the English name is the root), 11 shown text, 10 regional (8 with the regional word as the alias and the neutral word as the root), 1 dropped. Left for a person: the clipped roots `button` (mushroom) and `open-faced` (sandwich). The entry dialog, "+ Add alias" and the AI alias schema offer `synonym` again, with the strict definition.
- Loose ends of the synonym re-check (tools/gen/syn2/loose-ends.mjs, v253): the clipped root `button` was merged into the existing `button mushroom` (shown as `button` in mushrooms, `white mushroom` its strict synonym alias); `open-faced` became the strict synonym alias `open-faced sandwich` of `open sandwich`.
- Region masks fixed (2026-11-03, library v253 export): masks were `1 << index` into the sorted region list, and JavaScript shifts wrap at 32, so UG, UK, US, VN and ZA (indices 32-36) collided with AR, AU, BR, CA and DE. `regions[]` now lists UK and US first; `regions[i]` is bit i of the low mask (`regions` column / theme field) for i < 30, else bit i-30 of the new high mask (`regionsHi` column / theme field, last field of a theme row before `note`). The file has `regionBits: 30`. Format version stays 3 (additive).
- Export additions for the game (library v255, 2026-11-03, format version still 3, all additive): (1) region masks fixed, see the entry above; (2) `nameWordLinks`: numbers of links (position in the concatenated link list, links[4n..4n+3]) whose shown text is just a word of the theme name or its singular/plural (327 links; `isNameWord` in validate.js; the leak check lets the thing a theme collects through, the game can leave these out); (3) part of speech set for 1,859 more roots by an agent pass (BRIEF-pos2.md, tools/gen/pos/q-*.txt: 871 adjective, 379 verb, 450 other, 159 adverb; bare gerunds and ambiguous noun/verb words left as nouns, so the pass is conservative); aliases other than forms copy their root's; (4) theme `kind` (category, place, property, wordplay, compound; `kindNames` in the file) and `rule` (wordplay and compound only: `hidden:tree`, `rhyme:ake`, `palindrome`, `anagram`, `homophone`, `onomatopoeia`, `double-letters`, `starts:color`, `ends:ia`, `contains:ough`, `compound-end:bag` for "___ bag", `compound-start:snow` for "snow ___", or `other`) as the last two theme fields before `note`; stored in the library as `tkind` and `rule` on the theme (the old `kind` field is stripped on load). Agent-assigned from the name and eight sample members (BRIEF-kind.md, tools/gen/kind/k-*.txt); two chunks were scripted with exception lists, so expect some wrong `place` and `property` labels.
- Recognisability review for names (2026-11-03): `rec` for people, places, organisations, titles and acronyms was set mostly against word frequency, which is weak for names (Tutankhamun is rare in text but nearly every adult has heard of the name, yet Hatshepsut is not). tools/gen/rec-make.mjs lists every name not yet reviewed (`--common` adds ordinary words, `--theme-pop 1,2` limits to themes of that popularity), agents work under BRIEF-rec.md and write only the changes (`<id> <new rec>`), tools/gen/rec-apply.mjs applies them and records every listed id in tools/gen/rec/done.json, so later runs only list new entries. apply-words.mjs prints a reminder when new names have no review, and the generation prompt (js/ai.js) tells the model to rate names by what an adult knows, not by frequency. Ratings the workflow sets, for reference: at generation `rec`, `inRec` (in-theme popularity), part of speech, type, flags, aliases and a theme difficulty (rateThemes) and popularity (the THEMES block of a data module); computed, never stored: link difficulty (the higher of `rec` and in-theme popularity), a theme's median difficulty and counts (themeProfile). Theme popularity has had no second check; reviewers worked to a 10/25/35/20/10 spread.
- Recognisability review of names, first run (library v256, 2026-11-03): 17,145 entries of every type except common were reviewed by six agents under BRIEF-rec.md; 1,266 ratings changed (149 easier, 1,117 harder). The corrections were mostly regional and non-English names, minor places, UK-only things and clubs rated too easy; the easier ones were famous landmarks, institutions and acronyms. The agents were told to pick the harder rating when unsure, which shows in the 88% harder share; it has not been checked against real players.
