export default function EditTitle({ target, state }) {
  const inputElement = document.createElement("input");
  inputElement.focus();
  inputElement.setAttribute("class", "pageViewer_editor_title");
  inputElement.setAttribute("data-name", "title");
  inputElement.setAttribute("placeholder", "제목 없음");
  target.appendChild(inputElement);

  this.state = state;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    inputElement.value = this.state;
  };
}
