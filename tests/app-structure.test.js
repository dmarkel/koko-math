import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFile = (path) => new URL(`../${path}`, import.meta.url);

test("index provides the complete landing and worksheet flow", async () => {
  const html = await readFile(projectFile("index.html"), "utf8");

  assert.match(html, /id="landing-view"/);
  assert.match(html, /id="worksheet-view"/);
  assert.match(html, /id="worksheet-card"/);
  assert.match(html, /Addition &amp; subtraction within 20/);
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
  assert.match(script, /showWorksheet/);
  assert.match(script, /showLanding/);
  assert.match(script, /renderProblems/);
  assert.match(script, /window\.print\(\)/);
  assert.match(script, /beforeprint/);
  assert.match(script, /textContent/);
});
