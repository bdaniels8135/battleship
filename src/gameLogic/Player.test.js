const Gameboard = require("./Gameboard");
const Player = require("./Player");

let humanPlayer;
let AIPlayer;

beforeEach(() => {
  humanPlayer = new Player("Player Name", "Human");
  AIPlayer = new Player("Skynet", "Computer");
});

test("players have a name", () => {
  expect(humanPlayer.name).toBe("Player Name");
});

test("players created without a name are called Skynet", () => {
  expect(AIPlayer.name).toBe("Skynet");
});

test("players created without a name are bots", () => {
  expect(AIPlayer.isAI).toBe(true);
});

test("getAIMove generates a coordinate", () => {
  const getAIMoveReturnValue = AIPlayer.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toEqual(expect.any(Number));
  expect(getAIMoveReturnValue[1]).toEqual(expect.any(Number));
});

test.each([...Array(10)])("getAIMove can generate 100 legal moves", () => {
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
  const gb = new Gameboard(fleetCoords);
  [...Array(100)].forEach(() => {
    function playAIRound() {
      gb.receiveAttack(AIPlayer.getAIMove());
    }
    expect(playAIRound).not.toThrow();
  });
});

test("getAIMove throws error if player is not AI", () => {
  function humanAIMove() {
    humanPlayer.getAIMove();
  }
  expect(humanAIMove).toThrow("Human players cannot use AI move generator");
});
