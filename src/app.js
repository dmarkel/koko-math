import {
  generateWorksheet,
  WORKSHEET_DEFINITIONS,
} from "./worksheet-generator.js";

const landingView = document.querySelector("#landing-view");
const worksheetView = document.querySelector("#worksheet-view");
const worksheetCards = document.querySelectorAll("[data-worksheet-id]");
const homeLink = document.querySelector("#home-link");
const backButton = document.querySelector("#back-button");
const newButton = document.querySelector("#new-button");
const printButton = document.querySelector("#print-button");
const problemGrid = document.querySelector("#problem-grid");
const landingTitle = document.querySelector("#landing-title");
const previewTitle = document.querySelector("#preview-title");
const paperRange = document.querySelector("#paper-range");
const paperTitle = document.querySelector("#paper-title");
let restoreLandingAfterPrint = false;
let activeDefinition = WORKSHEET_DEFINITIONS["within-20"];

export function renderProblems(problems) {
  const fragment = document.createDocumentFragment();

  for (const problem of problems) {
    const item = document.createElement("li");
    const number = document.createElement("span");
    const verticalProblem = document.createElement("span");
    const carrySpace = document.createElement("span");
    const topNumber = document.createElement("span");
    const bottomRow = document.createElement("span");
    const operator = document.createElement("span");
    const bottomNumber = document.createElement("span");
    const answerRule = document.createElement("span");

    number.className = "problem-number";
    number.textContent = `${problem.id}.`;
    verticalProblem.className = "vertical-problem";
    carrySpace.className = "carry-space";
    carrySpace.setAttribute("aria-hidden", "true");
    topNumber.className = "top-number";
    topNumber.textContent = `${problem.left}`;
    bottomRow.className = "bottom-row";
    operator.className = "operator";
    operator.textContent = problem.operator;
    bottomNumber.className = "bottom-number";
    bottomNumber.textContent = `${problem.right}`;
    answerRule.className = "answer-rule";
    answerRule.setAttribute("aria-hidden", "true");
    item.setAttribute(
      "aria-label",
      `${problem.id}. ${problem.left} ${problem.operator} ${problem.right}`,
    );

    bottomRow.append(operator, bottomNumber);
    verticalProblem.append(carrySpace, topNumber, bottomRow, answerRule);
    item.append(number, verticalProblem);
    fragment.append(item);
  }

  problemGrid.replaceChildren(fragment);
}

function applyDefinition(definition) {
  activeDefinition = definition;
  paperRange.textContent = definition.rangeLabel;
  paperTitle.textContent = definition.title;
  problemGrid.className = `problem-grid ${definition.gridClass}`;
  problemGrid.setAttribute("aria-label", `${definition.problemCount} math problems`);
}

export function showWorksheet(definition = activeDefinition) {
  applyDefinition(definition);
  renderProblems(generateWorksheet(activeDefinition));
  landingView.hidden = true;
  worksheetView.hidden = false;
  document.body.classList.add("showing-worksheet");
  window.scrollTo({ top: 0, behavior: "instant" });
  previewTitle.focus();
}

export function showLanding() {
  worksheetView.hidden = true;
  landingView.hidden = false;
  document.body.classList.remove("showing-worksheet");
  window.scrollTo({ top: 0, behavior: "instant" });
  landingTitle.focus();
}

for (const card of worksheetCards) {
  card.addEventListener("click", (event) => {
    const definition = WORKSHEET_DEFINITIONS[event.currentTarget.dataset.worksheetId];

    if (definition) {
      showWorksheet(definition);
    }
  });
}
newButton.addEventListener("click", () => {
  renderProblems(generateWorksheet(activeDefinition));
  previewTitle.focus();
});
backButton.addEventListener("click", showLanding);
homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  showLanding();
});
printButton.addEventListener("click", () => window.print());

window.addEventListener("beforeprint", () => {
  if (problemGrid.childElementCount === 0) {
    applyDefinition(activeDefinition);
    renderProblems(generateWorksheet(activeDefinition));
  }

  restoreLandingAfterPrint = !landingView.hidden;
  landingView.hidden = true;
  worksheetView.hidden = false;
});

window.addEventListener("afterprint", () => {
  if (restoreLandingAfterPrint) {
    worksheetView.hidden = true;
    landingView.hidden = false;
    restoreLandingAfterPrint = false;
  }
});
