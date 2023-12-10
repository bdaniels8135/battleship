const Gameboard = require("./Gameboard");
const Ship = require("./Ship");

jest.mock("./Ship");

beforeEach(() => {
  Ship.mockClear();
});

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

test("calls ship constructor when passed ship coords", () => {
  const gb = new Gameboard(fleetCoords);
  expect(Ship).toHaveBeenCalledTimes(5);
});

test("does not call ship constructor when not passed ship coords", () => {
  const gb = new Gameboard();
  expect(Ship).toHaveBeenCalledTimes(0);
});

test('returns "true" when receivedAttack is a hit', () => {
  const gb = new Gameboard(fleetCoords);
  expect(gb.receiveAttack([0, 0])).toBe(true);
});

test('returns "false" when receivedAttack is a miss', () => {
  const gb = new Gameboard(fleetCoords);
  expect(gb.receiveAttack([5, 0])).toBe(false);
});
