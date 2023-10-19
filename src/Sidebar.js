import router from "./router.js";

export default function Sidebar({ targetEl, initialState, onCreate }) {
  const sidebarEl = document.createElement("div");
  sidebarEl.className = "sidebar";
  const headerEl = document.createElement("div");
  headerEl.innerText = "개인 페이지";
  const buttonEl = document.createElement("button");
  buttonEl.innerText = "➕";
  buttonEl.addEventListener("click", () => {
    if (onCreate) onCreate(null);
  });
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

    if (liEl && liEl.dataset.id) {
      const { id } = liEl.dataset;

      if (target instanceof HTMLSpanElement) {
        router.push(`/documents/${id}`);
      } else if (target instanceof HTMLButtonElement) {
        if (onCreate) {
          if (typeof Number(id) === "number") {
            onCreate(Number(id));
          } else {
            onCreate(null);
          }
        }
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

    if (this.state.isLoading) {
      listEl.innerHTML = `<ul><li>문서 가져오는 중...</li></ul>`;
    } else if (this.state.isError) {
      alert(isError);

      listEl.innerHTML = `<ul><li>${this.state.isError.message}</li></ul>`;
    } else if (this.state.data && Array.isArray(this.state.data)) {
      listEl.innerHTML = `
        <ul>
          ${this.state.data.length === 0 ? `<li>문서가 없습니다.</li>` : ""}
          ${this.state.data
            .map(
              (document) => `
            <li data-id="${document.id}">
              <span>${document.title}</span>
              <button>➕</button>
              ${
                document.documents.length === 0
                  ? ""
                  : `
                <ul>
                  ${document.documents
                    .map(
                      (document) => `
                    <li data-id="${document.id}">
                      <span>${document.title}</span>
                      <button>➕</button>
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
