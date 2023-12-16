const Gameboard = require("./Gameboard");
const Player = require("./Player");

const fleetCoords = [
  [
    [0, 0],
    [0, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
];

class Game {
  #playerOne;

  #playerTwo;

  #currentPlayer;

  constructor(playerNames) {
    const { playerOneName, playerTwoName } = playerNames;
    this.#playerOne = new Player(playerOneName);
    this.#playerTwo = new Player(playerTwoName);
    this.#currentPlayer = this.#playerOne;
    this.#playerOne.gb = new Gameboard(fleetCoords);
    this.#playerTwo.gb = new Gameboard(fleetCoords);
    if (!playerOneName) this.playRound(this.#currentPlayer.getAIMove());
  }

  playRound(attackCoords) {
    if (this.isOver) throw new Error("Cannot play rounds after game ends");

    this.#currentPlayer =
      this.#currentPlayer === this.#playerOne
        ? this.#playerTwo
        : this.#playerOne;

    let attackReport = this.#currentPlayer.gb.receiveAttack(attackCoords);

    if (this.#currentPlayer.isAI && !this.isOver)
      attackReport = this.playRound(this.#currentPlayer.getAIMove());

    return attackReport;
  }

  get currentPlayer() {
    return this.#currentPlayer.name;
  }

  get isOver() {
    return this.#playerOne.gb.fleetIsSunk || this.#playerTwo.gb.fleetIsSunk;
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

  get opponentPlayerGBMissCoords() {
    const opponentPlayer =
      this.#currentPlayer === this.#playerOne
        ? this.#playerTwo
        : this.#playerOne;
    return opponentPlayer.gb.missCoords;
  }

  get opponentPlayerGBHitCoords() {
    const opponentPlayer =
      this.#currentPlayer === this.#playerOne
        ? this.#playerTwo
        : this.#playerOne;
    return opponentPlayer.gb.hitCoords;
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
