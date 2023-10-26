import { CLASS_NAME } from '../../utils/constants.js';
import { generateTitle } from '../../utils/helper.js';

export default function DocumentHeader({ $target, initialState, onDelete }) {
  const $header = document.createElement('header');
  $header.className = CLASS_NAME.DOCUMENT_HEADER;

  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { title } = this.state.document;

    $header.innerHTML = `
      <div>
        <span class="${CLASS_NAME.TITLE}">${generateTitle(title)}</span>
      </div>
      <div class="${CLASS_NAME.BUTTONS}">
        <button class="${CLASS_NAME.DELETE}" type="button">
            <i class="fa-regular fa-trash-can ${CLASS_NAME.DELETE}"></i>
        </button>
      </div>
    `;
  };

  $header.addEventListener('click', (e) => {
    const { target } = e;

    if (target.classList.contains(CLASS_NAME.DELETE)) {
      onDelete(this.state.documentId,this.state.documentId);
    }
  });

  this.render();
}
