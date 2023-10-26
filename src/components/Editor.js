import TitleEditor from "./TitleEditor.js";
import ContentEditor from "./ContentEditor.js";

// ## Editor 컴포넌트는 없어도 될 것 같다. 리팩터링 해보기!
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
    titleEditor.setState(nextState);
    contentEditor.setState(nextState);
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();
}
