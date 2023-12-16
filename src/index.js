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

    if (game.isOver) {
      const gameOverDisplayInfo = {
        gameResultString: `${game.winner} has won the battle!`,
        playerOneName: game.playerOne,
        playerTwoName: game.playerTwo,
        playerOneFleetCoords: game.playerOneFleetCoords,
        playerTwoFleetCoords: game.playerTwoFleetCoords,
        playerOneGBHitCoords: game.playerOneGBHitCoords,
        playerTwoGBHitCoords: game.playerTwoGBHitCoords,
        playerOneGBMissCoords: game.playerOneGBMissCoords,
        playerTwoGBMissCoords: game.playerTwoGBMissCoords,
      };
      VC.displayGameOverView(gameOverDisplayInfo);
      return;
    }

    let resultString;
    if (roundResult.isShipSunk) {
      resultString = `${attackCoord} Attacked!\n${roundResult.attackedPlayer}'s ship was sunk!`;
    } else if (roundResult.isAHit) {
      resultString = `${attackCoord} Attacked!\n ${roundResult.attackedPlayer}'s ship was hit!`;
    } else
      resultString = `${attackCoord} Attacked!\n ${roundResult.attackingPlayer} missed!`;
    const roundDisplayInfo = {
      lastMoveResultString: resultString,
      currentPlayerName: game.currentPlayer,
      currentPlayerFleetCoords: game.currentPlayerFleetCoords,
      currentPlayerGBHitCoords: game.currentPlayerGBHitCoords,
      currentPlayerGBMissCoords: game.currentPlayerGBMissCoords,
      opposingPlayerName: game.opposingPlayer,
      opposingPlayerGBMissCoords: game.opposingPlayerGBMissCoords,
      opposingPlayerGBHitCoords: game.opposingPlayerGBHitCoords,
    };

    if (game.opposingPlayer !== "Skynet")
      VC.displayTurnTransitionModal(resultString);

    VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
  };
}

function startBtnClickFunc(playerNames) {
  const game = new Game(playerNames);
  const roundDisplayInfo = {
    lastMoveResultString: "This is war!\n ",
    currentPlayerName: game.currentPlayer,
    currentPlayerFleetCoords: game.currentPlayerFleetCoords,
    currentPlayerGBHitCoords: game.currentPlayerGBHitCoords,
    currentPlayerGBMissCoords: game.currentPlayerGBMissCoords,
    opposingPlayerName: game.opposingPlayer,
    opposingPlayerGBMissCoords: game.opposingPlayerGBMissCoords,
    opposingPlayerGBHitCoords: game.opposingPlayerGBHitCoords,
  };

  const gridCellClickFunc = buildGridCellClickFunc(game);

  VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
}

VC.displayGameStartView(startBtnClickFunc);
