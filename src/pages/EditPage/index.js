import Editor from '../../components/Editor/index.js';
import SubDocumetFooter from '../../components/Editor/SubDocumentFooter/index.js';
import { createDOM } from '../../utils/dom.js';
// import './style.scss';

export default function EditPage({
  $target,
  initialState,
  onEditDocument,
  onClickSubDocument,
}) {
  const $editPageContainer = createDOM({
    tagName: 'div',
    className: 'edit-page-container',
  });
  $editPageContainer.style.display = 'none';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    editor.setState(this.state.selectedDocument);
    subDocumentFooter.setState(this.state.subDocuments);
  };

  this.toggle = () => {
    if (this.state.selectedDocument.id) {
      $editPageContainer.style.display = 'flex';
    } else {
      $editPageContainer.style.display = 'none';
    }
  };

  const editor = new Editor({
    $target: $editPageContainer,
    initialState: this.state,
    onEditing: onEditDocument,
  });

  const subDocumentFooter = new SubDocumetFooter({
    $target: $editPageContainer,
    initialState: this.state,
    onClick: onClickSubDocument,
  });

  $target.appendChild($editPageContainer);

  this.render();
}
