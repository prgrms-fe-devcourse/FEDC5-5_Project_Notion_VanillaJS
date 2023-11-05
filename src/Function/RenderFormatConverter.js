import CreateEditTextElement from "../Components/PageViewer/Editor/CreateEditTextElement.js";
import { changePlaceFoucs } from "./Focus.js";

export default function RenderFormatConverter({ text, target }) {
  /* 볼드체 */
  const boldReg = /\*\*\*.+\*\*\*/;
  if (boldReg.test(text)) {
    text = text.replace(/\*\*\*/, "<b>").replace(/\*\*\*/, "</b>");
  }
  /* 제목 관련 */
  /* h1 요소 생성 */
  if (text.indexOf("# ") === 0) {
    const replacedText = text.replace(/#./, "");
    return new CreateEditTextElement({
      target,
      text: replacedText,
      className: "h1",
    });
  }

  /* h2 요소 생성 */
  if (text.indexOf("## ") === 0) {
    const replacedText = text.replace(/##./, "");
    return new CreateEditTextElement({
      target,
      text: replacedText,
      className: "h2",
    });
  }

  /* h3 요소 생성 */
  if (text.indexOf("### ") === 0) {
    const replacedText = text.replace(/###./, "");
    return new CreateEditTextElement({
      target,
      text: replacedText,
      className: "h3",
    });
  }

  /* 구분선 관련 */
  if (text.indexOf("<divisionLine>") === 0) {
    return new CreateEditTextElement({
      target,
      className: "divisionLine",
      noContentEdit: true,
    });
  }

  /* 체크 박스 관련 */

  if (text.indexOf("<callOut>") === 0) {
    const replacedText = text.replace(/<callOut>/, "");
    /* 큰 CallBox 속 Emoji와 Text 박스가 존재함 */
    const callBox = new CreateEditTextElement({
      target,
      className: "callBox",
      noContentEdit: true,
    });

    const emojiBox = new CreateEditTextElement({
      target: callBox.getElement(),
      className: "callBox_emoji",
      text: "💡",
      noContentEdit: true,
      element: "span",
    });

    new CreateEditTextElement({
      target: callBox.getElement(),
      text: replacedText,
      className: "callBox_textBox",
      appendTarget: emojiBox.getElement(),
      element: "span",
    });
    return;
  }

  /* 체크 박스 관련 */
  /* isChecked */
  if (text.indexOf("<[x]>") === 0) {
    const replaced = text.replace(/<\[x\]>/, "");
    const checkBoxElement = new CreateEditTextElement({
      target,
      noContentEdit: true,
      className: "checkbox",
    });
    checkBoxElement.getElement().innerHTML = `<input type="checkbox" class="checkbox_input" checked="">`;
    new CreateEditTextElement({
      target: checkBoxElement.getElement(),
      className: "checkbox_text",
      element: "label",
      text: replaced,
    });
    return;
  }

  /* no checked */
  if (text.indexOf("<[]>") === 0) {
    const replaced = text.replace(/<\[\]>/, "");
    const checkBoxElement = new CreateEditTextElement({
      target,
      noContentEdit: true,
      className: "checkbox",
    });
    checkBoxElement.getElement().innerHTML = `<input type="checkbox" class="checkbox_input">`;
    new CreateEditTextElement({
      target: checkBoxElement.getElement(),
      className: "checkbox_text",
      element: "label",
      text: replaced,
    });
    return;
  }

  /* code block */
  if (text.indexOf("<isCode>") === 0) {
    const replaced = text.replace(/<isCode>/, "");

    const preElement = new CreateEditTextElement({
      target: target,
      className: "prebox",
      element: "pre",
      noContentEdit: true,
      insertBeforeTarget: target,
    });

    const codeElement = new CreateEditTextElement({
      target: preElement.getElement(),
      className: "codeblock",
      element: "code",
      text: replaced,
    });

    changePlaceFoucs({ target: codeElement.getElement() });
    return;
  }

  /* 일반 Text */
  return new CreateEditTextElement({
    target,
    text: text,
  });
}
