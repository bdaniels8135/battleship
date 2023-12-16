import {
  buildGameboardHtml,
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
} from "./htmlBuilders";

export default function gameOverView() {
  const playerOneGBLabel = buildTextHtml("p", "Player One's Gameboard");
  playerOneGBLabel.id = "player-one-gb-label";
  playerOneGBLabel.classList.add("gb-label");

  const playerTwoGBLabel = buildTextHtml("p", "Player Two's Gameboard");
  playerTwoGBLabel.id = "player-two-gb-label";
  playerTwoGBLabel.classList.add("gb-label");

  const playerOneGB = buildGameboardHtml();
  playerOneGB.id = "player-one-gb";
  playerOneGB.classList.add("gameboard");

  const playerTwoGB = buildGameboardHtml();
  playerTwoGB.id = "player-two-gb";
  playerTwoGB.classList.add("gameboard");

  const announcementTextBox = buildTextHtml("p", "Announcement Text Box");
  announcementTextBox.id = "announcement-text-box";

  const resetBtn = buildInputHtml("button", "new-game-btn", "new-game-btn");
  resetBtn.value = "New Game";

  const html = wrapHtmlElements(
    "div",
    playerOneGBLabel,
    playerOneGB,
    announcementTextBox,
    playerTwoGB,
    playerTwoGBLabel,
    resetBtn
  );
  html.id = "game-container";

  return html;
}
