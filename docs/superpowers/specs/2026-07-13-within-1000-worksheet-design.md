# Koko Math — Addition and Subtraction Within 1,000

## Goal

Add a third printable Koko Math worksheet set for Grade 2 mixed addition and subtraction within 1,000. It must generate 20 vertical problems and print on exactly one portrait US Letter page without a trailing blank page.

## Landing page

Add a third active worksheet card after the within-100 card. Its content is:

- Label: “Grade 2 · 20 problems”
- Title: “Addition & subtraction within 1,000”
- Description: “Three-digit practice with room for carrying and borrowing.”
- Example equations that use positive values and results no greater than 1,000

Selecting the card immediately generates the worksheet through the existing preview flow. The card uses the established Koko Math visual system and remains usable on phone and desktop layouts.

## Worksheet rules

The new worksheet definition has the identifier `within-1000` and these exact constraints:

- `maximum`: 1,000
- `problemCount`: 20
- `perOperation`: 10
- 10 addition problems and 10 subtraction problems, shuffled together
- Every operand and answer is a positive whole number
- Zero never appears as an operand or answer
- Addition answers are no greater than 1,000
- Subtraction minuends are no greater than 1,000 and answers are always positive
- No equation is duplicated within a sheet

The valid random pool naturally emphasizes three-digit practice while still allowing smaller positive values. The generator does not force every equation to require carrying or borrowing and does not force a fixed digit-count distribution.

## Preview and printing

The preview title reads “Mixed practice · within 1,000” above “Addition & Subtraction.” Problems use the existing vertical format, including carrying space above the top number and an answer rule below the second number.

The worksheet reuses the spacious 20-problem layout: four columns by five rows on one portrait US Letter page. Printing hides all site controls and decoration. A rendered print-to-PDF check must confirm exactly one page with no second blank page.

## Architecture

Extend the existing data-driven implementation rather than adding a separate generator or view:

- Add `within-1000` to `WORKSHEET_DEFINITIONS` in `src/worksheet-generator.js`.
- Add one matching worksheet card to `index.html`.
- Reuse `problem-grid--20`; no new print-grid class is needed.
- Extend automated structure checks so the new card and copy cannot regress.
- The existing parameterized generator tests automatically apply positivity, bounds, operation balance, arithmetic correctness, sequencing, and uniqueness checks to the new definition.

No dependencies, framework, server, or build step are added.

## Verification

- Run the complete automated test suite and confirm all tests pass.
- Confirm the new card appears after the existing two cards and opens a 20-problem worksheet.
- Confirm repeated generated sheets contain 10 addition and 10 subtraction equations; all operands and answers are between 1 and 1,000; and subtraction never produces zero or a negative result.
- Check the landing page at desktop and phone widths.
- Print the new live worksheet to PDF and confirm the PDF contains exactly one US Letter page with no clipping or blank second page.

## Publishing

Commit the tested implementation to `main`, push it to `dmarkel/koko-math`, wait for GitHub Pages to publish the commit, and verify the live worksheet at `https://dmarkel.github.io/koko-math/?worksheet=within-1000`.
