import {
  buildSelectOption,
  buildInputHtml,
  wrapHtmlElements,
  buildLabelHtml,
} from "./htmlBuilder";
import "./gameStartView.css";

export default function gameStartView() {
  const humanPlayerOption = buildSelectOption("Human", "Human");
  const computerPlayerOption = buildSelectOption("Computer", "Computer");
  const playerOneSelect = wrapHtmlElements(
    "select",
    humanPlayerOption,
    computerPlayerOption
  );
  playerOneSelect.id = "player-one-select";
  const playerOneSelectLabel = buildLabelHtml(
    "player-one-select",
    "Player One Type:"
  );
  const playerTwoSelect = wrapHtmlElements(
    "select",
    humanPlayerOption.cloneNode(true),
    computerPlayerOption.cloneNode(true)
  );
  playerTwoSelect.id = "player-two-select";
  const playerTwoSelectLabel = buildLabelHtml(
    "player-two-select",
    "Player Two Type:"
  );
  const playerOneNameInput = buildInputHtml(
    "text",
    "player-one-name",
    "player-one-name"
  );
  const playerOneNameInputLabel = buildLabelHtml(
    "player-one-name",
    "Player One Name:"
  );
  const playerTwoNameInput = buildInputHtml(
    "text",
    "player-two-name",
    "player-two-name"
  );
  const playerTwoNameInputLabel = buildLabelHtml(
    "player-two-name",
    "Player Two Name:"
  );
  const startGameBtn = buildInputHtml(
    "button",
    "start-game-button",
    "start-game-button"
  );
  startGameBtn.value = "Start Game";
  const html = wrapHtmlElements(
    "form",
    playerOneSelectLabel,
    playerOneSelect,
    playerOneNameInputLabel,
    playerOneNameInput,
    playerTwoSelectLabel,
    playerTwoSelect,
    playerTwoNameInputLabel,
    playerTwoNameInput,
    startGameBtn
  );
  html.id = "game-start-menu-container";
  return html;
}
