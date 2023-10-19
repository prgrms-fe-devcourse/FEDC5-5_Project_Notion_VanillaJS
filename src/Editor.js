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

    if (onChange && this.state.content.data) {
      onChange(this.state.content.data);
    }

    this.render();
  };

  this.updateState = (e) => {
    this.setState({
      ...this.state,
      content: {
        ...this.state.content,
        data: {
          ...this.state.content.data,
          [e.target.name]: e.target.value,
        },
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

    const { content } = this.state;

    if (content.data) {
      inputEl.value = content.data.title;
      inputEl.disabled = false;
      textareaEl.value = content.data.content ?? "";
      textareaEl.disabled = false;
    } else {
      inputEl.value = "";
      inputEl.disabled = true;
      textareaEl.value = "";
      textareaEl.disabled = true;
    }
  };
}
