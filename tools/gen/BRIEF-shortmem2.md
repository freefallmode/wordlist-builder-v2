# Short entries linked to a kinds theme: move the link to the full term

Each line of `tools/gen/shortmem2/list-N.txt`: `entryId <TAB> themeId <TAB> short text <TAB> (n themes) <TAB> => full term`.
The short entry is a real word used in several themes (e.g. `great white`, `lemon`, `vervet`). In this theme it stands for the full term
(`great white shark`, `lemon juice`, `vervet monkey`), which exists as its own entry. Plan: link the full term to the theme shown short
(`show` = the short word) and remove the short entry from THIS theme only (it stays in its other themes).

Decide per line:
- `C` convert: the theme member is really the full term, and the short word is only a shortened display of it
  (`great white` -> `great white shark` in sharks; `Weddell` -> `Weddell seal` in seals and sea lions; `vervet` -> `vervet monkey` in monkeys).
- `K` keep: the short word is itself the member (the thing the theme is about), or the full term is a different thing, a stretched
  collocation, or the theme is not a "kinds of X" theme (a "things that ..." / property theme such as "foods you peel", "white things",
  "words about X") where the short word is a member in its own right (`grapefruit` in foods you peel, `red` in shades of red).
- `X` wrong pairing (full term is a different thing).

Write `tools/gen/shortmem2/r-N.txt`: `entryId <TAB> themeId <TAB> C|K|X`, one line per input line, every input line once. When unsure, K. Edit no other file.
