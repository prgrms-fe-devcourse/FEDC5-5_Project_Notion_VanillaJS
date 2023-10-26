import { CLASS_NAME } from '../../utils/constants.js';
import { push } from '../../utils/router.js';
import { generateRouteDocuments, generateTitle } from '../../utils/helper.js';

export default function DocumentFooter({ $target, initialState }) {
  const $footer = document.createElement('footer');
  $footer.className = CLASS_NAME.DOCUMENT_FOOTER;

  $target.appendChild($footer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    if (!this.state.document || !this.state.document.documents) return;

    const { documents } = this.state.document;

    $footer.innerHTML = `
      <div class="${CLASS_NAME.TITLES}">
        ${documents
          .map(
            ({ id, title }) =>
              `<p data-id="${id}" class="${CLASS_NAME.TITLE}">${generateTitle(
                title
              )}</p>`
          )
          .join('')}
      </div>
    `;
  };

  $footer.addEventListener('click', (e) => {
    const $title = e.target.closest(`.${CLASS_NAME.TITLE}`);
    if (!$title) return;

    const { id } = $title.dataset;
    push(generateRouteDocuments(parseInt(id)));
  });

  this.render();
}
