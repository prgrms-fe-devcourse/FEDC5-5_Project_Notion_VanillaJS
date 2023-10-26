import Sidebar from "./components/Sidebar/Sidebar.js";
import DocumentEditorpage from "./components/DocumentEditorPage/DocumentEditorPage.js";
import { initRouter, push } from "./utils/router.js";
import { DEFAULT_DOCUMENT_ID } from "./utils/constants.js";
import { fetchDelete, fetchGet, fetchPost, fetchPut } from "./utils/api.js";
import { setItem, removeItem } from "./utils/storage.js";
import {
  validateConstructorUsage,
  validationfetchData,
} from "./utils/validation.js";
import { API_URL } from "./utils/constants.js";
import { toggleDocument } from "./utils/helper.js";

export default function App({ $target }) {
  validateConstructorUsage(new.target);

  const fetchData = async () => {
    const documents = await fetchGet(API_URL.DEFAULT);
    validationfetchData(documents);
    const isOpen = toggleDocument(documents);
    sidebar.setState({ documents, isOpen });
  };

  let timer = null;

  const onDelete = async (id) => {
    if (+id === +DEFAULT_DOCUMENT_ID) {
      alert("❌기본 문서는 삭제할 수 없습니다❌");
      return;
    } else {
      push("/");
      await fetchDelete(`/documents/${id}`);
      await fetchData();
    }
  };

  const onAdd = async (id) => {
    push("/documents/new");

    const createdPost = await fetchPost("/documents", {
      title: "Untitled",
      parent: id,
    });

    history.replaceState(null, null, `/documents/${createdPost.id}`);
    documentEditorPage.setState({
      documentId: createdPost.id,
    });
    await fetchData();
  };

  const onEdit = ({ id, title, content }) => {
    let postLocalSaveKey = `temp-post-${id}`;
    const post = {
      title,
      content,
    };
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      setItem(postLocalSaveKey, {
        ...post,
        tempSaveDate: new Date(),
      });

      await fetchPut(`/documents/${id}`, post);
      removeItem(postLocalSaveKey);

      await fetchData();
    }, 1000);
  };

  const sidebar = new Sidebar({
    $target,
    onDelete,
    onAdd,
  });

  const documentEditorPage = new DocumentEditorpage({
    $target,
    initialState: {
      documentId: null,
      document: {
        title: "",
        content: "",
      },
    },
    onEdit,
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      documentEditorPage.setState({ documentId: DEFAULT_DOCUMENT_ID });
    } else if (pathname.indexOf("/documents") === 0) {
      const [, , documentId] = pathname.split("/");
      if (!documentId) {
        documentEditorPage.setState({
          documentId: "new",
        });
      } else {
        documentEditorPage.setState({ documentId });
      }
    }
  };

  window.addEventListener("popstate", () => this.route());

  const init = async () => {
    await fetchData();
    this.route();
    initRouter(() => this.route());
  };

  init();
}
