export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.innerHTML = `
    <input type="text" class="input-title" name="title" value="${
      this.state.title
    }"/>
    <textarea class="input-content" name="content">${
      this.state.content ? this.state.content : ""
    }</textarea>
  `;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector(".input-title").value = this.state.title;
    $editor.querySelector(".input-content").value = this.state.content;
  };

  this.render = () => {
    $target.appendChild($editor);
  };

  this.render();

  // 편집기 제목 입력
  $editor.querySelector(".input-title").addEventListener("keyup", (e) => {
    this.setState({
      ...this.state,
      title: e.target.value,
    });
    onEditing(this.state);
  });

  // 편집기 내용 입력
  $editor.querySelector(".input-content").addEventListener("input", (e) => {
    this.setState({
      ...this.state,
      content: e.target.value,
    });
    onEditing(this.state);
  });
}
