import { push } from "../utils/router.js";

export default function DocumentsList({
  $target,
  initialState,
  onAddDocument,
  onDelete,
}) {
  const $documentsList = document.createElement("div");
  $target.appendChild($documentsList);

  this.state = initialState.map((docu) => {
    return { ...docu, isToggle: false };
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentsList.innerHTML = `${this.state
      .map((document) => DocumentTreeRender(document))
      .join("")}`;
  };

  // 하위 Document가 있는지를 확인하기 위한 함수
  const checkChildDocument = (documents) =>
    Array.isArray(documents) && documents.length > 0;

  // Document List를 그리는 함수
  const DocumentTreeRender = (document, tap_nbsp = "") => {
    const isToggle = document.isToggle || false;
    const { id, title, documents } = document;
    tap_nbsp = !tap_nbsp ? `&nbsp;` : `${tap_nbsp}` + `&nbsp;&nbsp;`; // 하위 Document인 경우 들여쓰기 표현을 하기 위해

    return `
      <div data-id='${id}' data-title='${title}' class="document">
        ${tap_nbsp}
        <img class="toggleButton" src=${
          isToggle ? "../public/toggle_down.svg" : "../public/toggle_right.svg"
        } />
        <span data-id='${id}' class='document_title'>${title}</span>
        <img class="addButton" src="../public/add_docu.svg" />
        <img class="deleteButton" src="../public/delete_docu.svg" />
      </div>

      ${
        isToggle
          ? documents
              .map((document) => DocumentTreeRender(document, tap_nbsp))
              .join("")
          : ""
      }
      ${
        isToggle && !checkChildDocument(documents)
          ? `<span class='leaf_document'>${tap_nbsp}하위 페이지 없음</span>`
          : ""
      }
      `;
  };

  // 기존 state에 toggle의 상태를 추가하여 업데이트 된 state 반환
  const toggleUpdate = (stateDocuments, documentId) => {
    return stateDocuments.map((document) => {
      if (document.id === documentId) {
        return { ...document, isToggle: !document.isToggle }; // !undefined = true
      } else if (checkChildDocument(document.documents) !== 0) {
        // 하위에 있는 Document에 접근하기 위함
        return {
          ...document,
          documents: toggleUpdate(document.documents, documentId),
        };
      }
      return document;
    });
  };

  // 클릭 이벤트
  $documentsList.addEventListener("click", (e) => {
    const $document = e.target.closest(".document");
    const [, , path_id] = window.location.pathname.split("/");

    if ($document) {
      const { className } = e.target;
      const { id, title } = $document.dataset;

      // 토글 기능
      if (className === "toggleButton") {
        const toggleUpdateState = toggleUpdate(this.state, +id);
        this.setState(toggleUpdateState);
      }
      // history API를 사용하여 url에 선택된 Document ID를 적어준다.
      if (className === "document_title") {
        push(`/documents/${id}`);
        // const toggleUpdateState = toggleUpdate(this.state, +id);
        // this.setState(toggleUpdateState);
      }
      if (className === "addButton") {
        onAddDocument(id);
        // const toggleUpdateState = toggleUpdate(this.state, +path_id);
        // this.setState(toggleUpdateState);
      }
      if (className === "deleteButton") {
        onDelete(id, title);
      }
    }
  });

  this.render();
}
