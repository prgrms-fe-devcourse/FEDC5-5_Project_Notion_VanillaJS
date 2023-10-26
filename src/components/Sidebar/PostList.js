import { $ } from "../../utils/DOM/selector";
import { documentListTemplate } from "../../utils/DOM/DocumentTemplate";

export default function DocumentList({
  $target,
  initialState,
  onToggle,
  onSelect,
  onAddNewDocument,
  onRemove,
}) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  /** 깊이 우선 탐색으로 트리 구조인 문서 리스트 그리기 */
  const renderDocumentsList = ($target, currentDoucments, isRoot) => {
    // root document 그리기
    $target.insertAdjacentHTML(
      "beforeend",
      documentListTemplate(currentDoucments, isRoot),
    );

    // sub documents 그리기
    currentDoucments.map(({ id, documents }) => {
      isRoot = false;
      if (documents.length === 0) return;
      let $parent = $(`[data-id='${id}']`);
      renderDocumentsList($parent, documents, isRoot);
    });
  };

  this.render = () => {
    $target.innerHTML = ``;
    renderDocumentsList($target, this.state, true);
  };

  /** 이벤트 위임 */
  $target.addEventListener("click", ({ target }) => {
    const $div = target.closest(".document-title");

    if (!$div) return;

    const { id } = $div.dataset;
    const { className } = target;

    if (className.includes("add-sub-btn")) {
      onAddNewDocument(id);
    } else if (className.includes("remove-btn")) {
      if (confirm("문서를 삭제할까요?")) onRemove($div, id);
    } else if (className.includes("toggle-btn")) {
      onToggle(id);
    } else {
      onSelect(id);
    }
  });

  this.render();
}
