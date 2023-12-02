import { MAX_TITLE_LENGTH } from "../../constants.js";
import { filterTitle } from "../../utils/index.js";

export default function Editor({ $target, initialState, onEdit }) {
  const $editor = document.createElement("section");
  $target.appendChild($editor);
  $editor.className = "editor";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  $editor.innerHTML = `
  <h1 class="title" type="text" placeholder="제목 없음" contentEditable="true"></h1>
  <div class="content" placeholder="빈 페이지" contentEditable="true"></div>
`;

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector(".title").textContent = title;
    $editor.querySelector(".content").textContent = content;
  };

  $editor.addEventListener("input", ({ target }) => {
    const selectedDocumentSidebarTitle = document.querySelector(".list-item.selected .list-item-title");
    const selectedDocumentHeaderTitle = document.querySelector(".document-header-left");

    const value = target.classList.value;

    if (this.state[value] !== undefined) {
      const nextState = { ...this.state, [value]: target.textContent };

      selectedDocumentSidebarTitle.textContent = filterTitle(this.state.title, MAX_TITLE_LENGTH.DOCUMENT_LIST_ITEM);
      selectedDocumentHeaderTitle.textContent = filterTitle(this.state.title, MAX_TITLE_LENGTH.DOCUMENT_HEADER);

      this.setState(nextState);
      onEdit(nextState);
    }
  });

  this.render();
}
