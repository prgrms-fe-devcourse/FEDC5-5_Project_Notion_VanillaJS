/*
 *  DocumentObject
 * - DocumentLinkButton + NewDocumentButton
 * */

import NewDocumentButton from '../molecules/NewDocumentButton.js';
import DocumentLinkButton from '../molecules/DocumentLinkButton.js';
import DeleteDocumentButton from '../molecules/DeleteDocumentButton.js';
import { request } from '../../services/api.js';
import { push } from '../../utils/router.js';
import { getItem, setItem } from '../../utils/storage.js';
import createDOM from '../../utils/createDOM.js';
import { checkCurrentDocument } from '../../utils/checkCurrentDocument.js';

export default function DocumentObject({ $target, currentDocumentData }) {
  const $summary = createDOM({ $target, tagName: 'summary', style: 'DocumentObject' });

  $summary.addEventListener('mouseover', e => {
    $summary.querySelector('span[data-role]').style.visibility = 'visible';
  });

  $summary.addEventListener('mouseout', e => {
    $summary.querySelector('span[data-role]').style.visibility = 'hidden';
  });

  this.state = currentDocumentData;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const onDeleteDocument = async () => {
    await request(`/documents/${this.state.id}`, { method: 'DELETE' });
    const newOpenIds = getItem('openDocumentIds')?.filter(openId => openId !== String(this.state.id));
    setItem('openDocumentIds', newOpenIds);
    push('/');
  };

  const onCreateDocument = async () => {
    const postResponse = await request('/documents', {
      method: 'POST',
      body: { title: '첫 화면', parent: this.state.id },
    });
    push(`/documents/${postResponse.id}`);
  };

  this.render = () => {
    $summary.innerHTML = '';
    $summary.textContent = '> ';
    const documentLinkButton = new DocumentLinkButton({
      $target: $summary,
      title: this.state.title,
      documentId: this.state.id,
      checkCurrentDocument: () => checkCurrentDocument($summary, this.state.id),
    });

    const saveTitle = getItem(`SAVE_DOCUMENT_TITLE_KEY-${this.state.id}`);
    saveTitle && documentLinkButton.setState(saveTitle);

    const $setting = createDOM({ $target: $summary, tagName: 'span', setAttribute: [['data-role', 'setting']] });
    $setting.style.visibility = 'hidden';

    new DeleteDocumentButton({ $target: $setting, onDeleteDocument });
    new NewDocumentButton({ $target: $setting, onCreateDocument });
  };

  this.render();
}
