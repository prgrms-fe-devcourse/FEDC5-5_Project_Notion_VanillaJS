import router from './router.js'

export default function Editor({ targetEl, initialState, onEditing }) {
  const editorEl = document.createElement("div");
  editorEl.className = "editor";
  const inputEl = document.createElement("input");
  inputEl.name = "title";
  inputEl.placeholder = "Title";
  const textareaEl = document.createElement("textarea");
  textareaEl.name = "content";
  const childPagesEl = document.createElement('div');

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
      childPagesEl.addEventListener('click', e => {
        const { target } = e
        const liEl = target.closest('li')
        if(liEl && liEl.className === 'child-page' && liEl.dataset.id) {
          router.push(`/documents/${liEl.dataset.id}`)
        }
      })
      editorEl.appendChild(inputEl);
      editorEl.appendChild(textareaEl);
      editorEl.appendChild(childPagesEl);
      targetEl.appendChild(editorEl);

      this.isInit = true;
    }

    const { document } = this.state;

    if (document.data) {
      inputEl.value = document.data.title;
      inputEl.disabled = false;
      textareaEl.value = document.data.content ?? "";
      textareaEl.disabled = false;
      childPagesEl.innerHTML = `
        <h3>하위 페이지</h3>
        <ul>
          ${document.data.documents && Array.isArray(document.data.documents) ? document.data.documents.map(document => `
            <li class="child-page" data-id="${document.id}">${document.title}</li>
          `).join(''):''}
        </ul>
      `
    } else {
      inputEl.value = "";
      inputEl.disabled = true;
      textareaEl.value = "";
      textareaEl.disabled = true;
      childPagesEl.innerHTML = ''
    }
  };
}
