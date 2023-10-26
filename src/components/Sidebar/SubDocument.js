import DocumentList from "./DocumentList.js";
import { validateConstructorUsage } from "../../utils/validation.js";
import { CLASS_NAME } from "../../utils/constants.js";
import { isEqual } from "../../utils/helper.js";
import { renderDocument, noPageMessage } from "./renderHTML.js";

export default function SubDocument({
  $target,
  initialState,
  onDelete,
  onAdd,
}) {
  validateConstructorUsage(new.target);

  const $subdocument = document.createElement("li");
  $subdocument.className = CLASS_NAME.SUB_DOCUMENT;

  $target.appendChild($subdocument);

  this.state = initialState;

  this.setState = (nextState) => {
    if (isEqual(this.state, nextState)) return;

    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.renderDocumentContent = (documents, open) => {
    // 토글버튼을 누를 경우 하위 문서 보여줌
    const $documentContent = document.createElement("span");
    $documentContent.className = CLASS_NAME.DOCUMENT_CONTENT;
    $documentContent.style.display = `${open ? "block" : "none"}`;

    // 하위 목록이 있는 경우
    if (Array.isArray(documents) && documents.length > 0) {
      new DocumentList({
        $target: $documentContent,
        initialState: {
          documents,
          isOpen: this.state.isOpen,
          selectedId: this.state.selectedId,
        },
        onAdd,
        onDelete,
      }).setState({
        documents,
      });
    } else {
      $documentContent.appendChild(noPageMessage());
    }

    $subdocument.appendChild($documentContent);
  };

  this.render = () => {
    if (this.state.document && this.state.isOpen) {
      const { id, title, documents } = this.state.document;
      const { isOpen } = this.state;
      const open = isOpen[+id];

      $subdocument.innerHTML = renderDocument(id, title, open);

      this.renderDocumentContent(documents, open);
    }
  };
}
