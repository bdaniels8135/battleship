import playRoundView from "./playRoundView";
import gameStartView from "./gameStartView";
import { buildPageHeader } from "./htmlBuilder";
import "./index.css";

export default function ViewController() {
  const body = document.querySelector("body");
  const pageHeader = buildPageHeader();
  const main = document.createElement("main");
  body.append(pageHeader, main);

  function clearMain() {
    main.innerHTML = "";
  }

  function displayGameStartView(startGameFunc) {
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

    const startGameBtn = document.querySelector("#start-game-button");
    startGameBtn.addEventListener("click", () => {
      if (playerOneSelect.value !== "" && playerTwoSelect.value !== "") {
        startGameFunc({
          playerOneName: playerOneNameInput.value,
          playerTwoName: playerTwoNameInput.value,
          playerOneType: playerOneSelect.value,
          playerTwoType: playerTwoSelect.value,
        });
      }
      // Display form validation text?
    });
  }

  function displayPlayRoundView() {
    clearMain();
    const prv = playRoundView();
    main.appendChild(prv);
  }

  return {
    displayGameStartView,
    displayPlayRoundView,
  };
}
