import {
  buildGameboardHtml,
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
} from "./htmlBuilder";
import "./playRoundView.css";

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

  const resetBtn = buildInputHtml("button", "reset-btn", "reset-btn");
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
