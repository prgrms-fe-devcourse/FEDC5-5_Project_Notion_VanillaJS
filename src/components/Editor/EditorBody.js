export default function EditorBody({ $target, initialState, onEditing }) {
  const $editorBody = document.createElement('div');
  $target.appendChild($editorBody);
  $editorBody.className = 'editor-body';

  $editorBody.innerHTML = `<textarea placeholder="내용을 입력해주세요" type="text" name="content" style="width:100%;height100%" value="">`;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      const { content } = this.state;
      $editorBody.querySelector('[name=content]').value = content;
    }
  };

  $editorBody.querySelector('[name=content]').addEventListener('keyup', (e) => {
    const nextState = { ...this.state, content: e.target.value };
    this.setState(nextState);

    onEditing(this.state);
  });

  this.render();
}
