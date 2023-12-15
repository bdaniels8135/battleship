import Game from "./gameLogic/Game";
import ViewController from "./views/ViewController";

const VC = ViewController();

function buildGridCellClickFunc(game) {
  return function gridCellClickFunc(event) {
    const attackCoordsString = event.target.id.slice(-2);
    const attackCoord = [
      Number(attackCoordsString[0]),
      Number(attackCoordsString[1]),
    ];
    const roundResult = game.playRound(attackCoord);
    console.log(roundResult);
    let resultString;
    if (roundResult.isShipSunk)
      resultString = `${attackCoord} Attacked!
    Your ship was sunk!`;
    else if (roundResult.isAHit)
      resultString = `${attackCoord} Attacked! 
    Your ship was hit!`;
    else
      resultString = `${attackCoord} Attacked! 
    They missed!`;

    const roundDisplayInfo = {
      lastMoveResultString: resultString,
      currentPlayerFleetCoords: game.currentPlayerFleetCoords,
      currentPlayerGBHitCoords: game.currentPlayerGBHitCoords,
      currentPlayerGBMissCoords: game.currentPlayerGBMissCoords,
      opponentPlayerGBMissCoords: game.opponentPlayerGBMissCoords,
      opponentPlayerGBHitCoords: game.opponentPlayerGBHitCoords,
    };
    VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
  };
}

function startBtnClickFunc(playerNames) {
  const game = new Game(playerNames);
  const roundDisplayInfo = {
    lastMoveResultString: "This is war!",
    currentPlayerFleetCoords: game.currentPlayerFleetCoords,
    currentPlayerGBHitCoords: game.currentPlayerGBHitCoords,
    currentPlayerGBMissCoords: game.currentPlayerGBMissCoords,
    opponentPlayerGBMissCoords: game.opponentPlayerGBMissCoords,
    opponentPlayerGBHitCoords: game.opponentPlayerGBHitCoords,
  };

  const gridCellClickFunc = buildGridCellClickFunc(game);

  VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
}

VC.displayGameStartView(startBtnClickFunc);
