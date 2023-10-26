import SubDocument from "./SubDocument.js";
import { push } from "../../utils/router.js";
import { validateConstructorUsage } from "../../utils/validation.js";
import { isEqual } from "../../utils/helper.js";
import { CLASS_NAME } from "../../utils/constants.js";

export default function DocumentList({
  $target,
  initialState,
  onDelete,
  onAdd,
}) {
  validateConstructorUsage(new.target);

  const $documentlist = document.createElement("ul");
  $documentlist.className = CLASS_NAME.DOCUMENT_LIST;

  $target.appendChild($documentlist);

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqual(this.state, nextState)) return;

    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $documentlist.innerHTML = "";

    if (!this.state || !Array.isArray(this.state.documents)) return;

    this.state.documents.forEach((document) => {
      new SubDocument({
        $target: $documentlist,
        initialState: {
          document: document,
          isOpen: this.state.isOpen,
        },
        onDelete,
        onAdd,
      }).setState({ document });
    });
  };

  // 토글 버튼 클릭할 경우 isOpen 값 변경
  this.onToggle = (id) => {
    if (this.state.isOpen) {
      const newIsOpen = { ...this.state.isOpen };
      newIsOpen[id] = !newIsOpen[id];
      this.setState({ isOpen: newIsOpen });
    }
  };

  $documentlist.addEventListener("click", (e) => {
    const { target } = e;
    const $documentmain = target.closest(".main-document");

    if ($documentmain) {
      const id = $documentmain.dataset.id;
      const toggleButton = target.closest(".document-toggleButton");
      const title = target.closest(".document-title");
      const deleteButton = target.closest(".document-deleteButton");
      const addButton = target.closest(".document-addButton");
      e.stopPropagation();

      if (toggleButton) {
        this.onToggle(id);
      } else if (title) {
        push(`/documents/${id}`);
      } else if (deleteButton) {
        onDelete(id);
      } else if (addButton) {
        onAdd(id);
      }
    }
  });
}
