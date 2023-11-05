export default function CreateEditTextElement({
  target,
  element = "div",
  text = "",
  className,
  insertBeforeTarget,
  noContentEdit,
}) {
  const createElement = document.createElement(element);
  createElement.innerHTML = text;

  /* 읽기 전용 */
  if (!noContentEdit) {
    createElement.setAttribute("contenteditable", "true");
  }

  /* Class Name 지정 */
  if (className) {
    createElement.setAttribute("class", className);
  }

  /* 전달받은 형제노드가 존재시 */
  if (insertBeforeTarget) {
    target.insertBefore(createElement, insertBeforeTarget.nextSibling);
  }

  /* 형제노드가 없다면? */
  if (!insertBeforeTarget) {
    target.appendChild(createElement);
  }

  setTimeout(() => {
    createElement.focus();
  }, 0);

  this.getElement = () => {
    return createElement;
  };
}
