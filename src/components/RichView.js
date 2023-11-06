import { mdToHtml } from "../utils/mdToHtml.js";
import { push } from "../utils/router.js";

// rich 하게 표현된 문서를 보여주는 컴포넌트입니다.
export default function RichView({
  $target,
  initialState,
  richViewId = "richView",
}) {
  const $div = document.createElement("div");
  $div.id = richViewId;
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 문서의 제목과 내용을 mdToHtml 함수를 사용하여 html 로 변환합니다.
    $div.innerHTML = `
      <div  style="word-wrap:break-word ">
      <h1>${this.state.title ? this.state.title : ""} </h1>
      ${this.state.content ? mdToHtml(this.state.content) : ""}</div>
    `;

    // a 태그를 클릭했을 때 router.js 의 push 함수를 사용하여 url 을 문서의 id 로 변경합니다.
    document.querySelectorAll(`#${richViewId} a`).forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = e.target.getAttribute("href").split("/documents/")[1];
        push(`/documents/${id}`);
      });
    });
  };
}
