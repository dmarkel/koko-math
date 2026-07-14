export const WORKSHEET_DEFINITIONS = Object.freeze({
  "within-20": Object.freeze({
    id: "within-20",
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
    title: "Addition & Subtraction",
    shortTitle: "Addition & subtraction within 100",
    rangeLabel: "Mixed practice · within 100",
    maximum: 100,
    problemCount: 20,
    perOperation: 10,
    gridClass: "problem-grid--20",
  }),
});

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function additionPool(maximum) {
  const problems = [];

  for (let left = 1; left < maximum; left += 1) {
    for (let right = 1; left + right <= maximum; right += 1) {
      problems.push({ left, operator: "+", right, answer: left + right });
    }
  }

  return problems;
}

function subtractionPool(maximum) {
  const problems = [];

  for (let left = 2; left <= maximum; left += 1) {
    for (let right = 1; right < left; right += 1) {
      problems.push({ left, operator: "−", right, answer: left - right });
    }
  }

  return problems;
}

export function generateWorksheet(
  definition = WORKSHEET_DEFINITIONS["within-20"],
  random = Math.random,
) {
  const additions = shuffle(additionPool(definition.maximum), random).slice(
    0,
    definition.perOperation,
  );
  const subtractions = shuffle(subtractionPool(definition.maximum), random).slice(
    0,
    definition.perOperation,
  );

  return shuffle([...additions, ...subtractions], random).map((problem, index) => ({
    id: index + 1,
    ...problem,
  }));
}
