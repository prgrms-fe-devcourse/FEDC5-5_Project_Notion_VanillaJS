import DocumentsPage from "./components/DocumentsPage.js";
import ContentsPage from "./components/ContentsPage.js";
import { initRouter, push } from "./utils/router.js";
import { request } from "./utils/api.js";

export default function App({ $target }) {
  const $app = document.createElement("div");
  $target.appendChild($app);

  this.state = [];
  this.setState = (nextState) => {
    this.state = nextState;
  };

  // 화살표 함수는 선언 전에 호출하면 참조 에러 뜬다 !!!
  const fetchDocument = async () => {
    const documents = await request("/documents");
    this.setState(documents);
    documentsPage.setState(this.state);
  };

  const documentsPage = new DocumentsPage({
    $target: $app,
    initialState: this.state,
    // 여기서 add는 POST 요청
    onAddDocument: async (id = "") => {
      if (id) {
        // parent가 있는 document 통신
        const res = await request(`/documents`, {
          method: "POST",
          body: JSON.stringify({
            title: "제목 없음",
            parent: id,
          }),
        });
        push(`/documents/${res.id}`);
      } else {
        // parent가 없는 document 통신. 즉 root
        const res = await request(`/documents`, {
          method: "POST",
          body: JSON.stringify({
            title: "제목 없음",
            parent: null,
          }),
        });
        push(`/documents/${res.id}`);
      }
      await this.route();
    },
    onDelete: async (id, title) => {
      if (confirm(`'${title}' 글을 삭제하시겠습니까 ?`)) {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });
        history.replaceState(null, null, "/");
        await this.route();
      }
    },
  });

  const contentPage = new ContentsPage({
    $target: $app,
    fetchDocument,
  });

  this.route = async () => {
    const { pathname } = window.location;

    fetchDocument();

    if (pathname === "/") {
      contentPage.setState("");
    } else {
      const [, , documentsId] = pathname.split("/");
      contentPage.setState({ documentsId });
    }
  };
  this.route();
  initRouter(() => this.route());
  window.addEventListener("popstate", () => {
    this.route();
  });
}
