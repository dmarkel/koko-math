import { generateWorksheet } from "./worksheet-generator.js";

const landingView = document.querySelector("#landing-view");
const worksheetView = document.querySelector("#worksheet-view");
const worksheetCard = document.querySelector("#worksheet-card");
const homeLink = document.querySelector("#home-link");
const backButton = document.querySelector("#back-button");
const newButton = document.querySelector("#new-button");
const printButton = document.querySelector("#print-button");
const problemGrid = document.querySelector("#problem-grid");
const landingTitle = document.querySelector("#landing-title");
const previewTitle = document.querySelector("#preview-title");

export function renderProblems(problems) {
  const fragment = document.createDocumentFragment();

  for (const problem of problems) {
    const item = document.createElement("li");
    const number = document.createElement("span");
    const equation = document.createElement("span");
    const answerLine = document.createElement("span");

    number.className = "problem-number";
    number.textContent = `${problem.id}.`;
    equation.className = "equation";
    equation.textContent = `${problem.left} ${problem.operator} ${problem.right} =`;
    answerLine.className = "answer-line";
    answerLine.setAttribute("aria-label", "answer blank");

    item.append(number, equation, answerLine);
    fragment.append(item);
  }

  problemGrid.replaceChildren(fragment);
}

export function showWorksheet() {
  renderProblems(generateWorksheet());
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

worksheetCard.addEventListener("click", showWorksheet);
newButton.addEventListener("click", () => {
  renderProblems(generateWorksheet());
  previewTitle.focus();
});
backButton.addEventListener("click", showLanding);
homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  showLanding();
});
printButton.addEventListener("click", () => window.print());
