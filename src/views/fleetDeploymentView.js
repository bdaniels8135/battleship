import {
  buildGameboardHtml,
  buildInputHtml,
  buildTextHtml,
  buildGameboardColLabels,
  buildGameboardRowLabels,
  wrapHtmlElements,
} from "./htmlBuilders";

function* shipInfoGen() {
  const fleetInfo = [
    {
      type: "Carrier",
      length: 5,
    },
    {
      type: "Battleship",
      length: 4,
    },
    {
      type: "Cruiser",
      length: 3,
    },
    {
      type: "Submarine",
      length: 3,
    },
    {
      type: "Patrol Boat",
      length: 2,
    },
  ];
  while (fleetInfo.length !== 0) {
    yield fleetInfo.shift();
  }
}

export default function fleetDeploymentView(playerName, resetFunc, deployFunc) {
  const fleetInfo = shipInfoGen();
  let currentShipInfo = fleetInfo.next().value;
  const instructionsTextHtml = buildTextHtml(
    "p",
    `${playerName}, deploy your ${currentShipInfo.type}.
    (${currentShipInfo.length} Spaces Needed)`
  );
  instructionsTextHtml.id = "fleet-deployment-instructions";

  const rotateShipBtn = buildInputHtml(
    "button",
    "rotate-ship-btn",
    "rotate-ship-btn"
  );
  rotateShipBtn.value = "Deploy Horizontally";
  rotateShipBtn.addEventListener("click", () => {
    rotateShipBtn.value =
      rotateShipBtn.value === "Deploy Horizontally"
        ? "Deploy Vertically"
        : "Deploy Horizontally";
  });

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

  function shipWillFit(clickedCellCoords) {
    const [x, y] = clickedCellCoords;
    if (rotateShipBtn.value === "Deploy Horizontally")
      return 10 - x >= currentShipInfo.length;
    return 10 - y >= currentShipInfo.length;
  }

  function getDeploymentCellsCoords(clickedCellCoords) {
    const [x, y] = clickedCellCoords;
    return [...Array(currentShipInfo.length)].map((val, ind) => {
      if (rotateShipBtn.value === "Deploy Horizontally") return [x + ind, y];
      return [x, y + ind];
    });
  }

  function getDeploymentCells(deploymentCellsCoords) {
    return deploymentCellsCoords.map(
      ([x, y]) => gameboard.childNodes[y].childNodes[x]
    );
  }

  function cellsAreUnoccupied(deploymentCells) {
    return deploymentCells.every(
      (cell) => !cell.classList.contains("occupied")
    );
  }

  function markCellsAsOccupied(deploymentCells) {
    return deploymentCells.forEach((cell) => {
      cell.classList.add("occupied");
    });
  }

  const fleetDeploymentInfo = {};
  function placeShip(event) {
    const clickedCellCoordsString = event.target.id.slice(-2);
    const clickedCellCoords = [
      Number(clickedCellCoordsString[0]),
      Number(clickedCellCoordsString[1]),
    ];

    if (shipWillFit(clickedCellCoords)) {
      const deploymentCellsCoords = getDeploymentCellsCoords(clickedCellCoords);
      const deploymentCells = getDeploymentCells(deploymentCellsCoords);
      if (cellsAreUnoccupied(deploymentCells)) {
        markCellsAsOccupied(deploymentCells);
        fleetDeploymentInfo[currentShipInfo.type] = deploymentCellsCoords;
        currentShipInfo = fleetInfo.next().value;
        if (currentShipInfo != null) {
          instructionsTextHtml.innerText = `${playerName}, deploy your ${currentShipInfo.type}.
          (${currentShipInfo.length} Spaces Needed)`;
        } else {
          instructionsTextHtml.innerText =
            "Ready to deploy the fleet\nat your command!";
        }
      }
    }
  }

  gameboard.childNodes.forEach((gridRow) => {
    gridRow.childNodes.forEach((gridCell) => {
      gridCell.addEventListener("click", placeShip);
    });
  });

  const resetDeploymentBtn = buildInputHtml(
    "button",
    "reset-deployment-btn",
    "reset-deployment-btn"
  );
  resetDeploymentBtn.value = "Reset Deployment";
  resetDeploymentBtn.addEventListener("click", () => {
    resetFunc(playerName, resetFunc, deployFunc);
  });

  const deployBtn = buildInputHtml("button", "deploy-btn", "deploy-btn");
  deployBtn.value = "Deploy Fleet";
  deployBtn.addEventListener("click", () => {
    if (currentShipInfo == null) deployFunc(fleetDeploymentInfo);
  });

  const html = wrapHtmlElements(
    "div",
    instructionsTextHtml,
    rotateShipBtn,
    gameboardWithLabels,
    resetDeploymentBtn,
    deployBtn
  );
  html.id = "fleet-deployment-container";

  return html;
}
