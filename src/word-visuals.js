const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const ICON_PATHS = Object.freeze({
  apple: ["M32 18c-11-8-22 1-19 17 3 16 11 23 19 15 8 8 16 1 19-15 3-16-8-25-19-17Z", "M32 18c0-8 5-12 11-13M34 11c6-4 12-2 15 3"],
  book: ["M8 14c10-4 18-2 24 4v34c-6-6-14-8-24-4V14Zm48 0c-10-4-18-2-24 4v34c6-6 14-8 24-4V14Z", "M32 18v34"],
  crayon: ["M18 50 43 9l10 6-25 41-14 4 4-10Z", "m43 9 4-6 10 6-4 6M18 50l10 6"],
  ball: ["M54 32a22 22 0 1 1-44 0 22 22 0 0 1 44 0Z", "M12 23c12 2 21 12 23 30M45 13c-2 12-12 21-30 23M51 42c-12-2-21-12-23-30"],
  flower: ["M32 28c-18-2-17-18-5-17 1-13 17-14 18-2 12-5 20 9 10 16-1 12-17 12-17 0-12 8-22-4-17-13-4-1-14-10-13-17Z", "M32 29v27M31 45c-8-7-15-5-19 1 8 5 14 5 19 0m2-7c8-7 15-5 19 1-8 5-14 5-19 0"],
  paw: ["M21 29c-5 0-8-5-7-10 1-6 5-9 9-7 4 2 5 8 3 12m13-3c-8 0-17 10-17 18 0 7 7 10 17 5 10 5 17 2 17-5 0-8-9-18-17-18Zm11-1c-2-4-1-10 3-12 4-2 8 2 8 7 0 5-4 9-9 9M27 18c0-6 3-11 8-11s8 5 7 11"],
  kite: ["M32 6 54 28 32 50 10 28 32 6Z", "M10 28h44M32 6v44m0 0c5 4 2 8-2 6-5-2-7 3-3 6"],
  star: ["m32 6 7 17 19 1-15 12 5 19-16-10-16 10 5-19L6 24l19-1 7-17Z"],
  backpack: ["M18 22h28c5 0 8 4 8 9v24H10V31c0-5 3-9 8-9Zm5 0v-5c0-7 18-7 18 0v5M17 36h30v12H17V36Zm-7-4H5v15h5m44-15h5v15h-5"],
  blocks: ["M7 34h23v23H7V34Zm27 0h23v23H34V34ZM20 7h24v23H20V7Z", "M15 42h7m-3-4v8m23-4h7M28 15h8m-4-4v8"],
});

export function createWordVisual(visualId) {
  const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  svg.classList.add("word-visual");
  svg.setAttribute("viewBox", "0 0 64 64");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  for (const pathData of ICON_PATHS[visualId] ?? ICON_PATHS.star) {
    const path = document.createElementNS(SVG_NAMESPACE, "path");
    path.setAttribute("d", pathData);
    svg.append(path);
  }

  return svg;
}
