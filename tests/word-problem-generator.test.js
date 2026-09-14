import assert from "node:assert/strict";
import test from "node:test";

import {
  generateWordWorksheet,
  WORD_PROBLEM_DEFINITIONS,
  WORD_VISUAL_IDS,
} from "../src/word-problem-generator.js";

function verifyOperationSequence(problem, maximum) {
  let previousResult;

  problem.operations.forEach((operation, index) => {
    if (index > 0) {
      assert.equal(operation.left, previousResult);
    }

    const result = operation.operator === "+"
      ? operation.left + operation.right
      : operation.left - operation.right;

    assert.equal(operation.result, result);
    assert.ok(result >= 1 && result <= maximum);
    previousResult = result;
  });

  assert.equal(problem.answer, previousResult);
  assert.deepEqual(problem.intermediateResults, problem.operations.slice(0, -1).map(({ result }) => result));
}

test("Grade 1 generates ten unique one-step stories within 20", () => {
  const definition = WORD_PROBLEM_DEFINITIONS["word-grade-1"];

  assert.equal(definition.kind, "word");
  assert.equal(definition.grade, 1);
  assert.equal(definition.problemCount, 10);
  assert.equal(definition.pages, 2);
  assert.equal(definition.problemsPerPage, 5);

  for (let sheet = 0; sheet < 100; sheet += 1) {
    const problems = generateWordWorksheet(definition);

    assert.equal(problems.length, 10);
    assert.deepEqual(problems.map(({ id }) => id), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.equal(problems.filter(({ operations }) => operations[0].operator === "+").length, 5);
    assert.equal(problems.filter(({ operations }) => operations[0].operator === "−").length, 5);
    assert.equal(new Set(problems.map(({ text }) => text)).size, 10);
    assert.equal(new Set(problems.map(({ arithmeticSignature }) => arithmeticSignature)).size, 10);

    for (const problem of problems) {
      assert.equal(problem.grade, 1);
      assert.equal(problem.stepCount, 1);
      assert.equal(problem.operations.length, 1);
      assert.ok(WORD_VISUAL_IDS.includes(problem.visualId));
      assert.ok(problem.text.endsWith("?"));
      assert.ok(problem.quantities.every((value) => value >= 1 && value <= 20));
      verifyOperationSequence(problem, 20);
    }
  }
});

test("Grade 2 generates eight two-step and two one-step stories within 100", () => {
  const definition = WORD_PROBLEM_DEFINITIONS["word-grade-2"];

  assert.equal(definition.kind, "word");
  assert.equal(definition.grade, 2);
  assert.equal(definition.problemCount, 10);
  assert.equal(definition.twoStepCount, 8);
  assert.equal(definition.oneStepCount, 2);

  for (let sheet = 0; sheet < 100; sheet += 1) {
    const problems = generateWordWorksheet(definition);
    const operators = problems.flatMap(({ operations }) => operations.map(({ operator }) => operator));

    assert.equal(problems.length, 10);
    assert.equal(problems.filter(({ stepCount }) => stepCount === 2).length, 8);
    assert.equal(problems.filter(({ stepCount }) => stepCount === 1).length, 2);
    assert.ok(operators.includes("+"));
    assert.ok(operators.includes("−"));
    assert.equal(new Set(problems.map(({ text }) => text)).size, 10);
    assert.equal(new Set(problems.map(({ arithmeticSignature }) => arithmeticSignature)).size, 10);

    for (const problem of problems) {
      assert.equal(problem.grade, 2);
      assert.equal(problem.operations.length, problem.stepCount);
      assert.ok(WORD_VISUAL_IDS.includes(problem.visualId));
      assert.ok(problem.quantities.every((value) => value >= 1 && value <= 100));
      assert.ok(problem.intermediateResults.every((value) => value >= 1 && value <= 100));
      verifyOperationSequence(problem, 100);
    }
  }
});

test("word-problem generation completes with a collision-heavy random source", () => {
  for (const definition of Object.values(WORD_PROBLEM_DEFINITIONS)) {
    const problems = generateWordWorksheet(definition, () => 0);

    assert.equal(problems.length, 10);
    assert.equal(new Set(problems.map(({ arithmeticSignature }) => arithmeticSignature)).size, 10);
  }
});
