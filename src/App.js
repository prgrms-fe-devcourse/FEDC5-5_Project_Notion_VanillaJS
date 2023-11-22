import EditPage from "./editor/EditPage.js";
import { initRouter } from "./utils/router.js";
import Sidebar from "./sidebar/Sidebar.js";
import { removeItem } from "./utils/storage.js";
import { CREATED_DOCUMENTS_PARENT_ID_KEY } from "./utils/key.js";

export default function App({ $target }) {
  // Sidebar - 문서 리스트 생성
  const sidebar = new Sidebar({
    $target,
  });

  // EditPage - 문서 에디터 생성
  const editPage = new EditPage({
    $target,
    initialState: {
      documentId: "new",
      post: {
        title: "",
        content: "",
      },
    },
    onCreateDocument: () => {
      sidebar.setState();
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      removeItem(CREATED_DOCUMENTS_PARENT_ID_KEY);
    }
    if (pathname.indexOf("/documents/") === 0) {
      const regex = /\/(\d+)$/;
      const id = pathname.match(regex) ? match[1] : null;
      editPage.setState({ id });
    }
  };

  this.route();

  initRouter(() => this.route());
}
