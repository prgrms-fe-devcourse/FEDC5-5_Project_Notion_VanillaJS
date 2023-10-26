import Editor from './Editor.js';
import DocumentHeader from './DocumentHeader.js';
import DocumentFooter from './DocumentFooter.js';

import { fetchDocuments } from '../../utils/api.js';
import { CLASS_NAME, ID, MESSAGE } from '../../utils/constants.js';
import {
  generateRouteDocuments,
  isNew,
  setDocumentTitle,
} from '../../utils/helper.js';
import { push } from '../../utils/router.js';

export default function DocumentEditPage({
  $target,
  initialState,
  onDelete,
  onEdit,
}) {
  isNew(new.target);

  const $page = document.createElement('div');
  $page.className = CLASS_NAME.DOCUMENT_EDIT_PAGE;

  this.state = initialState;

  const documentHeader = new DocumentHeader({
    $target: $page,
    initialState: this.state,
    onDelete,
  });

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: '',
    },
    onEdit,
  });

  const documentFooter = new DocumentFooter({
    $target: $page,
    initialState: {
      document: null,
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId === nextState.documentId && nextState.document) {
      this.state = { ...this.state, ...nextState };
      editor.setState(
        this.state.document || {
          title: '',
          content: '',
        }
      );
      documentHeader.setState(this.state);
      documentFooter.setState({
        document: this.state.document,
      });
      this.render();
      return;
    }

    this.state = { ...this.state, ...nextState };

    if (this.state.documentId === ID.NEW) {
      editor.setState({
        title: '',
        content: '',
      });
      documentHeader.setState(this.state);
      documentFooter.setState({
        document: null,
      });
      this.render();
    } else {
      await loadDocument();
    }
  };

  const loadDocument = async () => {
    const document = await fetchDocuments(this.state.documentId);
    if (!document) {
      alert(MESSAGE.REDIRECT);
      push(generateRouteDocuments(ID.DEFAULT_DOCUMENT));
      return;
    }
    
    this.setState({
      ...this.state,
      document,
    });
    documentFooter.setState({
      document: this.state.document,
    });
    setDocumentTitle(this.state.document?.title || '');
  };

  this.render = () => {
    if (!$target.querySelector(`.${CLASS_NAME.DOCUMENT_EDIT_PAGE}`)) {
      $target.appendChild($page);
    }
    setDocumentTitle(this.state.document?.title || '');
  };
}
