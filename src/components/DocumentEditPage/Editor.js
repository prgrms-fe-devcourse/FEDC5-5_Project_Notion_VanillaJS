import { UNTITLED } from "../../utils/constants.js";
import { setDocumentTitle } from "../../utils/validation.js";

export default function Editor({ $target, initialState = { title: "", content: "" }, onEdit }) {
  const $editor = document.createElement("div");
  $editor.innerHTML = `
    <input type="text" name="title" class="title" placeholder="${UNTITLED}" autofocus/>
    <textarea name="content" class="content" placeholder="내용을 입력하세요."></textarea>
  `;

  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content]").value = content;

    setDocumentTitle(title);
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };
      this.setState(nextState);
      console.log(nextState);
      onEdit(this.state);
    }
  });
}
