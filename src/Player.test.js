const Player = require("./Player");

test("players have a name", () => {
  const bob = new Player("Bob");
  expect(bob.name).toBe("Bob");
});
