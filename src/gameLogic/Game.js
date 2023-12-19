const Gameboard = require("./Gameboard");
const Player = require("./Player");

const defaultFleetDeploymentInfo = {
  Carrier: [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  Battleship: [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  Cruiser: [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  Submarine: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  "Patrol Boat": [
    [0, 0],
    [0, 1],
  ],
};

class Game {
  #playerOne;

  #playerTwo;

  #currentPlayer;

  #opposingPlayer;

  constructor(playerNames) {
    const { playerOneName, playerTwoName } = playerNames;
    this.#playerOne = new Player(playerOneName);
    this.#playerTwo = new Player(playerTwoName);
    if (this.#playerOne.isAI)
      this.#playerOne.gb = new Gameboard(defaultFleetDeploymentInfo);
    if (this.#playerTwo.isAI)
      this.#playerTwo.gb = new Gameboard(defaultFleetDeploymentInfo);
    this.#currentPlayer = this.#playerOne;
    this.#opposingPlayer = this.#playerTwo;
    if (!playerOneName) this.playRound(this.#currentPlayer.getAIMove());
  }

  playRound(attackCoords) {
    if (this.isOver) throw new Error("Cannot play rounds after game ends");

    const attackReport = this.#opposingPlayer.gb.receiveAttack(attackCoords);
    attackReport.attackedPlayer = this.#opposingPlayer.name;
    attackReport.attackingPlayer = this.#currentPlayer.name;

    this.#currentPlayer =
      this.#currentPlayer === this.#playerOne
        ? this.#playerTwo
        : this.#playerOne;

    this.#opposingPlayer =
      this.#opposingPlayer === this.#playerOne
        ? this.#playerTwo
        : this.#playerOne;

    if (this.#currentPlayer.isAI && !this.isOver)
      this.playRound(this.#currentPlayer.getAIMove());

    return attackReport;
  }

  deployPlayerOneFleet(fleetDeploymentInfo) {
    if (this.#playerOne.gb == null)
      this.#playerOne.gb = new Gameboard(fleetDeploymentInfo);
  }

  deployPlayerTwoFleet(fleetDeploymentInfo) {
    if (this.#playerTwo.gb == null)
      this.#playerTwo.gb = new Gameboard(fleetDeploymentInfo);
  }

  get playerOne() {
    return this.#playerOne.name;
  }

  get playerTwo() {
    return this.#playerTwo.name;
  }

  get currentPlayer() {
    return this.#currentPlayer.name;
  }

  get opposingPlayer() {
    return this.#opposingPlayer.name;
  }

  get isOver() {
    if (this.#playerOne.gb && this.#playerTwo.gb)
      return this.#playerOne.gb.fleetIsSunk || this.#playerTwo.gb.fleetIsSunk;
    return false;
  }

  get winner() {
    if (this.isOver) {
      return this.#playerOne.gb.fleetIsSunk === true
        ? this.#playerTwo.name
        : this.#playerOne.name;
    }
    return null;
  }

  get currentPlayerFleetCoords() {
    return this.#currentPlayer.gb.fleetCoords;
  }

  get currentPlayerGBHitCoords() {
    return this.#currentPlayer.gb.hitCoords;
  }

  get currentPlayerGBMissCoords() {
    return this.#currentPlayer.gb.missCoords;
  }

  get opposingPlayerGBMissCoords() {
    return this.#opposingPlayer.gb.missCoords;
  }

  get opposingPlayerGBHitCoords() {
    return this.#opposingPlayer.gb.hitCoords;
  }

  get playerOneFleetCoords() {
    return this.#playerOne.gb.fleetCoords;
  }

  get playerTwoFleetCoords() {
    return this.#playerTwo.gb.fleetCoords;
  }

  get playerOneGBHitCoords() {
    return this.#playerOne.gb.hitCoords;
  }

  get playerTwoGBHitCoords() {
    return this.#playerTwo.gb.hitCoords;
  }

  get playerOneGBMissCoords() {
    return this.#playerOne.gb.missCoords;
  }

  get playerTwoGBMissCoords() {
    return this.#playerTwo.gb.missCoords;
  }
}

module.exports = Game;
