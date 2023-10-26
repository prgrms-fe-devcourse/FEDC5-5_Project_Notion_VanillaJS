import { push } from "../utils/router.js";

export default function Footer({ $target, initialState = {} }) {
  const $footer = document.createElement("footer");
  $target.appendChild($footer);
  $footer.id = "footer";

  $footer.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    e.preventDefault();
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
