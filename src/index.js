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
      if (!game.opposingPlayerIsAI) {
        const modalText = `${roundDisplayInfo.lastMoveResultString}

        Pass the device to ${game.currentPlayer}.`;
        VC.displayTurnTransitionModal(modalText);
      }
      VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
    }
  };
}

function deployPlayerTwoFleetClickFunc(game) {
  return (fleetDeploymentInfo) => {
    game.deployPlayerTwoFleet(fleetDeploymentInfo);
    game.start();
    const roundDisplayInfo = getRoundDisplayInfo(game);
    const gridCellClickFunc = buildGridCellClickFunc(game);
    if (!game.playerOneIsAI) {
      const modalText = `Deployment phase complete.
      Pass the device to ${game.playerOne}.`;
      VC.displayTurnTransitionModal(modalText);
    }
    VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
  };
}

function deployPlayerOneFleetClickFunc(game) {
  return (fleetDeploymentInfo) => {
    game.deployPlayerOneFleet(fleetDeploymentInfo);
    if (!game.playerTwoIsAI)
      VC.displayFleetDeploymentView(
        game.playerTwo,
        VC.displayFleetDeploymentView,
        deployPlayerTwoFleetClickFunc(game)
      );
    else {
      game.start();
      const roundDisplayInfo = getRoundDisplayInfo(game);
      const gridCellClickFunc = buildGridCellClickFunc(game);
      VC.displayPlayRoundView(roundDisplayInfo, gridCellClickFunc);
    }
  };
}

function newStartBtnClickFunc(playerInfo) {
  const game = new Game(playerInfo);
  const { playerOneName, playerTwoName } = playerInfo;
  if (!game.playerOneIsAI)
    VC.displayFleetDeploymentView(
      playerOneName,
      VC.displayFleetDeploymentView,
      deployPlayerOneFleetClickFunc(game)
    );
  else if (!game.playerTwoIsAI)
    VC.displayFleetDeploymentView(
      playerTwoName,
      VC.displayFleetDeploymentView,
      deployPlayerTwoFleetClickFunc(game)
    );
  else {
    game.start();
    const gameOverDisplayInfo = getGameOverDisplayInfo(game);
    VC.displayGameOverView(gameOverDisplayInfo);
  }
}

VC.displayGameStartView(newStartBtnClickFunc);
