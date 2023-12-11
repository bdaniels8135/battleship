class Player {
  #name;

  #isAI;

  constructor(name) {
    this.#name = name || "Skynet";
    this.#isAI = !name;
  }

  get name() {
    return this.#name;
  }

  get isAI() {
    return this.#isAI;
  }

  *getAIMove() {
    yield [0, 0];
    yield [0, 1];
  }
}

module.exports = Player;
