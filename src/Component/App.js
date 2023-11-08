import DocumentEditComponent from "./DocumentEditComponent.js";
import DocumentListComponent from "./DocumentListComponent.js";
import { initRouter } from "../router.js";

export default function App({ $target }) {
  const $documentListDiv = document.createElement("div");
  $documentListDiv.className = "documentListDiv";
  const $documentEditDiv = document.createElement("div");
  $documentEditDiv.className = "documentEditDiv";

  $target.appendChild($documentListDiv);
  $target.appendChild($documentEditDiv);

  this.state = {
    selectedDocument: null,
  };
  //문서 리스트
  const documentListComponent = new DocumentListComponent({
    $target: $documentListDiv,
    initialState: { toggleData: [] },
  });

  const documentEditComponent = new DocumentEditComponent({
    $target: $documentEditDiv,
    initialState: {
      id: "",
      document: {},
      documentsList: [],
    },
    onRefresh: () => {
      documentListComponent.setState();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.route = () => {
    const { pathname } = window.location;
    documentListComponent.setState();
    if (pathname === "/") {
      $documentEditDiv.style.display = "none";
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documnetId] = pathname.split("/");
      this.setState({ selectedDocument: documnetId });
      $documentEditDiv.style.display =
        this.state.selectedDocument !== null ? "block" : "none";
      documentEditComponent.setState({ id: documnetId });
    }
  };

  this.route();

  initRouter(() => this.route());
  window.addEventListener("popstate", () => {
    this.route();
  });
}
