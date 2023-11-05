import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changePlaceFoucs } from "../Function/Focus.js";

export default function handleTyping({ event }) {
  if (event.key !== " ") {
    return;
  }
  /* 자동으로 변환된 태그들을 원하는 값으로 변경시켜줌 */
  const text = changeWord(event.target.innerHTML);
  const target = event.target;

  /* 제목 관련 */

  /* 제목 1 */
  if (text.indexOf("# ") === 0) {
    hasClass(target);
    target.classList.add("h1");

    const replaced = changeWord(text, /#./);
    target.innerText = replaced;
    changePlaceFoucs({ target });
  }

  /* 제목 2 */
  if (text.indexOf("## ") === 0) {
    hasClass(target);
    target.classList.add("h2");

    const replaced = changeWord(text, /##./);
    target.innerText = replaced;
    changePlaceFoucs({ target });
  }

  /* 제목 3 */
  if (text.indexOf("### ") === 0) {
    hasClass(target);
    target.classList.add("h3");

    const replaced = changeWord(text, /###./);
    target.innerText = replaced;

    changePlaceFoucs({ target });
  }

  /* 구분선 */
  if (text.indexOf("- - - ") === 0) {
    hasClass(target);
    target.innerText = "";
    target.classList.add("divisionLine");
    target.removeAttribute("contenteditable");

    new CreateEditTextElement({
      target: target.closest(".pageViewer_editor_content"),
      focusTarget: target,
    });
  }

  /* 콜 아웃 */
  if (text.indexOf("/Call ") === 0 || text.indexOf("/call ") === 0) {
    hasClass(target);
    target.innerText = "";
    target.classList.add("callBox");
    target.removeAttribute("contenteditable");
    const replaced = changeWord(text, /\/call.|\/Call./);

    const emojiBox = new CreateEditTextElement({
      target,
      className: "callBox_emoji",
      text: "💡",
      noContentEdit: true,
      element: "span",
    });

    new CreateEditTextElement({
      target,
      text: replaced,
      className: "callBox_textBox",
      focusTarget: emojiBox.getElement(),
      element: "span",
    });
  }

  /* 체크박스 */
  if (text.indexOf("[]") === 0) {
    hasClass(target);
    target.removeAttribute("contenteditable");
    target.setAttribute("class", "checkbox");
    target.innerHTML = `<input type="checkbox" class="checkbox_input">`;
    const replaced = changeWord(text, /\[\]/);

    const labelElement = new CreateEditTextElement({
      target,
      className: "checkbox_text",
      element: "label",
      text: replaced,
    });

    changePlaceFoucs({
      target: labelElement.getElement(),
      isEndPoint: true,
    });
    return;
  }

  /* 코드 블록 */
  if (text.indexOf("```") === 0) {
    target.innerHTML = "";
    const preElement = new CreateEditTextElement({
      target: target.parentNode,
      className: "prebox",
      element: "pre",
      noContentEdit: true,
      insertBeforeTarget: target,
    });

    const codeElement = new CreateEditTextElement({
      target: preElement.getElement(),
      className: "codeblock",
      element: "code",
    });

    changePlaceFoucs({ target: codeElement.getElement() });
    return;
  }

  /* 굵은 글씨 */
  const boldReg = /\*\*\*.+\*\*\*/;
  if (boldReg.test(text)) {
    target.innerHTML = text.replace(/\*\*\*/, "<b>").replace(/\*\*\*/, "</b>");
  }
}

/* class 가 존재하면 지워버림 */
function hasClass(target) {
  if (target.hasAttribute("class")) {
    target.removeAttribute("class");
  }
}

function changeWord(text, reg = "") {
  return text
    .replace(reg, "")
    .replace(/&nbsp;/g, " ")
    .replace(/nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#035;/g, "#")
    .replace(/&#039;/g, "'");
}
