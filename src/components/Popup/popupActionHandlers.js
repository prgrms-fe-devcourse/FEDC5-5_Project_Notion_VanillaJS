import { createDebug } from "../../shared/debug.js";

const debug = createDebug("exec_handler");

export const handlePopUpFormatHeading = () => {
    document.execCommand("formatBlock", false, "h1");
};

export const handlePopUpAttachLink = () => {
    document.execCommand("createLink", false, "https://naver.com");
};

export const handlePopUpFormatBold = () => {
    document.execCommand("bold", false);
};

export const handlePopUpFormatItalic = () => {
    document.execCommand("italic", false);
};

export const handlePopUpFormatUnderline = () => {
    document.execCommand("underline", false);
};

// TODO: 포매팅 한 후 제거할 수도 있게 만들기
// FIXME: 포맷팅 후 <code>가 아닌 <div>에 style이 들어가는 문제가 있음. 언제 발생하는진 확인 필요
export const handlePopUpFormatCode = () => {
    // 인라인 단위로 수정하고 싶기 때문에, Selection을 사용해야 할 듯.
    // 블록의 일부를 인라인 단위로 선택하면 TextNode가 선택됨
    // 전체 블록을 인라인 단위로 선택하면

    const range = window.getSelection().getRangeAt(0);
    const textContent = range.toString(); // delete 후에는 빈 값이 됨(Live 객체인 듯). 미리 저장해놔야 함.

    debug(
        range.toString(), // textContent ?
        range.startContainer, // div (parent)
        range.endContainer, // textNode
        range.commonAncestorContainer, // div (parent)
    );

    // replace와 같은 기능이 없으므로 delete를 써야 함.
    // delete를 쓰는 경우 부자연스러운 재생성 및 재선택이 되거나 Ctrl+Z를 2번 눌러야 하지만 차선책임.
    // 다른 인자 없이 delete만 전달하면 선택 영역이 전부 제거됨. 인자를 넘기면 글자 하나만 제거함.
    // https://stackoverflow.com/questions/33429105/javascript-execcommanddelete-not-delete-all-selection-div-in-chrome
    document.execCommand("delete");

    // 문제 1: <code>로는 감싸지지 않는 문제가 있음.
    // 포멧 대상 요소는 다음과 같음: "address", "dd", "div", "dt", "h1", "h2", "h3", "h4", "h5", "h6", "p", or "pre".
    // https://w3c.github.io/editing/docs/execCommand/#the-formatblock-command
    // 문제 2: 수정 단위도 블럭 단위임.
    document.execCommand("insertHTML", false, `<code>${textContent}</code>`);
};
