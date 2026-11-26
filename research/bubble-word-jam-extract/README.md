# Bubble Word Jam: level data read from the game files

Source: the Android game `com.AppFore.BubbleWordJam` on the Pixel_5_Play emulator, read on 2026-11-26.
The game is a Unity app. Its levels are ScriptableObject assets in Addressables bundles, downloaded from Google Cloud Storage and cached on the device.

## Files

- `levels.json`: all 1,800 levels as this device plays them. For each level:
  - themes, each with its parent theme and words
  - splits (`YEL|LOW`)
  - special bubbles: set words (levels 1-500), or `random_specials` with types and `[min, max]` counts (levels 501+)
  - theme count
  - split-word count
  - an estimate of the starting moves
- `words.tsv`: one row per word (91,008 rows): level, theme, parent_theme, word, split, special.
- `themes.xlsx`: one row per theme (22,752 rows) in original case, for Google Sheets or Excel. Columns: Level, Theme, Parent theme, Words, Split words (count), one count column per special bubble type (Behind chain, Cryptic, Backward, Frozen, Burst, Linked, Key lock, Cracked, Screw lock), Special notes. A bold row per level (theme count, split total, special-bubble totals or random ranges, estimated moves, chain separator) sits above that level's theme rows, which are grouped so they collapse and expand. `themes-averages.xlsx` has four sheets, summaries first:
  1. **Level averages**: themes, split words and each special-bubble type per level (levels with any, mean count where any; levels 501+ use the middle of their random range) for all levels, 1-500, 501-1800 and each block of 100.
  2. **Words per theme**: min, max, mean and median words per theme, counting each theme's whole word set (every theme in a level has exactly 4), plus how many themes have each set size.
  3. **Theme word sets**: each theme name once (case ignored) with its number of different words, the number of levels it appears in, its first level and every word it uses across all levels.
  4. **Themes by level**: the same sheet as `themes.xlsx`.

  `themes.csv` holds the same theme rows without the level rows or grouping. Rebuild both with `python themes_table.py levels.json themes`.
- `theme-leaks.xlsx`: words that contain or give away their own theme name (975 of 91,008; 213 in levels 1-500), one row each with Level, Theme, Word, Kind:
  - `word = theme` (8): hatchets / hatchet
  - `shares a word` (386): bears / polar bear
  - `theme word inside` (581): Berries / Blueberry
  - Sub-themes returning as bubbles are left out.
  - Matching is by letters, so some rows are coincidences (birds of prey / osprey).
  - Rebuild with `python theme_leaks.py levels.json theme-leaks.xlsx`.
- `comparison-with-library.md`: this game against our library (v493 export): theme counts, words per theme, word shape, structure, metadata and overlap. Numbers from `compare_library.mjs`.
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

| Level | Type | First random level (501+) | Levels 1-500 / 501-1800 | Data |
|---|---|---|---|---|
| 3 | Parent themes (a cleared theme returns as a word) | | | `parentCategory` |
| 10 | Split words (chunks) | | | `chunks` |
| 21 | Chain separator | 502 | 58 / 176 | `bubbleSeparatorData.linkedWords` = words behind the chain, `breakThreshold` 3 |
| 31 | Cryptic | 509 | 61 / 168 | `crypticBubbles`: letters with `revealAtMerge` (0 = shown at start) |
| 51 | Backward | 504 | 68 / 188 | `backwardBubbles` |
| 76 | Frozen (played once: intro popup shown) | 503 | 36 / 160 | `frozenBubbles`: `mergesNeeded` before it thaws |
| 81 | Burst (not yet played) | 506 | 29 / 142 | `burstBubbles`: `movesRemaining` |
| 101 | Linked (not yet played) | 508 | 30 / 137 | `linkedBubbles`: word tied to chunk(s) |
| 126 | Key and lock (not yet played) | 504 | 27 / 143 | `keyLockBubbles`: `keyWord` unlocks `lockWord` |
| 151 | Cracked (not yet played) | 505 | 31 / 167 | `crackedBubbles`: a whole word that breaks into two chunks after `breakNum` |
| 161 | Screw lock (not yet played) | 502 | 51 / 168 | `screwLockBubbles`: `screwCount` screws, removed by `screwDriverWords` |

The game's saved state (`LevelVariantPersonalData.dat`) uses the same nine intro-popup names: chain separator, frozen, lock, burst, cryptic, screw, backward, cracked and linked.

**Two ways of placing special bubbles:**

- **Levels 1-500:** special bubbles sit on set words, listed in the level data.
- **Levels 501-1800:** none are placed in the data. Instead the level switches a type on and gives a `[min, max]` count:
  - the switches are `hasCrypticBubbles`, `hasSeperator` and the rest
  - the counts are in `minMaxCrypticBubbles` and the rest
  - the game picks the words when the level loads, so they may differ between plays
- **How common:**
  - 1,098 of levels 501-1800 switch on at least one type, 345 switch on two, and 3 switch on three.
  - In levels 1-500, only about 320 levels have any, and 11 mix two types.
- **In the export:**
  - `levels.json` has `random_specials`: type, then `[min, max]` (`null` for the chain separator).
  - The spreadsheets show the range on the level row (for example `3-4`, or `yes` for the chain).
  - The theme rows are left blank for those types.

**Frozen bubbles can make a level impossible:**

- A frozen word thaws only after its count of merges. It seems to count only merges made while it is on the board.
- If it appears late, too few merges may be left. Level 76 (ANENOME, 10 merges) ended unwinnable without a booster.
- Other levels with 10 or more: 94, 125, 138, 145, 203 (TIGER, 15), 229, 231, 257, 263, 299, 306, 342, 404, 416, 458, 469 and 483.

## Other features, by first level (from play)

The unlock levels for boosters, events and offers aren't in the level files:
- The code names them (`HintUnlockLevel`, `MagnetUnlockLevel`, `StreakUnlockLevel`, `DailyMissionUnlockLevel`, `BattlePassUnlockLevel`, `PiggyBankUnlockLevel`, `TidalTrialsUnlockLevel`, `LavaQuestUnlockLevel` and others).
- Their values come from the game's remote config, which is fetched from the server and stored where adb can't read it.

So this table only has what was seen in play. Details are in `../bubble-word-jam-levels.md`, "New features log".

| Level | Feature |
|---|---|
| 2 | Move limit; Mastery score at the end of a level |
| 3 | Extra Bubbles booster; picture bubbles |
| 4 | Hint booster |
| 5 | Move streak (+1 move per 5 correct merges in a row) |
| 6 | Tap and hold to preview a word |
| 7 | Magnet booster |
| 8 | First HARD level (also 19, 24, 39) |
| 10 | Rewarded-ad X2 coins; "Welcome!" chest |
| 11 | Welcome Pack offer (real money) |
| 15 | Home button on the Well Done screen |
| 25 | First EXPERT level (also 40) |
| 35 | Out-of-moves screen (+5 moves free); low-moves warning |
| 36 | Pre-level screen with free boosters |
| 51 | Shell Streak (beat 5 levels in a row for free boosters) |
| 60 | Seasonal event (acorn icon, 4-day timer) |

Events and features named in the code but not yet seen:
- Daily missions
- Battle Pass
- Piggy Bank
- Tidal Trials
- Lava Quest
- Champion Arena
- Weekly leaderboard
- Starfish Trail (its popup appeared on reaching level 76 by the jump)

## Patterns in theme and split-word counts

**Averages per level:**

| Levels | Themes (mean) | Levels with split words | Split words where any (mean) |
|---|---|---|---|
| All 1-1800 | 12.6 (median 12) | 1,530 | 3.3 (median 3) |
| 1-500 | 13.3 | 367 | 5.1 |
| 501-1800 | 12.4 | 1,163 | 2.8 |

Across all levels, including those with none, the mean is 2.8 split words.

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

## Repeated words and themes

Counted over all 1,800 levels, ignoring case.

**Words:** 21,605 different words.

- 12,381 (57%) appear in more than one theme. No word appears twice in one level, so these are also the words in more than one level.
- 10,251 of those appear under more than one theme name (bow under weapons in one level, under violin in another). The rest come back only because their theme returns.
- 9,224 words appear only once.
- Most levels: bridge 91, bow 79, emerald 75, violin 71, mint 70.
- Most theme names: helmet 47, water 46, mint 40.

**Themes:** 10,857 different theme names fill 22,752 theme slots.

- 4,162 theme names appear in more than one level. 1,123 of them have the same four words every time; 3,039 change their words at least once.
- 6,695 theme names are used once.
- No theme appears twice in one level.
- Most levels: Opera 43, Violin 38, Card Games 34, Pottery, Mint and Gemstones 33.

**Words per theme.** Every theme in a level has exactly 4 words. Counting each theme's whole word set across its levels:

| Themes counted | Themes | Min | Max | Mean | Median |
|---|---|---|---|---|---|
| All themes | 10,857 | 4 | 44 | 5.56 | 4 |
| Themes in more than one level | 4,162 | 4 | 44 | 8.06 | 7 |
| Themes whose words change | 3,039 | 5 | 44 | 9.56 | 8 |

7,818 themes (72%) only ever use the same 4 words. The largest sets are Music (44) and Opera (43).

**Why a returning theme's words change.** Of the 3,039 theme names whose words change:

- 2,133 (70%) draw from one bigger pool: every use shares a word with another use. Farm Animals rotates cow, goat, horse, pig, chicken and sheep. Pools hold 5 to 44 words, mostly 5-8.
- 906 (30%) have a use that shares no word with any other. These are either:
  - an easy and a hard pool with the same meaning: Colors (red, blue... / indigo, saffron... / chartreuse, taupe), Weather (rain, snow... / hailstorm, tornado), Vehicles (car, bus... / hatchback, SUV);
  - or a different meaning under the same name: Music (genres / instruments / harmony, melody, rhythm), Shoes (parts: aglet, heel, sole / types: loafers, sandals), House (furniture / kinds of house), Numbers (four, five / even, odd, prime), Compass (north, south / azimuth, bearing, meridian).
  Telling the two kinds apart would take reading the 906 by hand.

**Same word twice in a level.** Never, ignoring case. A singular and its plural share a level 25 times:

- 21 times across two themes, for example level 151: shrub (Plants) and shrubs (Garden Space).
- 4 times inside one theme, which look like data mistakes: level 1070 Roulette (bet, bets), level 1070 Conifers (cedar, cedars), level 1095 Chimera (centaur, centaurs), level 1259 Soaring (glider, gliders).

## Why early levels have capitals

**Capitalised words by level:**

| Levels | Words capitalised |
|---|---|
| 1-100 | about 60% |
| 101-200 | about 40% |
| 201-300 | none |
| 301-400 | about 13% |
| 401-1800 | none (all lowercase) |

The patterns:

- **Case is mostly set per level.** In the base variant of levels 1-400:
  - 154 levels are fully capitalised
  - 225 are fully lowercase
  - only 21 mix the two
- **The same level often exists in both cases.** 1,190 themes in levels 1-200 are written in different case in different variants, e.g. `Farm Animals` / `farm animals` in level 1.
- **Capitals by variant:**
  - base: 29% of words
  - `ob`: 16%
  - `ocd`: 9%
  - `cd`: 2%
  - `heartbeat`, `heartbeatob`, `early`, `7new` and `c` (which look newer): none
- **Lowercase words inside capitalised themes** look like later edits: `Cow, Horse, goat, pig`, `Uranus, Mars, earth, Neptune`. About a third of them are words that differ between variants.

**Likely explanation (an inference; nothing in the files records how levels were made):**

1. The first few hundred levels were typed by hand with natural capitals.
2. Later levels, and the A/B variants, came from a bulk tool or script, possibly AI-assisted, that wrote lowercase.
3. Words swapped into old capitalised levels during edits were typed lowercase.

The game shows everything in capitals, so the difference is never visible to players.

## Jumping to a level (for testing)

The game has no usable level-select:
- The code includes SRDebugger (a third-party in-game debug panel) and functions such as `DEBUGWinLevel`.
- Three quick taps in any screen corner (the panel's usual way of opening) did nothing in the store build.

What does work is the save file:
- The current level is the int `gameLevel` in `/sdcard/Android/data/com.AppFore.BubbleWordJam/files/IDIPref.dat`.
- That file is plain JSON with no checksum, and the level is counted from 0, so level 76 is stored as 75.
- That folder is readable and writable through adb, with no root needed.

```
bash set_level.sh 76                          # force-stop the game, set the level, relaunch (emulator)
bash set_level.sh 51 2B211JEGR02969           # the same on a phone (adb serial from `adb devices`)
bash set_level.sh - --lives inf --hints 20    # keep the level; unlimited lives for 30 days, 20 hints
bash set_level.sh restore [DEVICE]            # put back that device's save from before the first edit
```

Other options: `--lives N`, `--magnets N` and `--bubbles N` (Extra Bubbles). They set `currentLives`, `totalHint`, `totalMagnet` and `totalBubbleBooster`. `--lives inf` sets `hasInfinityLife` with an `infinityLifeEndTime` in .NET ticks.

A real phone works the same way. Tested 2026-11-26 on a Pixel 6a running Android 17: with USB debugging on, adb could read and write the save folder.

### On the phone, without a computer

`phone/` holds a version that runs on the phone itself:
- `bwj-edit.sh` takes the level number only. It always sets unlimited lives (30 days) and 99 hints, then relaunches the game. The phone's shell has only 32-bit arithmetic, so the script builds the .NET-ticks end time out of two parts.
- `install.sh` adds a `bwj` command to Termux.
- The phone gets adb-level rights through [Shizuku](https://github.com/RikkaApps/Shizuku) and its `rish` shell.

Setup, done once:
1. Install Shizuku and Termux.
2. Copy `bwj-edit.sh`, `install.sh`, and `rish` with `rish_shizuku.dex` (from the Shizuku APK's `assets/`) to `/sdcard/bwj/`.
3. In Termux, run `termux-setup-storage`, then `sh ~/storage/shared/bwj/install.sh`.

Use: `bwj 81`, or the home-screen buttons.
- `install.sh` puts one script per button in `~/.shortcuts`: the first level of each special bubble (21, 31, 51, 76, 81, 101, 126, 151, 161), 502 for the first random specials, and "Level..." to type any number.
- The Google Play build of Termux has the Termux widget built in, so the separate Termux:Widget app isn't needed.

Tested 2026-11-26 on the Pixel 6a: `bwj 81` worked from Termux through Shizuku.

### Level selector app

`selector-app/` is a small Android app ("BWJ Levels", plain Java), an alternative to the Termux buttons:
- **The list:** all 1,800 levels. Each shows its special bubbles and the themes it contains, and the first appearance of each feature is marked NEW.
- **Filters:** all levels, first appearances, or one bubble type.
- **Jump box:** type a level number to go straight to it.
- **Jumping:** tapping a level asks to confirm, then runs `phone/bwj-edit.sh` (copied into the app at build time) through Shizuku. That sets the level, unlimited lives and 99 hints, and relaunches the game.
- **Needs:** Shizuku running, and this app allowed in Shizuku. The app's top line says which step is missing; tap it to fix.

Build and install it from `selector-app/`:
1. Point `local.properties` at the SDK: `sdk.dir=C\:/Simon/Dev/Android/sdk`.
2. Run Gradle 9.4.1 with `assembleDebug`.
3. Install with `adb install -r app/build/outputs/apk/debug/app-debug.apk`.

`make_levels_asset.py` regenerates `app/src/main/assets/levels.tsv` from `levels.json`.

Shizuku has to be running:
- After every phone restart, start it in the Shizuku app with Wireless debugging, or from a computer with `adb shell <app dir>/lib/arm64/libshizuku.so`.
- The first `bwj` asks to allow Termux in Shizuku.

The first run keeps the original save at `/sdcard/bwj/IDIPref.backup.dat`.

How it behaves:
- Each device's first run backs up its whole save (all the `.dat` files) to `save-backup/<DEVICE>/`, which git ignores.
- After an edit, the game may offer its cloud save in a "Load Data" popup. Close it with X to keep the edit; LOAD puts the cloud level back.
- Tested 2026-11-26: the home screen showed LEVEL 76, and the frozen-bubble intro popup appeared before the board.
- The board matched `levels.json` (CHOWDER frozen for 3 merges, SUM|MER, BLIZ|ZARD).
- Force-stopping during a level abandons that level, and the Shell Streak was reset.
- Other save files (coins, lives, events) are untouched.

## Caveats

- **Picture bubbles:** they are not in the level data; only 5 words in all levels carry an `icon`. The game chooses pictures at run time, so the files don't say which words show as pictures.
- **Moves:** `start_moves_est` = 3 × themes + split words + `moveLimit`. This matched the played start moves on most early levels. Shell Streak boosters and other runtime changes can alter the real number.
- **Case:** words are stored in mixed case as authored, so `Farm Animals` sits alongside `france vibes`. The game shows everything in capitals.
- **Updates:** levels are downloaded content, so a game update can change them. This is the cache as of 2026-11-26.
