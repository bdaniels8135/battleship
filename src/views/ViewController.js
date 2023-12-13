import playRoundView from "./playRoundView";
import gameStartView from "./gameStartView";
import { buildPageHeader } from "./htmlBuilder";

export default function ViewController() {
  const body = document.querySelector("body");
  const pageHeader = buildPageHeader();
  const main = document.createElement("main");
  body.append(pageHeader, main);

  function clearMain() {
    main.innerHTML = "";
  }

  function displayGameStartView() {
    clearMain();
    const gsv = gameStartView();
    main.appendChild(gsv);
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
