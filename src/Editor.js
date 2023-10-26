import router from "./router.js";
import {
  UNTITLED,
  compareObject,
  editorCommands,
  getFlatDocuments,
} from "./utility.js";

export default function Editor({ targetEl, initialState, onEditing }) {
  const editorEl = document.createElement("div");
  const titleEl = document.createElement("input");
  const contentEl = document.createElement("div");
  const commandsEl = document.createElement("div");
  const childPagesEl = document.createElement("div");
  const guideEl = document.createElement("div");

  this.isInit = false;

  this.state = {
    ...initialState,
    flatDocuments: getFlatDocuments(initialState.documents).data,
  };

  this.setState = (nextState) => {
    const prevState = JSON.parse(JSON.stringify(this.state));

    if (compareObject(prevState, nextState).isDifferent) {
      this.state = {
        ...nextState,
        flatDocuments: getFlatDocuments(nextState.documents).data,
      };

      if (onEditing && this.state.document.data) {
        onEditing(this.state.document.data);
      }

      if (
        compareObject(
          prevState.selectedDocumentId,
          nextState.selectedDocumentId
        ).isDifferent
      ) {
        this.isInit = false;
      }

      if (
        compareObject(
          prevState.selectedDocumentId,
          nextState.selectedDocumentId
        ).isDifferen ||
        compareObject(prevState.document, nextState.document).isDifferent
      ) {
        this.render();
      }
    }
  };

  const transformContent = (e) => {
    if (e.target instanceof HTMLInputElement) {
      return null;
    }

    const selection = window.getSelection();
    const anchorNode = selection.anchorNode;
    const lineEl = anchorNode.parentNode.closest(".content > *");

    // #, ##, ## 처리
    const headerRegex = new RegExp(/^(?<level>#{1,3})\s/);

    const innerHTML = lineEl ? lineEl.innerHTML : anchorNode.wholeText;
    const oldNode = lineEl ? lineEl : anchorNode;

    if (innerHTML?.match(headerRegex)) {
      const { level } = headerRegex.exec(innerHTML).groups;
      const newNode = document.createElement("h" + level.length);
      newNode.classList.add("item-block", "heading-block");
      newNode.innerHTML = innerHTML.replace(`${level} `, "");
      oldNode.parentNode.insertBefore(newNode, oldNode);
      oldNode.parentNode.removeChild(oldNode);
    }

    // 문서 링크
    if (this.state.flatDocuments) {
      this.state.flatDocuments.forEach(({ id, title }) => {
        const titleRegex = new RegExp(`@${title}`);
        const titleInputRegex = new RegExp(`@${title}[\\s|&nbsp;]`);

        if (innerHTML?.match(titleInputRegex)) {
          const nodeName =
            oldNode instanceof HTMLElement ? oldNode.nodeName : "div";
          const newNode = document.createElement(nodeName);

          newNode.innerHTML = innerHTML.replace(
            titleRegex,
            `
            <a class="item-blcok link-block" href="/documents/${id}" contenteditable="false">
              <span class="icon">🔗</span>
              <span class="document-title">${title}</span>
            </a>&nbsp;
            <span class="temp" />
            `
          );

          contentEl.blur();

          oldNode.parentNode.insertBefore(newNode, oldNode);
          oldNode.parentNode.removeChild(oldNode);

          const range = document.createRange();
          const spanEl = newNode.querySelector("span.temp");

          range.selectNode(spanEl);

          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);

          range.deleteContents();

          contentEl.focus();
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

  const onClickCommand = (e) => {
    const { target } = e;
    const btnEl = target.closest("button");

    if (btnEl instanceof HTMLButtonElement) {
      const { command, variable } = btnEl.dataset;
      document.execCommand(command, null, variable ?? null);
    }
  };

  this.init = () => {
    editorEl.className = "editor";
    titleEl.name = "title";
    titleEl.className = "title";
    titleEl.placeholder = "Title";
    contentEl.className = "content";
    contentEl.contentEditable = true;
    contentEl.spellcheck = false;
    contentEl.name = "content";
    guideEl.className = "guide";
    childPagesEl.className = "child";
    commandsEl.className = "commands";

    titleEl.addEventListener("keyup", updateState);
    contentEl.addEventListener("input", updateState);
    childPagesEl.addEventListener("click", onClickChildPage);
    commandsEl.addEventListener("click", onClickCommand);

    editorEl.appendChild(titleEl);
    editorEl.appendChild(commandsEl);
    editorEl.appendChild(contentEl);
    editorEl.appendChild(guideEl);
    editorEl.appendChild(childPagesEl);
    targetEl.appendChild(editorEl);

    guideEl.innerHTML = `
      <span>편집할 문서를 선택하거나, 좌측 상단 <img class="icon" src="/svg/plus.svg" alt="create document icon" /> 버튼을 눌러 새 문서를 생성해주세요</span>
    `;

    commandsEl.innerHTML = editorCommands
      .map(
        ({ command, variable, label, icon }) => `
      <button 
        class="command"
        data-command="${command}" 
        ${variable ? `data-variable="${variable}"` : ""} 
        title="${label}"
      >
        <img class="icon" src="${icon}" alt="${label} icon" />
      </button>
    `
      )
      .join("");
  };

  this.render = () => {
    if (!this.isInit) {
      this.init();
      this.isInit = true;
    }

    const { document, selectedDocumentId } = this.state;

    titleEl.placeholder = selectedDocumentId ? "Title" : "문서를 선택해 주세요";
    titleEl.disabled = selectedDocumentId ? false : true;
    titleEl.value = selectedDocumentId ? titleEl.value : "";
    guideEl.hidden = selectedDocumentId;
    contentEl.hidden = selectedDocumentId ? false : true;
    childPagesEl.hidden = selectedDocumentId ? false : true;

    if (document.data) {
      const { title, content, documents } = document.data;

      if (title !== titleEl.value) {
        titleEl.value = title;
      }

      if (content !== contentEl.innerHTML) {
        contentEl.innerHTML = content ?? "";
      }

      childPagesEl.innerHTML = `
        <h3 class="child-pages-header">하위 페이지</h3>
        <ul class="child-pages">
          ${
            Array.isArray(documents) && documents.length === 0
              ? `
            <li class="child-page">하위 페이지가 없습니다.</li>
          `
              : ""
          }
          ${
            Array.isArray(documents)
              ? documents
                  .map(
                    ({ id, title }) => `
            <li class="child-page" data-id="${id}">
              <img class="icon" src="/svg/file.svg" alt="document icon" />
              <span>${title.length ? title : UNTITLED}</span>
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
