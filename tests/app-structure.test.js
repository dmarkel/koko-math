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
  assert.match(html, /Addition &amp; subtraction within 20/);
  assert.match(html, /Addition &amp; subtraction within 100/);
  assert.match(html, /Grade 1 · 20 problems/);
  assert.match(html, /id="back-button"/);
  assert.match(html, /id="new-button"/);
  assert.match(html, /id="print-button"/);
  assert.match(html, /id="problem-grid"/);
  assert.match(html, /Name/);
  assert.match(html, /Date/);
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /type="module" src="src\/app\.js"/);
  assert.doesNotMatch(html, /Photo-1|codex-remote-attachments/);
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
});
