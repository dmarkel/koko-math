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
  assert.match(css, /\.problem-grid[\s\S]*grid-template-columns:\s*repeat\(5,/);
  assert.match(css, /break-inside:\s*avoid/);
});

test("screen styles include responsive, focus, and reduced-motion treatment", async () => {
  const css = await readFile(stylesheet, "utf8");

  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:/);
  assert.match(css, /--lemon:/);
  assert.match(css, /--sky:/);
});
