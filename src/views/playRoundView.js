import {
  buildTextHtml,
  wrapHtmlElements,
  buildInputHtml,
  buildGameboardHtml,
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

  const announcementTextBox = buildTextHtml("p", `${lastMoveResultString}`);
  announcementTextBox.id = "announcement-text-box";

  const resignBtn = buildInputHtml("button", "resign-btn", "resign-btn");
  resignBtn.value = "Resign Game";
  resignBtn.addEventListener("click", () => {
    window.location.reload();
  });

  const html = wrapHtmlElements(
    "div",
    currentPlayerGBLabel,
    currentPlayerGB,
    announcementTextBox,
    opposingPlayerGB,
    opposingPlayerGBLabel,
    resignBtn
  );
  html.id = "game-container";

  return html;
}
