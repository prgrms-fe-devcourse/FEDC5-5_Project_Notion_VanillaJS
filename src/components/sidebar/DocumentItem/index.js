import Component from '@/core/Component';
import { createTemplate } from '@/utils/dom';
import { FALLBACK } from '@/constants/fallback';
import PlusIconSrc from '/public/plus.svg';
import ArrowIconSrc from '/public/arrow.svg';
import TrashCanIconSrc from '/public/trash-can.svg';

import './DocumentItem.scss';

export default class DocumentItem extends Component {
  setup() {
    this.state = this.props;
  }

  // eslint-disable-next-line max-lines-per-function
  createDom() {
    const { docs, depth, unfoldedList, createList } = this.state;
    const { id, title } = docs;
    const isUnfolded = unfoldedList.includes(id);

    this.$li = createTemplate(
      `<li data-id="${id}" class="document-item-wrapper ${isUnfolded ? '' : 'folded'}"></li>`,
    );
    this.$target.appendChild(this.$li);

    const $wrapper = createTemplate('<div class="document-item"></div>');
    this.$li.appendChild($wrapper);

    const $toggleButton = createTemplate(
      `<button class="list-toggle-button">
        <img src="${ArrowIconSrc}" alt="toggle list icon"/>
      </button>`,
    );

    const $documentTitle = createTemplate(
      `<span class="document-title ${title ? '' : 'is-empty'}">
        ${title || FALLBACK.UNTITLED}
      </span>`,
    );

    const $pageClickButtonContainer = createTemplate('<div class="buttonContainer"></div>');

    const $addChildPageButton = createTemplate(
      `<button class="add-page">
        <img src="${PlusIconSrc}" alt="add page icon"/>
      </button>`,
    );

    const $deletePageButton = createTemplate(
      `<button class="delete-page">
        <img src="${TrashCanIconSrc}" alt="delete page icon"/>
      </button>`,
    );

    $wrapper.appendChild($toggleButton);
    $wrapper.appendChild($documentTitle);
    $wrapper.appendChild($pageClickButtonContainer);
    $pageClickButtonContainer.appendChild($addChildPageButton);
    $pageClickButtonContainer.appendChild($deletePageButton);

    if (docs.documents.length > 0)
      createList({
        parent: this.$li,
        childrens: docs.documents,
        depth,
        unfoldedList,
      });
    else this.createEmptyDom(this.$li, depth + 1);
  }

  createEmptyDom($wrapper, depth) {
    const $emptyUl = createTemplate(`
    <ul class="document-list depth-${depth}">
      <li class="document-item end-of-list">하위 페이지 없음</li>
    </ul>`);

    $wrapper.appendChild($emptyUl);
  }
}
