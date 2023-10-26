import { ADD, NEW } from "../../utils/constants.js";

export default function DocumentAddButton({ $target, initialState, onAdd }) {
  const $button = document.createElement("button");

  this.state = initialState;

  const { position, text } = this.state;
  $button.className = `document-add-button ${position}`;

  $button.innerHTML = `
    <button type="button">
      <i class="fa-solid fa-plus ${ADD}"></i>
    </button>
    <p>${text}</p>
  `;

  this.render = () => {
    $target.appendChild($button);
  };

  $button.addEventListener("click", () => {
    onAdd(NEW);
  });

  this.render();
}
