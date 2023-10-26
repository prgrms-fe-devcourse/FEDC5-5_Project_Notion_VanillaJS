import router from "./router.js";
import { X_USERNAME } from "./api.js";
import { UNTITLED } from "./utility.js";

export default function Finder({
  targetEl,
  initialState,
  onCreate,
  onDelete,
}) {
  const finderEl = document.createElement("div");
  const headerEl = document.createElement("div");
  const listEl = document.createElement("div");

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const onClickDocument = (e) => {
    const { target } = e;
    const liEl = target.closest("li");
    const id = liEl?.dataset?.id ? Number(liEl.dataset.id) : null;
    const btnEl = target.closest(".document button, .header button");

    if (btnEl) {
      if (btnEl.className === "delete-button") {
        if (onDelete && id) {
          onDelete(id);
        }
      } else if (btnEl.className === "create-button") {
        if (onCreate) {
          onCreate(id);
        }
      }
    } else {
      if (id) {
        router.push(`/documents/${id}`);
      }
    }
  };

  const getListHTMLString = (documents, selectedDocumentId) => `
    <ul>
      ${documents
        .map(
          (document) => `
        <li data-id="${document.id}" data-selected="${
            document.id === selectedDocumentId
          }">
          <div class="document">
            <span class="document-title">
              <img class="icon" src="/svg/file.svg" alt="file icon" />
              <span>${document.title.length ? document.title : UNTITLED}</span>
            </span>
            <div class="buttons">
              <button class="delete-button"><img class="icon" src="/svg/trash.svg" alt="delete document icon"/></button>
              <button class="create-button"><img class="icon" src="/svg/plus.svg" alt="add document icon"/></button>
            </div>
          </div>
        ${
          document.documents?.length > 0
            ? `
          <div class="child-pages">${getListHTMLString(
            document.documents,
            selectedDocumentId
          )}</div>
        `
            : ""
        }
        </li>
      `
        )
        .join("")}
    <ul>
  `;

  this.init = () => {
    finderEl.className = "finder";
    headerEl.className = "header";
    listEl.className = "documents";

    finderEl.addEventListener("click", onClickDocument);

    finderEl.appendChild(headerEl);
    finderEl.appendChild(listEl);
    targetEl.appendChild(finderEl);

    headerEl.innerHTML = `
      <span class="symbol">${X_USERNAME.substring(0, 1)}</span>
      <span>${X_USERNAME}의 Notion</span>
      <button class="create-button"><img class="icon" src="/svg/plus.svg" alt="add document icon"/></button>
    `;
  };

  this.render = () => {
    if (!this.isInit) {
      this.init();
      this.isInit = true;
    }

    const { selectedDocumentId, documents } = this.state;

    if (documents.isLoading) {
      listEl.innerHTML = `<ul><li>문서 가져오는 중...</li></ul>`;
    } else if (documents.isError) {
      listEl.innerHTML = `<ul><li>${documents.isError.message}</li></ul>`;
    } else if (documents.data && Array.isArray(documents.data)) {
      listEl.innerHTML = getListHTMLString(documents.data, selectedDocumentId);
    }
  };
}
