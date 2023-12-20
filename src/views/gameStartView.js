import {
  buildSelectOption,
  buildInputHtml,
  wrapHtmlElements,
} from "./htmlBuilders";

function buildPlayerTypeSelect(playerNumText) {
  const defaultOption = buildSelectOption(
    `-- Select Player ${playerNumText}'s Type --`,
    ""
  );
  defaultOption.setAttribute("selected", "");
  defaultOption.setAttribute("disabled", "");
  const humanPlayerOption = buildSelectOption("Human", "Human");
  const battleDroidPlayerOption = buildSelectOption(
    "Battle Droid",
    "Battle Droid"
  );
  const skynetPlayerOption = buildSelectOption("Skynet", "Skynet");
  const playerTypeSelect = wrapHtmlElements(
    "select",
    defaultOption,
    humanPlayerOption,
    battleDroidPlayerOption,
    skynetPlayerOption
  );
  playerTypeSelect.id = `player-${playerNumText.toLowerCase()}-select`;
  return playerTypeSelect;
}

function buildPlayerNameInput(playerNumText) {
  const playerNameInput = buildInputHtml(
    "text",
    `player-${playerNumText.toLowerCase()}-name`,
    `player-${playerNumText.toLowerCase()}-name`
  );
  playerNameInput.placeholder = `Enter Player ${playerNumText}'s Name`;
  return playerNameInput;
}

export default function gameStartView(startBtnClickFunc) {
  const playerOneTypeSelect = buildPlayerTypeSelect("One");
  const playerTwoTypeSelect = buildPlayerTypeSelect("Two");
  const playerOneNameInput = buildPlayerNameInput("One");
  const playerTwoNameInput = buildPlayerNameInput("Two");

  playerOneTypeSelect.addEventListener("change", () => {
    playerOneNameInput.classList.remove("displayed");
    playerOneNameInput.value = "";
    if (playerOneTypeSelect.value === "Human")
      playerOneNameInput.classList.add("displayed");
  });

  playerTwoTypeSelect.addEventListener("change", () => {
    playerTwoNameInput.classList.remove("displayed");
    playerTwoNameInput.value = "";
    if (playerTwoTypeSelect.value === "Human")
      playerTwoNameInput.classList.add("displayed");
  });

  function validateNameInputs() {
    let returnValue = true;
    playerOneNameInput.classList.remove("invalid");
    playerTwoNameInput.classList.remove("invalid");
    if (
      playerOneTypeSelect.value === "Human" &&
      playerOneNameInput.value.trim() === ""
    ) {
      playerOneNameInput.classList.add("invalid");
      returnValue = false;
    }
    if (
      playerTwoTypeSelect.value === "Human" &&
      playerTwoNameInput.value.trim() === ""
    ) {
      playerTwoNameInput.classList.add("invalid");
      returnValue = false;
    }
    return returnValue;
  }

  playerOneNameInput.addEventListener("focusout", validateNameInputs);
  playerTwoNameInput.addEventListener("focusout", validateNameInputs);

  const startGameBtn = buildInputHtml(
    "button",
    "start-game-button",
    "start-game-button"
  );
  startGameBtn.value = "Start Game";

  startGameBtn.addEventListener("click", () => {
    if (
      validateNameInputs() &&
      playerOneTypeSelect.value !== "" &&
      playerTwoTypeSelect.value !== ""
    ) {
      startBtnClickFunc({
        playerOneName:
          playerOneNameInput.value.trim() || playerOneTypeSelect.value,
        playerTwoName:
          playerTwoNameInput.value.trim() || playerTwoTypeSelect.value,
        playerOneType: playerOneTypeSelect.value,
        playerTwoType: playerTwoTypeSelect.value,
      });
    }
  });

  const html = wrapHtmlElements(
    "form",
    playerOneTypeSelect,
    playerOneNameInput,
    playerTwoTypeSelect,
    playerTwoNameInput,
    startGameBtn
  );
  html.id = "game-start-menu-container";

  return html;
}
