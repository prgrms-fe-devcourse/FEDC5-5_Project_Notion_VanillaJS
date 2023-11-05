export function changePlaceFoucs({
  target,
  isEndPoint = false,
  pickOffset = 0,
}) {
  if (!target) {
    return;
  }

  setTimeout(() => {
    const selection = document.getSelection();
    const offset = selection.anchorOffset;
    target.focus();
    const nextTextNode = selection.anchorNode;

    /* 별도의 지정 위치가 있다면 */

    // 안정성을 위해 일치 연산자 사용
    if (pickOffset !== 0 && nextTextNode.length >= pickOffset) {
      selection.collapse(nextTextNode, pickOffset);
      return;
    }

    /* 끝 이동을 원할때 */
    if (isEndPoint) {
      selection.collapse(nextTextNode, nextTextNode.length);
      return;
    }

    /* 저장된 위치로 이동하길 원할때 */
    if (nextTextNode.length >= offset) {
      selection.collapse(nextTextNode, offset);
      return;
    }

    /* 조건에 맞지 않다면 무조건 맨 뒤로 이동 */
    selection.collapse(nextTextNode, nextTextNode.length);
    return;
  }, 0);
}

export function getOffset() {
  const selection = document.getSelection();
  const offset = selection.anchorOffset;
  return offset;
}
