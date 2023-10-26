import { push } from "../router.js";

export default function Footer({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.classList.add("footer");
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.footerTemplate = (documents) => {
    return `${documents
      .map(({ id, title }) => {
        return `<button data-id="${id}" class="child-item">${title}</button>`;
      })
      .join("")}`;
  };

  this.render = () => {
    $div.innerHTML = "";
    if (this.state.post) {
      const { documents } = this.state.post;
      // 하위 문서가 있다면 하위 문서 제목이 보이는 button 생성함.
      $div.innerHTML = documents ? this.footerTemplate(documents) : "";
    }
  };

  this.render();

  $div.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button) {
      const { id } = $button.dataset;

      // 버튼 클릭 시 /documents/${id}로 url 변경
      push(`/documents/${id}`);
    }
  });
}
