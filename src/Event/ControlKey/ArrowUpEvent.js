import { changePlaceFoucs } from "../../Function/Focus.js";

export default function arrowUpEvent({ eventTarget, prevTarget, event }) {
  /* 체크박스에서 체크박스 체크박스에서 콜박스 콜박스에서 콜박스 콜박스에서 체크박스 */
  const parentPrev = eventTarget.parentNode.previousSibling;
  if (
    parentPrev &&
    (parentPrev.className === "checkbox" ||
      parentPrev.className === "callBox" ||
      parentPrev.className === "prebox") &&
    (eventTarget.className === "checkbox_text" ||
      eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "codeblock")
  ) {
    event.preventDefault();
    const focusTarget = parentPrev.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크박스 콜아웃 코드박스 다음이 구분선이고 구분선 다음에 체크박스 코드박스 콜아웃일때*/
  if (
    (eventTarget.className === "checkbox_text" ||
      eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "codeblock") &&
    parentPrev &&
    parentPrev.className === "divisionLine" &&
    parentPrev.previousSibling &&
    (parentPrev.previousSibling.className === "prebox" ||
      parentPrev.previousSibling.className === "callBox" ||
      parentPrev.previousSibling.className === "checkbox")
  ) {
    event.preventDefault();
    const focusTarget = parentPrev.previousSibling.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 체크박스 콜아웃 코드박스 다음이 구분선일때 */
  if (
    (eventTarget.className === "checkbox_text" ||
      eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "codeblock") &&
    parentPrev &&
    parentPrev.className === "divisionLine" &&
    parentPrev.previousSibling
  ) {
    event.preventDefault();
    changePlaceFoucs({ target: parentPrev.previousSibling });
    return;
  }

  /* 이동하고자 하는 다음줄이 구분선이고 그다음이 체크박스 콜아웃 코드박스일때 */
  const doublePrev = prevTarget.previousSibling;
  if (
    prevTarget &&
    prevTarget.className === "divisionLine" &&
    doublePrev &&
    (doublePrev.className === "checkbox" ||
      doublePrev.className === "prebox" ||
      doublePrev.className === "callBox")
  ) {
    event.preventDefault();
    const focusTarget = doublePrev.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  if (
    prevTarget &&
    (prevTarget.className === "callBox" ||
      prevTarget.className === "checkbox" ||
      prevTarget.className === "prebox")
  ) {
    /* 콜박스으로 이동 */
    /* 체크 박스으로 이동 */
    /* 코드블럭으로 이동 */
    event.preventDefault();
    const focusTarget = prevTarget.lastChild;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 콜박스에서 이전 줄로 이동 */
  /* 체크박스에서 이전 줄로 이동 */
  /* 코드블록에서 이전 줄로 이동 */
  if (
    parentPrev &&
    (eventTarget.className === "checkbox_text" ||
      eventTarget.className === "callBox_textBox" ||
      eventTarget.className === "codeblock")
  ) {
    event.preventDefault();
    const focusTarget = eventTarget.parentNode.previousSibling;
    changePlaceFoucs({ target: focusTarget });
    return;
  }

  /* 구분선 이동 */
  if (prevTarget && prevTarget.className === "divisionLine") {
    event.preventDefault();
    const disionPrevTarget = prevTarget.previousSibling;
    changePlaceFoucs({ target: disionPrevTarget });
    return;
  }

  /* 기본 위로 이동 */
  if (prevTarget) {
    event.preventDefault();
    changePlaceFoucs({ target: prevTarget });
    return;
  }
}
