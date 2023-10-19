export default function Editor({ targetEl, initialState, onChange }) {
  const editorEl = document.createElement("div");
  editorEl.className = "editor";
  const inputEl = document.createElement("input");
  inputEl.name = "title";
  inputEl.placeholder = "Title";
  const textareaEl = document.createElement("textarea");
  textareaEl.name = "content";

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    if (onChange) {
      onChange(this.state.data);
    }

    this.render();
  };

  this.updateState = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  this.render = () => {
    if (!this.isInit) {
      inputEl.addEventListener("keyup", this.updateState);
      textareaEl.addEventListener("keyup", this.updateState);
      editorEl.appendChild(inputEl);
      editorEl.appendChild(textareaEl);
      targetEl.appendChild(editorEl);

      this.isInit = true;
    }

    if (this.state.data) {
      inputEl.value = this.state.data.title;
      textareaEl.value = this.state.data.content ?? "";
    }
  };
}
