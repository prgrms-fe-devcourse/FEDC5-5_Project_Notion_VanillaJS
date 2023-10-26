import DocumentPage from "./DocumentPage/DocumentPage.js";
import DocumentEditPage from "./DocumentEditorPage.js/DocumentEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $documentContainer = document.createElement("div");
  const $editContainer = document.createElement("div");
  $target.appendChild($documentContainer);
  $target.appendChild($editContainer);

  // 메인(첫 번째) 문서의 id
  const mainDocumentId = 105841;

  const documentPage = new DocumentPage({
    $target: $documentContainer,
  });

  const documentEditPage = new DocumentEditPage({
    $target: $editContainer,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
    onListChange: () => {
      // 편집기에서 문서 제목 or 내용에 변경사항이 있다면 데이터 다시 받아오고 문서 목록 렌더링
      documentPage.setState();
    },
  });

  // url에 따라 렌더링
  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      documentPage.setState(); // 문서들 GET후 문서 목록에 그리기
      documentEditPage.setState({ postId: mainDocumentId }); // 첫 글로 이동
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      documentPage.setState();
      documentEditPage.setState({ postId }); // 편집기에 해당 postId의 문서 내용 렌더링
    }
  };

  this.route();

  initRouter(() => this.route());
  window.addEventListener("popstate", () => {
    this.route();
  });
}
