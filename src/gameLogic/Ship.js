class Ship {
  #length;

  #hits;

  #type;

  constructor(length, type) {
    if (length == null)
      throw new Error("ship constructor requires length to be set");
    if (type == null)
      throw new Error("ship constructor requires type to be set");
    this.#length = length;
    this.#hits = 0;
    this.#type = type;
  }

  hit() {
    if (!this.isSunk) this.#hits += 1;
  }

  get isSunk() {
    return this.#hits >= this.#length;
  }

  get type() {
    return this.#type;
  }
}

module.exports = Ship;
