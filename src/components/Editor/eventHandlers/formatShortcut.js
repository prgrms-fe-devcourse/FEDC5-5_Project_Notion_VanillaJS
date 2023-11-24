import { createDebug } from "../../../shared/debug.js";

const debug = createDebug("Editor/FormatShortcut");

// keyup 필요
// keydown에서는 Digit0이 발생되지 않았다.
export const handleFormatShorcut = (e) => {
    // 문제: Ctrl+Z를 눌러 textContent가 `# `이 될 때도 발동된다.. --> 회피하기 위해 e.code === "Space"일 때만 발동하도록 함
    // nbsp = #\u00a0
    // TODO: <후순위> 노션은 맨 앞에서 Backspace 누르면 format이 사라짐.
    if (e.code === "Space" && window.getSelection().anchorNode.textContent.startsWith("# ")) {
        document.execCommand("formatBlock", false, "h1");
        // 선택이 안 됐으면 한 글자만 지움. Caret이기 때문에 이렇게 지우는 것
        // TODO: 한 번에 지우고 싶으면 Range로 만들어도 될 듯?
        document.execCommand("delete");
        document.execCommand("delete");
    }

    // h2
    if (e.code === "Space" && window.getSelection().anchorNode.textContent.startsWith("## ")) {
        document.execCommand("formatBlock", false, "h2");
        // 선택이 안 됐으면 한 글자만 지움. Caret이기 때문에 이렇게 지우는 것
        // TODO: 한 번에 지우고 싶으면 Range로 만들어도 될 듯?
        document.execCommand("delete");
        document.execCommand("delete");
        document.execCommand("delete");
    }

    // h3
    if (e.code === "Space" && window.getSelection().anchorNode.textContent.startsWith("### ")) {
        document.execCommand("formatBlock", false, "h3");
        // 선택이 안 됐으면 한 글자만 지움. Caret이기 때문에 이렇게 지우는 것
        // TODO: 한 번에 지우고 싶으면 Range로 만들어도 될 듯?
        document.execCommand("delete");
        document.execCommand("delete");
        document.execCommand("delete");
        document.execCommand("delete");
    }

    // 문제: Ctrl+Shift+0 입력 시 keydown에서는 ShiftLeft, ControlLeft만 발생했다. keyup에선 Digit0도 발생했다.
    if (e.ctrlKey && e.shiftKey && e.code === "Digit1") {
        // TODO: 이미 h1인 경우 무시해야 함.
        document.execCommand("formatBlock", false, "h1");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit2") {
        document.execCommand("formatBlock", false, "h2");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit3") {
        document.execCommand("formatBlock", false, "h3");
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit0") {
        // removeFormat은 selection 대상인 거여서 그렇게 해줘야 함
        debug("ctrl+shift+0");
        document.execCommand("formatBlock", false, "div");
    }
};
