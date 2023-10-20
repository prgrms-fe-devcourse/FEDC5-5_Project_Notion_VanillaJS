import router from "./router.js";

export default function Sidebar({
  targetEl,
  initialState,
  onCreate,
  onDelete,
}) {
  const sidebarEl = document.createElement("div");
  sidebarEl.className = "sidebar";
  const headerEl = document.createElement("div");
  headerEl.innerText = "개인 페이지";
  const buttonEl = document.createElement("button");
  buttonEl.innerText = "➕";
  buttonEl.className = "create-button";
  const listEl = document.createElement("div");

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClickDocument = (e) => {
    const { target } = e;
    const liEl = target.closest("li");
    const id = liEl?.dataset?.id ? Number(liEl.dataset.id) : null;

    if (target.className === "document-title") {
      if (id) {
        router.push(`/documents/${id}`);
      }
    } else if (target.className === "delete-button") {
      if (onDelete && id) {
        onDelete(id);
      }
    } else if (target.className === "create-button") {
      if (onCreate) {
        onCreate(id);
      }
    }
  };

  this.render = () => {
    if (!this.isInit) {
      headerEl.appendChild(buttonEl);
      sidebarEl.appendChild(headerEl);
      sidebarEl.appendChild(listEl);
      targetEl.appendChild(sidebarEl);
      sidebarEl.addEventListener("click", this.onClickDocument);

      this.isInit = true;
    }

    const { selectedDocumentId, documents } = this.state;

    if (documents.isLoading) {
      listEl.innerHTML = `<ul><li>문서 가져오는 중...</li></ul>`;
    } else if (documents.isError) {
      listEl.innerHTML = `<ul><li>${documents.isError.message}</li></ul>`;
    } else if (documents.data && Array.isArray(documents.data)) {
      listEl.innerHTML = `
        <ul>
          ${documents.data.length === 0 ? `<li>문서가 없습니다.</li>` : ""}
          ${documents.data
            .map(
              (document) => `
            <li data-id="${document.id}" data-selected="${
                document.id === selectedDocumentId
              }">
              <span class="document-title">${document.title}</span>
              <button class="delete-button">🗑️</button>
              <button class="create-button">➕</button>
              ${
                document.documents.length === 0
                  ? ""
                  : `
                <ul>
                  ${document.documents
                    .map(
                      (document) => `
                    <li data-id="${document.id}" data-selected="${
                        document.id === selectedDocumentId
                      }">
                      <span class="document-title">${document.title}</span>
                      <button class="delete-button">🗑️</button>
                      <button class="create-button">➕</button>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              `
              }
            </li>
          `
            )
            .join("")}
        </ul>
      `;
    }
  };
}
