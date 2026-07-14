# Vertical Expanded Worksheets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Koko Math to positive-number vertical arithmetic and add a 20-problem addition/subtraction worksheet within 100 while fixing the mobile hero overlap.

**Architecture:** Worksheet definitions become data objects passed to one configurable pure generator. The DOM controller selects a definition, renders vertical problem markup, and applies a definition-specific grid class. Responsive CSS keeps the mobile hero copy and character in separate normal-flow blocks, while print CSS provides independent 50-problem and 20-problem Letter layouts.

**Tech Stack:** Semantic HTML5, CSS3, ES modules, Node.js built-in test runner, GitHub Pages

## Global Constraints

- Every operand and answer is a positive whole number; zero never appears.
- Subtraction always produces a positive answer.
- The within-20 sheet has 50 problems, split 25 addition and 25 subtraction.
- The within-100 sheet has 20 problems, split 10 addition and 10 subtraction.
- Both worksheets use vertical arithmetic and fit one portrait US Letter page.
- Mobile hero text and the Koko character must never overlap.

---

### Task 1: Configurable positive-number generator

**Files:**
- Modify: `src/worksheet-generator.js`
- Modify: `tests/worksheet-generator.test.js`

**Interfaces:**
- Produces: `WORKSHEET_DEFINITIONS` keyed by `within-20` and `within-100`
- Produces: `generateWorksheet(definition, random = Math.random): Problem[]`
- Preserves: `Problem = { id, left, operator, right, answer }`

- [ ] **Step 1: Write failing tests for both definitions**

Assert each definition returns its exact total and operation balance across repeated sheets. For every problem assert `left >= 1`, `right >= 1`, `answer >= 1`, every value is at most the definition maximum, arithmetic is correct, subtraction has `left > right`, IDs are sequential, and equations are unique.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: failures because the old generator accepts no definition and still generates zero-valued operands or answers.

- [ ] **Step 3: Implement definition-driven pools**

Define metadata including `id`, `title`, `shortTitle`, `maximum`, `problemCount`, `perOperation`, and `gridClass`. Build addition pools from positive pairs whose sum is no greater than `maximum`; build subtraction pools from `1 <= right < left <= maximum`. Shuffle each pool, take `perOperation`, combine, shuffle, and assign IDs.

- [ ] **Step 4: Run `npm test` and verify GREEN**

- [ ] **Step 5: Commit**

```bash
git add src/worksheet-generator.js tests/worksheet-generator.test.js
git commit -m "feat: add positive worksheet configurations"
```

---

### Task 2: Two-card selection and vertical problem rendering

**Files:**
- Modify: `index.html`
- Modify: `src/app.js`
- Modify: `tests/app-structure.test.js`
- Modify: `styles.css`
- Modify: `tests/print-styles.test.js`

**Interfaces:**
- Consumes: `WORKSHEET_DEFINITIONS` and `generateWorksheet(definition)`
- Produces: two worksheet-card buttons with `data-worksheet-id`
- Produces: vertical problem children `.carry-space`, `.top-number`, `.bottom-row`, `.operator`, `.bottom-number`, `.answer-rule`
- Produces: `.problem-grid--50` and `.problem-grid--20`

- [ ] **Step 1: Write failing markup and style tests**

Assert HTML contains both worksheet IDs and their problem counts. Assert `app.js` reads `data-worksheet-id`, renders the vertical number classes, and updates the printable title. Assert CSS defines a 5×10 grid for `.problem-grid--50` and a 4×5 grid for `.problem-grid--20`.

- [ ] **Step 2: Run `npm test` and verify RED**

Expected: failures because only one card and horizontal `.equation` markup exist.

- [ ] **Step 3: Implement the data-driven cards and controller**

Add the second card. Track `activeDefinition`, resolve card selection through its dataset, set the preview title and paper range text, render vertical arithmetic using safe `textContent`, apply the active grid class, and regenerate the selected type from the toolbar and `beforeprint` handler.

- [ ] **Step 4: Implement vertical screen and print layout**

Right-align both numeric rows, place the operator to the left of the second number, provide carry space above, and put the answer rule below. Size the 50-problem layout compactly and the 20-problem layout generously while retaining one Letter page.

- [ ] **Step 5: Run `npm test` and verify GREEN**

- [ ] **Step 6: Commit**

```bash
git add index.html src/app.js styles.css tests/app-structure.test.js tests/print-styles.test.js
git commit -m "feat: add vertical worksheet library"
```

---

### Task 3: Mobile root-cause fix, visual verification, and deployment

**Files:**
- Modify: `styles.css`
- Modify: `README.md`

**Interfaces:**
- Produces: mobile hero geometry where `.hero-copy` ends before `.hero-character` begins
- Produces: updated public GitHub Pages deployment

- [ ] **Step 1: Reproduce and measure the overlap before changing CSS**

At a 390×844 browser viewport, collect the bounding rectangles for `.hero-copy` and `.hero-character`. Confirm the character begins before the copy ends, matching the supplied mobile screenshot.

- [ ] **Step 2: Add a failing regression assertion**

Add a browser verification that requires `heroCopy.bottom <= heroCharacter.top` at the mobile breakpoint.

- [ ] **Step 3: Fix the root cause**

Remove mobile absolute positioning from `.hero-character img`, let the image participate in normal flow inside its character block, give the character block its own post-copy spacing, and keep decorative elements contained in that block.

- [ ] **Step 4: Verify both worksheet flows in the browser**

At desktop and mobile sizes, select each card and assert the displayed title, exact problem count, operation balance, positive values, and vertical row structure. Confirm regeneration stays on the selected worksheet type and mobile hero rectangles do not overlap.

- [ ] **Step 5: Render and inspect two PDFs**

Use headless Chrome to print each worksheet type. Confirm each PDF contains one `/Type /Page` entry, renders at 612×792 points, contains the exact problem count, and visually shows unclipped vertical equations with carrying space.

- [ ] **Step 6: Update README and run final checks**

Run `npm test`, `git diff --check`, and `git status --short`. Update worksheet rules and counts in `README.md`.

- [ ] **Step 7: Commit, push, and verify Pages**

```bash
git add styles.css README.md
git commit -m "fix: separate mobile Koko from hero copy"
git push origin main
```

Poll GitHub Pages until the build is successful, then verify the public URL with both worksheet cards.
