/*
 * DocumentDetail
 * - DocumentHeader
 * - EditDocument
 */

import DocumentHeader from '../organisms/DocumentHeader.js';
import EditDocument from '../organisms/EditDocument.js';
import createDOM from '../../utils/createDOM.js';

export default function DocumentDetail({ $target, documentState }) {
  const $documentDetail = createDOM({ $target, style: 'DocumentDetail' });

  this.setState = nextState => {
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
