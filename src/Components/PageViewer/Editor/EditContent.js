import { controlKey } from "../../../Event/ControlKey.js";
import clickEvent from "../../../Event/ControlKey/ClickEvent.js";
import contextMenuEvent from "../../../Event/ControlKey/ContextMenuEvent.js";
import handleTyping from "../../../Event/HandleTyping.js";
import RenderFormatConverter from "../../../Function/RenderFormatConverter.js";
import CreateEditTextElement from "./CreateEditTextElement.js";

export default function EditContent({ target, state }) {
  const editContentElement = document.createElement("div");
  editContentElement.focus();
  editContentElement.setAttribute("class", "pageViewer_editor_content");
  editContentElement.setAttribute("data-name", "content");
  target.appendChild(editContentElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    editContentElement.replaceChildren();
    /* 만약 new Page , Page Text 0 ?  */
    if (!this.state || this.state.length === 0) {
      /* create new Line */
      new CreateEditTextElement({
        target: editContentElement,
      });
      return;
    }

    const splited = this.state.split("<cut>");
    /* 배열 index 1개가 1줄 */
    splited.forEach((item) => {
      /* Element로 만들어 순서대로 Append */
      RenderFormatConverter({
        text: item,
        target: editContentElement,
      });
    });
  };

  /* Control key 에 대한 Event */
  editContentElement.addEventListener("keydown", (event) => {
    controlKey({
      event,
      target: editContentElement,
    });
  });

  /* User의 타이핑에 맞춰 변환해주는 Event */
  editContentElement.addEventListener("keyup", (event) => {
    handleTyping({ event });
  });

  /* 우클릭 이벤트 */
  editContentElement.addEventListener("contextmenu", (event) => {
    contextMenuEvent({
      event,
    });
  });

  /* 클릭 이벤트 */
  editContentElement.addEventListener("click", (event) => {
    clickEvent({ event });
  });
}
