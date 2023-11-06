import Component from '@/core/Component';
import { push } from '@/router';
import { API_END_POINT } from '@/constants/api';
import { FALLBACK } from '@/constants/fallback';
import { createTemplate } from '@/utils/dom';

import './Navigation.scss';

export default class Navigation extends Component {
  setup() {
    this.state = [];

    this.$editorNavigation = createTemplate('<div class="editor-nav"></div>');
    this.$target.appendChild(this.$editorNavigation);

    this.$title = createTemplate('<h3 class="editor-nav-title"></h3>');
    this.$nav = createTemplate('<nav class="editor-nav-list"></nav>');

    this.$editorNavigation.appendChild(this.$title);
    this.$editorNavigation.appendChild(this.$nav);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  // eslint-disable-next-line max-lines-per-function
  createDom() {
    this.$nav.replaceChildren();

    if (!this.state) {
      this.$title.innerText = '';
      return;
    }

    this.$title.innerText = '이런 게시글은 어때요?';

    const $ul = document.createElement('ul');
    this.$nav.appendChild($ul);

    if (this.state.length < 1) {
      const $li = createTemplate(
        '<li class="editor-nav-item empty-item">이동할 수 있는 하위 페이지가 없습니다. 💩</li>',
      );
      $ul.appendChild($li);

      return;
    }

    this.state.map((docs) => {
      const $li = createTemplate(
        `<li data-id="${docs.id}" class="editor-nav-item">${docs.title || FALLBACK.UNTITLED}</li>`,
      );
      $ul.appendChild($li);
    });
  }

  setEvent() {
    this.addEvent('click', '.editor-nav-item', ({ target }) => {
      const $li = target.closest('li');
      const documentId = Number($li.dataset.id);

      if (!documentId) return;

      push(`${API_END_POINT.DOCUMENTS}/${documentId}`);
    });
  }
}
