/*
 * DeleteDocumentButton
 * - Button : 문서 지우기
 * */

import createDOM from '../../utils/createDOM.js';

export default function DeleteDocumentButton({ $target, onDeleteDocument, isHidden }) {
  const $addDocumentButton = createDOM({
    $target,
    tagName: 'button',
    content: 'x',
    style: 'DeleteDocumentButton',
  });

  $addDocumentButton.addEventListener('click', async e => {
    onDeleteDocument();
  });
}
