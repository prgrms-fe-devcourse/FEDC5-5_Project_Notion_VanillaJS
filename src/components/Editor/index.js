import { createDOM } from '../../utils/dom.js'
import { formatter } from '../../utils/formatter.js';
import { handleCursor } from '../../utils/handleCursor.js';
// import './style.scss';

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = createDOM({
    tagName: 'div',
    className: 'editor',
    innerHTML: `<input class='edit-title' type="text" name="title" placeholder='제목을 입력하세요'/>
  <div class='edit-main' name="content" contentEditable='true' placeholder='내용을 입력하세요.'></div>`,
  });

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    if (Object.keys(nextState).includes('content')) {
      this.state = nextState;
    } else {
      this.state = {
        ...nextState,
        title: nextState.title,
        content: '',
      };
    }
    this.render();
  };

  this.renderRichContent = (content) => {
    if (!content) return content;

    const richContent = formatter(content);

    return richContent;
  };

  this.render = () => {
    $editor.querySelector('[name=title]').value = this.state.title;

    const $content = $editor.querySelector('[name=content]');
    const richContent = this.renderRichContent(this.state.content);

    $content.innerHTML = richContent;
  };

  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const { value } = e.target;

    const nextState = {
      ...this.state,
      title: value,
    };

    this.setState(nextState);
    onEditing(this.state);
  });

  $editor.querySelector('[name=content]').addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    this.setState(nextState);
    onEditing(this.state);

    handleCursor(e.target); // 커서 위치 조정
  });
}
