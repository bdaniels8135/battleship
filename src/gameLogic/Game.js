const Gameboard = require("./Gameboard");
const Player = require("./Player");

class Game {
  #playerOne;

  #playerTwo;

  #currentPlayer;

  #opposingPlayer;

  constructor(playerInfo) {
    const { playerOneName, playerTwoName, playerOneType, playerTwoType } =
      playerInfo;
    this.#playerOne = new Player(playerOneName, playerOneType);
    this.#playerTwo = new Player(playerTwoName, playerTwoType);
    if (this.#playerOne.isAI)
      this.#playerOne.gb = new Gameboard(Player.getAIFleetDeploymentInfo());
    if (this.#playerTwo.isAI)
      this.#playerTwo.gb = new Gameboard(Player.getAIFleetDeploymentInfo());
    this.#currentPlayer = this.#playerOne;
    this.#opposingPlayer = this.#playerTwo;
    if (this.#playerOne.isAI) this.playRound(this.#playerOne.getAIMove());
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

  get playerOneIsAI() {
    return this.#playerOne.isAI;
  }

  get playerTwo() {
    return this.#playerTwo.name;
  }

  get playerTwoIsAI() {
    return this.#playerTwo.isAI;
  }

  get currentPlayer() {
    return this.#currentPlayer.name;
  }

  get currentPlayerIsAI() {
    return this.#currentPlayer.isAI;
  }

  get opposingPlayer() {
    return this.#opposingPlayer.name;
  }

  get opposingPlayerIsAI() {
    return this.#opposingPlayer.isAI;
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
