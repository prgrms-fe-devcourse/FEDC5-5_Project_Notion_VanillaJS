export default function EditButtons({ $target, initialState, onClick }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", "hide edit-button-wrap");
  $target.appendChild($div);

  $div.innerHTML = `
    <button class="bold-button">
      <i class="fas fa-bold"></i>
    </button>
    <button class="italic-button">
      <i class="fas fa-italic"></i>
    </button>
    <button class="strike-button">
      <i class="fas fa-strikethrough"></i>
    </button>
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};

  const toggleTag = (markDownSyntax, tag) => {
    const selection = window.getSelection();
    const textContent = selection.toString();
    const styledText = `${markDownSyntax}${textContent}${markDownSyntax}`;
    const { outerHTML } = selection.focusNode.parentNode;
    const hasTag = outerHTML.includes(tag);

    if (hasTag) {
      onClick(this.state.replace(styledText, textContent));
    } else {
      onClick(this.state.replace(textContent, styledText));
    }
  };

  $div.addEventListener("click", (e) => {
    const { className } = e.target.closest("button");

    switch (className) {
      case "bold-button":
        toggleTag("**", "<b>");
        break;
      case "italic-button":
        toggleTag("_", "<i>");
        break;
      case "strike-button":
        toggleTag("~~", "<s>");
        break;
      default:
        break;
    }
  });
}
