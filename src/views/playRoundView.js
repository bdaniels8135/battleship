import {
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
} from "./htmlBuilders";

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

export default function playRoundView() {
  const currentPlayerGBLabel = buildTextHtml("p", "Your Gameboard");
  currentPlayerGBLabel.id = "current-player-gb-label";
  currentPlayerGBLabel.classList.add("gb-label");

  const opponentPlayerGBLabel = buildTextHtml("p", "Opponent's Gameboard");
  opponentPlayerGBLabel.id = "opponent-player-gb-label";
  opponentPlayerGBLabel.classList.add("gb-label");

  const currentPlayerGB = buildGameboardHtml();
  currentPlayerGB.id = "current-player-gb";
  currentPlayerGB.classList.add("gameboard");

  const opponentPlayerGB = buildGameboardHtml();
  opponentPlayerGB.id = "opponent-player-gb";
  opponentPlayerGB.classList.add("gameboard");

  const announcementTextBox = buildTextHtml("p", "Announcement Text Box");
  announcementTextBox.id = "announcement-text-box";

  const resetBtn = buildInputHtml("button", "resign-btn", "resign-btn");
  resetBtn.value = "Resign Game";

  const html = wrapHtmlElements(
    "div",
    currentPlayerGBLabel,
    currentPlayerGB,
    announcementTextBox,
    opponentPlayerGB,
    opponentPlayerGBLabel,
    resetBtn
  );
  html.id = "game-container";

  return html;
}
