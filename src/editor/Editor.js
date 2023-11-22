export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  let isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
          <div class='editor'>
            <input class='editorTitle' placeholder="제목을 입력해 주세요" type="text" name='title' value="${this.state.title}" />
            <textarea class='editorContent' placeholder="내용을 입력해 주세요" name="content"  >${this.state.content}</textarea>
          </div>
        `;
      isInit = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(nextState);
    }
  });
}
