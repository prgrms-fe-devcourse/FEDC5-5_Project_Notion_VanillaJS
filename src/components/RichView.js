import { mdToHtml } from "../utils/mdToHtml.js";
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
      <div  style="width: 500px;border: 1px solid;word-wrap:break-word ">
      <h1>${this.state.title ? this.state.title : ""} </h1>
      ${this.state.content ? mdToHtml(this.state.content) : ""}</div>
    `;
  };
}
