# Brief: does the theme name stand on its own?

The library feeds a word-sorting game. Each theme has a name that is shown (when the theme is complete, or in editors and reports) WITHOUT its place in the theme tree: the tree is only for visual organisation. So every theme name must describe its members by itself, out of the tree and out of the library. Example: `dairy products` under `creamy foods` is fine only if the name alone says what it is; `basics`, `types`, `famous ones`, `tools` (under cooking), `parts` (under a car), `words`, `terms`, `equipment` are not. `officer's equipment` under police words should be `police equipment`; `kinds` under `bread` should be `breads`.

Your chunk (`tools/gen/rename/list-<n>.txt`, n in your task) lists themes: `id | path in the tree | N words`, then typical words. Decide for each theme:
- **K** the name stands alone: someone who sees only the name and the words understands the category.
- **R** the name needs its parent (or is too vague, ambiguous, or misleading for its words): give a better name that describes the members by itself.

## Rules for a new name
1. Short, lowercase, plural noun phrase like the existing names (`big cats`, `rain words`, `police equipment`); keep wordplay/language themes in their style (`words that start with ...`).
2. Say what the members are, not where they sit: bring the needed word from the parent into the name (`equipment` under police words -> `police equipment`).
3. **The name must not give the members away**: no name word may appear in a member (rule of the library: `tomato things` for tomato soup is a leak; `police equipment` is fine unless a member is `police baton`). If the needed word would leak into members, choose a different word or `K`. A member that is only the name's head noun is fine (`bug` in `garden bugs`).
4. Do not merge or duplicate: the new name must differ from every other theme name (names in your listing and the paths show many; if two themes would end with the same name, make the names tell them apart by what they hold).
5. If the theme name is already clear but a bit generic (`animals`, `colors`) leave it `K`: only rename when a reader would genuinely not know what the category is, or would confuse it with a neighbour. Expect about 10-20 percent R.
6. Do not rename to something broader or narrower than the members: look at the words.
7. Never touch theme ids; only names.

## Output
`tools/gen/rename/r-<n>.txt`, one line per listed theme in order:
```
K <theme id>
R <theme id> | <new name> # reason in 2-8 words
```
Nothing else. Test: `node tools/gen/rename-apply.mjs tools/gen/rename/r-<n>.txt` (a dry run: reports PROBLEM lines, writes nothing). Fix until it prints none. Do not edit anything else; do not commit.

## Report (under 50 words)
File path, counts of K and R, anything unsure.
