import DocumentList from "./DocumentList.js";
import { fetchDocuments } from "../../utils/api.js";
import DocumentAddButton from "./DocumentAddButton.js";
import SidebarHeader from "./SidebarHeader.js";

export default function SidebarContainer({ $target, initialState, onAdd, onDelete }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "sidebar";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  $target.appendChild($sidebar);

  new SidebarHeader({
    $target: $sidebar,
    initialState: {
      workspaceName: "📘 백준원의 Notion",
    },
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      selectedId: this.state.selectedId,
    },
    onAdd,
    onDelete,
  });

  const documentAddButton = new DocumentAddButton({
    // 사이드바 가장 아래 페이지 추가 버튼
    $target: $sidebar,
    initialState: {
      position: "sidebar-bottom",
      text: "새 페이지",
    },
    onAdd,
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState({
      documents,
      selectedId: this.state.selectedId,
    });
    documentAddButton.render();
  };

  this.render();
}
