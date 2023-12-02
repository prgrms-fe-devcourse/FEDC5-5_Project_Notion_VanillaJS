import RootDocumentAddButton from "./RootDocumentAddButton.js";

export default function DocumentListHeader({ $target, onAdd }) {
  const $documentListHeader = document.createElement("header");
  $documentListHeader.className = "document-list-header";
  $target.appendChild($documentListHeader);

  this.render = () => {
    $documentListHeader.innerHTML = `
  <span class="header-subtitle">개인 페이지</span>
  `;
  };

  this.render();

  new RootDocumentAddButton({
    $target: $documentListHeader,
    initialState: {
      documentId: "new",
    },
    onAdd,
  });
}
