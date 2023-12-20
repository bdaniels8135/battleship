const _ = require("lodash");
const Ship = require("./Ship");

class Gameboard {
  #fleetCoords;

  #fleetDeployment;

  #receivedAttacks;

  constructor(fleetDeploymentInfo) {
    if (fleetDeploymentInfo == null) {
      throw new Error("Gameboard requires fleet deployment info");
    }
    this.#fleetCoords = Object.values(fleetDeploymentInfo).flat();
    this.#fleetDeployment = Gameboard.#deployFleet(fleetDeploymentInfo);
    this.#receivedAttacks = [];
  }

  static #deployFleet(fleetDeploymentInfo) {
    const fleetCoordsWithShips = Object.entries(fleetDeploymentInfo).map(
      ([shipType, shipCoords]) => {
        const newShip = new Ship(shipCoords.length, shipType);
        return shipCoords.map((shipCoord) => ({
          coord: shipCoord,
          ship: newShip,
        }));
      }
    );
    return fleetCoordsWithShips.flat();
  }

  receiveAttack(attackCoord) {
    const attackIsRepeat = this.#receivedAttacks.some((prevAttackData) =>
      _.isEqual(attackCoord, prevAttackData.attackCoord)
    );

    if (attackIsRepeat)
      throw new Error("Player may not attack the same coordinate twice.");

    let attackedShip;

    try {
      attackedShip = this.#fleetDeployment.find((coordWithShip) =>
        _.isEqual(attackCoord, coordWithShip.coord)
      ).ship;
    } catch {
      this.#receivedAttacks.push({ attackCoord, wasAHit: false });
      return { isAHit: false };
    }

    attackedShip.hit();
    this.#receivedAttacks.push({ attackCoord, wasAHit: true });

    return {
      coord: attackCoord,
      isAHit: true,
      isShipSunk: attackedShip.isSunk,
      shipType: attackedShip.type,
    };
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
