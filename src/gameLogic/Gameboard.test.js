const shipConstructorSpy = (() => {
  const mockSpyMethod = jest.fn();
  jest.mock("./Ship", () => {
    const ActualShip = jest.requireActual("./Ship");
    class SpiedShip extends ActualShip {
      constructor(...args) {
        super(...args);
        mockSpyMethod(...args);
      }
    }
    return SpiedShip;
  });
  return mockSpyMethod;
})();

const Gameboard = require("./Gameboard");

const fleetCoords = [
  [
    [0, 0],
    [0, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
];

let gb;

beforeEach(() => {
  shipConstructorSpy.mockClear();
  gb = new Gameboard(fleetCoords);
});

test("throws error if no fleet coordinate are passed", () => {
  function noFleetCoords() {
    gb = new Gameboard();
  }
  expect(noFleetCoords).toThrow("Gameboard requires fleet coordinates");
});

test("calls ship constructor when passed ship coords", () => {
  expect(shipConstructorSpy).toHaveBeenCalledTimes(5);
});

test("returns list of fleet coords correctly", () => {
  expect(gb.fleetCoords).toEqual(fleetCoords.flat());
});

test("returns isAHit as true when receivedAttack is a hit", () => {
  expect(gb.receiveAttack([0, 0]).isAHit).toBe(true);
});

test("returns isAHit as false when receivedAttack is a miss", () => {
  expect(gb.receiveAttack([5, 0]).isAHit).toBe(false);
});

test("returns isShipSunk as true when received attack sinks the ship", () => {
  gb.receiveAttack([0, 0]);
  const attackReport = gb.receiveAttack([0, 1]);
  expect(attackReport.isShipSunk).toBe(true);
});

test("returns lists of hit and miss coordinates", () => {
  gb.receiveAttack([0, 0]);
  gb.receiveAttack([5, 5]);
  expect(gb.hitCoords).toEqual([[0, 0]]);
  expect(gb.missCoords).toEqual([[5, 5]]);
});

test("throws error if receivedAttack coord is a repeat", () => {
  function repeatedAttack() {
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([0, 0]);
  }
  expect(repeatedAttack).toThrow(
    "Player may not attack the same coordinate twice."
  );
});

test("fleetIsSunk is true only if all ships are sunk", () => {
  fleetCoords.flat().forEach((coord) => {
    expect(gb.fleetIsSunk).toBe(false);
    gb.receiveAttack(coord);
  });
  expect(gb.fleetIsSunk).toBe(true);
});
