import Sidebar from './Sidebar/Sidebar.js';
import DocumentEditPage from './DocumentEditPage/DocumentEditPage.js';

import { ID, KEY, MESSAGE } from '../utils/constants.js';
import {
  generateRouteDocuments,
  isNew,
  setDocumentTitle,
} from '../utils/helper.js';
import { initRouter, push } from '../utils/router.js';
import { fetchDocuments } from '../utils/api.js';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '../utils/storage.js';

export default function App({ $target }) {
  isNew(new.target);

  let timer = null;

  const onAdd = async () => {
    push(generateRouteDocuments(ID.NEW));

    const createdDocument = await fetchDocuments('', {
      method: 'POST',
      body: JSON.stringify({
        title: '',
        parent: getStorageItem(KEY.NEW_PARENT, null),
      }),
    });

    history.replaceState(
      null,
      null,
      generateRouteDocuments(createdDocument.id)
    );
    removeStorageItem(KEY.NEW_PARENT);

    documentEditPage.setState({ documentId: createdDocument.id });

    sidebar.setState({
      selectedId: parseInt(createdDocument.id),
    });
  };

  const onDelete = async (currentDocumentId, removedDocumentId) => {
    if (removedDocumentId === ID.DEFAULT_DOCUMENT) {
      alert(MESSAGE.DO_NOT_DELETE_FIRST_PAGE);
      return;
    }

    if (!confirm(MESSAGE.DELETE_PAGE)) return;

    await fetchDocuments(removedDocumentId, {
      method: 'DELETE',
    });

    const openedItems = getStorageItem(KEY.OPENED_ITEMS, []);
    setStorageItem(
      KEY.OPENED_ITEMS,
      openedItems.filter((item) => item !== removedDocumentId)
    );

    if (currentDocumentId === removedDocumentId) {
      documentEditPage.setState({ documentId: ID.DEFAULT_DOCUMENT });
      push(generateRouteDocuments(ID.DEFAULT_DOCUMENT));
    } else {
      documentEditPage.setState({ documentId: currentDocumentId });
    }

    sidebar.render();
  };

  const onEdit = ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await fetchDocuments(id, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
      });

      documentEditPage.setState({
        documentId: editedDocument.id,
        document: editedDocument,
      });

      sidebar.render();
    }, 1000);
  };

  const sidebar = new Sidebar({
    $target,
    initialState: {
      selectedId: null,
    },
    onAdd,
    onDelete,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: '',
        content: '',
      },
    },
    onDelete,
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      setDocumentTitle('Notion');
      return;
    }

    if (pathname.indexOf('/documents') !== 0) return;

    const [, , documentId] = pathname.split('/');
    documentEditPage.setState({
      documentId: isNaN(documentId) ? documentId : parseInt(documentId),
    });

    if (!isNaN(documentId)) {
      sidebar.setState({
        selectedId: parseInt(documentId),
      });
    }
  };

  window.addEventListener('popstate', () => this.route());

  this.route();

  initRouter(() => this.route());
}
