const {
  buildSelectOption,
  buildInputHtml,
  wrapHtmlElements,
} = require("./htmlBuilder");

function gameStartView() {
  const humanPlayerOption = buildSelectOption("Human", "Human");
  const computerPlayerOption = buildSelectOption("Computer", "Computer");
  const playerOneSelect = wrapHtmlElements(
    "select",
    humanPlayerOption,
    computerPlayerOption
  );
  const playerTwoSelect = wrapHtmlElements(
    "select",
    humanPlayerOption.cloneNode(true),
    computerPlayerOption.cloneNode(true)
  );
  const playerOneNameInput = buildInputHtml(
    "text",
    "player-one-name",
    "player-one-name"
  );
  const playerTwoNameInput = buildInputHtml(
    "text",
    "player-two-name",
    "player-two-name"
  );
  const startGameBtn = buildInputHtml(
    "button",
    "start-game-button",
    "start-game-button"
  );
  startGameBtn.value = "Start Game";
  const html = wrapHtmlElements(
    "form",
    playerOneSelect,
    playerOneNameInput,
    playerTwoSelect,
    playerTwoNameInput,
    startGameBtn
  );
  return html;
}

module.exports = gameStartView;
