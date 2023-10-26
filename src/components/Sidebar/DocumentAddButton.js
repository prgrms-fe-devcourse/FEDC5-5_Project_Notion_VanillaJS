import { CLASS_NAME, ID } from '../../utils/constants.js';

export default function DocumentAddButton({ $target, initialState, onAdd }) {
  const $button = document.createElement('div');

  this.state = initialState;

  const { position, text } = this.state;

  $button.className = `${CLASS_NAME.DOCUMENT_ADD_BUTTON} ${position}`;

  $button.innerHTML = `
    <button type="button">
      <i class="fa-solid fa-plus ${CLASS_NAME.ADD}"></i>
    </button>
    <p>${text}</p>
  `;

  this.render = () => {
    $target.appendChild($button);
  };

  $button.addEventListener('click', () => {
    onAdd(ID.NEW);
  });

  this.render();
}
