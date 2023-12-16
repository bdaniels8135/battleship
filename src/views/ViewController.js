import playRoundView from "./playRoundView";
import gameStartView from "./gameStartView";
import gameOverView from "./gameOverView";
import turnTransitionModal from "./turnTransitionModal";
import { buildPageHeader } from "./htmlBuilders";
import "./index.css";

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
    const prv = playRoundView(roundDisplayInfo, gridCellClickFunc);
    main.append(prv);
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
