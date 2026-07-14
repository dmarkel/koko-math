# Koko Math — Addition and Subtraction Within 20

## Goal

Create the first two worksheet sets for Koko Math, a simple website that can grow into a library of printable elementary math practice. Both sets generate mixed addition and subtraction problems and print cleanly on one US Letter sheet.

## Audience and constraints

- The learner is a first grader.
- Every operand and answer is a positive whole number; zero never appears as an operand or answer.
- Subtraction always produces a positive answer.
- The within-20 worksheet contains exactly 50 problems.
- The within-100 worksheet contains exactly 20 problems.
- The printable output contains problems only; there is no answer key.
- The worksheet must fit on one portrait US Letter page using a normal browser print dialog and printer.
- The site must work without accounts, a server, or network requests after it loads.

## Experience

### Landing page

The landing page introduces Koko Math as a growing collection of printable practice sheets. A custom anime-style Koko character welcomes the learner beside the introduction. The page displays two active worksheet cards:

- “Addition & subtraction within 20,” labeled Grade 1 and 50 problems.
- “Addition & subtraction within 100,” labeled Grade 1 and 20 problems.

The structure will support adding more worksheet cards later without changing the generator flow.

Selecting either card generates a new worksheet immediately and opens its preview. The action should feel direct: there is no settings form.

### Worksheet preview

The screen preview shows the actual paper in a centered page frame. A compact toolbar above it provides:

- Back to worksheets
- New worksheet
- Print worksheet

The worksheet includes the Koko Math name, the selected set title, Name and Date lines, and numbered problems in a vertical arithmetic format. Each problem right-aligns the first and second numbers, places the operation sign beside the second number, and draws an answer rule underneath so the learner can carry or borrow above the numbers and write the answer below.

The within-20 worksheet uses a compact 5-column by 10-row grid. The within-100 worksheet uses a spacious 4-column by 5-row grid. Both fit on one page.

Generating a new worksheet replaces every problem using the selected set's rules. Printing hides the website navigation, toolbar, background, and page-frame decoration so only the worksheet appears.

## Visual direction

Koko Math should feel cute, cheerful, and capable rather than babyish. The visual language borrows from the reference child's lemon-patterned dress and a well-kept primary classroom: soft sky blue, lemon yellow, leafy green, dark pencil-gray text, and a warm coral accent. Rounded shapes, sticker-like details, tiny stars, and gentle scallops can appear on the landing experience; the printed worksheet remains crisp and economical.

The signature element is an original anime-style Koko character inspired by the girl in the middle of the supplied family photo. The illustration preserves recognizable high-level traits—her short straight brown bob, warm brown eyes, gentle expression, and yellow lemon-print dress—while translating them into an age-appropriate, friendly anime character holding a pencil and a small math worksheet. The character is a waist-up or three-quarter cutout used on the landing page and worksheet card. It contains no text, watermark, or other people. The source family photo is used only as generation reference and is not copied into or published with the website.

A friendly “Koko Math” wordmark and small counting-dot motif support the character without competing with her. Screen typography may use system fonts so the site remains fast and offline-safe; the worksheet prioritizes highly legible print typography.

Motion is limited to a short worksheet reveal and button/card feedback. Reduced-motion preferences disable it.

## Architecture

The site is a static HTML, CSS, and JavaScript application suitable for GitHub Pages.

- `index.html` contains the landing and worksheet views with semantic controls.
- `styles.css` contains responsive screen styles and a dedicated `@media print` section with `@page { size: letter portrait; }`.
- `app.js` owns worksheet definitions, random problem generation, rendering, navigation, and printing.
- `assets/koko-character.png` contains the generated anime character used by the landing experience.

No framework or build step is required. Worksheet definitions are data-driven and provide their title, range, problem count, operation balance, and print-grid class so both sets reuse the card, generation, and preview flow.

## Problem generation

Each sheet contains an even balance of addition and subtraction, then shuffles their order: 25 of each for the within-20 set and 10 of each for the within-100 set.

- Addition: choose two positive addends whose sum is no greater than the selected worksheet maximum. The answer is therefore between 2 and the maximum.
- Subtraction: choose a positive minuend no greater than the selected maximum, then choose a positive subtrahend strictly smaller than the minuend. The answer is therefore positive and no greater than the maximum.

Duplicate equations are avoided within a sheet where practical. Since the valid problem space is much larger than 50, generation retries duplicates and falls back safely rather than risking an endless loop.

## Responsive and accessible behavior

- The landing page works from small phones through desktop screens.
- On phone widths, the hero copy and character are separate normal-flow blocks. All headline, paragraph, and worksheet-link text finishes before the Koko character begins, so the character cannot cover or intercept the text at any supported width.
- The worksheet preview may scale visually on narrow screens, but print dimensions remain fixed.
- All actions use native buttons or links, visible focus states, and clear labels.
- Color contrast is sufficient for controls and content; meaning is not conveyed by color alone.
- Printing uses black text and restrained grayscale-safe details.

## Error handling

The generator has no external dependencies or expected network failures. If an unknown worksheet identifier is requested internally, the app returns to the landing view rather than rendering an empty page. The print action uses the browser’s standard print dialog.

## Verification

- Automated checks cover both generator configurations, exact problem and operation counts, positive operands and answers within the configured maximum, correct arithmetic, and unique equations.
- Browser checks cover both landing cards, the selected worksheet title and count, regeneration, back navigation, and the print action.
- Visual checks cover desktop, mobile, and rendered US Letter print previews for both worksheets. Mobile verification specifically checks that the hero copy and Koko image rectangles do not overlap. Both printed worksheets must remain one page and readable.
- The character asset is checked against the reference for the requested hairstyle, expression, dress cues, child-appropriate presentation, clean edges, and absence of unintended text or extra people.

## Publishing

Create a new public GitHub repository at `dmarkel/koko-math`, push the completed `main` branch, and publish it with GitHub Pages.
