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

    const { selectedDocumentId, content } = this.state;

    if (selectedDocumentId !== null) {
      inputEl.value = "";
      inputEl.disabled = false;
      textareaEl.value = "";
      textareaEl.disabled = false;
    } else {
      inputEl.disabled = true;
      textareaEl.disabled = true;
    }

    if (content.data) {
      inputEl.value = content.data.title;
      textareaEl.value = content.data.content ?? "";
    }
  };
}
