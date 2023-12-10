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
    return this.#receivedAttacks.some((prevAttackData) =>
      _.isEqual(newAttackCoord, prevAttackData.attackCoord)
    );
  }

  receiveAttack(attackCoord) {
    if (this.#attackIsRepeat(attackCoord))
      throw new Error("Player may not attack the same coordinate twice.");

    const attackedShip = this.#findAttackedShip(attackCoord);
    if (attackedShip != null) {
      attackedShip.hit();
      this.#receivedAttacks.push({ attackCoord, wasAHit: true });
      return {
        isHit: true,
        isShipSunk: attackedShip.isSunk(),
      };
    }
    this.#receivedAttacks.push({ attackCoord, wasAHit: false });
    return { isHit: false };
  }

  isFleetSunk() {
    return this.#fleetDeployment.every(
      (coordWithShip) => coordWithShip.ship.isSunk() === true
    );
  }
}

module.exports = Gameboard;
