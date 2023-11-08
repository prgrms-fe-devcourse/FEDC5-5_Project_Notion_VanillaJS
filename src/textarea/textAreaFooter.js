const $ = document;

export default function TextAreaFooter({ $target, initialState, onClickChildPage }) {
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const $childDocumentLink = $.createElement("div");
  $childDocumentLink.className = "textArea-childLink";

  $target.appendChild($childDocumentLink);

  this.render = () => {
    $childDocumentLink.innerHTML = "";
    if (this.state === undefined) {
      console.log(`하위 페이지 없음`);
    } else if (Array.isArray(this.state)) {
      this.state.map((children) => {
        const childNode = $.createElement("div");
        childNode.className = "textArea-childDiv";
        childNode.innerText = `${children.title}`;
        childNode.addEventListener("click", () => {
          onClickChildPage(children.id);
        });
        $childDocumentLink.appendChild(childNode);
      });
    }
  };
}
