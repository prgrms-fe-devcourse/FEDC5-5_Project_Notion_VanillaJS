import { changePlaceFoucs, getOffset } from "../../Function/Focus.js";
import CreateEditTextElement from "../../Components/PageViewer/Editor/CreateEditTextElement.js";

export default function enterEvent({
  nextTarget,
  editorElement,
  event,
  eventTarget,
}) {
  const evnetTargetText = eventTarget.innerText;
  /* 추가로직 중 구분선 */
  if (
    nextTarget &&
    nextTarget.className === "divisionLine" &&
    confirm("구분선 아래에 생성하겠습니까? 📝")
  ) {
    event.preventDefault();
    const cutLength = getOffset();
    const text = evnetTargetText.slice(cutLength);
    eventTarget.innerText = evnetTargetText.slice(0, cutLength);
    const newElement = new CreateEditTextElement({
      target: editorElement,
      text,
      insertBeforeTarget: nextTarget,
    });
    changePlaceFoucs({
      target: newElement.getElement(),
    });
    return;
  }

  /* 체크박스에서 엔터 */
  if (eventTarget.className === "checkbox_text") {
    event.preventDefault();
    const cutLength = getOffset();
    const text = evnetTargetText.slice(cutLength);
    eventTarget.innerText = evnetTargetText.slice(0, cutLength);

    const checkBoxElement = new CreateEditTextElement({
      target: editorElement,
      noContentEdit: true,
      className: "checkbox",
      insertBeforeTarget: eventTarget.parentNode,
    });

    checkBoxElement.getElement().innerHTML = `<input type="checkbox" class="checkbox_input">`;

    new CreateEditTextElement({
      target: checkBoxElement.getElement(),
      className: "checkbox_text",
      element: "label",
      text: text,
    });
    return;
  }

  /* 콜 아웃 에서 엔터  */
  if (eventTarget.className === "callBox_textBox") {
    event.preventDefault();
    const cutLength = getOffset();
    const text = evnetTargetText.slice(cutLength);
    eventTarget.innerText = evnetTargetText.slice(0, cutLength);
    new CreateEditTextElement({
      target: editorElement,
      text,
      insertBeforeTarget: eventTarget.parentNode,
    });

    return;
  }

  /* code block */
  if (event.shiftKey && eventTarget.className === "codeblock") {
    event.preventDefault();
    new CreateEditTextElement({
      target: editorElement,
      insertBeforeTarget: eventTarget.parentNode,
    });
    return;
  }

  if (eventTarget.className === "codeblock") {
    return;
  }

  /* 기본 추가 */
  event.preventDefault();
  const cutLength = getOffset();
  const text = evnetTargetText.slice(cutLength);
  eventTarget.innerText = evnetTargetText.slice(0, cutLength);

  new CreateEditTextElement({
    target: editorElement,
    text,
    insertBeforeTarget: eventTarget,
  });
  return;
}
