import { createDebug } from "../../../shared/debug.js";

const debug = createDebug("Editor/ShowPlaceholderOnEmptyBlock");

// FIXME: 아마도 div 중첩 버그 때문인 것 같은데, 그런 경우엔 개행 시에도 placeholder가 표시되지 않음.
// div 중첩 상태가 아니면 정상 동작함.

// 텍스트 노드가 대상인 경우 classList가 없다.
// FIXME: 빈 페이지로 이동하면 오류남. classList 없다고.
const isRoot = ($node) => $node.classList?.contains("editor__content_root");

const findParentUnderRoot = ($node) => {
    // 부모보다 1단계 이전을 봐야 하기 때문
    let $prevParent = $node;
    let $parent = $node;
    while (!isRoot($parent) && $parent.parentElement) {
        $prevParent = $parent;
        $parent = $parent.parentElement;
    }

    return $prevParent;
};

const triggeringKeys = [
    "KeyX", // TODO: Ctrl+X를 의미하는 건데, ctrl 여부를 다루기 귀찮.. 나중에 추상화하기
    "Enter",
    "Backspace",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
];

let previousOwner = null;

const removePlaceholder = () => {
    // 1. 기존 걸 지우기 (항상 지움 어차피)
    if (previousOwner) {
        previousOwner.classList.remove("show_placeholder");
        // debug("removed prev owner's classList:", previousOwner);
    }
};

const showPlaceholderIfNeeded = () => {
    // 2. 빈 요소인지 체크하기

    // 2-1. 루트가 빈 경우
    const $target = window.getSelection().anchorNode;
    // debug("$target:", $target);
    if (isRoot($target) && $target.children.length === 0) {
        $target.classList.add("show_placeholder");
        previousOwner = $target;
        // debug("target is root and empty:", $target);
        return;
    }

    // 2-2. 개행한 div가 빈 경우
    const $parent = findParentUnderRoot($target);
    // debug("$parent:", $parent);
    if (
        $parent.nodeName === "DIV" &&
        $parent.children.length === 1 &&
        $parent.firstChild.nodeName === "BR"
    ) {
        $parent.classList.add("show_placeholder");
        previousOwner = $parent;
        // debug("parent is div with br:", $parent);
    }
};

// keydown 필요
// keydown으로 하면 실제 입력 상태보다 한 키 전의 값이 온다.
export const handlePlaceholderOnKeyEvent = (e) => {
    debug(e.code);
    // TODO: setTimeout indent 제거하는 법 알아보기
    setTimeout(() => {
        // FIXME: 부자연스러움. 개선 필요. (이거 당장은 못 할 듯?)
        // 엔터를 꾹 누르는 경우엔 속도를 못 따라오는 듯함.. 계속 남음. ---> 꾹 누르는 경우는 keyup이 호출되지 않기 때문임;
        // 다른 노드로 넘어가는 경우에도 제거해줘야 함. ---> onblur 이벤트 달아주면 될 듯
        // 그리고 마우스로 이동하는 경우도 있으니 onclick 혹은 onfocus 시에도 달아주는 게 좋을 듯
        removePlaceholder();
        if (!triggeringKeys.includes(e.code)) {
            return;
        }
        showPlaceholderIfNeeded();
    }, 0);
};

export const handlePlaceholderOnMouseEvent = () => {
    removePlaceholder();
    showPlaceholderIfNeeded();
};
