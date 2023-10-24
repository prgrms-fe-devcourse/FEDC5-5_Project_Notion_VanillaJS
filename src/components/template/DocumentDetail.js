/*
 * DocumentDetail
 * - DocumentHeader
 * - EditDocument
 */

import DocumentHeader from '../organisms/DocumentHeader.js';
import EditDocument from '../organisms/EditDocument.js';

export default function DocumentDetail({ $target, documentState }) {
  const $documentDetail = document.createElement('div');
  $documentDetail.style.width = '100%';
  $documentDetail.style.display = 'flex';
  $documentDetail.style.flexDirection = 'column';
  $target.appendChild($documentDetail);

  this.setState = nextState => {
    if (nextState === null) {
      return;
    }

    console.log('DocumentDetail', nextState);
    const { id, title, content, documentPath } = nextState;

    documentHeader.setState(documentPath);
    editDocument.setState({ id, title, content });
  };

  const documentHeader = new DocumentHeader({ $target: $documentDetail, documentPath: documentState.documentPath });
  const editDocument = new EditDocument({
    $target: $documentDetail,
    initialState: { id: documentState.id, title: documentState.title, content: documentState.content },
  });
}
