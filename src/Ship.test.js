const Ship = require("./Ship");

test("only sinks when hit a number of times equal to length", () => {
  const shipLengthThree = new Ship(3);
  shipLengthThree.hit();
  expect(shipLengthThree.isSunk).toBe(false);
  shipLengthThree.hit();
  expect(shipLengthThree.isSunk).toBe(false);
  shipLengthThree.hit();
  expect(shipLengthThree.isSunk).toBe(true);
});
