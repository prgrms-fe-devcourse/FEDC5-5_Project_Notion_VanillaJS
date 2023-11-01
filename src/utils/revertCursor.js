export default function reverCursor(node) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(node);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  node.focus();
}
