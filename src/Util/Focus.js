export const moveEndFocus = (target) => {
    const selection = window.getSelection();
    const range = document.createRange();

    range.selectNodeContents(target); // range가 target 노드를 선택한다
    range.collapse(false); // 현재 range 노드의 맨 끝으로 포커스 옮긴다.

    selection.removeAllRanges(); // selection이 가진 ragne를 모두 제거
    selection.addRange(range); // selection에 새로 만든 range를 추가

    target.focus();
};
