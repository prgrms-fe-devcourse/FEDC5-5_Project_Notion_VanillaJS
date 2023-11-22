import {
  deleteDocument,
  getDocument,
  insertDocument,
  request,
  updateDocument,
} from "../utils/api.js";
import { CREATED_DOCUMENTS_PARENT_ID_KEY } from "../utils/key.js";
import { push } from "../utils/router.js";
import { getItem, setItem } from "../utils/storage.js";
import {
  ToggleElements,
  LiElements,
  AddElements,
  removeElements,
  NoPageElements,
} from "./components/elements.js";

export default function Documents({ $target, initialState, onDeleteDocument }) {
  const $documents = document.createElement("div");
  $target.appendChild($documents);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const paint = ({ id, title, documents }, depth) => {
    const isWrap = getItem(`isWrap-${id}`, true);
    return `      
      <div class='documents'>
        <div class='document' data-id='${id}'>
          ${ToggleElements({ id, isWrap }, depth)}
          ${LiElements({ id, title })}
          ${AddElements({ id })}
          ${removeElements({ id })}
        </div>  
        <ul style="display: ${isWrap ? "none" : "block"};">
          ${
            documents.length
              ? documents.map((document) => paint(document, depth + 1)).join("")
              : NoPageElements({ depth })
          }
        </ul>
      </div>
    `;
  };

  this.render = () => {
    if (this.state.length > 0) {
      $documents.innerHTML = `
       <div class='top'>
         ${this.state.map((document) => paint(document, 0)).join("")}
       </div>
      `;
    } else {
      $documents.innerHTML = `
        <h4>페이지를 추가해 주세요</h4>
      `;
    }
  };

  this.render();

  $documents.addEventListener("click", async (e) => {
    const { target } = e;

    // remove
    if (target.classList.contains("remove")) {
      const onRemove = confirm("정말 삭제하시겠습니까?");
      if (!onRemove) return;

      const $i = target.closest("i");
      const { id } = $i.dataset;
      const res = await getDocument(id);

      // 자식 요소가 있는 문서일 경우
      if (res.documents.length > 0) {
        const $ul = $i.closest("ul");
        if ($ul.className === "top") {
          deleteDocument(id);
          onDeleteDocument();
          push(`/`);
          return;
        }

        const $div = $ul.previousElementSibling;
        const divId = $div.dataset.id;

        for (const key in res.documents) {
          const obj = res.documents[key];
          const { title, content } = await getDocument(obj.id);
          const newChild = await insertDocument({ title, parent: divId });
          updateDocument({ id: newChild.id, title, content });
          deleteDocument(obj.id);
        }
      }
      deleteDocument(id);
      onDeleteDocument();
      // 이거 말고 sidebar를 리렌더하자
      push(`/`);
    }

    // title
    if (target.classList.contains("title")) {
      const $li = target.closest("li");
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }

    // toggle
    if (target.classList.contains("toggle")) {
      const $i = target.closest("i");
      const { id } = $i.dataset;
      const bool = getItem(`isWrap-${id}`, true);
      setItem(`isWrap-${id}`, !bool);
      this.render();
    }

    // add
    if (target.classList.contains("add")) {
      const $i = target.closest("i");
      const { id } = $i.dataset;
      setItem(CREATED_DOCUMENTS_PARENT_ID_KEY, id);
      push(`/documents/new`);
    }
  });
}
