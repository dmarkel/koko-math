# Within 1,000 Worksheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add and publish a Grade 2 Koko Math worksheet that generates 20 mixed vertical addition and subtraction problems within 1,000 on one US Letter page.

**Architecture:** Extend the existing data-driven worksheet registry with a `within-1000` definition and add a matching landing-page card. Reuse the current generator, controller, and four-column by five-row print layout so the feature inherits the established positive-number, operation-balance, navigation, and printing behavior.

**Tech Stack:** Static HTML, CSS, browser JavaScript modules, Node.js built-in test runner, headless Chrome, GitHub Pages

## Global Constraints

- The card label is “Grade 2 · 20 problems.”
- The sheet contains exactly 10 addition and 10 subtraction problems.
- Every operand and answer is an integer from 1 through 1,000; zero and negative answers are forbidden.
- The sheet uses vertical arithmetic and contains no answer key.
- The printed worksheet is exactly one portrait US Letter page with no trailing blank page.
- No dependency, framework, server, or build step may be added.

---

### Task 1: Add the within-1,000 worksheet

**Files:**
- Modify: `tests/app-structure.test.js`
- Modify: `tests/worksheet-generator.test.js`
- Modify: `src/worksheet-generator.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: `WORKSHEET_DEFINITIONS` and `generateWorksheet(definition, random)` from `src/worksheet-generator.js`; card selection through `data-worksheet-id` in `src/app.js`
- Produces: `WORKSHEET_DEFINITIONS["within-1000"]` with `{ id, title, shortTitle, rangeLabel, maximum, problemCount, perOperation, gridClass }`; landing card with `data-worksheet-id="within-1000"`

- [ ] **Step 1: Write the failing structure assertions**

Add these assertions beside the existing worksheet-card checks in `tests/app-structure.test.js`:

```js
assert.match(html, /data-worksheet-id="within-1000"/);
assert.match(html, /Addition &amp; subtraction within 1,000/);
assert.match(html, /Grade 2 · 20 problems/);
```

Add a dedicated definition test in `tests/worksheet-generator.test.js`:

```js
test("within-1000 is a Grade 2-sized 20-problem worksheet", () => {
  assert.deepEqual(WORKSHEET_DEFINITIONS["within-1000"], {
    id: "within-1000",
    title: "Addition & Subtraction",
    shortTitle: "Addition & subtraction within 1,000",
    rangeLabel: "Mixed practice · within 1,000",
    maximum: 1000,
    problemCount: 20,
    perOperation: 10,
    gridClass: "problem-grid--20",
  });
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test`

Expected: FAIL because `within-1000` and its landing card do not exist.

- [ ] **Step 3: Add the worksheet definition**

Add this entry to `WORKSHEET_DEFINITIONS` in `src/worksheet-generator.js`:

```js
"within-1000": Object.freeze({
  id: "within-1000",
  title: "Addition & Subtraction",
  shortTitle: "Addition & subtraction within 1,000",
  rangeLabel: "Mixed practice · within 1,000",
  maximum: 1000,
  problemCount: 20,
  perOperation: 10,
  gridClass: "problem-grid--20",
}),
```

- [ ] **Step 4: Add the landing card**

Add this card after the within-100 card in `index.html`:

```html
<button class="worksheet-card" data-worksheet-id="within-1000" type="button">
  <span class="card-icon" aria-hidden="true">
    <span>648 + 275</span>
    <span>932 − 487</span>
  </span>
  <span class="card-content">
    <span class="card-label">Grade 2 · 20 problems</span>
    <strong>Addition &amp; subtraction within 1,000</strong>
    <span>Three-digit practice with room for carrying and borrowing.</span>
  </span>
  <span class="card-action" aria-hidden="true">Make a sheet <b>→</b></span>
</button>
```

The existing base card styling is intentional; no new style is required.

- [ ] **Step 5: Run the complete automated suite and verify GREEN**

Run: `npm test`

Expected: all tests pass. The existing parameterized generator test must include `within-1000` and verify 100 independently generated sheets for exact counts, balance, positive values, bounds, arithmetic, and unique equations.

- [ ] **Step 6: Check the patch**

Run: `git diff --check`

Expected: exit 0 with no output.

### Task 2: Verify presentation, printing, and publishing

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `src/app.js`

**Interfaces:**
- Consumes: `?worksheet=within-1000`, browser print CSS, GitHub Pages deployment from `main`
- Produces: a live within-1,000 worksheet at `https://dmarkel.github.io/koko-math/?worksheet=within-1000`

- [ ] **Step 1: Verify the local browser experience**

Serve the repository locally and inspect the landing page at desktop and 390-pixel phone widths. Confirm the third card appears after the existing cards, its text is readable, and tapping it opens a 20-problem preview labeled “Mixed practice · within 1,000.”

- [ ] **Step 2: Verify the local print PDF**

Print `http://127.0.0.1:8000/?worksheet=within-1000` with headless Chrome to `/private/tmp/koko-math-within-1000.pdf`. Count PDF page objects and require exactly `1`. Render the page to an image and visually confirm all 20 vertical problems are legible and unclipped.

- [ ] **Step 3: Commit the implementation**

```bash
git add index.html src/worksheet-generator.js tests/app-structure.test.js tests/worksheet-generator.test.js docs/superpowers/plans/2026-07-13-within-1000-worksheet.md
git commit -m "feat: add within 1000 worksheet"
```

- [ ] **Step 4: Push and wait for GitHub Pages**

Run: `git push origin main`

Poll the Pages deployment through GitHub until the published build references the new commit.

- [ ] **Step 5: Verify the live page and PDF**

Open `https://dmarkel.github.io/koko-math/` and confirm the Grade 2 card is published. Print `https://dmarkel.github.io/koko-math/?worksheet=within-1000` to PDF and require exactly one rendered US Letter page with no second blank page.
