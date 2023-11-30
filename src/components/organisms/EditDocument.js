/*
 * EditDocument
 * - DocumentTitle
 * - DocumentContent
 * */

import DocumentTitle from '../molecules/editor/DocumentTitle.js';
import DocumentContent from '../molecules/editor/DocumentContent.js';
import createDOM from '../../utils/createDOM.js';
import { debouncePostDocument } from '../../utils/debouncePostDocument.js';

export default function EditDocument({ $target, initialState }) {
  const $editDocument = createDOM({ $target, style: 'EditDocument' });

  this.state = initialState;

  let timer = null;

  this.setState = nextState => {
    this.state = nextState;

    documentTitle.setState({ ...this.state, title: this.state.title, isDisabled: !this.state.id });
    documentContent.setState({ content: this.state.content, isDisabled: !this.state.id });
    if (this.state.id === null) return;
    timer = debouncePostDocument(timer, this.state, 1000);
  };

  const documentTitle = new DocumentTitle({
    $target: $editDocument,
    initialState: { ...this.state, isDisabled: false },
    onEditTitle: title => {
      const nextState = { ...this.state, title };
      this.setState(nextState);
    },
  });

  const documentContent = new DocumentContent({
    $target: $editDocument,
    content: this.state.content,
    onEditContent: content => {
      const nextState = { ...this.state, content };
      this.setState(nextState);
    },
  });
}
