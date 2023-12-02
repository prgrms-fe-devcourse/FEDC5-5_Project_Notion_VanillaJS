import { MAX_TITLE_LENGTH } from "../../constants.js";
import { filterTitle } from "../../utils/index.js";

export default function DocumentHeader({ $target, initialState, onDelete }) {
  const $documentHeader = document.createElement("header");
  $documentHeader.className = "document-header";
  $target.appendChild($documentHeader);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { id, title } = this.state;
    $documentHeader.innerHTML = `
    <section class="document-header-left">${filterTitle(title, MAX_TITLE_LENGTH.DOCUMENT_HEADER)}</section>
    <section data-id=${id} class="document-header-right">
        <i class="fa-regular fa-trash-can delete-button"></i>
    </section>
      `;
  };

  $documentHeader.addEventListener("click", ({ target }) => {
    const $section = target.closest("section");

    if (!$section) return;

    const { id } = $section.dataset;

    if (target.classList.contains("delete-button")) {
      onDelete(id);
    }
  });

  this.render();
}
