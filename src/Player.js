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
}

module.exports = Player;
