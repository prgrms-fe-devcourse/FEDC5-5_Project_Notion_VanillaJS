import { TAG } from "../../constants/tag.js";
import { navigate } from "../../routes/router.js";
import { createCustomElement } from "../../utils/dom.js";
import { CSS_SELECTOR } from "../Document/cssSelector.js";

export default function LinkButton({ linkUrl, text }) {
  const $linkButton = createCustomElement({
    tag: TAG.BUTTON,
    props: {
      className: CSS_SELECTOR.DOCUMENT.LINKED_BTN,
      textContent: text,
    },
  });

  $linkButton.addEventListener("click", () => {
    navigate(linkUrl);
  });

  return $linkButton;
}
