import Game from "./gameLogic/Game";
import ViewController from "./views/ViewController";

const VC = ViewController();

function getGameOverDisplayInfo(game) {
  return {
    gameResultString: `${game.winner} has won!`,
    playerOneName: game.playerOne,
    playerTwoName: game.playerTwo,
    playerOneFleetCoords: game.playerOneFleetCoords,
    playerTwoFleetCoords: game.playerTwoFleetCoords,
    playerOneGBHitCoords: game.playerOneGBHitCoords,
    playerTwoGBHitCoords: game.playerTwoGBHitCoords,
    playerOneGBMissCoords: game.playerOneGBMissCoords,
    playerTwoGBMissCoords: game.playerTwoGBMissCoords,
  };
}

function getRoundDisplayInfo(game, roundResult, attackCoord) {
  let resultString;
  if (roundResult != null) {
    if (roundResult.isShipSunk) {
      resultString = `${attackCoord} Attacked!\n${roundResult.attackedPlayer}'s ship was sunk!`;
    } else if (roundResult.isAHit) {
      resultString = `${attackCoord} Attacked!\n ${roundResult.attackedPlayer}'s ship was hit!`;
    } else
      resultString = `${attackCoord} Attacked!\n ${roundResult.attackingPlayer} missed!`;
  }
  return {
    lastMoveResultString: resultString ?? "This is war!\n ",
    currentPlayerName: game.currentPlayer,
    currentPlayerFleetCoords: game.currentPlayerFleetCoords,
    currentPlayerGBHitCoords: game.currentPlayerGBHitCoords,
    currentPlayerGBMissCoords: game.currentPlayerGBMissCoords,
    opposingPlayerName: game.opposingPlayer,
    opposingPlayerGBMissCoords: game.opposingPlayerGBMissCoords,
    opposingPlayerGBHitCoords: game.opposingPlayerGBHitCoords,
  };
}

function buildGridCellClickFunc(game) {
  return function gridCellClickFunc(event) {
    const attackCoordsString = event.target.id.slice(-2);
    const attackCoord = [
      Number(attackCoordsString[0]),
      Number(attackCoordsString[1]),
    ];
    const roundResult = game.playRound(attackCoord);

    if (game.isOver) {
      const gameOverDisplayInfo = getGameOverDisplayInfo(game);
      VC.displayGameOverView(gameOverDisplayInfo);
    } else {
      const roundDisplayInfo = getRoundDisplayInfo(
        game,
        roundResult,
        attackCoord
      );
      if (game.opposingPlayer !== "Skynet")
        VC.displayTurnTransitionModal(roundDisplayInfo.lastMoveResultString);
      VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
    }
  };
}

function startBtnClickFunc(playerNames) {
  const game = new Game(playerNames);

  if (game.isOver) {
    const gameOverDisplayInfo = getGameOverDisplayInfo(game);
    VC.displayGameOverView(gameOverDisplayInfo);
  } else {
    const roundDisplayInfo = getRoundDisplayInfo(game);
    const gridCellClickFunc = buildGridCellClickFunc(game);
    VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
  }
}

VC.displayGameStartView(startBtnClickFunc);
