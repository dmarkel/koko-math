const MAX_NUMBER = 20;
const PROBLEMS_PER_OPERATION = 25;

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function additionPool() {
  const problems = [];

  for (let left = 0; left <= MAX_NUMBER; left += 1) {
    for (let right = 0; left + right <= MAX_NUMBER; right += 1) {
      problems.push({ left, operator: "+", right, answer: left + right });
    }
  }

  return problems;
}

function subtractionPool() {
  const problems = [];

  for (let left = 0; left <= MAX_NUMBER; left += 1) {
    for (let right = 0; right <= left; right += 1) {
      problems.push({ left, operator: "−", right, answer: left - right });
    }
  }

  return problems;
}

export function generateWorksheet(random = Math.random) {
  const additions = shuffle(additionPool(), random).slice(0, PROBLEMS_PER_OPERATION);
  const subtractions = shuffle(subtractionPool(), random).slice(0, PROBLEMS_PER_OPERATION);

  return shuffle([...additions, ...subtractions], random).map((problem, index) => ({
    id: index + 1,
    ...problem,
  }));
}
