/*
 * DocumentTitle
 * - Title : 문서 제목 (Editor)
 */

import { saveDocumentTitleEvent } from '../../../utils/saveDocumentTitle.js';
import createDOM from '../../../utils/createDOM.js';

export default function DocumentTitle({ $target, initialState, onEditTitle }) {
  const $title = createDOM({
    $target,
    tagName: 'input',
    style: 'DocumentTitle',
    setAttribute: [['placeholder', initialState.title || '제목을 입력하세요.']],
  });

  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  $title.addEventListener('keyup', e => {
    const nextTitle = e.target.value;
    saveDocumentTitleEvent(nextTitle, this.state.id);
    onEditTitle(nextTitle);
  });

  this.render = () => {
    $title.value = this.state.title;
    this.state.isDisabled ? $title.setAttribute('disabled', 'true') : $title.removeAttribute('disabled');
  };

  this.render();
}
