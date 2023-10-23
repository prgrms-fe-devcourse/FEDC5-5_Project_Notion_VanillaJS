import DocumentPage from "./DocumentPage/DocumentPage.js";
import DocumentEditPage from "./DocumentEditorPage.js/DocumentEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $documentContainer = document.createElement("div");
  const $editContainer = document.createElement("div");
  $target.appendChild($documentContainer);
  $target.appendChild($editContainer);

  const documentPage = new DocumentPage({ $target: $documentContainer });

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
      documentPage.setState();
      console.log("documentList에 반영되었습니다.");
    },
  });

  // url에 따라 렌더링
  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      documentPage.setState(); // 문서들 GET후 documentList에 그리기
      documentEditPage.setState({ postId: 104100 }); // 일단 첫 글로.
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      documentPage.setState();
      documentEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
  window.addEventListener("popstate", () => {
    this.route();
  });
}
