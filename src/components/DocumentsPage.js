import DocumentsList from "./DocumentsList.js";
import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function DocumentsPage({
  $target,
  initialState,
  onAddDocument,
  onDelete,
}) {
  const $page = document.createElement("div");
  $page.classList.add("documents_page");
  $target.appendChild($page);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $page.innerHTML = `<div class="documents_header">
    <span class="document_header_span">생성된 페이지</span>
    <img class="addButton" src="../public/add_docu.svg" />
    </div>`;

    const documentsList = new DocumentsList({
      $target: $page,
      initialState: this.state,
      onAddDocument,
      onDelete,
    });
  };

  $page.addEventListener("click", (e) => {
    const $header = e.target.closest(".documents_header");

    if ($header) {
      const { className } = e.target;

      if (className === "document_header_span") {
        push("/");
      }
      if (className === "addButton") {
        onAddDocument();
        // push("documents/new");
      }
    }
  });

  this.render();
}
