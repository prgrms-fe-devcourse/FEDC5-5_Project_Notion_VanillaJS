import { NEW_DOCUMENT_INIT_ID } from "../../utils/constants.js";

/**
 * @description Document 목록 카드
 */
export default function NewDocsCard({ $parent }) {
  const $component = document.createElement("li");
  $component.classList.add("docs-new-card");
  $component.classList.add("docs-index-card");

  $component.dataset.id = NEW_DOCUMENT_INIT_ID;
  const $cardName = document.createElement("a");
  $cardName.classList.add("docs-index-a");
  $cardName.classList.add("new-docs-a");

  $component.appendChild($cardName);
  $parent.appendChild($component);

  this.render = () => {
    $cardName.textContent = "new docs";
  };
  this.render();
}
