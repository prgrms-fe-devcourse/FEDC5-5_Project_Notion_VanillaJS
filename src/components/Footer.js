import { push } from "../utils/router.js";

// 현재 수정중인 문서의 id를 받아와서 하단에 문서의 하위 문서들의 링크버튼을 만들어줍니다.
export default function Footer({ $target, initialState = {} }) {
  const $footer = document.createElement("footer");
  $target.appendChild($footer);
  $footer.id = "footer";

  // 이벤트 위임을 사용하여 버튼을 클릭했을 때 이벤트를 처리합니다.
  $footer.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    e.preventDefault();
    // router.js 의 push 함수를 사용하여 url 을 문서의 id 로 변경합니다.
    push(`/documents/${e.target.id}`);
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $footer.innerHTML = this.state
      .map((item) => {
        return `<button id=${item.id}>${item.title}</button>`;
      })
      .join("");
  };
  this.render();
}
