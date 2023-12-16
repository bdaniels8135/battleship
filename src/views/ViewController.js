import playRoundView from "./playRoundView";
import gameStartView from "./gameStartView";
import gameOverView from "./gameOverView";
import { buildPageHeader } from "./htmlBuilders";
import "./index.css";

export default function ViewController() {
  const body = document.querySelector("body");
  const pageHeader = buildPageHeader();
  const main = document.createElement("main");
  body.append(pageHeader, main);

  function clearMain() {
    main.innerHTML = "";
  }

  function displayGameStartView(startBtnClickFunc) {
    clearMain();
    const gsv = gameStartView();
    main.appendChild(gsv);

    const playerOneSelect = document.querySelector("#player-one-select");
    const playerOneNameInput = document.querySelector("#player-one-name");
    playerOneSelect.addEventListener("change", () => {
      playerOneNameInput.classList.remove("displayed");
      playerOneNameInput.value = "";
      if (playerOneSelect.value === "Human")
        playerOneNameInput.classList.add("displayed");
    });

    const playerTwoSelect = document.querySelector("#player-two-select");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    playerTwoSelect.addEventListener("change", () => {
      playerTwoNameInput.classList.remove("displayed");
      playerTwoNameInput.value = "";
      if (playerTwoSelect.value === "Human")
        playerTwoNameInput.classList.add("displayed");
    });

    function validateNameInputs() {
      let returnValue = true;
      playerOneNameInput.classList.remove("invalid");
      playerTwoNameInput.classList.remove("invalid");
      if (
        playerOneSelect.value === "Human" &&
        playerOneNameInput.value.trim() === ""
      ) {
        playerOneNameInput.classList.add("invalid");
        returnValue = false;
      }
      if (
        playerTwoSelect.value === "Human" &&
        playerTwoNameInput.value.trim() === ""
      ) {
        playerTwoNameInput.classList.add("invalid");
        returnValue = false;
      }
      return returnValue;
    }

    playerOneNameInput.addEventListener("focusout", validateNameInputs);
    playerTwoNameInput.addEventListener("focusout", validateNameInputs);

    const startGameBtn = document.querySelector("#start-game-button");
    startGameBtn.addEventListener("click", () => {
      if (
        validateNameInputs() &&
        playerOneSelect.value !== "" &&
        playerTwoSelect.value !== ""
      ) {
        startBtnClickFunc({
          playerOneName: playerOneNameInput.value,
          playerTwoName: playerTwoNameInput.value,
        });
      }
    });
  }

  function displayPlayRoundView(roundDisplayInfo, gridCellClickFunc) {
    clearMain();
    const prv = playRoundView();
    main.appendChild(prv);

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
    opposingPlayerGBMissCoords.forEach(([x, y]) => {
      opposingPlayerGBGrid.childNodes[y].childNodes[x].classList.add("hit");
    });
    opposingPlayerGBHitCoords.forEach(([x, y]) => {
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

  return {
    displayGameStartView,
    displayPlayRoundView,
    displayGameOverView,
  };
}
