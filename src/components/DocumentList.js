import { push } from "../utils/route.js";

export default function DocumentList({
  $target,
  initialState,
  onDocumentRemove,
}) {
  const $document = document.createElement("div");
  $document.setAttribute("class", "documents-container");

  $target.appendChild($document);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const documentPrint = (documents) => {
    let htmlString = "";
    documents.forEach((document) => {
      htmlString += `
        <div class="documents-item">
            <div class="document-item-title-wrap ${
              document.id === parseInt(this.state.documentId)
                ? "selected-document"
                : ""
            }" data-id="${document.id}">
                <button class="toggle">
                  <i class="fas fa-chevron-right" style="color: #797979;"></i>
                </button>
                <span class="document-item-title">${document.title}</span>
                <div class="action-buttons">
                  <button class="remove-document">
                    <i class="fas fa-trash-alt" style="color: #797979;"></i>
                  </button>
                  <button class="add-document">
                    <i class="fas fa-plus" style="color: #797979;"></i>
                  </button>
                </div>
                
            </div>
            <div class="documents-item fold">
                ${
                  document.documents && document.documents.length !== 0
                    ? documentPrint(document.documents)
                    : '<span class="end-document-item">하위 페이지 없음</span>'
                }
            </div>
        </div>
    `;
    });

    return htmlString;
  };

  this.render = () => {
    $document.innerHTML = `
      <div class="add-document-wrap">
        <button class="add-document">
          <i class="fas fa-plus-circle" style="color: #797979;"></i>
        </button>
        새 페이지
      </div>
      <div class="document-items"></div>
    `;

    if (this.state.length === 0) {
      return;
    }
    $document.querySelector(".document-items").innerHTML = `
        ${documentPrint(this.state.documents)}
    `;
  };

  this.render();

  $document.addEventListener("click", (e) => {
    const $documentItem = e.target.closest(".document-item-title-wrap");
    const id = $documentItem ? $documentItem.dataset.id : null;
    const $button = e.target.closest("button");

    if (e.target.className === "add-document-wrap") {
      push("/document/new");
      return;
    }

    if ($button) {
      const { className } = $button;

      switch (className) {
        case "add-document":
          push("/document/new", { parentId: id });
          break;
        case "toggle":
          const $hideItem = $documentItem.closest(".documents-item").children[1];
          if ($hideItem) {
            $hideItem.classList.toggle("fold");
            $hideItem.classList.toggle("show");
          }
          break;
        case "remove-document":
          onDocumentRemove(id);
          break;
        default:
          break;
      }

      return;
    }

    if ($documentItem) {
      const $title = $documentItem.querySelector(".document-item-title");
      if ($title) {
        this.setState({
          ...this.state,
          documentId: id,
        });
      }
      push(`/document/${id}`);
    }
  });
}
