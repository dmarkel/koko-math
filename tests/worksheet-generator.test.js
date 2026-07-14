import assert from "node:assert/strict";
import test from "node:test";

import {
  generateWorksheet,
  shuffle,
  WORKSHEET_DEFINITIONS,
} from "../src/worksheet-generator.js";

for (const definition of Object.values(WORKSHEET_DEFINITIONS)) {
  test(`${definition.id} creates a balanced sheet with positive values`, () => {
    for (let sheet = 0; sheet < 100; sheet += 1) {
      const problems = generateWorksheet(definition);

      assert.equal(problems.length, definition.problemCount);
      assert.equal(problems.filter(({ operator }) => operator === "+").length, definition.perOperation);
      assert.equal(problems.filter(({ operator }) => operator === "−").length, definition.perOperation);
      assert.deepEqual(
        problems.map(({ id }) => id),
        Array.from({ length: definition.problemCount }, (_, index) => index + 1),
      );

      const equations = new Set();
      for (const problem of problems) {
        assert.ok(problem.left >= 1 && problem.left <= definition.maximum);
        assert.ok(problem.right >= 1 && problem.right <= definition.maximum);
        assert.ok(problem.answer >= 1 && problem.answer <= definition.maximum);

        if (problem.operator === "+") {
          assert.equal(problem.left + problem.right, problem.answer);
        } else {
          assert.equal(problem.left - problem.right, problem.answer);
          assert.ok(problem.left > problem.right);
        }

        const equation = `${problem.left}${problem.operator}${problem.right}`;
        assert.ok(!equations.has(equation), `duplicate equation: ${equation}`);
        equations.add(equation);
      }
    }
  });
}

test("shuffle returns a shuffled copy without mutating the input", () => {
  const original = [1, 2, 3, 4];
  const shuffled = shuffle(original, () => 0);

  assert.deepEqual(original, [1, 2, 3, 4]);
  assert.deepEqual([...shuffled].sort(), original);
  assert.notDeepEqual(shuffled, original);
});
