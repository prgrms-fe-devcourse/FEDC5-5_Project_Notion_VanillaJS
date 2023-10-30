import Sidebar from "../layout/Sidebar.js";
import EditDocument from "../layout/EditDocument.js";
import {
  getAllDocumentLists,
  getDocumentContent,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../api/document.js";
import { initRouter, navigate } from "../utils/router.js";

export default function App({ $target }) {
  this.state = {
    documents: [], // sidebar 문서 목록
    selectedDocument: {
      id: null,
      title: "",
      createdAt: "",
      updatedAt: "",
    }, // editor에 보여줄 특정 문서
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const route = async () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      // 루트 경로일 경우 홈 페이지 로딩
      this.setState({
        ...this.state,
        selectedDocument: {
          id: 0,
          title: "홈 페이지",
          createdAt: "",
          updatedAt: "",
        },
      });
      editDocument.setState(this.state);
    } else if (pathname.startsWith("/documents/")) {
      const documentId = pathname.split("/")[2];
      await fetchDocument(documentId);
    }
  };

  const init = async () => {
    // 초기 라우팅을 수행
    route();
    // 브라우저 내비게이션 이벤트 등록
    initRouter(route);

    // 초기 문서 목록 가져오기
    await fetchDocumentLists();
  };

  /** 문서 목록 가져오기: state 변경, 사이드바 리렌더링 */
  const fetchDocumentLists = async () => {
    const documents = await getAllDocumentLists();
    this.setState({
      ...this.state,
      documents,
    });
    sidebar.setState(this.state.documents);
  };

  /** 선택된 문서 가져오기 */
  const fetchDocument = async (documentId) => {
    const selectedDocument = await getDocumentContent(documentId);
    this.setState({
      ...this.state,
      selectedDocument,
    });
    editDocument.setState(this.state);
  };

  /** 새로운 문서 생성하기 */
  const addNewDocument = async (parentId) => {
    // 새 문서 생성
    const newDocument = await createDocument({
      title: "제목 없음",
      parent: parentId,
    });

    if (parentId !== null) {
      await updateParentDocument(parentId, newDocument);
    } else {
      await fetchDocumentLists();
    }

    this.setState({ ...this.state, selectedDocument: newDocument });
    editDocument.setState(this.state);

    // 새 문서의 URL로 이동
    navigate(`/documents/${newDocument.id}`);
  };

  /** 부모 문서 정보 업데이트 및 토글 열기 */
  const updateParentDocument = async (parentId, newDocument) => {
    // 부모 문서의 최신 정보 가져오기
    const parentDocument = await getDocumentContent(parentId);

    // 사이드바를 업데이트하기 위해 최신 문서 목록 가져오기
    await fetchDocumentLists();

    // 새 문서를 부모 문서의 하위로 추가
    parentDocument.documents.push(newDocument);

    // 부모 문서부터 최상위 문서까지 토글 열기
    let $parentDocument = document.querySelector(`[data-id="${parentId}}`);

    while ($parentDocument) {
      const $leafDocuments = $parentDocument.querySelector(
        ".side-bar-leaf-documents"
      );
      $leafDocuments.style.display = "block";
      $parentDocument =
        $parentDocument.parentElement.closest(".side-bar-document");
    }
  };

  /** 문서 수정하기 */
  const changeDocument = async (documentId, documentData) => {
    await updateDocument(documentId, documentData);
    await fetchDocumentLists();
  };

  /** 문서 삭제하기 */
  const removeDocument = async (documentId) => {
    await deleteDocument(documentId);
    await fetchDocumentLists();
  };

  // Sidebar
  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documents,
    addNewDocument,
    fetchDocument,
    removeDocument,
  });

  // EditorDocument
  const editDocument = new EditDocument({
    $target,
    initialState: this.state,
    changeDocument,
  });

  init();

  window.addEventListener("popstate", async () => {
    await route();
  });
}
