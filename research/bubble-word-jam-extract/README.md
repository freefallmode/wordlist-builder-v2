# Bubble Word Jam: level data read from the game files

Source: the Android game `com.AppFore.BubbleWordJam` on the Pixel_5_Play emulator, read on 2026-11-26.
The game is a Unity app. Its levels are ScriptableObject assets in Addressables bundles, downloaded from Google Cloud Storage and cached on the device.

## Files

- `levels.json`: all 1,800 levels as this device plays them. For each level:
  - themes, each with its parent theme and words
  - splits (`YEL|LOW`)
  - special bubbles
  - theme count
  - split-word count
  - an estimate of the starting moves
- `words.tsv`: one row per word (91,008 rows): level, theme, parent_theme, word, split, special.
- `themes.xlsx`: one row per theme (22,752 rows) in original case, for Google Sheets or Excel. Columns: Level, Theme, Parent theme, Words, Split words (count), Special notes. A bold row per level (theme count, split total, estimated moves, chain separator) sits above that level's theme rows, which are grouped so they collapse and expand. `themes.csv` holds the same theme rows without the level rows or grouping. Rebuild both with `python themes_table.py levels.json themes`.
- `export_levels.py`: rebuilds both files from the raw dump (see "How it was made").

Totals: 21,605 distinct words, 10,858 distinct theme names, 5 to 26 themes per level (median 12), and split words in 1,530 levels.

## How it was made

1. `adb pull /sdcard/Android/data/com.AppFore.BubbleWordJam/files/UnityCache/Shared` gives 23 cached bundles: all level groups 0-1799, plus event bundles. The APK's `split_UnityDataAssetPack.apk` holds `levelfallback_0_99`.
2. UnityPy 1.25 reads every MonoBehaviour with a `categories` field into `levels_raw.json` (47 MB; kept in the session scratchpad, not committed). The script is `extract_levels.py` in the scratchpad; this step is described here so it can be redone.
3. `python export_levels.py levels_raw.json .`

## Level numbering and variants

- Asset `Level_N` is game level N+1. For example, `Level_9` is level 10: COLOR, GEMS, MOOD, WEAPON, SAFARI ANIMALS, JOBS, MEAT, CALENDAR, with YEL|LOW, DIA|MOND, SW|ORD, ELE|PHANT and DOC|TOR.
- Many levels also have A/B variants: `_ob`, `_ocd`, `_cd`, `_heartbeat`, `_heartbeatob`, `_early` and `_7new`. Variants exist only up to level 500.
- In 432 of 1,322 variant copies, the words differ from the base level.
- **This device plays `Level_N_ob` where it exists, otherwise `Level_N`.** The evidence:
  - The words match the played record for levels 1-74.
  - The first appearances match what was played: chain lock at 21, cryptic bubbles at 31, backward words at 51.
  - In the base and other variants, cryptic bubbles start only at 121 and backward words at 201.
  - Another player may get different levels below 500.

## Bubble types, by first level (this device's variant)

| Level | Type | Data |
|---|---|---|
| 3 | Parent themes (a cleared theme returns as a word) | `parentCategory` |
| 10 | Split words (chunks) | `chunks` |
| 21 | Chain separator | `bubbleSeparatorData.linkedWords` = words behind the chain, `breakThreshold` 3 |
| 31 | Cryptic | `crypticBubbles`: letters with `revealAtMerge` (0 = shown at start) |
| 51 | Backward | `backwardBubbles` |
| 76 | Frozen (not yet played) | `frozenBubbles`: `mergesNeeded` before it thaws |
| 81 | Burst (not yet played) | `burstBubbles`: `movesRemaining` |
| 101 | Linked (not yet played) | `linkedBubbles`: word tied to chunk(s) |
| 126 | Key and lock (not yet played) | `keyLockBubbles`: `keyWord` unlocks `lockWord` |
| 151 | Cracked (not yet played) | `crackedBubbles`: a whole word that breaks into two chunks after `breakNum` |
| 161 | Screw lock (not yet played) | `screwLockBubbles`: `screwCount` screws, removed by `screwDriverWords` |

The game's saved state (`LevelVariantPersonalData.dat`) uses the same nine intro-popup names: chain separator, frozen, lock, burst, cryptic, screw, backward, cracked and linked.

## Patterns in theme and split-word counts

**Themes per level follow a 5-level cycle from level 301 on.** By the last digit of the level number:

| Ends in | Themes |
|---|---|
| 1, 6 | 10 |
| 2, 7 | 10 |
| 3, 8 | 12 |
| 4, 9 | 14 |
| 5, 0 | 16 |

- **Exceptions from 501 to 1800:** only 9 levels: 546 (26 themes, the most in the game), 603, 607, 608, 638, 901, 1446, 1794 and 1795.
- **Exceptions from 301 to 400:** only level 399.
- **Levels 1-300 are irregular:**
  - Levels 1-4 build up from 5 to 10 themes.
  - Levels 1-100 mostly have 8-12.
  - The count climbs through 101-300; levels 201-300 mostly have 14-16.
- **Levels 401-500** use the same shape but larger: 14, 14, 16, 18, 18-20 (mean 16.1). Eight of the nine levels with 20 or more themes are here.
- **Other variants:** the base and other variants give the same picture below 500.

**Split words per level have no cycle and fall over time.**

- **Range:** from 0 to 13 per level.
  - Levels ending in 0 or 5 average only slightly more.
  - The correlation with the theme count is weak (0.12).
- **Split words per theme:**

  | Levels | Split words per theme |
  |---|---|
  | 1-300 | 0.31 |
  | 301-600 | 0.23 |
  | 601-900 | 0.26 |
  | 901-1200 | 0.19 |
  | 1201-1500 | 0.18 |
  | 1501-1800 | 0.16 |

  From 1101 on, most stretches have at most 3 per level.
- **No split words:**
  - levels 1-9 (split words start at 10)
  - the levels that introduce a new bubble type: 20-22, 33-34 and 51-52
  - many levels in 101-200, where frozen, burst and linked bubbles arrive

**Move slack** (`moveLimit`) is 10 on every level from 201 on, and close to 10 before that.

## Caveats

- **Picture bubbles:** they are not in the level data; only 5 words in all levels carry an `icon`. The game chooses pictures at run time, so the files don't say which words show as pictures.
- **Moves:** `start_moves_est` = 3 × themes + split words + `moveLimit`. This matched the played start moves on most early levels. Shell Streak boosters and other runtime changes can alter the real number.
- **Case:** words are stored in mixed case as authored, so `Farm Animals` sits alongside `france vibes`. The game shows everything in capitals.
- **Updates:** levels are downloaded content, so a game update can change them. This is the cache as of 2026-11-26.
