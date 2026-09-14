# Word-Problem Worksheets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add separate Grade 1 and Grade 2 word-problem choices that each generate 10 illustrated problems across exactly two printable US Letter pages.

**Architecture:** Extend the worksheet registry with an explicit `kind`, while keeping arithmetic generation unchanged. A focused `word-problem-generator.js` produces structured, verifiable stories; the controller selects either the existing arithmetic renderer or a new two-page word renderer. Reusable inline SVG visuals and page-aware CSS keep the feature offline, accessible, and printer-friendly.

**Tech Stack:** Static HTML, CSS, browser JavaScript modules, inline SVG, Node.js built-in test runner, headless Chrome, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-09-14-word-problem-worksheets-design.md`

## Global Constraints

- Add `word-grade-1` and `word-grade-2` as separate landing-page choices.
- Each choice generates exactly 10 problems on exactly two portrait US Letter pages, five per page, with no blank third page.
- Grade 1 contains five addition and five subtraction one-step problems within 20.
- Grade 2 contains exactly eight two-step and two one-step addition/subtraction problems within 100.
- Every quantity, intermediate result, and answer is a positive integer; zero and negative values are forbidden.
- Each problem includes matched black-and-white SVG line art, a “Show your work” area, and an “Answer” line.
- Visuals are decorative and never required to solve the problem.
- The existing **New worksheet** control regenerates stories, numbers, ordering, and matched visuals.
- Existing arithmetic worksheets remain one page and continue to work without changes to their mathematical rules.
- Do not add frameworks, dependencies, servers, accounts, answer keys, or external APIs.

---

### Task 1: Build the structured word-problem generator

**Files:**
- Create: `src/word-problem-generator.js`
- Create: `tests/word-problem-generator.test.js`

**Interfaces:**
- Produces `WORD_PROBLEM_DEFINITIONS`, keyed by `word-grade-1` and `word-grade-2`.
- Produces `WORD_VISUAL_IDS`, a frozen list of supported icon identifiers.
- Produces `generateWordWorksheet(definition, random = Math.random)`, returning 10 objects shaped as `{ id, grade, stepCount, operations, quantities, intermediateResults, answer, text, templateId, visualId }`.

- [ ] **Step 1: Write failing tests for definitions and Grade 1 generation**

Assert exact IDs, maximums, counts, and `kind: "word"`. Generate 100 Grade 1 sheets and assert 10 unique rendered stories, five `+` and five `−` one-step operations, sequential IDs, known visuals, and every quantity/result in `1..20`.

- [ ] **Step 2: Write failing tests for Grade 2 generation**

Generate 100 Grade 2 sheets and assert exactly eight `stepCount === 2`, two `stepCount === 1`, at least one addition and one subtraction operation, unique text/arithmetic signatures, known visuals, and every quantity/intermediate/final answer in `1..100`. Recompute each stored operation in order and require it to equal the stored intermediate or final result.

- [ ] **Step 3: Run generator tests and verify RED**

Run: `node --test tests/word-problem-generator.test.js`

Expected: FAIL because the module does not exist.

- [ ] **Step 4: Implement definitions, curated templates, and constrained number builders**

Create frozen definitions with exact counts. Provide at least six Grade 1 templates per operation, at least two Grade 2 templates for each two-step pattern (`++`, `--`, `+-`, `-+`), and at least four Grade 2 one-step templates. Each template contains an ID, visual ID, arithmetic pattern, and a text renderer using child-friendly curated names, objects, and settings.

Implement number builders that construct valid values by design:

```js
function buildAdd(maximum, random) {
  const left = randomInteger(1, maximum - 1, random);
  const right = randomInteger(1, maximum - left, random);
  return operation(left, "+", right);
}

function buildSubtract(maximum, random) {
  const left = randomInteger(2, maximum, random);
  const right = randomInteger(1, left - 1, random);
  return operation(left, "−", right);
}
```

For two-step patterns, select each subsequent operand from the range that keeps its intermediate result within `1..maximum`. Store operations in story order and expose all input quantities and intermediate results.

- [ ] **Step 5: Implement selection, uniqueness, fallback, and shuffling**

Select exactly five Grade 1 templates from each operation group. Select exactly eight two-step and two one-step Grade 2 templates. Reject duplicate rendered text or arithmetic signatures, retry with a bounded attempt count, then use deterministic valid candidates if collisions persist. Shuffle the finished set and assign IDs after shuffling.

- [ ] **Step 6: Run generator tests and verify GREEN**

Run: `node --test tests/word-problem-generator.test.js`

Expected: all new tests pass.

- [ ] **Step 7: Commit the generator**

```bash
git add src/word-problem-generator.js tests/word-problem-generator.test.js
git commit -m "feat: generate grade word problems"
```

### Task 2: Add worksheet definitions, cards, and two-page rendering

**Files:**
- Modify: `src/worksheet-generator.js`
- Modify: `src/app.js`
- Modify: `index.html`
- Create: `src/word-problem-renderer.js`
- Create: `src/word-visuals.js`
- Modify: `tests/app-structure.test.js`
- Create: `tests/word-problem-renderer.test.js`

**Interfaces:**
- `WORKSHEET_DEFINITIONS` contains all five choices and every definition exposes `kind`.
- `createWordProblemPages(problems, definition)` returns a `DocumentFragment` containing two `.worksheet-paper.word-page` articles with five list items each.
- `createWordVisual(visualId)` returns an `SVGElement` with class `word-visual`, `aria-hidden="true"`, and a supported line-art drawing.
- `renderActiveWorksheet(definition)` replaces the contents of `#printable-pages` with either one arithmetic page or two word pages.

- [ ] **Step 1: Write failing registry and landing-page tests**

Extend structure tests to require both new `data-worksheet-id` values, Grade 1/Grade 2 word-problem copy, `id="printable-pages"`, and module imports for the word generator and renderer. Update arithmetic generator tests to filter definitions by `kind === "arithmetic"` and require all existing definitions to declare that kind.

- [ ] **Step 2: Write failing renderer tests**

Use a minimal DOM-free serializer contract exported from the renderer, `buildWordPageModel(problems, definition)`, and assert it returns two page models with problem IDs `1..5` and `6..10`, exact page labels, five work areas, five answer lines, and known visual IDs. Keep actual DOM creation in `createWordProblemPages` and cover its hooks through structure assertions.

- [ ] **Step 3: Run the complete suite and verify RED**

Run: `npm test`

Expected: FAIL for missing definitions, cards, modules, and renderer.

- [ ] **Step 4: Add worksheet registry entries and landing cards**

Add `kind: "arithmetic"` to the existing definitions. Merge the exported word definitions into `WORKSHEET_DEFINITIONS`. Add two cards after within-1,000 with concise examples, labels `Grade 1 · 10 problems · 2 pages` and `Grade 2 · 10 problems · 2 pages`, and descriptions of their one-step/two-step levels.

- [ ] **Step 5: Add reusable line-art visuals**

Implement `createWordVisual` with `document.createElementNS`. Support at least `apple`, `book`, `crayon`, `ball`, `flower`, `paw`, `kite`, `star`, `backpack`, and `blocks`. Each 64-by-64 viewBox icon uses `fill="none"`, `stroke="currentColor"`, rounded strokes, and controlled SVG elements only.

- [ ] **Step 6: Build the two-page model and DOM renderer**

Split problems with `slice(0, 5)` and `slice(5, 10)`. Build each page with shared Koko Math header/footer markup, grade title, `Page N of 2`, ordered problem list, real story text, decorative SVG, work area, and answer line. Preserve list numbering with each problem’s assigned ID.

- [ ] **Step 7: Refactor the printable container and controller**

Wrap printable output in `#printable-pages`. Convert the existing arithmetic article into a reusable template or DOM builder. Route card selection, direct query parameters, before-print initialization, and **New worksheet** through `renderActiveWorksheet`. Word definitions call `generateWordWorksheet`; arithmetic definitions call `generateWorksheet`. Keep landing/back/focus behavior unchanged.

- [ ] **Step 8: Run the complete suite and verify GREEN**

Run: `npm test`

Expected: all generator, renderer, structure, and existing regression tests pass.

- [ ] **Step 9: Commit the application flow**

```bash
git add index.html src/app.js src/worksheet-generator.js src/word-problem-renderer.js src/word-visuals.js tests/app-structure.test.js tests/worksheet-generator.test.js tests/word-problem-renderer.test.js
git commit -m "feat: render illustrated word worksheets"
```

### Task 3: Add exact two-page screen and print styling

**Files:**
- Modify: `styles.css`
- Modify: `tests/print-styles.test.js`

**Interfaces:**
- `.printable-pages` stacks preview pages on screen.
- `.word-page`, `.word-problem-list`, `.word-problem`, `.word-visual`, `.work-area`, and `.word-answer` control the two-page layout.
- Print rules produce one page for `.arithmetic-page` and exactly two sheets for two `.word-page` elements.

- [ ] **Step 1: Write failing style assertions**

Require `.word-problem-list` to define five equal rows, `.word-problem` to use `break-inside: avoid`, `.word-page` to use fixed Letter dimensions, and print rules to use `break-after: page` only between word pages with `:last-child { break-after: auto; }`. Retain every existing one-page print assertion.

- [ ] **Step 2: Run style tests and verify RED**

Run: `node --test tests/print-styles.test.js`

Expected: FAIL because word-page styles do not exist.

- [ ] **Step 3: Implement preview and print CSS**

Give every paper page `width: 8.5in; height: 11in; overflow: hidden`. Stack pages with a screen-only gap. Fit five word blocks into a fixed-height grid, with a compact story row and ruled work area. On print, reset all gaps/margins/shadows, apply a page break after the first word page only, and avoid `height: 11in` on the outer multi-page containers so they cannot create a blank page.

- [ ] **Step 4: Run all tests and verify GREEN**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 5: Commit styling**

```bash
git add styles.css tests/print-styles.test.js
git commit -m "feat: style two-page word worksheets"
```

### Task 4: Verify browser behavior, PDFs, and deployment

**Files:**
- Modify: `README.md`
- Verify: all implementation and test files

- [ ] **Step 1: Update README**

Document all five worksheet choices, the two word-problem levels, the 10-problem/two-page format, line-art visuals, and refresh behavior.

- [ ] **Step 2: Run final static verification**

Run `npm test`, `git diff --check`, and `git status --short`. Require zero test failures and only intentional README changes before the final commit.

- [ ] **Step 3: Verify local desktop and mobile behavior**

Serve with `python3 -m http.server 8000`. In the browser, check the landing page at desktop and 390-by-844 mobile sizes, open both word worksheet cards, confirm two preview pages with five problems each, and press **New worksheet** to confirm story text changes while counts remain stable.

- [ ] **Step 4: Verify local PDFs**

Print `?worksheet=word-grade-1` and `?worksheet=word-grade-2` to separate PDFs. Require exactly two page objects in each. Render all four pages to images and visually inspect for complete text, matched icons, visible work/answer areas, five problems per page, and no clipping. Regression-print `within-20`, `within-100`, and `within-1000` and require exactly one page each.

- [ ] **Step 5: Commit documentation and final fixes**

```bash
git add README.md
git commit -m "docs: describe word problem worksheets"
```

- [ ] **Step 6: Push and verify GitHub Pages**

Push `main`, poll the Pages build until it reports the exact local commit as `built`, then verify both cards and refresh behavior on the live site.

- [ ] **Step 7: Verify live PDFs and clean repository**

Print both live word worksheet URLs and require exactly two pages each with no blank third page. Render and inspect them. Confirm `HEAD`, `origin/main`, and the Pages build commit match, all tests pass, and `git status --short` is empty.
