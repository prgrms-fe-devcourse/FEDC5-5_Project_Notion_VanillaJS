import CreateEditTextElement from "../../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changePlaceFoucs } from "../../Function/Focus.js";

export default function backspaceEvent({
  eventTarget,
  prevTarget,
  nextTarget,
  event,
  editorElment,
}) {
  const targetClassName = eventTarget.className;
  /* 제목 삭제 */
  if (
    targetClassName === "h1" ||
    targetClassName === "h2" ||
    targetClassName === "h3"
  ) {
    event.preventDefault();
    eventTarget.removeAttribute("class");
    return;
  }
  /* 콜 아웃 */
  if (eventTarget.className === "callBox_textBox") {
    event.preventDefault();
    const text = eventTarget.innerText;
    const parentElement = eventTarget.parentNode;
    parentElement.removeAttribute("class");
    parentElement.setAttribute("contenteditable", "true");
    parentElement.innerText = text;
    changePlaceFoucs({ target: parentElement });
    prevTarget.remove();
    eventTarget.remove();

    return;
  }

  /* 체크박스 */
  if (eventTarget.className === "checkbox_text") {
    event.preventDefault();
    const text = eventTarget.innerText;
    const parentElement = eventTarget.parentNode;
    parentElement.removeAttribute("class");
    parentElement.setAttribute("contenteditable", "true");
    parentElement.innerText = text;
    changePlaceFoucs({ target: parentElement });
    prevTarget.remove();
    eventTarget.remove();
    return;
  }

  /* 삭제후 이동 대상이 체크박스 */
  /* 삭제후 이동 대상이 콜박스 일때 */
  /* 삭제후 이동 대상이 코드 블록 일때 */
  if (
    prevTarget &&
    (prevTarget.className === "checkbox" ||
      prevTarget.className === "prebox" ||
      prevTarget.className === "callBox")
  ) {
    event.preventDefault();
    const text = eventTarget.innerText;
    const focusTarget = prevTarget.lastChild;
    const pickOffset = focusTarget.innerText.length;
    focusTarget.innerText += text;
    changePlaceFoucs({ target: focusTarget, pickOffset });
    eventTarget.remove();
    return;
  }

  /* code block 삭제 */
  if (eventTarget.className === "codeblock") {
    event.preventDefault();
    const text = eventTarget.innerText;
    const parentElement = eventTarget.parentNode;
    new CreateEditTextElement({
      target: parentElement.parentNode,
      text,
      insertBeforeTarget: parentElement,
    });
    parentElement.remove();
    eventTarget.remove();
    return;
  }

  /* DivisionLine 삭제 관련 */
  if (
    prevTarget &&
    prevTarget.className === "divisionLine" &&
    confirm("구분선을 삭제하시겠나요? 💣")
  ) {
    event.preventDefault();
    prevTarget.remove();
    return;
  }

  /* 다음 값이 없으면 이전값으로 */
  if (editorElment.childElementCount > 1 && !prevTarget) {
    changePlaceFoucs({ target: nextTarget, isEndPoint: true });
    eventTarget.remove();
    return;
  }

  if (editorElment.childElementCount > 1) {
    event.preventDefault();
    const text = eventTarget.innerText;
    const pickOffset = prevTarget.innerText.length;
    prevTarget.innerText += text;

    changePlaceFoucs({ target: prevTarget, pickOffset });
    eventTarget.remove();
    return;
  }
}
