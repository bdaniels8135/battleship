const Player = require("./Player");

let humanPlayer;
let battleDroidPlayer;
let skynetPlayer;

beforeEach(() => {
  humanPlayer = new Player("Player Name", "Human");
  battleDroidPlayer = new Player("B1", "Battle Droid");
  skynetPlayer = new Player("Skynet", "Skynet");
});

test("players have a name", () => {
  expect(humanPlayer.name).toBeDefined();
  expect(battleDroidPlayer.name).toBeDefined();
  expect(skynetPlayer.name).toBeDefined();
});

test("human players are not AI", () => {
  expect(humanPlayer.isAI).toBe(false);
});

test("non-human players are AI", () => {
  expect(battleDroidPlayer.isAI).toBe(true);
  expect(skynetPlayer.isAI).toBe(true);
});

test("battle droid getAIMove generates a legal coordinate", () => {
  const getAIMoveReturnValue = battleDroidPlayer.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toEqual(expect.any(Number));
  expect(getAIMoveReturnValue[1]).toEqual(expect.any(Number));
  expect(getAIMoveReturnValue[0]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[1]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[0]).toBeLessThanOrEqual(9);
  expect(getAIMoveReturnValue[1]).toBeLessThanOrEqual(9);
});

test("skynet getAIMove generates a legal coordinate", () => {
  const getAIMoveReturnValue = skynetPlayer.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toEqual(expect.any(Number));
  expect(getAIMoveReturnValue[1]).toEqual(expect.any(Number));
  expect(getAIMoveReturnValue[0]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[1]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[0]).toBeLessThanOrEqual(9);
  expect(getAIMoveReturnValue[1]).toBeLessThanOrEqual(9);
});

test("getAIMove throws error if player is not AI", () => {
  function humanAIMove() {
    humanPlayer.getAIMove();
  }
  expect(humanAIMove).toThrow("human players cannot use AI move generator");
});

test.each([...Array(10)])(
  "getAIFleetDeploymentInfo returns a legal fleet deployment",
  () => {
    const fleetDeploymentInfo = Player.getAIFleetDeploymentInfo();
    const ships = Object.keys(fleetDeploymentInfo);
    const fleetCoords = Object.values(fleetDeploymentInfo).flat();
    const uniqueFleetCoords = new Set(fleetCoords);
    expect(ships).toEqual([
      "Carrier",
      "Battleship",
      "Cruiser",
      "Submarine",
      "Destroyer",
    ]);
    expect(fleetCoords).toBeInstanceOf(Array);
    expect(fleetCoords.length).toBe(17);
    expect(uniqueFleetCoords.size).toBe(17);
    Object.values(fleetDeploymentInfo).forEach((shipCoords) => {
      const xVals = shipCoords.map((coords) => coords[0]);
      expect(xVals.every((val) => val >= 0 && val <= 9)).toBe(true);
      const yVals = shipCoords.map((coords) => coords[1]);
      expect(yVals.every((val) => val >= 0 && val <= 9)).toBe(true);
      const uniqueXVals = new Set(xVals);
      const uniqueYVals = new Set(yVals);
      expect(
        Boolean(
          uniqueXVals.size === shipCoords.length ||
            uniqueYVals.size === shipCoords.length
        )
      ).toBe(true);
    });
  }
);
