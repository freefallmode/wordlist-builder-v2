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

The `synonym` kind is **removed**. An alias never has its own theme links; it appears in every theme its root is in. `swede` and `rutabaga` become two separate entries (or a `regional` pair, since `swede` is the UK word).

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

## 4. Splitting themes

Many themes can yield new themes of 4 or more words, especially once forms are queryable (`weather`: 58 nouns and 8 adjectives could give a `weather conditions` theme of adjectives and a `rough weather` theme of storms). Rules:
- A split theme should have at least 8 distinct words and a name that does not leak its words.
- **Complete themes** (134 closed sets, whose note lists the exact members) are only split into pieces that are themselves exact sets.
- A word may sit in a parent and a child, but the level generator must not use the parent and its split-off children together. Check how the game handles sibling overlap before adding many splits.
- Splits are proposed by agents, names approved by a person.

## 5. Ratings

Unchanged in meaning (`rec`: how well known the word is; theme link `pop`: how typical it is of the theme), applied as in the table in 3.1. A regional variant's `rec` is judged for the audience of its region.

## 6. Export (format version 3)

- Aliases keep the root pointer, with kind bits for spelling, form, regional, abbreviation and translation (16, 32, 64, 128, 256).
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

**Not yet done**
- Phase 1 (tag spelling aliases US/UK; done 2026-11-01: only the dialect pairs need a tag, the other untagged spellings are variants and need none), phase 2 (regional words, root flips), phase 3 (the remaining ~1,500 synonym aliases into groups or entries; the 643 alias-only theme links), phase 4 (families; done 2026-11-01: the earlier synonym and regional passes left only 92 form aliases and three in-theme pairs that were one answer in two forms, which are now form aliases; no further family work is needed until generated forms are wanted), phase 5 (theme splits).
- The default-dialect setting in the web app.
- Checking that the game can use a parent theme and its split-off child together, and updating the game to export format 3.
