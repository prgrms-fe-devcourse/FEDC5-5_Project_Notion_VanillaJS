export function newFocus(focusNode) {
  if (focusNode) {
    focusNode.focus();
    // 맨뒤로 포커스
    const range = document.createRange();
    const selection = window.getSelection();
    const tmp = document.createElement("span");
    focusNode.appendChild(tmp);

    range.selectNode(tmp);
    selection.removeAllRanges();
    selection.addRange(range);
    // range.deleteContents(); // ?
  }
}
