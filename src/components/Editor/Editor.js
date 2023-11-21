import { TAG } from "../../constants/tag.js";
import { createCustomElement } from "../../utils/dom.js";
import { CSS_SELECTOR } from "./cssSelector.js";

export default function Editor({ $target, state, onEditing }) {
  this.state = state;
  let isInit = false;

  const $editor = createCustomElement({
    tag: TAG.DIV,
    props: { id: CSS_SELECTOR.EDIT.EDITOR },
  });

  $target.appendChild($editor);

  this.setState = (nextState) => {
    if (nextState == null) return;

    this.state = nextState;

    $editor.querySelector("[name=title]").value = this.state.title || "";
    $editor.querySelector("[name=content]").value = this.state.content || "";

    this.render();
  };

  this.render = () => {
    if (!isInit) {
      if (this.state == null) return;

      const { title, content } = this.state;

      const htmlString = `
      <input type="text" name="title" value="${title}" placeholder="제목을 입력해 주세요" />
      <textarea name="content" placeholder="내용을 입력해 주세요">${content}</textarea>
      `;

      $editor.innerHTML = htmlString;

      isInit = true;
    }
  };

  $editor.addEventListener("keyup", (event) => {
    const { target } = event;
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

  this.render();
}
