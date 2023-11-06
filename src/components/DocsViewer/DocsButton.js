const DocsButtonProps = {
  content: "string",
};

/**
 * @description Document 추가 / 삭제 버튼
 */
export default function DocsButton({ $parent, initState, onClick }) {
  const $component = document.createElement("button");
  $component.setAttribute("type", "button");

  $parent.appendChild($component);

  this.state = initState;
  this.setState = async (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $component.innerHTML = this.state.content;
  };
  this.render();

  $component.addEventListener("click", onClick);
}
