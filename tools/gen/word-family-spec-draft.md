# Word-family rule: draft for review (I22, 2026-11-19)

Status: ADOPTED by Simon 2026-11-19 with cross-theme kin and the game's amendments; the rule in force is DESIGN-entries.md 3.7. Kept as the record of the draft and the game's review.

## 1. What counts as one word family

Two texts are one family when one is built from the other by an ordinary ending or beginning, or both are built from one root:

- inflections: plural, -s/-es/-ed/-ing, comparative (buck/bucks, knot/knots, blur/blurred)
- derivations: -er/-or/-ist/-ian (vote/voter, therapy/therapist), -ing (gamer/gaming), -ness/-ity/-ion/-ment (extinct/extinction), -ful/-ous/-y/-ic/-al (joy/joyful, murk/murky, fury/furious), -ly, -ism (Dada/Dadaism), -ess (host/hostess)
- pet and short forms: dad/daddy, tum/tummy, gran/granny, pup/puppy

Not a family:
- letters in common only (tea/teach, earl/early, organ/organism, can/canister)
- compounds that contain another word (fish/goldfish, sun/sunflower). The existing Overlap rule covers these: a word and a more specific kind of it are not listed together.

## 2. Three outcomes

| Case | Example | Handling | Effect in the game |
|---|---|---|---|
| **A. Same word, same sense:** a grammatical form | bucks for buck, knots for knot | One entry. The other text is a `form` alias of the root. If a theme needs the other form, it shows it (`show` / `use`). | One answer, never two. |
| **B. Related but different words** | gamer/gaming, vote/voter, yuck/yucky, dad/daddy | Both may be linked in a theme only inside **one synonym group**. Otherwise keep the better one. | Shared `clash` id: never in one level. |
| **C. The form is the point** | no vowels (dry/dryly), starts-with, hidden words; prince/princess in royal titles | Separate answers, no group. | May meet in a level. |

Who decides C:
- **Automatically:** locked themes (`themeLocked`: wordplay, compound and language-specific).
- **By a theme setting:** `familyOk`, for themes whose set is defined by the forms. It is set by hand, never by generation. The game suggests:
  - male/female title themes: royal titles, peerage ranks;
  - grammar themes: tenses, comparatives (big/bigger/biggest), plurals as a theme;
  - anagram themes.
- **Not C (the game, 2026-11-19):** pup/puppy in baby animals and mom/mommy in words for mother are the same answer, so they are B (grouped), or A. Rhyme themes are unaffected, since rhymes aren't one family.

## 3. Across themes (open question for the game)

joy is in emotions and joyful is in happy words. Today nothing relates them, so they can land in one level as members of two groups. The game says this is the worse case. Options:
- (a) A library-wide "kin" relation between entries (stored once), exported into the `clash` column. Same effect as a group, but across themes, and no new export field.
- (b) Ignore it and rely on in-theme groups only.

The draft prefers (a): the check below would suggest pairs, and a person or agent confirms them.

The game's review (`_WS_`, 2026-11-19):
- **(a) is fine.** Clash only keeps two members out of one level (DynGenerator.cs ~1011, ~1085). A level holds 16-24 of ~60k words, so even ~2,000 extra pairs cost little, Easy included. The pin will measure it: all 2,000 levels per mode must still generate.
- **Clash is one int per entry**, so kin and synonym groups merge into one clash group, transitively. Our export already does this: js/export.js:156 joins groups across themes with union-find. The risk is chains that grow large clash groups, which could starve a theme of words. **Add a check: warn when a clash group exceeds 8 members.**
- **Clash means only "keep apart in a level".** Early synonym return uses strict-synonym alias texts, and "no word fits two themes" uses texts and links. So the game doesn't need groups and kin told apart.

## 4. Generation prompt (js/ai.js, Overlap paragraph): proposed text

> Word families. Never list two forms of the same word (bucks and buck, knots and knot): list the one the theme uses. Of words that share a root but are different words (gamer and gaming, vote and voter, yuck and yucky, dad and daddy), list only the one that fits the theme best. A player should never be able to pair two members just because they look alike. In wordplay themes, where the spelling or form is the point, forms of one word may be separate members.

The generation response has no synonym groups (checked: js/ai.js returns words and aliases only). So the prompt keeps one word, and any pairs that do get through are grouped later, by the check below and a person or agent. The alternative is a new response field, `relatedTo`, which the importer would turn into a group. That costs more prompt and code for little gain.

## 5. Library check (js/validate.js): `family-pair`

- **warn:** two separate entries (different alias families) linked in one theme whose texts are one family (section 1). It does not fire when:
  - they share a synonym group in the theme,
  - the theme is locked or `familyOk`,
  - the pair is on an allow list (as caselint-allow).
- **info (if 3a is adopted):** one-family entries in different themes with no kin relation.
- **warn `clash-big`:** an exported clash group (synonym groups and kin joined across themes) with more than 8 members (the game's request). Export v397 has 3,719 clash groups. Two are over 8: kebab (11, including shawarma, gyro and shashlik, which may be wrongly grouped) and ghost (10: wraith, phantom, ... shade).
- **Detection:**
  - suffix stripping as tools/gen/famscan.mjs does, tightened: a stem of 4+ letters, a list of common endings, and a stop list of known false matches;
  - pet and short forms need a small list.
  - Expect false positives; the allow list absorbs them.

## 6. Questions for Simon

1. B: generation keeps one; the library may hold both if grouped. Agreed?
2. Cross-theme kin (3a): worth it now, or later?
3. `familyOk` themes: hand-picked list (royal titles, peerage, tenses ...)?
