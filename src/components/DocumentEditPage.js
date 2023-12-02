import { documentsApi } from "../utils/index.js";
import { Editor, DocumentHeader, SubDocumentList } from "./documentComponents/index.js";

export default function DocumentEditPage({ $target, initialState, onEdit, onDelete }) {
  const $documentEditPage = document.createElement("section");
  $documentEditPage.className = "document-edit-page";
  const $documentEditPageBody = document.createElement("section");
  $documentEditPageBody.className = "document-edit-page-body";

  this.state = initialState;

  const fetchDocument = async () => {
    try {
      const { documentId } = this.state;

      const { getDocument } = documentsApi();
      const { id, title, content, documents } = await getDocument(documentId);

      documentHeader.setState({
        ...documentHeader.state,
        id,
        title,
      });

      editor.setState({
        ...editor.state,
        title,
        content,
      });

      subDocumentList.setState({
        ...subDocumentList.state,
        documents,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const documentHeader = new DocumentHeader({
    $target: $documentEditPage,
    initialState: {
      id: 1,
      title: "",
    },
    onDelete,
  });

  const editor = new Editor({
    $target: $documentEditPageBody,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  });

  const subDocumentList = new SubDocumentList({
    $target: $documentEditPageBody,
    initialState: {
      documents: [],
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.documentId === "new") {
      editor.setState({
        title: "",
        content: "",
      });
    } else {
      fetchDocument();
    }

    this.render();
  };

  this.render = () => {
    if (!$target.querySelector("#document-edit-page")) {
      $target.appendChild($documentEditPage);
      $documentEditPage.appendChild($documentEditPageBody);
    }
  };
}
