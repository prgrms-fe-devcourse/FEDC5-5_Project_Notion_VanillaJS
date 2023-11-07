import { textToHtml, textToHtmlWithTag } from "../../utils/transfer.js";

export default function ContentEditor({
  $target,
  initialState,
  onContentEditing,
}) {
  const $contentContainer = document.createElement("div");
  $contentContainer.className = "text-container";

  $contentContainer.innerHTML = `
    <div class="input-content" contenteditable="true" data-text="내용을 입력하세요."></div>
  `;

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    $contentContainer.querySelector(".input-content").innerHTML = textToHtml(
      this.state.content
    );
  };

  this.render = () => {
    $target.appendChild($contentContainer);
  };

  this.render();

  // focus 됐을 때 원본 텍스트 불러오기
  $contentContainer
    .querySelector(".input-content")
    .addEventListener("focus", (e) => {
      e.target.innerHTML = textToHtmlWithTag(this.state.originalContent);
    });

  // 편집기 내용 입력
  $contentContainer
    .querySelector(".input-content")
    .addEventListener("input", (e) => {
      onContentEditing(e.target.innerText);
    });
}
