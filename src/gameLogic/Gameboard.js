const _ = require("lodash");
const Ship = require("./Ship");

class Gameboard {
  #fleetCoords;

  #fleetDeployment;

  #receivedAttacks;

  constructor(fleetCoords) {
    if (fleetCoords != null) {
      this.#fleetCoords = fleetCoords.flat();
      this.#fleetDeployment = Gameboard.#deployFleet(fleetCoords);
    }
    this.#receivedAttacks = [];
  }

  static #assignNewShipToCoords(shipCoords) {
    const newShip = new Ship(shipCoords.length);
    return shipCoords.map((shipCoord) => ({ coord: shipCoord, ship: newShip }));
  }

  static #deployFleet(fleetCoords) {
    const fleetCoordsWithShips = fleetCoords.map((shipCoords) =>
      Gameboard.#assignNewShipToCoords(shipCoords)
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
        isAHit: true,
        isShipSunk: attackedShip.isSunk,
      };
    }
    this.#receivedAttacks.push({ attackCoord, wasAHit: false });
    return { isAHit: false };
  }

  get fleetIsSunk() {
    return this.#fleetDeployment.every(
      (coordWithShip) => coordWithShip.ship.isSunk === true
    );
  }

  get fleetCoords() {
    return this.#fleetCoords;
  }

  get hitCoords() {
    return this.#receivedAttacks
      .filter((attackData) => attackData.wasAHit)
      .map((attackData) => attackData.attackCoord);
  }

  get missCoords() {
    return this.#receivedAttacks
      .filter((attackData) => !attackData.wasAHit)
      .map((attackData) => attackData.attackCoord);
  }
}

module.exports = Gameboard;
