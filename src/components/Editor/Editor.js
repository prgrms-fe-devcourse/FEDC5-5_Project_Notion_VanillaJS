import "./editor.css";
import { $ } from "../../utils/DOM/selector.js";
import { editDocumentTitle } from "../../utils/DOM/ListControl.js";
export default function Editor({ $target, initialState, onEditing }) {
  this.state = initialState;

  const $editor = document.createElement("div");
  $editor.className = "editor";

  $editor.innerHTML = `
     <textarea id="textarea" type="text" name="title" placeholder="제목 없음" ></textarea>
      <div contentEditable="true"  class="content-area"  name="content" ></div>
      `;

  $target.appendChild($editor);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, content } = this.state;

    const $title = $editor.querySelector("[name=title]");
    $title.value = title;

    const $content = $editor.querySelector("[name=content]");

    if (!content) {
      $content.innerHTML = "";
      return;
    }

    $content.innerHTML = content;

    /** render 하자마자 textarea의 높이를 자동 조정  */
    setTimeout(() => changeTextAreaHeight(), 0);
  };

  /** textarea의 높이를 자동 조정 */
  const changeTextAreaHeight = () => {
    const $title = $editor.querySelector("[name=title]");
    const DEFAULT_HEIGHT = 30;
    $title.style.height = 0;
    $title.style.height = DEFAULT_HEIGHT + $title.scrollHeight + "px";
  };

  $editor.querySelector("[name=title]").addEventListener("keyup", e => {
    const newTitle = e.target.value;

    const nextState = {
      ...this.state,
      title: newTitle,
    };
    this.setState(nextState);

    // sidebar title DOM 실시간 업데이트
    editDocumentTitle(this.state.id, newTitle);

    // 업데이트
    const { title, content } = this.state;
    const updateBody = { title, content };
    onEditing(updateBody);
  });

  $editor.querySelector("[name=content]").addEventListener("focusout", e => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    this.setState(nextState);
  });

  $editor.querySelector("[name=content]").addEventListener("input", e => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    // 업데이트
    const { title, content } = nextState;
    const updateBody = { title, content };
    onEditing(updateBody);
  });

  $("div[contentEditable]", $editor).addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      document.execCommand("defaultParagraphSeparator", false, "");
      return false;
    }
  });

  /** textarea에 입력 시 높이를 자동 조정 */
  const $textarea = $("#textarea", $editor);
  $textarea.oninput = event => {
    changeTextAreaHeight();
  };
}
