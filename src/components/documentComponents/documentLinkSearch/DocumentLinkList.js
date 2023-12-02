import { documentsApi } from "../../../utils/index.js";
import DocumentLink from "./DocumentLink.js";

export default function DocumentLinkList({ $parent, $target, initialState, onClose }) {
  const $documentLinkList = document.createElement("ul");
  $documentLinkList.className = "document-link-list";

  $target.appendChild($documentLinkList);

  this.state = initialState;

  this.componentDidMount = async () => {
    const documents = await documentsApi().getDocuments();
    const documentLinks = documents.map(({ id, title, documents }) => ({
      id,
      title,
      documents: documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: documents.map(({ id }) => ({ parentId: id })),
      })),
    }));
    this.setState({ documentLinks });
  };

  this.componentDidMount();

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentLinkList.innerHTML = ` 
    <p class="modal-title">페이지를 선택하세요</p>
      <ul class="modal-list">
      ${this.state.documentLinks
        .map(
          ({ id, title, documents }) => `
          ${
            title !== ""
              ? `
          <li data-id=${id} data-title="${title}" id="link" class="wrapper">
            <i class="fa-regular fa-file"></i>
            <span class="link-title">${title}</span>
          </li>
          `
              : ""
          }
      `
        )
        .join("")}
      </ul>`;
  };

  $documentLinkList.addEventListener("click", ({ target }) => {
    const $wrapper = target.closest(".wrapper");

    if (!$wrapper) return;

    const { id, title } = $wrapper.dataset;

    if (id) {
      new DocumentLink({ $target: $parent, id, title });

      const $searchDocumentLink = document.querySelector(".search-document-link");
      $searchDocumentLink.remove();

      onClose();
    }
  });

  this.render();
}
