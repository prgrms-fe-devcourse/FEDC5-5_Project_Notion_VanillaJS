import { navigate } from "../utils/router.js";

export default function Sidebar({
  $target,
  initialState,
  addNewDocument,
  fetchDocument,
  removeDocument,
}) {
  const $sideContainer = document.createElement("div");
  $sideContainer.classList.add("side-container");
  $target.appendChild($sideContainer);

  this.state = initialState;

  const toggleDocument = (element) => {
    const $leafDocuments = element.querySelector(".side-bar-leaf-documents");
    const isVisible = $leafDocuments.style.display === "block";
    $leafDocuments.style.display = isVisible ? "none" : "block";
  };

  const renderChildDocuments = (childDocuments) => {
    if (childDocuments && childDocuments.length > 0) {
      return `<div class="side-bar-leaf-documents" style="display: none;">
        ${childDocuments.map(renderDocuments).join("")}
      </div>`;
    } else {
      return '<div class="side-bar-leaf-documents" style="display: none;">하위 문서가 없습니다.</div>';
    }
  };

  const renderDocuments = (document) => {
    const { id, title, documents: childDocuments } = document;
    const childDocumentsHTML = renderChildDocuments(childDocuments);

    return `
      <div class="side-bar-document" data-id="${id}">
        <img class="toggle-button" src="/src/assets/arrow.png" alt="toggle button">
        <span class="click-title">${title}</span>
        <img class="add-button" src="/src/assets/add.png"/>
        <img class="delete-button" src="/src/assets/delete.png"/>
        ${childDocumentsHTML}
      </div>
    `;
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const handleButtonClick = (e) => {
    const $node = e.target;

    if ($node.classList.contains("add-document")) {
      addNewDocument(null);
    } else {
      const $parentDocument = $node.closest(".side-bar-document");
      const { id } = $parentDocument.dataset;

      if ($node.classList.contains("click-title")) {
        e.preventDefault();
        fetchDocument(id);
        navigate(`/documents/${id}`);
      } else if ($node.classList.contains("toggle-button")) {
        toggleDocument($parentDocument);
      } else if ($node.classList.contains("add-button")) {
        addNewDocument(id);
      } else if ($node.classList.contains("delete-button")) {
        removeDocument(id);
      }
    }
  };

  this.render = () => {
    const documentListHTML = this.state.map(renderDocuments).join("");

    $sideContainer.innerHTML = `
      <div class="side-bar-container">
        <h3 class="side-bar-header-title">김윤경의 Notion</h3>
        <button class="add-document">문서 추가</button>
        ${documentListHTML}
      </div>
    `;
  };

  $sideContainer.addEventListener("click", handleButtonClick);

  this.render();
}
