const Gameboard = require("./Gameboard");
const Player = require("./Player");

class Game {
  #playerOne;

  #playerTwo;

  #currentPlayer;

  constructor(playerOneName, playerTwoName) {
    this.#playerOne = new Player(playerOneName);
    this.#playerTwo = new Player(playerTwoName);
    this.#currentPlayer = this.#playerOne;
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
    this.#playerOne.gb = new Gameboard(fleetCoords);
    this.#playerTwo.gb = new Gameboard(fleetCoords);
  }

  #switchPlayers() {
    this.#currentPlayer =
      this.#currentPlayer === this.#playerOne
        ? this.#playerTwo
        : this.#playerOne;
  }

  playRound(attackCoords) {
    const attackReport = this.#currentPlayer.gb.receiveAttack(attackCoords);
    this.#switchPlayers();
    if (this.#currentPlayer.isAI) this.playRound([0, 0]);
    return attackReport;
  }

  get currentPlayer() {
    return this.#currentPlayer.name;
  }
}

module.exports = Game;
