export const handleCursor = (target) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(target);
    range.collapse(false); // move to the end of the range
    sel.removeAllRanges();
    sel.addRange(range);
    target.focus();
}