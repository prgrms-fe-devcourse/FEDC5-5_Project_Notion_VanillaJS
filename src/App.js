import { $ } from "./utils/DOM/selector.js";
import { initRouter } from "./utils/router.js";
import { DUMMY_SINGLE_DOCUMENT } from "./utils/dummy.js";

import Sidebar from "./components/Sidebar/Sidebar.js";
import EditorPage from "./components/EditorPage/EditorPage.js";
import Header from "./components/Header/Header.js";
import Modal from "./components/Modal/Modal.js";
import OnBoarding from "./components/onBoarding/OnBoarding.js";
import Footer from "./components/Footer/Footer.js";

import { createPost, getPost, getPostList } from "./utils/service/api.js";
import { createDocument } from "./utils/DOM/ListControl.js";

export default function App({ $target }) {
  const $leftContainer = document.createElement("div");
  $leftContainer.id = "left-container";
  $target.appendChild($leftContainer);

  const $rightContainer = document.createElement("div");
  $rightContainer.id = "right-container";
  $target.appendChild($rightContainer);

  /** App 컴포넌트에서 모든 state를 관리함  */
  this.state = {
    documents: [], // sidebar에 사용되는 문서 목록
    selectedDocument: DUMMY_SINGLE_DOCUMENT, // 에디터에 보여줄 특정 문서
  };

  this.setState = nextState => {
    this.state = nextState;
  };

  /** 모달 열기 함수 */
  const displayModal = () => {
    $(".modal").classList.toggle("hidden");
  };

  /** 새로운 문서 생성하기 */
  const onAddNewDocument = async parentId => {
    const newDocument = await createPost({
      title: "",
      parent: parentId,
    });
    const newDocumentBody = await getPost(newDocument.id);
    createDocument(parentId, newDocumentBody.id); // 사이드바 dom에 즉시 추가

    this.setState({ ...this.state, selectedDocument: newDocumentBody });
    modal.setState(this.state.selectedDocument); // 모달에 state 전달
    displayModal(); // 모달 보여주기
  };

  /** 문서 목록 가져오기 + state 변경 + 사이드바 리렌더링 */
  const fetchDocuments = async () => {
    const documents = await getPostList();
    this.setState({
      ...this.state,
      documents,
    });
    sidebar.setState(this.state.documents);
  };

  /** 선택된 문서 가져오기 */
  const fetchDocument = async documentId => {
    const selectedDocument = await getPost(documentId);
    this.setState({
      ...this.state,
      selectedDocument,
    });
  };

  // Sidebar
  const sidebar = new Sidebar({
    $target: $leftContainer,
    initialState: this.state.documents,
    onAddNewDocument,
    displayModal,
  });

  // OnBoarding
  const onboarding = new OnBoarding({ $target: $rightContainer });

  // Header
  const header = new Header({ $target: $rightContainer, initialState: [] });

  // EditorPage
  const editorPage = new EditorPage({
    $target: $rightContainer,
    initialState: DUMMY_SINGLE_DOCUMENT,
  });

  // Footer
  const footer = new Footer({
    $target: $rightContainer,
    initialState: this.state.selectedDocument.documents,
  });

  // Modal
  const modal = new Modal({
    $target,
    initialState: this.state.selectedDocument,
    displayModal,
  });

  /** 현재 url에 맞는 문서를 가져와서 필요한 component들을 상태변경함 */
  const renderDocumentSection = async () => {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split("/");

    await fetchDocument(documentId); // 선택된 문서 get api 호출
    header.setState(this.state.selectedDocument.id);
    editorPage.setState(this.state.selectedDocument);
    footer.setState(this.state.selectedDocument.documents);
  };

  /** 라우팅 */
  this.route = async () => {
    const { pathname } = window.location;
    onboarding.display();
    editorPage.display();

    if (pathname === "/") {
      // 선택된 문서가 없으므로 초기화
      header.setState();
      footer.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      renderDocumentSection();
    }
  };

  /** 첫 접속 시 : 문서 목록 불러오기, 라우팅하기  */
  const init = async () => {
    await fetchDocuments();
    this.route();
    initRouter(() => this.route());
  };

  init();
}
