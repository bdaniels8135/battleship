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
