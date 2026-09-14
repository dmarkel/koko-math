export const WORD_VISUAL_IDS = Object.freeze([
  "apple",
  "book",
  "crayon",
  "ball",
  "flower",
  "paw",
  "kite",
  "star",
  "backpack",
  "blocks",
]);

export const WORD_PROBLEM_DEFINITIONS = Object.freeze({
  "word-grade-1": Object.freeze({
    id: "word-grade-1",
    kind: "word",
    grade: 1,
    title: "Word Problems",
    shortTitle: "Grade 1 word problems",
    rangeLabel: "Grade 1 · within 20",
    maximum: 20,
    problemCount: 10,
    problemsPerPage: 5,
    pages: 2,
    oneStepCount: 10,
    twoStepCount: 0,
  }),
  "word-grade-2": Object.freeze({
    id: "word-grade-2",
    kind: "word",
    grade: 2,
    title: "Word Problems",
    shortTitle: "Grade 2 word problems",
    rangeLabel: "Grade 2 · within 100",
    maximum: 100,
    problemCount: 10,
    problemsPerPage: 5,
    pages: 2,
    oneStepCount: 2,
    twoStepCount: 8,
  }),
});

const NAMES = Object.freeze(["Koko", "Maya", "Leo", "Nina", "Ari", "Sam", "Jada", "Theo"]);

const SUBJECTS = Object.freeze({
  apple: { singular: "apple", plural: "apples" },
  book: { singular: "book", plural: "books" },
  crayon: { singular: "crayon", plural: "crayons" },
  ball: { singular: "ball", plural: "balls" },
  flower: { singular: "flower", plural: "flowers" },
  paw: { singular: "pet treat", plural: "pet treats" },
  kite: { singular: "kite", plural: "kites" },
  star: { singular: "star sticker", plural: "star stickers" },
  backpack: { singular: "school supply", plural: "school supplies" },
  blocks: { singular: "block", plural: "blocks" },
});

function template(id, visualId, pattern, render) {
  return Object.freeze({ id, visualId, pattern, render });
}

const GRADE_1_ADDITION = Object.freeze([
  template("g1-add-apples", "apple", "+", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])}. A friend gives ${name} ${q[1]} more. How many ${label(q[0] + q[1])} does ${name} have now?`),
  template("g1-add-books", "book", "+", ({ name, q, label }) => `${name} puts ${q[0]} ${label(q[0])} on a shelf and then adds ${q[1]} more. How many ${label(q[0] + q[1])} are on the shelf?`),
  template("g1-add-crayons", "crayon", "+", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])}. The teacher gives ${name} ${q[1]} more. How many ${label(q[0] + q[1])} does ${name} have altogether?`),
  template("g1-add-balls", "ball", "+", ({ q, label }) => `There are ${q[0]} ${label(q[0])} in a basket. Children add ${q[1]} more. How many ${label(q[0] + q[1])} are in the basket now?`),
  template("g1-add-flowers", "flower", "+", ({ name, q, label }) => `${name} picks ${q[0]} ${label(q[0])} and then picks ${q[1]} more. How many ${label(q[0] + q[1])} did ${name} pick in all?`),
  template("g1-add-stars", "star", "+", ({ name, q, label }) => `${name} earns ${q[0]} ${label(q[0])} in the morning and ${q[1]} more later. How many ${label(q[0] + q[1])} did ${name} earn?`),
]);

const GRADE_1_SUBTRACTION = Object.freeze([
  template("g1-sub-treats", "paw", "-", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])} and gives ${q[1]} to a puppy. How many ${label(q[0] - q[1])} are left?`),
  template("g1-sub-kites", "kite", "-", ({ q, label }) => `${q[0]} ${label(q[0])} are flying at the park. Then ${q[1]} come down. How many ${label(q[0] - q[1])} are still flying?`),
  template("g1-sub-blocks", "blocks", "-", ({ name, q, label }) => `${name} builds with ${q[0]} ${label(q[0])}. ${name} puts ${q[1]} away. How many ${label(q[0] - q[1])} are still out?`),
  template("g1-sub-apples", "apple", "-", ({ q, label }) => `A bowl holds ${q[0]} ${label(q[0])}. The family eats ${q[1]}. How many ${label(q[0] - q[1])} remain?`),
  template("g1-sub-books", "book", "-", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])} to return. ${name} returns ${q[1]}. How many ${label(q[0] - q[1])} still need to be returned?`),
  template("g1-sub-crayons", "crayon", "-", ({ q, label }) => `A box has ${q[0]} ${label(q[0])}. Children take out ${q[1]}. How many ${label(q[0] - q[1])} stay in the box?`),
]);

const GRADE_2_TWO_STEP = Object.freeze([
  template("g2-aa-books", "book", "++", ({ name, q, label }) => `${name} reads ${q[0]} ${label(q[0])} in June, ${q[1]} in July, and ${q[2]} in August. How many ${label(q[0] + q[1] + q[2])} does ${name} read in all?`),
  template("g2-aa-flowers", "flower", "++", ({ q, label }) => `A garden has ${q[0]} red ${label(q[0])}. Gardeners plant ${q[1]} yellow ones and ${q[2]} white ones. How many ${label(q[0] + q[1] + q[2])} are there now?`),
  template("g2-aa-blocks", "blocks", "++", ({ name, q, label }) => `${name} uses ${q[0]} ${label(q[0])} for one tower, ${q[1]} for another, and ${q[2]} for a bridge. How many ${label(q[0] + q[1] + q[2])} are used?`),
  template("g2-ss-apples", "apple", "--", ({ q, label }) => `A stand begins with ${q[0]} ${label(q[0])}. It sells ${q[1]} in the morning and ${q[2]} in the afternoon. How many ${label(q[0] - q[1] - q[2])} remain?`),
  template("g2-ss-crayons", "crayon", "--", ({ q, label }) => `An art room has ${q[0]} ${label(q[0])}. One class borrows ${q[1]}, and another borrows ${q[2]}. How many ${label(q[0] - q[1] - q[2])} stay in the art room?`),
  template("g2-ss-stars", "star", "--", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])}. ${name} gives away ${q[1]} on Monday and ${q[2]} on Tuesday. How many ${label(q[0] - q[1] - q[2])} are left?`),
  template("g2-as-balls", "ball", "+-", ({ q, label }) => `A gym bin has ${q[0]} ${label(q[0])}. A teacher adds ${q[1]} and then takes out ${q[2]} for recess. How many ${label(q[0] + q[1] - q[2])} remain in the bin?`),
  template("g2-as-kites", "kite", "+-", ({ q, label }) => `${q[0]} ${label(q[0])} are at a festival. ${q[1]} more arrive, and then ${q[2]} are packed away. How many ${label(q[0] + q[1] - q[2])} are still out?`),
  template("g2-as-supplies", "backpack", "+-", ({ name, q, label }) => `${name}'s class has ${q[0]} ${label(q[0])}. The teacher brings ${q[1]} more, then students use ${q[2]}. How many ${label(q[0] + q[1] - q[2])} are left?`),
  template("g2-sa-treats", "paw", "-+", ({ q, label }) => `A pet shop has ${q[0]} ${label(q[0])}. It gives away ${q[1]}, then makes ${q[2]} more. How many ${label(q[0] - q[1] + q[2])} does it have now?`),
  template("g2-sa-books", "book", "-+", ({ q, label }) => `A cart holds ${q[0]} ${label(q[0])}. Students borrow ${q[1]}, and a librarian adds ${q[2]}. How many ${label(q[0] - q[1] + q[2])} are on the cart now?`),
  template("g2-sa-flowers", "flower", "-+", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])}. ${name} gives away ${q[1]} and later picks ${q[2]} more. How many ${label(q[0] - q[1] + q[2])} does ${name} have now?`),
]);

const GRADE_2_ONE_STEP = Object.freeze([
  template("g2-one-add-stars", "star", "+", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])} and earns ${q[1]} more. How many ${label(q[0] + q[1])} does ${name} have altogether?`),
  template("g2-one-add-balls", "ball", "+", ({ q, label }) => `One bin holds ${q[0]} ${label(q[0])}, and another holds ${q[1]}. How many ${label(q[0] + q[1])} are in both bins?`),
  template("g2-one-sub-blocks", "blocks", "-", ({ name, q, label }) => `${name} has ${q[0]} ${label(q[0])} and uses ${q[1]}. How many ${label(q[0] - q[1])} remain?`),
  template("g2-one-sub-apples", "apple", "-", ({ q, label }) => `A basket starts with ${q[0]} ${label(q[0])}. Children take ${q[1]}. How many ${label(q[0] - q[1])} are left?`),
]);

function randomInteger(minimum, maximum, random) {
  return minimum + Math.floor(random() * (maximum - minimum + 1));
}

function pick(items, random) {
  return items[randomInteger(0, items.length - 1, random)];
}

function shuffle(items, random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(0, index, random);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function operation(left, operator, right) {
  return {
    left,
    operator,
    right,
    result: operator === "+" ? left + right : left - right,
  };
}

function buildOperations(pattern, maximum, random) {
  if (pattern === "+") {
    const left = randomInteger(1, maximum - 1, random);
    return [operation(left, "+", randomInteger(1, maximum - left, random))];
  }

  if (pattern === "-") {
    const left = randomInteger(2, maximum, random);
    return [operation(left, "−", randomInteger(1, left - 1, random))];
  }

  if (pattern === "++") {
    const firstLeft = randomInteger(1, maximum - 2, random);
    const first = operation(firstLeft, "+", randomInteger(1, maximum - firstLeft - 1, random));
    return [first, operation(first.result, "+", randomInteger(1, maximum - first.result, random))];
  }

  if (pattern === "--") {
    const firstLeft = randomInteger(3, maximum, random);
    const first = operation(firstLeft, "−", randomInteger(1, firstLeft - 2, random));
    return [first, operation(first.result, "−", randomInteger(1, first.result - 1, random))];
  }

  if (pattern === "+-") {
    const firstLeft = randomInteger(1, maximum - 1, random);
    const first = operation(firstLeft, "+", randomInteger(1, maximum - firstLeft, random));
    return [first, operation(first.result, "−", randomInteger(1, first.result - 1, random))];
  }

  const firstLeft = randomInteger(2, maximum, random);
  const first = operation(firstLeft, "−", randomInteger(1, firstLeft - 1, random));
  return [first, operation(first.result, "+", randomInteger(1, maximum - first.result, random))];
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function seedFor(templateId, attempt) {
  return [...templateId].reduce((seed, character) => seed + character.charCodeAt(0), attempt * 7919 + 17);
}

function createProblem(storyTemplate, definition, random, attempt) {
  const source = attempt === 0 ? random : seededRandom(seedFor(storyTemplate.id, attempt));
  const operations = buildOperations(storyTemplate.pattern, definition.maximum, source);
  const quantities = [operations[0].left, ...operations.map(({ right }) => right)];
  const subject = SUBJECTS[storyTemplate.visualId];
  const label = (count) => count === 1 ? subject.singular : subject.plural;
  const name = pick(NAMES, source);
  const text = storyTemplate.render({ name, q: quantities, label });

  return {
    grade: definition.grade,
    stepCount: operations.length,
    operations,
    quantities,
    intermediateResults: operations.slice(0, -1).map(({ result }) => result),
    answer: operations.at(-1).result,
    text,
    templateId: storyTemplate.id,
    visualId: storyTemplate.visualId,
    arithmeticSignature: operations.map(({ left, operator, right, result }) => `${left}${operator}${right}=${result}`).join(";"),
  };
}

function chooseTemplates(definition, random) {
  if (definition.grade === 1) {
    return [
      ...shuffle(GRADE_1_ADDITION, random).slice(0, 5),
      ...shuffle(GRADE_1_SUBTRACTION, random).slice(0, 5),
    ];
  }

  const twoStep = ["++", "--", "+-", "-+"]
    .flatMap((pattern) => shuffle(GRADE_2_TWO_STEP.filter((item) => item.pattern === pattern), random).slice(0, 2));
  const oneStep = [
    pick(GRADE_2_ONE_STEP.filter((item) => item.pattern === "+"), random),
    pick(GRADE_2_ONE_STEP.filter((item) => item.pattern === "-"), random),
  ];
  return [...twoStep, ...oneStep];
}

export function generateWordWorksheet(
  definition = WORD_PROBLEM_DEFINITIONS["word-grade-1"],
  random = Math.random,
) {
  const arithmeticSignatures = new Set();
  const renderedStories = new Set();
  const problems = chooseTemplates(definition, random).map((storyTemplate) => {
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const problem = createProblem(storyTemplate, definition, random, attempt);

      if (!arithmeticSignatures.has(problem.arithmeticSignature) && !renderedStories.has(problem.text)) {
        arithmeticSignatures.add(problem.arithmeticSignature);
        renderedStories.add(problem.text);
        return problem;
      }
    }

    throw new Error(`Unable to create a unique problem for ${storyTemplate.id}`);
  });

  return shuffle(problems, random).map((problem, index) => ({ id: index + 1, ...problem }));
}
