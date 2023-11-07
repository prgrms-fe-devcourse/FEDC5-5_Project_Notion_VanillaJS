import DocumentList from "./DocumentList.js";
import DocumentEditSection from "./DocumentEditSection.js";
import { request } from "../utils/api.js";
import { initRouter, replace } from "../utils/route.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.documentId !== this.state.documentId) {
      this.state = nextState;
      const { documentId, selectedDocument } = this.state;

      documentEditSection.setState({
        documentId,
        document: selectedDocument,
      });
    } else {
      this.state = nextState;
      const { documentId, documents } = this.state;

      documentList.setState({
        documentId,
        documents,
      });
    }

    this.render();
  };

  const documentList = new DocumentList({
    $target,
    initialState: {
      selectedId: 0,
      documents: this.state.documents,
    },
    onDocumentRemove: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      replace('/');
      fetchDocments();
    },
  });

  const $editorSection = document.createElement("div");
  $editorSection.className = "editor-page";

  const documentEditSection = new DocumentEditSection({
    $target: $editorSection,
    initialState: {
      documentId: this.state.documentId,
      document: this.state.selectedDocument,
    },
    onChangeDocument: ({ document, documentId }) => {
      this.setState({
        ...this.state,
        selectedDocument: document,
        documentId: documentId,
      });
      fetchDocments();
    },
  });

  this.render = () => {
    $target.appendChild($editorSection);
  };

  this.route = () => {
    const { pathname } = window.location;
    $editorSection.innerHTML = "";

    if (pathname === "/") {
      $editorSection.innerHTML = "<h1>아직 문서를 선택하지 않았습니다.</h1>";
    } else if (pathname.indexOf("/document/") === 0) {
      const [, , documentId] = pathname.split("/");

      this.setState({
        ...this.state,
        documentId,
        document: {
          title: "",
          content: "",
        },
      });
    }
  };

  this.route();

  const fetchDocments = async () => {
    const documents = await request("/documents");

    this.setState({
      ...this.state,
      documents,
    });
  };

  fetchDocments();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
