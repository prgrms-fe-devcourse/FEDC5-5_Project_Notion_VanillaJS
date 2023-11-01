import EditorBody from '../components/Editor/EditorBody.js';
import EditorFooter from '../components/Editor/EditorFooter.js';
import EditorHeader from '../components/Editor/EditorHeader.js';

export default function DocumentEditPage({
  $target,
  initialState = { id: undefined, title: '', content: '' },
  onEditing,
  onDocumentClick,
  onRemoveDocument,
}) {
  const $documentEditPage = document.createElement('div');
  $documentEditPage.className = 'document-edit-page';

  this.state = initialState;

  const editorHeader = new EditorHeader({
    $target: $documentEditPage,
    initialState: this.state,
    onEditing: ({ title }) => {
      onEditing({ ...this.state, title });
    },
    onRemoveDocument: (documentId) => {
      onRemoveDocument(documentId);
    },
  });

  const editorBody = new EditorBody({
    $target: $documentEditPage,
    initialState: this.state,
    onEditing: ({ content }) => {
      onEditing({ ...this.state, content });
    },
  });

  const editorFooter = new EditorFooter({
    $target: $documentEditPage,
    initialState: this.state,
    onDocumentClick: (documentId) => {
      onDocumentClick(documentId);
    },
  });

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      editorHeader.setState(this.state);
      editorBody.setState(this.state);
      editorFooter.setState(this.state);
      this.render();
    }
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
