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
    onTitleEditing: (title) => {
      this.setState(
        {
          ...this.state,
          title,
        },
        false
      );
      onEditing(this.state);
    },
  });

  const contentEditor = new ContentEditor({
    $target: $editor,
    initialState: {
      title: this.state.title,
      content: this.state.content,
      originalContent: this.state.content,
    },
    onContentEditing: (content) => {
      this.setState(
        {
          ...this.state,
          content,
        },
        false
      );
      onEditing(this.state);
    },
  });

  const childrenDocument = new ChildrenDocument({
    $target: $editor,
    initialState: { documents: this.state.documents },
  });

  this.setState = (nextState, isUpdateComponents = true) => {
    this.state = nextState;

    if (!isUpdateComponents) return;

    titleEditor.setState(nextState);
    contentEditor.setState(nextState);
    childrenDocument.setState({ documents: this.state.documents });
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}
