import {
  deleteDocument,
  request,
  createDocument,
  getDocument,
  modifyDocument,
} from '../utils/api.js';
import { initRouter, push } from '../utils/router.js';
import { setItem, getItem } from '../utils/storage.js';
import {
  setOrToggleIsFolded,
  mergeDocuments,
} from '../utils/manageDocument.js';
import debounce from '../utils/debounce.js';

import IndexPage from '../pages/IndexPage.js';
import DocumentEditPage from '../pages/DocumentEditPage.js';
import Sidebar from '../pages/Sidebar.js';

export default function App({ $target, initialState }) {
  const $sidebarContainer = document.createElement('div');
  const $editorContainer = document.createElement('div');

  $target.appendChild($sidebarContainer);
  $target.appendChild($editorContainer);

  $sidebarContainer.className = 'sidebar-container';
  $editorContainer.className = 'editor-container';

  this.state = initialState;

  const indexPage = new IndexPage({ $target: $editorContainer });

  const sidebar = new Sidebar({
    $target: $sidebarContainer,
    onDocumentFoldToggle: (documentId) => {
      const nextState = setOrToggleIsFolded(this.state.documents, documentId);
      this.setState({ ...this.state, documents: nextState });
    },
    onDocumentAdded: async (documentId) => {
      const updatedDocuments = setOrToggleIsFolded(
        this.state.documents,
        documentId,
        false,
      );

      this.setState({ ...this.state, documents: updatedDocuments });

      const createdDocument = await createDocument(documentId);

      push(`/documents/${createdDocument.id}`);

      if (documentId) {
        const selectedParentDocument = await getDocument(documentId);
        setItem(`temp-document-${documentId}`, selectedParentDocument);
      }

      await this.updateDocumentList();
    },
    onDocumentClick: async (documentId) => {
      const selectedDocument = await getDocument(documentId);
      setItem(`temp-document-${documentId}`, selectedDocument);
      this.setState({ ...this.state, editingDocument: selectedDocument });
    },
  });

  const documentEditPage = new DocumentEditPage({
    $target: $editorContainer,
    onEditing: debounce(async (editedDocument) => {
      const { id, title, content } = editedDocument;
      documentEditPage.setState({ ...editedDocument, isSaving: false });

      setItem(`temp-document-${id}`, editedDocument);

      await modifyDocument({ documentId: id, title, content });

      this.setState({ ...this.state, editingDocument: editedDocument });
      documentEditPage.setState({ ...editedDocument, isSaving: true });

      await this.updateDocumentList();
    }, 2000),
    onRemoveDocument: async (documentId) => {
      await deleteDocument(documentId);
      await this.updateDocumentList();

      push('/');
    },
    onDocumentClick: async (documentId) => {
      const selectedDocument = await getDocument(documentId);
      this.setState({ ...this.state, editingDocument: selectedDocument });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    sidebar.setState(this.state.documents);
    documentEditPage.setState(this.state.editingDocument);
  };

  this.updateDocumentList = async () => {
    const newDocuments = await request('/documents', { method: 'GET' });
    const mergedDocuments = mergeDocuments(this.state.documents, newDocuments);

    this.setState({ ...this.state, documents: mergedDocuments });
  };

  this.route = async () => {
    $editorContainer.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      this.setState({ ...this.state, editingDocument: null });
      indexPage.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      const savedDocumentData = getItem(`temp-document-${documentId}`);

      if (savedDocumentData) {
        this.setState({ ...this.state, editingDocument: savedDocumentData });
      } else {
        const newEditingData = await getDocument(documentId);

        this.setState({ ...this.state, editingDocument: newEditingData });
      }
    }
  };

  window.addEventListener('popstate', () => {
    this.route();
  });

  this.updateDocumentList();
  this.route();

  initRouter(() => this.route());
}
