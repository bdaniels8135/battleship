import ViewController from "./views/ViewController";

function gameStartFunc() {
  console.log("START THE GAME!");
}

const VC = ViewController();
VC.displayGameStartView(gameStartFunc);
