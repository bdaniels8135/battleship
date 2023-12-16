import {
  buildInputHtml,
  buildTextHtml,
  wrapHtmlElements,
} from "./htmlBuilders";

export default function turnTransitionView() {
  const announcementTextBox = buildTextHtml("p", "Announcement Text Box");
  announcementTextBox.id = "announcement-text-box";

  const nextPlayerBtn = buildInputHtml(
    "button",
    "next-player-btn",
    "next-player-btn"
  );
  nextPlayerBtn.value = "Next Player Ready";

  const html = wrapHtmlElements("div", announcementTextBox, nextPlayerBtn);
  html.id = "turn-transition-container";

  return html;
}
