export function wrapHtmlElements(wrapperTag, ...elements) {
  const wrapperHtml = document.createElement(wrapperTag);
  wrapperHtml.append(...elements);
  return wrapperHtml;
}

export function buildIconHtml(icon) {
  const iconHtml = document.createElement("img");
  iconHtml.src = icon;
  return iconHtml;
}

export function buildTextHtml(htmlTag, text) {
  const textHtml = document.createElement(htmlTag);
  textHtml.innerText = text;
  return textHtml;
}

export function buildLabelHtml(inputId, text) {
  const labelHtml = document.createElement("label");
  labelHtml.innerText = text;
  labelHtml.for = inputId;
  return labelHtml;
}

export function buildInputHtml(type, id, name) {
  const inputHtml = document.createElement("input");
  inputHtml.type = type;
  inputHtml.name = name;
  if (id) inputHtml.id = id;
  return inputHtml;
}

export function buildHeaderTextHtml(headerText, headerLevel) {
  const headerTextHtml = document.createElement(`h${headerLevel}`);
  headerTextHtml.innerHTML = headerText;
  return headerTextHtml;
}

export function buildSelectOption(text, value) {
  const optionHtml = document.createElement("option");
  optionHtml.value = value;
  optionHtml.innerText = text;
  return optionHtml;
}

function buildInstructionsSpanHtml(instructionsText) {
  const inputInstructionsSpanHtml = buildTextHtml("span", instructionsText);
  inputInstructionsSpanHtml.classList.add("input-instructions");
  return inputInstructionsSpanHtml;
}

function buildErrorSpanHtml() {
  const errorSpanHtml = buildTextHtml("span", "");
  errorSpanHtml.classList.add("error-message");
  return errorSpanHtml;
}

export function buildLabeledInputHtml(
  inputHtml,
  instructionsText,
  isRequired = false
) {
  const labeledInputHtml = buildLabelHtml(inputHtml.id);
  const instructionsSpanHtml = buildInstructionsSpanHtml(instructionsText);
  if (isRequired) {
    const requiredMark = buildTextHtml("span", "*");
    requiredMark.classList.add("required-mark");
    instructionsSpanHtml.appendChild(requiredMark);
  }
  labeledInputHtml.append(
    instructionsSpanHtml,
    inputHtml,
    buildErrorSpanHtml()
  );
  return labeledInputHtml;
}

export function buildGameboardHtml() {
  const rows = [...Array(10)].map((rowVal, rowInd) => {
    const rowCells = [...Array(10)].map((colVal, colInd) => {
      const cell = wrapHtmlElements("div");
      cell.id = `gb-cell-${colInd}${rowInd}`;
      cell.classList.add("gb-cell");
      return cell;
    });
    const rowHtml = wrapHtmlElements("div", ...rowCells);
    rowHtml.classList.add("gb-row");
    return rowHtml;
  });
  const html = wrapHtmlElements("div", ...rows);
  html.classList.add("gameboard");
  return html;
}

export function buildPageHeader() {
  const headerText = buildHeaderTextHtml("BATTLESHIP", "1");
  return wrapHtmlElements("header", headerText);
}
