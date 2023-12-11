class Player {
  #name;

  #isAI;

  #movesGen;

  constructor(name) {
    this.#name = name || "Skynet";
    this.#isAI = !name;
    if (this.#isAI) this.#movesGen = Player.#buildMovesGen();
  }

  get name() {
    return this.#name;
  }

  get isAI() {
    return this.#isAI;
  }

  static *#buildMovesGen() {
    const legalMoves = [...Array(100)].map((val, ind) => [
      ind % 10,
      Math.floor(ind / 10),
    ]);
    while (legalMoves.length !== 0) {
      yield legalMoves.shift();
    }
  }

  getAIMove() {
    return this.#movesGen.next().value;
  }
}

module.exports = Player;
