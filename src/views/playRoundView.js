import {
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
  buildGameboardHtml,
  buildGameboardColLabels,
  buildGameboardRowLabels,
} from "./htmlBuilders";

export default function playRoundView(roundDisplayInfo, gridCellClickFunc) {
  const {
    lastMoveResultString,
    currentPlayerFleetCoords,
    currentPlayerGBHitCoords,
    currentPlayerGBMissCoords,
    opposingPlayerGBMissCoords,
    opposingPlayerGBHitCoords,
    currentPlayerName,
    opposingPlayerName,
  } = roundDisplayInfo;

  const currentPlayerGBLabel = buildTextHtml(
    "p",
    `${currentPlayerName}'s Fleet`
  );
  currentPlayerGBLabel.id = "current-player-gb-label";
  currentPlayerGBLabel.classList.add("gb-label");

  const opposingPlayerGBLabel = buildTextHtml(
    "p",
    `${opposingPlayerName}'s Fleet`
  );
  opposingPlayerGBLabel.id = "opposing-player-gb-label";
  opposingPlayerGBLabel.classList.add("gb-label");

  const currentPlayerGB = buildGameboardHtml();
  currentPlayerGB.id = "current-player-gb";
  currentPlayerGB.classList.add("gameboard");

  currentPlayerFleetCoords.forEach(([x, y]) => {
    currentPlayerGB.childNodes[y].childNodes[x].classList.add("occupied");
  });
  currentPlayerGBHitCoords.forEach(([x, y]) => {
    currentPlayerGB.childNodes[y].childNodes[x].classList.add("hit");
  });
  currentPlayerGBMissCoords.forEach(([x, y]) => {
    currentPlayerGB.childNodes[y].childNodes[x].classList.add("miss");
  });

  const opposingPlayerGB = buildGameboardHtml();
  opposingPlayerGB.id = "opposing-player-gb";
  opposingPlayerGB.classList.add("gameboard");

  opposingPlayerGBHitCoords.forEach(([x, y]) => {
    opposingPlayerGB.childNodes[y].childNodes[x].classList.add("hit");
  });
  opposingPlayerGBMissCoords.forEach(([x, y]) => {
    opposingPlayerGB.childNodes[y].childNodes[x].classList.add("miss");
  });

  opposingPlayerGB.childNodes.forEach((gridRow) => {
    gridRow.childNodes.forEach((gridCell) => {
      gridCell.addEventListener("click", gridCellClickFunc);
    });
  });

  const announcementText = buildTextHtml("p", `${lastMoveResultString}`);
  announcementText.id = "announcement-text";
  const announcementTextBox = wrapHtmlElements("div", announcementText);
  announcementTextBox.classList.add("announcement-text-box");

  const resignBtn = buildInputHtml("button", "resign-btn", "resign-btn");
  resignBtn.value = "Resign Game";
  resignBtn.addEventListener("click", () => {
    window.location.reload();
  });

  const gameboardColLabels = buildGameboardColLabels();
  const gameboardRowLabels = buildGameboardRowLabels();

  const currentPlayerGBWithLabels = wrapHtmlElements(
    "div",
    gameboardColLabels.cloneNode(true),
    gameboardRowLabels.cloneNode(true),
    currentPlayerGB
  );
  currentPlayerGBWithLabels.classList.add("gb-container");

  const opposingPlayerGBWithLabels = wrapHtmlElements(
    "div",
    gameboardColLabels.cloneNode(true),
    gameboardRowLabels.cloneNode(true),
    opposingPlayerGB
  );
  opposingPlayerGBWithLabels.classList.add("gb-container");

  const html = wrapHtmlElements(
    "div",
    currentPlayerGBLabel,
    currentPlayerGBWithLabels,
    announcementTextBox,
    opposingPlayerGBWithLabels,
    opposingPlayerGBLabel,
    resignBtn
  );
  html.id = "game-container";

  return html;
}
