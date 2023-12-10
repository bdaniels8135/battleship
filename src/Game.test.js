const Game = require("./Game");

let game;

beforeEach(() => {
  game = new Game("Bob", "Donna");
});

test("playRound returns the attack report data", () => {
  const roundReport = game.playRound([0, 0]);
  expect(roundReport.isAHit).toBe(true);
  expect(roundReport.isShipSunk).toBe(false);
});

test("returns current player name", () => {
  expect(game.currentPlayer).toBe("Bob");
});
