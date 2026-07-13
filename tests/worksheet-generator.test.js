import assert from "node:assert/strict";
import test from "node:test";

import { generateWorksheet, shuffle } from "../src/worksheet-generator.js";

test("generateWorksheet creates 50 balanced, valid problems", () => {
  for (let sheet = 0; sheet < 100; sheet += 1) {
    const problems = generateWorksheet();

    assert.equal(problems.length, 50);
    assert.equal(problems.filter(({ operator }) => operator === "+").length, 25);
    assert.equal(problems.filter(({ operator }) => operator === "−").length, 25);
    assert.deepEqual(problems.map(({ id }) => id), Array.from({ length: 50 }, (_, index) => index + 1));

    const equations = new Set();
    for (const problem of problems) {
      assert.ok(problem.left >= 0 && problem.left <= 20);
      assert.ok(problem.right >= 0 && problem.right <= 20);
      assert.ok(problem.answer >= 0 && problem.answer <= 20);

      if (problem.operator === "+") {
        assert.equal(problem.left + problem.right, problem.answer);
      } else {
        assert.equal(problem.left - problem.right, problem.answer);
        assert.ok(problem.left >= problem.right);
      }

      const equation = `${problem.left}${problem.operator}${problem.right}`;
      assert.ok(!equations.has(equation), `duplicate equation: ${equation}`);
      equations.add(equation);
    }
  }
});

test("shuffle returns a shuffled copy without mutating the input", () => {
  const original = [1, 2, 3, 4];
  const shuffled = shuffle(original, () => 0);

  assert.deepEqual(original, [1, 2, 3, 4]);
  assert.deepEqual([...shuffled].sort(), original);
  assert.notDeepEqual(shuffled, original);
});
