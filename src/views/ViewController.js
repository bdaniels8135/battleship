import playRoundView from "./playRoundView";
import gameStartView from "./gameStartView";
import gameOverView from "./gameOverView";
import turnTransitionModal from "./turnTransitionModal";
import { buildHeaderTextHtml, wrapHtmlElements } from "./htmlBuilders";
import "./index.css";

export function buildPageHeader() {
  const headerText = buildHeaderTextHtml("BATTLESHIP", "1");
  return wrapHtmlElements("header", headerText);
}

export default function ViewController() {
  const body = document.querySelector("body");
  const pageHeader = buildPageHeader();
  const main = document.createElement("main");
  const ttm = turnTransitionModal();
  body.append(pageHeader, main, ttm);

  function clearMain() {
    main.innerHTML = "";
  }

  function displayGameStartView(startBtnClickFunc) {
    clearMain();
    const gsv = gameStartView(startBtnClickFunc);
    main.appendChild(gsv);
  }

  function displayPlayRoundView(roundDisplayInfo, gridCellClickFunc) {
    clearMain();
    const prv = playRoundView();
    main.append(prv);

    const {
      lastMoveResultString,
      currentPlayerFleetCoords,
      currentPlayerGBHitCoords,
      currentPlayerGBMissCoords,
      opposingPlayerGBMissCoords,
      opposingPlayerGBHitCoords,
    } = roundDisplayInfo;

    const announcementTextBox = document.querySelector(
      "#announcement-text-box"
    );
    announcementTextBox.innerText = lastMoveResultString;

    const currentPlayerGBGrid = document.querySelector("#current-player-gb");
    currentPlayerFleetCoords.forEach(([x, y]) => {
      currentPlayerGBGrid.childNodes[y].childNodes[x].classList.add("occupied");
    });
    currentPlayerGBHitCoords.forEach(([x, y]) => {
      currentPlayerGBGrid.childNodes[y].childNodes[x].classList.add("hit");
    });
    currentPlayerGBMissCoords.forEach(([x, y]) => {
      currentPlayerGBGrid.childNodes[y].childNodes[x].classList.add("miss");
    });

    const opposingPlayerGBGrid = document.querySelector("#opponent-player-gb");
    opposingPlayerGBHitCoords.forEach(([x, y]) => {
      opposingPlayerGBGrid.childNodes[y].childNodes[x].classList.add("hit");
    });
    opposingPlayerGBMissCoords.forEach(([x, y]) => {
      opposingPlayerGBGrid.childNodes[y].childNodes[x].classList.add("miss");
    });
    opposingPlayerGBGrid.childNodes.forEach((gridRow) => {
      gridRow.childNodes.forEach((gridCell) => {
        gridCell.addEventListener("click", gridCellClickFunc);
      });
    });

    const resignBtn = document.querySelector("#resign-btn");
    resignBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }

  function displayGameOverView(gameOverDisplayInfo) {
    clearMain();
    const gov = gameOverView();
    main.appendChild(gov);

    const {
      gameResultString,
      playerOneFleetCoords,
      playerTwoFleetCoords,
      playerOneGBHitCoords,
      playerTwoGBHitCoords,
      playerOneGBMissCoords,
      playerTwoGBMissCoords,
    } = gameOverDisplayInfo;

    const announcementTextBox = document.querySelector(
      "#announcement-text-box"
    );
    announcementTextBox.innerText = gameResultString;

    const playerOneGBGrid = document.querySelector("#player-one-gb");
    playerOneFleetCoords.forEach(([x, y]) => {
      playerOneGBGrid.childNodes[y].childNodes[x].classList.add("occupied");
    });
    playerOneGBHitCoords.forEach(([x, y]) => {
      playerOneGBGrid.childNodes[y].childNodes[x].classList.add("hit");
    });
    playerOneGBMissCoords.forEach(([x, y]) => {
      playerOneGBGrid.childNodes[y].childNodes[x].classList.add("miss");
    });

    const playerTwoGBGrid = document.querySelector("#player-two-gb");
    playerTwoFleetCoords.forEach(([x, y]) => {
      playerTwoGBGrid.childNodes[y].childNodes[x].classList.add("occupied");
    });
    playerTwoGBHitCoords.forEach(([x, y]) => {
      playerTwoGBGrid.childNodes[y].childNodes[x].classList.add("hit");
    });
    playerTwoGBMissCoords.forEach(([x, y]) => {
      playerTwoGBGrid.childNodes[y].childNodes[x].classList.add("miss");
    });

    const newGameBtn = document.querySelector("#new-game-btn");
    newGameBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }

  function displayTurnTransitionModal(announcementText) {
    const modalTextBox = document.querySelector("#modal-text-box");
    modalTextBox.innerText = announcementText;
    ttm.showModal();
  }

  return {
    displayGameStartView,
    displayPlayRoundView,
    displayGameOverView,
    displayTurnTransitionModal,
  };
}
