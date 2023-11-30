/*
 * DocumentsList
 * - DocumentObject
 *  - DocumentObject
 *  - ...
 * - DocumentObject
 * - ...
 * - NewDocumentButton
 * */
import DocumentObject from './DocumentObject.js';
import { getItem, setItem } from '../../utils/storage.js';
import { push } from '../../utils/router.js';
import createDOM from '../../utils/createDOM.js';

export default function DocumentsList({ $target, initialState }) {
  const $documentsList = createDOM({ $target, tagName: 'ul', style: 'DocumentsList' });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  $documentsList.addEventListener('click', e => {
    const $documentsContainer = e.target.closest('div[data-container]');
    console.log(e.target);
    if (!$documentsContainer) return;

    const { type, id } = e.target.dataset;

    if (type === 'document') {
      e.preventDefault();
      id && push(`/documents/${id}`);
    } else {
      const details = e.target.closest('details');
      const { id } = details.querySelector('summary span').dataset;
      if (details.open) {
        const nextOpenIds = getItem('openDocumentIds').filter(openId => openId !== id);
        details.setAttribute('open', 'false');
        setItem('openDocumentIds', nextOpenIds);
      } else {
        const currentOpenIds = getItem('openDocumentIds');
        const nextOpenIds = currentOpenIds ? [...currentOpenIds, id] : [id];
        setItem('openDocumentIds', nextOpenIds);
      }
    }
  });

  this.render = () => {
    $documentsList.innerHTML = '';

    this.state.forEach(state => {
      const $details = createDOM({ $target: $documentsList, tagName: 'details' });
      const openIds = getItem('openDocumentIds')?.map(Number);
      openIds?.includes(state.id) && $details.setAttribute('open', 'true');

      new DocumentObject({
        $target: $details,
        currentDocumentData: { title: state.title, id: state.id },
      });

      if (state.documents.length) {
        new DocumentsList({ $target: $details, initialState: state.documents });
      } else {
        createDOM({
          $target: $details,
          tagName: 'span',
          content: '하위 페이지가 없습니다.',
        });
      }
    });
  };

  this.render();
}
