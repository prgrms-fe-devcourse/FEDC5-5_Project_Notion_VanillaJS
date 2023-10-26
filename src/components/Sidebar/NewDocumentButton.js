import { CLASS_NAME } from "../../utils/constants.js";
import { validateConstructorUsage } from "../../utils/validation.js";

export default function NewDocumentButton({ $target, initialState, onAdd }) {
  validateConstructorUsage(new.target);

  const $button = document.createElement("span");
  $button.className = CLASS_NAME.POST_BUTTON;

  $target.appendChild($button);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $button.innerHTML = `
      <i class="fa-solid fa-square-plus new-button"></i>
      <p class="button-title">New Page</p>
    `;
  };

  $button.addEventListener("click", ({ target }) => {
    const $newbutton = target.closest(".post-button");
    if ($newbutton) {
      onAdd(null);
    }
  });

  this.render();
}
