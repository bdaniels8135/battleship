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
    const gov = gameOverView(gameOverDisplayInfo);
    main.appendChild(gov);
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
