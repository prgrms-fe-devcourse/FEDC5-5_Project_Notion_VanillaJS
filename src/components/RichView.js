import { mdToHtml } from "../utils/mdToHtml.js";
import { push } from "../utils/router.js";

export default function RichView({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.id = "richView";
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $div.innerHTML = `
      <div  style="word-wrap:break-word ">
      <h1>${this.state.title ? this.state.title : ""} </h1>
      ${this.state.content ? mdToHtml(this.state.content) : ""}</div>
    `;
    document.querySelectorAll("#richView a").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = e.target.getAttribute("href").split("/documents/")[1];
        push(`/documents/${id}`);
      });
    });
  };
}
