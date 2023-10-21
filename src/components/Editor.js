export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  $editor.innerHTML = `
    <input type="text" class="input-title" name="title" value="${
      this.state.title
    }"/>
    <textarea class="input-content" name="content">${
      this.state.content ? this.state.content : ""
    }</textarea>
  `;

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();

  $editor.querySelector(".input-title").addEventListener("keyup", (e) => {
    this.setState({
      ...this.state,
      title: e.target.value,
    });
    onEditing(this.state);
  });

  $editor.querySelector(".input-content").addEventListener("input", (e) => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
  });
}
