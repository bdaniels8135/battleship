const _ = require("lodash");
const Ship = require("./Ship");

class Gameboard {
  #fleetDeployment;

  #receivedAttacks;

  constructor(fleetCoords) {
    if (fleetCoords != null)
      this.#fleetDeployment = Gameboard.#deployFleet(fleetCoords);
    this.#receivedAttacks = [];
  }

  static #deployFleet(fleetCoords) {
    fleetCoords.map((shipCoords) => {
      const newShip = new Ship(shipCoords.length);
      return shipCoords;
    });
    return fleetCoords.flat();
  }

  #coordHasShip(coord) {
    return this.#fleetDeployment.some((shipCoord) =>
      _.isEqual(coord, shipCoord)
    );
  }

  #attackIsRepeat(newAttackCoord) {
    return this.#receivedAttacks.some((prevAttackCoord) =>
      _.isEqual(newAttackCoord, prevAttackCoord)
    );
  }

  receiveAttack(attackCoord) {
    if (this.#attackIsRepeat(attackCoord))
      throw new Error("Player may not attack the same coordinate twice.");
    this.#receivedAttacks.push(attackCoord);
    return this.#coordHasShip(attackCoord);
  }
}

module.exports = Gameboard;
