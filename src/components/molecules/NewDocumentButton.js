/*
 * NewDocumentButton
 * - Button : 새 문서 만들기
 * */

import createDOM from '../../utils/createDOM.js';

export default function NewDocumentButton({ $target, onCreateDocument, isFullSize = false }) {
  const $addDocumentButton = createDOM({
    $target,
    tagName: 'button',
    content: '+',
    style: 'NewDocumentButton',
  });
  $addDocumentButton.style.width = `${isFullSize ? '100%' : ''}`;

  $addDocumentButton.addEventListener('click', e => {
    onCreateDocument();
  });
}
