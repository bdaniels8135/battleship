import {
  buildGameboardHtml,
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
} from "./htmlBuilders";

export default function gameOverView(gameOverDisplayInfo) {
  const {
    gameResultString,
    playerOneName,
    playerTwoName,
    playerOneFleetCoords,
    playerTwoFleetCoords,
    playerOneGBHitCoords,
    playerTwoGBHitCoords,
    playerOneGBMissCoords,
    playerTwoGBMissCoords,
  } = gameOverDisplayInfo;

  const playerOneGBLabel = buildTextHtml("p", `${playerOneName}'s Fleet`);
  playerOneGBLabel.id = "player-one-gb-label";
  playerOneGBLabel.classList.add("gb-label");

  const playerTwoGBLabel = buildTextHtml("p", `${playerTwoName}'s Fleet`);
  playerTwoGBLabel.id = "player-two-gb-label";
  playerTwoGBLabel.classList.add("gb-label");

  const playerOneGB = buildGameboardHtml();
  playerOneGB.id = "player-one-gb";
  playerOneGB.classList.add("gameboard");

  playerOneFleetCoords.forEach(([x, y]) => {
    playerOneGB.childNodes[y].childNodes[x].classList.add("occupied");
  });
  playerOneGBHitCoords.forEach(([x, y]) => {
    playerOneGB.childNodes[y].childNodes[x].classList.add("hit");
  });
  playerOneGBMissCoords.forEach(([x, y]) => {
    playerOneGB.childNodes[y].childNodes[x].classList.add("miss");
  });

  const playerTwoGB = buildGameboardHtml();
  playerTwoGB.id = "player-two-gb";
  playerTwoGB.classList.add("gameboard");

  playerTwoFleetCoords.forEach(([x, y]) => {
    playerTwoGB.childNodes[y].childNodes[x].classList.add("occupied");
  });
  playerTwoGBHitCoords.forEach(([x, y]) => {
    playerTwoGB.childNodes[y].childNodes[x].classList.add("hit");
  });
  playerTwoGBMissCoords.forEach(([x, y]) => {
    playerTwoGB.childNodes[y].childNodes[x].classList.add("miss");
  });

  const announcementTextBox = buildTextHtml("p", `${gameResultString}`);
  announcementTextBox.id = "announcement-text-box";

  const newGameBtn = buildInputHtml("button", "new-game-btn", "new-game-btn");
  newGameBtn.value = "New Game";
  newGameBtn.addEventListener("click", () => {
    window.location.reload();
  });

  const html = wrapHtmlElements(
    "div",
    playerOneGBLabel,
    playerOneGB,
    announcementTextBox,
    playerTwoGB,
    playerTwoGBLabel,
    newGameBtn
  );
  html.id = "game-container";

  return html;
}
