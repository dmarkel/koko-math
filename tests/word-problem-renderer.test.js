import assert from "node:assert/strict";
import test from "node:test";

import { generateWordWorksheet, WORD_PROBLEM_DEFINITIONS } from "../src/word-problem-generator.js";
import { buildWordPageModel } from "../src/word-problem-renderer.js";

test("word worksheets become two page models with five complete problems each", () => {
  for (const definition of Object.values(WORD_PROBLEM_DEFINITIONS)) {
    const problems = generateWordWorksheet(definition, () => 0.42);
    const pages = buildWordPageModel(problems, definition);

    assert.equal(pages.length, 2);
    assert.deepEqual(pages.map(({ pageLabel }) => pageLabel), ["Page 1 of 2", "Page 2 of 2"]);
    assert.deepEqual(pages[0].problems.map(({ id }) => id), [1, 2, 3, 4, 5]);
    assert.deepEqual(pages[1].problems.map(({ id }) => id), [6, 7, 8, 9, 10]);

    for (const page of pages) {
      assert.equal(page.title, `Grade ${definition.grade} Word Problems`);
      assert.equal(page.rangeLabel, definition.rangeLabel);
      assert.equal(page.problems.length, 5);

      for (const problem of page.problems) {
        assert.equal(problem.workAreaLabel, "Show your work");
        assert.equal(problem.answerLabel, "Answer");
        assert.ok(problem.text.length > 20);
        assert.ok(problem.visualId);
      }
    }
  }
});
