import { createDebug } from "../../../shared/debug.js";

const debug = createDebug("Editor/undo");

// keyup 이벤트 필요
export const handleEditorUndo = (e) => {
    // Q. 사실 이거 필요 없는 거 아님? 애초에 execCommand로 하면 history에 들어가는 느낌인데?
    // (굳이 undo로 실행해주지 않아도?)
    // UNDO, REDO intercept
    // shift 여부 상관 없이 블럭
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === "KeyZ") {
        debug("Ctrl + Shift + z");
        document.execCommand("redo");
        e.preventDefault();
        return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ") {
        debug("Ctrl + z");
        document.execCommand("undo");
        e.preventDefault();
        return false;
    }
};
