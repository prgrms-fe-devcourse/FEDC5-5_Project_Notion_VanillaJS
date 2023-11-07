import EditButtons from "./EditButtons.js";
import { transformTag, transformText, deleteText } from "../utils/transform.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor-wrap";

  $editor.innerHTML = `
    <input type="text" id="editor-title" name="title" placeholder="제목을 입력해주세요." />
    <div id="editor-content" contentEditable="true" style="width: 600px;"></div>
  `;

  $target.appendChild($editor);

  const $content = $editor.querySelector("#editor-content");

  const editButtons = new EditButtons({
    $target: $editor,
    onClick: (nextContent) => {
      this.setState({
        ...this.state,
        content: nextContent,
      });
      onEditing(this.state);
      $content.blur();
    },
  });

  this.state = initialState;

  let init = false;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("#editor-title").value = this.state.title || "";
    if (!init) {
      this.state.content = this.state.content.replace(
        /<span class="empty"><\/span>/g,
        ""
      );
      init = true;
    }
    $editor.querySelector("#editor-content").innerHTML =
      this.state.content || "";
    editButtons.setState(this.state.content);
    this.render();
  };

  this.render = () => {
    const richContent = transformTag(this.state.content);

    $editor.querySelector("#editor-title").value = this.state.title;
    $editor.querySelector("#editor-content").innerHTML = richContent;
  };

  $editor.querySelector("#editor-title").addEventListener("keyup", (e) => {
    const parentId = history.state ? history.state.parentId : null;

    this.setState({
      ...this.state,
      title: e.target.value,
      parentId,
    });

    onEditing(this.state);
  });

  $content.addEventListener("compositionend", (e) => {
    let selection = window.getSelection();
    const node = selection.focusNode;
    let offset = selection.focusOffset;

    // 첫 입력시 div가 없어서 div를 씌어주기 위한 판별
    const isDiv = e.target.innerHTML.includes("<div>");
    // span을 삽입할 node를 찾는다.
    const elementPosition = getPosition(node.parentElement, offset);

    const $empty = document.createElement("span");
    $empty.className = "empty";

    // 변환이 되면서 줄어든 문자열을 반영
    const text = transformText(node.data);

    if (text !== node.data) {
      offset = deleteText(node.data).length;
      if (offset === text.length) {
        offset = text.length;
      }
    } else {
      if (offset === node.data.length) {
        offset = node.data.length;
      }
    }

    if (!elementPosition.querySelector(".empty")) {
      elementPosition.appendChild($empty);
    }

    this.setState({
      ...this.state,
      content: isDiv ? e.target.innerHTML : `<div>${e.target.innerHTML}</div>`,
    });

    // 원래 있던 range를 모두 제거
    selection.removeAllRanges();
    const range = document.createRange();
    const temp = document.querySelector(".empty");
    range.setStart(temp.previousSibling, 0);
    range.setEnd(temp.previousSibling, offset);
    range.collapse(false);
    // 위치 표시해주는 span태그를 range에 더해준다.
    selection.addRange(range);

    // 위치를 찾기 위해 임시로 삽입한 span태그 제거
    temp.remove();
    onEditing(this.state);
  });

  const getPosition = (parentElement) => {
    let currentNode = parentElement;
    const indexStack = [];

    while (currentNode === $content) {
      indexStack.push(getIndex(currentNode));
      currentNode = currentNode.parentElement;
    }

    for (let i = 0; i < indexStack.length - 1; i++) {
      currentNode = currentNode.children[indexStack[i]];
    }

    return currentNode;
  };

  const getIndex = (element) => {
    let count = 0;

    while ((element = element.previousSibling) != null) {
      count += 1;
    }

    return count;
  };

  document.addEventListener("selectionchange", () => {
    const $editBox = $editor.querySelector(".edit-button-wrap");

    if (!document.getSelection().isCollapsed) {
      const { parentElement } = document.getSelection().focusNode;
      const rect = parentElement.getBoundingClientRect();

      const x = rect.left - 370;
      const y = rect.top - 90;

      $editBox.style.top = `${y}px`;
      $editBox.style.left = `${x}px`;
      $editBox.classList.remove("hide");
    } else {
      $editBox.classList.add("hide");
    }
  });
}
