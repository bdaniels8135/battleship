const Game = require("./Game");

let game;

beforeEach(() => {
  const playerNames = {
    playerOneName: "PlayerOne",
    playerTwoName: "PlayerTwo",
  };
  game = new Game(playerNames);
});

test("playRound returns the attack report data", () => {
  const roundReport = game.playRound([0, 0]);
  expect(roundReport.isAHit).toBe(true);
  expect(roundReport.isShipSunk).toBe(false);
});

test("returns current player name", () => {
  expect(game.currentPlayer).toBe("PlayerOne");
});

test("switches current player after a round is played", () => {
  game.playRound([0, 0]);
  expect(game.currentPlayer).toBe("PlayerTwo");
});

test("if current player is AI it takes a turn", () => {
  const playerNames = {
    playerOneName: "HumanPlayer",
  };
  game = new Game(playerNames);
  game.playRound([0, 0]);
  expect(game.currentPlayer).toBe("HumanPlayer");
});

test("game ends only if all of one player's ships have sunk", () => {
  const playerNames = {
    playerOneName: "HumanPlayer",
  };
  game = new Game(playerNames);
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
  fleetCoords.flat().forEach((coord) => {
    expect(game.isOver).toBe(false);
    expect(game.winner).toBeNull();
    game.playRound(coord);
  });
  expect(game.isOver).toBe(true);
  expect(game.winner).toBe("HumanPlayer");
  function playRoundAfterOver() {
    game.playRound();
  }
  expect(playRoundAfterOver).toThrow("Cannot play rounds after game ends");
});
