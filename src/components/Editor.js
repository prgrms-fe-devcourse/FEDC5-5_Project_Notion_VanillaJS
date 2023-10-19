export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.render = () => {
    $target.appendChild($editor);

    $editor.innerHTML = `
      <input type="text" name="title" value="${this.state.title}"/>
      <textarea name="content">${this.state.content}</textarea>
    `;
  };

  this.render();
}
