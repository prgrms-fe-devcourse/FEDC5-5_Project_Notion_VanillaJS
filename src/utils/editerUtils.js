export const moveCursorToEnd = target => {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(target);
  range.collapse(false); // 끝으로 이동
  sel.removeAllRanges();
  sel.addRange(range);
  range.deleteContents();
  target.focus();
};
