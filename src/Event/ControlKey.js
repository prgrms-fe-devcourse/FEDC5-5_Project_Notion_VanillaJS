import { getOffset } from "../Function/Focus.js";
import arrowDownEvent from "./ControlKey/ArrowDownEvent.js";
import arrowUpEvent from "./ControlKey/ArrowUpEvent.js";
import backspaceEvent from "./ControlKey/BackSpaceEvent.js";
import enterEvent from "./ControlKey/EnterEvent.js";

export function controlKey({ event, target }) {
  /* Enter new create Element */
  const { isComposing } = event;
  const eventTarget = event.target;
  const prevTarget = eventTarget.previousSibling;
  const nextTarget = eventTarget.nextSibling;

  /* Enter */
  if (event.key === "Enter" && !isComposing) {
    enterEvent({
      event,
      editorElement: target,
      nextTarget,
      prevTarget,
      eventTarget,
    });
  }

  /* 삭제 관련 Back Space */

  if (getOffset() === 0 && event.key === "Backspace") {
    backspaceEvent({
      eventTarget,
      prevTarget,
      nextTarget,
      event,
      editorElment: target,
    });
    return;
  }

  /* ArrowUp 화살표 이동 관련 */
  if (event.key === "ArrowUp") {
    arrowUpEvent({
      eventTarget,
      prevTarget,
      event,
    });
    return;
  }

  /* ArrowDown 화살표 관련 */

  if (event.key === "ArrowDown") {
    arrowDownEvent({
      event,
      eventTarget,
      prevTarget,
      nextTarget,
    });
    return;
  }
}
