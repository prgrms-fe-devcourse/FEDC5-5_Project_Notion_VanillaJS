import ContentInnerModal from "./ContentInnerModal.js";

export default function CommandList({ $parent, $target, onClose }) {
  const $commandList = document.createElement("div");
  $commandList.className = "command-list";

  $target.appendChild($commandList);

  $commandList.innerHTML = `
    <p class="modal-title">기본 블록</p>
    <ul class="modal-list">
        <li id="item" class="command">
        <p class="command">페이지 링크</p>
        <small class="command">기존 페이지를 링크하세요.</small>
        </li>
    </ul>
    `;

  $commandList.addEventListener("click", ({ target }) => {
    if (target.className === "command") {
      const $searchDocumentLink = document.createElement("input");
      $searchDocumentLink.className = "search-document-link";
      $searchDocumentLink.style.display = "block";
      $searchDocumentLink.placeholder = "문서 제목을 입력하세요.";
      $target.parentNode.appendChild($searchDocumentLink);

      onClose();

      $searchDocumentLink.focus();

      const selectionStart = window.getSelection().anchorOffset;
      new ContentInnerModal({ $target: $parent, selectionStart, option: "link" });
    }

    event.stopPropagation();
  });

  return $commandList;
}
