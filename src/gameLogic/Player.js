const _ = require("lodash");

class Player {
  #name;

  #isAI;

  #type;

  #randomMovesGen;

  #legalMoves;

  #targetQ;

  #previousAttackCoords;

  #previousAttackData;

  #shipsToHunt;

  constructor(name, type) {
    this.#name = name;
    this.#type = type;
    this.lastAttackReport = {};
    if (type !== "Human") this.#isAI = true;
    else this.#isAI = false;
    if (this.#type === "Battle Droid")
      this.#randomMovesGen = Player.#buildRandomMoveGen();
    if (this.#type === "Joshua") {
      this.#legalMoves = [...Array(100).keys()]
        .map((val) => [val % 10, Math.floor(val / 10)])
        .filter(([x, y]) => (x + y) % 2 === 0);
      this.#targetQ = [];
      this.#previousAttackCoords = [];
    }
    if (this.#type === "Skynet") {
      this.#previousAttackData = [...Array(100).keys()]
        .map((val) => `${val % 10}${Math.floor(val / 10)}`)
        .reduce(
          (acc, curr) => ({ ...acc, [curr]: { wasAttacked: false } }),
          {}
        );
      this.#shipsToHunt = {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Submarine: 3,
        Destroyer: 2,
      };
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

  #targetedMoveGen() {
    const coordIsLegal = ([x, y]) => x >= 0 && x <= 9 && y >= 0 && y <= 9;

    const coordHasNotBeenAttacked = (coord) =>
      this.#previousAttackCoords.every(
        (prevAttCoord) => !_.isEqual(coord, prevAttCoord)
      );

    const getRandomLegalMove = () => {
      while (true) {
        const randomInd = Math.floor(Math.random() * this.#legalMoves.length);
        const proposedMove = this.#legalMoves.splice(randomInd, 1)[0];
        if (coordHasNotBeenAttacked(proposedMove)) return proposedMove;
      }
    };

    if (this.lastAttackReport.isAHit && !this.lastAttackReport.isShipSunk) {
      const [lastX, lastY] = this.lastAttackReport.coord;
      const adjCoords = [
        [lastX + 1, lastY],
        [lastX - 1, lastY],
        [lastX, lastY + 1],
        [lastX, lastY - 1],
      ];
      const newTargets = adjCoords.filter(
        (coord) => coordIsLegal(coord) && coordHasNotBeenAttacked(coord)
      );
      this.#targetQ.push(...newTargets);
    }
    while (this.#targetQ.length > 0) {
      const proposedTargetedMove = this.#targetQ.shift();
      if (coordHasNotBeenAttacked(proposedTargetedMove)) {
        this.#previousAttackCoords.push(proposedTargetedMove);
        return proposedTargetedMove;
      }
    }
    const proposedRandomMove = getRandomLegalMove();
    this.#previousAttackCoords.push(proposedRandomMove);
    return proposedRandomMove;
  }

  #advancedMoveGen() {
    const PAD = this.#previousAttackData;
    const attackReport = this.lastAttackReport;

    if (attackReport.coord != null) {
      const [lastX, lastY] = [attackReport.coord[0], attackReport.coord[1]];
      const lastAttackCoordString = `${lastX}${lastY}`;
      PAD[lastAttackCoordString].wasAttacked = true;
      PAD[lastAttackCoordString].wasAHit = attackReport.isAHit;
      if (attackReport.isShipSunk) {
        const sunkShipLength = this.#shipsToHunt[attackReport.shipType];
        const possibleShipCoords = [
          [...Array(sunkShipLength).keys()].map((val) => [lastX + val, lastY]),
          [...Array(sunkShipLength).keys()].map((val) => [lastX - val, lastY]),
          [...Array(sunkShipLength).keys()].map((val) => [lastX, lastY + val]),
          [...Array(sunkShipLength).keys()].map((val) => [lastX, lastY - val]),
        ].filter((coords) =>
          coords.every(
            ([x, y]) =>
              PAD[`${x}${y}`] &&
              PAD[`${x}${y}`].wasAttacked &&
              PAD[`${x}${y}`].wasAHit &&
              !PAD[`${x}${y}`].shipIsSunk
          )
        );
        if (possibleShipCoords.length === 1)
          possibleShipCoords
            .flat()
            .map(([x, y]) => `${x}${y}`)
            .forEach((coordString) => {
              PAD[coordString].shipIsSunk = true;
            });
        delete this.#shipsToHunt[attackReport.shipType];
      }
    }

    const shipLengths = Object.values(this.#shipsToHunt);
    const directions = [0, 1];
    const weights = {};
    Object.keys(PAD).forEach((coordString) => {
      const [coordX, coordY] = [Number(coordString[0]), Number(coordString[1])];
      shipLengths.forEach((length) => {
        directions.forEach((direction) => {
          const coordsOnGrid = [...Array(length).keys()]
            .map((val) =>
              direction === 0 ? [coordX + val, coordY] : [coordX, coordY + val]
            )
            .filter(([x, y]) => x >= 0 && x <= 9 && y >= 0 && y <= 9);
          if (coordsOnGrid.length === length) {
            const notAttackedCoords = coordsOnGrid.filter(
              ([x, y]) => !PAD[`${x}${y}`].wasAttacked
            );
            const hitButNotSunkCoords = coordsOnGrid.filter(
              ([x, y]) => PAD[`${x}${y}`].wasAHit && !PAD[`${x}${y}`].shipIsSunk
            );
            if (
              notAttackedCoords.length + hitButNotSunkCoords.length ===
              length
            ) {
              notAttackedCoords.forEach(([x, y]) => {
                if (weights[`${x}${y}`] != null)
                  weights[`${x}${y}`] += 6 - length;
                else weights[`${x}${y}`] = 6 - length;
              });
              const adjToHitButNotSunkCoords = hitButNotSunkCoords.reduce(
                (acc, [x, y]) =>
                  direction === 0
                    ? [...acc, [x - 1, y], [x + 1, y]]
                    : [...acc, [x, y - 1], [x, y + 1]],
                []
              );
              notAttackedCoords.forEach(([x, y]) => {
                if (
                  adjToHitButNotSunkCoords.some((ATHBNSCoord) =>
                    _.isEqual(ATHBNSCoord, [x, y])
                  )
                )
                  weights[`${x}${y}`] += 100 * hitButNotSunkCoords.length ** 2;
              });
            }
          }
        });
      });
    });

    const maxWeightedEntry = Object.entries(weights).reduce((acc, curr) =>
      curr[1] > acc[1] ? curr : acc
    );
    const nextMoveCoordString = maxWeightedEntry[0];
    return [Number(nextMoveCoordString[0]), Number(nextMoveCoordString[1])];
  }

  getAIMove() {
    if (!this.#isAI) throw new Error("human players cannot use getAIMove");
    if (this.#type === "Battle Droid") return this.#randomMovesGen.next().value;
    if (this.#type === "Joshua") return this.#targetedMoveGen();
    if (this.#type === "Skynet") return this.#advancedMoveGen();
    return null;
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
