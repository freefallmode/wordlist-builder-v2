# Brief: offensive words, full pass (library v431)

You judge entries of an English word library for a family word-sorting game (Word Safari). The game must be able to leave out every word some players object to. Simon (the owner) set the rule on 2026-11-22; it is in `DESIGN-entries.md` section 3.8 and `LIBRARY-RULES.md` section 5, "Offensive words". Read those two sections first (grep for "3.8 Offensive words" and "### Offensive words"; never read the docs or the library whole). Do not edit any file except your output file. Do not run batch scripts.

## The rule

Two tests, applied separately to each entry:

1. **delete**: the entry's meaning (its gloss says which meaning) is crude, vulgar, sexual slang or a slur. Examples deleted already: ass [buttocks], bollocks, bugger, tosser, schmuck, putz, gyatt, lap dance, twerk, fart, spotted dick, WTF, Brainfuck. Mild insults are NOT deleted (idiot, moron, ninny, nincompoop): they are flagged.
2. **flag** (`offensive`): the entry is kept, but some players object to the written word, in any of its meanings. Independent of the adult and sensitive flags (an entry can have all three). It covers:
   - the harmless meaning of a word whose rude meaning comes to mind first: ass [donkey], tit [bird], booby [bird], bitch [female dog], knob [handle], beaver [animal], hooker [rugby], jizz [birding term], faggots [food], cock [rooster];
   - a spelling that is also a slur: negro [Spanish for black], sambo [martial art], choc ice, hun;
   - medical and sexual words: penis, vagina, anus, rectum, condom, nude, gay, homosexual, bisexual;
   - serious topics: heroin, suicide, slave, swastika;
   - religious and occult words: hell, devil, Satan, witch, wizard, cult;
   - mild insults: idiot, moron, ninny, imbecile;
   - words derived from any of these: witchcraft, shitty, bullshit.

## The two-meaning test (important: this keeps ordinary words in the game)

A word with a harmless meaning is flagged only if **many players would think of the offensive meaning first, or would snigger at the word**.
- Flag: ass, tit, booby, bitch, knob, beaver, cock, pussy (willow), dick (as a word), golly (short for golliwog).
- Do NOT flag: cow, spade, slope, ginger, pansy, fairy, tart, god, vegetable, special, gash, slag, bonk, shag [bird], monkey, coconut, cracker, queen, dwarf, tinker, invalid, bang, nip, balls, snatch, red, yellow, apple, milk, fork, ring, egg, box, cream.

Wiktionary lists a word if ANY of its meanings is vulgar or a slur, so most Wiktionary hits are ordinary words that stay unflagged (answer `keep`).

## Phrases, names, hyphens

- A phrase is flagged when the offensive word keeps its offending meaning in it (wicked witch, witch hat, idiot box, bloody oath). A phrase that names something harmless is NOT flagged (witch hazel, devil ray, thorny devil, dust devil, volume knob, water butt, kaffir lime is an exception: it is a slur, flag it). For a harmless phrase from a.tsv answer `allow` (it goes on the allow list).
- Names (type person, place, org, title, proper) and hyphenated texts are flagged only when the whole text is the offensive word: Negro [river], Hell [Michigan town], Wizards [NBA team], Devils [NHL team] yes; Moby Dick, Dick Tracy, Salem witch trials, cock-a-doodle-doo no (answer `allow` if such an entry is in a.tsv).
- Foreign-language phrases where the word means something else (arroz negro: black rice; wali wa nazi: Swahili for coconut rice) are `allow`.

## Slang themes (s1, s2)

Judge each slang, insult, drug, toilet and anime word on its own meaning (the gloss and theme tell you which). Flag swear words that are mild enough to keep (bloody, damn, crap: but crude ones are deleted), mild insults, drug slang, sexual or toilet slang that is not crude; delete crude, vulgar, sexual or slur meanings. Plain, harmless slang is `keep` (bloke, quid, dude, cheerio). Polite swears (gosh, darn, heck) are `keep` unless they are themselves a list word.

## Themes (only the agent given themes.tsv)

A theme gets the flag when its topic is offensive: witchcraft, wizard words and illegal drugs are already decided (flag-theme). Scan every theme name for other offensive topics (drug slang, insults, swear words, occult, sexual topics). A theme name that contains an offensive word must be flagged or renamed. Answer `flag-theme` or `rename: <new name>` (keep names short, lowercase, under 24 characters) or say nothing for themes that stay. Do not flag a theme just because it is adult or sensitive (war, wine, religion stay as they are).

## Output

Write one tab-separated file, path given in your task, one line per entry you judged in your input file (every line of the input gets an answer), columns:

`id <TAB> text <TAB> decision <TAB> reason`

decision is one of: `flag`, `delete`, `allow` (a.tsv only), `keep`, and for themes `flag-theme` or `rename: <new name>` (id = theme id).
Reasons: a few words (which meaning, which rule). After the entries you may add lines `list-add <TAB> <word> <TAB> <reason>` for a word that should be flagged wherever it appears as a whole word and is not on the list (`js/offensive-words.js`; grep it). Be conservative with list-add: never a word that has a common harmless meaning.

When unsure between flag and keep, apply the two-meaning test strictly and prefer keep for everyday words; when unsure between delete and flag, prefer flag. Finish with a short summary in your reply: counts per decision and the ten decisions you were least sure of.
