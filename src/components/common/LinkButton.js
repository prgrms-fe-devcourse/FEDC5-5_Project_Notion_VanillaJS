import { push } from "../../router.js";

export default function LinkButton({ $target, initState }) {
  const $element = document.createElement("button");

  $target.appendChild($element);

  this.state = initState;

  this.render = () => {
    $element.textContent = this.state.text;
  };
  this.render();

  $element.addEventListener("click", () => {
    push(this.state.link);
  });
}
