import { createWordVisual } from "./word-visuals.js";

export function buildWordPageModel(problems, definition) {
  return Array.from({ length: definition.pages }, (_, pageIndex) => ({
    pageNumber: pageIndex + 1,
    pageLabel: `Page ${pageIndex + 1} of ${definition.pages}`,
    title: `Grade ${definition.grade} Word Problems`,
    rangeLabel: definition.rangeLabel,
    problems: problems
      .slice(pageIndex * definition.problemsPerPage, (pageIndex + 1) * definition.problemsPerPage)
      .map((problem) => ({
        ...problem,
        workAreaLabel: "Show your work",
        answerLabel: "Answer",
      })),
  }));
}

function createElement(tagName, className, text) {
  const node = document.createElement(tagName);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function createPaperHeader() {
  const header = createElement("header", "paper-header");
  const brand = createElement("div", "paper-brand");
  const dots = createElement("span", "paper-brand-dots", "•••");
  const fields = createElement("div", "student-fields");

  dots.setAttribute("aria-hidden", "true");
  brand.append(dots, createElement("span", "", "Koko Math"));

  for (const label of ["Name", "Date"]) {
    const field = createElement("span", "", label);
    const line = createElement("i");
    line.setAttribute("aria-hidden", "true");
    field.append(line);
    fields.append(field);
  }

  header.append(brand, fields);
  return header;
}

function createProblemItem(problem) {
  const item = createElement("li", "word-problem");
  const number = createElement("span", "word-problem-number", `${problem.id}.`);
  const body = createElement("div", "word-problem-body");
  const storyRow = createElement("div", "word-story-row");
  const story = createElement("p", "word-story", problem.text);
  const workArea = createElement("div", "work-area");
  const workLabel = createElement("span", "work-area-label", problem.workAreaLabel);
  const workLines = createElement("span", "work-lines");
  const answer = createElement("div", "word-answer");

  workLines.setAttribute("aria-hidden", "true");
  workArea.append(workLabel, workLines);
  answer.append(createElement("span", "", `${problem.answerLabel}:`), createElement("i"));
  storyRow.append(story, createWordVisual(problem.visualId));
  body.append(storyRow, workArea, answer);
  item.append(number, body);
  return item;
}

function createWordPage(page) {
  const article = createElement("article", "worksheet-paper word-page");
  const title = createElement("div", "paper-title word-paper-title");
  const titleCopy = createElement("div");
  const list = createElement("ol", "word-problem-list");
  const footer = createElement("footer", "paper-footer");

  article.setAttribute("aria-label", `${page.title}, ${page.pageLabel}`);
  titleCopy.append(
    createElement("span", "", page.rangeLabel),
    createElement("h2", "", page.title),
  );
  title.append(titleCopy, createElement("p", "word-page-label", page.pageLabel));
  list.setAttribute("aria-label", `${page.title}, ${page.pageLabel}`);
  page.problems.forEach((problem) => list.append(createProblemItem(problem)));
  footer.append(
    createElement("span", "", "KokoMath.com"),
    createElement("span", "", "Read it. Think it through. You can do it!"),
  );
  article.append(createPaperHeader(), title, list, footer);
  return article;
}

export function createWordProblemPages(problems, definition) {
  const fragment = document.createDocumentFragment();
  buildWordPageModel(problems, definition).forEach((page) => fragment.append(createWordPage(page)));
  return fragment;
}
