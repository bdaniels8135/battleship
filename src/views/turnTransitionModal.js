import {
  buildInputHtml,
  buildTextHtml,
  wrapHtmlElements,
} from "./htmlBuilders";

export default function turnTransitionModal() {
  const modalText = buildTextHtml("p", "Modal Text");
  modalText.id = "modal-text";
  const modalTextBox = wrapHtmlElements("div", modalText);
  modalTextBox.classList.add("modal-text-box");

  const nextPlayerBtn = buildInputHtml(
    "button",
    "next-player-btn",
    "next-player-btn"
  );
  nextPlayerBtn.value = "Ready!";
  nextPlayerBtn.setAttribute("autofocus", "");

  const form = wrapHtmlElements("form", modalTextBox, nextPlayerBtn);
  const html = wrapHtmlElements("dialog", form);
  html.id = "turn-transition-modal";

  nextPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    html.close();
  });

  return html;
}
