const Game = require("./Game");

const defaultFleetDeploymentInfo = {
  Carrier: [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  Battleship: [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  Cruiser: [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  Submarine: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  "Patrol Boat": [
    [0, 0],
    [0, 1],
  ],
};

let game;

beforeEach(() => {
  const playerNames = {
    playerOneName: "Player One",
    playerTwoName: "Player Two",
  };
  game = new Game(playerNames);
  game.deployPlayerOneFleet(defaultFleetDeploymentInfo);
  game.deployPlayerTwoFleet(defaultFleetDeploymentInfo);
});

test("playRound returns the attack report data", () => {
  const roundReport = game.playRound([0, 0]);
  expect(roundReport.isAHit).toBe(true);
  expect(roundReport.isShipSunk).toBe(false);
});

test("returns current player name", () => {
  expect(game.currentPlayer).toBe("Player One");
});

test("returns opposing player name", () => {
  expect(game.opposingPlayer).toBe("Player Two");
});

test("switches current player after a round is played", () => {
  game.playRound([0, 0]);
  expect(game.currentPlayer).toBe("Player Two");
  expect(game.opposingPlayer).toBe("Player One");
});

test("if current player is AI it takes a turn", () => {
  const playerNames = {
    playerOneName: "Human Player",
  };
  game = new Game(playerNames);
  game.deployPlayerOneFleet(defaultFleetDeploymentInfo);
  game.playRound([0, 0]);
  expect(game.currentPlayer).toBe("Human Player");
});

test("game ends only if all of one player's ships have sunk", () => {
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
    if (!game.isOver) game.playRound(coord);
  });
  expect(game.isOver).toBe(true);
  expect(game.winner).toBe("Player One");
  function playRoundAfterOver() {
    game.playRound();
  }
  expect(playRoundAfterOver).toThrow("Cannot play rounds after game ends");
});
