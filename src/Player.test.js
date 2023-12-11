const Gameboard = require("./Gameboard");
const Player = require("./Player");

test("players have a name", () => {
  const bob = new Player("Bob");
  expect(bob.name).toBe("Bob");
});

test("players created without a name are called Skynet", () => {
  const skynet = new Player();
  expect(skynet.name).toBe("Skynet");
});

test("players created without a name are bots", () => {
  const skynet = new Player();
  expect(skynet.isAI).toBe(true);
});

test("getAIMove generates a random move", () => {
  const skynet = new Player();
  const getAIMoveReturnValue = skynet.getAIMove();
  expect(getAIMoveReturnValue).toBeInstanceOf(Array);
  expect(getAIMoveReturnValue.length).toBe(2);
  expect(getAIMoveReturnValue[0]).toEqual(expect.any(Number));
  expect(getAIMoveReturnValue[1]).toEqual(expect.any(Number));
});

test.each([...Array(25)])("getAIMove can generate 100 legal moves", () => {
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
  const skynet = new Player();
  [...Array(100)].forEach(() => {
    function playAIRound() {
      gb.receiveAttack(skynet.getAIMove());
    }
    expect(playAIRound).not.toThrow();
  });
});

test("getAIMove throws error if player is not AI", () => {
  const humanPlayer = new Player("PlayerName");
  function humanAIMove() {
    humanPlayer.getAIMove();
  }
  expect(humanAIMove).toThrow("Human players cannot use AI move generator");
});
