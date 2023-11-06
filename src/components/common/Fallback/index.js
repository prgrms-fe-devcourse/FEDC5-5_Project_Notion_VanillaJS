import Component from '@/core/Component';
import { createTemplate } from '@/utils/dom';
import { push } from '@/router';
import { ERROR_MESSAGE } from '@/constants/error';
import ErrorIconSrc from '/public/error.svg';

import './Fallback.scss';

export default class Fallback extends Component {
  setup() {
    this.state = { isError: false, code: null };
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  // eslint-disable-next-line max-lines-per-function
  createDom() {
    if (!this.state.isError) return;

    this.$fallback = createTemplate('<div class="error"></div>');
    this.$errorIcon = createTemplate(`<img src="${ErrorIconSrc}" alt="error-icon" />`);
    this.$button = createTemplate('<button class="reset-button">홈으로 돌아가기</button>');

    const { code } = this.state;

    this.$message = createTemplate(
      `<p class="error-message"><span class="error-code">${code}</span>: ${ERROR_MESSAGE[code]}</p>`,
    );
    this.$fallback.appendChild(this.$errorIcon);
    this.$fallback.appendChild(this.$message);
    this.$fallback.appendChild(this.$button);
    this.$target.appendChild(this.$fallback);
  }

  setEvent() {
    this.addEvent('click', '.reset-button', () => {
      this.$target.replaceChildren();
      this.state = { isError: false, code: null };
      push('/');
    });
  }
}
