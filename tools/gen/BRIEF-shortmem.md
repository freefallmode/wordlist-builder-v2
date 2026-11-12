# Bare short-member review

Each line of `tools/gen/shortmem/list-N.txt` is `stubId <TAB> themeId <TAB> short text <TAB> => full term`.
The stub is a bare entry (e.g. "bald") that is a member of a "kinds of X" theme (eagles). A separate entry
for the full term (e.g. "bald eagle") exists. We plan to replace the stub by linking the full term to the theme
with a short display ("bald"), so the game can show either form.

Decide for each line:
- `C` convert: the full term is the genuine member of the theme and the short word is merely a shortened display
  (bald -> bald eagle, golden -> golden eagle, tiger -> tiger shark).
- `K` keep the stub: the short word is itself how people name the thing (husky, panama, harpy for a bird, bowler)
  and the "full term" is a contrived or different thing, or the short word is a different sense from the full term.
- `X` the pairing is wrong (the full term is not really the same thing as the stub, e.g. "tiger" + "shark" matched
  through an unrelated word, or the full term belongs to a different theme sense).

Write `tools/gen/shortmem/r-N.txt`, one line per input line: `stubId <TAB> C|K|X`. Output every input id exactly once.
Be conservative: when unsure between C and K, choose K. Do not edit any other file.
