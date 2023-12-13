const {
  buildGameboardHtml,
  buildTextHtml,
  wrapHtmlElements,
} = require("./htmlBuilder");

function playRoundView() {
  const playerOneGBText = buildTextHtml("p", "Your Gameboard");
  playerOneGBText.id = "player-one-gb-text";
  const playerTwoGBText = buildTextHtml("p", "Opponent's Gameboard");
  playerTwoGBText.id = "player-two-gb-text";

  const playerOneGBHtml = buildGameboardHtml();
  playerOneGBHtml.id = "player-one-gb";
  const playerTwoGBHtml = buildGameboardHtml();
  playerTwoGBHtml.id = "player-two-gb";

  const announcementTextBox = buildTextHtml("p", "Announcement Text Box");
  announcementTextBox.id = "announcement-text-box";

  const html = wrapHtmlElements(
    "main",
    playerOneGBText,
    playerOneGBHtml,
    announcementTextBox,
    playerTwoGBHtml,
    playerTwoGBText
  );
  html.id = "game-container";

  return html;
}

module.exports = playRoundView;
