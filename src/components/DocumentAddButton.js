import { ADD, NEW } from "../utils/constants.js";

export default function DocumentAddButton({ $target, initialState, onAdd }) {
  const $button = document.createElement("button");

  $target.appendChild($button);

  this.state = initialState;

  $button.className = `document-add-button ${this.state.position}`;

  this.render = () => {
    $button.innerHTML = `
    <button type="button">
      <i class="fa-solid fa-plus ${ADD}"></i>
    </button>
    <p>${this.state.text}</p>
    `;
  };

  $button.addEventListener("click", () => {
    onAdd(NEW);
  });

  this.render();
}
