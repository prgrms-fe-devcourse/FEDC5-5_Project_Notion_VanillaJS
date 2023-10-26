export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $target.appendChild($editor);

  $editor.innerHTML = `
      <input type="text" placeholder="제목 없음" name="title" />
      <textarea name="content"></textarea>
  `;

  /* 
    {
      title: string,
      content: string
    }
  */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    if (this.state.id === "root") {
      $editor.querySelector("[name=title]").value = "안녕하세요👋";
      $editor.querySelector("[name=content]").value = "";

      $editor.querySelector("[name=title]").setAttribute("readOnly", "");
      $editor.querySelector("[name=content]").setAttribute("readOnly", "");
      return;
    }

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;

    $editor.querySelector("[name=title]").removeAttribute("readOnly");
    $editor.querySelector("[name=content]").removeAttribute("readOnly");
  };

  $editor.addEventListener("keyup", (e) => {
    if (this.state.id === "root") return;
    const { target } = e;
    const name = target.getAttribute("name");
    const nextState = { ...this.state, [name]: e.target.value };

    this.setState(nextState);
    onEditing(this.state);
  });
}
