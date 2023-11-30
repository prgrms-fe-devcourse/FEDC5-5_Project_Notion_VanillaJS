/*
 * DocumentLinkButton
 * - LinkButton : 해당 문서로 이동
 * */

import createDOM from '../../utils/createDOM.js';

export default function DocumentLinkButton({ $target, title, documentId, checkCurrentDocument }) {
  const $title = createDOM({
    $target,
    tagName: 'span',
    content: title,
    style: 'DocumentLinkButton',
    setAttribute: [
      ['data-id', documentId],
      ['data-type', 'document'],
    ],
  });

  this.setState = nextState => {
    $title.textContent = nextState;
  };

  this.init = () => {
    checkCurrentDocument();
  };

  this.init();
}
