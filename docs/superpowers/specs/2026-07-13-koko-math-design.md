# Koko Math — Addition and Subtraction Within 20

## Goal

Create the first worksheet set for Koko Math, a simple website that can grow into a library of printable elementary math practice. The first set generates 50 mixed addition and subtraction problems appropriate for a first grader and prints cleanly on one US Letter sheet.

## Audience and constraints

- The learner is a first grader.
- Every operand and answer is a whole number from 0 through 20.
- Subtraction never produces a negative answer.
- Each generated worksheet contains exactly 50 problems.
- The printable output contains problems only; there is no answer key.
- The worksheet must fit on one portrait US Letter page using a normal browser print dialog and printer.
- The site must work without accounts, a server, or network requests after it loads.

## Experience

### Landing page

The landing page introduces Koko Math as a growing collection of printable practice sheets. It displays worksheet sets as clear cards. The first and only active card is “Addition & subtraction within 20,” labeled for Grade 1 and 50 problems. The structure will support adding more worksheet cards later without changing the generator flow.

Selecting the active card generates a new worksheet immediately and opens its preview. The action should feel direct: there is no settings form for this first set.

### Worksheet preview

The screen preview shows the actual paper in a centered page frame. A compact toolbar above it provides:

- Back to worksheets
- New worksheet
- Print worksheet

The worksheet includes the Koko Math name, the set title, Name and Date lines, and 50 numbered problems arranged in a 5-column by 10-row grid. Problems use a horizontal equation format with a generous answer line, making the full set readable while fitting on one page.

Generating a new worksheet replaces all 50 problems. Printing hides the website navigation, toolbar, background, and page-frame decoration so only the worksheet appears.

## Visual direction

Koko Math should feel cheerful and capable rather than babyish. The visual language borrows from a well-kept primary classroom: blue graph-paper lines, sunny yellow highlights, dark pencil-gray text, and a coral accent. Rounded shapes are reserved for interactive cards and buttons; the printed worksheet remains crisp and economical.

The signature element is a small, friendly “Koko” wordmark built around paired counting dots. It creates a recognizable identity without using a stock mascot or requiring image assets. Screen typography may use system fonts so the site remains fast and offline-safe; the worksheet prioritizes highly legible print typography.

Motion is limited to a short worksheet reveal and button/card feedback. Reduced-motion preferences disable it.

## Architecture

The site is a static HTML, CSS, and JavaScript application suitable for GitHub Pages.

- `index.html` contains the landing and worksheet views with semantic controls.
- `styles.css` contains responsive screen styles and a dedicated `@media print` section with `@page { size: letter portrait; }`.
- `app.js` owns worksheet definitions, random problem generation, rendering, navigation, and printing.

No framework or build step is required. Worksheet definitions are data-driven so later sets can reuse the card and preview flow.

## Problem generation

For each of 50 positions, the generator chooses addition or subtraction while keeping the sheet balanced at 25 of each, then shuffles their order.

- Addition: choose a total from 0–20, then choose the first addend from 0 through that total. The second addend is the remainder. This guarantees the answer is at most 20.
- Subtraction: choose a minuend from 0–20, then choose a subtrahend from 0 through the minuend. This guarantees a non-negative answer.

Duplicate equations are avoided within a sheet where practical. Since the valid problem space is much larger than 50, generation retries duplicates and falls back safely rather than risking an endless loop.

## Responsive and accessible behavior

- The landing page works from small phones through desktop screens.
- The worksheet preview may scale visually on narrow screens, but print dimensions remain fixed.
- All actions use native buttons or links, visible focus states, and clear labels.
- Color contrast is sufficient for controls and content; meaning is not conveyed by color alone.
- Printing uses black text and restrained grayscale-safe details.

## Error handling

The generator has no external dependencies or expected network failures. If an unknown worksheet identifier is requested internally, the app returns to the landing view rather than rendering an empty page. The print action uses the browser’s standard print dialog.

## Verification

- Automated checks cover the generator invariants: exactly 50 problems, 25 of each operation, operands and answers within 0–20, and no negative subtraction answers.
- Browser checks cover landing-to-preview navigation, regeneration, back navigation, and the print action.
- Visual checks cover desktop, mobile, and a rendered US Letter print preview to confirm the worksheet stays on one page and remains readable.

## Publishing

Create a new public GitHub repository at `dmarkel/koko-math`, push the completed `main` branch, and publish it with GitHub Pages.
