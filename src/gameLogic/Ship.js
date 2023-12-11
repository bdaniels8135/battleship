class Ship {
  #length;

  #hits;

  constructor(length) {
    this.#length = length;
    this.#hits = 0;
  }

  hit() {
    if (!this.isSunk) this.#hits += 1;
  }

  get isSunk() {
    return this.#hits >= this.#length;
  }
}

module.exports = Ship;
