const _ = require("lodash");

class Player {
  #name;

  #isAI;

  #movesGen;

  constructor(name) {
    this.#name = name || "Skynet";
    this.#isAI = !name;
    if (this.#isAI) this.#movesGen = Player.#buildMovesGen();
  }

  get name() {
    return this.#name;
  }

  get isAI() {
    return this.#isAI;
  }

  static *#buildMovesGen() {
    const legalMoves = [...Array(100)].map((val, ind) => [
      ind % 10,
      Math.floor(ind / 10),
    ]);
    while (legalMoves.length !== 0) {
      const randomMoveIndex = Math.floor(Math.random() * legalMoves.length);
      yield legalMoves.splice(randomMoveIndex, 1)[0];
    }
  }

  getAIMove() {
    if (!this.#isAI)
      throw new Error("Human players cannot use AI move generator");
    return this.#movesGen.next().value;
  }

  static getAIFleetDeploymentInfo() {
    const shipsWithLengths = {
      Carrier: 5,
      Battleship: 4,
      Cruiser: 3,
      Submarine: 3,
      "Patrol Boat": 2,
    };
    const fleetDeploymentInfo = {};
    const occupiedCoords = [];

    function shipWillFit(startCoords, direction, length) {
      if (direction === 0) return 10 - startCoords[0] >= length;
      return 10 - startCoords[1] >= length;
    }

    Object.entries(shipsWithLengths).forEach(([shipType, length]) => {
      while (true) {
        const startPos = Math.floor(Math.random() * 100);
        const startCoords = [startPos % 10, Math.floor(startPos / 10)];
        const direction = Math.floor(Math.random() * 2);
        if (shipWillFit(startCoords, direction, length)) {
          const shipCoords = [];
          if (direction === 0) {
            for (let i = 0; i < length; i += 1) {
              const nextCoords = [startCoords[0] + i, startCoords[1]];
              if (
                !occupiedCoords.some((coords) => _.isEqual(coords, nextCoords))
              )
                shipCoords.push(nextCoords);
            }
            if (shipCoords.length === length) {
              occupiedCoords.push(...shipCoords);
              fleetDeploymentInfo[shipType] = shipCoords;
              break;
            }
          } else {
            for (let i = 0; i < length; i += 1) {
              const nextCoords = [startCoords[0], startCoords[1] + i];
              if (
                !occupiedCoords.some((coords) => _.isEqual(coords, nextCoords))
              )
                shipCoords.push(nextCoords);
            }
            if (shipCoords.length === length) {
              occupiedCoords.push(...shipCoords);
              fleetDeploymentInfo[shipType] = shipCoords;
              break;
            }
          }
        }
      }
    });
    return fleetDeploymentInfo;
  }
}

module.exports = Player;
