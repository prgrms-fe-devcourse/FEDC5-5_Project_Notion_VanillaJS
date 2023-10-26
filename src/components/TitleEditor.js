export default function TitleEditor({ $target, initialState, onEditing }) {
  const $titleContainer = document.createElement("div");
  $titleContainer.className = "text-container";

  $titleContainer.innerHTML = `
    <div class="title-box">
      <div class="title-top-margin"></div>
      <h1 contenteditable="true" data-text="제목 없음" class="input-title"></h1>
    </div>
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $titleContainer.querySelector(".input-title").textContent = this.state;
  };

  this.render = () => {
    $target.appendChild($titleContainer);
  };

  this.render();

  // 편집기 제목 입력
  $titleContainer
    .querySelector(".input-title")
    .addEventListener("input", (e) => {
      onEditing({
        ...this.state,
        title: e.target.textContent,
      });
    });
}
