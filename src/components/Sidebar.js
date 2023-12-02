import { documentsApi } from "../utils/index.js";
import { DocumentListHeader, DocumentList, SidebarHeader } from "./sidebarComponents/index.js";

export default function Sidebar({ $target, initialState, onAdd, onDelete }) {
  const $sidebar = document.createElement("aside");
  $sidebar.className = "sidebar";
  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new SidebarHeader({
    $target: $sidebar,
    username: "Judi",
  });

  new DocumentListHeader({
    $target: $sidebar,
    onAdd,
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      selectedDocumentId: this.state.selectedDocumentId,
    },
    onAdd,
    onDelete,
  });

  this.render = async () => {
    const documents = await documentsApi().getDocuments();

    documentList.setState({
      documents,
      selectedDocumentId: this.state.selectedDocumentId,
    });
  };

  this.render();
}
