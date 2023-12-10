const _ = require("lodash");
const Ship = require("./Ship");

class Gameboard {
  #fleetDeployment;

  constructor(fleetCoords) {
    if (fleetCoords != null)
      this.#fleetDeployment = Gameboard.#deployFleet(fleetCoords);
  }

  static #deployFleet(fleetCoords) {
    fleetCoords.map((shipCoordList) => {
      const newShip = new Ship(shipCoordList.length);
      return shipCoordList;
    });
    return fleetCoords.flat();
  }

  receiveAttack(attackCoords) {
    if (this.#fleetDeployment.some((coord) => _.isEqual(coord, attackCoords)))
      return true;
    return false;
  }
}

module.exports = Gameboard;
