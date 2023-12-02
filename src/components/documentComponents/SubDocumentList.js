import { push } from "../../utils/index.js";

export default function SubDocumentList({ $target, initialState }) {
  const $editorFooter = document.createElement("nav");
  $editorFooter.className = "editor-bottom-nav";
  $target.appendChild($editorFooter);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { documents } = this.state;
    $editorFooter.innerHTML = `
    <ul class="subdocument-list">
      ${documents
        .map(
          ({ id, title }) => `
        <li data-id=${id} class="subdocument-link">
        <i class="fa-regular fa-file"></i>
          <span class="subdocument-link-title">${(title ?? "제목 없음") || (title === "" && "제목 없음")}</span>
        </li>
        `
        )
        .join("")}
    </ul>
        `;
  };

  $editorFooter.addEventListener("click", ({ target }) => {
    event.stopPropagation();

    const $li = target.closest("li");

    if (!$li) return;

    let { id } = $li.dataset;
    id = parseInt(id);

    if (!isNaN(id)) {
      push(`${id}`);
    }
  });

  this.render();
}
