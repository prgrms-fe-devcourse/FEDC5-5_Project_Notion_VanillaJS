import DocumentEditPage from "./components/DocumentEditPage/DocumentEditPage.js";
import SidebarContainer from "./components/Sidebar/SidebarContainer.js";
import { fetchDocuments } from "./utils/api.js";
import { FIRST_DOCUMENT_ID, DOCUMENTS_ROUTE, NEW, NEW_PARENT, OPENED_ITEMS } from "./utils/constants.js";
import { initRouter, push } from "./utils/router.js";
import { setItem, getItem, removeItem } from "./utils/storage.js";
import { setDocumentTitle } from "./utils/validation.js";

export default function App({ $target }) {
  let timer = null;

  const onAdd = async () => {
    push(`${DOCUMENTS_ROUTE}/${NEW}`);

    const createdDocument = await fetchDocuments("", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        parent: getItem(NEW_PARENT, null),
      }),
    });
    history.replaceState(null, null, `${DOCUMENTS_ROUTE}/${createdDocument.id}`);
    removeItem(NEW_PARENT);

    documentEditPage.setState({ documentId: createdDocument.id });
    sidebarContainer.setState({
      selectedId: parseInt(createdDocument.id),
    });
  };

  const onDelete = async (currentDocumentId, removedDocumentId) => {
    if (removedDocumentId === FIRST_DOCUMENT_ID) {
      alert("첫 페이지는 지우지 말아주세요 :D");
      return;
    }
    if (!confirm("페이지를 삭제하시겠습니까?")) return;

    await fetchDocuments(removedDocumentId, {
      method: "DELETE",
    });

    const openedItems = getItem(OPENED_ITEMS, []);
    setItem(
      OPENED_ITEMS,
      openedItems.filter((item) => item !== removedDocumentId)
    );

    if (currentDocumentId === removedDocumentId) {
      documentEditPage.setState({ documentId: FIRST_DOCUMENT_ID });
      push(`${DOCUMENTS_ROUTE}/${FIRST_DOCUMENT_ID}`);
    } else {
      documentEditPage.setState({ documentId: currentDocumentId });
    }

    sidebarContainer.render();
  };

  const onEdit = ({ id, title, content }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      const editedDocument = await fetchDocuments(id, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });

      documentEditPage.setState({
        documentId: editedDocument.id,
        document: editedDocument,
      });

      sidebarContainer.render();
    }, 800);
  };

  const sidebarContainer = new SidebarContainer({
    $target,
    initialState: {
      selectedId: null,
    },
    onAdd,
    onDelete,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
    onDelete,
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      setDocumentTitle("Notion");
      return;
    }
    if (pathname.indexOf(DOCUMENTS_ROUTE) !== 0) return;

    const [, , documentId] = pathname.split("/");
    documentEditPage.setState({
      documentId: isNaN(documentId) ? documentId : parseInt(documentId),
    });

    if (!isNaN(documentId)) {
      sidebarContainer.setState({
        selectedId: parseInt(documentId),
      });
    }
  };

  window.addEventListener("popstate", () => this.route());

  this.route();

  initRouter(() => this.route());
}
