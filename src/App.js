import DocumentHeader from './components/document/DocumentHeader.js';
import DocumentList from './components/document/DocumentList.js';
import Editor from './components/editor/Editor.js';
import SubDocumentEditor from './components/editor/SubDocumentEditor.js';
import { initRouter, push } from './router/router.js';
import Splitter from './components/common/Splitter.js';
import DocumentFooter from './components/document/DocumentFooter.js';
import { debounce } from './utils/debounce.js';
import {
  addDocument,
  editDocument,
  getRootDocuments,
  getSelectedDocument,
} from './api/documentHandler.js';
import { createDOM } from './utils/dom.js';

export default function App({ $target }) {
  const $documentListContainer = createDOM({
    tagName: 'div',
    className: 'document-list-container',
  });

  const $editorContainer = createDOM({
    tagName: 'div',
    className: 'editor-container',
  });

  this.state = {
    selectedDocument: null,
    subDocuments: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    const rootDocuments = await getRootDocuments();
    documentList.setState(rootDocuments);

    const { selectedDocument } = this.state;
    if (selectedDocument) {
      $editorContainer.style.display = 'block';
    } else {
      $editorContainer.style.display = 'none';
    }
  };

  // Document Header Component
  const documentHeader = new DocumentHeader({
    $target: $documentListContainer,
    onClickPageAddButton: async () => {
      const addedDocument = await addDocument(null);

      this.setState({
        ...this.state,
        selectedDocument: addedDocument,
      });

      editor.setState(addedDocument);
      push(`/${addedDocument.id}`);
    },
  });

  // Document List Component
  const documentList = new DocumentList({
    $target: $documentListContainer,
    initialState: [],
    onClickDocument: async (id) => {
      const selectedDocument = await getSelectedDocument(id);

      this.setState({
        ...this.state,
        selectedDocument,
        subDocuments: selectedDocument.documents,
      });

      editor.setState(selectedDocument);
      subDocumentEditor.setState(selectedDocument.documents);

      push(`/${id}`);
      subDocumentEditor.setState(this.state.subDocuments);
    },
    onClickAddButton: async (id) => {
      const addedDocument = await addDocument(id);

      this.setState({
        ...this.state,
        selectedDocument: addedDocument,
      });

      editor.setState(addedDocument);
      push(`/${addedDocument.id}`);
    },
    onClickRemoveButton: async (id) => {
      await removeDocument(id);
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    },
  });

  // Document Footer Component
  const documentFooter = new DocumentFooter({
    $target: $documentListContainer,
  });
  $target.appendChild($documentListContainer);

  // Splitter Component
  const splitter = new Splitter({ $target });

  // Editor Component
  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.selectedDocument,
    onEditing: (document) => {
      debounce(async () => {
        await editDocument(document.id, document.title, document.content);
      }, 1000);
    },
  });

  $target.appendChild($editorContainer);

  // Sub Document Footer Component
  const subDocumentEditor = new SubDocumentEditor({
    $target: $editorContainer,
    initialState: this.state.subDocuments ? this.state.subDocuments : [],
    onClick: async (id) => {
      const selectedDocument = await getSelectedDocument(id);
      this.setState({
        ...this.state,
        selectedDocument,
        subDocuments: selectedDocument.documents,
      });

      editor.setState(selectedDocument);
      subDocumentEditor.setState(selectedDocument.documents);

      push(`/${id}`);
    },
  });

  this.handleOnSelectDocument = (selectedDocument) => {
    this.setState({
      ...this.state,
      selectedDocument,
      subDocuments: selectedDocument.documents,
    });

    editor.setState(selectedDocument);
    subDocumentEditor.setState(selectedDocument.documents);
  };

  // 라우팅
  this.route = async () => {
    const rootDocuments = await getRootDocuments();
    if (rootDocuments) {
      documentList.setState(rootDocuments);
    }
    const { pathname } = window.location;
    if (pathname === '/') {
      this.setState({
        ...this.state,
        selectedDocument: null,
      });
    } else {
      const id = pathname.slice(1);
      const selectedDocument = await getSelectedDocument(id);
      this.handleOnSelectDocument(selectedDocument);
    }
  };

  // 뒤로가기, 앞으로가기 처리
  window.addEventListener('popstate', async () => {
    this.route();
  });

  this.route();
  initRouter(() => this.route());
}
