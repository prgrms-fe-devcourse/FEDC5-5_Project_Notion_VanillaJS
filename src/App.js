import ListPage from "./page/ListPage.js";
import EditorPage from "./page/EditorPage.js";
import HomePage from "./page/HomePage.js";
import { initRouter } from "../util/router.js";

export default function App({ $target }) {
  const $documentListContainer = document.createElement("div");
  $documentListContainer.classList = "list-container";
  const $EditorContainer = document.createElement("div");
  $EditorContainer.classList = "editor-container";

  $target.appendChild($documentListContainer);
  $target.appendChild($EditorContainer);

  const editorPage = new EditorPage({
    $target: $EditorContainer,
    initialState: {
      selectedID: "main",
      selectedDocument: {
        title: "",
        content: "",
      },
    },
    onListRender: () => {
      listPage.fetchDocumentsList();
    },
  });

  const listPage = new ListPage({
    $target: $documentListContainer,
    initialState: { documentsTree: [], isLoading: true },
  });

  const homePage = new HomePage({
    $target: $EditorContainer,
  });

  this.route = () => {
    $EditorContainer.innerHTML = ``;
    const { pathname } = window.location;
    if (pathname === "/") {
      homePage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const documentID = pathname.split("/").pop();
      editorPage.setState({ selectedID: documentID });
    }
  };

  this.route();
  initRouter(() => this.route());
}

/**
 * url 규칙`
 *
 * 1) 어떤 url이던지 => 사이드바는 렌더링 되어야 함
 *  => 고민을 해봐야하겠지만 사이드바는 고정되어 있어야함
 *
 * 2) Document페이지가 변동할텐데
 * 2-1) => /로 접근한경우 새로운포스트 x 메인페이지 하나 만들어서 그거 띄워줌
 * 2-2) => selectedID 를 설정해서 특정 doc을 클릭하면 ID값이 넘어올 수 있게 해야함
 * 2-3) 나머지는 /documents/{selectedID}로 접근
 * 2-4) post/new는 없음 무조건 null=>put요청만 있게 구현해야함
 *
 * 3) 기본 동작은 무조건 parent의 버튼을 눌러서 해당 id값으로 post를 보내는데
 * + parent가 null이 되는 버튼을 하나 추가해줘서 루트에 추가될 수 있게 구현해야함
 */
