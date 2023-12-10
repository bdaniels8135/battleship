const { experiments } = require("webpack");
const Game = require("./Game");

let game;

beforeEach(() => {
  game = new Game("PlayerOne", "PlayerTwo");
});

test("playRound returns the attack report data", () => {
  const roundReport = game.playRound([0, 0]);
  expect(roundReport.isAHit).toBe(true);
  expect(roundReport.isShipSunk).toBe(false);
});

test("returns current player name", () => {
  expect(game.currentPlayer).toBe("PlayerOne");
});

test("switches currently player after a round is played", () => {
  game.playRound([0, 0]);
  expect(game.currentPlayer).toBe("PlayerTwo");
});

test("if current player is AI it takes a turn", () => {
  game = new Game("HumanPlayer");
  game.playRound([0, 0]);
  expect(game.currentPlayer).toBe("HumanPlayer");
});
