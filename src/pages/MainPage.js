import { push, replace } from '@/router';
import Component from '@/core/Component';
import Editor from '@/components/editor/EditorBody';
import Navigation from '@/components/editor/Navigation';
import DocumentHeader from '@/components/sidebar/DocumentHeader';
import DocumentList from '@/components/sidebar/DocumentList';
import Fallback from '@/components/common/Fallback';

import {
  getAllDocuments,
  createDocument,
  deleteDocument,
  getDetailOfDocument,
  updateDocument,
} from '@/api/document';
import { API_END_POINT } from '@/constants/api';
import { debounce } from '@/utils/debounce';
import { createTemplate } from '@/utils/dom';

export default class MainPage extends Component {
  constructor($target) {
    super($target);

    this.fetchDocumentList();
  }

  async setup() {
    this.state = { currentId: null };

    this.$sidebar = createTemplate('<aside class="sidebar"></aside>');
    this.$mainSection = createTemplate('<section class="mainSection"></section>');

    this.$target.appendChild(this.$sidebar);
    this.$target.appendChild(this.$mainSection);

    this.createInstance();
  }

  createInstance() {
    this.$sidebarHeader = new DocumentHeader(this.$sidebar);
    this.$documentList = new DocumentList(this.$sidebar, {
      onSelect: this.handleDocumentSelect.bind(this),
      onCreate: this.handleDocumentCreate.bind(this),
      onDelete: this.handleDocumentDelete.bind(this),
    });
    this.$editor = new Editor(this.$mainSection, {
      onEdit: debounce(this.handleEditorEdit.bind(this), 1000),
    });

    this.$navigation = new Navigation(this.$mainSection);
    this.$fallback = new Fallback(this.$mainSection, { isError: false, message: null });
  }

  setState(nextState) {
    if (this.state.currentId === nextState.currentId) return;

    this.$fallback.setState({ isError: false, code: null });
    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.state.currentId) {
      this.$editor.setState(null);
      this.$navigation.setState(null);
      return;
    }

    this.fetchCurrentDocument(this.state.currentId);
  }

  async fetchDocumentList() {
    try {
      const documentList = await getAllDocuments();

      this.$documentList.setState({ ...this.$documentList.state, documentList });
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchCurrentDocument(documentId) {
    try {
      const currentDocument = await getDetailOfDocument(documentId);

      this.$editor.setState(currentDocument);
      this.$navigation.setState(currentDocument.documents);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleDocumentSelect(documentId) {
    push(`${API_END_POINT.DOCUMENTS}/${documentId}`);
  }

  async handleDocumentCreate(documentId = null) {
    try {
      const newDocument = await createDocument(documentId);

      this.fetchDocumentList();
      push(`${API_END_POINT.DOCUMENTS}/${newDocument.id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async handleDocumentDelete(documentId) {
    try {
      await deleteDocument(documentId);

      if (this.state.currentId === documentId) replace('/');
      this.fetchDocumentList();
    } catch (error) {
      this.handleError(error);
    }
  }

  async handleEditorEdit(nextState) {
    try {
      const { id, title, content } = nextState;

      await updateDocument(id, { title, content });
      this.fetchDocumentList();
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    this.$mainSection.replaceChildren();
    this.$fallback.setState({ isError: true, code: error.code });
  }
}
