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
      return newShip;
    });
  }
}

module.exports = Gameboard;
