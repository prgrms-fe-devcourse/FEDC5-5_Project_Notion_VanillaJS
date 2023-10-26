import { DOCUMENTS_ROUTE, NEW_PARENT, ADD, DELETE, OPENED_ITEMS } from "../../utils/constants.js";
import { push } from "../../utils/router.js";
import { getItem, setItem } from "../../utils/storage.js";
import { generateTextIndent, generateTitle } from "../../utils/validation.js";
import DocumentAddButton from "./DocumentAddButton.js";

const DOCUMENT_ITEM = "document-item";
const BLOCK = "block";
const NONE = "none";

export default function DocumentList({ $target, initialState, onAdd, onDelete }) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  let isBlock = false;

  const renderButton = (id) => {
    const openedItems = getItem(OPENED_ITEMS, []);
    isBlock = openedItems.includes(id);
    return `
      <button class="toggle ${isBlock ? "open" : ""}" type="button">
        <i class="toggle ${isBlock ? "open" : ""} fa-solid fa-angle-${isBlock ? "down" : "right"}"></i>
      </button>
    `;
  };

  const renderDocuments = (nextDocuments, depth) => `
    ${nextDocuments
      .map(
        ({ id, title, documents }) => `
        <ul>
          <li 
            data-id="${id}" 
            class="${DOCUMENT_ITEM} ${id === this.state.selectedId ? "selected" : ""}"  
            style="padding-left: ${generateTextIndent(depth)}px">
            ${renderButton(id)}
            <p class="${DOCUMENT_ITEM}">${generateTitle(title)}</p>
            <div class="buttons">
              <button title="삭제" class="${DELETE}" type="button">
                <i title="삭제" class="fa-regular fa-trash-can ${DELETE}"></i>
              </button>
              <button title="하위 페이지 추가" class="${ADD}" type="button">
                <i title="하위 페이지 추가" class="fa-solid fa-plus ${ADD}"></i>
              </button>
            </div>
          </li>
          ${
            isBlock && documents.length
              ? renderDocuments(documents, depth + 2)
              : `<li 
                  class="no-subpages" 
                  style="padding-left: ${generateTextIndent(depth + 2)}px; display: ${isBlock ? BLOCK : NONE};">
                  하위 페이지 없음
                </li>`
          }
          </ul>
        `
      )
      .join("")}
  `;

  const documentAddButton = new DocumentAddButton({
    $target: $documentList,
    initialState: {
      position: "document-list-bottom",
      text: "페이지 추가",
    },
    onAdd,
  });

  this.render = () => {
    const { documents } = this.state;

    $documentList.innerHTML = `
      ${documents.length > 0 ? renderDocuments(documents, 1) : ""}
    `;

    documentAddButton.render();
  };

  $documentList.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");
    if (!$li) return;

    let { id } = $li.dataset;
    id = parseInt(id);

    if (target.classList.contains(DOCUMENT_ITEM)) {
      push(`${DOCUMENTS_ROUTE}/${id}`);
      this.render();
    } else if (target.classList.contains(ADD)) {
      setItem(NEW_PARENT, id);
      onAdd(id);
      toggleOpen(target, id);
    } else if (target.classList.contains(DELETE)) {
      onDelete(this.state.selectedId, id);
    }

    if (target.classList.contains("toggle")) {
      toggleOpen(target, id);
    }
  });

  const toggleOpen = (target, id) => {
    const openedItems = getItem(OPENED_ITEMS, []);

    if (target.classList.contains("open")) {
      const index = openedItems.indexOf(id);
      setItem(OPENED_ITEMS, [...openedItems.slice(0, index), ...openedItems.slice(index + 1)]);
      target.classList.toggle("open");
    } else {
      if (openedItems.indexOf(id) > -1) return; // 동일 id 중복 저장 에러
      setItem(OPENED_ITEMS, [...openedItems, id]);
      target.classList.toggle("open");
    }
    this.render();
  };

  const toggleBlock = (e) => {
    const $li = e.target.closest("li");
    if (!$li) return;

    for (const node of $li.children) {
      if (node.classList.contains("buttons") || node.classList.contains(DOCUMENT_ITEM)) {
        node.classList.toggle(BLOCK);
      }
    }
  };

  $documentList.addEventListener("mouseover", toggleBlock);
  $documentList.addEventListener("mouseout", toggleBlock);

  this.render();
}
