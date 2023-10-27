import { request } from "../../utils/request.js";
import { push } from "../../utils/router.js";
import DocumentList from "./DocumentList.js";

export default function DocumentBox({ $target }) {
  const $documentBox = document.createElement("div");
  $documentBox.className = "document-box";
  $target.appendChild($documentBox);

  const documentList = new DocumentList({
    $target: $documentBox,
    initialState: { document: [], selectedDocument: new Set() },

    onCreate: async ({ parent, title }) => {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({ parent, title }),
      });
      this.setState();
    },

    onDelete: async ({ id }) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      push("/");
    },
  });

  this.setState = async () => {
    const documents = await request("/documents");
    documentList.setState({ document: documents });
  };
}
