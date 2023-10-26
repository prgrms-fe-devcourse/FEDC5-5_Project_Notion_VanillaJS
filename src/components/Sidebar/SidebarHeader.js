import { CLASS_NAME } from "../../utils/constants.js";
import { isEqual } from "../../utils/helper.js";
import { push } from "../../utils/router.js";
import { validateConstructorUsage } from "../../utils/validation.js";

export default function SidebarHeader({ $target, initialState }) {
  validateConstructorUsage(new.target);

  const $header = document.createElement("div");
  $header.className = CLASS_NAME.HEADER;

  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqual(this.state, nextState)) return;

    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $header.innerHTML = `${this.state}`;
  };

  $header.addEventListener("click", ({ target }) => {
    const $button = target.closest(".header");
    if ($button) push("/");
  });

  this.render();
}
