import Component from '@/core/Component';
import { FALLBACK } from '@/constants/fallback';
import { createTemplate } from '@/utils/dom';

import './EditorBody.scss';

export default class EditorBody extends Component {
  setup() {
    this.state = null;

    this.$editor = createTemplate('<article class="editor-container"></article>');
    this.$target.appendChild(this.$editor);

    this.createDom();
  }

  createDom() {
    this.$title = createTemplate('<input class="editor-title"></input>');
    this.$content = createTemplate('<textarea class="editor-content"></textarea>');

    this.$editor.appendChild(this.$title);
    this.$editor.appendChild(this.$content);
  }

  // eslint-disable-next-line max-lines-per-function
  setEvent() {
    this.addEvent('keyup', '.editor-title', (e) => {
      const { value } = e.target;
      const nextState = { ...this.state, title: value };

      this.setState(nextState);
      this.props.onEdit(this.state);
    });

    this.addEvent('input', '.editor-content', ({ target }) => {
      const { value } = target;
      const nextState = { ...this.state, content: value };

      this.setState(nextState);
      this.props.onEdit(this.state);
    });
  }

  render() {
    if (!this.state) {
      this.$editor.classList.remove('visible');
      return;
    }

    this.$editor.classList.add('visible');

    const { title, content } = this.state;

    this.$title.value = title || '';
    this.$title.placeholder = FALLBACK.UNTITLED;
    this.$content.value = content || '';
    this.$content.placeholder = FALLBACK.NONE_OF_CONTENT;
  }
}
