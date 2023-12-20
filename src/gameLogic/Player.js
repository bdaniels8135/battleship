const _ = require("lodash");

class Player {
  #name;

  #isAI;

  #randomMovesGen;

  #legalMoves;

  #targetQ;

  #previousAttackCoords;

  #type;

  constructor(name, type) {
    this.#name = name;
    this.#type = type;
    this.lastAttackReport = {};
    if (type !== "Human") this.#isAI = true;
    else this.#isAI = false;
    if (this.#type === "Battle Droid")
      this.#randomMovesGen = Player.#buildRandomMoveGen();
    if (this.#type === "Skynet") {
      this.#legalMoves = [...Array(50).keys()]
        .map((val) => 2 * val)
        .map((val) => [val % 10, Math.floor(val / 10)]);
      this.#targetQ = [];
      this.#previousAttackCoords = [];
    }
  }

  get name() {
    return this.#name;
  }

  get isAI() {
    return this.#isAI;
  }

  static *#buildRandomMoveGen() {
    const legalMoves = [...Array(100).keys()].map((val) => [
      val % 10,
      Math.floor(val / 10),
    ]);
    while (legalMoves.length !== 0) {
      const randomMoveIndex = Math.floor(Math.random() * legalMoves.length);
      yield legalMoves.splice(randomMoveIndex, 1)[0];
    }
  }

  getAIMove() {
    if (!this.#isAI)
      throw new Error("human players cannot use AI move generator");
    if (this.#type === "Battle Droid") return this.#randomMovesGen.next().value;
    if (this.#type === "Skynet") return this.#targetedMoveGen();
    return null;
  }

  static #coordIsLegal(coord) {
    const [x, y] = coord;
    return x >= 0 && x <= 9 && y >= 0 && y <= 9;
  }

  #coordHasBeenAttacked(coord) {
    return this.#previousAttackCoords.some((prevAttCoord) =>
      _.isEqual(coord, prevAttCoord)
    );
  }

  #getRandomLegalMove() {
    while (true) {
      const randomInd = Math.floor(Math.random() * this.#legalMoves.length);
      const proposedMove = this.#legalMoves.splice(randomInd, 1)[0];
      if (!this.#coordHasBeenAttacked(proposedMove)) return proposedMove;
    }
  }

  #targetedMoveGen() {
    if (this.lastAttackReport.isAHit && !this.lastAttackReport.isShipSunk) {
      const [lastX, lastY] = this.lastAttackReport.coord;
      const adjCoords = [
        [lastX + 1, lastY],
        [lastX - 1, lastY],
        [lastX, lastY + 1],
        [lastX, lastY - 1],
      ];
      const newTargets = adjCoords.filter(
        (coord) =>
          Player.#coordIsLegal(coord) && !this.#coordHasBeenAttacked(coord)
      );
      this.#targetQ.push(...newTargets);
    }
    if (this.#targetQ.length !== 0) return this.#targetQ.shift();
    return this.#getRandomLegalMove();
  }

  static getAIFleetDeploymentInfo() {
    const shipsWithLengths = [
      ["Carrier", 5],
      ["Battleship", 4],
      ["Cruiser", 3],
      ["Submarine", 3],
      ["Destroyer", 2],
    ];
    const occupiedCoords = [];

    function shipWillFit(startCoords, direction, length) {
      if (direction === 0) return 10 - startCoords[0] >= length;
      return 10 - startCoords[1] >= length;
    }

    function coordsAreUnoccupied(coords) {
      return coords.every((coord) =>
        occupiedCoords.every((occCoord) => !_.isEqual(coord, occCoord))
      );
    }

    const shipsWithCoords = shipsWithLengths.map(([type, length]) => {
      while (true) {
        const startPos = Math.floor(Math.random() * 100);
        const startCoords = [startPos % 10, Math.floor(startPos / 10)];
        const direction = Math.floor(Math.random() * 2);
        if (shipWillFit(startCoords, direction, length)) {
          if (direction === 0) {
            const proposedShipCoords = [...Array(length).keys()].map((val) => [
              startCoords[0] + val,
              startCoords[1],
            ]);
            if (coordsAreUnoccupied(proposedShipCoords)) {
              occupiedCoords.push(...proposedShipCoords);
              return [type, proposedShipCoords];
            }
          } else {
            const proposedShipCoords = [...Array(length).keys()].map((val) => [
              startCoords[0],
              startCoords[1] + val,
            ]);
            if (coordsAreUnoccupied(proposedShipCoords)) {
              occupiedCoords.push(...proposedShipCoords);
              return [type, proposedShipCoords];
            }
          }
        }
      }
    });

    const fleetDeploymentInfo = shipsWithCoords.reduce(
      (acc, [type, coords]) => ({
        ...acc,
        [type]: coords,
      }),
      {}
    );

    return fleetDeploymentInfo;
  }
}

module.exports = Player;
