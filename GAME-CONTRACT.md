# What the game reads from the export

The Word Safari game's account, from its code (2026-11-20, export format v4, library v411). Its slimmer is P, DynLibrary.cs is L and DynGenerator.cs is G. A missing value never throws: it reads as 0 or "" and misbehaves silently. A missing column in `themeFields` does throw.

The export-contract check (`tools/export-contract.mjs`; gate step h on every fresh export, and `npm run check -- <library> --export`) enforces this file: errors for what crashes or silently drops, warnings (baselined in `tools/checks-baseline.json`, section `contract`) for what skews play. DESIGN.md 6 lists its kinds. A change here needs the matching change there.

## Themes (every row is kept, so theme indexes stay valid)

| Field | Game use | Effect of a bad value | Valid |
|---|---|---|---|
| id | `@id` targets in wordplay rules (case-insensitive, first match) | Duplicate or empty: a rule finds the wrong theme or none | Non-empty, unique |
| name | Shown in the review; name tokens for the leak test; passenger matching (name equals word text); kind detection by the ancestor names "names", "famous people", "surnames" | Empty: a blank name is shown. Renaming those three ancestors changes which levels may use people themes | Non-empty, at most 30 characters |
| parent | Ancestors (at most 40), theme closeness, nesting | An index at or past the theme count crashes at load; a cycle corrupts the ancestors | -1 or a valid index, no cycles |
| flags | Unplayable: 1 adult, 32 group. Held to the plan's starting level: 2 sensitive, 128 foreign. 8 lang: dropped if the plan forbids it. 16 complete: rated easier. 64 locked: exact (shows the linked text only). 4 trademark: unread | The bits are hard-coded, so renumbering silently changes behaviour | Fixed bit meanings |
| popularity | A playable theme needs at least 1; fallback when difficulty is below 1 | 0: the theme never plays | 1-5 on every playable theme |
| difficulty | Theme band and pick weight | Below 1 falls back to popularity; above 5 is clamped; a wrong value moves the theme to other levels | 1.0-5.0 |
| kind | Index into kindNames. wordplay and compound make a theme exact and need a rule; place and property get their own kind codes | Out of range: treated as category | 0 to kindNames-1 |
| rule | Wordplay test that no other word on the level fits | Unknown or empty: the theme is silently never used (15 in v411: 13 `other`, 2 `letter`) | palindrome, double-letters, homophone, onomatopoeia, anagram, rhyme:X, contains:X (letters; aeiou means all five), compound-start:X, compound-end:X, starts:X, ends:X (X at least 2 letters or @id), hidden:@id |
| breaks | Theme names go into wordbreaks.bytes | As for entry breaks | As for entry breaks |
| regions, regionsHi, counts, range, identifiability | Unread: pools are recounted and themes aren't filtered by region. identifiability reaches the game only through difficulty | None | Not applicable |

## Entries

| Field | Game use | Effect of a bad value | Valid |
|---|---|---|---|
| text | Balloon text, lower-case key, known-word set, alias forms | Empty: a blank balloon. A duplicate root text: lookup by text keeps the first (splits, compound tests) | Non-empty |
| pos | Same part of speech within a theme (0-3 filter; 4 "other" means no filter) | 8 or more is ignored | 0-4 |
| type | A split half counts as an everyday word only if type is 0 | Non-zero on common words: fewer real splits | 0 means common |
| flags | 1, 2 and 8 (adult, sensitive, vulgar): the entry and its aliases are dropped (sensitive too, despite options). 512 synonym: the first one is the strict-synonym alternative. 16 spelling or 64 regional with a UK region: British text. 16 spelling with a US region: American text. 32, 128 and 256: leak-test forms only. 4 trademark: unread | An alias tagged both UK and US becomes British only; the first matching alias in row order wins | At most one UK and one US display alias per root |
| familiarity | Word band = max(familiarity, typicality, rounded link difficulty); an alias's familiarity raises the band | 0 is treated as 1; above 5 is clamped in the band but not in the weight (skews) | 1-5 |
| regions, regionsHi | Read on aliases only, as the UK/US tag | Root regions are never read, so a regional word stored as a root shows to everyone | Regional words must be aliases, not roots |
| root | 0 for a root; otherwise the 1-based row of its root | Out of range, pointing at an alias, or pointing at a hidden root: the alias is silently dropped; chains aren't followed | A valid row whose target is a root; no chains |
| clash | One member per level | A shared id on unrelated words wrongly keeps them apart | 0 or more |
| linkCount | Link offsets | A wrong value shifts every later entry's links (the packed loader checks the total; JSON doesn't) | Sum equals links/4 |
| breaks | wordbreaks.bytes (adult, sensitive and vulgar entries left out) | For splitting, offsets outside [2, len-2], or leaving a half under a quarter of the word, are ignored. Balloon wrapping uses [3, len-3] on letters-only words of 10 or more letters | Integer offsets inside the word |
| zipf | An everyday split half needs zipf of at least 30 | 0 or missing: no everyday-word splits | zipf x10, 0-74 |

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
| regions | Must contain "UK" and "US", or no variants appear |
| regionBits | Default 30; must be at most 31 |
| kindNames | Must be exactly category, place, property, wordplay, compound |
| posNames, generated | Tools only |
| v, lang, dialect, options, typeNames, themeBits, entryBits | Unread (the bits are hard-coded) |

## Cross-field rules

- **Playable theme:** not a group, not adult, popularity at least 1.
- **Theme size:** a theme needs at least 4 usable words after the band, gap and shape filters. An anagram theme needs 4 in one anagram set; a passenger source needs at least 6.
- **Shown words:** a word shows only if it is a root, not adult, sensitive or vulgar, with at least 1 link to a playable theme.
- **Split words:** 5-12 letters, with one spelling for both dialects. A real split needs both halves of 3 or more letters, both halves existing lower-case roots, zipf of at least 30, type 0, and a link difficulty below 2.5.

## Gaps the game logged (its I25-I27 and E17; Simon decides the fixes)

- No British theme name exists in the export.
- Alias rows carry no links (linkCount 0): the export stopped writing them, closing the old dead-bytes gap. The contract check `contract-alias-links` enforces it.
- The full-JSON reader still assumes the link order.
- The 15 untestable wordplay rules listed above.
- Rule row, from game g24 and library v414: the grammar also has no-vowels (no a, e, i, o, u; y is not a vowel; spaces and hyphens ignored), roman (only i, v, x, l, c, d, m), reversible (the reverse is another word of the export; not a palindrome) and curated (links only, no property test). Any other rule is an error (`contract-rule-unknown`); a reversible member whose reverse is no export word is `contract-reversible-missing` (warning, baseline 0). The 15 untestable rules are gone: 14 themes carry these strings and letters in alphabetical order was deleted.
