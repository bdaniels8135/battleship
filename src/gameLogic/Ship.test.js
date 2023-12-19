const Ship = require("./Ship");

test("throws error if no length is set", () => {
  function noLengthSet() {
    const newShip = new Ship();
  }
  expect(noLengthSet).toThrow("ship constructor requires length to be set");
});

test("throw error if no type is set", () => {
  function noTypeSet() {
    const newShip = new Ship(3);
  }
  expect(noTypeSet).toThrow("ship constructor requires type to be set");
});

test("has a readable type", () => {
  const newShip = new Ship(4, "Battleship");
  expect(newShip.type).toBe("Battleship");
});

test("only sinks when hit a number of times equal to length", () => {
  const shipLengthThree = new Ship(3, "Submarine");
  shipLengthThree.hit();
  expect(shipLengthThree.isSunk).toBe(false);
  shipLengthThree.hit();
  expect(shipLengthThree.isSunk).toBe(false);
  shipLengthThree.hit();
  expect(shipLengthThree.isSunk).toBe(true);
});
