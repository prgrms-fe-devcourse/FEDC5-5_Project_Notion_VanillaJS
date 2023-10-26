import { DOCUMENTS_ROUTE, UNTITLED } from "../../utils/constants.js";
import { push } from "../../utils/router.js";

export default function DocumentFooter({ $target, initialState }) {
  const $footer = document.createElement("footer");
  $footer.className = "document-footer";

  $target.appendChild($footer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    if (!this.state.document || !this.state.document.documents) return;

    const { documents } = this.state.document;

    $footer.innerHTML = `
      <div class="titles">
        ${documents
          .map(({ id, title }) => `<p data-id="${id}" class="title">${title.length === 0 ? UNTITLED : title}</p>`)
          .join("")}
      </div>
    `;
  };

  $footer.addEventListener("click", (e) => {
    const $title = e.target.closest(".title");
    if (!$title) return;

    const { id } = $title.dataset;
    push(`${DOCUMENTS_ROUTE}/${parseInt(id)}`);
  });

  this.render();
}
