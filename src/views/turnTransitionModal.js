import {
  buildInputHtml,
  buildTextHtml,
  wrapHtmlElements,
} from "./htmlBuilders";

export default function turnTransitionModal() {
  const announcementTextBox = buildTextHtml("p", "Announcement Text Box");
  announcementTextBox.id = "modal-text-box";

  const nextPlayerBtn = buildInputHtml(
    "button",
    "next-player-btn",
    "next-player-btn"
  );
  nextPlayerBtn.value = "Next Player Ready";
  nextPlayerBtn.setAttribute("autofocus", "");

  const form = wrapHtmlElements("form", announcementTextBox, nextPlayerBtn);
  const html = wrapHtmlElements("dialog", form);
  html.id = "turn-transition-modal";

  nextPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    html.close();
  });

  return html;
}
