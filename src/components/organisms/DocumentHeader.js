/*
 * DocumentsList
 * - DocumentLinkButton / DocumentLinkButton / DocumentLinkButton ...
 * */

import DocumentLinkButton from '../molecules/DocumentLinkButton.js';
import { push } from '../../utils/router.js';
import { getItem } from '../../utils/storage.js';
import createDOM from '../../utils/createDOM.js';
import { checkCurrentDocument } from '../../utils/checkCurrentDocument.js';

export default function DocumentHeader({ $target, documentPath }) {
  const $documentHeader = createDOM({ $target, style: 'DocumentHeader' });

  this.state = documentPath;
  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  $documentHeader.addEventListener('click', e => {
    const { type, id } = e.target.dataset;
    if (type === 'document') {
      if (id === 'null') push(`/`);
      else push(`/documents/${id}`);
    }
  });

  this.render = () => {
    $documentHeader.innerHTML = '';
    this.state.forEach((state, idx) => {
      if (state === null) return;

      const documentLinkButton = new DocumentLinkButton({
        $target: $documentHeader,
        title: state.title,
        documentId: state.id,
        checkCurrentDocument: () => checkCurrentDocument($documentHeader, state.id),
      });

      if (idx !== this.state.length - 1) {
        createDOM({ $target: $documentHeader, tagName: 'span', content: ' / ' });
      } else {
        const saveTitle = getItem(`SAVE_DOCUMENT_TITLE_KEY-${state.id}`);
        saveTitle && documentLinkButton.setState(saveTitle);
      }
    });
  };
}
