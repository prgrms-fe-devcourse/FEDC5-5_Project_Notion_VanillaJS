import api from "./api/api.js";
import {
  DELETE_API_DOCUMENT,
  GET_API_DOCUMENT_DETAIL,
  GET_API_DOCUMENT_TREE,
  POST_API_DOCUMENT,
} from "./api/url.js";
import DocumentTree from "./components/DocumentTree.js";
import Editor from "./components/Editor.js";
import { getItem, setItem } from "./utils/storage.js";
import recursion from "./utils/recursion.js";
import Modal from "./components/Modal.js";
import Loading from "./components/Loading.js";

export default function App({ $target }) {
  const $container = document.createElement("div");
  $container.id = "container";
  $target.appendChild($container);

  const loading = new Loading({ $container });
  const modal = new Modal({ $container });

  const documentTree = new DocumentTree({
    $container,
    onCreate: async (body) => {
      if (!body.title) {
        modal.setState({
          isShow: true,
          message: "문서 제목은 한 글자 이상 입력해주세요.",
          className: "warning",
        });
        return;
      }

      const { id } = await api.post(POST_API_DOCUMENT, body);
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
      history.pushState(null, null, `/document/${id}`);

      const documentTreeData = getItem("documentTree", []);
      recursion.createDocument(documentTreeData, data, body.parent);
      documentTree.setState(documentTreeData);
      setItem("documentTree", documentTreeData);

      modal.setState({
        isShow: true,
        message: "저장되었습니다.",
        className: "success",
      });
    },
    onClick: async (id) => {
      loading.setState({ isLoading: true });
      history.pushState(null, null, `/document/${id}`);
      const data = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(data);
      loading.setState({ isLoading: false });
    },
    onDelete: async (id) => {
      await api.delete(DELETE_API_DOCUMENT(id));
      history.pushState(null, null, "/");
      editor.init();

      const documentTreeData = getItem("documentTree", []);
      const children = recursion.deleteDocument(documentTreeData, id);
      const newDocumentTree = documentTreeData.concat(children);
      newDocumentTree.sort((a, b) => a.id - b.id);
      documentTree.setState(newDocumentTree);
      setItem("documentTree", newDocumentTree);

      modal.setState({
        isShow: true,
        message: "삭제되었습니다.",
        className: "success",
      });
    },
  });

  const editor = new Editor({
    $container,
    onSuccess: (id, title, prevTitle) => {
      if (title !== prevTitle) {
        const documentTreeData = getItem("documentTree", []);
        recursion.editDocument(documentTreeData, id, title);
        documentTree.setState(documentTreeData);
        setItem("documentTree", documentTreeData);
      }

      modal.setState({
        isShow: true,
        message: "저장되었습니다.",
        className: "success",
      });
    },
    onAlert: () => {
      modal.setState({
        isShow: true,
        message: "문서 제목이 비었습니다.",
        className: "warning",
      });
    },
  });

  (async () => {
    loading.setState({ isLoading: true });

    const treeData = await api.get(GET_API_DOCUMENT_TREE);
    documentTree.setState(treeData);
    setItem("documentTree", treeData);

    const { pathname } = window.location;
    if (pathname.includes("/document/")) {
      const id = pathname.split("/document/").pop();
      const detailData = await api.get(GET_API_DOCUMENT_DETAIL(id));
      editor.setState(detailData);
    }

    loading.setState({ isLoading: false });
  })();
}
