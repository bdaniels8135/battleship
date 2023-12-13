import playRoundView from "./playRoundView";
import gameStartView from "./gameStartView";

export default function ViewController() {
  const body = document.querySelector("body");

  function clearPage() {
    body.innerHTML = "";
  }

  function displayGameStartView() {
    clearPage();
    const gsv = gameStartView();
    body.appendChild(gsv);
  }

  function displayPlayRoundView() {
    clearPage();
    const prv = playRoundView();
    body.appendChild(prv);
  }

  return {
    displayGameStartView,
    displayPlayRoundView,
  };
}
