import router from "./router.js";
import { editorCommands } from "./utility.js";

export default function Editor({ targetEl, initialState, onEditing }) {
  const editorEl = document.createElement("div");
  editorEl.className = "editor";
  const inputEl = document.createElement("input");
  inputEl.name = "title";
  inputEl.placeholder = "Title";
  const editableEl = document.createElement("div");
  editableEl.contentEditable = true;
  editableEl.className = "content";
  editableEl.name = "content";
  const childPagesEl = document.createElement("div");
  const buttonsEl = document.createElement("div");
  buttonsEl.className = "buttons";
  buttonsEl.innerHTML = editorCommands
    .map(
      ({ command, variable, label, icon }) => `
    <button data-command="${command}" ${
        variable ? `data-variable="${variable}"` : ""
      } title="${label}">
      <img class="icon" src="${icon}" alt="${label} icon" />
    </button>
  `
    )
    .join("");

  this.isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    const prevState = JSON.parse(JSON.stringify(this.state));

    if (JSON.stringify(prevState) !== JSON.stringify(nextState)) {
      this.state = nextState;

      if (onEditing && this.state.document.data) {
        onEditing(this.state.document.data);
      }

      if (prevState.selectedDocumentId !== nextState.selectedDocumentId) {
        this.isInit = false;
      }

      this.render();
    }
  };

  const transformContent = (e) => {
    if (e.target instanceof HTMLInputElement) {
      return null;
    }

    const selection = window.getSelection();
    const anchorNode = selection.anchorNode;
    const lineEl = anchorNode.parentNode.closest(".content > *");

    // editableEl에 최상단에 TextNode가 없도록 div로 wrapping
    if (!lineEl) {
      if (anchorNode.wholeText) {
        const newNode = document.createElement("div");
        newNode.innerHTML = anchorNode.wholeText;
        anchorNode.parentNode.insertBefore(newNode, anchorNode);
        anchorNode.parentNode.removeChild(anchorNode);
      }
    }

    // #, ##, ## 처리
    const headerRegex = new RegExp(/^(?<level>#{1,3})\s/);

    if (lineEl?.innerText?.match(headerRegex)) {
      const { level } = headerRegex.exec(lineEl.innerText).groups;

      lineEl.innerHTML = `<h${
        level.length
      } class="item-block heading-block">${lineEl.innerText.replace(
        `${level} `,
        ""
      )}</h${level.length}>`;

      editableEl.blur();

      const spanEl = document.createElement("span");
      spanEl.className = "temp";
      lineEl.appendChild(spanEl);

      const range = document.createRange();

      range.selectNode(spanEl);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      editableEl.focus();

      range.deleteContents();
      // spanEl.parentNode.removeChild(spanEl)
    }

    if (this.state.flatDocuments) {
      this.state.flatDocuments.map(({ id, title }) => {
        const regex = new RegExp(`@${title}`);

        if (lineEl?.innerHTML?.match(regex)) {
          lineEl.innerHTML = lineEl.innerHTML.replace(
            regex,
            `
            <a class="item-blcok link-block" href="/documents/${id}" contenteditable="false">
              <span class="icon">🔗</span>
              <span class="document-title">${title}</span>
            </a>
            <span class="temp" />
          `
          );

          const range = document.createRange();
          const spanEl = document.querySelector("span.temp");

          range.selectNode(spanEl);

          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          range.deleteContents();
          // spanEl.parentNode.removeChild(spanEl)
        }
      });
    }
  };

  const updateState = (e) => {
    transformContent(e);

    let value;

    if (e.target instanceof HTMLDivElement) {
      value = e.target.innerHTML;
    } else {
      value = e.target.value;
    }

    this.setState({
      ...this.state,
      document: {
        ...this.state.document,
        data: {
          ...this.state.document.data,
          [e.target.name]: value,
        },
      },
    });
  };

  const onClickChildPage = (e) => {
    const { target } = e;
    const liEl = target.closest("li");
    if (liEl && liEl.className === "child-page" && liEl.dataset.id) {
      router.push(`/documents/${liEl.dataset.id}`);
    }
  };

  const onClickCommandBtn = (e) => {
    const { target } = e;
    const btnEl = target.closest("button");

    if (btnEl instanceof HTMLButtonElement) {
      const { command, variable } = btnEl.dataset;
      document.execCommand(command, null, variable ?? null);
    }
  };

  this.render = () => {
    if (!this.isInit) {
      inputEl.addEventListener("keyup", updateState);
      editableEl.addEventListener("keyup", updateState);
      childPagesEl.addEventListener("click", onClickChildPage);
      buttonsEl.addEventListener("click", onClickCommandBtn);
      editorEl.appendChild(inputEl);
      editorEl.appendChild(buttonsEl);
      editorEl.appendChild(editableEl);
      editorEl.appendChild(childPagesEl);
      targetEl.appendChild(editorEl);

      this.isInit = true;
    }

    if (this.state.document.data) {
      if (this.state.document.data.title !== inputEl.value) {
        inputEl.value = this.state.document.data.title;
      }

      if (this.state.document.data.content !== editableEl.innerHTML) {
        editableEl.innerHTML = this.state.document.data.content ?? "";
      }

      childPagesEl.innerHTML = `
        <h3 class="child-pages-header">하위 페이지</h3>
        <ul class="child-pages">
          ${
            Array.isArray(this.state.document?.data?.documents) &&
            this.state.document.data.documents.length === 0
              ? `
            <li class="child-page">하위 페이지가 없습니다.</li>
          `
              : ""
          }
          ${
            Array.isArray(this.state.document?.data?.documents)
              ? this.state.document.data.documents
                  .map(
                    (document) => `
            <li class="child-page" data-id="${document.id}">
              <img class="icon" src="/svg/file.svg" alt="document icon" />
              <span>${document.title}</span>
            </li>
          `
                  )
                  .join("")
              : ""
          }
        </ul>
      `;
    }
  };
}
