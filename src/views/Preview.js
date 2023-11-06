import { useDocument } from "../utils/store.js";
import { parseContent } from "../utils/editorHelper.js";
import { parseDate } from "../utils/parseDate.js";
import { push } from "../router.js";

const PreViewProps = {
  documentId: "number",
};

/**
 * @description 마크다운 미리보기 뷰
 */
export default function PreView({ $parent, initState }) {
  const $component = document.createElement("section");
  $component.setAttribute("id", "pre-view");
  $component.classList.add("view");

  this.state = initState;
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };

    if (!this.state) {
      return;
    }

    this.render();
  };

  const headerRender = (title, date) => {
    const dateTime = parseDate(new Date(date).getTime());

    return `
      <h1>
        ${useDocument.state.title}
      </h1>
      <div class="preview-info">
        <p class="preview-date" style="display: inline; padding-right: 2rem">작성 일자</p> 
        <p class="preview-date" style="display: inline;">${dateTime ?? ""}</p>
      </div>
      `;
  };

  const contentRender = (content) => {
    return parseContent(content);
  };

  const footerRender = (documents) => {
    if (documents.length < 1) return "";

    return `
      <div class="preview-footer">
        <h3>하위 문서 보기</h3>
        ${documents
          .map(
            (doc) =>
              `<a class="child-doc" data-id="${doc.id}">• ${doc.title}</a>`
          )
          .join("")}
      </div>
    `;
  };

  this.render = () => {
    const { id, title, content, createdAt, documents } = useDocument.state;
    // subscriber 최초 등록시 발생하는 랜더링 블로킹
    if (!this.state || !id) return;

    $component.innerHTML =
      headerRender(title, createdAt) +
      contentRender(content) +
      footerRender(documents);

    $parent.appendChild($component);

    if (documents.length > 0) {
      const $a = document.querySelectorAll(".child-doc");

      $a.forEach((e) => {
        const { id } = e.dataset;
        e.addEventListener("click", () => push(`/documents/${id}`));
      });
    }
  };
}
