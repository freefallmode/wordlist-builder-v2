# Wordplay samples: homophones and letter changes

Drafts for review, not in the library. In each theme the player sees the word in the **Shown** column and has to work out which kind it hides: the base word (in brackets) is the one the kind contains. Ideas come from the pattern types in the Connections titles (homophones of a kind, a kind with a letter changed, a kind plus or minus a letter), not from any puzzle's word lists.

## Homophones (sounds like a member of the kind)

### homophones of numbers
won (one), too (two), for (four), ate (eight)
- Easy, very familiar words. Only about 4 usable words (the numbers with common homophones are one, two, four, eight; "nein" and "sics" are too obscure), so best as a member of a bigger "sounds like a number or letter" theme.

### homophones of animals
| Shown | Sounds like | Note |
|---|---|---|
| dear | deer | |
| bare | bear | |
| hair | hare | |
| mousse | moose | |
| flee | flea | |
| links | lynx | |
| new | gnu | clever, hard |
| muscle | mussel | |

About 8 good words. Rating: easy to medium; "new" and "links" are the purple-style ones.

### homophones of body parts
| Shown | Sounds like |
|---|---|
| knows | nose |
| heal | heel |
| hare | hair |
| tow | toe |
| hart | heart |
| waste | waist |
| soul | sole |
| nee | knee |

Note: "hare" is an animal and "hair" a body part, and each sounds like the other, so they could sit in both themes. That is fine because each theme tests the homophone, not the word, but it needs one of them left out of one theme to avoid a clash.

### homophones of colors
read (red), blew (blue), rows (rose), plumb (plum). Only 4 clean words; weak as a theme on its own.

## Letter changes (change one letter to get a member of the kind)

### colors with the first letter changed
| Shown | Becomes | Note |
|---|---|---|
| bed | red | |
| van | tan | |
| sink | pink | |
| cold | gold | |
| tray | gray | |

Each shown word is a plain everyday word that is also one letter from a color.

### numbers with the first letter changed
fix (six), hen (ten), mine (nine), pour (four), gone (one). Rating: easy-medium; five clean words.

### animals plus a letter (add one letter to get the shown word)
| Shown | Animal inside | Letter added |
|---|---|---|
| beard | bear | d |
| aunt | ant | u |
| then | hen | t |
| brat | rat | b |
| bowl | owl | b |

The player sees "beard" and must find the animal that is one letter shorter. Hard variant: the added letter can be anywhere (aunt), easy variant: only at the front (then, brat, bowl).

### fish minus a letter (remove one letter from the fish to get the shown word)
tout (trout), car (carp), pie (pike), sol (sole). Four usable words. Note "bass" gives a vulgar word: leave it out.

## Library design notes
- All of these fit the existing wordplay model: `tkind: 'wordplay'`, parent `letter_play`, `lang: true`, `nameOkIn` where the shown word contains a theme word. Suggested rules: `homophone:<kind>` and `letter:<kind>:first` / `letter:<kind>:plus` / `letter:<kind>:minus`.
- The shown word is the entry; the base word (deer, red, ant) would live in the entry's note or as a hidden field, so the game can show it as the answer reveal. Today the model has no field for it: either use `gloss`/`note` text or add one.
- Dialect matters for homophones: "aunt" and "bare/bear" are fine, but "hair/hare", "tow/toe" and "hart/heart" differ little across accents; avoid pairs that rhyme only in one accent ("pour/four" and "waste/waist" are fine in UK and US; "cot/caught" is not).
- Suggested next step: pick the 3 or 4 you like (I'd start with homophones of animals, homophones of body parts, numbers with the first letter changed, animals plus a letter), then run the same agent flow as for "ends with" to fill each to 6 to 8 words.
