import reverCursor from '../utils/revertCursor.js';

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';
  $editor.innerHTML = `
  <input type="text" name="title" placeholder="제목을 입력해주세요."/>
  <div name="content" contentEditable="true"></div>
  `;
  this.state = initialState;
  $target.appendChild($editor);

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    $editor.querySelector('[name=title]').value =
      this.state.title === '새 폴더' ? '' : this.state.title;
    $editor.querySelector('[name=content]').innerHTML = this.state.content;
  };

  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state);
  });

  const $content = $editor.querySelector('[name=content]');

  $content.addEventListener('input', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    this.setState(nextState);

    revertCursor($content);
    onEditing(this.state);
  });

  this.render();
}
