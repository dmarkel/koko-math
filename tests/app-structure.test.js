import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("index provides the complete landing and worksheet flow", async () => {
  const html = await readFile(projectFile("index.html"), "utf8");

  assert.match(html, /id="landing-view"/);
  assert.match(html, /id="worksheet-view"/);
  assert.match(html, /data-worksheet-id="within-20"/);
  assert.match(html, /data-worksheet-id="within-100"/);
  assert.match(html, /data-worksheet-id="within-1000"/);
  assert.match(html, /data-worksheet-id="word-grade-1"/);
  assert.match(html, /data-worksheet-id="word-grade-2"/);
  assert.match(html, /Addition &amp; subtraction within 20/);
  assert.match(html, /Addition &amp; subtraction within 100/);
  assert.match(html, /Addition &amp; subtraction within 1,000/);
  assert.match(html, /Grade 1 · 20 problems/);
  assert.match(html, /Grade 2 · 20 problems/);
  assert.match(html, /Grade 1 · 10 problems · 2 pages/);
  assert.match(html, /Grade 2 · 10 problems · 2 pages/);
  assert.match(html, /Grade 1 Word Problems/);
  assert.match(html, /Grade 2 Word Problems/);
  assert.match(html, /id="back-button"/);
  assert.match(html, /id="new-button"/);
  assert.match(html, /id="print-button"/);
  assert.match(html, /id="problem-grid"/);
  assert.match(html, /id="printable-pages"/);
  assert.match(html, /id="arithmetic-page"/);
  assert.match(html, /Name/);
  assert.match(html, /Date/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /type="module" src="src\/app\.js"/);
  assert.doesNotMatch(html, /Photo-1|codex-remote-attachments/);
});

test("landing page groups every worksheet under its grade", async () => {
  const html = await readFile(projectFile("index.html"), "utf8");
  const gradeOne = html.match(/<section class="grade-library"[^>]*data-grade="1"[\s\S]*?<\/section>/)?.[0] ?? "";
  const gradeTwo = html.match(/<section class="grade-library"[^>]*data-grade="2"[\s\S]*?<\/section>/)?.[0] ?? "";

  assert.match(gradeOne, /Grade 1 worksheets/);
  assert.match(gradeOne, /data-worksheet-id="within-20"/);
  assert.match(gradeOne, /data-worksheet-id="within-100"/);
  assert.match(gradeOne, /data-worksheet-id="word-grade-1"/);
  assert.doesNotMatch(gradeOne, /data-worksheet-id="within-1000"|data-worksheet-id="word-grade-2"/);

  assert.match(gradeTwo, /Grade 2 worksheets/);
  assert.match(gradeTwo, /data-worksheet-id="within-1000"/);
  assert.match(gradeTwo, /data-worksheet-id="word-grade-2"/);
  assert.doesNotMatch(gradeTwo, /data-worksheet-id="within-20"|data-worksheet-id="within-100"|data-worksheet-id="word-grade-1"/);
});

test("application controller wires generation, navigation, and printing", async () => {
  const script = await readFile(projectFile("src/app.js"), "utf8");

  assert.match(script, /generateWorksheet/);
  assert.match(script, /WORKSHEET_DEFINITIONS/);
  assert.match(script, /dataset\.worksheetId/);
  assert.match(script, /URLSearchParams/);
  assert.match(script, /showWorksheet/);
  assert.match(script, /showLanding/);
  assert.match(script, /renderProblems/);
  assert.match(script, /window\.print\(\)/);
  assert.match(script, /beforeprint/);
  assert.match(script, /textContent/);
  assert.match(script, /carry-space/);
  assert.match(script, /top-number/);
  assert.match(script, /bottom-row/);
  assert.match(script, /operator/);
  assert.match(script, /bottom-number/);
  assert.match(script, /answer-rule/);
  assert.match(script, /generateWordWorksheet/);
  assert.match(script, /createWordProblemPages/);
  assert.match(script, /renderActiveWorksheet/);
  assert.match(script, /printablePages/);
});
