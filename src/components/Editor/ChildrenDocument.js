import { push } from "../../utils/router.js";

export default function ChildrenDocument({ $target, initialState }) {
  const $childrenDocument = document.createElement("div");
  $childrenDocument.className = "text-container";
  // $childrenDocument.setAttribute("contenteditable", "true");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $childrenDocument.innerHTML = `
      ${this.state.documents
        .map(
          (childDocument) => `
        <div class="document-list-block child-document" data-id="${
          childDocument.id
        }">
          <img src="/src/icons/notes-book-text.svg" />
          <div class="document-title child-document-title">${
            childDocument.title === "" ? "제목 없음" : childDocument.title
          }</div>
        </div>
        `
        )
        .join("")}
    `;
  };

  this.render = () => {
    $target.appendChild($childrenDocument);
  };

  this.render();

  $childrenDocument.addEventListener("click", (e) => {
    if (e.target.closest(".child-document")) {
      const { id } = e.target.closest(".child-document").dataset;
      push(`/documents/${id}`);
      return;
    }
  });
}
