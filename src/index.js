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

function getRoundDisplayInfo(game, roundResult, attackCoords) {
  let resultString;
  if (roundResult != null) {
    const attackCoordsString = `${String.fromCharCode(attackCoords[1] + 65)}${
      attackCoords[0] + 1
    }`;
    if (roundResult.isShipSunk) {
      resultString = `${attackCoordsString} Attacked.
      ${roundResult.attackedPlayer}'s ${roundResult.shipType} was sunk!`;
    } else if (roundResult.isAHit) {
      resultString = `${attackCoordsString} Attacked.
      ${roundResult.attackedPlayer}'s ship was hit!`;
    } else
      resultString = `${attackCoordsString} Attacked.
      ${roundResult.attackingPlayer} missed!`;
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

function deployPlayerTwoFleetClickFunc(game) {
  return (fleetDeploymentInfo) => {
    game.deployPlayerTwoFleet(fleetDeploymentInfo);
    const roundDisplayInfo = getRoundDisplayInfo(game);
    const gridCellClickFunc = buildGridCellClickFunc(game);
    VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
  };
}

function deployPlayerOneFleetClickFunc(game) {
  return (fleetDeploymentInfo) => {
    game.deployPlayerOneFleet(fleetDeploymentInfo);
    if (game.playerTwo !== "Skynet")
      VC.displayFleetDeploymentView(
        game.playerTwo,
        VC.displayFleetDeploymentView,
        deployPlayerTwoFleetClickFunc(game)
      );
    else {
      const roundDisplayInfo = getRoundDisplayInfo(game);
      const gridCellClickFunc = buildGridCellClickFunc(game);
      VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
    }
  };
}

function newStartBtnClickFunc(playerNames) {
  const game = new Game(playerNames);
  const { playerOneName, playerTwoName } = playerNames;
  if (playerOneName)
    VC.displayFleetDeploymentView(
      playerOneName,
      VC.displayFleetDeploymentView,
      deployPlayerOneFleetClickFunc(game)
    );
  else if (playerTwoName)
    VC.displayFleetDeploymentView(
      playerTwoName,
      VC.displayFleetDeploymentView,
      deployPlayerTwoFleetClickFunc(game)
    );
  else {
    const gameOverDisplayInfo = getGameOverDisplayInfo(game);
    VC.displayGameOverView(gameOverDisplayInfo);
  }
}

VC.displayGameStartView(newStartBtnClickFunc);
