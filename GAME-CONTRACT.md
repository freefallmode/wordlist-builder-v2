# What the game reads from the export

The Word Safari game's account, from its code (2026-11-20, export format v4, library v411). Its slimmer is P, DynLibrary.cs is L and DynGenerator.cs is G. A missing value never throws: it reads as 0 or "" and misbehaves silently. A missing column in `themeFields` does throw.

The export-contract check (`tools/export-contract.mjs`; gate step h on every fresh export, and `npm run check -- <library> --export`) enforces this file: errors for what crashes or silently drops, warnings (baselined in `tools/checks-baseline.json`, section `contract`) for what skews play. DESIGN.md 6 lists its kinds. A change here needs the matching change there.

## Themes (every row is kept, so theme indexes stay valid)

| Field | Game use | Effect of a bad value | Valid |
|---|---|---|---|
| id | `@id` targets in wordplay rules (case-insensitive, first match) | Duplicate or empty: a rule finds the wrong theme or none | Non-empty, unique |
| name | Shown in the review; name tokens for the leak test; passenger matching (name equals word text); people detection (g29): a theme in the "names" branch but not under "surnames" is first names; one in the "famous people" branch, or whose name has a person word (directors, composers, kings...) and 70% of its words capitalised or of type person, is people; both are held to level 41. Surnames play as category | Empty: a blank name is shown. Renaming "names", "famous people" or "surnames" changes which levels may use people themes | Non-empty, at most 30 characters |
| parent | Ancestors (at most 40), theme closeness, nesting | An index at or past the theme count crashes at load; a cycle corrupts the ancestors | -1 or a valid index, no cycles |
| flags | Unplayable: 1 adult, 32 group. Held to the plan's starting level: 2 sensitive, 128 foreign. Bit 2 is no longer written since library v519 (2026-11-27): the game reads the theme's firstLevel (generator g28). 8 lang: dropped if the plan forbids it. 16 complete: rated easier. 64 locked: exact (shows the linked text only). 4 trademark: unread. 256 offensive (library 2026-11-22): written only when the export includes offensive themes, which the default (family) export does not; the game does not read it yet | The bits are hard-coded, so renumbering silently changes behaviour | Fixed bit meanings |
| popularity | A playable theme needs at least 1; fallback when difficulty is below 1 | 0: the theme never plays | 1-5 on every playable theme |
| difficulty | Theme band and pick weight | Below 1 falls back to popularity; above 5 is clamped; a wrong value moves the theme to other levels | 1.0-5.0 |
| kind | Index into kindNames; the generator matches the kind by its name, and the game itself never reads it. wordplay and compound make a theme exact and need a rule. The kind sets the earliest level (g29, all three plans): category 1, place 21, property 31, people and first names 41, wordplay and compound 51, at most 1 wordplay theme per level. Otherwise place and property play exactly like category. people and name (from library v523) set h and n directly: every people theme and every names-folder theme, surnames included, carries one of them (checks `kind-people`, `kind-name`) | Out of range, or a name the generator does not know: plays as category, no error | 0 to kindNames-1 |
| rule | Wordplay test that no other word on the level fits | Unknown or empty: the theme is silently never used (15 in v411: 13 `other`, 2 `letter`) | palindrome, double-letters, homophone, onomatopoeia, anagram, rhyme:X, contains:X (plain letters only; aeiou means all five; a description such as silent-b cannot be tested: use curated), compound-start:X, compound-end:X, starts:X, ends:X (X at least 2 letters or @id), hidden:@id |
| breaks | Theme names go into wordbreaks.bytes | As for entry breaks | As for entry breaks |
| regions, regionsHi, counts, range, identifiability | Unread: pools are recounted and themes aren't filtered by region. identifiability reaches the game only through difficulty | None | Not applicable |
| firstLevel | New (library 2026-11-27), after breaks; unread by the game until it adopts it. The first level per game mode [easy, medium, hard] at which the theme may appear | None yet | null (no limit), or 3 values each null or a whole number of 1 or more; null on group rows |
| mustLevels | New (library 2026-11-27), after firstLevel; unread by the game until it adopts it. The levels per mode in which the game must show the theme | None yet | null, or 3 sorted lists of whole numbers of 1 or more, none below that mode's firstLevel, only on playable themes |

## Entries

| Field | Game use | Effect of a bad value | Valid |
|---|---|---|---|
| text | Balloon text, lower-case key, known-word set, alias forms | Empty: a blank balloon. A duplicate root text: lookup by text keeps the first (splits, compound tests) | Non-empty |
| pos | Same part of speech within a theme (0-3 filter; 4 "other" means no filter) | 8 or more is ignored | 0-4 |
| type | A split half counts as an everyday word only if type is 0 | Non-zero on common words: fewer real splits | 0 means common |
| flags | 1 and 8 (adult, offensive; 8 was called vulgar until library 2026-11-22, same bit, and the export's `entryBits` names it `offensive`): the entry and its aliases are dropped. The default (family) export leaves offensive entries out already. 2 sensitive: from game g25 (e1eb544) the entry and its aliases are held to the plan's sensitive start level (31 in every plan); since library v519 the bit is no longer written: the game reads the entry column firstLevel (an alias carries its root's; generator g28); below it they are not picked, and a theme plays there only with 4 other usable words (until g24 they were dropped). 512 synonym: the first one is the strict-synonym alternative. 16 spelling or 64 regional with a UK region: British text. 16 spelling with a US region: American text. 32, 128 and 256: leak-test forms only. 4 trademark: unread | An alias tagged both UK and US becomes British only; the first matching alias in row order wins | At most one UK and one US display alias per root |
| familiarity | Word band = max(familiarity, typicality, rounded link difficulty); an alias's familiarity raises the band | 0 is treated as 1; above 5 is clamped in the band but not in the weight (skews) | 1-5 |
| regions, regionsHi | On an alias, as the UK/US tag. On a root (from g24, DynLibrary.Build, DynWord.RegionRaise), they raise the word's band for every player, capped at 5: untagged +0; UK-only or US-only with no other-dialect variant +1; both UK and US, or with a variant for the other dialect +0; only other regions (AU, IE ...) +2. The word is never hidden | A regional word stored as a root that has a same-sense equivalent plays harder than it should, and shows its regional text to everyone | A regional word with a same-sense equivalent is an alias of it; one with no equivalent stays a root with its regions |
| root | 0 for a root; otherwise the 1-based row of its root | Out of range, pointing at an alias, or pointing at a hidden root: the alias is silently dropped; chains aren't followed | A valid row whose target is a root; no chains |
| clash | One member per level | A shared id on unrelated words wrongly keeps them apart | 0 or more |
| linkCount | Link offsets | A wrong value shifts every later entry's links (the packed loader checks the total; JSON doesn't) | Sum equals links/4 |
| breaks | wordbreaks.bytes (adult and offensive entries left out; sensitive ones included from g25) | For splitting, offsets outside [2, len-2], or leaving a half under a quarter of the word, are ignored. Balloon wrapping uses [3, len-3] on letters-only words of 10 or more letters | Integer offsets inside the word |
| zipf | Not written since library v520 (2026-11-27): generator g29 has no zipf test in the split rule and does not read the column (g28 and earlier needed it: an everyday split half needed zipf of at least 30) | Missing: expected from v520 | Not applicable |
| firstLevel | New (library 2026-11-27), the last entry column; unread by the game until it adopts it. The word's first level per game mode [easy, medium, hard]; an alias carries its root's | None yet | null, or 3 values each null or a whole number of 1 or more |

## Links (the full-JSON reader assumes stride 4 in this order; the slimmer reads linkFields by name)

| Field | Game use | Effect of a bad value | Valid |
|---|---|---|---|
| theme | Membership | Out of range or an unplayable theme: the link is dropped | A valid index |
| difficulty | Band, weight | Below 1 becomes 3; clamped to 1-5 | 1.0-5.0 |
| typicality | Band | Clamped to 0-5; 0 has no effect | 1-5 |
| shown | 0 for none; otherwise index+1 into `shown` | Out of range: no short text. Equal to the entry text ignoring case: a case fix only | 0 to the shown count. Locked, wordplay and compound themes show exactly this |

## Top level

| Field | Game use and requirement |
|---|---|
| shown | [text, pos, breaks]: text and pos are used; an empty text shows a blank balloon |
| shownUK | [link number, shown index+1]: the British short text. Ignored if the link has no shown text or the index is bad |
| nameWordLinks | Links never picked (the shown text is a word of the theme name) |
| nameThemeLinks | [link, source theme]: passenger pairs. If any pair exists, the name-matching fallback is off. A pair is dropped when its source is unplayable or has fewer than 6 words, the name differs from the word text, the link has a short text, the word has a UK/US variant, the themes are nested, or the word is also in the source |
| lib.version | Level code and save-history fit. Must change whenever the contents change, or saved histories resume with shifted indexes. A missing `lib` object throws |
| lib.unsaved | Optional, additive (2026-11-24): `true` when a browser export was made from unsaved edits, so `lib.version` is the last saved one. Not a pinnable export; ignore it otherwise |
| regions | Must contain "UK" and "US", or no variants appear |
| regionBits | Default 30; must be at most 31 |
| kindNames | category, place, property, wordplay, compound, people, name (people and name from library v523; g30 maps people to h and name to n, and keeps the folder and share tests as a fallback), matched by name (g29). A new name may be added without a generator release (it plays as category until the generator knows it); renaming one of these five changes behaviour |
| posNames, generated | Tools only |
| v, lang, dialect, options, typeNames, themeBits, entryBits | Unread (the bits are hard-coded) |

## Cross-field rules

- **Playable theme:** not a group, not adult, popularity at least 1.
- **Theme size:** a theme needs at least 4 usable words after the band, gap and shape filters. An anagram theme needs 4 in one anagram set; a passenger source needs at least 6.
- **Shown words:** a word shows only if it is a root, not adult or offensive, with at least 1 link to a playable theme; a sensitive one only from the sensitive start level (g25).
- **Split words:** 5-12 letters, with one spelling for both dialects. A real split needs both halves of 3 or more letters, both halves existing lower-case roots, type 0 (no zipf test since g29, library v520), and a link difficulty below 2.5.

## Gaps the game logged (its I25-I27 and E17; Simon decides the fixes)

- No British theme name exists in the export.
- Alias rows carry no links (linkCount 0): the export stopped writing them, closing the old dead-bytes gap. The contract check `contract-alias-links` enforces it.
- The full-JSON reader still assumes the link order.
- The 15 untestable wordplay rules listed above.
- Rule row, from game g24 and library v414: the grammar also has no-vowels (no a, e, i, o, u; y is not a vowel; spaces and hyphens ignored), roman (only i, v, x, l, c, d, m), reversible (the reverse is another word of the export; not a palindrome) and curated (links only, no property test). Any other rule is an error (`contract-rule-unknown`); a reversible member whose reverse is no export word is `contract-reversible-missing` (warning, baseline 0). The 15 untestable rules are gone: 14 themes carry these strings and letters in alphabetical order was deleted.
