import Component from '@/core/Component';
import { createTemplate } from '@/utils/dom';
import { push } from '@/router';

import './DocumentHeader.scss';

export default class DocumentHeader extends Component {
  setup() {
    this.$header = createTemplate(
      '<header class="header"><button class="logo">💎 NOTIDIAN</button></header>',
    );
    this.$target.appendChild(this.$header);
  }

  setEvent() {
    this.addEvent('click', '.logo', () => {
      push('/');
    });
  }
}
