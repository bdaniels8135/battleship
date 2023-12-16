import {
  buildSelectOption,
  buildInputHtml,
  wrapHtmlElements,
} from "./htmlBuilders";

export default function gameStartView() {
  const playerOneDefaultOption = buildSelectOption(
    "-- Select Player One Type --",
    ""
  );
  playerOneDefaultOption.setAttribute("selected", "");
  playerOneDefaultOption.setAttribute("disabled", "");
  const playerTwoDefaultOption = buildSelectOption(
    "-- Select Player Two Type --",
    ""
  );
  playerTwoDefaultOption.setAttribute("selected", "");
  playerTwoDefaultOption.setAttribute("disabled", "");
  const humanPlayerOption = buildSelectOption("Human", "Human");
  const computerPlayerOption = buildSelectOption("Computer", "Computer");
  const playerOneSelect = wrapHtmlElements(
    "select",
    playerOneDefaultOption,
    humanPlayerOption,
    computerPlayerOption
  );
  playerOneSelect.id = "player-one-select";
  const playerTwoSelect = wrapHtmlElements(
    "select",
    playerTwoDefaultOption,
    humanPlayerOption.cloneNode(true),
    computerPlayerOption.cloneNode(true)
  );
  playerTwoSelect.id = "player-two-select";
  const playerOneNameInput = buildInputHtml(
    "text",
    "player-one-name",
    "player-one-name"
  );
  playerOneNameInput.placeholder = "Enter Player One's Name";
  const playerTwoNameInput = buildInputHtml(
    "text",
    "player-two-name",
    "player-two-name"
  );
  playerTwoNameInput.placeholder = "Enter Player Two's Name";
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
  html.id = "game-start-menu-container";
  return html;
}
