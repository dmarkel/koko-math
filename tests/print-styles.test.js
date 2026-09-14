import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheet = new URL("../styles.css", import.meta.url);

test("print styles create one clean Letter worksheet", async () => {
  const css = await readFile(stylesheet, "utf8");

  assert.match(css, /@page\s*{/);
  assert.match(css, /size:\s*letter portrait/);
  assert.match(css, /margin:\s*0/);
  assert.match(css, /@media print/);
  assert.match(css, /\.site-header[\s\S]*display:\s*none/);
  assert.match(css, /\.worksheet-toolbar[\s\S]*display:\s*none/);
  assert.match(css, /\.problem-grid--50[\s\S]*grid-template-columns:\s*repeat\(5,/);
  assert.match(css, /\.problem-grid--50[\s\S]*grid-template-rows:\s*repeat\(10,/);
  assert.match(css, /\.problem-grid--20[\s\S]*grid-template-columns:\s*repeat\(4,/);
  assert.match(css, /\.problem-grid--20[\s\S]*grid-template-rows:\s*repeat\(5,/);
  assert.match(css, /\.carry-space[\s\S]*height:\s*0\.14in/);
  assert.match(css, /break-inside:\s*avoid/);
});

test("screen styles include responsive, focus, and reduced-motion treatment", async () => {
  const css = await readFile(stylesheet, "utf8");

  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:/);
  assert.match(css, /--lemon:/);
  assert.match(css, /--sky:/);
  assert.match(
    css,
    /@media \(max-width: 680px\)[\s\S]*\.hero-character img\s*{[\s\S]*position:\s*static/,
  );
});

test("word-problem styles create exactly two complete Letter pages", async () => {
  const css = await readFile(stylesheet, "utf8");

  assert.match(css, /\.printable-pages\s*{[\s\S]*display:\s*grid/);
  assert.match(css, /\.word-page\s*{[\s\S]*height:\s*11in/);
  assert.match(css, /\.word-problem-list\s*{[\s\S]*grid-template-rows:\s*repeat\(5,/);
  assert.match(css, /\.word-problem\s*{[\s\S]*break-inside:\s*avoid/);
  assert.match(css, /\.word-visual\s*{[\s\S]*width:/);
  assert.match(css, /\.work-area\s*{/);
  assert.match(css, /\.word-answer\s*{/);
  assert.match(css, /@media print[\s\S]*\.word-page:not\(:last-child\)[\s\S]*break-after:\s*page/);
  assert.match(css, /@media print[\s\S]*\.word-page:last-child[\s\S]*break-after:\s*auto/);
  assert.match(css, /@media print[\s\S]*\.worksheet-view,[\s\S]*\.paper-stage\s*{[\s\S]*height:\s*auto/);
});
