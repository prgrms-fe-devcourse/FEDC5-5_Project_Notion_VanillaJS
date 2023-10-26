export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');

  $editor.style.display = 'flex';
  $editor.style.flexDirection = 'column';

  this.state = initialState;
  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    const titleElement = $editor.querySelector('[name=title]');
    const contentElement = $editor.querySelector('[name=content]');
    if (titleElement) titleElement.value = this.state.title;
    if (contentElement) contentElement.value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!$editor.querySelector('[name=title]') && !$editor.querySelector('[name=content]')) {
      $editor.innerHTML = `
      <input type="text" name='title' class='title' placeholder='제목 없음' value="${this.state.title}" />
      <textarea name='content' class='content' placeholder='...'>${this.state.content}</textarea>
      `;
    }
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;

    const name = target.getAttribute('name');

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
