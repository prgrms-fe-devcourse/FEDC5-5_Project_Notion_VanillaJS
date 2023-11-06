import DocsIndexCard from "./DocsIndexCard.js";
import NewDocsCard from "./NewDocsCard.js";

import { _GET } from "../../api/api.js";
import { NEW_DOCUMENT_INIT_ID } from "../../utils/constants.js";
import { push } from "../../router.js";
import { useDocsIndex } from "../../utils/store.js";

const DocsIndexViewerProps = {
  data: [
    {
      id: "Number",
      title: "string",
      documents: [
        {
          id: "number",
          title: "string",
          documents: [],
        },
      ],
    },
  ],
};

/**
 * @description 사이드바의 DOCS 목차 뷰
 */
export default function DocsIndexViewer({ $parent }) {
  const $component = document.createElement("div");
  $component.setAttribute("id", "docs-index-viewer");

  // Documents 계층적 구조를 재귀적으로 생성 //
  const createIndex = (data) => {
    const $ul = document.createElement("ul");

    if (!data) return $ul;

    for (const doc of data) {
      const $li = document.createElement("li");
      $li.dataset.id = doc.id;
      const docCard = new DocsIndexCard({
        $parent: $li,
        initState: { id: doc.id, title: doc.title, documents: doc.documents },
      });

      if (doc.documents.length > 0) {
        $li.appendChild(createIndex(doc.documents));
      }

      $ul.appendChild($li);
    }
    return $ul;
  };

  // RENDER ============================================================ //
  this.render = () => {
    $component.innerHTML = "";

    $component.appendChild(createIndex(useDocsIndex.state.data));
    new NewDocsCard({
      $parent: $component,
    });
    $parent.appendChild($component);
  };
  this.render();
  // ============================================================ RENDER //

  // EVENT LISTENER ==================================================== //
  $component.addEventListener("click", (event) => {
    const $li = event.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;
      // 윈도우에 사용자가 정의한 이벤트를 dispatch

      push(
        `/documents/${
          parseInt(id) === NEW_DOCUMENT_INIT_ID ? NEW_DOCUMENT_INIT_ID : id
        }`
      );
    }
  });
  // ==================================================== EVENT LISTENER //
}
