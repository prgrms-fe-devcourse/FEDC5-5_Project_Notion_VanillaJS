import TitleEditor from "./TitleEditor.js";
import ContentEditor from "./ContentEditor.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor-container";

  this.state = initialState;

  const titleEditor = new TitleEditor({
    $target: $editor,
    initialState: initialState.title,
    onEditing,
  });

  const contentEditor = new ContentEditor({
    $target: $editor,
    initialState: initialState.content,
    onEditing,
  });

  this.setState = (nextState) => {
    titleEditor.setState(nextState.title);
    contentEditor.setState(nextState.content);
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}
