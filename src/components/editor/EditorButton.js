const EditorButtonProps = {
  id: "string",
  content: "string",
};

export default function EditorButton({ $parent, initState, onClick }) {
  const $component = document.createElement("button");
  $component.setAttribute("id", initState.id);
  $component.setAttribute("type", "button");
  $component.classList.add("editor-button");

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
