import TitleEditor from "./TitleEditor.js";
import ContentEditor from "./ContentEditor.js";
import ChildrenDocument from "./ChildrenDocument.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor-container";

  this.state = initialState;

  const titleEditor = new TitleEditor({
    $target: $editor,
    initialState: { title: this.state.title, content: this.state.content },
    onEditing,
  });

  const contentEditor = new ContentEditor({
    $target: $editor,
    initialState: {
      title: this.state.title,
      content: this.state.content,
      originalContent: this.state.content,
    },
    onEditing,
  });

  const childrenDocument = new ChildrenDocument({
    $target: $editor,
    initialState: { documents: this.state.documents },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    titleEditor.setState(nextState);
    contentEditor.setState(nextState);
    childrenDocument.setState({ documents: this.state.documents });
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}
