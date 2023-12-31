import {
  buildGameboardHtml,
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
  buildGameboardColLabels,
  buildGameboardRowLabels,
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

  const announcementText = buildTextHtml("p", `${gameResultString}`);
  announcementText.id = "announcement-text";
  const announcementTextBox = wrapHtmlElements("div", announcementText);
  announcementTextBox.classList.add("announcement-text-box");

  const newGameBtn = buildInputHtml("button", "new-game-btn", "new-game-btn");
  newGameBtn.value = "New Game";
  newGameBtn.addEventListener("click", () => {
    window.location.reload();
  });

  const gameboardColLabels = buildGameboardColLabels();
  const gameboardRowLabels = buildGameboardRowLabels();

  const playerOneGBWithLabels = wrapHtmlElements(
    "div",
    gameboardColLabels.cloneNode(true),
    gameboardRowLabels.cloneNode(true),
    playerOneGB
  );
  playerOneGBWithLabels.classList.add("gb-container");
  playerOneGBWithLabels.id = "player-one-gb-container";

  const playerTwoGBWithLabels = wrapHtmlElements(
    "div",
    gameboardColLabels.cloneNode(true),
    gameboardRowLabels.cloneNode(true),
    playerTwoGB
  );
  playerTwoGBWithLabels.classList.add("gb-container");
  playerTwoGBWithLabels.id = "player-two-gb-container";

  const html = wrapHtmlElements(
    "div",
    playerOneGBLabel,
    playerOneGBWithLabels,
    announcementTextBox,
    playerTwoGBWithLabels,
    playerTwoGBLabel,
    newGameBtn
  );
  html.id = "game-container";

  return html;
}
