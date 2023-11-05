import { changePlaceFoucs } from "../../Function/Focus.js";

export default function arrowDownEvent({ eventTarget, nextTarget, event }) {
  /* 체크박스 콜박스 코드블록 서로간의 이동 */
  const parentNext = eventTarget.parentNode.nextSibling;
  if (
    parentNext &&
    (parentNext.className === "checkbox" ||
      parentNext.className === "callBox" ||
      parentNext.className === "prebox") &&
    (eventTarget.className === "checkbox_text" ||
      eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "codeblock")
  ) {
    event.preventDefault();
    const focusTarget = eventTarget.parentNode.nextSibling.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크박스 콜아웃 코드박스 다음이 구분선이고 그다음이 체크박스 콜아웃 코드블럭일때 */
  if (
    (eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "checkbox_text" ||
      eventTarget.className === "codeblock") &&
    parentNext &&
    parentNext.className === "divisionLine" &&
    (parentNext.nextSibling.className === "prebox" ||
      parentNext.nextSibling.className === "callBox" ||
      parentNext.nextSibling.className === "checkbox")
  ) {
    event.preventDefault();
    const focusTarget = parentNext.nextSibling.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크박스 콜아웃 코드박스 다음이 구분선일때 */
  if (
    (eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "checkbox_text" ||
      eventTarget.className === "codeblock") &&
    parentNext &&
    parentNext.className === "divisionLine" &&
    parentNext.nextSibling
  ) {
    event.preventDefault();
    const focusTarget = parentNext.nextSibling;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 콜박스에서 다음줄로 이동 */
  /* 체크박스에서 다음줄로 이동 */
  /* 코드블럭에서 다음줄로 이동 */
  if (
    eventTarget.parentNode.nextSibling &&
    (eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "checkbox_text" ||
      eventTarget.className === "codeblock")
  ) {
    event.preventDefault();
    const focusTarget = eventTarget.parentNode.nextSibling;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크박스로 이동 */
  /* 콜박스 이동 */
  /* 코드블록 이동 */
  if (
    nextTarget &&
    (nextTarget.className === "checkbox" ||
      nextTarget.className === "callBox" ||
      nextTarget.className === "prebox")
  ) {
    event.preventDefault();
    const focusTarget = nextTarget.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  if (nextTarget && nextTarget.className === "divisionLine") {
    /* 구분선 이동 */
    event.preventDefault();
    const divisionNextTarget = nextTarget.nextSibling;
    changePlaceFoucs({ target: divisionNextTarget });
    return;
  }

  /* 기본 이동 */
  if (nextTarget) {
    event.preventDefault();
    changePlaceFoucs({ target: nextTarget });
  }
  return;
}
