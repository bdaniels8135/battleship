import {
  buildGameboardHtml,
  buildInputHtml,
  buildTextHtml,
  buildGameboardColLabels,
  buildGameboardRowLabels,
  wrapHtmlElements,
} from "./htmlBuilders";

export default function fleetDeploymentView(playerName) {
  const instructionsTextHtml = buildTextHtml(
    "p",
    `${playerName}, deploy your Patrol Boat`
  );
  instructionsTextHtml.id = "fleet-deployment-instructions";

  const rotateShipBtn = buildInputHtml(
    "button",
    "rotate-ship-btn",
    "rotate-ship-btn"
  );
  rotateShipBtn.value = "Horizontally";

  const gameboard = buildGameboardHtml();
  const gameboardColLabels = buildGameboardColLabels();
  const gameboardRowLabels = buildGameboardRowLabels();
  const gameboardWithLabels = wrapHtmlElements(
    "div",
    gameboardColLabels.cloneNode(true),
    gameboardRowLabels.cloneNode(true),
    gameboard
  );
  gameboardWithLabels.classList.add("gb-container");
  gameboardWithLabels.id = "deployment-gb-container";

  const html = wrapHtmlElements(
    "div",
    instructionsTextHtml,
    rotateShipBtn,
    gameboardWithLabels
  );
  html.id = "fleet-deployment-container";

  return html;
}
