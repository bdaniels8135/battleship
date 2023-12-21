const _ = require("lodash");
const Player = require("./Player");

let humanPlayer;
let battleDroidPlayer;
let skynetPlayer;
let joshuaPlayer;

beforeEach(() => {
  humanPlayer = new Player("Player Name", "Human");
  battleDroidPlayer = new Player("B1", "Battle Droid");
  skynetPlayer = new Player("Net", "Skynet");
  joshuaPlayer = new Player("Josh", "Joshua");
});

test("players have a name", () => {
  expect(humanPlayer.name).toBe("Player Name");
  expect(battleDroidPlayer.name).toBe("B1");
  expect(skynetPlayer.name).toBe("Net");
  expect(joshuaPlayer.name).toBe("Josh");
});

test("human players are not AI", () => {
  expect(humanPlayer.isAI).toBe(false);
});

test("non-human players are AI", () => {
  expect(battleDroidPlayer.isAI).toBe(true);
  expect(skynetPlayer.isAI).toBe(true);
  expect(joshuaPlayer.isAI).toBe(true);
});

test("battle droid getAIMove generates a legal coordinate", () => {
  const getAIMoveReturnValue = battleDroidPlayer.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[1]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[0]).toBeLessThanOrEqual(9);
  expect(getAIMoveReturnValue[1]).toBeLessThanOrEqual(9);
});

test("skynet getAIMove generates a legal coordinate", () => {
  const getAIMoveReturnValue = skynetPlayer.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[1]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[0]).toBeLessThanOrEqual(9);
  expect(getAIMoveReturnValue[1]).toBeLessThanOrEqual(9);
});

test("joshua getAIMove generates a legal coordinate", () => {
  const getAIMoveReturnValue = joshuaPlayer.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[1]).toBeGreaterThanOrEqual(0);
  expect(getAIMoveReturnValue[0]).toBeLessThanOrEqual(9);
  expect(getAIMoveReturnValue[1]).toBeLessThanOrEqual(9);
});

test("getAIMove throws error if player is not AI", () => {
  function humanAIMove() {
    humanPlayer.getAIMove();
  }
  expect(humanAIMove).toThrow("human players cannot use getAIMove");
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

test("battle droid players can generate 100 unique moves", () => {
  [...Array(100)].reduce((acc) => {
    const move = battleDroidPlayer.getAIMove();
    expect(acc.every((elem) => !_.isEqual(elem, move))).toBe(true);
    return [...acc, move];
  }, []);
});

test("joshua players can generate 50 unique moves with coords of same parity", () => {
  [...Array(50)].reduce((acc) => {
    const move = joshuaPlayer.getAIMove();
    expect(acc.every((elem) => !_.isEqual(elem, move))).toBe(true);
    expect((move[0] + move[1]) % 2 === 0).toBe(true);
    return [...acc, move];
  }, []);
});

test("skynet players can generate 50 unique moves", () => {
  [...Array(50)].reduce((acc) => {
    const move = skynetPlayer.getAIMove();
    skynetPlayer.lastAttackReport = { coord: move, isAHit: false };
    expect(acc.every((elem) => !_.isEqual(elem, move))).toBe(true);
    return [...acc, move];
  }, []);
});
