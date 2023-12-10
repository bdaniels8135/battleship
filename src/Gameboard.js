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

  static #assignCoordsToNewShip(shipCoords) {
    const newShip = new Ship(shipCoords.length);
    return shipCoords.map((shipCoord) => ({ coord: shipCoord, ship: newShip }));
  }

  static #deployFleet(fleetCoords) {
    const fleetCoordsWithShips = fleetCoords.map((shipCoords) =>
      Gameboard.#assignCoordsToNewShip(shipCoords)
    );
    return fleetCoordsWithShips.flat();
  }

  #findAttackedShip(attackCoord) {
    const attackedCoordWithShip = this.#fleetDeployment.find((coordWithShip) =>
      _.isEqual(attackCoord, coordWithShip.coord)
    );
    return attackedCoordWithShip != null ? attackedCoordWithShip.ship : null;
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
    const attackedShip = this.#findAttackedShip(attackCoord);
    if (attackedShip != null) {
      attackedShip.hit();
      return {
        isHit: true,
        isShipSunk: attackedShip.isSunk(),
      };
    }
    return { isHit: false };
  }
}

module.exports = Gameboard;
