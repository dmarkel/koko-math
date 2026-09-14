# Koko Math Grade 1 and Grade 2 Word-Problem Worksheets

## Goal

Add two new worksheet choices to Koko Math:

- Grade 1 Word Problems
- Grade 2 Word Problems

Each choice generates its own set of 10 age-appropriate addition and subtraction word problems. The preview displays two worksheet pages, five problems per page, and printing produces exactly two portrait US Letter pages with no extra blank page.

The worksheets contain problems only. They do not include an answer key.

## User experience

The landing-page worksheet library gains two cards after the existing arithmetic cards. Each card identifies its grade, 10-problem count, two-page length, and word-problem level.

Selecting a card opens the existing worksheet preview. For a word-problem worksheet, the preview shows two full paper pages stacked vertically. The toolbar remains shared with the arithmetic worksheets:

- **All worksheets** returns to the library.
- **New worksheet** regenerates the entire two-page set, including new numbers, story combinations, ordering, and matched visuals.
- **Print worksheet** prints only the two worksheet pages.

Direct links work through the existing `?worksheet=` query parameter, using `word-grade-1` and `word-grade-2` identifiers.

## Grade 1 content rules

Each Grade 1 worksheet contains exactly 10 one-step problems:

- Addition and subtraction only
- Five addition and five subtraction problems, shuffled together
- Operands and answers are positive whole numbers
- No operand or answer is zero
- All values and final answers are within 20
- Subtraction never produces zero or a negative answer
- Short sentences, direct vocabulary, and one clearly stated question

Story structures include joining, taking away, finding a missing part, and simple comparison. Subjects come from familiar child-friendly settings such as fruit, crayons, books, toys, pets, stickers, snacks, flowers, and playground games.

## Grade 2 content rules

Each Grade 2 worksheet contains exactly 10 problems within 100:

- Exactly eight two-step problems and two one-step problems
- Addition and subtraction only
- The set includes both addition and subtraction reasoning
- Every quantity, intermediate result, and final answer is a positive whole number no greater than 100
- Zero and negative values never appear as quantities, intermediate results, or answers
- Each two-step story requires both stated operations; its answer cannot be found correctly by ignoring one step
- Sentences remain concise and readable for Grade 2

Two-step structures include add-then-add, subtract-then-subtract, add-then-subtract, and subtract-then-add. Story contexts use familiar school, home, nature, collection, and activity situations. The two one-step problems provide pacing variety without changing the within-100 range.

## Structured generation

Word problems are generated locally in the browser; no API or internet connection is needed.

A dedicated word-problem module owns:

- Grade definitions and required counts
- Curated story templates
- Valid number generation for each operation pattern
- Text interpolation
- Answer and intermediate-value metadata
- Story category and visual identifiers
- Duplicate prevention and final shuffling

Each generated problem exposes enough structured metadata for automated verification, including grade, step count, operations, quantities, intermediate results, answer, story template identifier, and visual identifier. Display text is derived from that structured data so the written story and arithmetic cannot drift apart.

Templates vary names, objects, settings, and phrasing. A single worksheet cannot repeat the same rendered story or exact arithmetic sequence. If random sampling collides repeatedly, deterministic fallback candidates complete the sheet while preserving every constraint.

## Visuals

Every problem includes one small, cute black-and-white line-art visual matched to its story subject, such as an apple, book, crayon, ball, flower, paw print, kite, star, or backpack.

Visuals are code-native, reusable SVG symbols included with the site rather than remote images. They use simple dark outlines, no solid background, and minimal ink. The SVGs are decorative and hidden from screen readers because the story text contains all information needed to solve the problem. Visual choice changes with the story when **New worksheet** is pressed.

The pictures provide personality and context only. They never encode a required quantity, so a child does not need to count tiny objects or interpret the art to solve the problem.

## Two-page worksheet layout

Word problems use a dedicated page renderer rather than the arithmetic problem grid. Each printed page is an independent 8.5 by 11 inch worksheet page with:

- Koko Math header
- Name and Date fields
- Grade-specific “Word Problems” title
- Page label (“Page 1 of 2” or “Page 2 of 2”)
- Five numbered problem blocks
- A matched line-art visual in each block
- Story text
- A labeled “Show your work” area
- An “Answer” line
- Koko Math footer

Problem blocks have fixed page-aware sizing so each page contains exactly five complete problems. A problem never splits across pages. The screen preview stacks the two pages with a visible gap and permits horizontal scrolling on narrow screens, matching the established paper-preview behavior.

Print CSS removes the site header, toolbar, landing page, preview background, shadows, and screen-only gaps. Each word-problem page starts on a new sheet, the second page does not create a trailing third page, and the existing one-page arithmetic worksheets remain unchanged.

## Application architecture

The worksheet registry gains a worksheet `kind` so the controller can choose the correct generator and renderer:

- `kind: "arithmetic"` uses the current vertical arithmetic flow.
- `kind: "word"` uses the new word-problem generator and two-page renderer.

The printable area becomes a container that can hold either the existing arithmetic page or two word-problem pages. Shared page-header and page-footer creation stays centralized to keep print dimensions consistent.

The active worksheet definition remains the single source of truth. Opening a card, loading a direct query URL, printing from the landing page, and pressing **New worksheet** all regenerate or render through that definition. Unknown worksheet identifiers continue to fall back safely to the existing within-20 worksheet.

No framework, dependency, server, account, or external content service is added.

## Accessibility and safety

- Word-problem text is real selectable text, not baked into images.
- Each problem is exposed as a numbered list item.
- Decorative visuals use `aria-hidden="true"` and are not required for comprehension.
- Buttons preserve keyboard focus and existing accessible names.
- Generated content avoids brand names, violence, frightening situations, money ambiguity, sensitive personal details, and stereotypes.
- Names and contexts use a varied, inclusive curated pool.

## Testing and verification

Automated generator tests run repeated worksheets for both grades and verify:

- Exactly 10 problems
- Unique rendered problems within each set
- Grade 1: 10 one-step problems, five addition and five subtraction, all values within 20
- Grade 2: exactly eight two-step and two one-step problems, all quantities and intermediate/final answers within 100
- No zero or negative quantities, intermediates, or answers
- Stored operations reproduce every intermediate and final answer
- Each problem has a known matched visual identifier

DOM and structure tests verify both new library cards, direct-link definitions, the two-page renderer, five problems on each page, page labels, work areas, answer lines, SVG visuals, and refresh integration.

Browser verification covers desktop and 390-pixel mobile layouts, card selection, both preview pages, and repeated refreshes. Print-to-PDF verification is performed for both new worksheet URLs and must show exactly two US Letter pages per worksheet with five complete, readable problems on each page and no blank third page. The three existing arithmetic worksheets are also regression-printed to confirm they remain exactly one page.

## Publishing

After all automated, browser, and PDF checks pass, commit the implementation to `main`, push to `dmarkel/koko-math`, wait for GitHub Pages to publish the exact commit, and repeat key card and PDF checks against `https://dmarkel.github.io/koko-math/`.
