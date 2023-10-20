export default function Editor({ targetEl, initialState, onEditing }) {
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

    if (onEditing && this.state.document.data) {
      onEditing(this.state.document.data);
    }

    this.render();
  };

  const updateState = (e) => {
    this.setState({
      ...this.state,
      document: {
        ...this.state.document,
        data: {
          ...this.state.document.data,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  this.render = () => {
    if (!this.isInit) {
      inputEl.addEventListener("keyup", updateState);
      textareaEl.addEventListener("keyup", updateState);
      editorEl.appendChild(inputEl);
      editorEl.appendChild(textareaEl);
      targetEl.appendChild(editorEl);

      this.isInit = true;
    }

    const { document } = this.state;

    if (document.data) {
      inputEl.value = document.data.title;
      inputEl.disabled = false;
      textareaEl.value = document.data.content ?? "";
      textareaEl.disabled = false;
    } else {
      inputEl.value = "";
      inputEl.disabled = true;
      textareaEl.value = "";
      textareaEl.disabled = true;
    }
  };
}
