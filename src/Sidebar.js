import router from "./router.js";

export default function Sidebar({ targetEl, initialState }) {
  const sidebarEl = document.createElement("div");
  sidebarEl.className = "sidebar";

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClickDocument = e => {
    const { target } = e;

    if (target instanceof HTMLSpanElement) {
      const liEl = target.closest("li");
      if (liEl && liEl.dataset.id) {
        const { id } = liEl.dataset;
        router.push(`/documents/${id}`);
      }
    }
  }

  this.render = () => {
    if (!this.isInit) {
      targetEl.appendChild(sidebarEl);
      sidebarEl.addEventListener("click", this.onClickDocument);

      this.isInit = true;
    }

    if (this.state.isLoading) {
      sidebarEl.innerHTML = `
        <ul><li>문서 가져오는 중...</li></ul>
      `;
    } else if (this.state.isError) {
      alert(isError);

      sidebarEl.innerHTML = `
        <ul><li>${isError.message}</li></ul>
      `;
    } else if (this.state.data && Array.isArray(this.state.data)) {
      sidebarEl.innerHTML = `
        <ul>
          ${this.state.data.length === 0 ? `<li>문서가 없습니다.</li>` : ""}
          ${this.state.data
            .map(
              (document) => `
            <li data-id="${document.id}">
              <span>${document.title}</span>
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
