import {
  buildGameboardHtml,
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
} from "./htmlBuilder";
import "./playRoundView.css";

export default function playRoundView() {
  const playerOneGBText = buildTextHtml("p", "Your Gameboard");
  playerOneGBText.id = "player-one-gb-text";
  const playerTwoGBText = buildTextHtml("p", "Opponent's Gameboard");
  playerTwoGBText.id = "player-two-gb-text";

  const playerOneGBHtml = buildGameboardHtml();
  playerOneGBHtml.id = "player-one-gb";
  const playerTwoGBHtml = buildGameboardHtml();
  playerTwoGBHtml.id = "player-two-gb";

  const announcementTextBox = buildTextHtml("p", "Announcement Text Box");
  announcementTextBox.id = "announcement-text-box";

  const resetBtn = buildInputHtml("button", "reset-btn", "reset-btn");
  resetBtn.value = "Resign/New Game";

  const html = wrapHtmlElements(
    "main",
    playerOneGBText,
    playerOneGBHtml,
    announcementTextBox,
    playerTwoGBHtml,
    playerTwoGBText,
    resetBtn
  );
  html.id = "game-container";

  return html;
}
