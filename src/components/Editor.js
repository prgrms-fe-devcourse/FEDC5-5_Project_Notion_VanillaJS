export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($editor);
    const { title, content } = this.state;
    $editor.innerHTML = `
      <input type="text" class="input-title" name="title" value="${title}"/>
      <textarea class="input-content" name="content">${content ? content : ""}</textarea>
    `;
  };

  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    this.setState({
      ...this.state,
      title: e.target.value
    });
    onEditing(this.state);
  });

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    this.setState({
      ...this.state,
      content: e.target.value
    });
    onEditing(this.state);
  });
}
