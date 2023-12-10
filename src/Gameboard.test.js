const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

jest.mock("./Ship");

beforeEach(() => {
  Ship.mockClear();
});

describe("Empty gameboard", () => {
  test("does not call ship constructor", () => {
    const gb = new Gameboard();
    expect(Ship).toHaveBeenCalledTimes(0);
  });
});

describe("Populated gameboard", () => {
  const fleetCoords = [
    [
      [0, 0],
      [1, 0],
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

  let gb = new Gameboard(fleetCoords);
  beforeEach(() => {
    gb = new Gameboard(fleetCoords);
  });

  test("calls ship constructor when passed ship coords", () => {
    expect(Ship).toHaveBeenCalledTimes(5);
  });

  test('returns "true" when receivedAttack is a hit', () => {
    expect(gb.receiveAttack([0, 0])).toBe(true);
  });

  test('returns "false" when receivedAttack is a miss', () => {
    expect(gb.receiveAttack([5, 0])).toBe(false);
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

  test("returns shipIsSunk as true when received attack sinks the ship", () => {
    gb.receiveAttack([0, 0]);
    expect(gb.receiveAttack([0, 1]).shipIsSunk).toBe(true);
  });
});
