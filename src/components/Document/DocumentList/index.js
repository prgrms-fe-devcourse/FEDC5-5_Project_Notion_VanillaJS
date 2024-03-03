import { addEvent, createDOM } from '../../../utils/dom.js';
// import './style.scss';

export default function DocumentList({
  $target,
  initialState,
  onClickDocument,
  onClickAddButton,
  onClickRemoveButton,
}) {
  const $documentList = createDOM({ tag: 'div', className: 'document-list' });

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocumentsTree = (documents) => {
    return `
      <ul>
        ${documents
          .map(
            (document) => `
          <li data-id="${document.id}" class="document-item">
            <div class='main-document-item'>
              <button class='fold-button'>
              ${
                document.documents && document.documents.length > 0
                  ? '<i class="fa-solid fa-chevron-down"></i>'
                  : '<i class="fa-solid fa-chevron-right"></i>'
              }
              </button>
              <span class="title">${document.title}</span>
              <div class='button-group'>
                <button class='remove-button'>
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class='add-button'>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            
            ${
              document.documents && document.documents.length > 0
                ? renderDocumentsTree(document.documents)
                : ''
            }
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = renderDocumentsTree(this.state);
  };

  this.render();

  this.handleAddDocument = (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      const { target } = e;

      if (
        target.matches('.add-button') ||
        target.matches('.fa-solid.fa-plus')
      ) {
        onClickAddButton(id);
      }
    }
  };

  this.handleClickDocument = (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      const { target } = e;

      if (target.matches('.title')) onClickDocument(id);
    }
  };

  this.handleRemoveDocument = (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      const { target } = e;

      if (
        target.matches('.remove-button') ||
        target.matches('.fa-solid.fa-trash-can')
      ) {
        onClickRemoveButton(id);
      }
    }
  };

  this.handleFoldDocument = (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { target } = e;

      if (
        target.matches('.fold-button') ||
        target.matches('.fa-solid.fa-chevron-right') ||
        target.matches('.fa-solid.fa-chevron-down')
      ) {
        const $ul = $li.querySelector('ul');
        const $foldButton = $li.querySelector('.fold-button');
        if ($ul) {
          if ($ul.style.display === 'none') {
            $ul.style.display = 'block';
            $foldButton.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
          } else {
            $ul.style.display = 'none';
            $foldButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
          }
        }
      }
    }
  };

  addEvent({
    $dom: $documentList,
    className: null,
    type: 'click',
    callback: this.handleAddDocument,
  });
  addEvent({
    $dom: $documentList,
    className: null,
    type: 'click',
    callback: this.handleClickDocument,
  });
  addEvent({
    $dom: $documentList,
    className: null,
    type: 'click',
    callback: this.handleRemoveDocument,
  });
  addEvent({
    $dom: $documentList,
    className: null,
    type: 'click',
    callback: this.handleFoldDocument,
  });
}
