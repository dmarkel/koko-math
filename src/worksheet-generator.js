import { WORD_PROBLEM_DEFINITIONS } from "./word-problem-generator.js";

export const WORKSHEET_DEFINITIONS = Object.freeze({
  "within-20": Object.freeze({
    id: "within-20",
    kind: "arithmetic",
    title: "Addition & Subtraction",
    shortTitle: "Addition & subtraction within 20",
    rangeLabel: "Mixed practice · within 20",
    maximum: 20,
    problemCount: 50,
    perOperation: 25,
    gridClass: "problem-grid--50",
  }),
  "within-100": Object.freeze({
    id: "within-100",
    kind: "arithmetic",
    title: "Addition & Subtraction",
    shortTitle: "Addition & subtraction within 100",
    rangeLabel: "Mixed practice · within 100",
    maximum: 100,
    problemCount: 20,
    perOperation: 10,
    gridClass: "problem-grid--20",
  }),
  "within-1000": Object.freeze({
    id: "within-1000",
    kind: "arithmetic",
    title: "Addition & Subtraction",
    shortTitle: "Addition & subtraction within 1,000",
    rangeLabel: "Mixed practice · within 1,000",
    maximum: 1000,
    problemCount: 20,
    perOperation: 10,
    gridClass: "problem-grid--20",
  }),
  ...WORD_PROBLEM_DEFINITIONS,
});

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function randomInteger(minimum, maximum, random) {
  return minimum + Math.floor(random() * (maximum - minimum + 1));
}

function addUnique(problems, equations, problem) {
  const equation = `${problem.left}${problem.operator}${problem.right}`;

  if (equations.has(equation)) {
    return false;
  }

  equations.add(equation);
  problems.push(problem);
  return true;
}

function additionProblems(maximum, count, random) {
  const problems = [];
  const equations = new Set();
  const maximumAttempts = count * 20;

  for (let attempt = 0; problems.length < count && attempt < maximumAttempts; attempt += 1) {
    const left = randomInteger(1, maximum - 1, random);
    const right = randomInteger(1, maximum - left, random);
    addUnique(problems, equations, { left, operator: "+", right, answer: left + right });
  }

  for (let left = 1; problems.length < count && left < maximum; left += 1) {
    for (let right = 1; problems.length < count && left + right <= maximum; right += 1) {
      addUnique(problems, equations, { left, operator: "+", right, answer: left + right });
    }
  }

  return problems;
}

function subtractionProblems(maximum, count, random) {
  const problems = [];
  const equations = new Set();
  const maximumAttempts = count * 20;

  for (let attempt = 0; problems.length < count && attempt < maximumAttempts; attempt += 1) {
    const left = randomInteger(2, maximum, random);
    const right = randomInteger(1, left - 1, random);
    addUnique(problems, equations, { left, operator: "−", right, answer: left - right });
  }

  for (let left = 2; problems.length < count && left <= maximum; left += 1) {
    for (let right = 1; problems.length < count && right < left; right += 1) {
      addUnique(problems, equations, { left, operator: "−", right, answer: left - right });
    }
  }

  return problems;
}

export function generateWorksheet(
  definition = WORKSHEET_DEFINITIONS["within-20"],
  random = Math.random,
) {
  const additions = additionProblems(
    definition.maximum,
    definition.perOperation,
    random,
  );
  const subtractions = subtractionProblems(
    definition.maximum,
    definition.perOperation,
    random,
  );

  return shuffle([...additions, ...subtractions], random).map((problem, index) => ({
    id: index + 1,
    ...problem,
  }));
}
