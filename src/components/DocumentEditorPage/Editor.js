import { CLASS_NAME } from "../../utils/constants.js";
import { validateConstructorUsage } from "../../utils/validation.js";

export default function Editor({ $target, initialState, onEdit }) {
  validateConstructorUsage(new.target);

  const $editor = document.createElement("div");
  $editor.className = CLASS_NAME.EDITOR;

  $target.appendChild($editor);

  $editor.innerHTML = `
  <textarea name="title" class="title" type="text"></textarea>
  <div contenteditable name="content" class="content"></div>
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    if (this.state) {
      $editor.querySelector("[name=title]").value = this.state.title;
      $editor.querySelector("[name=content]").innerHTML = this.state.content;
    }
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };

    this.setState(nextState);

    onEdit(nextState);
  });

  const editableElm = document.querySelector("[contenteditable]");
  placeCaretAtEnd(editableElm);

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    this.setState(nextState);

    onEdit(nextState);
  });

  function placeCaretAtEnd(el) {
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  this.render();
}
