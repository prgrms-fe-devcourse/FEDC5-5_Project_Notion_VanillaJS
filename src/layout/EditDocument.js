import { getItem, setItem } from "../utils/storage.js";

export default function EditDocument({
  $target,
  initialState,
  changeDocument,
}) {
  const $editContainer = document.createElement("div");
  $editContainer.className = "edit-container";
  $target.appendChild($editContainer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    render();
  };

  const render = () => {
    const { id, title, content } = this.state.selectedDocument;

    $editContainer.innerHTML = `
      <div class="editable" id="editable-title" contenteditable="true">
        <h1>${title || "제목 없음"}</h1>
      </div>
      <div class="editable" id="editable-content" contenteditable="true">
        <p>${content || "내용을 입력하세요."}</p>
      </div>
    `;
  };

  $editContainer.addEventListener("input", (e) => {
    const { id, title, content } = this.state.selectedDocument;

    const currentSavedData = getItem(this.state.selectedDocument.id, {
      title,
      content,
    });

    if (e.target.id === "editable-title") {
      setItem(id, { ...currentSavedData, title: e.target.innerText });
    } else if (e.target.id === "editable-content") {
      setItem(id, { ...currentSavedData, content: e.target.innerText });
    }

    changeDocument(id, getItem(id, currentSavedData));
  });

  render();
}
