import DocumentList from "../components/DocumentList/DocumentList.js";
import DocumentListTitle from "../components/DocumentList/DocumentListTitle.js";

import { fetchDeleteDocument, fetchAddDocument } from "../utils/fetch.js";

export default function DocumentListPage({ $target }) {
  const $documentListPage = document.createElement("div");
  $documentListPage.className = "document-list-page";
  $target.appendChild($documentListPage);

  new DocumentListTitle({
    $target: $documentListPage,
  });

  const documentList = new DocumentList({
    $target: $documentListPage,
    initialState: {
      documents: [],
      selectedId: null,
    },
    handleDeleteDocument: async (selectedId) => await fetchDeleteDocument(selectedId),
    handleAddDocument: async (selectedId) => await fetchAddDocument(selectedId),
  });

  this.setState = (nextState) => {
    documentList.setState(nextState);
  };
}
